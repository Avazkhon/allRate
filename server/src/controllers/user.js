const userModels = require('../models/user');
const getUser = require('./getUser');

exports.getUser = (req, res) => {
  const { id, userName, all } = req.query;
  const params = (id && {id}) || (userName && {userName}) || (all === 'true' && {all});

  if (params) {
    return getUser.getOne(params, res); // эта функция сама определяет какой тип параметра
  }

  res.status = 400;
  res.send('Нет параметров!')
}

exports.postAddOne = (req, res) => {
  userModels.postAddOne(
    req.body,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500);
        return res.send(err);
      }

      const data = {
        message: 'Пользователь успешно зарегистрирован!!',
      };

      res.status = 201;
      res.json(data);
    }
  );
}

exports.updateOne = (req, res) => {
  const { id } = req.query;
  const { email, userName, password, isAdmin } = req.body;
  const user = { email, userName, password, isAdmin: false };

  if (!req.session.user) {
    res.status = 403;
    return res.send('Нет прав!');
  }

  if (req.session.user.isAdmin) {
    user.isAdmin = isAdmin || false;
  }

  if (!id) {
    res.status = 400;
    return res.send('Не хватает данных для изменения!')
  }

  let promise = new Promise((resolve, reject) => {
    userModels.getOneById(id, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500);
        return res.send(err);
      }
      resolve(result);
    });
  });

  promise.then((result) => {
    if (result && result.length) {
      userModels.updateOne(id, user, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500);
          return res.send(err);
        }
       res.status = 200;
       return res.send('Пользователь успешно обновлен!');
      })
    } else {
      res.status = 400;
      res.send('Пользователь не найден!');
    }
  })
}

exports.deleteOne = (req, res) => {
  const { id } = req.query;

  userModels.deleteOne(id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500);
      return res.send(err);
    }

    if (!result.deletedCount) {
      res.status = 404;
      return res.send('Пользователя нет!')
    }
    res.status = 200;
    res.send('Пользователь успешно удален!')
  })
}

exports.auth = (req, res) => {
  const { email, password } = req.body;
  if (req.session.user) {
    req.session.user = null;
    return res.status(200).send('Пользователь успешно вышел из системы!')
  }

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
        message: 'Пользователь успешно авторизован!',
        userId: result._id,
        userName: result.userName,
        isAdmin: result.isAdmin,
      };
      req.session.user = { email, password, isAdmin: result.isAdmin, id: result._id };
      return res.status(200).json(data);
    }
    return res.status(401).send('Не правельный email или пароль!');
  });
}
