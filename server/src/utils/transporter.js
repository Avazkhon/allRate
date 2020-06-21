const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport(
  {
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'avazkhon@star-tex.ru', // generated ethereal user
      pass: 'yndex0125699', // generated ethereal password
    },
  },
  {
    from: '"Fred Foo 👻" <avazkhon@star-tex.ru>', // sender address
  }
);

module.exports = transporter;
