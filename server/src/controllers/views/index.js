const postModels = require('../../models/post');
const rateModels = require('../../models/rate');
const WriteToLog = require('../../utils/writeToLog');

const writeToLog = new WriteToLog();

exports.views = async (req, res) => {
  try {
    const {
      query: {
        postId,
        rateId,
      },
    } = req;
    let queryId = null;
    let models = null;
    if (postId) {
      queryId = { _id: postId };
      models = postModels;
    } else if (rateId) {
      queryId = rateId;
      models = rateModels;
    }
    let response = await models.get(queryId);
    if (!response) {
      return res.status(404).json({ message: 'нет поста с таким id' });
    }
    response = await models.findByIdAndUpdate(queryId, { views: ++response.views || 1 });
    res.status(200).json(response);
  } catch (error) {
    writeToLog.write(error, 'views_post.error');
    res.status(500).json({ message: 'Ошибка на сервере', error});
  };
};
