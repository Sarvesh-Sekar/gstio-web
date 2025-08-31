import { api } from "@/app/apiUrls";
import {
  REGISTER_USER,
  GENERATE_OTP,
  VERIFY_OTP,
  COMPLETE_SIGNUP,
  LOGIN_USER,
  GOOGLE_CALLBACK_URL,
  GOOGLE_ROOT_URL,
  VERIFY_GST,
  COMPLETE_REGISTRATION_URL,
  GET_USER_DATA,
} from "@/app/apiUrls";
import {
  POST_REGISTER_USER,
  POST_VERIFY_USER,
  POST_LOGIN_RESPONSE,
  POST_LOGIN_REQUEST,
} from "@/app/(auth)/auth-requests-types";

export const postRegisterUser = async (payload: POST_REGISTER_USER) => {
  try {
    const response = await api.post(REGISTER_USER, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const postGenerateOtp = async (payload: any) => {
  try {
    console.log(payload);
    const response = await api.post(GENERATE_OTP, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const postVerifyOtp = async (payload: POST_VERIFY_USER) => {
  try {
    const response = await api.post(VERIFY_OTP, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const postCompleteSignup = async (payload: any) => {
  try {
    const response = await api.post(COMPLETE_SIGNUP, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const postManualLogin = async (payload: POST_LOGIN_REQUEST) => {
  try {
    const response = await api.post(LOGIN_USER, payload);
    console.log(response?.data?.token + " RES");
    return response;
  } catch (err) {
    throw err;
  }
};

export const getGstVerified = async (value: string) => {
  try {
    const response = await api.post(VERIFY_GST, {
      gstId: value,
    });
    return response;
  } catch (err) {
    throw err?.response;
  }
};

export const postGoogleLogin = async (code: string) => {
  try {
    const response = await api.post(GOOGLE_CALLBACK_URL, {
      code: code,
    });
    return response?.data;
  } catch (err) {
    throw err;
  }
};

export const getUserData = async (payload: any) => {
  try {
    const response = await api.post(GET_USER_DATA, payload);
    return response?.data;
  } catch (err) {
    throw err;
  }
};
