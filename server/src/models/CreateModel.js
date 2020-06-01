const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

class CreateModel {
  constructor(nameModel, schema) {
    schema.plugin(mongoosePaginate);
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

  async findOne (searchParams, getParams) {
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

  async getByProps (props, params) {
    return new Promise((resolve, reject) => {
      this.Model.find(props, params)
      .then(resolve)
      .catch(reject)
    })
  }

  async deleteOne (searchParams) {
    return new Promise((resolve, reject) => (
      this.Model.deleteOne(searchParams)
      .then(resolve)
      .catch(reject)
    ))
  }

  async paginate (props, params) {
    return new Promise((resolve, reject) => {
      this.Model.paginate(props, params)
      .then(resolve)
      .catch(reject)
    })
  }
}

module.exports = CreateModel;
