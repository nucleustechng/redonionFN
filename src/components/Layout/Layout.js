import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Skeleton from "@mui/material/Skeleton";
import { useTheme } from "@mui/material/styles";

// Component Loader
import ComponentLoader from "../ProgressLoader/ComponentLoader";
import { SwipeableDrawer, useMediaQuery } from "@mui/material";

// Lazy Components
const CustomAppbar = React.lazy(() => import("./CustomAppbar"));
const CustomDrawer = React.lazy(() => import("./CustomDrawer"));
const SettingsMenu = React.lazy(() => import("./SettingsMenu"));

const drawerWidth = 280;

function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Menu
  const [anchorElMenu, setAnchorElMenu] = React.useState(null);

  const openMenu = Boolean(anchorElMenu);
  const handleClickMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    < >
      <Box   sx={{ display: "flex" }}>
        <CssBaseline />
        <React.Suspense
          fallback={
            <Skeleton
              variant="rectangular"
              sx={{
                background: `${
                  theme.palette.mode === "dark" ? "#111" : "#fff"
                }`,
              }}
              width={"100%"}
              height={80}
            />
          }
        >
          <CustomAppbar
            handleClickMenu={handleClickMenu}
            handleDrawerToggle={handleDrawerToggle}
          />
        </React.Suspense>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {/* Drawer for mobile */}
          <SwipeableDrawer
            anchor="left"
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            onOpen={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: "background.default",
                border: "none",
              },
            }}
          >
            <React.Suspense fallback={<ComponentLoader />}>
              <CustomDrawer handleDrawerToggle={handleDrawerToggle} />
            </React.Suspense>
          </SwipeableDrawer>
          {/* Drawer for larger device */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: `${
                  theme.palette.mode === "dark" ? "#1b1b1b" : "#E8E8F3"
                }`,
                border: "none",
              },
            }}
            open
          >
            <React.Suspense bgcolor={"#E8E8F3"}
             fallback={<ComponentLoader />}>
              <CustomDrawer  />
            </React.Suspense>
          </Drawer>
        </Box>
        {/* Children */}
        <Box
          component="main"
          
          sx={{
            flexGrow: 1,
            p: `${!isMobile ? 3 : 0}`,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
      <Box >
        <React.Suspense
          fallback={
            <Skeleton
              animation="wave"
              variant="circular"
              width={20}
              height={20}
              sx={{
                backgroundColor: `${
                  theme.palette.mode === "dark" ? "#111" : "#f5f5f5"
                }`,
              }}
            />
          }
        >
          <SettingsMenu
            open={openMenu}
            anchorEl={anchorElMenu}
            handleClose={handleCloseMenu}
          />
        </React.Suspense>
      </Box>
    </>
  );
}

export default Layout;
