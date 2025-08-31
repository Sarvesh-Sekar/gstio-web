"use client";
import { useState, useMemo, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-toastify";
import { postCompleteSignup } from "@/app/(auth)/auth-requests";
import userStore from "@/src/stores/userStore";
import { useRouter } from "next/navigation";
import { Card } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { Users, Building2, University, IdCard } from "lucide-react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import { debounce } from "lodash";
import Typography from "@mui/material/Typography";
import { getGstVerified } from "@/app/(auth)/auth-requests";
import { CircularProgress } from "@mui/material";
import { userData, updateUserData } from "@/src/helpers/staticData";

export default function register() {
  const [userName, setUserName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [gstId, setGstId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setIsTermsAccepted] = useState(false);
  const [role, setRole] = useState("");
  const [checkCompanyName, setCheckCompanyName] = useState("");
  const [helperMessage, setHelperMessage] = useState({
    gstId: "",
    companyName: "",
  });

  const router = useRouter();

  const [focus, setFocus] = useState({
    userName: false,
    companyName: false,
    gstId: false,
    role: false,
    verfied: false,
  });

  const completeRegistration = async () => {
    const payload = {
      userId: userData?.userId,
      userName: userName,
      gstId: gstId,
      companyName: companyName,
      role: role,
    };
    try {
      setIsLoading(true);
      const response = await postCompleteSignup(payload);
      toast.success("User Registration Completed Successfully");

      const modifiedUserData = {
        userId: userData?.userId,
        details: true,
        verified: false,
      };
      updateUserData(modifiedUserData);

      router.push("/generateOtp");
    } catch (err) {
      toast.error("User Registration Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const checkGstId = async (value: string) => {
    try {
      const response = await getGstVerified(value);
      console.log(response);

     

      if (response?.data?.error) {
        if (response?.data?.message.includes(403))
          setHelperMessage((prev) => ({
            ...prev,
            gstId: "Invalid GST ID",
          }));
        else
          setHelperMessage((prev) => ({
            ...prev,
            gstId: response?.data?.message,
          }));

        setError((prev) => ({ ...prev, gstId: true }));
      }

      if (response?.data?.taxpayerInfo) {
        setCompanyName(response?.data?.taxpayerInfo?.lgnm);
        setCheckCompanyName(response?.data?.taxpayerInfo?.lgnm);
        setError((prev) => ({ ...prev, gstId: false }));
        setHelperMessage((prev) => ({
          ...prev,
          gstId: "Valid GST ID",
        }));
      }
    } catch (err) {
      setError((prev) => ({ ...prev, gstId: true }));
      setHelperMessage((prev) => ({
        ...prev,
        gstId: err?.data?.message,
      }));
    }
  };

  const [error, setError] = useState({
    gstId: false,
    companyName: false,
  });

  const debouncedApiCall = useMemo(
    () =>
      debounce((newValue) => {
        if (!newValue) setError((prev) => ({ ...prev, gstId: false }));
        else if (newValue.length < 15) {
          setError((prev) => ({ ...prev, gstId: true }));
          setHelperMessage((prev) => ({
            ...prev,
            gstId: "GST ID should be 15 digits",
          }));
        } else {
          checkGstId(newValue);
        }
      }, 500),

    []
  );

  const handleGstId = (e) => {
    const newValue = e.target.value;

    if (!newValue)
      setHelperMessage((prev) => ({
        ...prev,
        gstId: "",
      }));
    setGstId(newValue);
    debouncedApiCall(newValue);
  };

  const handleCompanyChange = (e) => {
    const newValue = e.target.value;
    setCompanyName(newValue);
    if (!newValue && !companyName) {
      setHelperMessage((prev) => ({
        ...prev,
        companyName: "First Fill GST ID",
      }));
      setError((prev) => ({
        ...prev,
        companyName: true,
      }));
    }
    if (!newValue) {
      setHelperMessage((prev) => ({
        ...prev,
        companyName: "",
      }));
      setError((prev) => ({
        ...prev,
        companyName: false,
      }));
    }

    debounceCompanyCheck(newValue, checkCompanyName);
  };

  const debounceCompanyCheck = useMemo(
    () =>
      debounce((newValue) => {
        if (!newValue) setError((prev) => ({ ...prev, companyName: false }));
        else {
          console.log(checkCompanyName);
          checkCompany(newValue);
        }
      }, 1500),
    [companyName]
  );

  const checkCompany = (value: string) => {
    console.log(value + " " + checkCompanyName);
    if (checkCompanyName !== value) {
      console.log("came");
      setHelperMessage((prev) => ({
        ...prev,
        companyName: "Company Name not matches with GST ID    Company",
      }));

      setError((prev) => ({
        ...prev,
        companyName: true,
      }));
    } else {
      console.log("dd");
      setHelperMessage((prev) => ({
        ...prev,
        companyName: "",
      }));

      setError((prev) => ({
        ...prev,
        companyName: false,
      }));
    }
  };

  //   if (!companyName) return;

  //   checkCompany(companyName);
  //   // if (companyName !== checkCompanyName) {
  //   //   setHelperMessage((prev) => ({
  //   //     ...prev,
  //   //     companyName: "Company Name not matches with GST ID Company",
  //   //   }));
  //   //   setError((prev) => ({ ...prev, companyName: true }));
  //   // } else {
  //   //   setHelperMessage((prev) => ({ ...prev, companyName: "" }));
  //   //   setError((prev) => ({ ...prev, companyName: false }));
  //   // }
  // }, [companyName]);

  const hasError =
    Object.values(error).some((value) => value === true) ||
    !termsAccepted ||
    !companyName ||
    !gstId ||
    !userName ||
    !role;
  return (
    <div className="flex flex-col gap-y-[5vh] items-center justify-center">
      {/* <div className="text-3xl">Complete Your Sign Up here !!!</div> */}
      {/* <TextField
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
      </Button> */}

      <Card
        sx={{ maxWidth: "50%" }}
        className="border-2 border-gray w-[50%] h-[95vh] z-10 shadow-3xl flex justify-center gap-y-2"
      >
        <div className="flex flex-col items-center gap-y-2">
          <div className="h-[60px] w-[60px] mt-2 bg-[#1D4ED8] flex justify-center items-center rounded-[60px]">
            <Building2 className="w-6 h-6 text-white" />
          </div>

          <div className="text-2xl">Profile Details</div>
          <div className="text-sm">Complete your profile to get started !!</div>

          <div className="flex flex-col m-2 h-full gap-y-[3vh]">
            <TextField
              id="outlined-flexible"
              label="Enter Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onFocus={() => {
                setFocus({
                  userName: true,
                  companyName: false,
                  gstId: false,
                  role: false,
                  verfied: false,
                });
              }}
              onBlur={() => {
                setFocus({
                  userName: false,
                  companyName: false,
                  gstId: false,
                  role: false,
                  verfied: false,
                });
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Users className="w-6 h-6 text-black" />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                shrink: focus?.userName || Boolean(userName), // float label only when focused/has value
                style: {
                  color: focus?.userName ? "black" : "black",
                  fontFamily: "Lexend",
                  marginLeft: focus?.userName || userName ? 0 : 32, // 👈 push label right when inside
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
              id="outlined-multiline-flexible"
              label="Enter GST ID "
              value={gstId}
              onChange={handleGstId}
              error={error?.gstId}
              helperText={helperMessage?.gstId}
              onFocus={() => {
                setFocus({
                  userName: false,
                  companyName: false,
                  gstId: true,
                  role: false,
                  verfied: false,
                });
              }}
              onBlur={() => {
                setFocus({
                  userName: false,
                  companyName: false,
                  gstId: false,
                  role: false,
                  verfied: false,
                });
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IdCard className="w-6 h-6 text-black" />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                shrink: focus?.gstId || Boolean(gstId), // float label only when focused/has value
                style: {
                  color: focus?.gstId ? "black" : "black",
                  fontFamily: "Lexend",
                  marginLeft: focus?.gstId || gstId ? 0 : 32, // 👈 push label right when inside
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

                "& .MuiFormHelperText-root.Mui-error": {
                  color: "red",
                },
                "& .MuiFormHelperText-root": {
                  fontFamily: "Lexend",
                  color: "green",
                },
              }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Enter Company Name"
              value={companyName}
              error={error?.companyName}
              helperText={helperMessage?.companyName} // 👈 bind here
              onChange={handleCompanyChange}
              onFocus={() => {
                setFocus({
                  userName: false,
                  companyName: true,
                  gstId: false,
                  role: false,
                  verfied: false,
                });
              }}
              onBlur={() => {
                setFocus({
                  userName: false,
                  companyName: false,
                  gstId: false,
                  role: false,
                  verfied: false,
                });
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <University className="w-6 h-6 text-black" />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                shrink: focus?.companyName || Boolean(companyName),
                style: {
                  color: focus?.companyName ? "black" : "black",
                  fontFamily: "Lexend",
                  marginLeft: focus?.companyName || companyName ? 0 : 32,
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
                "& .MuiFormHelperText-root.Mui-error": {
                  color: "red",
                },
                "& .MuiFormHelperText-root": {
                  fontFamily: "Lexend",
                  color: "green",
                },
              }}
            />

            <FormControl>
              <div>Role</div>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                onChange={(e) => setRole(e.target.value)}
              >
                <FormControlLabel
                  value="Company Admin"
                  control={<Radio />}
                  label={
                    <Typography sx={{ fontFamily: "Lexend" }}>
                      Company Admin
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="Auditor"
                  control={<Radio />}
                  label={
                    <Typography sx={{ fontFamily: "Lexend" }}>
                      Auditor
                    </Typography>
                  }
                />
              </RadioGroup>
            </FormControl>

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
                <Typography sx={{ color: "black", fontFamily: "Lexend" }}>
                  I have accepted all terms and Conditions
                </Typography>
              }
            />
            <Button
              variant="contained"
              onClick={() => completeRegistration()}
              disabled={hasError}
              sx={{
                backgroundColor: termsAccepted ? "#1D4ED8" : "white",
                fontFamily: "Lexend",
                borderRadius: "10px",
              }}
            >
              {isLoading ? (
                <>
                  <CircularProgress size={20} sx={{ color: "white" }} />
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
