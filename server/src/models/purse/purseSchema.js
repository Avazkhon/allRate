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
    history: [ // история ставок
      { type: ObjectID, required: true },
    ],
  },
  { collection: "Purse" }
);
