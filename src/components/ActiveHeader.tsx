import Avatar from "@mui/material/Avatar";

export default function ActiveHeader() {
  return (
    <div className="flex flex-col h-screen w-[80%]">
      <div className="flex flex-row border-b-2 justify-end items-center  border-white/10 w-full h-[60px]">
        <Avatar src="/broken-image.jpg" className="mr-2 cursor-pointer" />
      </div>
    </div>
  );
}
