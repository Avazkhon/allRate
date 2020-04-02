const mongoose = require('mongoose');
const invoiceSchema = require('./invoiceSchema');
const CreateModel = require('../CreateModel');

const createModel = new CreateModel(
  'Invoice',
  invoiceSchema.invoiceSchema
);

module.exports = createModel;
