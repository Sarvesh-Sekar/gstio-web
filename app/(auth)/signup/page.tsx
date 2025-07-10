"use client";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { OutlinedInput, FormControl, InputLabel } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [loginModal, setLoginModal] = useState(true);

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <div className="flex flex-col gap-y-[2vh] sm:h-[65vh] h-[150vh] w-[175vw] sm:w-full">
      <div className="flex  h-[10%] items-center justify-center w-full ">
        <div className="text-2xl">
          {loginModal ? "Login into Gst.IO" : "Sign Up into Gst.IO"}
        </div>
      </div>
      <div className="w-full h-[60%]  flex justify-center items-center">
        <div className="flex flex-col  gap-y-[3vh] items-center  sm:w-[50%] w-full h-[50%]">
          <div className=" flex flex-col gap-y-[4vh]  sm:w-[60%] w-[80%]">
            {" "}
            <TextField
              id="outlined-multiline-flexible"
              label="Enter Email Address"
              multiline
              maxRows={4}
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
            <TextField
              id="outlined-password"
              label="Password"
              type={showPassword ? "text" : "password"} // ✅ correct way
              // InputProps={{
              //   style: { color: "white" },
              // }}
              InputLabelProps={{
                style: { color: "#A6ADB5", fontFamily: "Lexend" },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
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
            {!loginModal && (
              <TextField
                id="outlined-password"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"} // ✅ correct way
                // InputProps={{
                //   style: { color: "white" },
                // }}
                InputLabelProps={{
                  style: { color: "#A6ADB5", fontFamily: "Lexend" },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        onClick={() => {
                          setShowConfirmPassword(!showConfirmPassword);
                        }}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
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
          </div>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#54708C",
              fontFamily: "Lexend",
            }}
          >
            {loginModal ? "Login" : "Sign Up"}
          </Button>
          {loginModal && <p>or</p>}
          {loginModal && (
            <Button
              variant="contained"
              sx={(theme) => ({
                backgroundColor: "#54708C",
                fontFamily: "Lexend",
                [theme.breakpoints.down("sm")]: {
                  width: "50%",
                  borderRadius: "20px",
                },
                width: "40%",
                borderRadius: "20px",
              })}
              startIcon={<GoogleIcon />}
            >
              Sign In With Google
            </Button>
          )}
          <div className="flex gap-x-2">
            <p>
              {loginModal
                ? "Don't have an account? "
                : "Already have an account? "}{" "}
            </p>
            <p
              className="text-underline cursor-pointer text-[#54708C]"
              onClick={() => setLoginModal(!loginModal)}
            >
              {loginModal ? "Sign Up" : "Login"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
