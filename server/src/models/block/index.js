const mongoose = require('mongoose');
const blockSchema = require('./blockSchema');
const CreateModel = require('../CreateModel');

const createModel = new CreateModel(
  'Block',
  blockSchema.blockSchema
);

module.exports = createModel;
