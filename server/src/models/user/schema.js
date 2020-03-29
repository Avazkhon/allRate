const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.userSchema = new Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean },
    dateCreate: { type: Date, required: true },
    age: {
      day: { type: String, required: true },
      month: { type: String, required: true },
      year: { type: String, required: true }
    },
    allRate: [{ idNote: mongoose.ObjectId }],
    description: String
  },
  { collection: 'Users' }
);
