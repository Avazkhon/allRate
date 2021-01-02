const blockModel = require('../../models/block');
const rateModel = require('../../models/rate');
const userModel = require('../../models/user');
const purseModel = require('../../models/purse');
const WriteToLog = require('../../utils/writeToLog');
const InvoiceControllers = require('../invoice');

const invoiceControllers = new InvoiceControllers();

const {
  typeBlock,
  interest,
  superAdmin,
} = require('../../constants');

class PaymentAfterRate {
  constructor(){
    this.rate = null;
    this.user = null;
  }

  paymentWin = async (req, res) => {
    try {
      const {
        query: {
          blocksId,
        },
        session: {
          user: userSession
        }
      } = req;
      if (!userSession.userId) {
        return res.status(401);
      }

      const [ blocks, rate, user ] = await Promise.all([
        blockModel.findOne({ _id: blocksId}),
        rateModel.findOne({ blockId: blocksId}),
        userModel.findOne({ _id: userSession.userId }),
      ])
      this.rate = rate;
      this.user = user;

      let blocksAfterPaymentMade = await this.makePaymentBlocks(blocks)
      blocksAfterPaymentMade = await this.paymentPercentageAndLeftovers(blocksAfterPaymentMade);

      const blocksAfterUpdate = await blockModel.findByIdAndUpdate(
        { _id: blocksId },
        blocksAfterPaymentMade
      )

      res.status(200).json(blocksAfterUpdate)
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



  getAmountForPercentage = (blocks) => {
    return blocks.reduce((amount, block) => {
      if(block.type === typeBlock.total) {
        amount += block.amountAll
      }
      if(block.type === typeBlock.boolean) {
        block.bets.forEach((bet) => {
          amount += bet.amountNo + bet.amountYes;
        });
      }

      return amount
    }, 0)
  }


  paymentPercentageAndLeftovers = async (blocksAfterPaymentMade) => {
      try {
        const isPaymentMade = blocksAfterPaymentMade.blocks.some( block => block.paymentMade )
        if(isPaymentMade && !blocksAfterPaymentMade.paymentPercentage) {
          const amount = this.getAmountForPercentage(blocksAfterPaymentMade.blocks);
          const dataInvoiceAuthor = {
            amount: Math.floor(amount * interest.percentage),
            requisites: {
              src: this.rate.purseId,
              target: this.user.purseId
            }
          }
          const dataInvoiceService = {
            amount: Math.floor(amount * interest.percentage),
            requisites: {
              src: this.rate.purseId,
              target: superAdmin.purseId
            }
          }
          await invoiceControllers.createInvoiceForPercentage(dataInvoiceAuthor);
          await invoiceControllers.createInvoiceForPercentage(dataInvoiceService);
          const purse = await purseModel.findOne({ _id: this.rate.purseId});
          if (purse.amount) {
            const dataInvoiceLeftovers = {
              amount: Math.floor(purse.amount),
              requisites: {
                src: this.rate.purseId,
                target: superAdmin.purseId
              }
            }
            await invoiceControllers.createInvoiceForLeftovers(dataInvoiceLeftovers);
          }

          blocksAfterPaymentMade.paymentPercentage = true;

        }
        return blocksAfterPaymentMade
      } catch (e) {
        console.log(e);
      } finally {
        return blocksAfterPaymentMade
      }
  }

}

module.exports = PaymentAfterRate;
