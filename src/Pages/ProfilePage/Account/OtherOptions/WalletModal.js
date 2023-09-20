import React, { useState } from "react";
import {
  Divider,
  Zoom,
  IconButton,
  Modal,
  Tooltip,
  Typography,
  Button,
  Stack,
  InputAdornment,
  Input,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LightUIButtonPrimary } from "../../../../Utilities/LightUIButtons";
import { LoadingButton } from "@mui/lab";
import ReportIcon from "@mui/icons-material/Report";
// Styles
import styles from "../Account.module.css";

// Logout authentication
import useAuth from "../../../../hooks/useAuth";

import successClock from "../../../../assets/clockSuccess.svg";
import FrontArrow from "../../../../assets/frontArrow.svg";
import Back from "../../../../assets/backArrow.svg";
import Binanace from "../../../../assets/binance.svg";
import Trust from "../../../../assets/trust.svg";
import MetaMask from "../../../../assets/metamask.svg";
import Coinbase from "../../../../assets/coinbase.svg";
import WalletConnect from "../../../../assets/walletconnect.svg";
import DangerTri from "../../../../assets/Danger.svg";

// Lazy image loader
const LazyImageComponent = React.lazy(() =>
  import("../../../../components/LazyImageComponent/LazyImageComponent")
);

const ChangePasswordModal = ({ open, handleClose }) => {
  const [userPassword, setUserPassword] = useState({});
  const [step, setStep] = useState(1);
  const [passError, setPassError] = useState("");
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [showPasswordConfirmed, setShowPasswordConfirmed] = useState(false);
  const [userAccountNumber, setAccountNumber] = useState("");
  const [userBank, setUserBank] = useState("");

  const [loading, setLoading] = useState(false);

  const { logOut } = useAuth();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));



  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));


  const handleChangePassword = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    const newUserPassword = { ...userPassword };
    newUserPassword[field] = value;
    setUserPassword(newUserPassword);
  };

  const handleSubmitUserPassword = (e) => {
    e.preventDefault();

    if (userPassword.passwordNew !== userPassword.passwordNewConfirmed) {
      setPassError("Password doesn't match!");
    } else if (!userPassword.passwordNew) {
      setPassError("You can't save unless you enter a new password");
    } else {
      setPassError("");
      setUserPassword({});
      handleClose();
      logOut();
    }
  };

  return (
    <Modal
      disableAutoFocus
      disableEnforceFocus
      keepMounted
      open={open}
      onClose={handleClose}
    >
      <Box
        bgcolor="background.paper"
        className={styles.changePasswordModalBody}
      >

        {step === 1 ? (
          <Box>
            <Box className={styles.modalTopBar}>

              <IconButton color="secondary" onClick={handleClose}>
                <Tooltip
                  placement="right"
                  TransitionComponent={Zoom}
                  title="Close Modal"
                >
                  <CloseIcon fontSize="medium" />
                </Tooltip>
              </IconButton>
            </Box>
            <Typography
              variant="h3"
              className={!isMobile ? styles.titleBox : styles.titleBoxMobile}
              color="secondary"
              fontWeight={500}

            >
              Connect your wallet
            </Typography>

            <Typography
              color="secondary"
              variant="caption"
              mt={!isMobile ? 2 : 8}
              mb={1}
              component="p"
              fontSize={14}
              textAlign={'center'}
            >
              Start by connecting with one of the wallets below. Be sure to store your private keys or seed phrase securely.

            </Typography>
            <Box p={1.2} mr={3} ml={3} borderRadius={2} mt={2} bgcolor={"#e5191920"}>
              <Stack flexDirection={"row"} justifyContent={"center"} alignItems={"center"}>
                <Box mt={0.3} mr={1}>
                  <ReportIcon color="error" fontSize="small" />
                </Box>
                <Typography
                  component="span"
                  variant="caption"
                  color="error"
                >
                  {" "}  Never share them with anyone.
                </Typography>
              </Stack>
            </Box>

            <Box mt={4} pl={3} pr={3} >
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
              >
                <Box>
                  <center>
                    <LazyImageComponent src={Binanace} />
                    <Typography
                      color="secondary"
                      variant="caption"
                      
                      component="p"
                      fontSize={12}
                      textAlign={'center'}
                    >
                      Binance Wallet
                    </Typography>
                  </center>
                </Box>

                <Box>
                  <center>
                    <LazyImageComponent src={Trust} />
                    <Typography
                      color="secondary"
                      variant="caption"

                      component="p"
                      fontSize={12}
                      textAlign={'center'}
                    >
                      Trust Wallet
                    </Typography>
                  </center>
                </Box>

                <Box>
                  <center>
                    <LazyImageComponent src={MetaMask} />
                    <Typography
                      color="secondary"
                      variant="caption"

                      component="p"
                      fontSize={12}
                      textAlign={'center'}
                    >
                      Metamask
                    </Typography>
                  </center>
                </Box>

              </Stack>

            </Box>

            <Box mt={4} mb={2} pl={3} pr={3} >
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
              >
                <Box>
                  <center>
                    <LazyImageComponent src={Coinbase} />
                    <Typography
                      color="secondary"
                      variant="caption"

                      component="p"
                      fontSize={12}
                      textAlign={'center'}
                    >
                      Coinbase Wallet
                    </Typography>
                  </center>
                </Box>

                <Box>
                  <center>
                    <LazyImageComponent src={WalletConnect} />
                    <Typography
                      color="secondary"
                      variant="caption"
                      mt={-2.5}
                      component="p"
                      fontSize={12}
                      textAlign={'center'}
                    >
                      Wallet Connect
                    </Typography>
                  </center>
                </Box>

             

              </Stack>

            </Box>

         

          </Box>
        ) : (
          <>
            {step !== 2 ? (
              <Box>
                <Box className={styles.modalTopBarspace}>
                  <IconButton color="secondary" onClick={handleClose}>
                    <Tooltip
                      placement="right"
                      TransitionComponent={Zoom}
                      title="BAck"
                    >
                      <LazyImageComponent src={Back} />
                    </Tooltip>
                  </IconButton>

                  <IconButton color="secondary" onClick={handleClose}>
                    <Tooltip
                      placement="right"
                      TransitionComponent={Zoom}
                      title="Close Modal"
                    >
                      <CloseIcon fontSize="medium" />
                    </Tooltip>
                  </IconButton>
                </Box>
                <Typography
                  className={styles.titleBox}
                  variant="h3"
                  color="secondaryDark"
                  fontWeight={600}

                >
                    Scan QR code
                </Typography>

                 <Box mt={3}>
                  <center>
                      <LazyImageComponent src={successClock} />
                  </center>
                 </Box>
              </Box>
            ) : (
              <Box pt={4} >
                <center>
                  <LazyImageComponent src={successClock} />
                </center>
                <Typography
                  variant="h3"
                  mt={!isMobile ? 4 : 8}

                  className={!isMobile ? styles.titleBox : styles.titleBoxMobile}
                  color="secondary"
                  fontWeight={500}
                >
                      Wallet connected successfully
                </Typography>


                <Typography
                  color="secondary"
                  variant="caption"
                  mt={!isMobile ? 2 : 8}
                  mb={2}
                  component="p"
                  fontSize={16}
                  textAlign={'center'}
                >
                      You have successfully connected your wallet and can now continue transaction.
                </Typography>





              </Box>
            )}
          </>
        )}


      </Box>
    </Modal>
  );
};

export default ChangePasswordModal;
