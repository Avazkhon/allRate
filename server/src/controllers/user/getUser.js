const userModels = require('../../models/user');
const WriteToLog = require('../../utils/writeToLog');

const writeToLog = new WriteToLog();

const handlier = (result, res) => {
  if (!result) {
    res.status = 404
    return res.send('User не найден!');
  }
  res.status = 200;
  res.send(result);
}
exports.getOne = (params, res) => {
  if (params.id && !Array.isArray(params.id)) {
    userModels.findOne({ _id: params.id })
    .then(result => handlier(result, res));
  } else if (Array.isArray(params.id)) {
    userModels.model.getByProps({ _id: params.id  })
    .then(result => handlier(result, res));
  } else if (params.userName) {
    userModels.getByProps({ userName: params.userName })
    .then(result => handlier(result, res));
  } else {
    userModels.getByProps({})
    .then(result => handlier(result, res));
  }
}
