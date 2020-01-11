const ObjectID = require('mongodb').ObjectID;

const mongoose = require('mongoose');
const schema = require('./schema');

const User = mongoose.model('Users', schema.userSchema);

exports.postAddOne = (data, callBack) => {
  const note = new User(data);
  note.save(callBack);
}

exports.all = (callBack) => {
  User.find({}, callBack);
}

exports.getOneById = (id, callBack) => {
  User.find({_id: id}, callBack);
}

exports.getOneByUserName = (userName, callBack) => {
  User.findOne({userName: userName}, callBack);
}

exports.getOneByUserEmail = (email, callBack) => {
  User.findOne({ email }, callBack);
}

exports.updateOne = (id, data, callBack) => {
  User.findByIdAndUpdate({_id: id}, data, callBack);
}

exports.deleteOne = (id, callBack) => {
  User.deleteOne({_id: id}, callBack);
}
