import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/Receipt"; // list invoice
import PostAddIcon from "@mui/icons-material/PostAdd"; //create invoice
import LocalOfferIcon from "@mui/icons-material/LocalOffer"; //sales
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"; // purchase
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import { getCookie } from "@/src/helpers/cookieHelper";

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
    link: "addInvoice",
    icon: PostAddIcon,
  },
  {
    id: 4,
    name: "Sales",
    link: "/sales",
    icon: LocalOfferIcon,
  },
  {
     id:5,
     name:"Products",
     link:"/products",
     icon:ShoppingBag
  },
  {
    id: 6,
    name: "Purchase",
    link: "/purchase",
    icon: AddShoppingCartIcon,
  },

  ,
];

export const isAuthenticated = getCookie("AuthToken") ? true : false;

// export const userData = (() => {
//   const data = localStorage.getItem("userData");
//   try {
//     return data ? JSON.parse(data) : null;
//   } catch (err) {
//     console.error("Invalid userData cookie", err);
//     return null;
//   }
// })();

export const updateUserData = (data: any) => {
  localStorage.setItem("userData", JSON.stringify(data));
  document.cookie = `userData=${JSON.stringify(data)}`;
};
