const mongoose = require('mongoose');
const schema = require('./schema');
const CreateModel = require('../CreateModel');

const createModel = new CreateModel(
  'Subscribers',
  schema.subscribersSchema
);

module.exports = createModel;
