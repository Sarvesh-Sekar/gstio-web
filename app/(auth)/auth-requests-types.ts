export type POST_REGISTER_USER = {
  email: string;
  password?: string;
};


export type POST_VERIFY_USER = {
  email: string;
  otp: string;
};

export type POST_LOGIN_REQUEST = 
{
  email: string;
  password: string;
}

export type POST_LOGIN_RESPONSE = {
  token: string;
}