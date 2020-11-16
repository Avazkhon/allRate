const uuidv4 = require('uuid').v4;
const getUser = require('./getUser');
const userModels = require('../../models/user');
const subscriptionsModels = require('../../models/subscriptions');
const subscribersModels = require('../../models/subscribers');
const WriteToLog = require('../../utils/writeToLog');
const transporter = require('../../utils/transporter');
const purseControllers = require('../purse');

const writeToLog = new WriteToLog();
exports.getUser = (req, res) => {
  const { id, ids, userName, all, page } = req.query;
  const params =
  (id && {id}) ||
  (ids && {ids}) ||
  (userName && {userName}) ||
  ( page && { ...req.query });

  if (params) {
    return getUser.getOne(params, res); // эта функция сама определяет какой тип параметра
  }

  res.status = 400;
  res.send('Нет параметров!')
}

exports.craeteUser = async (req, res) => {
  try {
    let user = await userModels.create(req.body)
    const token = uuidv4();
    await purseControllers.createPurse({
      createTime: req.body.dateCreate,
      userId: user._id
    });
    const subscription = await subscriptionsModels.create({
      userId: user._id,
      subscriptions: [],
    });
    const subscribers = await subscribersModels.create({
      userId: user._id,
      subscribers: [],
    });
    transporter.sendMail({
      to: user.email,
      subject: "my app", // Subject line
      text: "mail confirmation", // plain text body
      html: `
        <div>
          <h3>Hello, ${user.userName}</h3>
          <p>
            To confirm the mail, follow the link ${process.env.MAIN_URL}/auth/?mail_confirmation=${token}
          </p>
        <div/>
      `,
    });

    user = await userModels.findByIdAndUpdate(
      { _id: user._id },
      {'$set': {
          subscriptionsId: subscription._id,
          subscribersId: subscribers._id,
          mailConfirmation: token,
        }
      }
    )
    .catch((error) => {writeToLog.write(error, 'mail_confirmation.error')})
    res.status(201).json(user);
  } catch(error) {
    writeToLog.write(error, 'create_user.error')
    res.status(500).json(error);
  };
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

  userModels.findByIdAndUpdate({ _id: id }, user)
  .then(result => res.status(200).json(result))
  .then((error) => {
    res.status(500).json(error);
    writeToLog.write(error, 'update_user.error');
  })
}

exports.deleteOne = (req, res) => {
  const { id } = req.query;
  userModels.deleteOne({ _id: id })
  .then(() => res.status(200).json({ messages: 'Пользователь успешно удален!' }))
  .catch((error) => {
    writeToLog.write(error, 'delete_user.err');
    return res.status(500).json(error);
  })
}

exports.passwordRecoveryStart = async (req, res) => {
  const userFromSession = req.session.user;
  if (userFromSession && userFromSession.userId) {
    const token = uuidv4();
    const userData = await userModels.findByIdAndUpdate({_id: userFromSession.userId}, {recoveryId: token});
    transporter.sendMail({
      to: userData.email,
      subject: "Face Betting", // Subject line
      text: "Востановления пароля", // plain text body
      html: `
        <div>
          <h3>Добрый день, ${userData.userName}</h3>
          <p>
            Вы оставили запрос на восстановления пароля.
          </p>
          <p>
             Для восстановления пароля перейдите по этой ссылке ${process.env.MAIN_URL}/password-recovery?recoveryId=${token}
          </p>
          <p>
            Если вы не запрашивали новый пароль проигнорируете это письмо.
          </p>
        <div/>
      `,
    });

    return res.status(200).json(userData);
  }
  return res.status(401).json({messages: 'Пользователь не авторизован'})
}

exports.passwordRecoveryFinish = async (req, res) => {
  const userFromSession = req.session.user;
  const { recoveryId } = req.query;
  const { password } = req.body;

  if (recoveryId && password) {
    const userDataBefore = await userModels.findOne({recoveryId}, {recoveryId: true} )
    if (userDataBefore && userDataBefore.recoveryId === recoveryId) {
      const userDataAfter = await userModels.findByIdAndUpdate(
        {_id: userDataBefore._id},
        { recoveryId: '', password },
        { new: true, recoveryId: true }
      );
      return res.status(200).json({messages: 'Пароль успешно обновлен'});
    } else {
      return res.status(400).json({messages: 'Переданный токен не верен'});
    }
  } else {
    return res.status(400).json({messages: 'Не хватает данных'});
  }
}
