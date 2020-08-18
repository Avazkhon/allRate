const userModels = require('../../models/user');
const WriteToLog = require('../../utils/writeToLog');

const writeToLog = new WriteToLog();

exports.authIn = (req, res) => {
  const { email, password } = req.body;
  userModels.findOne({ email }, { password: true, email: true })
  .then((user) => {
    if (user
      && user.email === email
      && user.password === password
    )
    {
      const data = {
        userId: user._id,
        userName: user.userName,
        purseId: user.purseId,
        isAdmin: user.isAdmin,
      };
      req.session.user = data;
      return res.status(200).json(data);
    }
    return res.status(401).send('Не правельный email или пароль!');
  })
  .catch((error) => {
    console.log(error);
    writeToLog.write(error, 'request.err');
    res.status(500).json(error);
  })
}

exports.authAut = (req, res) => {
  req.session.user = null;
  return res.status(200)
  .json({
    message: 'Пользователь успешно вышел из системы!'
  });
}

exports.mailConfirmation = async (req, res) => {
  const { mail_confirmation } = req.query;
  await userModels.findOneAndUpdate(
    { mailConfirmation: mail_confirmation },
    { mailConfirmation: true }
  )
  .then((user) => {
    return res.status(200).json(user);
  })
  .catch((error) => {
    writeToLog.write(error, 'mail_confirmation.error');
    res.status(500).json(error);
  })
}
