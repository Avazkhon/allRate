const userModels = require('../../models/user');
const subscriptionsModels = require('../../models/subscriptions');
const subscribersModels = require('../../models/subscribers');
const getUser = require('./getUser');
const WriteToLog = require('../../utils/writeToLog');
const purseControllers = require('../purse');

const writeToLog = new WriteToLog();

exports.getUser = (req, res) => {
  const { id, userName, all } = req.query;
  const params =
  (id && {id}) ||
  (userName && {userName}) ||
  (all === 'true' && {all});

  if (params) {
    return getUser.getOne(params, res); // эта функция сама определяет какой тип параметра
  }

  res.status = 400;
  res.send('Нет параметров!')
}

exports.craeteUser = async (req, res) => {
  try {
    let user = await userModels.create(req.body);
    await purseControllers.createPurse({
      createTime: req.body.dateCreate,
      userId: user._id
    });
    const subscription = await subscriptionsModels.create({
      userId: user._id,
      subscriptions: [],
    });
    const subscribers = await subscribersModels.create({
      userId: user._id,
      subscribers: [],
    });
    user = await userModels.findByIdAndUpdate(
      { _id: user._id },
      {'$set': {
          subscriptionsId: subscription._id,
          subscribersId: subscribers._id,
        }
      }
    );
    res.status(201).json(user);
  } catch(error) {
    writeToLog.write(error, 'create_user.error')
    res.status = 400;
    res.json(error);
  };
}

exports.updateOne = (req, res) => {
  const { id } = req.query;
  const { email, userName, password, isAdmin } = req.body;
  const user = { email, userName, password, isAdmin: false };

  if (!req.session.user) {
    res.status = 403;
    return res.send('Нет прав!');
  }

  if (req.session.user.isAdmin) {
    user.isAdmin = isAdmin || false;
  }

  userModels.findByIdAndUpdate({ _id: id }, user)
  .then(result => res.status(200).json(result))
  .then((error) => {
    res.status(500).json(error);
    writeToLog.write(error, 'update_user.error');
  })
}

exports.deleteOne = (req, res) => {
  const { id } = req.query;
  userModels.deleteOne({ _id: id })
  .then(() => res.status(200).json({ messages: 'Пользователь успешно удален!' }))
  .catch((error) => {
    writeToLog.write(error, 'delete_user.err');
    return res.status(500).json(error);
  })
}
