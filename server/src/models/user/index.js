const mongoose = require('mongoose');
const schema = require('./schema');
const CreateModel = require('../CreateModel');

const User = mongoose.model('Users', schema.userSchema);


exports.model = new CreateModel(
  'Users',
  schema.userSchema
);



exports.postAddOne = (data, callBack) => {
  const note = new User(data);
  note.save(callBack);
};

exports.create = (data) => (
  new Promise((resolve, reject) => (
    new User(data)
    .save()
    .then(resolve)
    .catch(reject)
  ))
)

exports.all = (callBack) => {
  User.find({}, callBack);
}

exports.getOneById = (id, callBack) => {
  User.findOne({_id: id}, callBack);
}

exports.findOne = (searchProps, getProps) => (
  new Promise((resolve, reject) => (
    User.findOne(searchProps, getProps)
    .then(resolve)
    .catch(reject)
  ))
)

exports.findByIdAndUpdate = (searchProps, data, options) => (
  new Promise((resolve, reject) => (
    User.findByIdAndUpdate(searchProps, data, options)
    .then(resolve)
    .catch(reject)
  ))
)

exports.getOneByUserName = (userName, callBack) => {
  User.findOne({userName: userName}, callBack);
}

exports.getOneByUserEmail = (email, callBack) => {
  User.findOne({ email }, callBack);
}

exports.updateOne = (id, data, callBack) => {
  User.findByIdAndUpdate({_id: id}, data, { new: true }, callBack);
}

exports.deleteOne = (id, callBack) => {
  User.deleteOne({_id: id}, callBack);
}
