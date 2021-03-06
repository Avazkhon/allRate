const blockModel = require('../../models/block');
const rateModel = require('../../models/rate');
const userModel = require('../../models/user');
const purseModels = require('../../models/purse');
const InvoiceControllers = require('../invoice');
const WriteToLog = require('../../utils/writeToLog');

const {
  typeBlock,
  interest,
} = require('../../constants');


const invoiceControllers = new InvoiceControllers();
const writeToLog = new WriteToLog();

class MakeRate {
  constructor () {
    this.blocks = {}
    this.arrayFilters = []
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

      const [user, rate, blockBefore, purse] = await Promise.all([
        userModel.findOne({ _id: userSession.userId }),
        rateModel.findOne({ blockId: blocksId }),
        blockModel.findOne({ _id: blocksId }, { 'blocks.bets.participants': false }),
        purseModels.findOne({ userId: userSession.userId }, { 'amount': true })
      ]);

      if (purse.amount < body.participants.amount ) {
        return res.status(400).json({ message: 'Недостаточно средств'});
      }

      this.blocks = blockBefore;

      const invoice = await this.createInvoice({
        amount: body.participants.amount,
        authorId: user._id,
        requisites: {
          src: user.purseId,
          target: rate.purseId
        }
      })

      const participants = {
        userId: user._id,
        purseId: user.purseId,
        amount: body.participants.amount,
      }
      if (body.participants.hasOwnProperty('noOrYes')) {
        participants.noOrYes = body.participants.noOrYes
      }
      await blockModel.findByIdAndUpdate(
        {
          _id: blocksId,
        },
        {
          '$set': await this.changeCoefficients(blockBefore.blocks, blockId, betId, participants.amount, participants.noOrYes),
          '$push': { ['blocks.$[innerBlock].bets.$[innerBets].participants']: participants }
        },
        {
          arrayFilters: [{ "innerBlock._id": blockId }, { "innerBets._id": betId }, ...this.arrayFilters], // позволяет найти массив в массиве
          select: '_id'
        }
      );

      res.status(200).json(invoice);
    } catch (error) {
      writeToLog.write(error, 'add_participant.error');
      res.status(500).json({ message: 'Ошибка на сервере', error: error.toString()});
    };
  }

  createInvoice = async (dataInvoice) => {
    return invoiceControllers.createInvoiceForMakeRate(dataInvoice)
  }

  changeCoefficients = async (blocks, blockId, betId, amount, noOrYes) => {
    try {
      const block = blocks.find(block => block._id == blockId)
      const bet = block.bets.find(bet => bet._id == betId)
      if (block.type === typeBlock.boolean) {
        bet.amountYes = bet.amountYes || 0;
        bet.amountNo = bet.amountNo || 0;
        if(noOrYes) {
          bet.amountYes +=  amount;
        } else {
          bet.amountNo += amount;
        }
        const allAmoun = bet.amountNo + bet.amountYes;

        const coefficientYes = (allAmoun / bet.amountYes * interest.winPercentage).toFixed(2);
        const coefficientNo = (allAmoun / bet.amountNo * interest.winPercentage).toFixed(2);

        return {
          ['blocks.$[innerBlock].bets.$[innerBets].coefficientYes']: Number(coefficientYes),
          ['blocks.$[innerBlock].bets.$[innerBets].coefficientNo']: Number(coefficientNo),
          ['blocks.$[innerBlock].bets.$[innerBets].amountYes']: bet.amountYes,
          ['blocks.$[innerBlock].bets.$[innerBets].amountNo']: bet.amountNo,
        }
      } else {
        block.amountAll = block.amountAll || 0;
        bet.amount = bet.amount || 0;
        block.amountAll += amount;
        let result = {}

          block.bets.forEach((betItm, index) => {
            betItm.amount = betItm.amount || 0
            if (betItm._id == bet._id ) {

              result = {
                ...result,
                [`blocks.$[innerBlock].bets.$[index${index}].coefficient`]: (block.amountAll / (betItm.amount + amount) * interest.winPercentage).toFixed(2),
                [`blocks.$[innerBlock].bets.$[index${index}].amount`]: bet.amount + amount,
              }

            } else {
              result = {
                ...result,
                [`blocks.$[innerBlock].bets.$[index${index}].coefficient`]: (block.amountAll / betItm.amount * interest.winPercentage).toFixed(2),
              }
            }
            this.arrayFilters.push({[`index${index}._id`]: betItm._id});

          })

          return {...result, ['blocks.$[innerBlock].amountAll']: block.amountAll}
      }
    } catch (error) {
      writeToLog.write(error, 'change_coefficients.error');
    }
  }

}

module.exports = MakeRate;
