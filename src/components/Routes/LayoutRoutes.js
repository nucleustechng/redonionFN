import BuyIcon from "../../assets/buyIcon.svg";
import HistoryIcon from "../../assets/history.svg";
import whiteHistoryIcon from "../../assets/historyDark.svg";
import whiteBuyIcon from "../../assets/buyIconWhite.svg";
import DashboardIcon from "../../assets/dashbaord.svg";
import DashboardIconBlue from "../../assets/dashbaordBlue.svg";

const LayoutRoutes = [
  {
    id: 1,
    path: "/exchange",
    icon: DashboardIconBlue,
    iconLight: DashboardIcon,
    name: "Dashbaord",
  },
  {
    id: 2,
    path: "/buy",
    icon: BuyIcon,
    iconLight: whiteBuyIcon,
    name: "Buy",
  },

  {
    id: 3,
    path: "/history",
    icon: whiteHistoryIcon,
    iconLight: HistoryIcon,
    name: "History",
  },
];

export default LayoutRoutes;
