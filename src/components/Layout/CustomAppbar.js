import React, { useContext } from "react";
import {
  AppBar,
  Divider,
  IconButton,
  Button,
  Toolbar,
  List,
  ListItem,
  Typography,
  Skeleton,
  useMediaQuery,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/system";

// Layout Routes
import LayoutRoutes from "../Routes/LayoutRoutes";
import CoinDetailsRoutes from "../Routes/CoinDetailsRoutes";

import { useTheme } from "@mui/material/styles";

// Routing
import { useLocation } from "react-router-dom";

// Logos
import MainLogo from "../../assets/mainLogoDark.svg";

// Axios
import axios from "../../api/axios";

import MainLogoDark from "../../assets/mainLogo.svg";

// ColorModeContext
import { ColorModeContext } from "../../App";

// Lazy Component
const CustomSwitch = React.lazy(() => import("../CustomSwitch/CustomSwitch"));

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../LazyImageComponent/LazyImageComponent")
);

// Drawer Width
const drawerWidth = 200;

const CustomAppbar = ({ handleDrawerToggle, handleClickMenu }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const colorMode = useContext(ColorModeContext);
  const location = useLocation();


  return (
    <AppBar
      elevation={0}
      position="fixed"
      sx={{
        // width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Box
        bgcolor={
          // !isMobile
          //   ? theme.palette.background.default
          theme.palette.background.paper
        }
        p={!isMobile ? 2 : 1.5}
      >
        <Box mb={!isMobile ? -8 : -6}>
          <LazyImageComponent
            style={{
              width: !isMobile ? "15%" : "40%",
              display: "block",
              marginLeft: 0,
            }}
            src={MainLogoDark}
          />
        </Box>

        <Toolbar>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width={"100%"}
          >
            <Box></Box>
            <Box>
              <Stack direction="row" alignItems="center" spacing={2}>
                {/* <IconButton onClick={handleClickMenu}>
                    <SettingsIcon color={!isMobile ? "secondary" : "primary"} />
                  </IconButton> */}
                <IconButton
                  onClick={handleClickMenu}
                  sx={{ mr: 0, display: { sm: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  <Stack direction={"row"}>
                    <Box mt={2} mr={3}>
                      <a
                        href="/dashboard/transaction"
                        style={{
                          height: 50,
                          borderRadius: 10,
                          fontSize: 16,
                          textTransform: "none",
                          fontWeight: 600,
                          backgroundColor: "transparent",
                          textDecoration: "none",
                          color:
                            theme.palette.mode === "dark" ? "#fff" : "#000",
                        }}
                      >
                        Find Transaction
                      </a>
                    </Box>
                    <Box mt={2} mr={3}>
                      <a
                        href="/dashboard/complain"
                        style={{
                          height: 50,
                          borderRadius: 10,
                          fontSize: 16,
                          textTransform: "none",
                          fontWeight: 600,
                          textDecoration: "none",
                          backgroundColor: "transparent",
                          color:
                            theme.palette.mode === "dark" ? "#fff" : "#000",
                        }}
                      >
                        Feedback
                      </a>
                    </Box>

                    <Button
                      // type="submit"
                      style={{
                        height: 50,
                        borderRadius: 10,
                        fontSize: 16,
                        textTransform: "none",
                      }}
                      variant="contained"
                      color="primary"
                    >
                      Log Out
                    </Button>

                    {/* <CustomSwitch
                      checked={theme.palette.mode === "dark" ? true : false}
                      onChange={colorMode.toggleColorMode}
                    /> */}
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default CustomAppbar;
