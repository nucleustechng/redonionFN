import BuyIcon from "../../assets/buyIcon.svg";
import HistoryIcon from "../../assets/history.svg";
import whiteHistoryIcon from "../../assets/historyDark.svg";
import whiteBuyIcon from "../../assets/buyIconWhite.svg";

const LayoutRoutes = [
  {
    id: 1,
    path: "/exchange",
    icon: BuyIcon,
    iconLight: whiteBuyIcon,
    name: "Exchange",
  },
 
  {
    id: 2,
    path: "/history",
    icon: whiteHistoryIcon,
    iconLight: HistoryIcon,
    name: "History",
  },
 
];

export default LayoutRoutes;
