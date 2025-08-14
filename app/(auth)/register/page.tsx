"use client";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-toastify";
import Typography from "@mui/material/Typography";
import { postCompleteSignup } from "@/app/(auth)/auth-requests";
import userStore from "@/src/stores/userStore";
import {useRouter} from "next/navigation";
export default function Register() {
  const [username, setUserName] = useState("");
  const [termsAccepted, setIsTermsAccepted] = useState(false);

  const router = useRouter();

  const userData = userStore((state) => state.userData);


  const handleCompleteSignUp = async () => {
    try {
        console.log(userData);
      const response = await postCompleteSignup({
        email: userData?.email,
        username: username,
      });
      toast.success("User Created Successfully");
      router.push('/home');
    } catch (err) {
      toast.error("Something Wrong");
    }
  };

  return (
    <div className="flex flex-col gap-y-[5vh] items-center justify-center">
      <div className="text-3xl">Complete Your Sign Up here !!!</div>
      <TextField
        id="outlined-multiline-flexible"
        label="Enter your Username"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
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

      <FormControlLabel
        control={
          <Checkbox
            checked={termsAccepted}
            onChange={(e) => setIsTermsAccepted(e.target.checked)}
            sx={{
              color: "#A6ADB5", // Color of the checkbox when unchecked
              "&.Mui-checked": {
                color: "#54708C", // Color of the checkbox when checked
              },
            }}
          />
        }
        label={
          <Typography sx={{ color: "white", fontFamily: "Lexend" }}>
            I have accepted all terms and Conditions
          </Typography>
        }
      />
      <Button
        variant="contained"
        onClick={() => {
          handleCompleteSignUp();
        }}
        disabled={!termsAccepted}
        sx={{
          backgroundColor: "#54708C",
          fontFamily: "Lexend",
        }}
      >
        Complete Registration
      </Button>
    </div>
  );
}
