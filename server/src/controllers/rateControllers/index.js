const rateModels = require('../../models/rate');
const getRate = require('./getRate').getRate

exports.getRate = (req, res) => {
  const { id, userId, all } = req.query;
  const params = (id && {id}) || (userId && {userId}) || (all === 'true' && {all});
  try {
    return getRate(params, res);
  }
  catch (err) {
    return res.status(500).json({ message: 'Все плохо!', err});
  }

}

exports.postAddOne = (req, res) => {
  const { user } = req.session;
  if (!user) {
    return res.status(401).json({ message: 'Пользователь не авторизован!'});
  };
  let { body } = req;
  const { userData } = req;

  if (body) {
    body = { ...body, author: user.userId,}
    rateModels.postAddOne(body,
      (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }
        res.status(201).json({ message: 'Все хорошо!', result});
      }
    )
  } else {
    res.status(400).json({ message: 'Все плохо!'});
  }
}


exports.findByIdAndUpdate = (req, res) => {
  const { id } = req.query;
  const { body } = req;
  try {
    rateModels.findByIdAndUpdate(id, body, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Все плохо!', err});
      }
      res.status(200).json(result);
    });
  }
  catch(e) {
    return res.status(500).json({ message: 'Все плохо!', err});
  }
}

exports.deleteOne = (req, res) => {
  const { id } = req.query;
  try {
    rateModels.deleteOne(id, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Все плохо!', err});
      }
      if (result.deletedCount) {
        return res.status(200).json({ message: 'Ставка успешна удалина!'});
      }
      res.status(400).json({ message: 'Нет ставок с таким id!'});
    });
  }
  catch(e) {
    return res.status(500).json({ message: 'Все плохо!', err});
  }
}
