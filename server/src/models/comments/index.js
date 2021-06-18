const commentSchema = require('./commentsSchema');
const CreateModel = require('../CreateModel');

const createModel = new CreateModel(
  'Comments',
  commentSchema.commentSchema
);

module.exports = createModel;
