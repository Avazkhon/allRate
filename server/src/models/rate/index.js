const ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');

const rateSchema = require('./rateSchema');

const Rate = mongoose.model('Rate', rateSchema.rateSchema);

exports.postAddOne = async (data, callBack) => {
  const note = new Rate(data);
  await note.save(callBack);
}

exports.all = (callBack) => {
  Rate.find({}, callBack);
}

exports.getOneById = (id, callBack) => {
  Rate.findOne({_id: id}, callBack);
}

exports.getOneByAuthot = (userId, callBack) => {
  Rate.find({ author: userId}, callBack);
}

exports.findByIdAndUpdate = (id, data, callBack) => {
  Rate.findByIdAndUpdate({_id: id}, data, { new: true },callBack);
}

exports.deleteOne = (id, callBack) => {
  Rate.deleteOne({_id: id}, callBack);
}
