const uuid = require('uuid/v4');
const userModels = require('../models/user');
const tokenModels = require('../models/token');

exports.postAddOne = (req, res) => {
  tokenModels.postAddOne({ token: uuid() }, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500);
      return res.send(err);
    }
    console.log(result);
    res.status = 200;
    res.send({ token: result.token });
  })
}
// getOneById
// updateOne
// deleteOne
