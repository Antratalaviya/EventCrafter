import mongoose, { Document } from "mongoose";

export interface UserInput {
  orgType: string;
  name: string;
  surname: string;
  email: string;
  dob: string;
  password: string;
}

export interface UserDocument extends UserInput, Document {
  _id: mongoose.Types.ObjectId;
  orgName: string;
  passcode: number;
  profileImg: string;
  refreshToken: string;
  refreshTokenExpiry: Date;
  savedEvent: Array<mongoose.Types.ObjectId>;
  createdAt: Date;
  updatedAt: Date;
  joinedEvent: Array<mongoose.Types.ObjectId>;
  friends: Array<mongoose.Types.ObjectId>;
  isPasswordMatched(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
  clearRefresh(): void;
}

export interface EventInput {
  type: string;
  category: string;
  title: string;
  subtitle1: string;
  subtitle2: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  offers: Array<string>;
  carCapacity: string;
  street: string;
  city: string;
  country: string;
  photos: [{
    url: string;
  }];
  pdfFile: [{
    url: string
  }];
  description: string;
}

export interface EventDocument extends EventInput, Document {

  videoFile: {
    url: string
  };
  status: string;
  expiresIn: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface UserTokenPayload {
  _id: mongoose.Types.ObjectId;
  email: string;
}

export interface NotificationIp {
  sender: mongoose.Types.ObjectId;
  recipient: mongoose.Types.ObjectId;
  invitationId?: mongoose.Types.ObjectId;
  message: string;
  type: string;
}

export interface NotificationDoc extends NotificationIp, Document {
  isRead: boolean;
  createdAt: Date;
}
