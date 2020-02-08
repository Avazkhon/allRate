const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.rateSchema = new Schema(
  {
    title: { type: String, required: true, min: 3, max: 50 },
    description: { type: String, required: true, min: 10, max: 500 },
    time: { type: Date, required: true },
    author: { type: mongoose.ObjectId, required: true },
    reasonsForBetting: [{
      title: { type: String, required: true, min: 3, max: 50, unique: true },
      id: { type: String, required: true },
      statusFictory: { type: Boolean, default: false }
    }],
    party: [{
      participator: { type: String, required: true, min: 3, max: 50 },
      description: { type: String, required: true, min: 10, max: 200 },
      leval: { type: Number, default: 1 },
      startingRatio: { type: Number, min: -0.01, max: 0.9},
      bidForItem: [{
        userId: { type: mongoose.ObjectId, required: true },
        meny: { type: Number, required: true, min: 50, max: 500 },
        time: { type: Date, required: true },
        reasonForBid: { type: String, required: true },
      }],
    }],
    description: String,
  },
  { collection: 'Rate' }
);
