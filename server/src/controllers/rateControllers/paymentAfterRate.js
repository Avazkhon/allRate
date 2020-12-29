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

      const asd = await this.makePaymentBlocks(blocks)
      console.log(asd);

      res.status(200).json(asd)
    } catch (error) {
      res.status(500).json({ error: error.toString() })
    }

  }


  makePaymentBlocks = async (blocks, blocksIndex = 0) => {
    try {
      if (blocks.blocks.length === blocksIndex) {
        return blocks
      } else {
        if (blocks.blocks[blocksIndex].type === typeBlock.total) {

          if (!blocks.blocks[blocksIndex].paymentMade) {
            await this.makePaymentTotal(blocks.blocks[blocksIndex])
            blocks.blocks[blocksIndex].paymentMade = true
          }

          blocksIndex++
          return this.makePaymentBlocks(blocks, blocksIndex)
        }
        if (blocks.blocks[blocksIndex].type === typeBlock.boolean) {

          if (!blocks.blocks[blocksIndex].paymentMade) {
            await this.makePaymentBoolean(blocks.blocks[blocksIndex])
            blocks.blocks[blocksIndex].paymentMade = true
          }

          blocksIndex++
          return this.makePaymentBlocks(blocks, blocksIndex)
        }
      }
    } catch (e) {
      console.log('e', e);
      return blocks
    }
  }



  makePaymentTotal = async (block, indexbBet = 0) => {
    if(block.bets.length === indexbBet) {
      console.log('finish makePaymentTotal');
     return block
    } else if (block.bets[indexbBet].win) {

        if (!block.bets[indexbBet].paymentMade) {
          await this.makePaymentTotalParticipants(block.bets[indexbBet].participants, block.bets[indexbBet].coefficient)
          block.bets[indexbBet].paymentMade = true
        }

        indexbBet++
        return this.makePaymentTotal(block, indexbBet)
    } else {
        indexbBet++
        return this.makePaymentTotal(block, indexbBet)
    }
  }

  makePaymentTotalParticipants = async (participants, coefficient, participantsIndex = 0) => {
    try {
      if(participants.length === participantsIndex) {
          console.log('finish makePaymentTotalParticipants');
         return participants
       } else {

          if (!participants[participantsIndex].paymentMade) {
            const dataInvoice = {
              amount: Math.floor(participants[participantsIndex].amount * coefficient),
              requisites: { src: this.rate.purseId, target: participants[participantsIndex].purseId},
            };
            await invoiceControllers.createInvoiceForWin(dataInvoice)
            participants[participantsIndex].paymentMade = true;
          }

          participantsIndex++
          return this.makePaymentTotalParticipants(participants, coefficient, participantsIndex)
       }
    } catch (e) {
        console.log('e', e);
        return participants
    }
  }




  makePaymentBoolean = async (block, indexbBet = 0) => {
    try {
      if (block.bets.length === indexbBet) {
        console.log('finish makePaymentBoolean');
        return block
      } else {
        if(!block.bets[indexbBet].paymentMade) {
          await this.makePaymentBooleanParticipants(block.bets[indexbBet]);
          block.bets[indexbBet].paymentMade = true
        }
        indexbBet++
        return this.makePaymentBoolean(block, indexbBet)
      }
    } catch (e) {
      console.log('e', e);
      return block;
    }
  }

  makePaymentBooleanParticipants = async(bets, participantsIndex = 0) => {
    try {
      if(bets.participants.length === participantsIndex) {
        console.log('finish makePaymentBooleanParticipants');
        return bets;
      } else {
        if ((bets.participants[participantsIndex].noOrYes === bets.noOrYes) && (!bets.participants[participantsIndex].paymentMade)) {
          const coefficient = bets.noOrYes ? bets.coefficientYes : bets.coefficientNo;

          const dataInvoice = {
            amount: Math.floor(bets.participants[participantsIndex].amount * coefficient),
            requisites: { src: this.rate.purseId, target: bets.participants[participantsIndex].purseId},
          };
          await invoiceControllers.createInvoiceForWin(dataInvoice)
          bets.participants[participantsIndex].paymentMade = true;
        }
        participantsIndex++
        return this.makePaymentBooleanParticipants(bets, participantsIndex)
      }
    } catch (e) {
      console.log('e', e);
      return bets;
    }
  }

}

module.exports = PaymentAfterRate;
