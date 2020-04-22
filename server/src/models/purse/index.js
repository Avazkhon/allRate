const mongoose = require('mongoose');
const purseSchema = require('./purseSchema');

const Purse = mongoose.model('Purse', purseSchema.purseSchema);

exports.createPurse = (data) => (
  new Promise((resolve, reject) => (
    new Purse(data)
      .save()
      .then(resolve)
      .catch(reject)
  ))
)

exports.getPurse = (props, params) => (
  new Promise((resolve, reject) => (
    Purse.findOne(props, params)
    .then(resolve)
    .catch(reject)
  ))
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
