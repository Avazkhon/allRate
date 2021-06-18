const commentsModel = require('../../models/comments');
const userModel = require('../../models/user');
const WriteToLog = require('../../utils/writeToLog');

const writeToLog = new WriteToLog();

class CommentsController {
  createComments = async (data) => {
    try {
      return commentsModel.create(
        {
          entityBinding: {
            name: data.name,
            entityId: data.entityId
          },
        },
      )
    } catch (error) {
      writeToLog.write(error, 'create_comments.error');
      return error
    }
  }

  getComments = async (req, res) => {
    try {
      const {
        commentsId
      } = req.params;
      let comments = await commentsModel.findOne({ _id: commentsId });
      comments = await this.addUserData(comments)
      res.status(200).json(comments)
    } catch (error) {
      writeToLog.write(error, 'create_comments.error');
      return error
    }
  }

  saveComments = async (req, res) => {
    try {
      const { user } = req.session;
      if (!user || (user && !user.userId )) {
        return res.status(401).json('Пользователь не авторизован!');
      }
      const { body, params: { commentsId } } = req;
      let comments = await commentsModel.findByIdAndUpdate(
        { _id: commentsId },
        {
          $push: {
            comments: {
              authorId: user.userId,
              text: body.text
            }
          }
        },
      )
      comments = await this.addUserData(comments)
      res.status(201).json(comments);
    } catch (error) {
      writeToLog.write(error, 'add_comments.error');
      res.status(500).json({ error: error.toString()});
    }
  }

  addUserData = async (comments) => {
    comments = JSON.stringify(comments);
    comments = JSON.parse(comments);
    const users = await userModel.getByProps({ _id: comments.comments.map((comment) => comment.authorId) })
    comments.comments = comments.comments.map((comment) => {
      const user = users.find((user) => `${user._id}` == `${comment.authorId}`); // Без литералов строки одинаковые id не ===
      return {...comment, avatar: user.avatar, userName: user.userName }
    });
    return comments
  }
}

exports.CommentsController = CommentsController;