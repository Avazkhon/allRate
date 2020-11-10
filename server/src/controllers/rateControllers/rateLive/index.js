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


const makePay = async (rate, partyName, src, index = 0, sumMoney = 0) => {
  const mainBet = rate.mainBet;
  const participant = mainBet[partyName].participants[index];
  const participantsLength = mainBet[partyName].participants.length;
  if ( // если не было сделано не одной ставки
      (!mainBet.partyOne.participants.length || !mainBet.partyTwo.participants.length)
      && (mainBet.partyDraw.idParty ? !mainBet.partyDraw.participants.length : false)
    ) {
    return {status: 'finish', message: 'Ставка не сотоялась так как нет ни одной сделаной ставки', sumMoney}
  } else if (!participant && index === 0) {
    // если никто не сделал ставку на победителя
    const meny = (mainBet.partyOne.amount + mainBet.partyTwo.amount + mainBet.partyDraw.amount) * 0.94
    const dataInvoice = {
      amount: +(meny).toFixed(2),
      requisites: { src, target: superAdmin.purseId },
      createTime: new Date(),
    };

    return invoiceControllers.createInvoiceForStalemateSituation(dataInvoice)
      .then(() => {
        return {status: 'finish', message: 'Ни одна из сторон не выйиграла', sumMoney}
      });
  } else if (participant.paymentMade) { // если уже было оплачено пропустить оплату
    if (participantsLength === index + 1) { // если это все итерации прошли то закончить операции по оплате
      return {status: 'finish', message: 'Выплаты завершины', sumMoney}
    } else {
      return makePay(rate, partyName, src, ++index, sumMoney);
    }
  } else { // выполения оплаты за победу
    const dataInvoice = {
      amount: +(participant.meny * mainBet[partyName].coefficient).toFixed(2),
      requisites: { src, target: participant.purseId},
      createTime: new Date(),
    };
    return invoiceControllers.createInvoiceForWin(dataInvoice)
      .then(() => chengePaymentMade(rate._id, participant._id, partyName))
      .then(() => {
        if (participantsLength === index + 1) {  // если это все итерации прошли то закончить операции по оплате
          return {status: 'finish', message: 'Выплаты завершины', sumMoney}
        } else {
          sumMoney += dataInvoice.amount;
          return makePay(rate, partyName, src, ++index, sumMoney);
        }
      })
  }
}


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
    const rateForCheck = await rateModels.findOne({ _id: id });
    if (rateForCheck.statusLife === rateStatusLive.in_progress) {
      return res.status(425).json({ message: 'Предыдущий запрос еще не обработан!'})
    }
    if (rateStatusLive.finish === live || rateStatusLive.archive === live) {
      await rateModels.findByIdAndUpdate({ _id: id }, { statusLife: live })
      .then((result) => {
        res.status(200).json(result)
      })
    }
    if (mainBet) {
      const rate = await rateModels.findByIdAndUpdate({ _id: id }, {statusLife: rateStatusLive.in_progress});
      const author = await userModel.findOne({ _id: rate.authorId}, { purseId: true });
      const purse = await purseModel.findOne({ _id: rate.mainBet.purseId });
      await makePay(rate, mainBet, purse._id)
      .then(async (status) => {
        if (status.sumMoney) { // перевести проценты только если были сделаны выплаты победителям
          await makePayPercentage(status.sumMoney * 0.03, purse._id, author.purseId)
          await makePayPercentage(status.sumMoney * 0.03, purse._id, superAdmin.purseId)
        }
        return status;
      })
      .then(async (status) => {
        const rateAfterPaymentMade = await rateModels.findOne({ _id: id });
        const purseAfterPaymentMade = await purseModel.findOne({ _id: purse._id });
        const isNotAllPaymentMade = rateAfterPaymentMade.mainBet[mainBet].participants.some((participant) => !participant.paymentMade)
        if (!isNotAllPaymentMade && purseAfterPaymentMade.amount) {
          // если всем выплачено и есть остатки денег то перевести супер админу
          const dataInvoice = {
            amount: purseAfterPaymentMade.amount,
            requisites: { src: purseAfterPaymentMade._id, target: superAdmin.purseId},
            createTime: new Date(),
          }
          invoiceControllers.createInvoiceForLeftovers(dataInvoice);
        }
        return rateModels.findByIdAndUpdate(
          { _id: id },
          {
            statusLife: isNotAllPaymentMade ? rateStatusLive.active : rateStatusLive.finish,
            $set: {
            [`mainBet.idPartyVictory`]: rate.mainBet[mainBet].idParty,
            [`mainBet.paymentMade`]: !isNotAllPaymentMade,
            }
          }
        );
      })
      .then(() => {
        return rateModels.findOne({ _id: id });
      })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        writeToLog.write(err, 'rate_live.err');
        res.status(402).send({ message: 'Ошибка!', err: err.toString()});
      });
    }
  } catch (err) {
    writeToLog.write(err, 'rate_live.err');
    res.status(500).send({ message: `ошибка на стороне серера!`, err })
  }
}
