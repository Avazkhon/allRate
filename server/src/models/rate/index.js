const ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');

const rateSchema = require('./rateSchema');

const Rate = mongoose.model('Rate', rateSchema.rateSchema);

exports.postAddOne = (data) => (
  new Promise((resolve, reject) => (
    new Rate(data)
      .save()
      .then(resolve)
      .catch(reject)
  ))
)

exports.getByProps = (props, params) => (
  new Promise((resolve, reject) => {
    Rate.find(props, params).then((result) => {
      resolve(result);
    })
  })
)

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

exports.findByIdAndUpdate = (id, data, callBack) => (
  new Promise((resolve, reject) => (
    Rate.findByIdAndUpdate({_id: id}, data, { new: true },callBack)
    .then(resolve)
    .catch(reject)
  ))
)

exports.deleteOne = (id, callBack) => {
  Rate.deleteOne({_id: id}, callBack);
}
