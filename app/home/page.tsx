import DashboardIcon from "@mui/icons-material/Dashboard";
import { sideBarData } from "@/src/staticData";
import SideBar from "@/src/components/Sidebar";
import ActiveHeader from "@/src/components/ActiveHeader";
import Avatar from "@mui/material/Avatar";

export default function Home() {
  return (
    <div className="flex h-screen">
      <SideBar />
      <ActiveHeader />
    </div>
  );
}
