const mongoose = require('mongoose');
const supportSchema = require('./supportSchema');
const CreateModel = require('../CreateModel');

const createModel = new CreateModel(
  'Support',
  supportSchema.supportSchema
);

module.exports = createModel;
