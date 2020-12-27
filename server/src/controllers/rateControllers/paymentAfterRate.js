const blockModel = require('../../models/block');
const rateModel = require('../../models/rate');
const userModel = require('../../models/user');
const WriteToLog = require('../../utils/writeToLog');
const InvoiceControllers = require('../invoice');

const invoiceControllers = new InvoiceControllers();

const {
  typeBlock,
  interest,
} = require('../../constants');

class PaymentAfterRate {
  constructor(){
    this.rate = null;
  }

  paymentWin = async (req, res) => {
    try {
      const {
        query: {
          blocksId,
        }
      } = req;

      const [ blocks, rate ] = await Promise.all([
        blockModel.findOne({ _id: blocksId}),
        rateModel.findOne({ blockId: blocksId}),
      ])
      this.rate = rate;

      blocks.blocks.forEach((block, i) => {
        if (block.type === typeBlock.total) {
          this.makePaymentTotal(block)
        }
        if (block.type === typeBlock.boolean) {
          this.makePaymentBoolean(block)
        }

      });

      res.status(200).json(blocks)
    } catch (error) {
      res.status(500).json({ error: error.toString() })
    }

  }

  makePaymentTotal = async (block) => {
    const betWin = block.bets.find(bet => !!bet.win);
    await betWin.participants.forEach(async (participant) => {
      const dataInvoice = {
        amount: Math.floor(participant.amount * betWin.coefficient),
        requisites: { src: this.rate.purseId, target: participant.purseId},
      };
      console.log(dataInvoice);
      // await invoiceControllers.createInvoiceForWin(dataInvoice)
    })
  }

  makePaymentBoolean = (block) => {
    const betWin = block.bets.forEach((bet) => {
      bet.participants.forEach(participant => {
        if (participant.noOrYes === bet.noOrYes) {
          const coefficient = bet.noOrYes ? bet.coefficientYes : bet.coefficientNo
          const dataInvoice = {
            amount: Math.floor(participant.amount * coefficient),
            requisites: { src: this.rate.purseId, target: participant.purseId},
          };
          console.log(dataInvoice);
          // invoiceControllers.createInvoiceForWin(dataInvoice)
        }
      })
    })
  }

}

module.exports = PaymentAfterRate;
