const mongoose = require('mongoose');
const rateSchema = require('./rateSchema');
const CreateModel = require('../CreateModel');

const createModel = new CreateModel(
  'Rate',
  rateSchema.rateSchema
);

module.exports = createModel;
