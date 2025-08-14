"use client";
import TextField from "@mui/material/TextField";
import { useState } from "react";
type TextInputProps = {
  noOfLines: number;
  label: string;
  placeholder: string;
  debounceTime?: number;
  debounceFunc?: () => void;
  textLength?: number;
  width?: string;
  height?: string;
  value: string;
  setValue: (value: string) => void;
};
export default function TextInput({
  noOfLines = 1,
  label = "",
  placeholder = "",
  debounceTime = 0,
  debounceFunc = () => {},
  textLength = 100,
  width = "100",
  height = "100",
  value = "",
  setValue = (value: string) => {},
}: TextInputProps) {
  const [errorLabel, setErrorLabel] = useState("");
  const errorCondition = () => {
    if (value.length === textLength) {
      setErrorLabel(`Max ${textLength} characters allowed`);
      return true;
    } else {
      setErrorLabel("");
      return false;
    }
  };
  return (
    <TextField
      id="outlined-multiline-flexible"
      label={label}
      maxRows={noOfLines}
      value={value}
      placeholder={placeholder}
      onChange={(e) => {
        setValue(e.target.value);
        errorCondition();
      }}
      className={`w-${width} h-${height}`}
      slotProps={{ htmlInput: { maxLength: textLength, color: "white" } }}
      InputLabelProps={{
        style: { fontFamily: "Lexend" },
      }}
      type="text"
      error={!!errorLabel?.length}
      helperText={!errorLabel?.length ? "" : errorLabel}
      sx={{
        fontFamily: "Lexend",

        "& .MuiFormLabel-root": {
          color: "#A6ADB5",
          fontFamily: "Lexend",
        },

        "& .MuiFormLabel-root.Mui-focused": {
          color: "white", // This is the fix!
        },

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
  );
}
