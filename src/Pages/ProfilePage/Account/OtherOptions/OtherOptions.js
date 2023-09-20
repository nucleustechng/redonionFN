import React, { Suspense, useState } from "react";
import { Button, Grid, Paper, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";

// Styles
import styles from "../Account.module.css";

// Theme
import { useTheme } from "@mui/material/styles";

// Component Loader
import ComponentLoader from "../../../../components/ProgressLoader/ComponentLoader";
import { LightUIButtonPrimary } from "../../../../Utilities/LightUIButtons";
import MobileNavDrawer from "../../../../components/Layout/MobileNavDrawer";
import { ModalSkeletons } from "../../../../components/Skeletons/ComponentSkeletons";

// Lazy Components
const DeleteAccountModal = React.lazy(() => import("./DeleteAccountModal.js"));
const DeleteAccountModalMobile = React.lazy(() =>
  import("./DeleteAccountModalMobile")
);
const ChangePasswordModal = React.lazy(() => import("./ChangePasswordModal"));
const ChangePasswordModalMobile = React.lazy(() =>
  import("./ChangePasswordModalMobile")
);

const OtherOptions = ({ handleClickMenu }) => {
  const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState(false);
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);

  const handleOpenDeleteAccountModal = () => {
    setOpenDeleteAccountModal(true);
  };

  const handleCloseDeleteAccountModal = () => {
    setOpenDeleteAccountModal(false);
  };

  const handleOpenChangePasswordModal = () => {
    setOpenChangePasswordModal(true);
  };

  const handleCloseChangePasswordModal = () => {
    setOpenChangePasswordModal(false);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Drawer
  const handleDeleteAccountDrawer = () => {
    setOpenDeleteAccountModal(!openDeleteAccountModal);
  };
  const handleChangePasswordDrawer = () => {
    setOpenChangePasswordModal(!openChangePasswordModal);
  };

  return (
    <>
      <Grid container columns={{ xs: 1, sm: 12, md: 12 }}>
        <Grid item xs={12} sm={12} md={7}>
          <Box className={styles.otherOptions}>
            {/* Header */}
            <Box className={styles.infoContentTitleBox}>
              <Typography
                variant={!isMobile ? "h6" : "subtitle1"}
                color="secondary"
              >
                Other Options
              </Typography>
            </Box>
            <Paper variant="outlined">
              {/* Change Password */}
              <Box
                className={
                  !isMobile
                    ? styles.infoContentBox
                    : styles.infoContentBoxMobile
                }
                bgcolor={theme.palette.background.default}
              >
                <Box>
                  <Typography
                    variant={!isMobile ? "body1" : "body2"}
                    color="secondary"
                  >
                    Change Password
                  </Typography>
                  <Typography
                    mt={isMobile && 1}
                    variant="caption"
                    component="p"
                    color="text.secondary"
                    sx={!isMobile ? { maxWidth: 350 } : { maxWidth: 130 }}
                  >
                    Change your account password to enable security of your
                    account
                  </Typography>
                </Box>
                <Box>
                  {theme.palette.mode === "dark" ? (
                    <Button
                      onClick={handleOpenChangePasswordModal}
                      color="primary"
                      variant="contained"
                    >
                      <Typography
                        variant={!isMobile ? "body2" : "caption"}
                        sx={{ textTransform: "capitalize" }}
                        color="common.black"
                      >
                        Change Password
                      </Typography>
                    </Button>
                  ) : (
                    <LightUIButtonPrimary
                      sx={{ px: 2 }}
                      onClick={handleOpenChangePasswordModal}
                      color="primary"
                    >
                      <Typography
                        variant={!isMobile ? "body2" : "caption"}
                        sx={{ textTransform: "capitalize" }}
                        color="common.white"
                      >
                        Change Password
                      </Typography>
                    </LightUIButtonPrimary>
                  )}
                </Box>
              </Box>
              {/* Delete Account */}
              <Box
                className={styles.infoContentBoxMobile}
                bgcolor={theme.palette.background.default}
              >
                <Box>
                  <Typography
                    variant={!isMobile ? "body1" : "body2"}
                    color="secondary"
                  >
                    Delete Account
                  </Typography>
                  <Typography
                    mt={isMobile && 1}
                    sx={!isMobile ? { maxWidth: 350 } : { maxWidth: 130 }}
                    variant="caption"
                    component="p"
                    color="text.secondary"
                  >
                    Deleting account will lead to complete loss of this account.
                  </Typography>
                </Box>
                <Box>
                  <Button
                    disableElevation
                    onClick={handleOpenDeleteAccountModal}
                    color="error"
                    variant="contained"
                  >
                    <Typography
                      variant={!isMobile ? "body2" : "caption"}
                      sx={{ textTransform: "capitalize" }}
                      color="inherit"
                    >
                      Delete Account
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
      {!isMobile ? (
        <Suspense fallback={<ModalSkeletons width={500} />}>
          <DeleteAccountModal
            open={openDeleteAccountModal}
            handleClose={handleCloseDeleteAccountModal}
          />
        </Suspense>
      ) : (
        <MobileNavDrawer
          handleClickMenu={handleClickMenu}
          drawerOpen={openDeleteAccountModal}
          handleDrawerToggle={handleDeleteAccountDrawer}
          topBarContent={"Delete Account"}
        >
          <Suspense fallback={<ComponentLoader />}>
            <DeleteAccountModalMobile
              open={openDeleteAccountModal}
              handleClose={handleCloseDeleteAccountModal}
            />
          </Suspense>
        </MobileNavDrawer>
      )}
      {!isMobile ? (
        <Suspense fallback={<ModalSkeletons />}>
          <ChangePasswordModal
            open={openChangePasswordModal}
            handleClose={handleCloseChangePasswordModal}
          />
        </Suspense>
      ) : (
        <MobileNavDrawer
          handleClickMenu={handleClickMenu}
          drawerOpen={openChangePasswordModal}
          handleDrawerToggle={handleChangePasswordDrawer}
          topBarContent={"Change Password"}
        >
          <Suspense fallback={<ComponentLoader />}>
            <ChangePasswordModalMobile
              handleClose={handleCloseChangePasswordModal}
            />
          </Suspense>
        </MobileNavDrawer>
      )}
    </>
  );
};

export default OtherOptions;
