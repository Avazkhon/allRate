const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');

const db = require('./db');

const userControllers = require('./controllers/user');
const passwords = require('../password');

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(session({
  secret: passwords.secret,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 24 },
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

app.get('/', (req, res) => {
  res.send('Hello! welcome to the "All rate"!');
})

app.post('/auth', userControllers.auth); // один роут для входа и выхода

app.route('/user')
  .get(userControllers.getUser) // обрабатывает запросы по userName, id и all
  .post(userControllers.postAddOne)
  .put(userControllers.updateOne)
  .delete(userControllers.deleteOne);

db.connect((err) => {
  if (err) {
    return console.log(err);
  }
  app.listen(8080, () => {
    console.log('app my note starting!');
  });
});
