const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');

exports.subscribersSchema = new Schema(
  {
    userId: { type: mongoose.ObjectId, required: true },
    subscribers: [{
      userId: { type: mongoose.ObjectId, required: true },
      subscriberTime: { type: Date, default: () => (moment().utc().format()) },
    }],
  },
  { collection: 'Subscribers' }
);
