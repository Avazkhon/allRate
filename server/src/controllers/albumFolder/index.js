const fs = require('fs');
const userModels = require('../../models/user');

class AlbumАolder {
  constructor () {
    this.PATH = process.cwd() + '/image/';
  }

  addFile = async (fileUploaded, pathName) => {
    return  fileUploaded.mv(pathName + fileUploaded.name, function(err) {
      if (err) {
        throw err;
      }
    });
  }

  createFolderAndAddImage = (fileUploaded, userId) => {
    return new Promise((resolve, reject) => {
      const pathName = this.PATH + userId + '/';

      if (fs.existsSync(pathName)) {
        this.addFile(fileUploaded, pathName)
        .then(resolve)
        .catch(reject);
      } else {
        fs.mkdir(pathName, { recursive: true }, (err) => {
          if (err) {
            reject(err);
          }
          this.addFile(fileUploaded, pathName)
          .then(resolve)
          .catch(reject);
        })
      }
    })
  }

  changeAvatar = (fileUploaded, userId) => {
    return this.createFolderAndAddImage(fileUploaded, userId)
    .then(() => {
      userModels.findByIdAndUpdate({ _id: userId },
        {'$set': {
            avatar: `/${fileUploaded.name}`,
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

module.exports = AlbumАolder;
