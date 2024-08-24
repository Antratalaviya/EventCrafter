import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

import { Collection } from "../utils/appString";
import { UserDocument } from "../constants";
import jwt, { Secret, SignOptions } from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    orgType: {
      type: String,
      enum: ["personal", "institute", "company", "school"],
      default: "personal",
    },
    orgName: {
      type: String,
    },
    postcode: {
      type: Number,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
    },
    refreshToken: {
      type: String,
      default: "",
    },
    likedEvent: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
    }],
    savedEvent: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
    }],
    subscriber: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    subscribing: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    joinedEvent: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
    }]
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (this: UserDocument, next) {
  try {
    if (!this.isModified("password")) return next();

    const hashPassword = await bcryptjs.hash(this.password, 10);
    this.password = hashPassword;
    next();
  } catch (error) {
    return next(error as Error);
  }
});

userSchema.methods.isPasswordMatched = async function (
  password: string
): Promise<boolean> {
  const user = this as UserDocument;
  return await bcryptjs.compare(password, user.password);
};

userSchema.methods.generateAccessToken = async function (this: UserDocument) {
  const secret: Secret = process.env.ACCESS_TOKEN_SECRET as string;
  const option: SignOptions = {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE as string,
    algorithm: "HS512",
  };

  const payload = {
    _id: this._id,
    email: this.email,
  };

  const accessToken = jwt.sign(payload, secret, option);
  return accessToken;
};

userSchema.methods.generateRefreshToken = async function (this: UserDocument) {
  const secret: Secret = process.env.REFRESH_TOKEN_SECRET as string;
  const option: SignOptions = {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE as string,
    algorithm: "HS512",
  };

  const payload = {
    _id: this._id,
  };

  const refreshToken = jwt.sign(payload, secret, option);
  this.refreshToken = refreshToken;
  await this.save();
  return refreshToken;
};

userSchema.methods.clearRefresh = async function (this: UserDocument) {
  this.refreshToken = "";
  await this.save();
};

export const User = mongoose.model<UserDocument>(
  Collection.MODEL_USER,
  userSchema
);
