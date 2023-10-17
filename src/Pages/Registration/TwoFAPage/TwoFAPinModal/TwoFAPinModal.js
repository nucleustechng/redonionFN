import React, { useState, useRef, useEffect } from "react";
import { Modal, Tooltip, Zoom,  Stack, Input, Typography, useMediaQuery, Snackbar, Alert, IconButton, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";

import Close from "@mui/icons-material/Close";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

import { useNavigate } from "react-router-dom";
// Axios
import axios from "../../../../api/axios";

import { LoadingButton } from "@mui/lab";

import successClock from "../../../../assets/clockSuccess.svg";

// Styles
import styles from "./TwoFAPinModal.module.css";
import { ReactPinField } from "react-pin-field";

// Logos
import ReusableVectorLogo from "../../../../assets/mainLogo.svg";
import useAuth from "../../../../hooks/useAuth";

import Back from "../../../../assets/backArrow.svg";
import FrontArrow from "../../../../assets/frontArrow.svg";

// Lazy image loader
const LazyImageComponent = React.lazy(() =>
  import("../../../../components/LazyImageComponent/LazyImageComponent")
);

const TwoFAPinModal = ({ open, onClose, openAuthorizationModal }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [payTextField, setPayTextField] = useState("");

  const [checkStatus, setcheckStatus] = useState(0);

  const [showMsg, setShowMsg] = useState("");

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  // Send Snackbar
  const [showSendSuccessfullSnackbar, setShowSendSuccessfullSnackbar] =
    useState(false);

  const ref = useRef(null);



  const handleCloseSendSnackbar = () => {
    setShowSendSuccessfullSnackbar(false);
  };

  const [userAuth, setUserAuth] = useState("");

  const AUTH_TWO_URL = "/auth/enable-two-factor-auth";

  const VERIFY_AUTH_TWO_URL = "/auth/verify-otp/";

  useEffect(() => {



  }, []);

  const authApp = () => {
    setLoading(true);

    axios.post(
      AUTH_TWO_URL,
      JSON.stringify({
        twoFactorAuthType: "EMAIL_OTP",
        twoFactorEnabled: true
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }
      }
    ).then((res) => {
      console.log(res.data);
      setUserAuth(res.data.data);
      setcheckStatus(1)
      // setcheckStatus(true);
    }).catch((err) => {
      if (err?.response?.status === 401) {
        navigate("/user/sign-in")
      }
    })
      .finally(() => setLoading(false));



  };

  const verifyAuthApp = () => {

    if (payTextField.length === "") {
      // setShowMsg(1)
      // setShowSendSuccessfullSnackbar(true);
      return;
    }


    setLoading(true);

    axios.get(
      VERIFY_AUTH_TWO_URL + payTextField,
      
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }
      }
    ).then((res) => {
      console.log(res.data.data);
      if (res.data.data === null || res.data.data === "") {
        setShowMsg(2)
        setShowSendSuccessfullSnackbar(true);

      } else {
        const user1 = res.data.data.user;
        const token = res.data.data.token;
        const country = user.country;
        const currency = user.currency;
        const newUser = { token, user: user1, country, currency };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        setcheckStatus(2)
      }

    }).catch((err) => {
      if (err?.response?.status === 401) {
        navigate("/user/sign-in")
      } else {
        setShowMsg(2)
        setShowSendSuccessfullSnackbar(true);
      }
    })
      .finally(() => setLoading(false));



  };


  return (
    <Modal
      disableAutoFocus
      disableEscapeKeyDown
      keepMounted
      sx={{
        overflow: "scroll",
        marginTop: isMobile ? 10 : 0,
        marginLeft: isMobile ? 2 : 0,
        marginRight: isMobile ? 2 : 0,
      }}
      open={open}
      onClose={(_, reason) => {
        onClose();
      }}
    >
      <Box className={!isMobile ? styles.modalStyle : styles.modalStyleMobile}>
        <Box>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={showSendSuccessfullSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSendSnackbar}
          >
            <Alert
              action={
                <IconButton onClick={handleCloseSendSnackbar} sx={{ mt: -0.5 }}>
                  <Close sx={{ fontSize: "1.5rem" }} />
                </IconButton>
              }
              icon={<CheckCircleOutline sx={{ fontSize: "1.5rem" }} />}
              sx={{ fontSize: "1rem" }}
              onClose={handleCloseSendSnackbar}
              severity={showMsg === 1 || showMsg === 2 ? "error" : "success"}
            >
              {showMsg === 1
                ? "Your code must be 6 digit long"
                : "Sorry, invalid OTP"}
            </Alert>
          </Snackbar>
          {/* <Box
      bgcolor={isMobile ? theme.palette.background.paper : null}
      className={!isMobile ? styles.mainBox : styles.mainBoxMobile}
    > */}
          <Box className={!isMobile ? styles.contentBox : ""}>
            <Box
              bgcolor={theme.palette.background.paper}
              className={
                !isMobile
                  ? styles.verificationBox
                  : styles.verificationBoxMobile
              }
            >
              <Box className={styles.modalTopBar}>
                {/* <IconButton color="secondary" onClick={() => {
                  setcheckStatus(0);
                  onClose()
                }}>
                  <Tooltip
                    placement="right"
                    TransitionComponent={Zoom}
                    title="Close"
                  >
                    <CloseIcon fontSize="medium" />
                  </Tooltip>
                </IconButton> */}
              </Box>
              <Typography
                variant="h3"
                className={!isMobile ? styles.titleBox : styles.titleBoxMobile}
                color="secondary"
                fontWeight={500}
              >
                Enable Email Authetication
              </Typography>

              {checkStatus === 0 ? (
                <>
                  <Typography
                    color="secondary"
                    variant="caption"
                    mt={!isMobile ? 4 : 8}
                    mb={4}
                    component="p"
                    fontSize={16}
                    textAlign={"center"}
                  >
                    Do you want to enable Two-factor authentication vis email?
                  </Typography>
                  <Box>
                    <Stack mt={4} mb={2}>
                      {loading ? (
                        <LoadingButton
                          style={{
                            height: 60,
                            borderRadius: 10,
                            fontSize: 20,
                            textTransform: "none",
                          }}
                          loading
                          variant="outlined"
                        >
                          Sign Up
                        </LoadingButton>
                      ) : (
                        <>
                          <Button
                            onClick={authApp}
                            style={{
                              height: 60,
                              borderRadius: 10,
                              fontSize: 20,
                              textTransform: "none",
                            }}
                            color="primary"
                            variant="contained"
                            fullWidth
                          >
                            Continue{"  "}
                          </Button>
                        </>
                      )}
                    </Stack>
                  </Box>
                </>
              ) : (
                <>
                  {checkStatus === 1 ? (
                    <>
                      <Box>
                        <Typography
                          variant="h3"
                          mt={3}
                          color="secondary"
                          fontWeight={500}
                          fontSize={18}
                        >
                          Enter the Code generated by the App
                        </Typography>

                        <Box borderRadius={2} mt={4} height={50}>
                          <Stack direction="row" justifyItems={"center"}>
                            <Input
                              fullWidth
                              name="payInput"
                              value={payTextField}
                              type="number"
                              onChange={(e) => setPayTextField(e.target.value)}
                              placeholder="Verification Code"
                              disableUnderline
                              className={
                                theme.palette.mode === "dark"
                                  ? "inputField"
                                  : styles.inputFieldLight
                              }
                            />
                          </Stack>
                        </Box>

                        <Stack mt={4} mb={2}>
                          {loading ? (
                            <LoadingButton
                              style={{
                                height: 60,
                                borderRadius: 10,
                                fontSize: 20,
                                textTransform: "none",
                              }}
                              loading
                              variant="outlined"
                            >
                              Sign Up
                            </LoadingButton>
                          ) : (
                            <>
                              <Button
                                onClick={verifyAuthApp}
                                style={{
                                  height: 60,
                                  borderRadius: 10,
                                  fontSize: 20,
                                  textTransform: "none",
                                }}
                                color="primary"
                                variant="contained"
                                fullWidth
                              >
                                Verify Code
                              </Button>
                            </>
                          )}
                        </Stack>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box mt={4}>
                        <center>
                          <LazyImageComponent src={successClock} />
                        </center>
                        {/* <Typography
                              variant="h3"
                              mt={!isMobile ? 4 : 8}
                              className={!isMobile ? styles.titleBox : styles.titleBoxMobile}
                              color="secondary"
                              fontWeight={500}
                            >
                              2FA successfu
                            </Typography> */}

                        <Typography
                          color="secondary"
                          variant="caption"
                          mt={!isMobile ? 4 : 8}
                          mb={2}
                          component="p"
                          fontSize={16}
                          textAlign={"center"}
                        >
                          You have successfully set up your Two Factor
                          Authentication.
                        </Typography>
                      </Box>
                    </>
                  )}
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};


export default TwoFAPinModal;
