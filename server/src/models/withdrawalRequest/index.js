const withdrawalRequestSchema = require('./withdrawalRequestSchema');
const CreateModel = require('../CreateModel');

const createModel = new CreateModel(
  'WithdrawalRequestSchema',
  withdrawalRequestSchema.withdrawalRequest
);

module.exports = createModel;
