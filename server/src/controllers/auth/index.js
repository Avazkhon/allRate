const userModels = require('../../models/user');
const WriteToLog = require('../../utils/writeToLog');

const writeToLog = new WriteToLog();

exports.authIn = (req, res) => {
  const { email, password } = req.body;

  userModels.getOneByUserEmail(email, (err, result) => {
    if (err) {
      writeToLog.write(err, 'request.err');
      return res.status(500).send(err);
    }

    if (result
      && result.email === email
      && result.password === password
    )
    {
      const data = {
        userId: result._id,
        userName: result.userName,
        purseId: result.purseId,
        isAdmin: result.isAdmin,
      };
      req.session.user = data;
      return res.status(200).json(data);
    }
    return res.status(401).send('Не правельный email или пароль!');
  });
}

exports.authAut = (req, res) => {
  req.session.user = null;
  return res.status(200)
    .json({
      message: 'Пользователь успешно вышел из системы!'
    });
}
