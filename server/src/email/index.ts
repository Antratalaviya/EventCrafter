import path from "path";
import nodemailer from "nodemailer";
import ejs from "ejs";
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

const filepath = path.join(__dirname + "/verificationEmail.ejs");
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const filepath = path.join(__dirname + '/verificationEmail.ejs')

const verifyMail = (to: string, text: string, otp: string, subject: string) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS,
    }
  });
  // const transport = nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  //   port: 587,
  //   secure: true,
  //   auth: {
  //     user: "process.env.MAIL_ID",
  //     pass: "process.env.MAIL_PASS",
  //   },
  // });

  return ejs.renderFile(filepath, { otp }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const mailOption = {
        from: "process.env.MAIL_ID",
        to: to,
        subject: subject,
        text: text,
        html: data,
      };

      transport.sendMail(mailOption)
    }
  });
};

export { verifyMail }
