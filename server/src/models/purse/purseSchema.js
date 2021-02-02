const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const moment = require('moment-timezone');

const Schema = mongoose.Schema;

exports.purseSchema = new Schema(
  {
    amount: { // сумма в счете
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    createDate: { type: Date, default: () => (moment().utc().format()) },
    userId: { type: ObjectID, required: true },
    mainBetId: { type: ObjectID },
    currency: { type: String, default: 'RUB' },
    history: [ // история ставок
      {
        invoiceId: { type: ObjectID, required: true },
        createDate: { type: Date, default: () => (moment().utc().format()) },
        amount: { type: Number, required: true, min: 10 },
        basisForPayment: { type: String, required: true },
        action: { type: String, required: true },
      }
    ],
  },
  { collection: "Purse" }
);
