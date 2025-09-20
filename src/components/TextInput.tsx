"use client";
import { TextField, InputAdornment } from "@mui/material";
import { useMemo, useState } from "react";
import { debounce } from "lodash";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type TextInputProps = {
  noOfLines: number;
  label?: string;
  placeholder?: string;
  debounceTime?: number;
  debounceFunc?: () => void;
  textLength?: number;
  width?: string;
  height?: string;
  type: string;
  backgroundColor?: string;
  color?: string;
  error?: boolean;
  handleOnChange?: (e: any) => void;
  debounceState?: string;
  setErrorLabel?: (value: string) => void;
  helperMessage?: string;
  helperMessageColor?: string; // 👈 new prop
  value: any;
  setValue?: (value: any) => void;
  icon?: React.ReactNode;
};

export default function TextInput({
  noOfLines = 1,
  label = "",
  placeholder = "",
  backgroundColor = "#30363B",
  color = "white",
  type = "text",
  debounceTime = 0,
  debounceFunc = () => {},
  debounceState = "",
  error = false,
  helperMessage = "",
  helperMessageColor = "#A6ADB5", // 👈 default if not provided
  textLength = 100,
  width = "",
  height = "",
  value = "",
  handleOnChange,
  icon,
  setValue = (value: string) => {},
}: TextInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   
    if (handleOnChange!==undefined) handleOnChange(e);
    else setValue(e.target.value);
  };

  const [focus, setFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  return (
    <TextField
      id="outlined-multiline-flexible"
      label={label}
      maxRows={noOfLines}
      value={value}
      placeholder={placeholder}
      error={error}
      helperText={helperMessage}
      onChange={handleChange}
      className={`w-[${width}] h-[${height}]`}
      slotProps={{ htmlInput: { maxLength: textLength } }}
      InputLabelProps={{
        style: { fontFamily: "Lexend" },
      }}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      type={type==="password" && showPassword ? "text" : type}
      InputProps={{
        startAdornment: icon && (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
        endAdornment: type === "password" && (
          <InputAdornment position="end">
            <IconButton
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={handleClickShowPassword}
      
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      InputLabelProps={{
        shrink: focus || Boolean(value), // float label only when focused/has value
        style: {
          color: focus ? "black" : "black",
          fontFamily: "Lexend",
          marginLeft: focus || value ? 0 : 32, // 👈 push label right when inside
        },
      }}
      sx={{
        fontFamily: "Lexend",

        "& .MuiFormLabel-root": {
          color: "#A6ADB5",
          fontFamily: "Lexend",
        },

        "& fieldset": {
          borderColor: color,
          borderWidth: 2,
        },

        "& .MuiFormLabel-root.Mui-focused": {
          color: color, // label focus color = input text color
        },

        "& .MuiOutlinedInput-root": {
          backgroundColor: backgroundColor, // 👈 dynamic background
          "& fieldset": {
            borderColor: color,
          },
          "&:hover fieldset": {
            borderColor: color,
          },
          "&.Mui-focused fieldset": {
            borderColor: color,
          },
          "&.Mui-error fieldset": {
            borderColor: "red",
          },
        },

        "& .MuiInputBase-input": {
          color: color, // 👈 dynamic text color
          fontFamily: "Lexend",
        },

        "& .MuiFormLabel-root.Mui-error": {
          color: "red", // label color
        },
        "& .MuiInputBase-input.Mui-error": {
          color: "red", // typed text color
        },

        "& .MuiFormHelperText-root": {
          fontFamily: "Lexend",
          color: helperMessageColor,
        },
      }}
      
    />
  );
}
