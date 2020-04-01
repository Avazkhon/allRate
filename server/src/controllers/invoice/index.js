const uuidv4 = require('uuid').v4;
const invoiceModel = require('../../models/invoice');
const purseModel = require('../../models/purse');
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

  }

  createAmount (prevAmount, changeAmount, action) {
    if (accountReplenishment === action) {
      return prevAmount + changeAmount;
    } else if (withdrawal === action) {
      const amount = prevAmount - changeAmount
      return amount ? amount : 0;
    } else if (makeRate === action) {
      const amount = prevAmount - changeAmount
      return amount ? amount : 0;
    } else { // win
      return prevAmount + changeAmount;
    }
  }

  async changePurse (invoice, basisForPayment) {
    try {
      const purse = await purseModel.getPurse(invoice.target)
      const data = {
        $push: { history: { invoiceId: invoice._id } },
        amount: this.createAmount(purse.amount, invoice.amount, basisForPayment),
      };

      return purseModel.findByIdAndUpdate(purse._id, data)
      .then((purse) => {
        return 'SUCCESS';
      })
    } catch(err) {
      writeToLog.write(err, 'update_purse.err');
      return err
    }
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
    const statusChangePurse = await this.changePurse(invoice, body.basisForPayment)
      if (statusChangePurse === 'SUCCESS') {
        res.status(201).json(invoice)
      } else {
        res.status(500).json(statusChangePurse);
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
