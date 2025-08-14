"use client";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import userStore from "@/src/stores/userStore";
import { postGenerateOtp, postVerifyOtp } from "@/app/(auth)/auth-requests";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import {useRouter} from "next/navigation";

export default function generateOtp() {
  const [isOpenVerify, setIsOpenVerify] = useState(false);
  const [otp, setOtp] = useState("");

  const router = useRouter();
  const userData = userStore((state) => state.userData);

  const handleGenerateOtp = async () => {
    try {
      await postGenerateOtp({email:userData?.email});
      toast.success("OTP Sent Successfully");
      setIsOpenVerify(true);
    } catch (err) {
      toast.error("Something Wrong");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await postVerifyOtp({ email: userData?.email, otp: otp });
      router.push('/register');
      toast.success("OTP Verified Successfully");
    } catch (err) {
      toast.error("Something Wrong");
    }
  };

  return (
    <div className="flex flex-col gap-y-4 items-center">
      <div className="text-3xl">Verify Your Email</div>
      <div className="text-2xl">
        {isOpenVerify
          ? `We have sent an OTP to your email Address ${userData?.email}`
          : `Click to Send OTP to the Mail Address ${userData?.email}`}
      </div>

      {isOpenVerify && (
        <TextField
          id="outlined-multiline-flexible"
          label="Enter Otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          InputProps={{
            style: { color: "white" },
          }}
          InputLabelProps={{
            style: { color: "#A6ADB5", fontFamily: "Lexend" },
          }}
          sx={{
            fontFamily: "Lexend",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#30363B",

              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "gray",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            "& .MuiInputBase-input": {
              color: "white",
              fontFamily: "Lexend",
            },
          }}
        />
      )}
      {!isOpenVerify ? (
        <Button
          variant="contained"
          onClick={() => {
            handleGenerateOtp();
          }}
          sx={{
            backgroundColor: "#54708C",
            fontFamily: "Lexend",
          }}
        >
          Generate Otp
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={() => {
            handleVerifyOtp();
          }}
          sx={{
            backgroundColor: "#54708C",
            fontFamily: "Lexend",
          }}
        >
          Verify Otp
        </Button>
      )}
    </div>
  );
}
