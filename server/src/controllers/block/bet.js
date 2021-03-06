const blockModels = require('../../models/block');
// const rateModels = require('../../models/rate');
// const userModels = require('../../models/user');
const WriteToLog = require('../../utils/writeToLog');
const writeToLog = new WriteToLog();

exports.postAddBetInBlock = async (req, res) => {
  try {
    const {
      body: {
        id
      },
      query: {
        blocksId,
        blockId,
      },
    } = req;

    const block = await blockModels.findByIdAndUpdate(
      { _id: blocksId},
      {
        $push: {
          'blocks.$[innerBlock].bets': {
            id,
            condition: "",
            participants: [],
          },
        },
      },
      {
        new: true,
        arrayFilters: [{ "innerBlock._id": blockId }],
        fields: { "blocks.bets.participants": 0 }
       }
    )
    let data = block.blocks.find(block => block._id == blockId);
    data = data.bets.find(bet => bet.id == id)
    res.status(200).json(data)
  } catch (error) {
    writeToLog.write(error, 'add_bet.error');
    res.status(500).json({error: error.toString()})
  }
}

exports.deleteBet = async (req, res) => {
  try {
    const {
      query: {
        blocksId,
        blockId,
        betId
      },
    } = req;

    await blockModels.findByIdAndUpdate(
      { _id: blocksId },
      {
        $pull: {
          'blocks.$[innerBlock].bets': { _id: betId }
        },
      },
      {
        new: true,
        arrayFilters: [{ 'innerBlock._id': blockId }],
        fields: { "_id": 0 },
      }
    )
    res.sendStatus(200)
  } catch (error) {
    writeToLog.write(error, 'delete_bet.error');
    res.status(500).json({error: error.toString()})
  }
}
