const InvoiceControllers = require('../invoice');
const userModel = require('../../models/user');
const withdrawalRequest = require('../../models/withdrawalRequest');
const WriteToLog = require('../../utils/writeToLog');

const {
  basisForPayment: {
    returnMoney,
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
  if (!userData.isAdmin && superAdmin.userId !== user.userId) { // если не админ доступны только свои заявки
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
  const beforeDataWR = await withdrawalRequest.findOne({ _id: id });
  if((!userData.isAdmin && superAdmin.userId !== user.userId)) {
    return res.status(403).json({ message: 'Нет прав!'});
  }
  if (beforeDataWR.status === 'refused' || beforeDataWR.status === 'successfully') {
    return res.status(400).json({ message: 'Запрос на вывод средств не редактируемый'});
  }

  const dataWR = {
    description,
    status,
    update: new Date(),
    adminID: userData._id,
  }

  if(status === 'successfully') {
    withdrawalRequest.findByIdAndUpdate({_id: id }, dataWR)
    .then((newWithdrawalRequest) => {
      res.status(200).json(newWithdrawalRequest);
    })
    .catch((error) => {
      writeToLog.write(error, 'update_withdrawal_request.error')
      res.status(500).json(error.toString());
    })
  } else {
    const dataInvoice = {
      amount: beforeDataWR.amount_due,
      createTime: new Date(),
      authorId: user.userId,
      basisForPayment: returnMoney,
      requisites: {
        src: 'yoomoney',
        target: beforeDataWR.purseId,
      }
    }

    invoiceControllers.createInvoiceForReturnMoney(dataInvoice);
    withdrawalRequest.findByIdAndUpdate({_id: id }, dataWR)
    .then((newWithdrawalRequest) => {
      res.status(200).json(newWithdrawalRequest);
    })
    .catch((error) => {
      writeToLog.write(error, 'update_withdrawal_request.error')
      res.status(500).json(error.toString());
    })
  }
}
