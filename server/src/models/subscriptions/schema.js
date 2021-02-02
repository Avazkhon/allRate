const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');

exports.subscriptionsSchema = new Schema(
  {
    userId: { type: mongoose.ObjectId, required: true },
    subscriptions: [{
      userId: { type: mongoose.ObjectId, required: true },
      subscriptionsTime: { type: Date, default: () => (moment().utc().format()) },
    }],
  },
  { collection: 'Subscriptions' }
);
