const purseModel = require('../../models/purse');
const userModel = require('../../models/user');
const rateModel = require('../../models/rate');
const WriteToLog = require('../../utils/writeToLog');

const writeToLog = new WriteToLog();

exports.createPurse = async (data) => {
  return purseModel.create(data)
  .then((purse) => {
    userModel.findByIdAndUpdate({ _id: data.userId}, { purseId: purse._id })
    .catch(err => writeToLog.write(err, 'update_user.err'));
  })
  .catch(err => writeToLog.write(err, 'create_purse.err'));
}

exports.createPurseForMainBet = async (data) => {
  const purse = await purseModel.create(data);
  const rate = await rateModel.findByIdAndUpdate(
    { _id: purse.mainBetId },
    { 'purseId': purse._id }
  );
  return { purse, rate };
}

exports.getPurse = (req, res) => {
  const { user } = req.session;
  if (!user || (user && !user.userId )) {
    return res.status(401).json('Пользователь не авторизован!');
  }

  purseModel.findOne({ userId: user.userId }, { history: false })
  .then(data => {
    res.status(200).json(data)
  })
  .catch((err) => {
    writeToLog.write(err, 'get_purse.err')
    res.status(500).json(err);
  });
}

exports.getPurseHistory = (req, res) => {
  const { user } = req.session;
  if (!user || (user && !user.userId )) {
    return res.status(401).json('Пользователь не авторизован!');
  }

  purseModel.findOne({ userId: user.userId }, { history: true })
  .then(data => {
    res.status(200).json(data)
  })
  .catch((err) => {
    writeToLog.write(err, 'get_purse_history.err')
    res.status(500).json(err);
  });
}

exports.findByIdAndUpdate = (req, res) => {
  const { user } = req.session;
  if (!user || user.userId) {
    return res.status(401).json({ message: 'Пользователь не авторизован!' })
  };

  res.status(200).json({message: 'Много чего хочешь.'})
}
