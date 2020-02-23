const rateModels = require('../../models/rate');
const handlier = (err, result, res) => {
  if (err) {
    console.log(err);
    return res.sendStatus(500);
  }
  if (!result) {
    res.status = 404
    return res.send('Ставока не найден!');
  }
  res.status = 200;
  res.send(result);
}

exports.getRate = (params, res) => {
  if (params.id) {
    rateModels.getOneById(params.id, (err, result) => handlier(err, result, res))
  } else if (params.userId) {
    rateModels.getOneByAuthot(params.userId, (err, result) => handlier(err, result, res))
  } else {
    rateModels.all((err, result) => handlier(err, result, res))
  }
}
