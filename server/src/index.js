const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

require('./server.conf.js').addConf(); // сначало добавления конфига - это важно
const routes = require('./routes');
const WriteToLog = require('./utils/writeToLog');
const InnerTask = require('./innerTask');

const db = require('./db');

const passwords = require('../password');

const app = express();
const writeToLog = new WriteToLog();
const innerTask = new InnerTask();
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(session({
  secret: passwords.secret,
  saveUninitialized: false,
  resave: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 3 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 1000 * 60 * 60 * 24 * 3
  }),
}));

app.use((req, res, next) => {
  ['https://facebetting.ru', "http://localhost:3000"].map(domain => {
  res.header("Access-Control-Allow-Origin", domain);
});
  // res.header("Access-Control-Allow-Origin", "http://facebetting.ru");
  res.header('Access-Control-Allow-Methods', ['POST', 'PUT', 'PATCH', 'DELETE']);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

routes(app);

db.connect((err) => {
  if (err) {
    writeToLog.write(err, 'data_base.err');
  }
  app.listen(8080, () => {
    innerTask.checkTask();
    writeToLog.write('server all rate starting!', 'start_server.success');
    console.log('server all rate starting!');
  });
});
