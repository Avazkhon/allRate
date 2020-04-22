const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlParty = 'https://sun9-39.userapi.com/c852216/v852216813/1239e2/VZL0QayR6E4.jpg?ava=1';
const urlMain = 'https://betrating.ru/wp-content/uploads/2018/10/BETREYT-314.jpg';

exports.rateSchema = new Schema(
  {
    title: { type: String, required: true, min: 3, max: 50 },
    author: { type: mongoose.ObjectId, required: true },
    description: { type: String, required: true, min: 10, max: 500 },
    serverTime: { type: Date, default: new Date() },
    differenceTime: { type: Number, required: true },
    localTime: { type: Date, required: true },
    dateStart: { type: Date, required: true },
    dateFinish: { type: Date },
    dateAlert: { type: Date },
    statusLife: { type: String, default: 'new' },
    img: { type: String, default: urlMain },
    mainBet: {
      title: { type: String, default: 'Основная ставка' },
      purseId: { type: mongoose.ObjectId },
      partyOne: {
        coefficient: { type: Number, default: 1.9, min: 1},
        idParty: { type: String, required: true },
        terms: { type: String, required: true },
        participants: [
          {
            userId: { type: mongoose.ObjectId, required: true },
            meny: { type: Number, required: true, min: 50, max: 500 },
            serverTime: { type: Date, default: new Date() },
            localTime: { type: Date, required: true },
          }
        ],
      },
      partyDraw: {
        coefficient: { type: Number },
        idParty: { type: String },
        terms: { type: String }, // Условия
        participants: [
          {
            userId: { type: mongoose.ObjectId },
            meny: { type: Number, min: 50, max: 500 },
            serverTime: { type: Date },
            localTime: { type: Date },
          }
        ],
      },
      partyTwo: {
        coefficient: { type: Number, default: 1.9, min: 1},
        idParty: { type: String, required: true },
        terms: { type: String, required: true },
        participants: [
          {
            userId: { type: mongoose.ObjectId, required: true },
            meny: { type: Number, required: true, min: 50, max: 500 },
            serverTime: { type: Date, default: new Date() },
            localTime: { type: Date, required: true },
          }
        ],
      },
    },
    party: [{
      id: { type: String, required: true },
      participator: { type: String, required: true, min: 3, max: 50 },
      description: { type: String, required: true, min: 10, max: 200 },
      img: { type: String, default: urlParty },
    }],
  },
  { collection: 'Rate' }
);
