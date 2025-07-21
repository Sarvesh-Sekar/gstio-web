import { api } from "@/app/apiUrls";
import { REGISTER_USER, GENERATE_OTP, VERIFY_OTP,COMPLETE_SIGNUP } from "@/app/apiUrls";
import {
  POST_REGISTER_USER,
  POST_VERIFY_USER,
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


