const purseModel = require('../../models/purse');
const userModel = require('../../models/user');
const rateModel = require('../../models/rate');
const WriteToLog = require('../../utils/writeToLog');

const writeToLog = new WriteToLog();

exports.createPurse = async (data) => {
  return purseModel.createPurse(data)
  .then((purse) => {
    userModel.findByIdAndUpdate({ _id: data.userId}, { purseId: purse._id })
    .catch(err => writeToLog.write(err, 'update_user.err'));
  })
  .catch(err => writeToLog.write(err, 'create_purse.err'));
}

exports.createPurseForMainBet = async (data) => {
  const purse = await purseModel.createPurse(data);
  const rate = await rateModel.findByIdAndUpdate(
    { _id: purse.mainBetId },
    { 'mainBet.purseId': purse._id }
  );
  return { purse, rate };
}

exports.getPurse = (req, res) => {
  const { user } = req.session;
  if (!user || (user && !user.userId )) {
    return res.status(401).json('Пользователь не авторизован!');
  }

  purseModel.getPurse({ userId: user.userId })
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
  purseModel.findByIdAndUpdate(_id , { amount })
  .then((data) => {
    res.status(200).json(data)
  })
  .catch((err) => {
    res.status(500).json(err)
  })
}
