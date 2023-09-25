import WhiteUserIcon from "../../assets/users.svg";
import UserIcon from "../../assets/usersDark.svg";
import ComplainIcon from "../../assets/complain.svg";
import ComplainIconWhite from "../../assets/complainWhite.svg";
import AdminIcon from "../../assets/admin.svg";
import whiteAdminIcon from "../../assets/adminWhite.svg";

const LayoutRoutes = [
  {
    id: 1,
    path: "/users",
    icon: UserIcon,
    iconLight: WhiteUserIcon,
    name: "Users",
  },
  {
    id: 2,
    path: "/complain",
    icon: ComplainIcon,
    iconLight: ComplainIconWhite,
    name: "Complaints",
  },
  {
    id: 3,
    path: "/admin",
    icon: AdminIcon,
    iconLight: whiteAdminIcon,
    name: "Admin",
  },

  // {
  //   id: 1,
  //   path: "/admin",
  //   icon: BuyIcon,
  //   iconLight: whiteBuyIcon,
  //   name: "Users",
  // },

  // {
  //   id: 2,
  //   path: "/history",
  //   icon: whiteHistoryIcon,
  //   iconLight: HistoryIcon,
  //   name: "History",
  // },
];

export default LayoutRoutes;
