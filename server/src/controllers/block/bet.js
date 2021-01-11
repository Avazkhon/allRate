const blockModels = require('../../models/block');
// const rateModels = require('../../models/rate');
// const userModels = require('../../models/user');
const WriteToLog = require('../../utils/writeToLog');

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
  } catch (e) {
    console.log(e);
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

    const block = await blockModels.findByIdAndUpdate(
      { _id: blocksId },
      {
        $pull: {
          'blocks.$[innerBlock].bets': { _id: betId }
        },
      },
      { new: true, arrayFilters: [{ 'innerBlock._id': blockId }] }
    )

    res.status(200).json(block)
  } catch (e) {
    console.log(e);
  }
}
