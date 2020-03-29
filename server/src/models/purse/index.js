const mongoose = require('mongoose');
const purseSchema = require('./purseSchema');

const Purse = mongoose.model('Purse', purseSchema.purseSchema);

exports.createPurse = (userId) => {
  return new Promise((resolve, reject) => {
    new Purse({ userId })
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
    Purse.find(props, params)
    .then((result) => {
      resolve(result);
    })
    .catch((err) => {
      reject(err);
    })
  })
);
