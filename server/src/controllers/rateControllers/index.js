const getRate = require('./getRate').getRate;
const rateModels = require('../../models/rate');
const WriteToLog = require('../../utils/writeToLog');
const purseControllers = require('../purse');

const { CommentsController } = require('../comments');

const writeToLog = new WriteToLog();

exports.getRate = async (req, res) => {
  const { id, userId, all, page } = req.query;
  const params = (id && {id}) || (userId && {userId}) ||
    (all === 'true' && {all}) || ( page && { ...req.query });

  try {
    const rates = await rateModels.getByProps();

    rates.forEach((rate) => {
      if(!rate.commentsId) {
        const commentsController = new CommentsController();
        commentsController.createComments({ name: 'Rate', entityId: rate._id })
          .then((comment) => {
            return rateModels.findByIdAndUpdate({ _id: comment.entityBinding.entityId }, { $set: { commentsId:  comment._id }} )
          })
      }
    })

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
      const commentsController = new CommentsController();

      const rate = await rateModels.create(body);
      purseControllers.createPurseForMainBet({
        userId: rate.authorId,
        mainBetId: rate._id,
      });
      commentsController.createComments({ name: 'Rate', entityId: rate._id })
        .then((comment) => {
          return rateModels.findByIdAndUpdate({ _id: comment.entityBinding.entityId }, { $set: { commentsId:  comment._id }} )
        })
      res.status(201).json(rate);
    }
  } catch(err) {
    writeToLog.write(err, 'request.err');
    res.status(500).json({ message: 'Все плохо!', err });
  }
}

exports.findByIdAndUpdate = (req, res) => {
  const { id } = req.query;
  const {
    body,
    session: {
      user
    }
  } = req;
  try {
    rateModels.findByIdAndUpdate(
      {
        _id: id,
      },
      {$set: body }
    )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      writeToLog.write(err, 'update_rate.err');
      return res.status(500).json({ message: 'Все плохо!', err: err.toString()});
    })
  }
  catch(err) {
    return res.status(500).json({ message: 'Все плохо!', err: err.toString()});
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
