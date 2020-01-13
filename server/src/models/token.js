const ObjectID = require('mongodb').ObjectID;

const mongoose = require('mongoose');
const schema = require('./schema');

const Token = mongoose.model('Token', schema.tokenSchema);

exports.postAddOne = (data, callBack) => {
  const note = new Token(data);
  note.save(callBack);
}

exports.getOneById = (id, callBack) => {
  Token.find({_id: id}, callBack);
}

exports.updateOne = (id, data, callBack) => {
  Token.findByIdAndUpdate({_id: id}, data, callBack);
}

exports.deleteOne = (id, callBack) => {
  Token.deleteOne({_id: id}, callBack);
}
