const purseModel = require('../../models/purse');
const userModel = require('../../models/user');
const withdrawalRequest = require('../../models/withdrawalRequest');
const WriteToLog = require('../../utils/writeToLog');

const writeToLog = new WriteToLog();

exports.get = (rec, res) => {
  res.status(200).json({messages: 'full get-ok'});
}

exports.create = (rec, res) => {
  res.status(200).json({messages: 'full create-ok'});
}

exports.patch = (rec, res) => {
    res.status(200).json({messages: 'full patch-ok'});
}
