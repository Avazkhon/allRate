const mongoose = require('mongoose');
const schema = require('./schema');
const CreateModel = require('../CreateModel');

const createModel = new CreateModel(
  'Subscriptions',
  schema.subscriptionsSchema
);

module.exports = createModel;
