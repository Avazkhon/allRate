const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');

exports.blockSchema = new Schema({
    title: {
      value: { type: String, required: true, min: 3, max: 50 },
      templateId: { type: mongoose.ObjectId }
    },
    description: {
      value: { type: String, required: true, min: 10, max: 500 },
      templateId: { type: mongoose.ObjectId }
    },
    createDate: { type: Date, default: moment().utc().format() },
    paymentMade: { type: Boolean, default: false },
    type: { type: String, required: true }, // boolean, total
    status: { type: String, default: 'disabled' }, // hidden, disabled, active, finish
    amount: { type: Number, default: 0 },
    rateId: { type: mongoose.ObjectId },
    bets: [
      {
        coefficient: { type: Number, min: 1},
        amount: { type: Number, default: 0 },
        win: { type: Boolean, default: false },
        terms: { type: String, required: true },
        createDate: { type: Date, default: moment().utc().format() },
        paymentMade: { type: Boolean, default: false },
        participants: [
          {
            userId: { type: mongoose.ObjectId, required: true },
            purseId: { type: mongoose.ObjectId, required: true },
            meny: { type: Number, required: true, min: 50, max: 500 },
            paymentMade: { type: Boolean, default: false },
            createDate: { type: Date, default: moment().utc().format() },
          }
        ],
      }
    ]
  },
  { collection: 'Block' }
);
