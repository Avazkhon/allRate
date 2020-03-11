const ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');

const rateSchema = require('./rateSchema');
const checkConnect = require('./checkConnect');
checkConnect.getAll();


const Rate = mongoose.model('Rate', rateSchema.rateSchema);

exports.postAddOne = async (data, callBack) => {
  const note = new Rate(data);
  await note.save(callBack);
}

exports.all = (callBack) => {
  Rate.find({}, callBack)
  .skip(0).limit(40);
}

exports.getOneById = (id, callBack) => {
  Rate.findOne({_id: id}, callBack);
}

exports.getOneByAuthot = (userId, callBack) => {
  Rate.find({ author: userId}, callBack)
  .skip(0).limit(40);
}

exports.findByIdAndUpdate = (id, data, callBack) => {
  Rate.findByIdAndUpdate({_id: id}, data, { new: true },callBack);
}

exports.deleteOne = (id, callBack) => {
  Rate.deleteOne({_id: id}, callBack);
}
