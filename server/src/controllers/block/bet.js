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
      { new: true, arrayFilters: [{ "innerBlock._id": blockId }] }
    )

    res.status(200).json(block)
  } catch (e) {
    console.log(e);
  }
}
