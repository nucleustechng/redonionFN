import React, { Suspense, useEffect, useState } from "react";
import { Box } from "@mui/system";

// Styles
import styles from "./Account.module.css";

import {
  Alert,
  Divider,
  IconButton,
  Snackbar,
  useMediaQuery,
  useTheme,
  Typography,
  Button,
  Slide,
} from "@mui/material";

import MobileNavDrawerPermanent from "../../../components/Layout/MobileNavDrawerPermanent";

// Component Loader
import { ComponentSkeleton } from "../../../components/Skeletons/ComponentSkeletons";
// Component Loader
import { AccountCardSkeletons } from "../../../components/Skeletons/ComponentSkeletons";
import useAuth from "../../../hooks/useAuth";
import TwoFAPinModal from "../../Registration/TwoFAPage/TwoFAPinModal/TwoFAPinModal";
import AuthenticatorModal from "../../Registration/TwoFAPage/TwoFAPinModal/AutheticatorAppModal";
import AuthProgress from "../../../components/AuthProgress/AuthProgress";
import Close from "@mui/icons-material/Close";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";

import RemoveIcon from "@mui/icons-material/Remove";

// Component Loader
import ComponentLoader from "../../../components/ProgressLoader/ComponentLoader";
import { LightUIButtonPrimary } from "../../../Utilities/LightUIButtons";
import MobileNavDrawer from "../../../components/Layout/MobileNavDrawer";
import { ModalSkeletons } from "../../../components/Skeletons/ComponentSkeletons";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import TwoFA from "../../../assets/Scan.svg";
import PasswordSquare from "../../../assets/MoreSquare.svg";
import AccountDetails from "../../../assets/AccountDetails.svg";
import Wallet from "../../../assets/Wallet.svg";
import DeleteIcon from "../../../assets/delete.svg";
import LogoutIcon from "../../../assets/logout.svg";
import SendConfirmationModal from "../../CoinDetails/SendConfirmationModal";
import link from "../../../assets/link.svg";
import CopyToClipboard from "react-copy-to-clipboard";
import axios from "../../../api/axios.js";
import { useNavigate } from "react-router-dom";
import SecretKeysModal from "./OtherOptions/SecretKeys.js";


// Lazy Components
const DeleteAccountModal = React.lazy(() =>
  import("./OtherOptions/DeleteAccountModal.js")
);
const DeleteAccountModalMobile = React.lazy(() =>
  import("./OtherOptions/DeleteAccountModalMobile")
);
const ChangePasswordModal = React.lazy(() =>
  import("./OtherOptions/ChangePasswordModal")
);
const AccountModal = React.lazy(() =>
  import("./OtherOptions/ChangeAccountModal")
);
const WalletModal = React.lazy(() => import("./OtherOptions/WalletModal"));
const ChangePasswordModalMobile = React.lazy(() =>
  import("./OtherOptions/ChangePasswordModalMobile")
);

const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const LogOutModal = React.lazy(() =>
  import("../../../Pages/SupportPage/Support/LogOutModal")
);

// Lazy Components
const ProfileInfo = React.lazy(() => import("./ProfileInfo/ProfileInfo"));
const BankInfo = React.lazy(() => import("./BankInfo/BankInfo"));
const KYCInfo = React.lazy(() => import("./KYCInfo/KYCInfo"));
const OtherOptions = React.lazy(() => import("./OtherOptions/OtherOptions"));

const Account = () => {
  const [showPin, setShowPin] = useState(false);
  const [showAutheticate, setShowAutheticate] = useState(false);
  const [openAuthProgressModal, setOpenAuthProgressModal] = useState(true);
  const [showAuthenticationSnackbar, setShowAuthenticationSnackbar] =
    useState(false);

  const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState(false);
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const [openTransactionPinModal, setOpenTransactionPinModal] = useState(false);

  const [openAccountModal, setOpenAccountModal] = useState(false);

  const [openKeysModal, setOpenKeysModal] = useState(false);


  const [openWalletModal, setOpenWalletModal] = useState(false);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  // Menu
  const [anchorElMenu, setAnchorElMenu] = React.useState(null);

  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };


  const [expanded, setExpanded] = React.useState(false);
  const [expanded1, setExpanded1] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [blockchain , setBlockchain] = useState([])
  const [blockchainIds , setBlockchainIds] = useState()




  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const openMenu = Boolean(anchorElMenu);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const CREATE_BLOCKCHAIN_URL = "/user/blockchains";

  const navigate = useNavigate();


  useEffect (()=> {
    setLoading(true);

    axios
      .get(
        CREATE_BLOCKCHAIN_URL,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log("blockchain", res.data.data.blockchains);
        setBlockchain(res.data.data.blockchains)
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          navigate("/account");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, navigate])


  const handleCloseTwoFAPin = () => {
    if (user?.user?.twoFactorAuthType !== "EMAIL_OTP") {
      setShowPin(!showPin);
    }
  };

  const handleCloseAutheticate = () => {
    if (user?.user?.twoFactorAuthType !== "2FA_OTP") {
      setShowAutheticate(!showAutheticate);
    }
  };

  const handleWallet = () => {
    setOpenWalletModal(!openWalletModal);
  };

  const handleOpenDeleteAccountModal = () => {
    setOpenDeleteAccountModal(!openDeleteAccountModal);
  };

  const handleOpenChangePasswordModal = () => {
    setOpenChangePasswordModal(!openChangePasswordModal);
  };

  const handleOpenAccountModal = () => {
    setOpenAccountModal(!openAccountModal);
  };

  const handleOpenKeysModal = (id) => {
    setOpenKeysModal(!openKeysModal);
    setBlockchainIds(id)
  };

  const handleTransactionPinModal = () => {
    setOpenTransactionPinModal(!openTransactionPinModal);
  };

  const handleDeleteAccountDrawer = () => {
    setOpenDeleteAccountModal(!openDeleteAccountModal);
  };

  const handleChangePasswordDrawer = () => {
    setOpenChangePasswordModal(!openChangePasswordModal);
  };

  // handler for auth progress
  const handleOpenAuthProgressModal = () => {
    // handleCloseTwoFAPin();
    setOpenAuthProgressModal(true);
  };

  const handleCloseAuthProgressModal = () => {
    setOpenAuthProgressModal(false);
  };

  // Handler for authentication successfull snackbar

  const handleCloseAuthenticationSnackbar = () => {
    setShowAuthenticationSnackbar(false);
  };

  const handleClickMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  const handleChange = (panel) => {
    setExpanded(panel);
  };

  const handleOpenSuccessModal = () => {
    setOpenSuccessModal(!openSuccessModal);
  };

  // Close the authorization modal
  useEffect(() => {
    if (openAuthProgressModal) {
      const closeTheAuthorization = setTimeout(() => {
        setOpenAuthProgressModal(false);
        setShowAuthenticationSnackbar(true);
      }, 5000);

      return () => clearTimeout(closeTheAuthorization);
    }
  }, [openAuthProgressModal]);

  return (
    <React.Fragment>
      <Suspense fallback={<ModalSkeletons />}>
        <LogOutModal
          open={openSuccessModal}
          handleClose={handleOpenSuccessModal}
        />
      </Suspense>
      <Suspense fallback={<ModalSkeletons />}>
        <ChangePasswordModal
          open={openChangePasswordModal}
          handleClose={handleOpenChangePasswordModal}
        />
      </Suspense>
      <Suspense fallback={<ModalSkeletons />}>
        <AccountModal
          open={openAccountModal}
          handleClose={handleOpenAccountModal}
        />
      </Suspense>
      <Suspense fallback={<ModalSkeletons />}>
        <SecretKeysModal
          open={openKeysModal}
          handleClose={handleOpenKeysModal}
          blockchainIds={blockchainIds}
        />
      </Suspense>

      <Suspense fallback={<ModalSkeletons />}>
        <SendConfirmationModal
          open={openTransactionPinModal}
          onClose={handleTransactionPinModal}
        />
      </Suspense>

      {/* {!isMobile && ( */}
      <Suspense fallback={<ModalSkeletons />}>
        <WalletModal open={openWalletModal} handleClose={handleWallet} />
      </Suspense>
      {/* )} */}
      <Suspense fallback={<ModalSkeletons width={500} />}>
        <DeleteAccountModal
          open={openDeleteAccountModal}
          handleClose={handleOpenDeleteAccountModal}
        />
      </Suspense>

      <Suspense fallback={<ModalSkeletons />}>
        <AuthenticatorModal
          open={showAutheticate}
          onClose={handleCloseAutheticate}
        />
      </Suspense>
      {!isMobile && (
        <Box className={styles.mainBox}>
          {/* <Snackbar
        anchorOrigin={
          !isMobile
            ? { vertical: "top", horizontal: "right" }
            : { vertical: "bottom", horizontal: "center" }
        }
        open={showAuthenticationSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseAuthenticationSnackbar}
      >
        <Alert
          action={
            <IconButton
              onClick={handleCloseAuthenticationSnackbar}
              sx={{ mt: -0.5 }}
            >
              <Close sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          }
          icon={<CheckCircleOutline sx={{ fontSize: "1.5rem" }} />}
          sx={!isMobile ? { fontSize: "1rem" } : { width: "100%" }}
          onClose={handleCloseAuthenticationSnackbar}
          severity="success"
        >
          Authentication Successfull!
        </Alert>
      </Snackbar> */}
          {/* <AuthProgress
        open={openAuthProgressModal}
        onClose={handleCloseAuthProgressModal}
      /> */}

          <Box mb={3}>
            <Suspense fallback={<AccountCardSkeletons width={"100%"} />}>
              <ProfileInfo handleClickMenu={handleClickMenu} />
            </Suspense>
          </Box>


          <Accordion
            sx={{ background: theme.palette.background.default }}
            expanded={expanded2}
            onChange={() => {
              setExpanded2(!expanded2);
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Box>
                <LazyImageComponent src={TwoFA} />
              </Box>

              <Typography ml={1.5}>
                Secret Keys
                <Typography fontSize={14} sx={{ color: "text.secondary" }}>
                  Copy Secret Keys
                </Typography>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <>
                {blockchain.map((blockchain, index)=>(
                    <Box
                      display="flex"
                      onClick={() => handleOpenKeysModal(blockchain.id)}
                      sx={{
                        cursor: "pointer",
                        p: 1.5,
                        ml: 3,
                        transition: "background-color 0.3s",
                        "&:hover": {
                          bgcolor: theme.palette.mode === "dark" ? "#333333" : "#E8E8F3", 
                          borderRadius: "6px"
                        },
                      }}
                      key={index}
                      justifyContent="space-between"
                      p={1.5} ml={3}
                    >
                      <Typography fontSize={12}>{blockchain.standard}</Typography>
                      
                    </Box>
                ))}
              </>  
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{ background: theme.palette.background.default }}
            expanded={expanded1}
            onChange={() => {
              setExpanded1(!expanded1);
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Box>
                <LazyImageComponent src={TwoFA} />
              </Box>

              <Typography ml={1.5}>
                2FA
                <Typography fontSize={14} sx={{ color: "text.secondary" }}>
                  Enable your Two Factor Authentication
                </Typography>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                Button
                onClick={handleCloseTwoFAPin}
                sx={{ cursor: "pointer" }}
                p={1.5}
                borderRadius={3}
                bgcolor={
                  user?.user?.twoFactorAuthType === "EMAIL_OTP"
                    ? "#58BD7D"
                    : theme.palette.mode === "dark"
                    ? "#333"
                    : "#E8E8F3"
                }
              >
                <Typography fontSize={14}>Email</Typography>
                <Typography fontSize={12}>
                  An OTP will be sent to your email.
                </Typography>
              </Box>
              <Box
                Button
                onClick={handleCloseAutheticate}
                sx={{ cursor: "pointer" }}
                mt={2}
                p={1.5}
                borderRadius={3}
                bgcolor={
                  user?.user?.twoFactorAuthType === "2FA_OTP"
                    ? "#58BD7D"
                    : theme.palette.mode === "dark"
                    ? "#333"
                    : "#E8E8F3"
                }
              >
                <Typography fontSize={14}>Authenticator app</Typography>
                <Typography fontSize={12}>
                  Generate a code from an authenticator app, e.g. Microsoft or
                  Google Authenticator.
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion
            Button
            onClick={handleOpenChangePasswordModal}
            sx={{ background: theme.palette.background.default }}
            expanded={expanded === "panel2"}
            onChange={() => handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Box>
                <LazyImageComponent src={PasswordSquare} />
              </Box>

              <Typography ml={1.5} sx={{ flexShrink: 0 }}>
                Password
                <Typography fontSize={14} sx={{ color: "text.secondary" }}>
                  Change your Password
                </Typography>
              </Typography>
            </AccordionSummary>
          </Accordion>
          <Accordion
            Button
            onClick={handleOpenAccountModal}
            sx={{ background: theme.palette.background.default }}
            expanded={expanded === "panel3"}
            onChange={() => handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Box>
                <LazyImageComponent src={AccountDetails} />
              </Box>

              <Typography ml={1.5} sx={{ flexShrink: 0 }}>
                Account details
                <Typography fontSize={14} sx={{ color: "text.secondary" }}>
                  Change account number
                </Typography>
              </Typography>
            </AccordionSummary>
          </Accordion>

          <Accordion
            Button
            onClick={handleTransactionPinModal}
            sx={{ background: theme.palette.background.default }}
            expanded={expanded === "panel5"}
            onChange={() => handleChange("panel5")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Box>
                <LazyImageComponent src={AccountDetails} />
              </Box>

              <Typography ml={1.5} sx={{ flexShrink: 0 }}>
                Transaction PIN
                <Typography fontSize={14} sx={{ color: "text.secondary" }}>
                  Create your Transaction PIN
                </Typography>
              </Typography>
            </AccordionSummary>
          </Accordion>
          {/* <Accordion
        Button
        onClick={handleWallet}
        sx={{ background: theme.palette.background.default }} expanded={expanded === 'panel4'} onChange={() => handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Box>
            <LazyImageComponent
              src={Wallet}
            />
          </Box>

          <Typography ml={1.5} sx={{ flexShrink: 0 }}>
            Connect Wallet
            <Typography fontSize={14} sx={{ color: 'text.secondary' }}>Connect your crypto wallet</Typography>
          </Typography>
        </AccordionSummary>
      </Accordion> */}
          <Accordion
            Button
            onClick={handleOpenDeleteAccountModal}
            sx={{ background: theme.palette.background.default }}
            expanded={expanded === "panel5"}
            onChange={() => handleChange("panel5")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel5bh-content"
              id="panel5bh-header"
            >
              <Box>
                <LazyImageComponent src={DeleteIcon} />
              </Box>

              <Typography ml={1.5}>
                Delete Account
                <Typography fontSize={14} sx={{ color: "text.secondary" }}>
                  Deleting account will lead to complete loss of this account.
                </Typography>
              </Typography>
            </AccordionSummary>
          </Accordion>

          {/* {!isMobile ? ( */}

          {/* // ) : (
      //   <MobileNavDrawer
      //     handleClickMenu={handleClickMenu}
      //     drawerOpen={openDeleteAccountModal}
      //     handleDrawerToggle={handleDeleteAccountDrawer}
      //     topBarContent={"Delete Account"}
      //   >
      //     <Suspense fallback={<ComponentLoader />}>
      //       <DeleteAccountModalMobile
      //         open={openDeleteAccountModal}
      //         handleClose={handleOpenDeleteAccountModal}
      //       />
      //     </Suspense>
      //   </MobileNavDrawer>
      // )} */}
          {/* {!isMobile ? ( */}

          {/* ) : (
        <MobileNavDrawer
          handleClickMenu={handleClickMenu}
          drawerOpen={openChangePasswordModal}
          handleDrawerToggle={handleChangePasswordDrawer}
          topBarContent={"Change Password"}
        >
          <Suspense fallback={<ComponentLoader />}>
            <ChangePasswordModalMobile
              handleClose={handleOpenChangePasswordModal}
            />
          </Suspense>
        </MobileNavDrawer>
      )} */}

          {/* <Box>
        <Suspense
          fallback={<AccountCardSkeletons width={"100%"} />}
        >
          <BankInfo handleClickMenu={handleClickMenu} />
        </Suspense>
      </Box> */}
          {/* <Divider /> */}
          {/* <Box>
        <Suspense
          fallback={<AccountCardSkeletons width={!isMobile ? "58%" : "100%"} />}
        >
          <KYCInfo handleClickMenu={handleClickMenu} />
        </Suspense>
      </Box> */}
          {/* <Divider /> */}
          {/* <Box>
        <Suspense
          fallback={<AccountCardSkeletons width={!isMobile ? "58%" : "100%"} />}
        >
          <OtherOptions handleClickMenu={handleClickMenu} />
        </Suspense>
      </Box> */}
          {/* {isMobile && (
        <Box>
          <SettingsMenu
            open={openMenu}
            anchorEl={anchorElMenu}
            handleClose={handleCloseMenu}
          />
        </Box>
      )} */}
        </Box>
      )}
      {isMobile && (
        <MobileNavDrawerPermanent user={user}>
          <Box>
            <Suspense fallback={<ComponentSkeleton />}>
              <Box px={2.5} className={styles.mainBox}>
                <Box mb={3}>
                  <Suspense fallback={<AccountCardSkeletons width={"100%"} />}>
                    <ProfileInfo handleClickMenu={handleClickMenu} />
                  </Suspense>
                </Box>

                <Accordion
                  sx={{ background: theme.palette.background.default }}
                  expanded={expanded2}
                  onChange={() => {
                    setExpanded2(!expanded2);
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Box>
                      <LazyImageComponent src={TwoFA} />
                    </Box>

                    <Typography ml={1.5}>
                      Secret Keys
                      <Typography fontSize={14} sx={{ color: "text.secondary" }}>
                        Copy Secret Keys
                      </Typography>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <>
                      
                      {blockchain.map((blockchain, index)=>(
                        <Box
                          display="flex"
                          onClick={() => handleOpenKeysModal(blockchain.id)}
                          sx={{
                            cursor: "pointer",
                            p: 1.5,
                            ml: 3,
                            transition: "background-color 0.3s",
                            "&:hover": {
                              backgroundColor: "#333333", 
                              borderRadius: "6px"
                            },
                          }}
                          key={index}
                          justifyContent="space-between"
                          p={1.5} ml={3}
                        >
                          <Typography fontSize={12}>{blockchain.standard}</Typography>
                          
                        </Box>
                      ))}
                    </>                    
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  sx={{ background: theme.palette.background.default }}
                  expanded={expanded1}
                  onChange={() => {
                    setExpanded1(!expanded1);
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Box>
                      <LazyImageComponent src={TwoFA} />
                    </Box>

                    <Typography ml={1.5}>
                      2FA
                      <Typography
                        fontSize={14}
                        sx={{ color: "text.secondary" }}
                      >
                        Enable your Two Factor Authentication
                      </Typography>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box
                      Button
                      onClick={handleCloseTwoFAPin}
                      sx={{ cursor: "pointer" }}
                      p={1.5}
                      borderRadius={3}
                      bgcolor={
                        user?.user?.twoFactorAuthType === "EMAIL_OTP"
                          ? "#58BD7D"
                          : theme.palette.mode === "dark"
                          ? "#333"
                          : "#E8E8F3"
                      }
                    >
                      <Typography fontSize={14}>Email</Typography>
                      <Typography fontSize={12}>
                        An OTP will be sent to your email.
                      </Typography>
                    </Box>
                    <Box
                      Button
                      onClick={handleCloseAutheticate}
                      sx={{ cursor: "pointer" }}
                      mt={2}
                      p={1.5}
                      borderRadius={3}
                      bgcolor={
                        user?.user?.twoFactorAuthType === "2FA_OTP"
                          ? "#58BD7D"
                          : theme.palette.mode === "dark"
                          ? "#333"
                          : "#E8E8F3"
                      }
                    >
                      <Typography fontSize={14}>Authenticator app</Typography>
                      <Typography fontSize={12}>
                        Generate a code from an authenticator app, e.g.
                        Microsoft or Google Authenticator.
                      </Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  Button
                  onClick={handleOpenChangePasswordModal}
                  sx={{ background: theme.palette.background.default }}
                  expanded={expanded === "panel2"}
                  onChange={() => handleChange("panel2")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                  >
                    <Box>
                      <LazyImageComponent src={PasswordSquare} />
                    </Box>

                    <Typography ml={1.5} sx={{ flexShrink: 0 }}>
                      Password
                      <Typography
                        fontSize={14}
                        sx={{ color: "text.secondary" }}
                      >
                        Change your Password
                      </Typography>
                    </Typography>
                  </AccordionSummary>
                </Accordion>
                <Accordion
                  Button
                  onClick={handleOpenAccountModal}
                  sx={{ background: theme.palette.background.default }}
                  expanded={expanded === "panel3"}
                  onChange={() => handleChange("panel3")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                  >
                    <Box>
                      <LazyImageComponent src={AccountDetails} />
                    </Box>

                    <Typography ml={1.5} sx={{ flexShrink: 0 }}>
                      Account details
                      <Typography
                        fontSize={14}
                        sx={{ color: "text.secondary" }}
                      >
                        Change account number
                      </Typography>
                    </Typography>
                  </AccordionSummary>
                </Accordion>

                <Accordion
                  Button
                  onClick={handleTransactionPinModal}
                  sx={{ background: theme.palette.background.default }}
                  expanded={expanded === "panel5"}
                  onChange={() => handleChange("panel5")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                  >
                    <Box>
                      <LazyImageComponent src={AccountDetails} />
                    </Box>
                    <Typography ml={1.5} sx={{ flexShrink: 0 }}>
                      Transaction PIN
                      <Typography
                        fontSize={14}
                        sx={{ color: "text.secondary" }}
                      >
                        Create your Transaction PIN
                      </Typography>
                    </Typography>
                  </AccordionSummary>
                </Accordion>
                {/* <Accordion
        Button
        onClick={handleWallet}
        sx={{ background: theme.palette.background.default }} expanded={expanded === 'panel4'} onChange={() => handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Box>
            <LazyImageComponent
              src={Wallet}
            />
          </Box>

          <Typography ml={1.5} sx={{ flexShrink: 0 }}>
            Connect Wallet
            <Typography fontSize={14} sx={{ color: 'text.secondary' }}>Connect your crypto wallet</Typography>
          </Typography>
        </AccordionSummary>
      </Accordion> */}
                <Accordion
                  Button
                  onClick={handleOpenDeleteAccountModal}
                  sx={{ background: theme.palette.background.default }}
                  expanded={expanded === "panel5"}
                  onChange={() => handleChange("panel5")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel5bh-content"
                    id="panel5bh-header"
                  >
                    <Box>
                      <LazyImageComponent src={DeleteIcon} />
                    </Box>

                    <Typography ml={1.5}>
                      Delete Account
                      <Typography
                        fontSize={14}
                        sx={{ color: "text.secondary" }}
                      >
                        Deleting account will lead to complete loss of this
                        account.
                      </Typography>
                    </Typography>
                  </AccordionSummary>
                </Accordion>

                <Accordion
                  Button
                  onClick={() => setOpenSuccessModal(true)}
                  sx={{ background: theme.palette.background.default }}
                  expanded={expanded === "panel6"}
                  onChange={() => handleChange("panel6")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel5bh-content"
                    id="panel5bh-header"
                  >
                    <Box>
                      <LazyImageComponent
                        style={{ width: 20 }}
                        src={LogoutIcon}
                      />
                    </Box>

                    <Typography ml={1.5}>Log Out</Typography>
                  </AccordionSummary>
                </Accordion>
              </Box>
            </Suspense>
          </Box>
        </MobileNavDrawerPermanent>
      )}

      <Snackbar
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
        TransitionComponent={Slide} 
        open={showSnackbar}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
        >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
        >
          Key Copied!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default Account;
