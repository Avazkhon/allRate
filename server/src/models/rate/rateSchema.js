const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');

const urlParty = 'https://sun9-39.userapi.com/c852216/v852216813/1239e2/VZL0QayR6E4.jpg?ava=1';
const urlMain = 'https://betrating.ru/wp-content/uploads/2018/10/BETREYT-314.jpg';

const categories = new Schema({
    url: { type: String, require: true },
    type: { type: String, require: true },
    subtype: { type: String, require: true },
    section: { type: String, require: true },
    query: { type: String, require: true },
  },
  {strict: true}
)

const party = new Schema({
    id: { type: Number, required: true },
    participator: { type: String, required: true, min: 3, max: 50 },
    description: { type: String, required: true, min: 10, max: 200 },
    img: { type: String, default: urlParty },
    win: { type: Boolean, default: false },
  },
  {strict: true}
)

const rating = new Schema({
    positively: [
      {
        userId: { type: mongoose.ObjectId, required: true },
        makeTime: { type: Date, default: () => (moment().utc().format()) },
      }
    ],
    negative: [
      {
        userId: { type: mongoose.ObjectId, required: true },
        makeTime: { type: Date, default: () => (moment().utc().format()) },
      }
    ],
  },
  {strict: true}
)


const rateSchema = new Schema(
  {
    title: { type: String, text: true, required: true, min: 3, max: 50 },
    authorId: { type: mongoose.ObjectId, required: true },
    description: { type: String, text: true, required: true, min: 10, max: 500 },
    createDate: { type: Date, default: () => (moment().utc().format()) },
    dateStart: { type: Date, required: true },
    dateFinish: { type: Date, required: true },
    dateArchive: { type: Date },
    statusLife: { type: String, default: 'new' },
    img: { type: String, default: urlMain },
    purseId: { type: mongoose.ObjectId },
    views: { type: Number, required: true, min: 0, default: 0 },
    paymentMade: { type: Boolean, required: false },
    blockId: { type: mongoose.ObjectId },
    party: [ party ],
    rating,
    categories,
  },
  { collection: 'Rate' }
);

exports.rateSchema = rateSchema
