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

exports.getOneByAuthot = (author, callBack) => {
  Rate.find({ author }, callBack);
}

exports.updateOne = (id, data, callBack) => {
  Rate.findByIdAndUpdate({_id: id}, data, callBack);
}

exports.deleteOne = (id, callBack) => {
  Rate.deleteOne({_id: id}, callBack);
}
