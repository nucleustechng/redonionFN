import React, { Suspense, useEffect, useLayoutEffect, useState } from "react";
import { Drawer, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SettingsIcon from "@mui/icons-material/Settings";
import CallMadeIcon from "@mui/icons-material/CallMade";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import HistoryIcon from "@mui/icons-material/History";

// Styles
import styles from "./CoinDetailsChildrenMobile/CoinDetailsChildrenMobile.module.css";

// Component Loader
import SettingsMenu from "../../components/Layout/SettingsMenu";

import ComponentLoader from "../../components/ProgressLoader/ComponentLoader";
import { useLocation } from "react-router-dom";

// Lazy Components
const SendBoxMobile = React.lazy(() =>
  import("./CoinDetailsChildrenMobile/SendBoxMobile")
);
const ReceiveBoxMobile = React.lazy(() =>
  import("./CoinDetailsChildrenMobile/ReceiveBoxMobile")
);
const TransactionBoxMobile = React.lazy(() =>
  import("./CoinDetailsChildrenMobile/TransactionBoxMobile")
);

const CoinDetailsMobile = ({ coinData }) => {
  const [coinDetails, setCoinDetails] = useState({});

  // Menu
  const [anchorElMenu, setAnchorElMenu] = React.useState(null);

  const openMenu = Boolean(anchorElMenu);
  const handleClickMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  const location = useLocation();

  const [openSendBox, setOpenSendBox] = useState(true);
  const [openReceiveBox, setOpenReceiveBox] = useState(false);
  const [openTransactionBox, setOpenTransactionSendBox] = useState(false);

  const handleOpenSendBox = () => {
    setOpenSendBox(true);
    setOpenReceiveBox(false);
    setOpenTransactionSendBox(false);
  };
  const handleOpenReceiveBox = () => {
    setOpenReceiveBox(true);
    setOpenSendBox(false);
    setOpenTransactionSendBox(false);
  };
  const handleOpenTransactionBox = () => {
    setOpenTransactionSendBox(true);
    setOpenSendBox(false);
    setOpenReceiveBox(false);
  };

  useEffect(() => {
    coinData.map((cd) => setCoinDetails(cd));
  }, [coinData]);

  useLayoutEffect(() => {
    if (location.state?.isReceiving) {
      setOpenReceiveBox(true);
      setOpenSendBox(false);
    } else {
      setOpenReceiveBox(false);
      setOpenSendBox(true);
    }
  }, [location]);

  const theme = useTheme();
  return (
    <Drawer
      variant="permanent"
      sx={{
        "& .MuiDrawer-paper": {
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
          boxSizing: "border-box",
          backgroundColor: `${
            theme.palette.mode === "dark" ? "#1b1b1b" : "#ffffff"
          }`,
          width: "100%",
          border: "none",
        },
      }}
      anchor="right"
    >
      <Box>
        <SettingsMenu
          open={openMenu}
          anchorEl={anchorElMenu}
          handleClose={handleCloseMenu}
        />
        <Box my={2} px={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <IconButton onClick={() => window.history.back()}>
              <ArrowBackIcon color="primary" />
            </IconButton>
            <Typography variant="body1" color="secondary">
              {coinDetails.coinName}
            </Typography>
            <IconButton onClick={handleClickMenu}>
              <SettingsIcon color="primary" />
            </IconButton>
          </Stack>
        </Box>
      </Box>
      <Box className={styles.mainBox} bgcolor={theme.palette.background.paper}>
        <Box>
          <Stack
            className={styles.topActionBox}
            direction="row"
            justifyContent="space-between"
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <Box
                bgcolor={
                  openSendBox ? theme.palette.background.primary : "#827824"
                }
                className={styles.topActionButtonBox}
              >
                <IconButton onClick={handleOpenSendBox}>
                  <CallMadeIcon sx={{ color: "#252628", fontSize: "2.5rem" }} />
                </IconButton>
              </Box>
              <Typography variant="caption">Send</Typography>
            </Stack>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <Box
                bgcolor={
                  openReceiveBox ? theme.palette.background.primary : "#827824"
                }
                className={styles.topActionButtonBox}
              >
                <IconButton onClick={handleOpenReceiveBox}>
                  <ArrowDownwardIcon
                    sx={{ color: "#252628", fontSize: "2.5rem" }}
                  />
                </IconButton>
              </Box>
              <Typography variant="caption">Receive</Typography>
            </Stack>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <Box
                bgcolor={
                  openTransactionBox
                    ? theme.palette.background.primary
                    : "#827824"
                }
                className={styles.topActionButtonBox}
              >
                <IconButton onClick={handleOpenTransactionBox}>
                  <HistoryIcon sx={{ color: "#252628", fontSize: "2.5rem" }} />
                </IconButton>
              </Box>
              <Typography variant="caption">Transactions</Typography>
            </Stack>
          </Stack>
        </Box>
        {openSendBox && (
          <Box>
            <Suspense fallback={<ComponentLoader />}>
              <SendBoxMobile
                handleOpenSendBox={handleOpenSendBox}
                handleOpenReceiveBox={handleOpenReceiveBox}
                isSending={openSendBox}
                coinData={coinDetails}
              />
            </Suspense>
          </Box>
        )}
        {openReceiveBox && (
          <Box>
            <Suspense fallback={<ComponentLoader />}>
              <ReceiveBoxMobile
                handleOpenSendBox={handleOpenSendBox}
                handleOpenReceiveBox={handleOpenReceiveBox}
                coinData={coinDetails}
              />
            </Suspense>
          </Box>
        )}
        {openTransactionBox && (
          <Box>
            <Suspense fallback={<ComponentLoader />}>
              <TransactionBoxMobile coinData={coinDetails} />
            </Suspense>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default CoinDetailsMobile;
