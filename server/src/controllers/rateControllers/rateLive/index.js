const rateModels = require('../../../models/rate');
const purseModel = require('../../../models/purse');
const userModel = require('../../../models/user');
const WriteToLog = require('../../../utils/writeToLog');
const {
  rateStatusLive,
  basisForPayment,
  superAdmin,
} = require('../../../constants');
const InvoiceControllers = require('../../invoice');

const invoiceControllers = new InvoiceControllers();
const writeToLog = new WriteToLog();

const makePay = (mainBet, src, index = 0) => (
  new Promise((resolve, reject) => {
    const participant = mainBet.participants[index];
    if (!mainBet.participants.length) {
      reject('Ставка не сотоялась так как нет ни одной сделаной ставки');
      return;
    }
    if (!participant) {
      return;
    }
    const dataInvoice = {
      amount: (participant.meny * mainBet.coefficient).toFixed(2),
      requisites: { src, target: participant.purseId},
      basisForPayment: basisForPayment.win,
      createTime: new Date(),
    };
    return invoiceControllers.createInvoiceForWin(dataInvoice)
    .then((r) => {
      resolve('SUCCESS');
      index++;
      makePay(mainBet, src, index);
    })
    .catch(reject);
  })
)

const makePayPercentage = (amount, src, purseId) => (
  new Promise((resolve, reject) => {
    const dataInvoice = {
      amount: amount.toFixed(2),
      requisites: { src, target: purseId},
      basisForPayment: basisForPayment.percentage,
      createTime: new Date(),
    }
    return invoiceControllers.createInvoiceForPercentage(dataInvoice)
    .then(() => resolve('SUCCESS'))
    .catch(reject);
  })
)

exports.rateLive  = async (req, res)  => {
  try {
    const { live, id, mainBet } = req.query;
    const { user } = req.session;

    if (!user || user && !user.userId) {
      return res.status(401).json({ message: 'Пользователь не авторизован!'});
    };
    if (rateStatusLive.finish === live || rateStatusLive.archive === live) {
      await rateModels.findByIdAndUpdate(id, { statusLife: live })
      .then((result) => {
        res.status(200).json(result)
      })
    }
    if (mainBet) {
      const rate = await rateModels.getOneById(id);
      const author = await userModel.findOne({ _id: rate.author}, { purseId: true });
      const purse = await purseModel.getPurse({ _id: rate.mainBet.purseId });
      await rateModels.findByIdAndUpdate(
        id,
        {$set: {
          [`mainBet.idPartyVictory`]: rate.mainBet[mainBet].idParty,
          [`mainBet.paymentMade`]: true,
        }}
      );

      await makePay(rate.mainBet[mainBet], purse._id)
      .then(() => (
        makePayPercentage(purse.amount * 0.3, purse._id, author.purseId)
      ))
      .then(() => (
        makePayPercentage(purse.amount * 0.3, purse._id, superAdmin.purseId)
      ))
      .then(() => {
        res.status(200).send({ message: `определен победителем ${mainBet} в mainBet` })
      })
      .catch((err) => {
        writeToLog.write(err, 'rate_live.err');
        res.status(402).send({ message: 'Ошибка!', err });
      });
    }
  } catch (err) {
    writeToLog.write(err, 'rate_live.err');
    res.status(500).send({ message: `ошибка на стороне серера!`, err })
  }
}
