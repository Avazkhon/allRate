const supportModels = require('../../models/support');
const WriteToLog = require('../../utils/writeToLog');
const { getParamsForSearchDB } = require('../../utils');

const writeToLog = new WriteToLog()

exports.crateSupport = (req, res) => {
  const {
    body,
    session: { user }
  } = req;
  const data = body;
  if(user.userId) {
    data.userId = user.userId
  }
  supportModels.create(data)
    .then((result) => {
      res.status(201).json(result)
    })
    .catch((error) => {
      res.status(500).json({ error })
    })
}

exports.getSupport = async (req, res) => {
  try {
    const {
      query: params,
      query: {
        supportId,
        limit,
        page,
        // authorId,
      },
    } = req;
    let data = null;
    if (supportId) {
      data = await supportModels.findOne({ _id: supportId });
    } else {
      let query = { ...getParamsForSearchDB(params, ['page', 'limit' ]) };

      const options = {
        sort: { createDate: -1 },
        limit: limit || 24,
        page: page || 1,
      }

      data = await supportModels.paginate(query, options);
    }
    res.status(200).json(data);
  } catch (error) {
    writeToLog.write(error, 'get_post.error');
    res.status(500).json(error.toString());
  };
};
