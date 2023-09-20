import React, { Suspense, useState } from "react";
import { Box } from "@mui/system";
import {
  Grid,
  IconButton,
  Button,
  Paper,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  Zoom,
  Chip
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor"; 
import ReportIcon from "@mui/icons-material/Report";
import PublishIcon from "@mui/icons-material/Publish";
import DownloadIcon from "@mui/icons-material/Download";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
import LocationIcon from "../../../../assets/location.svg";
import EditIcon from "../../../../assets/Edit.svg";

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
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const [isKycSucceed, setIsKycSucceed] = useState(false);


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

console.log(user)
  return (
    <React.Fragment>
      <Grid container columns={{ xs: 1, sm: 12, md: 12 }}>
        <Grid item xs={12} sm={12} md={12}>
          <Box className={styles.profileInfo}>
            {/* Header */}
            <Box ml={2} className={styles.infoContentTitleBox}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant={!isMobile ? "h6" : "subtitle1"}
                  color="secondary"
                  fontSize={24}
                  
                >
                 My Account
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  spacing={2}
                  alignItems="center"
                >
                  <Chip
                    onClick={() => handleOpenProfileInfoModal}
                    sx={{ borderRadius: "4px" }}
                    label={
                      <Stack direction="row" alignItems="center" gap={0.5}>
                        {user?.user?.identityIsVerified ? (
                          <>
                            <CheckCircleIcon color="success" fontSize="small" />
                            <Typography
                              variant="caption"
                              component="span"
                              color="text.success"
                            >
                             KYC verified
                            </Typography>
                          </>
                        ) : (
                          <>
                            <ReportIcon color="error" fontSize="small" />
                            <Typography
                              component="span"
                              variant="caption"
                              color="error"
                            >
                              KYC Failed
                            </Typography>
                          </>
                        )}
                      </Stack>
                    }
                  />
                 
                </Stack>
               
              </Stack>
            </Box>
            
            <Paper>
              {/* Photo */}
              <Box
                bgcolor={theme.palette.background.default}
                className={styles.infoContentBox}
              >
                {/* <Box>
                  {user?.user?.selfieImage!="" && (
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
                        src={user?.user?.selfieImage}
                      />
                    </Suspense>
                  )}
                </Box> */}
              
                  <Box >

                    <Typography

                      variant={!isMobile ? "body1" : "body2"}
                      color="secondary"
                      fontSize={18}
                      fontWeight={600}
                    >
                      {user?.user?.firstName} {user?.user?.lastName}
                    </Typography>


                    <Typography
                      mt={0}
                      variant={!isMobile ? "body1" : "body2"}
                      color="secondary"
                      fontSize={13}
                    >
                      {user?.user?.email}
                    </Typography>
                    <Stack
                      mt={0.5}
                      direction="row">
                      <LazyImageComponent
                        style={{ width: 13 }}
                        src={LocationIcon}

                      />
                      <Typography
                        fontWeight={400}
                        ml={1}
                        fontSize={12}
                        // py={3}
                        color="secondary"
                        variant="body2"
                      >
                        {user?.country.name}
                      </Typography>

                    </Stack>

                  </Box>

                <Box mr={-2}>
                  <Button
                    // onClick={handleOpenChangePasswordModal}
                    color="primary"
                    variant="contained"
                    
                  >
                    <Typography
                      variant={!isMobile ? "body2" : "caption"}
                      sx={{ textTransform: "capitalize" }}
                      color="#fff"
                      fontSize={14}
                    >
                      Edit  <LazyImageComponent
                        style={{ width: 13 }}
                        src={EditIcon}

                      />  
                    </Typography>
                  </Button>
                </Box>
              
               
              </Box>
            
          
            </Paper>
          </Box>
        </Grid>
      </Grid>
      {/* {isMobile && (
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
      )} */}
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
