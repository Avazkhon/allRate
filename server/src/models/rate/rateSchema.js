const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.rateSchema = new Schema(
  {
    title: { type: String, required: true, min: 3, max: 50 },
    description: { type: String, required: true, min: 10, max: 500 },
    time: { type: Date, required: true },
    authot: mongoose.ObjectId,
    rate: [{
      name: { type: String, required: true, min: 3, max: 50 },
      description: { type: String, required: true, min: 10, max: 200 },
      leval: { type: Number, default: 1 },
      startingRatio: { type: Number, min: 0.1, max: 100},
      bidForItem: [{
        userId: mongoose.ObjectId,
        meny: { type: Number, required: true, min: 50, max: 500 },
        time: { type: Date, required: true },
      }],
    }],
  },
  { collection: 'Rate' }
);
