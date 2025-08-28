"use client";
import React, { useState } from "react";
import {
  Avatar,
  Typography,
  Button,
  Popover,
  Card,
  CardContent,
  List,
  ListItem,
} from "@mui/material";
import { useRouter } from "next/navigation";
import "@/app/globals.css";
import { CircleX } from "lucide-react";

export default function ActiveHeader() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const router = useRouter();
  const handleLogout = () => {
    document.cookie = "AuthToken=null";
    router.push("/signIn");
  };

  const open = Boolean(anchorEl);
  return (
    <div className="flex flex-row justify-end items-center border-b-2 mr-2  border-white/10  h-[65px] ">
      <div>
        {/* Profile Icon */}
        <Avatar onClick={handleClick} className="cursor-pointer">
          S
        </Avatar>

        {/* Popover that opens when clicking profile */}
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Card sx={{ minWidth: 300 }}>
            <CardContent className="border-2 border-black">
              <div className="w-full  border-black flex justify-between">
                <Avatar sx={{ width: 56, height: 56, mb: 1 }}>S</Avatar>
                <CircleX
                  onClick={handleClose}
                  className="cursor-pointer w-7 h-7"
                />
              </div>

              <Typography variant="h6">Hi, Sarvesh!</Typography>
              <Button fullWidth sx={{ mt: 1 }} variant="outlined">
                Manage your Google Account
              </Button>

              <List>
                <ListItem>Search history</ListItem>
                <ListItem> Delete last 15 minutes</ListItem>
              </List>

              <Button
                sx={{
                  backgroundColor: "#1D4ED8",
                  fontFamily: "Lexend",
                  borderRadius: "10px",
                  color: "white",
                }}
                onClick={() => {
                  handleLogout();
                  handleClose();
                }}
              >
                {" "}
                Logout
              </Button>
            </CardContent>
          </Card>
        </Popover>
      </div>
    </div>
  );
}
