import React, { Suspense, useEffect, useState, useCallback } from "react";

import {
  Drawer,
  IconButton,
  Stack,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SettingsIcon from "@mui/icons-material/Settings";

import { Box } from "@mui/system";
import CreateNotifcationModal from "../../Pages/BuyWallet/CreateRequestModal/CreateNotifcationModal";

import Notification from "../../assets/notification.svg";
import Home from "../../assets/home.svg";
import HomeAlt from "../../assets/homeAlt.svg";

import Exchange from "../../assets/exchangeMenu.svg";
import ExchangeAlt from "../../assets/exchangeMenuAlt.svg";

import Transaction from "../../assets/transactionMenu.svg";
import TransactionAlt from "../../assets/transactionMenuAlt.svg";

import Profile from "../../assets/profileMenu.svg";
import ProfileAlt from "../../assets/profileMenuAlt.svg";

// Lazy Image component
const LazyImageComponent = React.lazy(() =>
  import("../LazyImageComponent/LazyImageComponent")
);

const MobileNavDrawerPermanent = ({
  children,
  topBarContent,
  user,
  handleClickMenu,
}) => {
  const theme = useTheme();

  const [unread, setUnread] = useState(0);

  const location = useLocation();

   const navigate = useNavigate();

  const [showNotification, setShowNotification] = useState(false);

  const handleNotification = () => {
    setShowNotification(!showNotification);
  };

  return (
    <Box>
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
            boxSizing: "border-box",
            backgroundColor: `${
              theme.palette.mode === "dark" ? "#1b1b1b" : "#fff"
            }`,
            width: "100%",
            border: "none",
          },
        }}
        anchor="right"
      >
        <Box my={2} px={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {location.pathname === "/dashboard/exchange" && (
              <Typography
                fontWeight={600}
                fontSize={20}
                variant="body1"
                color="secondary"
              >
                Hello, {user?.user?.firstName} {user?.user?.lastName}
              </Typography>
            )}

            {location.pathname === "/dashboard/buy" && (
              <Typography
                fontWeight={600}
                fontSize={30}
                variant="body1"
                color="secondary"
              >
                Trade
              </Typography>
            )}

            {location.pathname === "/dashboard/transactions" && (
              <Typography
                fontWeight={600}
                fontSize={30}
                variant="body1"
                color="secondary"
              >
                Transaction
              </Typography>
            )}

            <Box Button onClick={handleNotification} sx={{ cursor: "pointer" }}>
              {/* <Box
                  position={"absolute"}
                  borderRadius={"50%"}
                  top={2}
                  width={25}
                  height={25}
                  bgcolor={"#ff0000"}
                >
                  <center>
                    <Typography
                      variant="caption"
                      fontSize={11}
                      fontWeight={500}
                      color="secondary"
                    >
                      {unread > 100 ? "99+" : unread}
                    </Typography>
                  </center>
                </Box> */}
              <LazyImageComponent src={Notification} />
            </Box>
          </Stack>
        </Box>

        <Box>{children}</Box>
        <Box
          style={{ position: "fixed" }}
          px={3}
          pt={2}
          borderTop={1}
          borderColor={"#ddd"}
          bgcolor={theme.palette.mode === "dark" ? "#1b1b1b" : "#fff"}
          bottom={0}
          width={"100%"}
          height={65}
        >
          <Stack
            mt={-0.6}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box onClick={() => navigate(`/dashboard/exchange`)} button>
              <LazyImageComponent
                src={
                  location.pathname === "/dashboard/exchange" ? HomeAlt : Home
                }
              />
            </Box>
            <Box onClick={() => navigate(`/dashboard/buy`)} button>
              <LazyImageComponent
                src={
                  location.pathname === "/dashboard/buy"
                    ? ExchangeAlt
                    : Exchange
                }
              />
            </Box>
            <Box onClick={() => navigate(`/dashboard/transactions`)} button>
              <LazyImageComponent
                src={
                  location.pathname === "/dashboard/transactions"
                    ? TransactionAlt
                    : Transaction
                }
              />
            </Box>
            <Box onClick={() => navigate(`/account`)} button>
              <LazyImageComponent
                src={location.pathname === "/account" ? ProfileAlt : Profile}
              />
            </Box>
          </Stack>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MobileNavDrawerPermanent;
