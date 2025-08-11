"use client";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { OutlinedInput, FormControl, InputLabel } from "@mui/material";
import userStore from "@/src/stores/userStore";
import Visibility from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  postRegisterUser,
  postManualLogin,
  postGoogleLogin,
} from "@/app/(auth)/auth-requests";
import {
  POST_REGISTER_USER,
  POST_LOGIN_REQUEST,
  POST_LOGIN_RESPONSE,
} from "@/app/(auth)/auth-requests-types";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const userData = userStore((state) => state.userData);
  const saveUserData = userStore((state) => state.saveUserData);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [loginModal, setLoginModal] = useState(false);

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSignUp = async (payload: POST_REGISTER_USER) => {
    try {
      const response = await postRegisterUser(payload);
      saveUserData(payload.email, payload.password);

      toast.success("User Created Successfully");
      router.push("/generateOtp");
    } catch (error) {
      toast.error("Something Wrong");
    }
  };

  const handleManualLogin = async (payload: POST_LOGIN_REQUEST) => {
    try {
      const response: string = await postManualLogin(payload);
      document.cookie = `AuthToken=${response}`;
      toast.success("User Logged In Successfully");
      router.push("/dashboard");
    } catch (err) {
      toast.error("Something Wrong");
    }
  };

  const [codeClient, setCodeClient] = useState(null);

  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.onload = initializeGoogle;
      document.body.appendChild(script);
    };

    const initializeGoogle = () => {
      if (window.google) {
        const client = window.google.accounts.oauth2.initCodeClient({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          scope: "openid profile email",
          redirect_uri: "postmessage",
          
          callback: async (response: any) => {
            try {
              console.log(response?.code)
              const res = await postGoogleLogin(
                response.code,
              );
              document.cookie = `AuthToken=${res.token}`;
              toast.success("User Logged In Successfully");
              router.push("/home");
            } catch (err) {
              console.error("Backend auth failed", err);
            }
          },
        });

        setCodeClient(client);
      }
    };

    loadGoogleScript();
  }, []);

  const handleGoogleLogin = () => {
    if (codeClient) {
      console.log('hh')
      codeClient.requestCode(); // ✅ now this should work
      console.log(codeClient)
    } else {
      toast.error("Something Wrong");
    }
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                id={
                  confirmPassword !== password
                    ? "outlined-error-helper-text"
                    : "outlined-password"
                }
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={
                  confirmPassword !== password && confirmPassword?.length > 0
                }
                helperText={
                  confirmPassword !== password && confirmPassword?.length
                    ? "Passwords do not match"
                    : ""
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        onClick={() => {
                          setShowConfirmPassword(!showConfirmPassword);
                        }}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  style: { fontFamily: "Lexend" },
                }}
                sx={{
                  fontFamily: "Lexend",

                  // Input background and border
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
                    "&.Mui-error fieldset": {
                      borderColor: "red",
                    },
                  },

                  // Input text
                  "& .MuiInputBase-input": {
                    color: "white",
                    fontFamily: "Lexend",
                  },

                  // Label styling
                  "& .MuiFormLabel-root": {
                    color: "#A6ADB5",
                    fontFamily: "Lexend",
                  },
                  "& .MuiFormLabel-root.Mui-error": {
                    color: "red",
                  },

                  // Helper text styling
                  "& .MuiFormHelperText-root": {
                    fontFamily: "Lexend",
                    color: "#A6ADB5",
                  },
                  "& .MuiFormHelperText-root.Mui-error": {
                    color: "red",
                  },
                }}
              />
            )}
          </div>
          <Button
            variant="contained"
            onClick={() =>
              loginModal
                ? handleManualLogin({ email, password })
                : handleSignUp({ email, password })
            }
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
              onClick={() => {
                handleGoogleLogin();
              }}
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
