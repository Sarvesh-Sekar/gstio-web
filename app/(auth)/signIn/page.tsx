"use client";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { OutlinedInput, FormControl, InputLabel } from "@mui/material";
import { Building2, Lock } from "lucide-react";
import userStore from "@/src/stores/userStore";
import Visibility from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import AccountCircle from "@mui/icons-material/AccountCircle";
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

export default function SignIn() {
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
      const response = await postManualLogin(payload);
      // console.log(JSON.stringify(response) + " RES");
      document.cookie = `AuthToken=${response?.data?.token}`;
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
              console.log(response?.code);
              const res = await postGoogleLogin(response.code);
              document.cookie = `AuthToken=${res.token}`;
              toast.success("User Logged In Successfully");
              router.push("/dashboard");
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
      console.log("hh");
      codeClient.requestCode(); // ✅ now this should work
      console.log(codeClient);
    } else {
      toast.error("Something Wrong");
    }
  };

  const [focused, setFocused] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  return (
    <div className="flex flex-col gap-y-[2vh] sm:h-[85vh] h-[150vh] justify-center items-center w-[175vw] sm:w-full">
      <div className="border-2 w-[35%] h-full z-10 relative border-black">
        <div className="flex flex-col  h-[25%] items-center justify-center w-full ">
          <div className="h-[60px] w-[60px] bg-[#1D4ED8] flex justify-center items-center rounded-[60px]">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div className="text-xl">Welcome to Gst.IO</div>
          <div className="text-sm text-[#959595]">
            Create your account to start managing your GST Invoices
          </div>
        </div>
        <div className="w-full h-[60%]  flex justify-center items-center ">
          <div className="flex flex-col  gap-y-[3vh] items-center  sm:w-full  w-full h-full">
            <div className=" flex flex-col gap-y-[4vh] sm:w-[80%] w-[80%] ">
              {" "}
              <TextField
                id="outlined-multiline-flexible"
                label="Enter Email Address"
                multiline
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() =>
                  setFocused({
                    email: true,
                    password: false,
                    confirmPassword: false,
                  })
                }
                onBlur={() =>
                  setFocused({
                    email: false,
                    password: false,
                    confirmPassword: false,
                  })
                }
                maxRows={4}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Building2 className="w-6 h-6 text-black" />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: focused?.email || Boolean(email), // float label only when focused/has value
                  style: {
                    color: focused ? "black" : "black",
                    fontFamily: "Lexend",
                    marginLeft: focused?.email || email ? 0 : 32, // 👈 push label right when inside
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
              <TextField
                id="outlined-password"
                label="Password"
                type={showPassword ? "text" : "password"} // ✅ correct way
                // InputProps={{
                //   style: { color: "white" },
                // }}
                onFocus={() =>
                  setFocused({
                    email: false,
                    password: true,
                    confirmPassword: false,
                  })
                }
                onBlur={() =>
                  setFocused({
                    email: false,
                    password: false,
                    confirmPassword: false,
                  })
                }
                InputLabelProps={{
                  shrink: focused?.password || Boolean(password), // float label only when focused/has value
                  style: {
                    color: focused ? "black" : "black",
                    fontFamily: "Lexend",
                    marginLeft: focused?.password || password ? 0 : 32, // 👈 push label right when inside
                  },
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock className="w-6 h-6 text-black" />
                    </InputAdornment>
                  ),

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
            </div>
            <Button
              variant="contained"
              onClick={() => handleManualLogin({ email, password })}
              sx={{
                backgroundColor: "#1D4ED8",
                fontFamily: "Lexend",
                borderRadius: "10px",
              }}
            >
              Login
            </Button>
            <p>or</p>
            
              <Button
                variant="contained"
                onClick={() => {
                  handleGoogleLogin();
                }}
                sx={(theme) => ({
                  backgroundColor: "#1D4ED8",
                  fontFamily: "Lexend",
                  [theme.breakpoints.down("sm")]: {
                    width: "50%",
                    borderRadius: "20px",
                  },
                  width: "60%",
                  borderRadius: "10px",
                })}
                startIcon={<GoogleIcon />}
              >
                Sign In With Google
              </Button>
            
            <div className="flex gap-x-2">
              <p>
                
                  Don't have an account?
                  
              </p>
              <p
                className="text-underline cursor-pointer text-[#1D4ED8]"
                onClick={() =>{router.push('/signup')}}
              >
                Sign Up
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
