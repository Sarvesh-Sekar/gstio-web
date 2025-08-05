import Avatar from "@mui/material/Avatar";
import "@/app/globals.css";

export default function ActiveHeader() {
  return (
    <div className="flex flex-row justify-end items-center border-b-2 border-white/10  h-[65px] ">
      <Avatar src="/broken-image.jpg" className=" cursor-pointer " />
    </div>
  );
}
