export enum AppString {
  ALL_FIELDS_REQUIRED = "all input fields are required",
  PASSWORD_NOT_FOUND = "password is required",
  PASSWORD_INCORRECT = "password is incorrect",
  CREDENTIAL_REQUIRED = "email or password is required",
  USER_EXIST = "user already exist with this email",
  USER_NOT_EXIST = "user not exist with this email",
  USER_REGISTERED = "user registered successfully",
  USER_LOGIN = "user login successfully",
  UNAUTHORIZED = "user is not authorized",
  USER_UPDATED = "user updated successfully",
  USER_LOGOUT = "user logout successfully",
  USER_RETRIEVED = "user retrieved successfully",
  PASSWORD_UPDATED = "password updated successfully",

  INVALID_SESSION = "your session is not valid",
  INVALID_TOKEN = "token is invalid",
  TOKEN_EXPIRE = "session expire",

  OTP_ERR = "please resend the otp",
  OTP_SEND = "otp send successfully",
  OTP_NOT_MATCH = "otp not matched !! please try again",
  OTP_VERIFY = "user verified successfully",
  OTP_EXPIRED = "otp expired !! please try again",

  INVALID_DATE = "please check start and end date",
  EVENT_CREATED = "event created successfully",
  EVENT_UPDATED = "event update successfully",
  EVENT_END = "event ended !!",
  EVENT_DELETED = "event deleted successfully",
  EVENT_RETRIEVED = "event retrieved successfully",
  EVENT_CREATION_FAILED = "event creation failed!!!! please try again",
  EVENT_NOT_FOUND = 'event not found',
  EVENT_NOT_LIKED = "event like failed!! please try again",
  EVENT_NOT_SAVED = "event save failed!! please try again",
  EVENT_LIKED = "event liked successfully",
  EVENT_SAVED = "event saved successfully",

  SAVED_EVENTS = "saved events retrieved successfully",
  LIKED_EVENTS = "liked events retrieved successfully",

  NO_NOTIF = "no new notification",
  NOTIFICATIONS = "notification retrieved successfully",

  EVENT_RECIPIENT_NOT = "event or recipient does not exist",

  INVITATION_SENT = "invitation sent successfully",
  INVITATION_ACCEPT = "invitation accepted successfully",
  INVITATION_REJECT = "invitation rejected!!",
  INVITAIIONS = 'all invitations retrieved',
  NO_INVITATION = "no new invitation",

  SUBSCRIBED = "user subscribed successfully",
  SUBSCRIBE_FAILED = "subscribe failed!! please try again"

};

export enum Collection {
  MODEL_USER = "User",
  MODEL_OTP = "Otp",
  MODEL_EVENT = "Event",
  MODEL_INVITATION = "Invitation",
  MODEL_NOTIFICATION = "Notification",
};

export enum NotificationMsg {
  USER_REGISTERED = 'You Have Successfully Registered At EventCrafter',
  USER_LOGIN = 'You Have Successfully Login At EventCrafter',
}
