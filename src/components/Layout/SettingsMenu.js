import React, { Suspense, useContext, useEffect, useState } from "react";
import {
  MenuItem,
  Menu,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

// Authentication
import useAuth from "../../hooks/useAuth";

import { useNavigate } from "react-router-dom";

// Color Context toggler
import { ColorModeContext } from "../../App";
import CustomSwitch from "../CustomSwitch/CustomSwitch";

// Modal Loader
import { ModalSkeletons } from "../Skeletons/ComponentSkeletons";

// Installation modal
const InstallationModal = React.lazy(() =>
  import("../InstallationModal/InstallationModal")
);

const SettingsMenu = ({ anchorEl, open, handleClose }) => {
  const [openInstallationModal, setOpenInstallationModal] = useState(false);
  const [showInstallMenu, setShowInstallMenu] = useState(true);

  // Installation Modal
  const handleOpenIstallationModal = () => {
    setOpenInstallationModal(true);
  };

  const handleCloseInstallationModal = () => {
    setOpenInstallationModal(false);
  };

  const { logOut } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();
  const colorMode = useContext(ColorModeContext);

  const handleRouting = (path) => {
    navigate(path);
    handleClose();
  };

  useEffect(() => {
    // For iOS
    if (window.navigator.standalone) {
      setShowInstallMenu(false);
    }
    // For Android
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setShowInstallMenu(false);
    }
  }, [showInstallMenu]);

  return (
    <React.Fragment>
      {/* <Suspense fallback={<ModalSkeletons />}>
        <InstallationModal
          open={openInstallationModal}
          handleOpen={handleOpenIstallationModal}
          onClose={handleCloseInstallationModal}
        />
      </Suspense> */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem 
        // onClick={() => handleRouting("/thrifty-wallet/FAQ")}
        >
          <Typography variant="caption">FAQ</Typography>
        </MenuItem>
        <MenuItem 
        // onClick={() => handleRouting("/thrifty-wallet/about")}
        >
          <Typography variant="caption">About Us</Typography>
        </MenuItem>
        <MenuItem
          // onClick={() => handleRouting("/thrifty-wallet/privacy-policy")}
        >
          <Typography variant="caption">Privacy Policy</Typography>
        </MenuItem>
        <MenuItem
          // onClick={() => handleRouting("/thrifty-wallet/terms-and-condition")}
        >
          <Typography variant="caption">Terms & Condition</Typography>
        </MenuItem>
        <MenuItem onClick={logOut}>
          <Typography variant="caption" color="error">
            Logout
          </Typography>
        </MenuItem>
        {/* {showInstallMenu && (
          <MenuItem onClick={handleOpenIstallationModal}>
            <Typography variant="caption" color="text.success">
              Install App
            </Typography>
          </MenuItem>
        )} */}
        {isMobile && (
          <MenuItem
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {theme.palette.mode === "dark" && (
              <CustomSwitch
                defaultChecked
                onChange={colorMode.toggleColorMode}
              />
            )}
            {theme.palette.mode === "light" && (
              <CustomSwitch onChange={colorMode.toggleColorMode} />
            )}
          </MenuItem>
        )}
      </Menu>
    </React.Fragment>
  );
};

export default SettingsMenu;
