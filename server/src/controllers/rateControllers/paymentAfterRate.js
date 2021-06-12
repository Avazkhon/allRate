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
  rateStatusLive,
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
      ]);

      this.rate = await rateModel.findByIdAndUpdate({ _id: rate._id }, { statusLife: rateStatusLive.in_progress });
      this.user = user;
      res.status(200).json(blocks)

      let blocksAfterPaymentMade = await this.makePaymentBlocks(blocks)
      blocksAfterPaymentMade = await this.paymentPercentageAndLeftovers(blocksAfterPaymentMade);

      await blockModel.findByIdAndUpdate(
        { _id: blocksId },
        blocksAfterPaymentMade,
        { 'blocks.bets.participants': false }
      )
      await rateModel.findByIdAndUpdate({ _id: rate._id }, { statusLife: rateStatusLive.finish });
    } catch (error) {
      writeToLog.write(error, 'payment_after_rate.error');
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
   } else if (block.bets[indexbBet].win || !block.status) {
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
         const dataInvoiceForReturn = {
           amount: participants[participantsIndex].amount,
           requisites: { src: this.rate.purseId, target: participants[participantsIndex].purseId}
         };

         if (!block.status && !participants[participantsIndex].paymentMade) {
           await invoiceControllers.createInvoiceForReturnMoney(dataInvoiceForReturn);
           bet.amount -= participants[participantsIndex].amount;
           block.amountAll -= participants[participantsIndex].amount;
           participants[participantsIndex].paymentMade = true;
         } else if (!participants[participantsIndex].paymentMade) {
            const coefficient = Math.floor((block.amountAll / bet.amount * interest.winPercentage) * 100) / 100;
            if (coefficient < 1) {

              await invoiceControllers.createInvoiceForReturnMoney(dataInvoiceForReturn);
              bet.amount -= participants[participantsIndex].amount;
              block.amountAll -= participants[participantsIndex].amount;
              participants[participantsIndex].paymentMade = true;
            } else {

              const dataInvoice = {
                amount: Math.floor(participants[participantsIndex].amount * coefficient),
                requisites: { src: this.rate.purseId, target: participants[participantsIndex].purseId},
              };
              await invoiceControllers.createInvoiceForWin(dataInvoice)

            }

          }
          participants[participantsIndex].paymentMade = true;
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
          await this.makePaymentBooleanParticipants(block.bets[indexbBet], block.type);
          const isPaymentMade = block.bets[indexbBet].participants.every((participant) => {
            if (!block.bets.status && participant.paymentMade) {
              return true
            }
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

  makePaymentBooleanParticipants = async (bets, type, participantsIndex = 0) => {
    try {
      const participant = bets.participants[participantsIndex]
      if(bets.participants.length === participantsIndex) {
        return bets;
      } else {
        const dataInvoiceForReturn = {
          amount: participant.amount,
          requisites: { src: this.rate.purseId, target: participant.purseId},
        };
        if(
          (!bets.status)
          && !participant.paymentMade
        ) {
          await invoiceControllers.createInvoiceForReturnMoney(dataInvoiceForReturn)
          if (participant.noOrYes) {
            bets.amountYes -= participant.amount
          } else {
            bets.amountNo -= participant.amount
          }
          bets.participants[participantsIndex].paymentMade = true;
        } else if ((!participant.paymentMade) && (participant.noOrYes === bets.noOrYes) ) {
          const allAmoun = bets.amountYes + bets.amountNo
          const coefficient = bets.noOrYes ?
            (
              Math.floor((allAmoun / bets.amountYes * interest.winPercentage) * 100) / 100
            )
            :
            (
              Math.floor((allAmoun / bets.amountNo * interest.winPercentage) * 100) / 100
            );
          if (coefficient < 1) {
            await invoiceControllers.createInvoiceForReturnMoney(dataInvoiceForReturn)

            if (bets.noOrYes) {
              bets.amountYes -= participant.amount
            } else {
              bets.amountNo -= participant.amount
            }
            bets.participants[participantsIndex].paymentMade = true;

          } else {

            const dataInvoice = {
              amount: Math.floor(participant.amount * coefficient),
              requisites: { src: this.rate.purseId, target: participant.purseId},
            };
            if(dataInvoice.amount > 0) {
              await invoiceControllers.createInvoiceForWin(dataInvoice)
            }
          }
          bets.participants[participantsIndex].paymentMade = true;


        }
        participantsIndex++
        return this.makePaymentBooleanParticipants(bets, type, participantsIndex)

      }
    } catch (error) {
      writeToLog.write(error, 'make_payment_boolean_participants.err');
      return bets;
    }
  }



  getAmountForPercentage = (blocks) => {
    return blocks.reduce((amount, block) => {
      if(block.type === typeBlock.total) {
        block.amountAll = block.amountAll || 0;
        amount += block.amountAll
      }
      if(block.type === typeBlock.boolean) {
        block.bets.forEach((bet) => {
          bet.amountNo = bet.amountNo || 0;
          bet.amountYes = bet.amountYes || 0;
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
          if(amount > 0) {
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
              blocksAfterPaymentMade.paymentPercentage = true;
              const purse = await purseModel.findOne({ _id: this.rate.purseId}, { amount: true });
              if (purse.amount) {
                const dataInvoiceLeftovers = {
                  amount: purse.amount,
                  requisites: {
                    src: this.rate.purseId,
                    target: superAdmin.purseId
                  }
                }
                await invoiceControllers.createInvoiceForLeftovers(dataInvoiceLeftovers);
              }
            }
        }
        return blocksAfterPaymentMade
      } catch (error) {
        writeToLog.write(error, 'payment_percentage_and_leftovers.err');
      } finally {
        return blocksAfterPaymentMade
      }
  }

}

module.exports = PaymentAfterRate;
