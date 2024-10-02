export enum AppString {
  ALL_FIELDS_REQUIRED = "all input fields are required",
  PASSWORD_NOT_FOUND = "password is required",
  PASSWORD_INCORRECT = "password is incorrect",
  CREDENTIAL_REQUIRED = "email or password is required",
  USER_EXIST = "user already exist with this email",
  USER_NOT_EXIST = "user does not exist",
  USER_REGISTERED = "user registered successfully",
  USER_LOGIN = "user login successfully",
  UNAUTHORIZED = "user is not authorized",
  USER_UPDATED = "user updated successfully",
  USER_LOGOUT = "user logout successfully",
  USER_RETRIEVED = "user retrieved successfully",
  PASSWORD_UPDATED = "password updated successfully",
  USER_ACCOUNT_DEL = "user account deleted successfully",
  EMAIL_UPDATED = "user email updated successfully",

  ACTION_FAILED = "action failed !! please try again",

  INVALID_SESSION = "your session is not valid",
  INVALID_TOKEN = "token is invalid",
  TOKEN_EXPIRE = "session expire !! Please login again",
  TOKEN_REGISTERED = "access token generated successfully",

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
  EVENT_CANCEL = "event cancelled successfully",
  EVENT_NOT_EXIST = "event does not exist",
  EVENT_OWNER_NOT_EXIST = "event owner does not exist",

  USER_NOT_OWNER = "user is not owner of this event",

  SAVED_EVENTS = "saved events retrieved successfully",
  LIKED_EVENTS = "liked events retrieved successfully",

  NO_NOTIF = "no new notification",
  NOTIFICATIONS = "notification retrieved successfully",
  NOTIFICATION_UPDATED = "notification updated successfully",

  EVENT_RECIPIENT_NOT = "event or recipient does not exist",
  RECIPIENT_IS_OWNER = "recipient is owner of the event",

  INVITATION_SENT = "invitation sent successfully",
  INVITATION_ACCEPT = "invitation accepted successfully",
  INVITATION_REJECT = "invitation rejected!!",
  INVITAIIONS = 'all invitations retrieved',
  NO_INVITATION = "no new invitation",
  INVITAIION_NOT_EXIST = "no invitation exist",
  INVITATION_ALREADY_SENT = "invitation already sent",

  SUBSCRIBED = "user subscribed successfully",
  SUBSCRIBE_FAILED = "subscribe failed!! please try again",

  NO_PARTICIPANT = "no new participants",
  PARTICIPANTS = 'all participantss retrieved',

  AVATAR_RETRIEVED = 'avatar retrieved successfully',
  AVATAR_CREATED = "avatar created successfully",
  AVATAR_UPDATED = "avatar updated successfully",
  AVATAR_DELETED = "avatar deleted successfully",

  REQUEST_SEND = "request sent successfully",
  ACCEPT_REQUEST = "request accepted successfully",
  REJECT_REQUEST = "request rejected successfully",
  FRIENDS_RETRIEVED = "my friends retrieved successfully",
  REQ_NOT_EXIST = "connection request does not exist",
  REQ_ALREADY_SENT = "connection request already sent",


  CLIENT_SECRET_RETRIEVED = "client secret retrieved successfully",
};

export enum Collection {
  MODEL_USER = "User",
  MODEL_OTP = "Otp",
  MODEL_EVENT = "Event",
  MODEL_INVITATION = "Invitation",
  MODEL_CONNECTION = "Connection",
  MODEL_NOTIFICATION = "Notification",
};

export enum NotificationMsg {
  USER_REGISTERED = 'You Have Successfully Registered At EventCrafter',
  USER_LOGIN = 'You Have Successfully Login At EventCrafter',
}
