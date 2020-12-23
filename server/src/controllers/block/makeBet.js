const blockModel = require('../../models/block');
const rateModel = require('../../models/rate');
const userModel = require('../../models/user');
const InvoiceControllers = require('../invoice');
const WriteToLog = require('../../utils/writeToLog');

const {
  typeBlock
} = require('../../constants');

const invoiceControllers = new InvoiceControllers();
const writeToLog = new WriteToLog();

class MakeRate {

  changeCoefficients = (blocks, id) => {
    const block = blocks.find(block => block._id == id)
    if (block.type === 'boolean') {
      return { ['blocks.$[innerBlock].bets.$[innerBets].coefficient']: 2 }
    } else {
        return { ['blocks.$[innerBlock].bets.coefficient']: 2 }
    }
  }

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

      const [user, rate, blockBefore] = await Promise.all([
        userModel.findOne({ _id: userSession.userId }),
        rateModel.findOne({ blockId: blocksId }),
        blockModel.findOne({ _id: blocksId })
      ]);

      const invoice = await this.createInvoice({
        amount: body.amount,
        authorId: user._id,
        requisites: {
          src: user.purseId,
          target: rate.purseId
        }
      })

      const block = await blockModel.findByIdAndUpdate(
        {
          _id: blocksId,
        },
        {
          '$set': this.changeCoefficients(blockBefore.blocks, blockId),
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
