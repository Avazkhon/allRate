const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.userSchema = new Schema(
  {
    userName: { type: String, required: true },
    avatar: { type: String },
    password: { type: String, required: true, select: false  },
    phone: { type: String, required: true },
    purseId: { type: mongoose.ObjectId },
    email: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean },
    dateCreate: { type: Date, required: true },
    mailConfirmation: { type: 'Mixed' },
    passwordRecovery: { type: String, select: false },
    age: {
      day: { type: String, required: true },
      month: { type: String, required: true },
      year: { type: String, required: true }
    },
    allRate: [{ idNote: mongoose.ObjectId }],
    subscriptionsId: { type: mongoose.ObjectId },
    subscribersId: { type: mongoose.ObjectId },
    subscriptionsCount: { type: Number, default: 0, min: 0 },
    subscribersCount: { type: Number, default: 0, min: 0 },
    description: String,
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
  { collection: 'Users' }
);
