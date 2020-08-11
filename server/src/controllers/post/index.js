const postModels = require('../../models/post');
const WriteToLog = require('../../utils/writeToLog');
const { getAuthorIdOrAuthorIds, getParamsForSearchDB } = require('../../utils');
const subscriptionModels = require('../../models/subscriptions');


const writeToLog = new WriteToLog();

exports.create = async (req, res) => {
  try {
    const { body } = req;
    const post = await postModels.create(body);
    res.status(201).json(post);
  } catch (error) {
    writeToLog.write(error, 'create_post.error');
    res.status(500).json(error);
  }
}

exports.put = async (req, res) => {
  try {
    const {
      body: {
        title,
        text,
      },
      query: {
        postId,
      },
    } = req;
    const post = await postModels.findByIdAndUpdate({ _id: postId }, { title, text });
    res.status(200).json(post);
  } catch (error) {
    writeToLog.write(error, 'put_post.error');
    res.status(500).json(error);
  };
};

exports.get = async (req, res) => {
  try {
    const {
      query: params,
      query: {
        postId,
        limit,
        page,
        authorId,
        subscriptionsId,
      },
    } = req;
    let post = null;
    if (postId) {
      post = await postModels.findOne({ _id: postId });
    } else {
      let query = await getAuthorIdOrAuthorIds({ authorId, subscriptionsId });
      query = { ...getParamsForSearchDB(params, ['page', 'limit', 'subscriptionsId' ]), ...query };

      const options = {
        sort: { createTime: -1 },
        limit,
        page,
      }

      post = await postModels.paginate(query, options);
    }
    res.status(200).json(post);
  } catch (error) {
    writeToLog.write(error, 'get_post.error');
    res.status(500).json(error.toString());
  };
};

exports.deleteOne = async (req, res) => {
  try {
    const {
      query: {
        postId,
      },
    } = req;
    const post = await postModels.deleteOne({ _id: postId });
    if (post.deletedCount) {
      res.status(200).json({ messages: 'пост успешно удален' });
    } else {
      res.status(404).json({ messages: 'нет поста с таким id' });
    }
  } catch (error) {
    writeToLog.write(error, 'get_post.error');
    res.status(500).json(error);
  };
};
