import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/Receipt"; // list invoice
import PostAddIcon from "@mui/icons-material/PostAdd"; //create invoice
import LocalOfferIcon from "@mui/icons-material/LocalOffer"; //sales
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"; // purchase

export const sideBarData = [
  {
    id: 1,
    name: "Dashboard",
    link: "/dashboard",
    icon: DashboardIcon,
  },
  {
    id: 2,
    name: "Invoices List",
    link: "/invoice",
    icon: ReceiptIcon,
  },
  {
    id: 3,
    name: "Create Invoice",
    link: "/invoice/create",
    icon: PostAddIcon,
  },
  {
    id: 4,
    name: "Sales",
    link: "/sales",
    icon: LocalOfferIcon,
  },
  
    {
      id: 5,
      name: "Purchase",
      link: "/purchase",
      icon: AddShoppingCartIcon,
    },
  ,
];
