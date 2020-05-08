const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.subscriptionsSchema = new Schema(
  {
    userId: { type: mongoose.ObjectId, required: true },
    subscriptions: [{
      userId: { type: mongoose.ObjectId, required: true },
      subscriptionsTime: { type: Date, default: new Date() },
    }],
  },
  { collection: 'Subscriptions' }
);
