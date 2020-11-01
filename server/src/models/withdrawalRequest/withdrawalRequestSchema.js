const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

const Schema = mongoose.Schema;

exports.withdrawalRequest = new Schema(
  {
    amount: { // сумма вывод
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    commission: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    create: { type: Date, default: new Date() },
    update: { type: Date, default: new Date() },
    description: { type: String },
    status: { type: String, default: 'inprogress', required: true }, // inprogress // successfully // renouncement
    userId: { type: ObjectID, required: true },
    adminID: { type: ObjectID },
    currency: { type: String, default: 'RUB' },
  },
  { collection: 'WithdrawalRequest' }
);
