const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.rateSchema = new Schema(
  {
    title: { type: String, required: true, min: 3, max: 50 },
    description: { type: String, required: true, min: 10, max: 500 },
    serverTime: { type: Date, default: new Date() },
    localTime: { type: Date, required: true },
    author: { type: mongoose.ObjectId, required: true },
    dateStart: { type: Date, required: true },
    dateFinish: { type: Date, required: true },
    reasonsForBetting: [
      {
        title: { type: String, required: true, min: 3, max: 50 },
        idParty: { type: String, required: true },
        idRFB: { type: String, required: true },
        statusFictory: { type: Boolean, default: false },
        coefficient: { type: Number, default: 1.9, min: 1},
        bidForItem: [
          {
            userId: { type: mongoose.ObjectId, required: true },
            meny: { type: Number, required: true, min: 50, max: 500 },
            serverTime: { type: Date, default: new Date() },
            localTime: { type: Date, required: true },
            reasonForBid: { type: String, required: true },
            makeCoefficient: { type: Number, default: 1.9, min: 1},
          }
        ],
      }
    ],
    party: [{
      id: { type: String, required: true },
      participator: { type: String, required: true, min: 3, max: 50 },
      description: { type: String, required: true, min: 10, max: 200 },
      leval: { type: Number, default: 1 },
    }],
    description: String,
  },
  { collection: 'Rate' }
);
