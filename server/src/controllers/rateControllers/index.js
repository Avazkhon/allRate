const rateModels = require('../models/rate');

exports.postAddOne = (req, res) => {
  const { body } = res;
  if (body) {
    rateModels.postAddOne(data)
    .then((err, result) => {
      console.log('error', error);
      console.log('result', result);
      res.json({ message: 'Все хорошо!'})ж
    });
  }
}
