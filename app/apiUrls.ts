import axios from "axios";
import { getCookie } from "@/src/helpers/cookieHelper";
export const BASE_URL = "https://gstio-backend.run.place";
export const REGISTER_USER = "/users/register";
export const GENERATE_OTP = "/users/generate-otp";
export const VERIFY_OTP = "/users/verify-otp";
export const COMPLETE_SIGNUP = "/users/signup";
export const LOGIN_USER = "/users/login";
export const GOOGLE_CALLBACK_URL = BASE_URL + "/users/auth/google";
export const GOOGLE_ROOT_URL = "https://accounts.google.com/o/oauth2/v2/auth";
export const VERIFY_GST = "/users/verify-gst";
export const COMPLETE_REGISTRATION_URL = "/users/signup";
export const POST_ADD_PRODUCT = "/products/postProduct";
export const GET_USER_DATA = "/users/myData";
export const GET_ALL_PRODUCTS = "/products/getProducts";
export const POST_UPDATE_PRODUCT = "/products/updateProduct";
export const POST_DELETE_PRODUCT = "/products/deleteProduct";

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
    config.headers.Authorization = `${token}`;
  }
  return config;
});
