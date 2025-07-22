import axios from "axios";
export const BASE_URL = "http://localhost:4000";
export const REGISTER_USER = '/users/register'
export const GENERATE_OTP = '/users/generate-otp'
export const VERIFY_OTP = '/users/verify-otp'
export const COMPLETE_SIGNUP = '/users/signup'
export const LOGIN_USER = '/users/login'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

