const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

const Schema = mongoose.Schema;
const urlImages = 'https://www.sportsdaily.ru/s/image/116934.jpg';

exports.postSchema = new Schema(
  {
    authorId: { type: ObjectID, required: true },
    title: { type: String, required: true, minlength: 3, maxlength: 30 },
    text: { type: String, required: true, minlength: 10, maxlength: 2000 },
    createTime: { type: Date, required: true },
    img: {
      url: { type: String, default: urlImages },
    },
    views: { type: Number, required: true, min: 0, default: 0 },
    rating: {
      positively: [
        {
          userId: { type: ObjectID, required: true },
          makeTime: { type: Date, required: true }
        }
      ],
      negative: [
        {
          userId: { type: ObjectID, required: true },
          makeTime: { type: Date, required: true }
        }
      ],
    }
  },
  { collection: 'Post' }
);
