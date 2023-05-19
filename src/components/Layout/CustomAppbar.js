import React, { useContext } from "react";
import {
  AppBar,
  Divider,
  IconButton,
  Toolbar,
  Typography,
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

// ColorModeContext
import { ColorModeContext } from "../../App";

// Lazy Component
const CustomSwitch = React.lazy(() => import("../CustomSwitch/CustomSwitch"));

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
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >

      <Box
        bgcolor={
          !isMobile
            ? theme.palette.background.default
            : theme.palette.background.paper
        }
      // pb={2}
      >
        {isMobile && (
          <Toolbar>
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width={"100%"}
            >
              <Box>
                <Typography
                  variant={!isMobile ? "h6" : "subtitle1"}
                  noWrap
                  fontWeight={400}
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  {LayoutRoutes.map(({ id, path, name }) => (
                    <React.Fragment key={id}>
                      {location.pathname.startsWith(`/wallets${path}`)
                        ? name
                        : null}
                    </React.Fragment>
                  ))}
                  {CoinDetailsRoutes.map(({ id, name, path }) => (
                    <React.Fragment key={id}>
                      {location.pathname.startsWith(path) ? (
                        <Breadcrumbs
                          separator={<NavigateNextIcon fontSize="small" />}
                        >
                          <Link
                            underline="none"
                            key="1"
                            color="secondary"
                            href="/dashboard/exchange"
                          >
                            <Typography
                              variant="h6"
                              noWrap
                              fontWeight={400}
                              sx={{ textTransform: "capitalize" }}
                            >
                              Crypto {location.pathname.slice(1, 7)}
                            </Typography>
                          </Link>
                          <Link
                            key="2"
                            color="secondary"
                            underline="none"
                            href={location.pathname}
                          >
                            <Typography
                              variant="h6"
                              noWrap
                              fontWeight={400}
                              sx={{ textTransform: "capitalize" }}
                            >
                              {" "}
                              {location.pathname.slice(9).split("-").join(" ")}
                            </Typography>
                          </Link>
                        </Breadcrumbs>
                      ) : null}
                    </React.Fragment>
                  ))}
                  {location.pathname.startsWith("/thrifty-wallet")
                    ? location.pathname.slice(16).split("-").join(" ")
                    : null}
                  {location.pathname === "/dashboard/top-up" && (
                    <Breadcrumbs
                      separator={<NavigateNextIcon fontSize="small" />}
                    >
                      <Link
                        underline="none"
                        key="1"
                        color="secondary"
                        href="/dashboard/exchange"
                      >
                        <Typography
                          variant="h6"
                          noWrap
                          fontWeight={400}
                          sx={{ textTransform: "capitalize" }}
                        >
                          {location.pathname.slice(1, 7)}
                        </Typography>
                      </Link>
                      <Link
                        key="2"
                        color="secondary"
                        underline="none"
                        href={location.pathname}
                      >
                        <Typography
                          variant="h6"
                          noWrap
                          fontWeight={400}
                          sx={{ textTransform: "capitalize" }}
                        >
                          {" "}
                          {location.pathname.slice(9).split("-").join(" ")}
                        </Typography>
                      </Link>
                    </Breadcrumbs>
                  )}
                  {location.pathname.startsWith("/account") && "Account"}
                </Typography>
              </Box>
              <Box>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <IconButton onClick={handleClickMenu}>
                    <SettingsIcon color={!isMobile ? "secondary" : "primary"} />
                  </IconButton>
                  <Box sx={{ display: { xs: "none", sm: "block" } }}>
                    <CustomSwitch
                      checked={theme.palette.mode === "dark" ? true : false}
                      onChange={colorMode.toggleColorMode}
                    />
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Toolbar>
        )}
        {!isMobile && (
          <Box px={3} mb={2}>
            <Divider />
          </Box>
        )}
      </Box>
    </AppBar>
  );
};

export default CustomAppbar;
