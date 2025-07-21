export type POST_REGISTER_USER = {
  email: string;
  password?: string;
};


export type POST_VERIFY_USER = {
  email: string;
  otp: string;
};