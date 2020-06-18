const fs = require('fs');

const userModels = require('../../models/user');

class AlbumFolder {
  constructor () {
    this.PATH = process.cwd() + '/var/image/';
  }

  addFile = async (fileUploaded, pathName, userId) => {
    const nameImage = `${userId}-${fileUploaded.name.replace(/ /g,"_")}`
    return  fileUploaded.mv(`${pathName}${nameImage}`, function(err) {
      if (err) {
        throw err;
      }
    });
  }

  changeAvatar = (fileUploaded, userId) => {
    const nameImage = `${userId}-${fileUploaded.name.replace(/ /g,"_")}`
    return this.addFile(fileUploaded, this.PATH, userId)
    .then(() => {
      userModels.findByIdAndUpdate({ _id: userId },
        {'$set': {
            avatar: `/img/${nameImage}`,
          }
        }
      );
    })
  }

  addImage = async (req, res) => {
    const { user } = req.session;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ err: 'No files were uploaded.' });
    } else if (!user || !user.userId) {
      return res.status(401).json({ err: 'Пользователь не авторизован!' });
    }

    const fileUploaded = req.files.fileUploaded;
    this.changeAvatar(fileUploaded, user.userId)
    .then((result) => {
      res.status(200).json({ message: 'Новое фото добавлено!'});
    })
    .catch((err) => {
      res.status(500).json({ err: err.toString() });
    })
  }
}

module.exports = AlbumFolder;
