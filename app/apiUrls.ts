import axios from "axios";
import { getCookie } from "@/src/helpers/cookieHelper";
export const BASE_URL = "http://localhost:4000";
export const REGISTER_USER = "/users/register";
export const GENERATE_OTP = "/users/generate-otp";
export const VERIFY_OTP = "/users/verify-otp";
export const COMPLETE_SIGNUP = "/users/signup";
export const LOGIN_USER = "/users/login";
export const GOOGLE_CALLBACK_URL = "http://localhost:4000/users/auth/google";
export const GOOGLE_ROOT_URL = "https://accounts.google.com/o/oauth2/v2/auth";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = getCookie("AuthToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
