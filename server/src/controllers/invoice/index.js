const uuidv4 = require('uuid').v4;
const invoiceModel = require('../../models/invoice');
const purseModel = require('../../models/purse');
const WriteToLog = require('../../utils/writeToLog');

const writeToLog = new WriteToLog();

class InvoiceController {
  constructor() {

  }

  async createInvoice (req, res) {
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
    const purse = await purseModel.getPurse(invoice.target)
    .catch((err) => {
      res.status(500).json(err);
      writeToLog.write(err, 'get_purse.err');
    });

    const data = {
      $push: { history: { invoiceId: invoice._id } },
      amount: purse.amount + invoice.amount
    }
    purseModel.findByIdAndUpdate(purse._id, data)
    .then((purse) => {
      res.status(201).json(invoice);
    })
    .catch((err) => {
      res.status(500).json(err);
      writeToLog.write(err, 'update_purse.err');
    })
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
