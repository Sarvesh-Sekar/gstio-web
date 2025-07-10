import "@/app/globals.css";
import Header from "@/app/(auth)/Header";
import { Geist_Mono, Lexend } from "next/font/google";
import { Metadata } from "next";


const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${lexend.variable} font-lexend`}>
      <Header />
      {children}
      <div className="flex justify-center  sm:h-[15vh] items-end w-[175vw] sm:w-full">
        <p className="text-white">Copyright © 2025 Gst.IO</p>
      </div>
    </div>
  );
}
