const postModels = require('../../models/post');
const rateModels = require('../../models/rate');
const userModels = require('../../models/user');
const WriteToLog = require('../../utils/writeToLog');

const writeToLog = new WriteToLog();
exports.rating = async (req, res) => {
  try {
    const {
      body: {
        userId,
        makeTime,
      },
      query: {
        postId,
        rateId,
        userId: queryUserId,
        action,
      },
    } = req;
    const positively = 'positively';
    const negative = 'negative';
    if (!userId || !makeTime || !action) {
      return res.status(400).json({
        message: 'не хватате данных',
        userId: `required-${userId}`,
        makeTime: `required-${makeTime}`,
        action: `required-${action}`,
      });
    };

    let models = '';
    let searchById = null;
    if (postId) {
      searchById = { _id: postId };
      models = postModels;
    } else if (queryUserId) {
      searchById = { _id: queryUserId };
      models = userModels.model;
    } else if (rateId) {
      searchById = rateId;
      models = rateModels;
    } else {
      throw 'Не хватает параматров!';
    };

    let response = await models.get(searchById);
    if (response && response.rating && response.rating[action].length) {
      return res.status(200).json(response);
    };

    response = await models.findByIdAndUpdate(
      searchById,
      {
        $push: {
          [`rating.${action}`]: { userId, makeTime }
        },
        $pull: {
          [`rating.${ action === positively ? negative : positively}`]: { userId }
        },
      },
      { new: true }
    );
    res.status(200).json(response);

  } catch (error) {
    writeToLog.write(error, 'get_post.error');
    console.log(error);
    res.status(500).json({ message: 'Ошибка на сервере', error});
  };
};
