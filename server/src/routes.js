const express = require('express');
const fs = require('fs');
const router = express.Router();

const rateControllers = require('./controllers/rateControllers');
const PaymentAfterRate = require('./controllers/rateControllers/paymentAfterRate');
const langControllers = require('./controllers/langControllers');
const postControllers = require('./controllers/post');
const rateLiveControllers = require('./controllers/rateControllers/rateLive');
const SearchRate = require('./controllers/rateControllers/searchRate');
const userControllers = require('./controllers/user');
const authControllers = require('./controllers/auth');
const purseControllers = require('./controllers/purse');
const subscriptionsControllers = require('./controllers/subscriptions');
const ratingControllers = require('./controllers/rating');
const viewsControllers = require('./controllers/views');
const withdrawalRequest = require('./controllers/withdrawalRequest');
const InvoiceControllers = require('./controllers/invoice');
const withdrawalRequestAdmin = require('./controllers/withdrawalRequest/withdrawalRequestAdmin');
const blockControllers = require('./controllers/block');
const betControllers = require('./controllers/block/bet');
const Categories = require('./controllers/category');
const MakeBet = require('./controllers/block/makeBet');
const support = require('./controllers/support');
const { CommentsController } = require('./controllers/comments');

const paymentAfterRate = new PaymentAfterRate();
const categories = new Categories();
const searchRate = new SearchRate();

module.exports = function (app) {
  app.get('/api/', (req, res) => {
    res.send('Hello! welcome to the "All rate"!');
  })

  app.get('/api/sitemap.xml', (req, res) => {

    res.set('Content-Type', 'application/xml');
    res.send(fs.readFileSync(__dirname + '/sitemap.xml', 'utf8'));
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
    .put(postControllers.putPostById)
    .post(postControllers.create)
    .delete(postControllers.deleteOne);

  app.patch('/api/rating', ratingControllers.rating)
  app.patch('/api/views', viewsControllers.views)

  app.route('/api/user')
    .get(userControllers.getUser) // обрабатывает запросы по userName, id и all
    .post(userControllers.craeteUser)
    .put(userControllers.updateUserAuth)
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
  app.route('/api/purse/history')
    .get(purseControllers.getPurseHistory)

  app.route('/api/invoice')
    .get((req, res) => {
      const invoiceControllers = new InvoiceControllers();
      invoiceControllers.getInvoice(req, res)
    })
    .post((req, res) => {
      const invoiceControllers = new InvoiceControllers();
      invoiceControllers.createInvoice(req, res)
    })

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
    .delete(blockControllers.deleteBlock)

  app.route('/api/block/bet')
    .post(betControllers.postAddBetInBlock)
    .delete(betControllers.deleteBet)

  app.route('/api/categories')
    .post(categories.createCategories)
    .get(categories.getCategories)

  app.route([
    '/api/bets/:type',
    '/api/bets/:type/:subtype/',
    '/api/bets/:type/:subtype/:section'
  ])
    .get(searchRate.search)

  app.route('/api/support')
    .post(support.crateSupport)
    .get(support.getSupport)
    .put(support.putSupport)

  app.route('/api/comments/:commentsId')
    .get((req, res) => {
      const commentsController = new CommentsController();
      commentsController.getComments(req, res);
    })
    .post((req, res) => {
      const commentsController = new CommentsController();
      commentsController.saveComments(req, res);
    })

  app.route('/api/make-bet')
    .post((...rest) => {
      // Новый инстанс нужен для стерильности данных в конструкторе при каждом новом запросе
      const makeBet = new MakeBet();
      makeBet.makeBet(...rest)
    })
};
