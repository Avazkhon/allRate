
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

const Schema = mongoose.Schema;

exports.invoiceSchema = new Schema(
  {
    amount: { // сумма
      type: Number,
      required: true,
      min: 10,
    },
    requisites: {
      src: { type: String, required: true }, // откуда
      target: { type: String, required: true }, // кому
    },
    basisForPayment: { // основание платежа
      action: { type: String, required: true },
    },
    createTime: { type: Date, default: new Date() },
    authorId: { type: ObjectID, required: true },
    invoiceId: { type: String, required: true },
  },
  { collection: 'Invoice' }
);
