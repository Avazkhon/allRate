const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');

const supportSchema = new Schema(
  {
    subject: { type: String, required: true, min: 5, max: 50 },
    text: { type: String, required: true, min: 20, max: 500 },
    email: { type: String },
    userId: { type: mongoose.ObjectId },
    comment: { type: String, min: 20, max: 500 },
    isResolve: { type: Boolean },
    createDate: { type: Date, default: moment().utc().format() },

  },
  { collection: 'Support' }
);

exports.supportSchema = supportSchema;
