const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const passwords = require('../password');
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,

  poolSize: 10, // Maintain up to 10 socket connection
};

const uri = `mongodb+srv://Avazkhon:${passwords.passwordMongoDB}@cluster0-sgdif.mongodb.net/allRate?retryWrites=true&w=majority`;
mongoose.set('useFindAndModify', false);
async function connect(done) {
  await mongoose.connect(uri, options).then(() => {
      var db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error:'));
      done();
  });
}

exports.connect = connect;
