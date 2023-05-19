import React, { Suspense } from "react";
import { Box } from "@mui/system";
import { Typography, useMediaQuery, useTheme } from "@mui/material";

// Styles
import styles from "./TopUpPage.module.css";

import MobileNavDrawerPermanent from "../../components/Layout/MobileNavDrawerPermanent";

// Skeletons
import {
  ComponentSkeleton,
  MenuSkeleton,
} from "../../components/Skeletons/ComponentSkeletons";

// Lazy Component
const ProviderSelect = React.lazy(() =>
  import("./ProviderSelect/ProviderSelect")
);
const TopUpCard = React.lazy(() => import("./TopUpCard/TopUpCard"));
const TopUpCardMobile = React.lazy(() => import("./TopUpCard/TopUpCardMobile"));
const SettingsMenu = React.lazy(() =>
  import("../../components/Layout/SettingsMenu")
);

const TopUpPage = () => {
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
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <React.Fragment>
      {!isMobile && (
        <Box px={3} className={!isTablet ? styles.mainBox : styles.mainBoxTab}>
          <Typography variant="h6" color="secondary">
            Select a Provider
          </Typography>
          <Box className={!isTablet ? styles.contentBox : styles.contentBoxTab}>
            <Suspense fallback={<ComponentSkeleton />}>
              <ProviderSelect />
            </Suspense>
            <Suspense fallback={<ComponentSkeleton />}>
              <TopUpCard />
            </Suspense>
          </Box>
        </Box>
      )}
      {isMobile && (
        <MobileNavDrawerPermanent
          handleClickMenu={handleClickMenu}
          topBarContent={"Top Up"}
        >
          <Box className={styles.contentBoxMobile}>
            <Suspense fallback={<ComponentSkeleton />}>
              <TopUpCardMobile />
            </Suspense>
          </Box>
          <Box>
            <Suspense fallback={<MenuSkeleton />}>
              <SettingsMenu
                open={openMenu}
                anchorEl={anchorElMenu}
                handleClose={handleCloseMenu}
              />
            </Suspense>
          </Box>
        </MobileNavDrawerPermanent>
      )}
    </React.Fragment>
  );
};

export default TopUpPage;
