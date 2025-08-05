"use client";
import Button from "@mui/material/Button";
import { usePathname } from "next/navigation";
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
      <div className="sm:w-full w-[175vw] h-[10vh]  flex">
        <div className="flex sm:w-[30%]  justify-center sm:justify-start items-center w-[175vw]">
          <div className="text-2xl">Gst.IO</div>
        </div>
        {path !== "/generateOtp" && (
          <div className="sm:flex border-black w-full hidden  sm:visible justify-end">
            <div className="flex   items-center gap-x-[6vw] w-[52%]">
              {navContent.map((item) => {
                return (
                  <div key={item.id} className={`text-lg cursor-pointer`}>
                    {!item?.button && item.title}
                    {item?.button && (
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#54708C",
                          fontFamily: "Lexend",
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
      <div className="border-2 mb-10 w-[175vw] sm:w-full"></div>
    </>
  );
}
