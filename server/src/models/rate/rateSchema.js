const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlParty = 'https://sun9-39.userapi.com/c852216/v852216813/1239e2/VZL0QayR6E4.jpg?ava=1';
const urlMain = 'https://betrating.ru/wp-content/uploads/2018/10/BETREYT-314.jpg';

exports.rateSchema = new Schema(
  {
    title: { type: String, required: true, min: 3, max: 50 },
    authorId: { type: mongoose.ObjectId, required: true },
    description: { type: String, required: true, min: 10, max: 500 },
    serverTime: { type: Date, default: new Date() },
    differenceTime: { type: Number, required: true },
    localTime: { type: Date, required: true },
    createTime: { type: Date, required: true },
    dateStart: { type: Date, required: true },
    dateFinish: { type: Date },
    dateAlert: { type: Date },
    statusLife: { type: String, default: 'new' },
    img: { type: String, default: urlMain },
    views: { type: Number, required: true, min: 0, default: 0 },
    mainBet: {
      title: { type: String, default: 'Основная ставка' },
      purseId: { type: mongoose.ObjectId },
      idPartyVictory: { type: Number, default: 0 },
      paymentMade: { type: Boolean, default: false },
      partyOne: {
        amount: { type: Number, default: 0 },
        coefficient: { type: Number, default: 1, min: 1},
        idParty: { type: String, required: true },
        terms: { type: String, required: true },
        participants: [
          {
            userId: { type: mongoose.ObjectId, required: true },
            purseId: { type: mongoose.ObjectId, required: true },
            meny: { type: Number, required: true, min: 50, max: 500 },
            serverTime: { type: Date, default: new Date() },
            localTime: { type: Date, required: true },
            paymentMade: { type: Boolean, default: false },
          }
        ],
      },
      partyDraw: {
        amount: { type: Number, default: 0 },
        coefficient: { type: Number },
        idParty: { type: String },
        terms: { type: String }, // Условия
        participants: [
          {
            userId: { type: mongoose.ObjectId },
            purseId: { type: mongoose.ObjectId, required: true },
            meny: { type: Number, min: 50, max: 500 },
            serverTime: { type: Date },
            localTime: { type: Date },
            paymentMade: { type: Boolean, default: false },
          }
        ],
      },
      partyTwo: {
        amount: { type: Number, default: 0 },
        coefficient: { type: Number, default: 1, min: 1},
        idParty: { type: String, required: true },
        terms: { type: String, required: true },
        participants: [
          {
            userId: { type: mongoose.ObjectId, required: true },
            purseId: { type: mongoose.ObjectId, required: true },
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
    rating: {
      positively: [
        {
          userId: { type: mongoose.ObjectId, required: true },
          makeTime: { type: Date, required: true }
        }
      ],
      negative: [
        {
          userId: { type: mongoose.ObjectId, required: true },
          makeTime: { type: Date, required: true }
        }
      ],
    }
  },
  { collection: 'Rate' }
);
