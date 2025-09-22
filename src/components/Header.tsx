"use client";
import Button from "@mui/material/Button";
import { usePathname } from "next/navigation";
import { Building2 } from "lucide-react";
export default function Header() {
  const path = usePathname();
  const navContent = [
    {
      id: 1,
      button: false,
      title: "Features",
    },
    {
      id: 2,
      button: false,
      title: "Pricing",
    },
    {
      id: 3,
      button: false,
      title: "Support",
    },
    {
      id: 4,
      button: true,
      title: "Login",
    },
  ];

  return (
    <>
      <div className="sm:w-full w-[175vw] h-[10vh]   flex">
        <div className="flex sm:w-[30%]  justify-center relative  z-10 sm:justify-start items-center w-[175vw] gap-x-2">
          <div className = "flex justify-center items-center gap-x-2 ml-5">
            {" "}
            <div className=" h-[40px] w-[40px] bg-[#1D4ED8] flex justify-center items-center rounded-[10px] ">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl">Gst.IO</div>
          </div>
        </div>
        {path !== "/generateOtp" && (
          <div className="sm:flex border-black w-full  hidden  sm:visible justify-end">
            <div className="flex    items-center gap-x-[5.5vw] w-[52%]">
              {navContent.map((item) => {
                return (
                  <div key={item.id} className={`text-lg cursor-pointer `}>
                    {!item?.button && item.title}
                    {item?.button && (
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "primary",
                          fontFamily: "Lexend",
                          borderRadius: "10px",
                        }}
                      >
                        Login
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className="border-2 border-black mb-10 w-[175vw] sm:w-full"></div>
    </>
  );
}
