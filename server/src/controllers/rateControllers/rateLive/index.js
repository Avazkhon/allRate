const moment = require('moment')
const rateModels = require('../../../models/rate');
const purseModel = require('../../../models/purse');
const userModel = require('../../../models/user');
const WriteToLog = require('../../../utils/writeToLog');
const {
  rateStatusLive,
  basisForPayment,
  superAdmin,
  interest,
} = require('../../../constants');
const InvoiceControllers = require('../../invoice');

const invoiceControllers = new InvoiceControllers();
const writeToLog = new WriteToLog();

const chengePaymentMade = (idDocument, participantId, partyName) => {
  // меняет значения ключа paymentMade в true
  // что значит эта ставка выплачена и следущий раз не нужно выплачивать
  return rateModels.findOneAndUpdate(
    {
      _id: idDocument,
      [`mainBet.${partyName}.participants._id`]: participantId
    },
    {
      '$set': { [`mainBet.${partyName}.participants.$.paymentMade`]: true }
    }
  )
}


const makePay = async (rate, partyName, src, index = 0) => {
  const mainBet = rate.mainBet;
  const participant = mainBet[partyName].participants[index];
  const participantsLength = mainBet[partyName].participants.length;
  if ( // если не было сделано не одной ставки
      (!mainBet.partyOne.participants.length || !mainBet.partyTwo.participants.length)
      && (mainBet.partyDraw.idParty ? !mainBet.partyDraw.participants.length : false)
    ) {
    return {status: 'finish', message: 'Ставка не сотоялась так как нет ни одной сделаной ставки'}
  } else if (!participant && index === 0) {
    // если никто не сделал ставку на победителя
    const meny = (mainBet.partyOne.amount + mainBet.partyTwo.amount + mainBet.partyDraw.amount) * interest.stalemateSituationPercentage
    const dataInvoice = {
      amount: Math.floor(meny),
      requisites: { src, target: superAdmin.purseId },
    };

    return invoiceControllers.createInvoiceForStalemateSituation(dataInvoice)
      .then(() => {
        return {status: 'finish', message: 'Ни одна из сторон не выйиграла'}
      });
  } else if (participant.paymentMade) { // если уже было оплачено пропустить оплату
    if (participantsLength === index + 1) { // если это все итерации прошли то закончить операции по оплате
      return {status: 'finish', message: 'Выплаты завершины'}
    } else {
      return makePay(rate, partyName, src, ++index);
    }
  } else { // выполения оплаты за победу
    const dataInvoice = {
      amount: Math.floor(participant.meny * mainBet[partyName].coefficient),
      requisites: { src, target: participant.purseId},
    };
    return invoiceControllers.createInvoiceForWin(dataInvoice)
      .then(() => chengePaymentMade(rate._id, participant._id, partyName))
      .then(() => {
        if (participantsLength === index + 1) {  // если это все итерации прошли то закончить операции по оплате
          return {status: 'finish', message: 'Выплаты завершины'}
        } else {
          return makePay(rate, partyName, src, ++index);
        }
      })
  }
}


const makePayPercentage = (amount, src, purseId) => (
  new Promise((resolve, reject) => {
    const dataInvoice = {
      amount: Math.floor(amount),
      requisites: { src, target: purseId},
      basisForPayment: basisForPayment.percentage,
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
    const rateForCheck = await rateModels.findOne({ _id: id });
    if (rateForCheck.statusLife === rateStatusLive.in_progress) {
      return res.status(425).json({ message: 'Предыдущий запрос еще не обработан!'})
    }
    if (rateStatusLive.finish === live) {
      await rateModels.findByIdAndUpdate({ _id: id }, { statusLife: live, dateFinish: moment().utc().format() })
      .then((result) => {
        res.status(200).json(result)
      })
    }
    if (rateStatusLive.archive === live) {
      await rateModels.findByIdAndUpdate({ _id: id }, { statusLife: live, dateArchive: moment().utc().format() })
      .then((result) => {
        res.status(200).json(result)
      })
    }
  } catch (err) {
    writeToLog.write(err, 'rate_live.err');
    res.status(500).send({ message: `ошибка на стороне серера!`, err })
  }
}
