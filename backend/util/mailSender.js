const nodemailer = require("nodemailer");

const sendEmail = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mail = await transporter.sendMail({
      from: "helloworld@gmail.com",
      to: email,
      subject: title,
      html: body,
    });
    return mail;
  } catch (err) {
    console.log(err.message);
  }
};
module.exports = sendEmail;