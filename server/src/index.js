const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');

const db = require('./db');


const rateControllers = require('./controllers/rateControllers');
const userControllers = require('./controllers/user');
const authControllers = require('./controllers/auth');
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
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 1000 * 60 * 60 * 24
  }),
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header('Access-Control-Allow-Methods', ['POST', 'PUT', 'PATCH', 'DELETE']);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello! welcome to the "All rate"!');
})

app.route('/auth')
  .get(authControllers.authAut)
  .post(authControllers.authIn);

app.route('/user')
  .get(userControllers.getUser) // обрабатывает запросы по userName, id и all
  .post(userControllers.postAddOne)
  .put(userControllers.updateOne)
  .delete(userControllers.deleteOne);


app.route('/rate')
.get(rateControllers.getRate)
.post(rateControllers.postAddOne)
.put(rateControllers.findByIdAndUpdate)
.delete(rateControllers.deleteOne);

db.connect((err) => {
  if (err) {
    return console.log(err);
  }
  app.listen(8080, () => {
    console.log('server all rate starting!');
  });
});
