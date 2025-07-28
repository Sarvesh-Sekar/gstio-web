import { sideBarData } from "@/src/staticData";

export default function SideBar() {
  return (
    <div className="flex flex-col h-screen w-[20%] border-r-2 border-white/10">
      <div className="w-full h-[60px] flex  border-b-2  border-white/10  items-center justify-center">
        <div className="text-4xl h-[65px] flex items-center">
            <div>GST.io</div>
            </div>
      </div>

      <div className="w-full flex flex-col gap-y-4 h-full mt-2">
        {sideBarData?.map((item: any, id) => (
          <div
            className="flex flex-row  h-[50px] cursor-pointer  hover:bg-white/10 hover:rounded-[10px] items-center gap-x-4"
            key={id}
          >
            <div className="w-[5%] h-full"></div>

            {item?.icon && <item.icon />}
            <div className="text-lg">{item?.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
