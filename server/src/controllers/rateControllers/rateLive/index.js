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

const makePay = (mainBet, partyName, src, index = 0) => (
  new Promise((resolve, reject) => {
    const participant = mainBet[partyName].participants[index];
    if (
        (!mainBet.partyOne.participants.length || !mainBet.partyTwo.participants.length)
        && (mainBet.partyDraw.idParty ? !mainBet.partyDraw.participants.length : false)
      ) {
      reject('Ставка не сотоялась так как нет ни одной сделаной ставки');
      return;
    }
    if (!participant) {
      const meny = (mainBet.partyOne.amount + mainBet.partyTwo.amount + mainBet.partyDraw.amount) * 0.94
      const dataInvoice = {
        amount: (meny).toFixed(2),
        requisites: { src, target: superAdmin.purseId },
        basisForPayment: basisForPayment.stalemateSituation,
        createTime: new Date(),
      };
      return invoiceControllers.createInvoiceForWin(dataInvoice)
      .then((r) => {
        resolve('SUCCESS');
      })
      .catch(reject);
    }
    const dataInvoice = {
      amount: (participant.meny * mainBet[partyName].coefficient).toFixed(2),
      requisites: { src, target: participant.purseId},
      basisForPayment: basisForPayment.win,
      createTime: new Date(),
    };
    return invoiceControllers.createInvoiceForWin(dataInvoice)
    .then((r) => {
      resolve('SUCCESS');
      index++;
      makePay(mainBet, partyName, src, index);
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
      await makePay(rate.mainBet, mainBet, purse._id)
      .then(() => (
        makePayPercentage(purse.amount * 0.03, purse._id, author.purseId)
      ))
      .then(() => (
        makePayPercentage(purse.amount * 0.03, purse._id, superAdmin.purseId)
      ))
      .then(() => {
        return rateModels.findByIdAndUpdate(
          id,
          {$set: {
            [`mainBet.idPartyVictory`]: rate.mainBet[mainBet].idParty,
            [`mainBet.paymentMade`]: true,
          }}
        );
      })
      .then(() => {
        return rateModels.getOneById(id);
      })
      .then((data) => {
        res.status(200).send(data);
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
