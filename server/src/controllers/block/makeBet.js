const blockModels = require('../../models/block');
const rateModels = require('../../models/rate');
const userModels = require('../../models/user');
const InvoiceControllers = require('../invoice');
const WriteToLog = require('../../utils/writeToLog');

const {
  typeBlock
} = require('../../constants');

const invoiceControllers = new InvoiceControllers();
const writeToLog = new WriteToLog();

class MakeRate {


  createInvoice = async (dataInvoice) => {
    return invoiceControllers.createInvoiceForMakeRate(dataInvoice)
  }


  makeBet = async (req, res) => {
    try {
      const {
        body,
        query: {
          blocksId,
          blockId,
          betId,
        },
        session: {
          user: userSession
        }
      } = req;

      const [user, rate] = await Promise.all([
        userModels.findOne({ _id: userSession.userId }),
        rateModels.findOne({ blockId: blocksId })
      ]);

      const invoice = await this.createInvoice({
        amount: body.amount,
        authorId: user._id,
        requisites: {
          src: user.purseId,
          target: rate.purseId
        }
      })

      const block = await blockModels.findByIdAndUpdate(
        {
          _id: blocksId,
        },
        {
          '$push': { ['blocks.$[innerBlock].bets.$[innerBets].participants']: body.participants }
        },
        {
          arrayFilters: [{ "innerBlock._id": blockId }, { "innerBets._id": betId }], // позволяет найти массив в массиве
          new: true
        }
      )
      res.status(200).json(invoice);
    } catch (error) {
      writeToLog.write(error, 'add_participant.error');
      res.status(500).json({ message: 'Ошибка на сервере', error: error.toString()});
    };
  }
}

module.exports = MakeRate;
