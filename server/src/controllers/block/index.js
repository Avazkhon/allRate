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
    rateModels.findByIdAndUpdate({ _id: rateId}, {blockId: block._id})
    res.status(200).json(block);
  } catch (error) {
    writeToLog.write(error, 'create_block.error');
    res.status(500).json({ message: 'Ошибка на сервере', error});
  };
};

exports.findOne = async (req, res) => {
  try {
    const {
      query: {
        rateId,
      },
    } = req;
    const block = await blockModels.findOne({ _id: rateId})
    res.status(200).json(block);
  } catch (error) {
    writeToLog.write(error, 'get_block_by_id.error');
    res.status(500).json({ message: 'Ошибка на сервере', error: error.toString()});
  };
};

exports.updateOne = async (req, res) => {
  try {
    const {
      body
    } = req;

    const block = await blockModels.findByIdAndUpdate({ _id: body._id}, body, { new: true })
    res.status(200).json(block);
  } catch (error) {
    writeToLog.write(error, 'put_block_by_id.error');
    res.status(500).json({ message: 'Ошибка на сервере', error: error.toString()});
  };
};

exports.addParticipant = async (req, res) => {
  try {
    const {
      body,
      query: {
        rateId,
        participantId,
      },
    } = req;

    const block = await blockModels.findByIdAndUpdate(
      {
        _id: rateId,
        ['bets._id']: participantId
      },
      {
        '$push': { ['bets.participants']: body }
      },
      { new: true }
    )
    res.status(200).json(block);
  } catch (error) {
    writeToLog.write(error, 'put_block_by_id.error');
    res.status(500).json({ message: 'Ошибка на сервере', error: error.toString()});
  };
};
