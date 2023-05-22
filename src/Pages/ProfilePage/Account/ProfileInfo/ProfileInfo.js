import React, { Suspense, useState } from "react";
import { Box } from "@mui/system";
import {
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  Zoom,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";

// Theme
import { useTheme } from "@mui/material/styles";

// Styles
import styles from "../Account.module.css";

// Avatar
import AvatarImage from "../../../../assets/profileAvatar.svg";

// Component Loader
import ComponentLoader from "../../../../components/ProgressLoader/ComponentLoader";
import MobileNavDrawer from "../../../../components/Layout/MobileNavDrawer";
import { ModalSkeletons } from "../../../../components/Skeletons/ComponentSkeletons";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../../../components/LazyImageComponent/LazyImageComponent")
);
const ProfileInfoModal = React.lazy(() =>
  import("../ProfileInfo/ProfileInfoModal/ProfileInfoModal")
);
const ProfileInfoModalMobile = React.lazy(() =>
  import("../ProfileInfo/ProfileInfoModal/ProfileInfoModalMobile")
);

const ProfileInfo = ({ handleClickMenu }) => {
  // Modal
  const [openProfileInfoModal, setOpenProfileInfoModal] = useState(false);

  // Editing Personal Info
  const [isEditing, setIsEditing] = useState(false);
  const [profileInformation, setProfileInformation] = useState({});
  const [userAvatar, setUserAvatar] = useState(null);

  const handleEdit = () => {
    setIsEditing(!isEditing);
    setOpenProfileInfoModal(false);
  };

  const handleImageUpload = (e) => {
    setUserAvatar(URL.createObjectURL(e.target.files[0]));
  };

  const handleProfileInformationChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    const newProfileInformation = { ...profileInformation };
    newProfileInformation[field] = value;
    setProfileInformation(newProfileInformation);
  };

  // Modal
  const handleOpenProfileInfoModal = () => {
    setOpenProfileInfoModal(true);
  };
  const handleCloseProfileInfoModal = () => {
    setOpenProfileInfoModal(false);
  };

  // Drawer
  const handleProfileInfoDrawer = () => {
    setOpenProfileInfoModal(!openProfileInfoModal);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <React.Fragment>
      <Grid container columns={{ xs: 1, sm: 12, md: 12 }}>
        <Grid item xs={12} sm={12} md={7}>
          <Box className={styles.profileInfo}>
            {/* Header */}
            <Box className={styles.infoContentTitleBox}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant={!isMobile ? "h6" : "subtitle1"}
                  color="secondary"
                >
                  Personal Info
                </Typography>
                <Box
                  onClick={handleOpenProfileInfoModal}
                  bgcolor={
                    theme.palette.mode === "dark"
                      ? theme.palette.background.paper
                      : "rgba(234, 234,234, 0.3)"
                  }
                  p={"2px"}
                  borderRadius="2px"
                >
                  <IconButton
                    size={!isMobile ? "medium" : "small"}
                    color="secondary"
                  >
                    <BorderColorIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Stack>
            </Box>
            <Paper variant="outlined">
              {/* Photo */}
              <Box
                bgcolor={theme.palette.background.default}
                className={styles.infoContentBox}
              >
                <Box>
                  <Tooltip
                    title="A photo helps personalize your account"
                    placement="right"
                    TransitionComponent={Zoom}
                  >
                    <Typography
                      variant={!isMobile ? "body1" : "body2"}
                      color="secondary"
                    >
                      Photo
                    </Typography>
                  </Tooltip>
                </Box>
                <Box>
                  {userAvatar ? (
                    <Suspense
                      fallback={
                        <Skeleton
                          animation="wave"
                          variant="circular"
                          width={40}
                          height={40}
                        />
                      }
                    >
                      <LazyImageComponent
                        className={styles.avatarImage}
                        src={userAvatar}
                      />
                    </Suspense>
                  ) : (
                    <Suspense
                      fallback={
                        <Skeleton
                          animation="wave"
                          variant="circular"
                          width={40}
                          height={40}
                        />
                      }
                    >
                      <LazyImageComponent
                        className={styles.avatarImage}
                        src={AvatarImage}
                      />
                    </Suspense>
                  )}
                </Box>
              </Box>
              {/* Name */}
              <Box
                bgcolor={theme.palette.background.default}
                className={styles.infoContentBox}
              >
                <Typography
                  variant={!isMobile ? "body1" : "body2"}
                  color="secondary"
                >
                  Name
                </Typography>
                <Typography
                  variant={!isMobile ? "body1" : "body2"}
                  color="text.secondary"
                >
                  {profileInformation.userName
                    ? profileInformation.userName
                    : "John Doe"}
                </Typography>
              </Box>
              {/* Email */}
              <Box
                bgcolor={theme.palette.background.default}
                className={styles.infoContentBox}
              >
                <Typography
                  variant={!isMobile ? "body1" : "body2"}
                  color="secondary"
                >
                  Email
                </Typography>
                <Typography
                  variant={!isMobile ? "body1" : "body2"}
                  color="text.secondary"
                >
                  {profileInformation.userEmail
                    ? profileInformation.userEmail
                    : "john@doe.com"}
                </Typography>
              </Box>
              {/* Phone */}
              <Box
                bgcolor={theme.palette.background.default}
                className={styles.infoContentBox}
              >
                <Typography
                  variant={!isMobile ? "body1" : "body2"}
                  color="secondary"
                >
                  Phone
                </Typography>
                <Typography
                  variant={!isMobile ? "body1" : "body2"}
                  color="text.secondary"
                >
                  {profileInformation.userPhone
                    ? profileInformation.userPhone
                    : "+123 111222333"}
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
      {isMobile && (
        <MobileNavDrawer
          drawerOpen={openProfileInfoModal}
          handleDrawerToggle={handleProfileInfoDrawer}
          topBarContent={"Edit Personal Info"}
          handleClickMenu={handleClickMenu}
        >
          <Suspense fallback={<ComponentLoader />}>
            <ProfileInfoModalMobile
              handleEdit={handleEdit}
              profileInformation={profileInformation}
              handleProfileInformationChange={handleProfileInformationChange}
              userAvatar={userAvatar}
              handleImageUpload={handleImageUpload}
              setUserAvatar={setUserAvatar}
            />
          </Suspense>
        </MobileNavDrawer>
      )}
      {!isMobile && (
        <Suspense fallback={<ModalSkeletons width={500} />}>
          <ProfileInfoModal
            open={openProfileInfoModal}
            handleClose={handleCloseProfileInfoModal}
            handleEdit={handleEdit}
            profileInformation={profileInformation}
            handleProfileInformationChange={handleProfileInformationChange}
            userAvatar={userAvatar}
            handleImageUpload={handleImageUpload}
            setUserAvatar={setUserAvatar}
          />
        </Suspense>
      )}
    </React.Fragment>
  );
};

export default ProfileInfo;
