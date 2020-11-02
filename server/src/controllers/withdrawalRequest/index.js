const InvoiceControllers = require('../invoice');
const purseModel = require('../../models/purse');
const userModel = require('../../models/user');
const withdrawalRequest = require('../../models/withdrawalRequest');
const WriteToLog = require('../../utils/writeToLog');
const utils = require('../../utils');
const {
  basisForPayment: {
    withdrawal,
  },
  superAdmin,
} = require('../../constants');

const invoiceControllers = new InvoiceControllers();
const writeToLog = new WriteToLog();

exports.get = async (req, res) => {
  const { user } = req.session;
  const params = req.query;
  if (!user || user && !user.userId) {
    return res.status(401).json({ message: 'Пользователь не авторизован!'});
  }
  const options = {
    limit: +params.limit || 24,
    page: +params.page,
  };
  const userData = await userModel.findOne({_id: user.userId});
  const data = {};
  if (!userData.isAdmin) { // если не админ доступны только свои заявки
    data.userId = user.userId;
  }

  withdrawalRequest.paginate(data, options)
    .then((WR) => {
      res.status(200).send(WR);
    })
    .catch((error) => {
      writeToLog.write(error, 'get_withdrawal_request.error')
      res.status(500).json(error.toString());
    })
}

exports.create = async (req, res) => {
  const { user } = req.session;
  if (!user || user && !user.userId) {
    return res.status(401).json({ message: 'Пользователь не авторизован!'});
  }
  if (req.body.amount < 100) {
    return res.status(423 ).json({ message: 'Минимальная сумма снятия 100 рублей!'});
  }

  if (!req.body.target) {
    return res.status(400).json({ message: 'Не указан номер карты!'});
  }

  if (!req.body.createTime) {
    return res.status(400).json({ message: 'Не указано время!'});
  }

  const userData = await userModel.findOne({_id: user.userId});
  const purseData = await purseModel.findOne({_id: userData.purseId});

  if (purseData.amount < req.body.amount) {
    return res.status(400).json({ message: 'Не достаточно средств на счету!'});
  }

  const dataWR = {
    amount: req.body.amount,
    amount_due: utils.yndexAmountDue(req.body.amount),
    userId: user.userId,
    target: req.body.target,
    createTime: req.body.createTime
  }

  const dataInvoice = {
    authorId: user.userId,
    amount: dataWR.amount_due,
    requisites: { src: purseData._id, target: req.body.target},
    basisForPayment: withdrawal,
    createTime: req.body.createTime,
  };

  invoiceControllers.createInvoiceForWithdrawal(dataInvoice);

  withdrawalRequest.create(dataWR)
    .then((newWithdrawalRequest) => {
      res.status(201).json(newWithdrawalRequest);
    })
    .catch((error) => {
      writeToLog.write(error, 'create_withdrawal_request.error')
      res.status(500).json(error.toString());
    })
}

exports.patch = async (req, res) => {
  const { user } = req.session;
  const {
    description,
    status,
  } = req.body;
  const { id } = req.query;
  if ((status !== 'successfully' && status !== 'refused') || !id) {
    return res.status(400).json({ message: 'Запрос не корректен!'});
  }
  if (!user || (user && !user.userId)) {
    return res.status(401).json({ message: 'Пользователь не авторизован!'});
  }

  const userData = await userModel.findOne({_id: user.userId});
  if(!userData.isAdmin) {
    return res.status(403).json({ message: 'Нет прав!'});
  }

  const dataWR = {
    description,
    status,
    update: new Date(),
    adminID: userData._id,
  }

  withdrawalRequest.findByIdAndUpdate({_id: id }, dataWR)
    .then((newWithdrawalRequest) => {
      res.status(200).json(newWithdrawalRequest);
    })
    .catch((error) => {
      writeToLog.write(error, 'update_withdrawal_request.error')
      res.status(500).json(error.toString());
    })
}
