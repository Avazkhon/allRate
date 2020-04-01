const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

const Schema = mongoose.Schema;

exports.purseSchema = new Schema(
  {
    amount: { // сумма в счете
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    create: { type: Date, default: new Date() },
    userId: { type: ObjectID, required: true },
    currency: { type: String, default: 'RUB' },
    history: [ // история ставок
      {
        invoiceId: { type: ObjectID, required: true },
        time: { type: Date, default: new Date() },
        amount: { type: Number, required: true, min: 10 },
        basisForPayment: { type: String, required: true },
      }
    ],
  },
  { collection: "Purse" }
);
