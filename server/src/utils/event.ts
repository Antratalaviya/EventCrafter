import EventEmitter from "events";
import { verifyMail } from "../email";

const eventEmitter = new EventEmitter();

eventEmitter.on("send_otp_with_mail", (data) => {
  verifyMail(data.to, data.text, data.otp, data.subject);
});


export default eventEmitter;