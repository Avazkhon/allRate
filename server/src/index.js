const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const WriteToLog = require('./utils/writeToLog');
const InnerTask = require('./innerTask');

const db = require('./db');

const rateControllers = require('./controllers/rateControllers');
const langControllers = require('./controllers/langControllers');
const rateLiveControllers = require('./controllers/rateControllers/rateLive');
const userControllers = require('./controllers/user');
const authControllers = require('./controllers/auth');
const purseControllers = require('./controllers/purse');
const subscriptionsControllers = require('./controllers/subscriptions');
const InvoiceControllers = require('./controllers/invoice');
const passwords = require('../password');

const app = express();
const router = express.Router();
const writeToLog = new WriteToLog();
const innerTask = new InnerTask();
const invoiceControllers = new InvoiceControllers();

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
  res.header("Access-Control-Allow-Origin", "http://127.250.250.250");
  res.header('Access-Control-Allow-Methods', ['POST', 'PUT', 'PATCH', 'DELETE']);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.get('/api/', (req, res) => {
  res.send('Hello! welcome to the "All rate"!');
})

app.route('/api/auth')
  .get(authControllers.authAut)
  .post(authControllers.authIn);

app.route('/api/subscription')
  .put(subscriptionsControllers.addSubscribers)
  .delete(subscriptionsControllers.deleteSubscribers);

app.route('/api/lang')
  .get(langControllers.get)
  .post(langControllers.post);

app.route('/api/user')
  .get(userControllers.getUser) // обрабатывает запросы по userName, id и all
  .post(userControllers.craeteUser)
  .put(userControllers.updateOne)
  .delete(userControllers.deleteOne);


app.route('/api/rate')
  .get(rateControllers.getRate)
  .post(rateControllers.postAddOne)
  .put(rateControllers.findByIdAndUpdate)
  .delete(rateControllers.deleteOne)

app.route('/api/rate-live')
  .put(rateLiveControllers.rateLive)

app.route('/api/purse')
  .get(purseControllers.getPurse)
  // этот метод не должен быть доступным на production
  // так как пользователь не должен иметь примой доступ к нему
  .put(purseControllers.findByIdAndUpdate);

app.route('/api/invoice')
  .get(invoiceControllers.getInvoice)
  .post(invoiceControllers.createInvoice)

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
