const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const moment = require('moment-timezone');
const CommentsController = require('../../controllers/comments');


const Schema = mongoose.Schema;
const urlImages = 'https://www.sportsdaily.ru/s/image/116934.jpg';

exports.postSchema = new Schema(
  {
    authorId: { type: ObjectID, required: true },
    title: { type: String, required: true, minlength: 3, maxlength: 100 },
    text: { type: String, required: true, minlength: 10, maxlength: 100000 },
    createDate: { type: Date, default: () => (moment().utc().format()) },
    commentsId: { type: ObjectID },
    img: {
      url: { type: String, default: urlImages },
    },
    views: { type: Number, required: true, min: 0, default: 0 },
    positivelyCount: {
      type: Number,
      default: function () {
        return (this.rating.positively && this.rating.positively.length) || 0
      }
    },
    negativeCount: {
      type: Number,
      default: function () {
        return (this.rating.negative && this.rating.negative.length) || 0
      }
    },
    rating: {
      positively: [
        {
          userId: { type: ObjectID, required: true },
          makeTime: { type: Date, default: () => (moment().utc().format()) }
        }
      ],
      negative: [
        {
          userId: { type: ObjectID, required: true },
          makeTime: { type: Date, default: () => (moment().utc().format()) }
        }
      ],
    }
  },
  { collection: 'Post' }
);
