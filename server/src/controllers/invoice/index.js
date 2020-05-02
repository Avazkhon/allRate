const uuidv4 = require('uuid').v4;
const invoiceModel = require('../../models/invoice');
const purseModel = require('../../models/purse');
const rateModel = require('../../models/rate');
const WriteToLog = require('../../utils/writeToLog');
const {
  basisForPayment: {
    accountReplenishment,
    withdrawal,
    makeRate,
    win,
  },
  superAdmin,
} = require('../../constants');

const writeToLog = new WriteToLog();

class InvoiceController {
  constructor() {
    this.minus = 'minus';
    this.plus = 'plus';
    this.SUCCESS = 'SUCCESS';
  }

  createAmount (prevAmount, changeAmount, action) {
    if (action === this.plus) {
      return (prevAmount + changeAmount).toFixed(2);
    } else {
      const amount = prevAmount - changeAmount
      if (amount >= 0) {
        return amount.toFixed(2);
      }
      throw 'Недостаточно средств!'
    }
  }

  async changePurse (invoice, id, basisForPayment, action) {
    try {
      const purse = await purseModel.getPurse({ _id: id });
      const data = {
        $push: {
          history: {
            invoiceId: invoice._id,
            amount: invoice.amount,
            basisForPayment,
            createTime: invoice.createTime,
            action,
          }
        },
        amount: this.createAmount(purse.amount, invoice.amount, action),
      };
      return purseModel.findByIdAndUpdate(id, data)
      .then( purse => this.SUCCESS)
    } catch(err) {
      writeToLog.write(err, 'update_purse.err');
      return err
    }
  }

  changeCoefficients = async (id, partyNumber, amount) => {
    const {
      mainBet,
      mainBet: {
        partyOne,
        partyDraw,
        partyTwo,
      },
    } = await rateModel.getOneById(id);
    mainBet[partyNumber].amount += amount;
    let allAmount = partyOne.amount + partyTwo.amount;
    allAmount = partyDraw.idParty ? allAmount + partyDraw.amount : allAmount;
    const data = {
      'mainBet.partyOne.coefficient': (allAmount / partyOne.amount * 0.96).toFixed(3),
      'mainBet.partyTwo.coefficient': (allAmount / partyTwo.amount * 0.96).toFixed(3),
      [`mainBet.${[partyNumber]}.amount`]: mainBet[partyNumber].amount,
    };
    if (partyDraw.idParty) {
      data['mainBet.partyDraw.coefficient'] = (allAmount / partyDraw.amount * 0.96).toFixed(3);
    }
    return data;
  }

  changeRate = async (id, partyNumber, participant, amount) => {
    const dataPurse = {
      $set: await this.changeCoefficients(id, partyNumber, amount),
      $push: {
        [`mainBet.${[partyNumber]}.participants`]: participant,
      },
    };
    return rateModel.findByIdAndUpdate(id, dataPurse)
    .then(rate => this.SUCCESS);
  }

  createInvoice = async (req, res) => {
    try {
    const { user } = req.session;
    if (!user || user && !user.userId) {
      return res.status(401).json({ message: 'Пользователь не авторизован!'});
    };
    const { body } = req;
    body.authorId = user.userId;
    body.invoiceId = uuidv4();
    if (body.basisForPayment !== accountReplenishment) {
      const purse = await purseModel.getPurse({_id: body.requisites.src});
      if (purse.amount < body.amount) {
        return res.status(402).json({ message: 'Недостаточно средств!'});
      }
    }
    const invoice = await invoiceModel.create(body);
    if (body.basisForPayment === accountReplenishment) {
      await this.changePurse(invoice, invoice.requisites.target, body.basisForPayment, this.plus);
    } else if (body.basisForPayment === withdrawal) {
      await this.changePurse(invoice, invoice.requisites.src, body.basisForPayment, this.minus);
    } else {
      await this.changePurse(invoice, invoice.requisites.target, body.basisForPayment, this.plus);
      await this.changePurse(invoice, invoice.requisites.src, body.basisForPayment, this.minus);
      body.rate.participant.purseId = user.purseId;
      await this.changeRate(body.rate.id, body.rate.partyNumber, body.rate.participant, invoice.amount);
    }
      res.status(201).json(invoice);
    } catch(err) {
      writeToLog.write(err, 'create_invoice.err');
      res.status(500).json({ message: 'Не все операции успешно выполнены!', err});
    }
  }

  async createInvoiceForWin (data) {
    data.authorId = superAdmin.userId;
    data.invoiceId = uuidv4();
    const purse = await purseModel.getPurse({_id: data.requisites.src});
    if (+purse.amount < +data.amount) {
      throw 'Недостаточно средств';
    }
    const invoice = await invoiceModel.create(data);
    await this.changePurse(invoice, invoice.requisites.src, data.basisForPayment, this.minus);
    await this.changePurse(invoice, invoice.requisites.target, data.basisForPayment, this.plus);
    return invoice;
  }

  async createInvoiceForPercentage (data) {
    data.authorId = superAdmin.userId;
    data.invoiceId = uuidv4();
    const invoice = await invoiceModel.create(data);
    await this.changePurse(invoice, invoice.requisites.target, data.basisForPayment, this.plus);
    return invoice;
  }

  async getInvoice (req, res) {
    const { user } = req.session;
    if (!user || user && !user.userId) {
      return res.status(401).json({ message: 'Пользователь не авторизован!'});
    };
    const { id } = req.query;
    invoiceModel.get({ _id: id })
    .then((invoice) => {
      res.status(201).json(invoice);
    })
    .catch((err) => {
      res.status(500).json(err);
      writeToLog.write(err, 'create_purse.err');
    })
  }

}

module.exports = InvoiceController;
