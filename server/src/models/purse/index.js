const mongoose = require('mongoose');
const purseSchema = require('./purseSchema');

const Purse = mongoose.model('Purse', purseSchema.purseSchema);

exports.createPurse = (data) => {
  return new Promise((resolve, reject) => {
    new Purse(data)
    .save()
    .then((result) => {
      resolve(result);
    })
    .catch((err) => {
      reject(err);
    })
  })
};

exports.getPurse = (props, params) => (
  new Promise((resolve, reject) => {
    Purse.findOne(props, params)
    .then((result) => {
      resolve(result);
    })
    .catch((err) => {
      reject(err);
    })
  })
);

exports.findByIdAndUpdate = (id, data) => (
  new Promise((resolve, reject) => {
    Purse.findByIdAndUpdate({_id: id}, data, { new: true })
    .then((result) => {
      resolve(result);
    })
    .catch((err) => {
      reject(err);
    })
  })
);
