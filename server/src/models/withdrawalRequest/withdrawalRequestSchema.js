const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const moment = require('moment-timezone');

const Schema = mongoose.Schema;

exports.withdrawalRequest = new Schema(
  {
    amount: { // сумма вывод
      type: Number,
      required: true,
      default: 0,
      min: 100,
    },
    amount_due: {
      type: Number,
      required: true,
      min: 48,
    },
    target: { type: String, required: true },
    createDate: { type: Date, default: moment().utc().format() },
    update: { type: Date, default: moment().utc().format() },
    description: { type: String },
    status: { type: String, default: 'inprogress', required: true }, // inprogress // successfully // refused
    userId: { type: ObjectID, required: true },
    purseId: { type: ObjectID, required: true },
    adminID: { type: ObjectID },
    currency: { type: String, default: 'RUB' },
  },
  { collection: 'WithdrawalRequest' }
);
