const userModels = require('../models/user');
const handlier = (err, result, res) => {
  if (err) {
    console.log(err);
    return res.sendStatus(500);
  }
  if (!result) {
    res.status = 404
    return res.send('User не найден!');
  }
  res.status = 200
  res.send(result);
}

exports.getOne = (params, res) => {
  if (params.id) {
    userModels.getOneById(params.id, (err, result) => handlier(err, result, res))
  } else if (params.userName) {
    userModels.getOneByUserName(params.userName, (err, result) => handlier(err, result, res))
  } else {
    userModels.all((err, result) => handlier(err, result, res))
  }
}
