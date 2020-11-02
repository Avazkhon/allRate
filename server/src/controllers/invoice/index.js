const uuidv4 = require('uuid').v4;
const invoiceModel = require('../../models/invoice');
const purseModel = require('../../models/purse');
const rateModel = require('../../models/rate');
const WriteToLog = require('../../utils/writeToLog');
const Yandex = require('../yndex');
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
    this.yandex = new Yandex();
  }


  async makeInvoicYandex({amount_due}) {
    const transfer = await this.yandex.makeInvoic({amount_due});
    return {url_redirect: `${transfer.result.acs_uri}/?${this.yandex.formBody({...transfer.result.acs_params})}`, ...transfer};
  }

  async timeOutMakeInvoicYandex(prevDetalis, timeOut = 5000, count = 0) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.yandex.checkInvoic({prevDetalis})
          .then(res => resolve(res))
          .catch(err => reject(err))
      }, timeOut);

    }).then((res) => {
      if(count === 24) {
        return 'dont action';
      } else if (res.result.status === 'in_progress' || res.result.status === 'ext_auth_required') {
          return this.timeOutMakeInvoicYandex(prevDetalis, timeOut, ++count)
        } else {
          return res.result;
        }
    })
    .catch((error) => {
      return {status: error}
    })
  };

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
      const purse = await purseModel.findOne({ _id: id });
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
      return purseModel.findByIdAndUpdate({ _id: id}, data)
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
    } = await rateModel.findOne({ _id: id });
    mainBet[partyNumber].amount += amount;
    let allAmount = partyOne.amount + partyTwo.amount;
    allAmount = partyDraw.idParty ? allAmount + partyDraw.amount : allAmount;
    const data = {
      'mainBet.partyOne.coefficient': (allAmount / partyOne.amount * 0.94).toFixed(2),
      'mainBet.partyTwo.coefficient': (allAmount / partyTwo.amount * 0.94).toFixed(2),
      [`mainBet.${[partyNumber]}.amount`]: mainBet[partyNumber].amount,
    };
    if (partyDraw.idParty) {
      data['mainBet.partyDraw.coefficient'] = (allAmount / partyDraw.amount * 0.94).toFixed(2);
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
    return rateModel.findByIdAndUpdate({ _id: id}, dataPurse)
    .then(rate => this.SUCCESS);
  }

  createInvoice = async (req, res) => {
    try {
    const { user } = req.session;
    if (!user || user && !user.userId) {
      return res.status(401).json({ message: 'Пользователь не авторизован!'});
    };
    const { body, body: { basisForPayment } } = req;
    if (basisForPayment !== 'accountReplenishment' && basisForPayment !== 'makeRate' && basisForPayment !== 'win') {
      return res.status(400).json({ message: 'Основания для операции не верна!'});
    }
    body.authorId = user.userId;
    body.invoiceId = uuidv4();
    if (basisForPayment !== accountReplenishment) {
      const purse = await purseModel.findOne({_id: body.requisites.src});
      if (purse.amount < body.amount) {
        return res.status(402).json({ message: 'Недостаточно средств!'});
      }
    }
    const invoice = await invoiceModel.create(body);
    if (basisForPayment === accountReplenishment) {
      return this.makeInvoicYandex({amount_due: invoice.amount})
        .then(async (transfer)=> {
          if (transfer.result.status === 'ext_auth_required') {
            res.status(200).json({
                message: 'Перевод на внешнюю страницу',
                url_redirect: transfer.url_redirect,
              });
          } else {
            res.status(423).json({
                message: transfer.result.status
              });
          }
          return transfer;
        })
        .then(async (transfer)=> {
          this.timeOutMakeInvoicYandex(transfer.details)
            .then((result) => {
              if (result.status === 'success') {
                this.changePurse(invoice, invoice.requisites.target, basisForPayment, this.plus);
              }
              invoiceModel.findByIdAndUpdate({_id: invoice.id}, {status: result.status})
            })
        })

    } else {
      await this.changePurse(invoice, invoice.requisites.target, basisForPayment, this.plus);
      await this.changePurse(invoice, invoice.requisites.src, basisForPayment, this.minus);
      body.rate.participant.purseId = user.purseId;
      await this.changeRate(body.rate.id, body.rate.partyNumber, body.rate.participant, invoice.amount);
    }
      res.status(201).json(invoice);
  } catch(err) {
      writeToLog.write(err, 'create_invoice.err');
      res.status(500).json({ message: 'Не все операции успешно выполнены!', err: err.toString()});
    }
  }

  async createInvoiceForWin (data) {
    data.authorId = superAdmin.userId;
    data.invoiceId = uuidv4();
    const purse = await purseModel.findOne({_id: data.requisites.src});
    const invoice = await invoiceModel.create(data);
    await this.changePurse(invoice, invoice.requisites.src, data.basisForPayment, this.minus);
    await this.changePurse(invoice, invoice.requisites.target, data.basisForPayment, this.plus);
    return invoice;
  }

  async createInvoiceForWithdrawal (data) {
    data.invoiceId = uuidv4();
    const purse = await purseModel.findOne({_id: data.requisites.src});
    const invoice = await invoiceModel.create(data);
    await this.changePurse(invoice, invoice.requisites.src, data.basisForPayment, this.minus);
    return invoice;
  }

  async createInvoiceForPercentage (data) {
    data.authorId = superAdmin.userId;
    data.invoiceId = uuidv4();
    const invoice = await invoiceModel.create(data);
    await this.changePurse(invoice, invoice.requisites.src, data.basisForPayment, this.minus);
    await this.changePurse(invoice, invoice.requisites.target, data.basisForPayment, this.plus);
    return invoice;
  }

  async getInvoice (req, res) {
    const { user } = req.session;
    if (!user || user && !user.userId) {
      return res.status(401).json({ message: 'Пользователь не авторизован!'});
    };
    const { id } = req.query;
    invoiceModel.findOne({ _id: id })
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
