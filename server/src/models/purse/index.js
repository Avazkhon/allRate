const purseSchema = require('./purseSchema');
const CreateModel = require('../CreateModel');

const createModel = new CreateModel(
  'Purse',
  purseSchema.purseSchema
);

module.exports = createModel;
