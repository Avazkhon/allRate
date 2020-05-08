const postModels = require('../../models/post');
const rateModels = require('../../models/rate');
const userModels = require('../../models/user');
const subscribersModels = require('../../models/subscribers');
const WriteToLog = require('../../utils/writeToLog');

const writeToLog = new WriteToLog();

function getNews (subscribers, news = [], index = 0) {
  return new Promise((resolve, reject) => {
    if (!subscribers[index]) {
      resolve(news);
      return;
    }
    const userId = subscribers[index].userId;
    rateModels.getByProps({ author: userId })
    .then(result => news.push(...result))
    .then(() => {
      return postModels.getByProps({ authorId: userId })
      .then(result => news.push(...result));
    })
    .then(() => {
      getNews(subscribers, news, ++index);
      resolve(news)
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
    const user = await userModels.findOne({ _id: userId })
    const subscribers = await subscribersModels.get({ _id: user.subscribersId })
    const result = await getNews(subscribers.subscribers);
    res.status(200).json(result);

  } catch (error) {
    writeToLog.write(error, 'get_my_news.error');
    res.status(500).json({ massages: 'error to server', error });
  }
}
