const blockModel = require('../../models/block');
const rateModel = require('../../models/rate');
const userModel = require('../../models/user');
const purseModel = require('../../models/purse');
const WriteToLog = require('../../utils/writeToLog');
const InvoiceControllers = require('../invoice');

const invoiceControllers = new InvoiceControllers();
const writeToLog = new WriteToLog();

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
            await this.makePaymentTotal(blocks.blocks[blocksIndex]);
            const isPaymentMade = blocks.blocks[blocksIndex].bets.some(bet => bet.paymentMade)
            blocks.blocks[blocksIndex].paymentMade = isPaymentMade
          }

          blocksIndex++
          return this.makePaymentBlocks(blocks, blocksIndex)
        }
        if (blocks.blocks[blocksIndex].type === typeBlock.boolean) {

          if (!blocks.blocks[blocksIndex].paymentMade) {
            await this.makePaymentBoolean(blocks.blocks[blocksIndex])
            const isPaymentMade = blocks.blocks[blocksIndex].bets.every( bet => bet.paymentMade)
            blocks.blocks[blocksIndex].paymentMade = isPaymentMade
          }

          blocksIndex++
          return this.makePaymentBlocks(blocks, blocksIndex)
        }
      }
    } catch (error) {
      writeToLog.write(error, 'make_payment_blocks.err');
      return blocks
    }
  }



  makePaymentTotal = async (block, indexbBet = 0) => {
    if(block.bets.length === indexbBet) {
     return block
    } else if (block.bets[indexbBet].win) {

        if (!block.bets[indexbBet].paymentMade) {
          await this.makePaymentTotalParticipants(block.bets[indexbBet].participants, block, block.bets[indexbBet])
          const isPaymentMade = block.bets[indexbBet].participants.every(participant => participant.paymentMade)
          block.bets[indexbBet].paymentMade = isPaymentMade
        }

        indexbBet++
        return this.makePaymentTotal(block, indexbBet)
    } else {
        indexbBet++
        return this.makePaymentTotal(block, indexbBet)
    }
  }

  makePaymentTotalParticipants = async (participants, block, bet, participantsIndex = 0) => {
    try {
      if(participants.length === participantsIndex) {
         return participants
       } else {

          if (!participants[participantsIndex].paymentMade) {

            if (bet.coefficient === interest.winPercentage) {

              const dataInvoice = {
                amount: participants[participantsIndex].amount,
                requisites: { src: this.rate.purseId, target: participants[participantsIndex].purseId}
              };

              await invoiceControllers.createInvoiceForReturnMoney(dataInvoice);
              bet.amount - participants[participantsIndex].amount;
              block.amountAll - participants[participantsIndex].amount;

            } else {

              const dataInvoice = {
                amount: Math.floor(participants[participantsIndex].amount * bet.coefficient),
                requisites: { src: this.rate.purseId, target: participants[participantsIndex].purseId},
              };
              await invoiceControllers.createInvoiceForWin(dataInvoice)

            }
            participants[participantsIndex].paymentMade = true;

          }

          participantsIndex++
          return this.makePaymentTotalParticipants(participants, block, bet, participantsIndex)
       }
    } catch (error) {
        writeToLog.write(error, 'make_payment_total_participants.err');
        return participants
    }
  }




  makePaymentBoolean = async (block, indexbBet = 0) => {
    try {
      if (block.bets.length === indexbBet) {
        return block
      } else {
        if(!block.bets[indexbBet].paymentMade) {
          await this.makePaymentBooleanParticipants(block.bets[indexbBet]);
          const isPaymentMade = block.bets[indexbBet].participants.every((participant) => {
            if (typeof block.bets[indexbBet].noOrYes === 'undefined') {
              return false
            }
            if(participant.noOrYes === block.bets[indexbBet].noOrYes) {
              return participant.paymentMade
            }
            return true
          })
          block.bets[indexbBet].paymentMade = isPaymentMade
        }
        indexbBet++
        return this.makePaymentBoolean(block, indexbBet)
      }
    } catch (error) {
      writeToLog.write(error, 'make_payment_boolean.err');
      return block;
    }
  }

  makePaymentBooleanParticipants = async (bets, participantsIndex = 0) => {
    try {
      if(bets.participants.length === participantsIndex) {
        return bets;
      } else {
        if ((bets.participants[participantsIndex].noOrYes === bets.noOrYes) && (!bets.participants[participantsIndex].paymentMade)) {
          const coefficient = bets.noOrYes ? bets.coefficientYes : bets.coefficientNo;

          if (coefficient === interest.winPercentage) {
            const dataInvoice = {
              amount: bets.participants[participantsIndex].amount,
              requisites: { src: this.rate.purseId, target: bets.participants[participantsIndex].purseId},
            };
            await invoiceControllers.createInvoiceForReturnMoney(dataInvoice)

            if (bets.noOrYes) {
              bets.amountYes - bets.participants[participantsIndex].amount
            } else {
              bets.amountNo - bets.participants[participantsIndex].amount
            }

          } else {

            const dataInvoice = {
              amount: Math.floor(bets.participants[participantsIndex].amount * coefficient),
              requisites: { src: this.rate.purseId, target: bets.participants[participantsIndex].purseId},
            };

            await invoiceControllers.createInvoiceForWin(dataInvoice)
          }

          bets.participants[participantsIndex].paymentMade = true;

        }
        participantsIndex++
        return this.makePaymentBooleanParticipants(bets, participantsIndex)

      }
    } catch (error) {
      writeToLog.write(error, 'make_payment_boolean_participants.err');
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
        const isPaymentMade = blocksAfterPaymentMade.blocks.every( block => block.paymentMade )

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

        }
        blocksAfterPaymentMade.paymentPercentage = true;
        return blocksAfterPaymentMade
      } catch (error) {
        writeToLog.write(error, 'payment_percentage_and_leftovers.err');
      } finally {
        return blocksAfterPaymentMade
      }
  }

}

module.exports = PaymentAfterRate;
