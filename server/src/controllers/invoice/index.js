const uuidv4 = require('uuid').v4;
const invoiceModel = require('../../models/invoice');
const purseModel = require('../../models/purse');
const rateModel = require('../../models/rate');
const WriteToLog = require('../../utils/writeToLog');
const {
  accountReplenishment,
  withdrawal,
  makeRate,
  win,
} = require('../../constants').basisForPayment;

const writeToLog = new WriteToLog();

class InvoiceController {
  constructor() {
    this.minus = 'minus';
    this.plus = 'plus';
    this.SUCCESS = 'SUCCESS';
  }

  createAmount (prevAmount, changeAmount, action) {
    if (action === this.plus) {
      return prevAmount + changeAmount;
    } else {
      const amount = prevAmount - changeAmount
      return amount >= 0 ? amount : 0;
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
            createTime: invoice.createTime
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

  changeRate = (id, partyNumber, participant) => {
    const dataPurse = {
      $push: {
        [`mainBet.${[partyNumber]}.participants`]: participant,
      },
    };
    return rateModel.findByIdAndUpdate(id, dataPurse)
    .then(rate => this.SUCCESS);
  }

  createInvoice = async (req, res) => {
    const { user } = req.session;
    if (!user || user && !user.userId) {
      return res.status(401).json({ message: 'Пользователь не авторизован!'});
    };
    const { body } = req;
    body.authorId = user.userId;
    body.invoiceId = uuidv4();

    const invoice = await invoiceModel.create(body)
    .catch((err) => {
      res.status(500).json(err);
      writeToLog.write(err, 'create_invoice.err');
    });
    const allStatus = [];
    if (body.basisForPayment === accountReplenishment) {
      allStatus.push( await this.changePurse(invoice, invoice.requisites.target, body.basisForPayment, this.plus));
    } else if (body.basisForPayment === withdrawal) {
        allStatus.push( await this.changePurse(invoice, invoice.requisites.target, body.basisForPayment, this.minus));
    } else {
        allStatus.push( await this.changePurse(invoice, invoice.requisites.target, body.basisForPayment, this.plus));
        allStatus.push( await this.changePurse(invoice, invoice.requisites.src, body.basisForPayment, this.minus));
        allStatus.push( await this.changeRate(body.rate.id, body.rate.partyNumber, body.rate.participant));
    }
      if (allStatus.every((status) => status === this.SUCCESS)) {
        res.status(201).json(invoice);
      } else {
        writeToLog.write(...allStatus, 'create_invoice.err');
        res.status(500).json({ message: 'Не все операции успешно выполнены!'});
      }
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
