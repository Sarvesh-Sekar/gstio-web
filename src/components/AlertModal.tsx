"use client";
import Dialog from "@mui/material/Dialog";
import TextInput from "@/src/components/TextInput";
import { useState } from "react";

export default function AlertModal({ open }: any) {
  const [text, setText] = useState("");
  return (
    <Dialog
      open={open}
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
        sx: { width: "40vw", maxWidth: "none", height: "50vh" }, // Tailwind on the modal paper
      }}
    >
      <div className="flex flex-col gap-y-4">
        <div className="border-2 w-full flex justify-center h-[15%] items-center mt-4">
          <div className="text-3xl">Title</div>
        </div>
        <div className="m-2 border-2 border-primary flex flex-col justify-center items-center">
          <div className="border-2 w-full flex justify-center">
            <div className="text-md text-center">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor.
            </div>
          </div>
          <TextInput
            value={text}
            noOfLines={4}
            placeholder="Placeholder"
            type = "text"
            setValue={setText}
            width="20vw"
            height="h-full"
          />
        </div>
      </div>
    </Dialog>
  );
}
