const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const moment = require('moment-timezone');


const Schema = mongoose.Schema;

const rating = new Schema(
  {
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
  }
);

exports.commentSchema = new Schema(
  {
    entityBinding: {
      name: { type: String, required: true },
      entityId: { type: ObjectID, required: true }
    },
    createDate: { type: Date, default: () => (moment().utc().format()) },
    commentsCount: {
      type: Number,
      default: function() {
        return (this.comments && this.comments.length) || 0
      }
    },
    comments: [
      {
        authorId: { type: ObjectID, required: true },
        text: { type: String, required: true, minlength: 1, maxlength: 1000 },
        createDate: { type: Date, default: () => (moment().utc().format()) },
        rating
      }
    ]
  },
  { collection: 'Comments' }
);
