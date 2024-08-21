import { Otp } from "../model/otp.model";

const getOtp = (email: string) => {
  return Otp.findOne({ email });
};

const createOtp = (email: string, otp: number) => {
  return Otp.create({ email, otp });
};

const deleteOtp = (email: string) => {
  return Otp.deleteOne({ email });
};

const generateOtp = async() => {
  let otp = "";
  const digits = "0123456789";
  for (let i = 0; i < 4; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return Number(otp);
};
export default {
  getOtp,
  createOtp,
  deleteOtp,
  generateOtp
};
