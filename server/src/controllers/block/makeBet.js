const blockModels = require('../../models/block');
// const rateModels = require('../../models/rate');
// const userModels = require('../../models/user');
const WriteToLog = require('../../utils/writeToLog');

const {
  typeBlock
} = require('../../constants');

class MakeRate {

  writeToLog = new WriteToLog();

  makeBet = async (req, res) => {
    try {
      const {
        body,
        query: {
          blocksId,
          blockId,
          betId,
        },
      } = req;

      const block = await blockModels.findByIdAndUpdate(
        {
          _id: blocksId,
        },
        {
          '$push': { ['blocks.$[innerBlock].bets.$[innerBets].participants']: body }
        },
        {
          arrayFilters: [{ "innerBlock._id": blockId }, { "innerBets._id": betId }], // позволяет найти массив в массиве
          new: true
        }
      )
      res.status(200).json(block);
    } catch (error) {
      this.writeToLog.write(error, 'add_participant.error');
      res.status(500).json({ message: 'Ошибка на сервере', error: error.toString()});
    };
  }
}

module.exports = MakeRate;
