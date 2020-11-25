const InvoiceControllers = require('../invoice');
const purseModel = require('../../models/purse');
const userModel = require('../../models/user');
const withdrawalRequest = require('../../models/withdrawalRequest');
const WriteToLog = require('../../utils/writeToLog');
const utils = require('../../utils');

const {
  basisForPayment: {
    withdrawal,
    returnMoney,
  },
  superAdmin,
  checkCardReg,
  money,
} = require('../../constants');

const invoiceControllers = new InvoiceControllers();
const writeToLog = new WriteToLog();

// exports.get = async (req, res) => {
//   const { user } = req.session;
//   const params = req.query;
//   if (!user || user && !user.userId) {
//     return res.status(401).json({ message: 'Пользователь не авторизован!'});
//   }
//   const options = {
//     limit: +params.limit || 24,
//     page: +params.page,
//   };
//   const userData = await userModel.findOne({_id: user.userId});
//   const data = {};
//   if (!userData.isAdmin && superAdmin.userId !== user.userId) { // если не админ доступны только свои заявки
//     data.userId = user.userId;
//   }
//
//   withdrawalRequest.paginate(data, options)
//     .then((WR) => {
//       res.status(200).send(WR);
//     })
//     .catch((error) => {
//       writeToLog.write(error, 'get_withdrawal_request.error')
//       res.status(500).json(error.toString());
//     })
// }

exports.create = async (req, res) => {
  const { user } = req.session;
  if (!user || user && !user.userId) {
    return res.status(401).json({ message: 'Пользователь не авторизован!'});
  }
  if (req.body.amount < money.minAccountReplenishment) {
    return res.status(423).json({ message: `Минимальная сумма снятия ${money.minAccountReplenishment} рублей!`});
  }
  if (req.body.amount > money.maxWithdrawal) {
    return res.status(423).json({ message: `Максимальная сумма снятия ${money.maxWithdrawal} рублей!`});
  }

  if (
      !Object.values(checkCardReg).some((card) => {
        return card.test(req.body.target);
      })
  ) {
    return res.status(400).json({ message: 'Не верно указан номер карты!'});
  }

  const userData = await userModel.findOne({_id: user.userId});
  const purseData = await purseModel.findOne({_id: userData.purseId});
  const amount_due = utils.yndexAmountDue(req.body.amount)

  if (purseData.amount < amount_due) {
    return res.status(400).json({ message: 'Не достаточно средств на счету!'});
  }

  const dataWR = {
    amount: req.body.amount,
    amount_due,
    userId: user.userId,
    target: req.body.target,
    purseId: userData.purseId,
  }

  const dataInvoice = {
    authorId: user.userId,
    amount: dataWR.amount_due,
    purseId: userData.purseId,
    requisites: { src: purseData._id, target: req.body.target},
    basisForPayment: withdrawal,
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

exports.checkParamsWR = async (req, res) => {
  const { user } = req.session;
  if (!user || user && !user.userId) {
    return res.status(401).json({ message: 'Пользователь не авторизован!'});
  }
  if (req.body.amount < money.minAccountReplenishment) {
    return res.status(423).json({ message: `Минимальная сумма снятия ${money.minAccountReplenishment} рублей!`});
  }
  if (req.body.amount > money.maxWithdrawal) {
    return res.status(423).json({ message: `Максимальная сумма снятия ${money.maxWithdrawal} рублей!`});
  }

  if (
      !Object.values(checkCardReg).some((card) => {
        return card.test(req.body.target);
      })
  ) {
    return res.status(400).json({ message: 'Не верно указан номер карты!'});
  }

  const userData = await userModel.findOne({_id: user.userId});
  const purseData = await purseModel.findOne({_id: userData.purseId});
  const amount_due = utils.yndexAmountDue(req.body.amount)

  if (purseData.amount < amount_due) {
    return res.status(400).json({ message: 'Не достаточно средств на счету!'});
  }

  return res.status(200).json({ message: 'Переданные данные верны', amount_due});
}
