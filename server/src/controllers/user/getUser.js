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
  if (params.id) {
    userModels.findOne({ _id: params.id })
    .then(result => handlier(result, res));
  } else if (params.ids) {
    userModels.getByProps({ _id: params.ids  })
    .then(result => handlier(result, res));
  } else if (params.userName) {
    userModels.getByProps({ userName: params.userName })
    .then(result => handlier(result, res));
  } else if (params.page) {
    const options = {
      limit: +params.limit || 24,
      page: +params.page,
    };
    userModels.paginate({}, options)
    .then(result => handlier(result, res));
  } else {
    userModels.getByProps({...params})
    .then(result => handlier(result, res));
  }
}
