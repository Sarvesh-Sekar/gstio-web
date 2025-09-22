"use client";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import userStore from "@/src/stores/userStore";
import { userData, updateUserData } from "@/src/helpers/staticData";
import { postGenerateOtp, postVerifyOtp } from "@/app/(auth)/auth-requests";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import InputAdornment from "@mui/material/InputAdornment";
import { MonitorSmartphone } from "lucide-react";

export default function generateOtp() {
  const [isOpenVerify, setIsOpenVerify] = useState(false);
  const [otp, setOtp] = useState("");

  const [focus, setFocus] = useState(false);
  const router = useRouter();

  const handleGenerateOtp = async () => {
    try {
      
      console.log(userData);
      const payload = {
        userId: userData?.userId,
        email: userData?.email,
      }
      await postGenerateOtp(payload);
      toast.success("OTP Sent Successfully");
      setIsOpenVerify(true);
    } catch (err) {
      toast.error("Something Wrong");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await postVerifyOtp({ userId: userData?.userId, otp: otp });

      toast.success("OTP Verified Successfully");
      const modifiedUserData = {
        userId: userData?.userId,
        details: true,
        verified: true,
      };

      updateUserData(modifiedUserData);
      document.cookie = `AuthToken=${JSON.stringify(response?.data?.token)}`;
      router.push("/dashboard");
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
          id="outlined-flexible"
          label="Enter OTP Here"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MonitorSmartphone className="w-6 h-6 text-black" />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            shrink: focus || Boolean(otp), // float label only when focused/has value
            style: {
              color: focus ? "black" : "black",
              fontFamily: "Lexend",
              marginLeft: focus || otp ? 0 : 32, // 👈 push label right when inside
            },
          }}
          sx={{
            fontFamily: "Lexend",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "white",

              "& fieldset": {
                borderColor: "black",
                borderWidth: 2,
              },
              "&:hover fieldset": {
                borderColor: "gray",
                borderWidth: 2,
              },
              "&.Mui-focused fieldset": {
                borderColor: "black",
              },
            },
            "& .MuiInputBase-input": {
              color: "black",
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
            backgroundColor: "#1D4ED8",
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
            backgroundColor: "#1D4ED8",
            fontFamily: "Lexend",
          }}
        >
          Verify Otp
        </Button>
      )}
    </div>
  );
}
