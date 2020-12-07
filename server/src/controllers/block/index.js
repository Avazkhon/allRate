const blockModels = require('../../models/block');
const rateModels = require('../../models/rate');
const userModels = require('../../models/user');
const WriteToLog = require('../../utils/writeToLog');

const {
  typeBlock
} = require('../../constants');

const writeToLog = new WriteToLog();
exports.createBlock = async (req, res) => {
  try {
    const {
      body,
      query: {
        rateId,
      },
    } = req;
    const block = await blockModels.create(body)
    rateModels.findByIdAndUpdate({ _id: rateId}, {$push: {block: block._id}})
    res.status(200).json(block);
  } catch (error) {
    writeToLog.write(error, 'create_block.error');
    res.status(500).json({ message: 'Ошибка на сервере', error});
  };
};
