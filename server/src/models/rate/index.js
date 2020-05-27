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
    Rate.find(props, params)
    .then(resolve)
    .catch(reject)
  })
);
exports.get = (id, params) => (
  new Promise((resolve, reject) => {
    Rate.findOne({_id: id}, params)
    .then(resolve)
    .catch(reject)
  })
);

exports.all = () => (
  new Promise((resolve, reject) => (
    Rate.find({})
    .skip(0).limit(40)
    .then(resolve)
    .catch(reject)
  ))
);

exports.getOneById = (id) => (
  new Promise((resolve, reject) => (
    Rate.findOne({_id: id})
    .then(resolve)
    .catch(reject)
  ))
);

exports.getOneByAuthot = (userId) => (
  new Promise((resolve, reject) => (
    Rate.find({ author: userId})
    .skip(0).limit(40)
    .then(resolve)
    .catch(reject)
  ))
);

exports.findByIdAndUpdate = (id, data) => (
  new Promise((resolve, reject) => (
    Rate.findByIdAndUpdate({_id: id}, data, { new: true })
    .then(resolve)
    .catch(reject)
  ))
);

exports.deleteOne = (id) => (
  new Promise((resolve, reject) => (
    Rate.deleteOne({_id: id})
    .then(resolve)
    .catch(reject)
  ))
);
