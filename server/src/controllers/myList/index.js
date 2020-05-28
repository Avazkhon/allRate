const postModels = require('../../models/post');
const rateModels = require('../../models/rate');
const userModels = require('../../models/user');
const subscribersModels = require('../../models/subscribers');
const WriteToLog = require('../../utils/writeToLog');
const { sortByDate } = require('../../utils');

const writeToLog = new WriteToLog();

function getMyList (userId) {
  return new Promise((resolve, reject) => {
    const list = [];
    rateModels.getByProps({ authorId: userId })
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

function getMyNews (subscribers, news = [], index = 0) {
  return new Promise((resolve, reject) => {
    if (!subscribers[index]) {
      resolve(news);
      return;
    }
    const userId = subscribers[index].userId;
    rateModels.getByProps({ authorId: userId })
    .then(result => news.push(...result))
    .then(() => {
      return postModels.getByProps({ authorId: userId })
      .then(result => news.push(...result));
    })
    .then(() => {
      getMyNews(subscribers, news, ++index);
      resolve(news)
    });
  });
};

const myList = async (req, res) => {
  try {
    const {
      query: {
        userId,
      },
    } = req;
    const result = await getMyList(userId);
    res.status(200).json(result);

  } catch (error) {
    writeToLog.write(error, 'get_my_list.error');
    res.status(500).json({ massages: 'error to server', error });
  }
};

const myNews = async (req, res) => {
  try {
    const {
      query: {
        userId,
      },
    } = req;
    const user = await userModels.findOne({ _id: userId })
    const subscribers = await subscribersModels.get({ _id: user.subscribersId })
    const result = await getMyNews(subscribers.subscribers);
    res.status(200).json(sortByDate(result));

  } catch (error) {
    writeToLog.write(error, 'get_my_news.error');
    console.log(error);
    res.status(500).json({ massages: 'error to server', error });
  }
};

const allNews = async (req, res) => {
  try {
    const rates = await rateModels.getByProps({});
    const posts = await postModels.getByProps({});

    const response = sortByDate([...rates, ...posts]);
    res.status(200).json(response);
  } catch (error) {
    writeToLog.write(error, 'get_all_news.error');
    res.status(500).json({ massages: 'error to server', error });
  }
}

exports.get = async (req, res) => {
  const {
    query: {
      nameList,
    },
  } = req;
  if (nameList === 'allNews') {
    allNews(req, res);
  } else if (nameList === 'myNews') {
    myNews(req, res);
  } else if (nameList === 'myList') {
    myList(req, res);
  } else {
    res.status(400).json({ massages: 'Не хватате параметров!' })
  };
}
