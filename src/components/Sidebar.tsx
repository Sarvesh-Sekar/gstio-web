'use client';
import { sideBarData } from "@/src/helpers/staticData";
import { useRouter } from "next/navigation";
import "@/app/globals.css";
export default function SideBar() {
  const router = useRouter();
  return (
    <div className="w-[20%] flex flex-col items-center justify-start h-full border-r-2 border-black ">
      <div className="flex justify-center items-center border-b-2 border-black w-full h-[65px] text-3xl">
        GST.IO
      </div>
      <div className="w-full mt-4">
        <div className="w-full flex flex-col gap-y-8 h-full mt-2">
          {sideBarData?.map((item: any, id) => (
            <div
              className="flex flex-row  h-[50px] cursor-pointer  hover:bg-white/10 hover:rounded-[10px] items-center gap-x-4"
              key={id}
              onClick={() => router.push(item?.link)}
            >
              <div className="w-[5%] h-full"></div>

              {item?.icon && <item.icon />}
              <div className="text-lg">{item?.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
