const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const WriteToLog = require('./utils/writeToLog');
const InnerTask = require('./innerTask');

require('./server.conf.js').addConf();

const db = require('./db');

const rateControllers = require('./controllers/rateControllers');
const langControllers = require('./controllers/langControllers');
const postControllers = require('./controllers/post');
const rateLiveControllers = require('./controllers/rateControllers/rateLive');
const userControllers = require('./controllers/user');
const authControllers = require('./controllers/auth');
const purseControllers = require('./controllers/purse');
const subscriptionsControllers = require('./controllers/subscriptions');
const ratingControllers = require('./controllers/rating');
const viewsControllers = require('./controllers/views');
const InvoiceControllers = require('./controllers/invoice');
const AlbumFolder = require('./controllers/albumFolder');
const passwords = require('../password');

const app = express();
const router = express.Router();
const writeToLog = new WriteToLog();
const innerTask = new InnerTask();
const invoiceControllers = new InvoiceControllers();
const albumFolder = new AlbumFolder();

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
app.use(fileUpload());

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

app.get('/api/', (req, res) => {
  res.send('Hello! welcome to the "All rate"!');
})

app.route('/api/auth')
  .get(authControllers.authAut)
  .post(authControllers.authIn);

app.patch('/api/mail_confirmation', authControllers.mailConfirmation);

app.route('/api/subscription')
  .get(subscriptionsControllers.get)
  .put(subscriptionsControllers.addSubscription)
  .delete(subscriptionsControllers.deleteSubscription);

app.route('/api/lang')
  .get(langControllers.get)
  .post(langControllers.post);

app.route('/api/post')
  .get(postControllers.get)
  .put(postControllers.put)
  .post(postControllers.create)
  .delete(postControllers.deleteOne);

app.patch('/api/rating', ratingControllers.rating)
app.patch('/api/views', viewsControllers.views)

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

app.route('/api/image')
  .post(albumFolder.addImage)

app.get('/api/img', albumFolder.getImg);

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
