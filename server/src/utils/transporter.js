const nodemailer = require("nodemailer");

const { emailAccount } = require("../../password");

let transporter = nodemailer.createTransport(
  {
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: emailAccount.user, // generated ethereal user
      pass: emailAccount.pass, // generated ethereal password
    },
  },
  {
    from: `"All Rate" <${emailAccount.user}>`, // sender address
  }
);

module.exports = transporter;
