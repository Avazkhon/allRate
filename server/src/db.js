const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const passwords = require('../password');

const uri = `mongodb+srv://Avazkhon:${passwords.passwordMongoDB}@cluster0-sgdif.mongodb.net/allRate?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
async function connect(done) {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }).then(() => {
      var db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error:'));
      done();
  });
}

exports.connect = connect;
