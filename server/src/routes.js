const express = require('express');
const router = express.Router();

const rateControllers = require('./controllers/rateControllers');
const PaymentAfterRate = require('./controllers/rateControllers/paymentAfterRate');
const langControllers = require('./controllers/langControllers');
const postControllers = require('./controllers/post');
const rateLiveControllers = require('./controllers/rateControllers/rateLive');
const userControllers = require('./controllers/user');
const authControllers = require('./controllers/auth');
const purseControllers = require('./controllers/purse');
const subscriptionsControllers = require('./controllers/subscriptions');
const ratingControllers = require('./controllers/rating');
const viewsControllers = require('./controllers/views');
const withdrawalRequest = require('./controllers/withdrawalRequest');
const InvoiceControllers = require('./controllers/invoice');
const AlbumFolder = require('./controllers/albumFolder');
const withdrawalRequestAdmin = require('./controllers/withdrawalRequest/withdrawalRequestAdmin');
const blockControllers = require('./controllers/block');
const MakeBet = require('./controllers/block/makeBet');

const makeBet = new MakeBet()

const invoiceControllers = new InvoiceControllers();
const albumFolder = new AlbumFolder();
const paymentAfterRate = new PaymentAfterRate();

module.exports = function (app) {
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

    app.route('/api/rate/payment/')
      .post(paymentAfterRate.paymentWin)

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

  app.route('/api/withdrawal-request')
    // .get(withdrawalRequest.get)
    .post(withdrawalRequest.create)

  app.route('/api/admin/withdrawal-request')
    .get(withdrawalRequestAdmin.get)
    .patch(withdrawalRequestAdmin.patch);

  app.route('/api/password-recovery/userPassword')
    .post(userControllers.passwordRecoveryStart)
    .put(userControllers.passwordRecoveryFinish)

  app.route('/api/block')
    .get(blockControllers.findOne)
    .put(blockControllers.changeBlocks)
    .patch(blockControllers.addBlocks)
    .post(blockControllers.createBlock)

  app.route('/api/block/bet')
    .post(blockControllers.postAddBetInBlock)

  app.route('/api/make-bet')
    .post(makeBet.makeBet)
};
