import React, { Suspense, useState } from "react";
import { Box } from "@mui/system";
import {
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BorderColorIcon from "@mui/icons-material/BorderColor";

// Styles
import styles from "../Account.module.css";

// Theme
import { useTheme } from "@mui/material/styles";

// Component Loader
import ComponentLoader from "../../../../components/ProgressLoader/ComponentLoader";
import MobileNavDrawer from "../../../../components/Layout/MobileNavDrawer";
import { ModalSkeletons } from "../../../../components/Skeletons/ComponentSkeletons";

// Lazy Component
const BankInfoModal = React.lazy(() =>
  import("../BankInfo/BankInfoModal/BankInfoModal")
);
const BankInfoModalMobile = React.lazy(() =>
  import("../BankInfo/BankInfoModal/BankInfoModalMobile")
);
const AddBankModal = React.lazy(() =>
  import("../BankInfo/BankInfoModal/AddBankModal")
);
const AddBankModalMobile = React.lazy(() =>
  import("../BankInfo/BankInfoModal/AddBankModalMobile")
);

const BankInfo = ({ handleClickMenu }) => {
  const [addBankInformations, setAddBankInformaitons] = useState({});

  const [openBankInfoModal, setOpenBankInfoModal] = useState(false);
  const [openAddBankModal, setOpenAddBankModal] = useState(false);

  // Editing bank Info
  const [isEditing, setIsEditing] = useState(false);
  const [bankInformation, setBankInformation] = useState({});

  const handleEdit = () => {
    setIsEditing(!isEditing);
    setOpenBankInfoModal(false);
  };

  const handleBankInformationChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    const newKycInformation = { ...bankInformation };
    newKycInformation[field] = value;
    setBankInformation(newKycInformation);
  };

  const handleAddBankInformationChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    const newBankInformation = { ...addBankInformations };
    newBankInformation[field] = value;
    setAddBankInformaitons(newBankInformation);
  };

  // Handle Add bank
  const handleOpenAddBankModal = () => {
    setOpenAddBankModal(true);
  };

  const handleCloseAddBankModal = () => {
    setOpenAddBankModal(false);
  };

  // Edit Bank Info
  const handleOpenBankInfoModal = () => {
    setOpenBankInfoModal(true);
  };

  const handleCloseBankInfoModal = () => {
    setOpenBankInfoModal(false);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Drawer
  const handleBankInfoDrawer = () => {
    setOpenBankInfoModal(!openBankInfoModal);
  };
  const handleAddBankDrawer = () => {
    setOpenAddBankModal(!openAddBankModal);
  };

  return (
    <React.Fragment>
      <Grid container columns={{ xs: 1, sm: 12, md: 12 }}>
        <Grid item xs={12} sm={12} md={7}>
          <Box className={styles.bankInfo}>
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
                  Bank Info
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  spacing={2}
                  alignItems="center"
                  sx={{ cursor: "pointer" }}
                >
                  <Stack
                    onClick={handleOpenAddBankModal}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    bgcolor={
                      theme.palette.mode === "dark"
                        ? theme.palette.background.paper
                        : "rgba(234, 234,234, 0.3)"
                    }
                    py={"2px"}
                    pr={1.5}
                    gap={1}
                    borderRadius="2px"
                  >
                    <IconButton
                      size={!isMobile ? "medium" : "small"}
                      color="secondary"
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="caption" component="span">
                      Add Bank
                    </Typography>
                  </Stack>
                  <Box
                    onClick={handleOpenBankInfoModal}
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
              </Stack>
            </Box>
            <Paper variant="outlined">
              {/* Bank Name */}
              <Box
                bgcolor={theme.palette.background.default}
                className={styles.infoContentBox}
              >
                <Typography
                  variant={!isMobile ? "body1" : "body2"}
                  color="secondary"
                >
                  Bank Name
                </Typography>
                <Typography
                  variant={!isMobile ? "body1" : "body2"}
                  color="text.secondary"
                >
                  {bankInformation.bankName
                    ? bankInformation.bankName
                    : "ABC Bank"}
                </Typography>
              </Box>
              {/* IFSC */}
              <Box
                bgcolor={theme.palette.background.default}
                className={styles.infoContentBox}
              >
                <Typography
                  variant={!isMobile ? "body1" : "body2"}
                  color="secondary"
                >
                  IFSC
                </Typography>
                <Typography
                  variant={!isMobile ? "body1" : "body2"}
                  color="text.secondary"
                >
                  {bankInformation.bankIFSC
                    ? bankInformation.bankIFSC
                    : "ABC121212"}
                </Typography>
              </Box>
              {/* Account Holder */}
              <Box
                bgcolor={theme.palette.background.default}
                className={styles.infoContentBox}
              >
                <Typography
                  variant={!isMobile ? "body1" : "body2"}
                  color="secondary"
                >
                  Account Holder Name
                </Typography>
                <Typography
                  variant={!isMobile ? "body1" : "body2"}
                  color="text.secondary"
                >
                  {bankInformation.bankAccountHolderName
                    ? bankInformation.bankAccountHolderName
                    : "John Doe"}
                </Typography>
              </Box>
            </Paper>
            {addBankInformations.bankName &&
            addBankInformations.bankIFSC &&
            addBankInformations.bankAccountHolderName ? (
              <Box mt={2}>
                <Paper variant="outlined">
                  {/* Bank Name */}
                  <Box
                    bgcolor={theme.palette.background.default}
                    className={styles.infoContentBox}
                  >
                    <Typography
                      variant={!isMobile ? "body1" : "body2"}
                      color="secondary"
                    >
                      Bank Name
                    </Typography>
                    <Typography
                      variant={!isMobile ? "body1" : "body2"}
                      color="text.secondary"
                    >
                      {addBankInformations.bankName
                        ? addBankInformations.bankName
                        : "ABC Bank"}
                    </Typography>
                  </Box>
                  {/* IFSC */}
                  <Box
                    bgcolor={theme.palette.background.default}
                    className={styles.infoContentBox}
                  >
                    <Typography
                      variant={!isMobile ? "body1" : "body2"}
                      color="secondary"
                    >
                      IFSC
                    </Typography>
                    <Typography
                      variant={!isMobile ? "body1" : "body2"}
                      color="text.secondary"
                    >
                      {addBankInformations.bankIFSC
                        ? addBankInformations.bankIFSC
                        : "ABC123456"}
                    </Typography>
                  </Box>
                  {/* Account Holder */}
                  <Box
                    bgcolor={theme.palette.background.default}
                    className={styles.infoContentBox}
                  >
                    <Typography
                      variant={!isMobile ? "body1" : "body2"}
                      color="secondary"
                    >
                      Account Holder Name
                    </Typography>
                    <Typography
                      variant={!isMobile ? "body1" : "body2"}
                      color="text.secondary"
                    >
                      {addBankInformations.bankAccountHolderName
                        ? addBankInformations.bankAccountHolderName
                        : "John Doe"}
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            ) : null}
          </Box>
        </Grid>
      </Grid>
      {!isMobile && (
        <Box>
          <Suspense fallback={<ModalSkeletons width={500} />}>
            <BankInfoModal
              open={openBankInfoModal}
              handleClose={handleCloseBankInfoModal}
              bankInformation={bankInformation}
              handleEdit={handleEdit}
              handleBankInformationChange={handleBankInformationChange}
            />
          </Suspense>
        </Box>
      )}
      {!isMobile && (
        <Box>
          <Suspense fallback={<ModalSkeletons width={500} />}>
            <AddBankModal
              open={openAddBankModal}
              handleClose={handleCloseAddBankModal}
              handleAddBankInformationChange={handleAddBankInformationChange}
              addBankInformation={addBankInformations}
            />
          </Suspense>
        </Box>
      )}
      {isMobile && (
        <MobileNavDrawer
          handleClickMenu={handleClickMenu}
          drawerOpen={openBankInfoModal}
          handleDrawerToggle={handleBankInfoDrawer}
          topBarContent={"Edit Bank Info"}
        >
          <Suspense fallback={<ComponentLoader />}>
            <BankInfoModalMobile
              bankInformation={bankInformation}
              handleEdit={handleEdit}
              handleBankInformationChange={handleBankInformationChange}
            />
          </Suspense>
        </MobileNavDrawer>
      )}
      {isMobile && (
        <MobileNavDrawer
          handleClickMenu={handleClickMenu}
          drawerOpen={openAddBankModal}
          handleDrawerToggle={handleAddBankDrawer}
          topBarContent={"Add Bank Info"}
        >
          <Suspense>
            <AddBankModalMobile
              handleClose={handleCloseAddBankModal}
              handleAddBankInformationChange={handleAddBankInformationChange}
              addBankInformation={addBankInformations}
            />
          </Suspense>
        </MobileNavDrawer>
      )}
    </React.Fragment>
  );
};

export default BankInfo;
