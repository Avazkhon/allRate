const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.subscribersSchema = new Schema(
  {
    userId: { type: mongoose.ObjectId, required: true },
    subscribers: [{
      userId: { type: mongoose.ObjectId, required: true },
      subscriberTime: { type: Date, default: process.env.TZ },
    }],
  },
  { collection: 'Subscribers' }
);
