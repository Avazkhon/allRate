const rateModels = require('../../models/rate');

exports.postAddOne = (req, res) => {
  const { body } = req;
  if (body) {
    rateModels.postAddOne(body,
      (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }
        res.status(201).json({ message: 'Все хорошо!', rateId: result._id});
      }
    )
  } else {
    res.status(400).json({ message: 'Все плохо!'});
  }
}

exports.getAll = (req, res) => {
  try {
    rateModels.all((err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Все плохо!', err});
      }
      res.status(200).json(result);
    })
  }
  catch (err) {
    return res.status(500).json({ message: 'Все плохо!', err});
  }

}

exports.getOneById = (req, res) => {
  const { id } = req.query;
  try {
    rateModels.getOneById(id, (err, result) => {
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

exports.getOneByAuthot = (req, res) => {
  const { author } = req.query;
  try {
    rateModels.getOneByAuthot(author, (err, result) => {
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

exports.updateOne = (req, res) => {
  const { id } = req.query;
  const { body } = req;
  try {
    rateModels.updateOne(id, body, (err, result) => {
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
