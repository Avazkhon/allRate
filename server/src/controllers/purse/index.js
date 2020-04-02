const purse = require('../../models/purse');
const userModel = require('../../models/user');
const WriteToLog = require('../../utils/writeToLog');

const writeToLog = new WriteToLog();

exports.createPurse = async (data) => {
  return purse.createPurse(data)
  .then((purse) => {
    userModel.updateOne(data.userId, { purseId: purse._id }, (err, result) => {
      if (err) {
        writeToLog.write(err, 'update_user.err')
      }
    })
  })
  .catch(err => writeToLog.write(err, 'create_purse.err'));
}

exports.getPurse = (req, res) => {
  const { user } = req.session;
  if (!user || (user && !user.userId )) {
    return res.status(401).json('Пользователь не авторизован!');
  }

  purse.getPurse({ userId: user.userId })
  .then(data => res.status(200).json(data))
  .catch((err) => {
    writeToLog.write(err, 'get_purse.err')
    res.status(500).json(err);
  });
}

exports.findByIdAndUpdate = (req, res) => {
  const { user } = req.session;
  if (!user || user.userId) {
    return res.status(401).json({ message: 'Пользователь не авторизован!' })
  };
  const { _id, amount } = req.body;
  purse.findByIdAndUpdate(_id , { amount })
  .then((data) => {
    res.status(200).json(data)
  })
  .catch((err) => {
    res.status(500).json(err)
  })
}
