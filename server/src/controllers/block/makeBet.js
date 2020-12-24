const blockModel = require('../../models/block');
const rateModel = require('../../models/rate');
const userModel = require('../../models/user');
const InvoiceControllers = require('../invoice');
const WriteToLog = require('../../utils/writeToLog');

const {
  typeBlock,
  interest,
} = require('../../constants');


const invoiceControllers = new InvoiceControllers();
const writeToLog = new WriteToLog();

class MakeRate {

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
          '$set': this.changeCoefficients(blockBefore.blocks, blockId, betId, body.amount, body.participants.noOrYes),
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

  createInvoice = async (dataInvoice) => {
    return invoiceControllers.createInvoiceForMakeRate(dataInvoice)
  }

  changeCoefficients = (blocks, blockId, betId, amount, noOrYes) => {
    const block = blocks.find(block => block._id == blockId)
    if (block.type === typeBlock.boolean) {
      const bet = block.bets.find(bet => bet._id == betId)

      if(noOrYes) {
        bet.amountYes +=  amount;
      } else {
        bet.amountNo += amount;
      }
      const allAmoun = bet.amountNo + bet.amountYes;

      const coefficientYes = (allAmoun / bet.amountYes * interest.winPercentage).toFixed(2)
      const coefficientNo = (allAmoun / bet.amountNo * interest.winPercentage).toFixed(2)
      return {
        ['blocks.$[innerBlock].bets.$[innerBets].coefficientYes']: Number(coefficientYes),
        ['blocks.$[innerBlock].bets.$[innerBets].coefficientNo']: Number(coefficientNo),
        ['blocks.$[innerBlock].bets.$[innerBets].amountYes']: bet.amountYes,
        ['blocks.$[innerBlock].bets.$[innerBets].amountNo']: bet.amountNo,
      }
    } else {
      const coefficient = (block.amount / amount * interest.winPercentage).toFixed(2)
        return { ['blocks.$[innerBlock].bets.coefficient']: Number(coefficient) }
    }
  }

}

module.exports = MakeRate;
