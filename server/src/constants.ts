import { Document } from "mongoose";

export interface UserInput {
  orgType: string;
  name: string;
  surname: string;
  email: string;
  dob: string;
  password: string;
}

export interface UserDocument extends UserInput, Document {
  orgName: string;
  passcode: number;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
  isPasswordMatched(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
  clearRefresh(): void;
}

export interface UserTokenPayload {
  _id: string;
  email: string;
}
