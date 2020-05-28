const postSchema = require('./postSchema');
const CreateModel = require('../CreateModel');

const createModel = new CreateModel(
  'Post',
  postSchema.postSchema
);

module.exports = createModel;
