const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const moment = require('moment-timezone');

const Schema = mongoose.Schema;
const getTemmplate = (count = 0) => {
  const template = {
    name: { type: String },
    code: { type: String },
    type: { type: String },
    children: []
  }
  if(count === 4) {
    return template
  }
  count++
  return template
}
const category = new Schema(
  getTemmplate(),
  { strict: true }
);

exports.сategoriesSchema = new Schema(
  {
    name: { type: String },
    code: { type: String },
    categories: [ category ]
  },
  { collection: 'Сategories' }
);
