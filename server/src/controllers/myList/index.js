const postModels = require('../../models/post');
const rateModels = require('../../models/rate');
const WriteToLog = require('../../utils/writeToLog');
const { sortByDate } = require('../../utils');

const writeToLog = new WriteToLog();

function getNews (userId) {
  return new Promise((resolve, reject) => {
    const list = [];
    rateModels.getByProps({ author: userId })
    .then(result => list.push(...result))
    .then(() => {
      return postModels.getByProps({ authorId: userId })
      .then(result => list.push(...result));
    })
    .then(() => {
      resolve(sortByDate(list))
    });
  });
};

exports.get = async (req, res) => {
  try {
    const {
      query: {
        userId,
      },
    } = req;
    const result = await getNews(userId);
    res.status(200).json(result);

  } catch (error) {
    writeToLog.write(error, 'get_my_list.error');
    res.status(500).json({ massages: 'error to server', error });
  }
}
