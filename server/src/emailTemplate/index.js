const moment = require('moment');

const transporter = require('../utils/transporter');

exports.sendEmailAccountReplenishment = ({ to, userName, amount, dateTime}) => {
  return transporter.sendMail({
    to: to,
    subject: "Пополнения счета FaceBetting", // Subject line
    text: "Face Betting", // plain text body
    html: `
        <div>
          <img
             src="https://facebetting.ru/media/image/351d4490-caa2-404b-8cd6-3f7804c9f8b4:face-betting.jpg"
             alt="Ставки на FaceBetting"
          >
          <h3>Добрый день, ${userName}!</h3>
          <p>
            Ваш кошелек пополнен на ${amount} рублей.
          </p>
          <p>Дата: ${moment().utc().format()}</p>
          <p>
            Проверить кошелек по этой ссылки ${process.env.MAIN_URL}/purse
          </p>
        <div/>
      `,
  });
}