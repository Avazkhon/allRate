const mongoose = require('mongoose');

class CreateModel {
  constructor(nameModel, schema) {
    this.Model = mongoose.model(nameModel, schema);
  }

  async create (data) {
    return new Promise((resolve, reject) => (
      new this.Model(data)
      .save()
      .then(resolve)
      .catch(reject)
    ))
  }

  async get (searchParams, getParams) {
    return new Promise((resolve, reject) => (
      this.Model.findOne(searchParams, getParams)
      .then(resolve)
      .catch(reject)
    ))
  }

  async findByIdAndUpdate (searchParams, data, addParms = { new: true }) {
    return new Promise((resolve, reject) => (
      this.Model.findByIdAndUpdate(searchParams, data, addParms)
      .then(resolve)
      .catch(reject)
    ))
  }

  async deleteOne (searchParams) {
    return new Promise((resolve, reject) => (
      this.Model.deleteOne(searchParams)
      .then(resolve)
      .catch(reject)
    ))
  }

}

module.exports = CreateModel;
