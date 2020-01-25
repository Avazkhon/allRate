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
    res.status(400).json({ message: 'Все плохо]!'});
  }
}

exports.getAll = (req, res) => {
  try {
    rateModels.all((err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Все плохо]!', err});
      }
      res.status(200).json(result);
    })
  }
  catch (err) {
    return res.status(500).json({ message: 'Все плохо]!', err});
  }

}
