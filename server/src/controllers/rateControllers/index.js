const getRate = require('./getRate').getRate;
const rateModels = require('../../models/rate');
const WriteToLog = require('../../utils/writeToLog');
const purseControllers = require('../purse');

const writeToLog = new WriteToLog();

exports.getRate = (req, res) => {
  const { id, userId, all, page } = req.query;
  const params = (id && {id}) || (userId && {userId}) ||
    (all === 'true' && {all}) || ( page && { ...req.query });

  try {
    return getRate(params, res);
  }
  catch (err) {
    writeToLog.write(err, 'request.err');
    return res.status(500).json({ message: 'Все плохо!', err});
  }
}

exports.postAddOne = async (req, res) => {
  const { user } = req.session;
  if (!user) {
    return res.status(401).json({ message: 'Пользователь не авторизован!'});
  };
  try {
    let { body } = req;

    if (body) {
      body = { ...body, authorId: user.userId, };

      const rate = await rateModels.create(body);
      const purse = await purseControllers.createPurseForMainBet({
        userId: rate.authorId,
        mainBetId: rate._id,
      });
      res.status(201).json(rate);
    }
  } catch(err) {
    writeToLog.write(err, 'request.err');
    res.status(500).json({ message: 'Все плохо!', err });
  }
}

exports.findByIdAndUpdate = (req, res) => {
  const { id } = req.query;
  const { body } = req;
  try {
    rateModels.findByIdAndUpdate({ _id: id }, { $set: body })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      writeToLog.write(err, 'update_rate.err');
      return res.status(500).json({ message: 'Все плохо!', err});
    })
  }
  catch(err) {
    return res.status(500).json({ message: 'Все плохо!', err});
  }
}

exports.deleteOne = (req, res) => {
  const { id } = req.query;
  try {
    rateModels.deleteOne({ _id: id }, (err, result) => {
      if (err) {
        writeToLog.write(err, 'request.err');
        return res.status(500).json({ message: 'Все плохо!', err});
      }
      if (result.deletedCount) {
        return res.status(200).json({ message: 'Ставка успешна удалина!'});
      }
      res.status(400).json({ message: 'Нет ставок с таким id!'});
    });
  }
  catch(err) {
    writeToLog.write(err, 'request.err');
    return res.status(500).json({ message: 'Все плохо!', err});
  }
}
