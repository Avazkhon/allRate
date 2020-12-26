const blockModel = require('../../models/block');
const rateModel = require('../../models/rate');
const userModel = require('../../models/user');
const InvoiceControllers = require('../invoice');
const WriteToLog = require('../../utils/writeToLog');

class PaymentAfterRate {

  paymentWin = async (req, res) => {
    try {
      const {
        query: {
          blocksId,
        }
      } = req;
      const blocks = await blockModel.findOne({ _id: blocksId})

      res.status(200).json(blocks)
    } catch (error) {
      res.status(500).json({ error: error.toString() })
    }

  }

}

module.exports = PaymentAfterRate;
