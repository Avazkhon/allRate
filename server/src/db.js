const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const passwords = require('../password');
const WriteToLog = require('./utils/writeToLog');

const writeToLog = new WriteToLog();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,

  poolSize: 10, // Maintain up to 10 socket connection
};

const uri = `mongodb+srv://${passwords.nameAndPasswordMongoDB}@cluster0-rzc7k.mongodb.net/${process.env.NAME_DB_PROJECT}?retryWrites=true&w=majority`;
mongoose.set('useFindAndModify', false);
async function connect(done) {
  await mongoose.connect(uri, options)
  .then(() => {
      var db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error:'));
      done();
  })
  .catch((e) => {
    writeToLog.write(e, 'connectDB.err');
    console.log(e);
  });
}

exports.connect = connect;
