import path from "path";
import nodemailer from "nodemailer";
import ejs from "ejs";

const filepath = path.join(__dirname + "/verificationEmail.ejs");

const verifyMail = (to: string, text: string, otp: string, subject: string) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS,
    }
  });

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
