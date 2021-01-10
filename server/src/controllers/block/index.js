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
    const block = await blockModels.findOne({ _id: rateId}, { 'blocks.bets.participants': false })
    res.status(200).json(block);
  } catch (error) {
    writeToLog.write(error, 'get_block_by_id.error');
    res.status(500).json({ message: 'Ошибка на сервере', error: error.toString()});
  };
};

exports.changeBlocks = async (req, res) => {
  try {
    const {
      body
    } = req;
    const data = {
    };
    body.blocks.forEach((block, indexBlock) => {
      data[`blocks.${indexBlock}.title`] = block.title;
      data[`blocks.${indexBlock}.description`] = block.description;
      data[`blocks.${indexBlock}.id`] = block.id;
      data[`blocks.${indexBlock}.type`] = block.type;
      block.bets.forEach((bet, indexbBet) => {
        const propName = (bet.hasOwnProperty('noOrYes') && 'noOrYes') || (bet.hasOwnProperty('win') && 'win')
        const propValue = (bet.hasOwnProperty('noOrYes') && bet.noOrYes) || (bet.hasOwnProperty('win') && bet.win)
        data[`blocks.${indexBlock}.bets.${indexbBet}.condition`] = bet.condition;
        data[`blocks.${indexBlock}.bets.${indexbBet}.id`] = bet.id;
        if (propName) {
          data[`blocks.${indexBlock}.bets.${indexbBet}.${propName}`] = propValue;
        }
      })
    })

    const block = await blockModels.findByIdAndUpdate(
      { _id: body._id},
      { $set: data },
      { fields: { "blocks.bets.participants": 0 }, new: true }
    )
    res.status(200).json(block);
  } catch (error) {
    writeToLog.write(error, 'put_block_by_id.error');
    res.status(500).json({ message: 'Ошибка на сервере', error: error.toString()});
  };
};


exports.addBlocks = async (req, res) => {
  try {
    const {
      body: {
        id
      },
      query: {
        blocksId,
      },
    } = req;
    const block = await blockModels.findByIdAndUpdate(
      { _id: blocksId},
      {
        $push: {
          blocks: {
            id,
            title: {
              value: '',
          },
            description: {
              value: '',
            },
            type: 'boolean'
          },
        },
      },
      { new: true }
    )
    res.status(200).json(block)
  } catch (e) {
    console.log(e);
  }
}

exports.deleteBlock = async (req, res) => {
  try {
    const {
      query: {
        blocksId,
        blockId,
      },
    } = req;
    const block = await blockModels.findByIdAndUpdate(
      { _id: blocksId},
      {
        $pull: {
          blocks: {
            _id: blockId,
          },
        },
      },
      { new: true }
    )

    res.status(200).json(block)
  } catch (e) {
    console.log(e);
  }
}
