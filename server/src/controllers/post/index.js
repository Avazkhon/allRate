const postModels = require('../../models/post');
const WriteToLog = require('../../utils/writeToLog');
const { getAuthorIdOrAuthorIds, getParamsForSearchDB, getParamsBestPostByDate} = require('../../utils');


const writeToLog = new WriteToLog();

exports.create = async (req, res) => {
  try {
    const { user } = req.session;
    if (!user || (user && !user.userId )) {
      return res.status(401).json('Пользователь не авторизован!');
    }

    const { body } = req;
    body.authorId = user.userId;
    const post = await postModels.create(body);
    res.status(201).json(post);
  } catch (error) {
    writeToLog.write(error, 'create_post.error');
    res.status(500).json(error);
  }
}

exports.putPostById = async (req, res) => {
  try {
    const { user } = req.session;
    const {
      body,
      query: {
        postId,
      },
    } = req;

    if (!user || (user && !user.userId )) {
      return res.status(401).json('Пользователь не авторизован!');
    }

    const props = [
      'title',
      'text',
      'img',
    ];
    const data = {};
    props.forEach((prop, i) => {
      if(body.hasOwnProperty(prop)) {
        data[prop] = body[prop];
      }
    });

    const post = await postModels.findByIdAndUpdate({ _id: postId }, { $set: data });
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
        createDataStart,
        createDateEnd
      },
    } = req;
    let post = null;
    let sort = { createDate: -1 };
    if (postId) {
      post = await postModels.findOne({ _id: postId });
    } else {
      let query = await getAuthorIdOrAuthorIds({ authorId, subscriptionsId });
      query = { ...getParamsForSearchDB(params, ['page', 'limit', 'subscriptionsId', 'createDataStart', 'createDateEnd' ]), ...query };
      const paramsBestPostByDate = getParamsBestPostByDate(query, sort, createDataStart, createDateEnd);
      sort = paramsBestPostByDate.sort;
      query = paramsBestPostByDate.query;

      const options = {
        sort,
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
