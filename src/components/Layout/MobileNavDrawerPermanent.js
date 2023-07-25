import React, { Suspense, useEffect, useState, useCallback } from "react";

import {
  Drawer,
  IconButton,
  Stack,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SettingsIcon from "@mui/icons-material/Settings";

import { Box } from "@mui/system";
import CreateNotifcationModal from "../../Pages/BuyWallet/CreateRequestModal/CreateNotifcationModal";

import Notification from "../../assets/notification.svg";

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
              {/* <IconButton onClick={() => window.history.back()}>
                <ArrowBackIcon color="primary" />
              </IconButton> */}
              <Typography
                fontWeight={600}
                fontSize={20}
                variant="body1"
                color="secondary"
              >
                Hello, {user?.user?.firstName} {user?.user?.lastName}
              </Typography>

              <Box
                // p={3}

                Button
                onClick={handleNotification}
                sx={{ cursor: "pointer" }}
              >
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
       
        {children}
      </Drawer>

      <Box position={"absolute"} height={20}>

      </Box>
    </Box>
  );
};

export default MobileNavDrawerPermanent;
