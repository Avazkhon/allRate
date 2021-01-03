const fs = require('fs');

const userModels = require('../../models/user');
const postModels = require('../../models/post');
const rateModels = require('../../models/rate');
const WriteToLog = require('../../utils/writeToLog');

const writeToLog = new WriteToLog();

class AlbumFolder {
  constructor () {
    this.foder = process.env.NODE_ENV === 'development' ? '/dev/image/' : '/var/image/'
    this.PATH = process.cwd() + this.foder;
  }

  addFile = async (fileUploaded, pathName, userId) => {
    const nameImage = `${userId}-${fileUploaded.name.replace(/ /g,"_")}`
    return  fileUploaded.mv(`${pathName}${nameImage}`, function(err) {
      if (err) {
        writeToLog.write(error, 'add_file.err');
      }
    });
  }

  changeAvatar = (fileUploaded, userId) => {
    const nameImage = `${userId}-${fileUploaded.name.replace(/ /g,"_")}`
    return this.addFile(fileUploaded, this.PATH, userId)
    .then(() => {
      userModels.findByIdAndUpdate({ _id: userId },
        {'$set': {
            avatar: `/api/img/?idImg=${nameImage}`,
          }
        }
      );
    })
  }

  changePostImg = (fileUploaded, postId) => {
    const nameImage = `${postId}-${fileUploaded.name.replace(/ /g,"_")}`
    return this.addFile(fileUploaded, this.PATH, postId)
    .then(() => {
      postModels.findByIdAndUpdate({ _id: postId },
        {'$set': {
            'img.url': `/api/img/?idImg=${nameImage}`,
          }
        }
      );
    })
  }

  changeRateImg = (fileUploaded, rateId) => {
    const nameImage = `${rateId}-${fileUploaded.name.replace(/ /g,"_")}`
    return this.addFile(fileUploaded, this.PATH, rateId)
    .then(() => {
      rateModels.findByIdAndUpdate({ _id: rateId },
        {'$set': {
            'img': `/api/img/?idImg=${nameImage}`,
          }
        }
      );
    })
  }

  response = () => {

  }

  addImage = async (req, res) => {
    const { user } = req.session;
    const { post, rate } = req.query;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ err: 'No files were uploaded.' });
    } else if (!user || !user.userId) {
      return res.status(401).json({ err: 'Пользователь не авторизован!' });
    }

    if (req.files.avatar) {
      this.changeAvatar(req.files.avatar, user.userId)
      .then((result) => {
        res.status(200).json({ message: 'Новое фото добавлено!'});
      })
      .catch((err) => {
        res.status(500).json({ err: err.toString() });
      })
    } else if (req.files.post && post) {
      this.changePostImg(req.files.post, post)
      .then((result) => {
        res.status(200).json({ message: 'Новое фото добавлено!'});
      })
      .catch((err) => {
        res.status(500).json({ err: err.toString() });
      })
    } else if (req.files.rate && rate) {
      this.changeRateImg(req.files.rate, rate)
      .then((result) => {
        res.status(200).json({ message: 'Новое фото добавлено!'});
      })
      .catch((err) => {
        res.status(500).json({ err: err.toString() });
      })
    } else {
      res.status(400).json({ err: 'запрос не корректен' });
    }
  }

  getImg = (req, res) => {
    res.sendFile(this.PATH + req.query.idImg);
  }
}

module.exports = AlbumFolder;
