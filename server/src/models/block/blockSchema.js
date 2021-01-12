const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');

const participantsSchema = new Schema(
  {
    userId: { type: mongoose.ObjectId, required: true },
    purseId: { type: mongoose.ObjectId, required: true },
    amount: { type: Number, required: true, min: 50, max: 500 },
    paymentMade: { type: Boolean },
    noOrYes: { type: Boolean }, // if type block boolean
    createDate: { type: Date, default: moment().utc().format() },
  },
  {
    strict: true
  }
);

const betSchema = new Schema(
  {
    id: { type: Number, required: true },
    coefficientNo: { type: Number, min: 1 },
    coefficientYes: { type: Number, min: 1 },
    coefficient: { type: Number, min: 1},
    amountNo: { type: Number },
    amountYes: { type: Number },
    amount: { type: Number },
    noOrYes: { type: Boolean },
    win: { type: Boolean },
    condition: { type: String, required: true },
    createDate: { type: Date, default: moment().utc().format() },
    paymentMade: { type: Boolean },
    participants: [ participantsSchema ],
  },
  {
    strict: true
  }
);

const blocksSchema = new Schema(
  {
    id: { type: Number, required: true },
    title: {
      value: { type: String, required: true, min: 3, max: 50 },
      templateId: { type: mongoose.ObjectId }
    },
    description: {
      value: { type: String, min: 10, max: 500 },
      templateId: { type: mongoose.ObjectId }
    },
    createDate: { type: Date, default: moment().utc().format() },
    paymentMade: { type: Boolean },
    type: { type: String, required: true }, // boolean, total
    status: { type: String, default: 'disabled' }, // hidden, disabled, active, finish
    amountAll: { type: Number  },
    bets: [ betSchema ]
  },
  {
    strict: true
  }
);

exports.blockSchema = new Schema({
    rateId: { type: mongoose.ObjectId },
    paymentPercentage: { type: Boolean },
    blocks: [ blocksSchema ]
  },
  { collection: 'Block', strict: true }
);
