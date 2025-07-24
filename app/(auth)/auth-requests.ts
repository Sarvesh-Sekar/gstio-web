import { api } from "@/app/apiUrls";
import {
  REGISTER_USER,
  GENERATE_OTP,
  VERIFY_OTP,
  COMPLETE_SIGNUP,
  LOGIN_USER,
  GOOGLE_CALLBACK_URL,
  GOOGLE_ROOT_URL,
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

export const postManualLogin = async (
  payload: POST_LOGIN_REQUEST
): Promise<string | undefined> => {
  try {
    const response: POST_LOGIN_RESPONSE = await api.post(LOGIN_USER, payload);
    return response;
  } catch (err) {}
};

export const postGoogleLogin = async (code: string) => {
  try {
    const response = await api.post(GOOGLE_CALLBACK_URL, {
      code:code,
    });
    return response?.data;
  } catch (err) {
    throw err;
  }
};
