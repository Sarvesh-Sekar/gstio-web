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
import { getUserData } from "@/app/(auth)/auth-requests";
import { getCookie } from "@/src/helpers/cookieHelper";
import { Skeleton } from "@mui/material";
import { toast } from "react-toastify";

export default function ActiveHeader() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [cardData, setCardData] = useState({
    userName: "",
    companyName: "",
    gstId: "",
    role: "",
    verified: false,
  });

  const data = localStorage.getItem("userData");
  const userData = JSON.parse(data);

  const fetchUserData = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const payload = {
          email: userData?.email,
        };

        const response = await getUserData(payload);
        setCardData({
          userName: response?.user?.userName,
          companyName: response?.user?.companyName,
          gstId: response?.user?.gstId,
          role: response?.user?.role,
          verified: response?.user?.verified,
        });
      } catch (err) {
        // toast.error("Something Wrong");
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    fetchUserData();
  };
  const handleClose = () => setAnchorEl(null);

  const router = useRouter();
  const handleLogout = () => {
    document.cookie = "AuthToken=null";
    router.push("/signIn");
  };

  const open = Boolean(anchorEl);
  return (
    <div className="flex flex-row justify-end items-center border-b-2   border-black  h-[65px] ">
      <div>
        {/* Profile Icon */}
        <Avatar onClick={handleClick} className="cursor-pointer mr-2">
          {isLoading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          ) : (
            cardData?.userName?.slice(0, 1)
          )}
        </Avatar>

        {/* Popover that opens when clicking profile */}
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Card sx={{ minWidth: 300 }}>
            <CardContent className="rounded-[20px] flex flex-col">
              <div className="flex justify-end">
                <CircleX
                  onClick={handleClose}
                  className="cursor-pointer w-5 h-5"
                />
              </div>

              <div className="w-full  border-black flex justify-between">
                <div className="w-full  flex  justify-center">
                  {" "}
                  {isLoading ? (
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={40}
                      height={40}
                      sx={{ mb: 1 }}
                    />
                  ) : (
                    <Avatar sx={{ width: 56, height: 56, mb: 1 }}>
                      {cardData?.userName?.slice(0, 1)}
                    </Avatar>
                  )}
                </div>

                {/* <CircleX
                  onClick={handleClose}
                  className="cursor-pointer w-4 h-4"
                /> */}
              </div>

              {/* 
              <Typography variant="h6">Hi, Sarvesh!</Typography>
              <Button fullWidth sx={{ mt: 1 }} variant="outlined">
                Manage your Google Account
              </Button>

              <List>
                <ListItem>Company Admin</ListItem>
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
              </Button> */}

              <div className="flex flex-col justify-center items-center border-2 border-black gap-y-2 p-2">
                {isLoading ? (
                  <Skeleton
                    variant="rectangular"
                    width={200}
                    height={15}
                    sx={{ borderRadius: "8px" }}
                  />
                ) : (
                  <div className="max-w-full">Hi, {cardData?.userName}</div>
                )}
                <div>Welcome to your Profile !!!</div>

                {isLoading ? (
                  <Skeleton
                    variant="rectangular"
                    width={200}
                    height={15}
                    sx={{ borderRadius: "8px" }}
                  />
                ) : (
                  <div>Your GSTIN is {cardData?.gstId}</div>
                )}
                {isLoading ? (
                  <Skeleton
                    variant="rectangular"
                    width={200}
                    height={15}
                    sx={{ borderRadius: "8px" }}
                  />
                ) : (
                  <div>Your Role is {cardData?.role}</div>
                )}

                <Button
                  sx={{
                    backgroundColor: "#1D4ED8",
                    fontFamily: "Lexend",
                    borderRadius: "8px",
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
              </div>
            </CardContent>
          </Card>
        </Popover>
      </div>
    </div>
  );
}
