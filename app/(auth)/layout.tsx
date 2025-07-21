"use client";
import "@/app/globals.css";
import Header from "@/app/(auth)/Header";
import { Geist_Mono, Lexend } from "next/font/google";
import { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  return (
    <div className={`${lexend.variable} font-lexend`}>
      <Header />
      {children}
      <div className="flex justify-center  sm:h-[15vh] items-end w-[175vw] sm:w-full">
        {path !== "/generateOtp" && (
          <p className="text-white">Copyright © 2025 Gst.IO</p>
        )}
        <ToastContainer />
      </div>
    </div>
  );
}
