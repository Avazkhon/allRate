const rateModels = require('../../../models/rate');
const WriteToLog = require('../../../utils/writeToLog');
const { rateStatusLive, basisForPayment } = require('../../../constants');
const InvoiceControllers = require('../../invoice');

const invoiceControllers = new InvoiceControllers();
const writeToLog = new WriteToLog();

const makePay = (mainBet, src, index = 0) => (
  new Promise((resolve, reject) => {
    const participant = mainBet.participants[index];
    if (!participant) {
      return;
    }
    const dataInvoice = {
      amount: (participant.meny * mainBet.coefficient).toFixed(2),
      requisites: { src, target: participant.purseId},
      basisForPayment: basisForPayment.win,
      createTime: new Date(),
    }
    return invoiceControllers.createInvoiceForWin(dataInvoice)
    .then((r) => {
      resolve('SUCCESS');
      index++;
      makePay(mainBet, src, index);
    })
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
        res.status(200).send({ message: `статус ставки изменен на ${live}` })
      })
    }

    if (mainBet) {
      const rate = await rateModels.getOneById(id);
      await makePay(rate.mainBet[mainBet], rate.mainBet.purseId)
      .then((r) => {
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
