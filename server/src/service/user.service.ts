import { UserInput } from "../constants";
import { User } from "../model/user.model";

const getUserById = async (id: string) => {
  return await User.findById(id).select("-__v");
};

const getUserByEmail = async (email: string) => {
  return await User.findOne({ email: email }).select("-__v");
};

const register = async (body: UserInput) => {
  return await User.create(body);
};
export default {
  getUserById,
  getUserByEmail,
  register,
};
