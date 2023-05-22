import React, { Suspense, useState } from "react";
import {
  Chip,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import ReportIcon from "@mui/icons-material/Report";
import PublishIcon from "@mui/icons-material/Publish";
import DownloadIcon from "@mui/icons-material/Download";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// Styles
import styles from "../Account.module.css";

// Theme
import { useTheme } from "@mui/material/styles";

// Component Loader
import ComponentLoader from "../../../../components/ProgressLoader/ComponentLoader";
import MobileNavDrawer from "../../../../components/Layout/MobileNavDrawer";
import { ModalSkeletons } from "../../../../components/Skeletons/ComponentSkeletons";

// Lazy Component
const KYCInfoModal = React.lazy(() =>
  import("../KYCInfo/KYCInfoModal/KYCInfoModal")
);
const KYCInfoModalMobile = React.lazy(() =>
  import("../KYCInfo/KYCInfoModal/KYCInfoModalMobile")
);

const KYCInfo = ({ handleClickMenu }) => {
  const [isKycSucceed, setIsKycSucceed] = useState(false);

  // Editing KYC Info
  const [isEditing, setIsEditing] = useState(false);
  const [KYCInformation, setKYCInformation] = useState({});
  // Modal
  const [openKYCInfoModal, setOpenKYCInfoModal] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleEdit = () => {
    setIsEditing(!isEditing);
    setOpenKYCInfoModal(false);
  };

  const handleKYCInformationChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    const newKYCInformation = { ...KYCInformation };
    newKYCInformation[field] = value;
    setKYCInformation(newKYCInformation);
  };

  // Modal Handler
  const handleOpenKYCInfoModal = () => {
    setOpenKYCInfoModal(true);
  };
  const handleCloseKYCInfoModal = () => {
    setOpenKYCInfoModal(false);
  };

  // Drawer
  const handleKYCInfoDrawer = () => {
    setOpenKYCInfoModal(!openKYCInfoModal);
  };

  return (
    <React.Fragment>
      {!isMobile && (
        <Suspense fallback={<ModalSkeletons width={500} />}>
          <KYCInfoModal
            open={openKYCInfoModal}
            handleClose={handleCloseKYCInfoModal}
            KYCInformation={KYCInformation}
            handleKYCInformationChange={handleKYCInformationChange}
            handleEdit={handleEdit}
          />
        </Suspense>
      )}
      <Grid container columns={{ xs: 1, sm: 12, md: 12 }}>
        <Grid item xs={12} sm={12} md={7}>
          <Box className={styles.kycInfo}>
            {/* Header */}
            <Box className={styles.infoContentTitleBox}>
              <Stack
                direction={!isMobile ? "row" : "column"}
                justifyContent="space-between"
                alignItems={!isMobile ? "center" : ""}
              >
                <Typography
                  variant={!isMobile ? "h6" : "subtitle1"}
                  color="secondary"
                >
                  KYC Info
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  spacing={2}
                  alignItems="center"
                >
                  <Chip
                    onClick={() => setIsKycSucceed(!isKycSucceed)}
                    sx={{ borderRadius: "4px" }}
                    label={
                      <Stack direction="row" alignItems="center" gap={0.5}>
                        {isKycSucceed ? (
                          <>
                            <CheckCircleIcon color="success" fontSize="small" />
                            <Typography
                              variant="caption"
                              component="span"
                              color="text.success"
                            >
                              Successfuly verified
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
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    bgcolor={theme.palette.background.paper}
                    py={"2px"}
                    pr={1.5}
                    gap={1}
                    borderRadius="2px"
                    sx={{ cursor: "pointer" }}
                    onClick={
                      isKycSucceed
                        ? () => console.log("you click on download")
                        : handleOpenKYCInfoModal
                    }
                  >
                    {isKycSucceed ? (
                      <>
                        <IconButton
                          size={!isMobile ? "medium" : "small"}
                          color="secondary"
                        >
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="caption" component="span">
                          Download
                        </Typography>
                      </>
                    ) : (
                      <>
                        <IconButton
                          size={!isMobile ? "medium" : "small"}
                          color="secondary"
                        >
                          <PublishIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="caption" component="span">
                          Re Submit
                        </Typography>
                      </>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </Box>
            <Paper variant="outlined">
              {/* Full Name */}
              <Box
                bgcolor={theme.palette.background.default}
                className={styles.infoContentBox}
              >
                <Typography
                  variant={!isMobile ? "body1" : "body2"}
                  color="secondary"
                >
                  Full Name
                </Typography>
                <Typography
                  variant={!isMobile ? "body1" : "body2"}
                  color="text.secondary"
                >
                  {KYCInformation.fullName
                    ? KYCInformation.fullName
                    : "John Doe"}
                </Typography>
              </Box>
              {/* Address */}
              <Box
                bgcolor={theme.palette.background.default}
                className={styles.infoContentBox}
              >
                <Typography
                  variant={!isMobile ? "body1" : "body2"}
                  color="secondary"
                >
                  Address
                </Typography>
                <Typography
                  component="p"
                  sx={
                    !isMobile
                      ? {
                          width: 400,
                          overflowX: "hidden",
                          wordWrap: "break-word",
                        }
                      : {
                          width: 200,
                          overflowX: "hidden",
                          wordWrap: "break-word",
                        }
                  }
                  variant={!isMobile ? "body1" : "body2"}
                  color="text.secondary"
                  textAlign="right"
                >
                  {KYCInformation.address
                    ? KYCInformation.address
                    : "Room: 113, International Space Morgue, Lunar Cycle, Terra."}
                </Typography>
              </Box>
              {/* Aadhar Card */}
              <Box
                bgcolor={theme.palette.background.default}
                className={styles.infoContentBox}
              >
                <Typography
                  variant={!isMobile ? "body1" : "body2"}
                  color="secondary"
                >
                  Aadhar Card
                </Typography>
                <Typography
                  variant={!isMobile ? "body1" : "body2"}
                  color="text.secondary"
                >
                  {KYCInformation.adharCardNumber
                    ? KYCInformation.adharCardNumber
                    : "1111111000"}
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
      {isMobile && (
        <MobileNavDrawer
          handleClickMenu={handleClickMenu}
          drawerOpen={openKYCInfoModal}
          handleDrawerToggle={handleKYCInfoDrawer}
          topBarContent={"Resubmit KYC Info"}
        >
          <Suspense fallback={<ComponentLoader />}>
            <KYCInfoModalMobile
              KYCInformation={KYCInformation}
              handleKYCInformationChange={handleKYCInformationChange}
              handleEdit={handleEdit}
            />
          </Suspense>
        </MobileNavDrawer>
      )}
    </React.Fragment>
  );
};

export default KYCInfo;
