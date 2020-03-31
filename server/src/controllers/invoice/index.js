const uuidv4 = require('uuid').v4;
const invoice = require('../../models/invoice');
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

    return invoice.create(body)
    .then((invoice) => {
      res.status(201).json(invoice);
      console.log('invoice', invoice);
    })
    .catch((err) => {
      res.status(500).json(err);
      writeToLog.write(err, 'create_purse.err');
    });
  }

  async getInvoice (req, res) {
    const { user } = req.session;
    if (!user || user && !user.userId) {
      return res.status(401).json({ message: 'Пользователь не авторизован!'});
    };
    const { id } = req.query;
    invoice.get({ _id: id })
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
