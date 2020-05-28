const schema = require('./schema');
const CreateModel = require('../CreateModel');

module.exports = new CreateModel(
  'Users',
  schema.userSchema
);
