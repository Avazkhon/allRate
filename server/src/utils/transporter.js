const nodemailer = require("nodemailer");

const { emailAccount } = require("../../password");

let transporter = nodemailer.createTransport(
  {
    service: 'gmail',
    auth: {
      user: emailAccount.user, // generated ethereal user
      pass: emailAccount.pass, // generated ethereal password
    },
  },
  {
    from: `"FaceBetting" <${emailAccount.user}>`, // sender address
  }
);

module.exports = transporter;
