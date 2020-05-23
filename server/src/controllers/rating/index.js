const postModels = require('../../models/post');
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
        action
      },
    } = req;
    const positively = 'positively';
    const negative = 'negative';
    if (!userId || !makeTime || !postId || !action) {
      res.status(400).json({
        message: 'не хватате данных',
        userId: `required-${userId}`,
        makeTime: `required-${makeTime}`,
        postId: `required-${postId}`,
        action: `required-${action}`,
      });
    }
    const post = await postModels.findByIdAndUpdate(
      { _id: postId },
      {
        $push: {
          [`rating.${action}`]: { userId, makeTime }
        },
        $pull: {
          [`rating.${ action === positively ? negative : positively}`]: { userId }
        },
      }
    );
    res.status(200).json(post);

  } catch (error) {
    writeToLog.write(error, 'get_post.error');
    console.log(error);
    res.status(500).json({ message: 'Ошибка на сервере', error});
  };
};
