const userModels = require('../../models/user');

exports.authIn = (req, res) => {
  const { email, password } = req.body;

  userModels.getOneByUserEmail(email, (err, result) => {
    if (err) {
      console.log(err);
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
        isAdmin: result.isAdmin,
      };
      console.log(111, req.session.user);
      req.session.user = data;
      console.log(222, req.session.user);
      return res.status(200).json(data);
    }
    return res.status(401).send('Не правельный email или пароль!');
  });
}

exports.authAut = (req, res) => {
  console.log(333, req.session.user);
  req.session.user = null;
  return res.status(200)
    .json({
      message: 'Пользователь успешно вышел из системы!'
    });
}
