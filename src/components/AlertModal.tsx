"use client";
import Dialog from "@mui/material/Dialog";
import TextInput from "@/src/components/TextInput";
import { TriangleAlert } from "lucide-react";
import { useState } from "react";
import Button from "@mui/material/Button";

type AlertModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  text?: string;
  description: string;
  submitBtnText?: string;
  cancelBtnText?: string;
  setText?: (value: string) => void;
  type: string;
  onSubmitClick: () => void;
  onCancelClick: () => void;
};

export default function AlertModal({
  open,
  setOpen,
  text,
  submitBtnText,
  cancelBtnText,

  description,
  setText,
  type = "",
  onSubmitClick,
  onCancelClick,
}: AlertModalProps) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        classes: {
          root: {
            backDrop: {
              backdropFilter: "blur(3px)",
              backgroundColor: "rgba(0,0,30,0.4)",
            },
          },
        },
      }}
      PaperProps={{
        sx: { width: "40vw", maxWidth: "none", padding: "1rem" }, // Tailwind on the modal paper
      }}
    >
      <div className="flex flex-col gap-y-4 items-center">
        <div className=" w-full flex gap-x-2 justify-center h-[15%] items-center mt-4">
          <TriangleAlert className="w-7 h-7 cursor-pointer text-red-500 animate-pulse" />

          <div className="text-2xl">Alert Modal</div>
        </div>
        <div className="m-2  flex flex-col justify-center items-center box-border">
          <div className=" w-full flex justify-center box-border">
            <div className="text-md text-center">{description}</div>
          </div>
          {type === "reasonBox" && (
            <div className="mt-4 w-full h-[20vh] flex justify-center box-border">
              <TextInput
                value={text}
                noOfLines={4}
                placeholder="Type your text here..."
                type="text"
                setValue={setText}
                width="90%"
                height="140px"
                color="black"
                backgroundColor="white"
                className="box-border"
              />
            </div>
          )}
        </div>

        <div className="flex w-[70%]  justify-between">
          <Button
            variant="contained"
            onClick={onCancelClick}
            sx={{
              backgroundColor: "#F54927",
              fontFamily: "Lexend",
              borderRadius: "10px",
              width: "25%",
            }}
          >
            {cancelBtnText || "Cancel"}
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="mt-4"
            onClick={onSubmitClick}
            sx={{
              backgroundColor: "#1D4ED8",
              fontFamily: "Lexend",
              borderRadius: "10px",
              width: "25%",
            }}
          >
            {submitBtnText || "Submit"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
