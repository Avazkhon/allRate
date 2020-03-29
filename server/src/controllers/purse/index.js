const purse = require('../../models/purse');
const WriteToLog = require('../../utils/writeToLog');

const writeToLog = new WriteToLog();

exports.createPurse = (userId) => {
  purse.createPurse(userId)
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
