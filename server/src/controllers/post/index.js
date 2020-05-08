const postModels = require('../../models/post');
const WriteToLog = require('../../utils/writeToLog');

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
      query: {
        postId,
      },
    } = req;
    const post = await postModels.get({ _id: postId });
    res.status(200).json(post);
  } catch (error) {
    writeToLog.write(error, 'get_post.error');
    res.status(500).json(error);
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

exports.views = async (req, res) => {
  try {
    const {
      query: {
        postId,
      },
    } = req;
    let post = await postModels.get({ _id: postId });
    if (!post) {
      return res.status(404).json({ message: 'нет поста с таким id' });
    }
    post = await postModels.findByIdAndUpdate({ _id: postId }, { views: ++post.views });
    res.status(200).json(post);
  } catch (error) {
    writeToLog.write(error, 'views_post.error');
    res.status(500).json({ message: 'Ошибка на сервере', error});
  };
};

exports.rating = async (req, res) => {
  try {
    const {
      body: {
        userId,
        makeTime,
      },
      query: {
        postId,
        action
      },
    } = req;
    if (!userId || !makeTime || !postId || !action) {
      res.status(400).json({
        message: 'не хватате данных',
        userId: `required-${userId}`,
        makeTime: `required-${makeTime}`,
        postId: `required-${postId}`,
        action: `required-${action}`,
      });
    }
    const post = await postModels.findByIdAndUpdate(
      { _id: postId },
      {$push: {
        [`rating.${action}`]: { userId, makeTime }
      }}
    );
    res.status(200).json(post);

  } catch (error) {
    writeToLog.write(error, 'get_post.error');
    console.log(error);
    res.status(500).json({ message: 'Ошибка на сервере', error});
  };
};
