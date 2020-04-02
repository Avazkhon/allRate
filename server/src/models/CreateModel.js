const mongoose = require('mongoose');

class CreateModel {
  constructor(nameModel, schema) {
    this.Model = mongoose.model(nameModel, schema);
  }

  async create (data) {
    return new Promise((resolve, reject) => {
      new this.Model(data)
      .save()
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      })
    })
  }

  async get (searchParams, getParams) {
    return new Promise((resolve, reject) => {
      this.Model.findOne(searchParams, getParams)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      })
    })
  }

  async findByIdAndUpdate (searchParams, getParams, addParms = { new: true }) {
    return new Promise((resolve, reject) => {
      this.Model.findByIdAndUpdate(searchParams, getParams, addParms)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      })
    })
  }

}

module.exports = CreateModel;
