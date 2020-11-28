const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "baitthenew@gmail.com",
    pass: "theryston10"
  }
});

module.exports = {
  transporter: transporter,
  nodemailer: nodemailer
};