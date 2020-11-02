const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

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
    createTime: { type: Date, default: new Date() },
    update: { type: Date, default: new Date() },
    description: { type: String },
    status: { type: String, default: 'inprogress', required: true }, // inprogress // successfully // refused
    userId: { type: ObjectID, required: true },
    adminID: { type: ObjectID },
    currency: { type: String, default: 'RUB' },
  },
  { collection: 'WithdrawalRequest' }
);
