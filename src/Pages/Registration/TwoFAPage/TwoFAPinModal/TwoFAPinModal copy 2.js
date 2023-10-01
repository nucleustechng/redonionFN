import React, { useState, useRef, useEffect } from "react";
import { Modal, Stack, Typography, useMediaQuery, Snackbar, Alert, IconButton, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";

import Close from "@mui/icons-material/Close";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";

import useUser from "../../../../hooks/useUser";


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
  const [code, setCode] = useState("");

  const [checkStatus, setcheckStatus] = useState(false);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  // Send Snackbar
  const [showSendSuccessfullSnackbar, setShowSendSuccessfullSnackbar] =
    useState(false);

  const ref = useRef(null);


  // Authentication
  const { verifyEmail, isLoading, authError } = useUser();

  const handleCloseSendSnackbar = () => {
    setShowSendSuccessfullSnackbar(false);
  };

  const [formError, setFormError] = useState("");
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);

  const RESEND_OPT_URL = "/auth/resend-otp";

  useEffect(() => {
    // ref.current?.inputs[0].focus();

    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes]);

  const resendOTP = () => {
    setLoading(true);
    const email = user?.user?.email;
    axios.post(
      RESEND_OPT_URL,
      JSON.stringify({
        "email": email,
      }),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then((res) => {
      setcheckStatus(true);
      setMinutes(1);
      setSeconds(59);
      setLoading(false)
      setShowSendSuccessfullSnackbar(true)
    }).catch((err) => {
    })
      .finally(() => setLoading(false));



  };

  const handleEmailVerify = (e) => {
    e.preventDefault();
    console.log(code);
    if (code.length < 6) {
      setFormError("Please enter 6 digit code sent to your mailbox!");
    } else {
      setFormError("");
      // verifyEmail(code, navigate);
      console.log(formError);
      if (formError === "success") {
        setShowSendSuccessfullSnackbar(true)
      }
    }
  };


  return (
    <Modal
      disableAutoFocus
      disableEscapeKeyDown
      keepMounted
      open={open}
      onClose={(_, reason) => {
        // if (reason !== "backdropClick") {
          onClose();
        // }
      }}
    >
      <Box className={!isMobile ? styles.modalStyle : styles.modalStyleMobile}>
        <Box

        >
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
              severity="success"
            >
              {checkStatus ? "Email Sent Successfully" : "Email Verification Successful"}
            </Alert>
          </Snackbar>
          {/* <Box
      bgcolor={isMobile ? theme.palette.background.paper : null}
      className={!isMobile ? styles.mainBox : styles.mainBoxMobile}
    > */}
          <Box
            className={!isMobile ? styles.contentBox : ''}
          >
            <Box
              bgcolor={theme.palette.background.paper}
              className={
                !isMobile ? styles.verificationBox : styles.verificationBoxMobile
              }
            >

              {checkStatus ? (
                <>



                  <Typography
                    variant="h3"
                    className={!isMobile ? styles.titleBox : styles.titleBoxMobile}
                    color="secondary"
                    fontWeight={500}
                  >
                    Input OTP
                  </Typography>


                  <Typography
                    color="secondary"
                    variant="caption"
                    mt={!isMobile ? 4 : 8}
                    mb={2}
                    component="p"
                    fontSize={18}
                    textAlign={'center'}
                  >
                    Input the One Time Password sent to

                  </Typography>
                  <Typography
                    color="secondary"
                    variant="caption"
                    mt={!isMobile ? -2 : 8}
                    mb={8}
                    component="p"
                    fontSize={18}
                    textAlign={'center'}
                  >
                    {user?.user?.email}

                  </Typography>
                  <Box component="form" onSubmit={handleEmailVerify}>
                    <Box mt={3} mb={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                      {isMobile ? (
                        <ReactPinField
                          ref={ref}
                          className={styles.pinFieldLightMobile}
                          onComplete={() => { }}
                          length={6}
                          validate={/^[0-9]$/}
                          onChange={setCode}
                          type="text"
                          inputMode="numeric"
                          autoComplete="nope"
                        />
                      ) :
                        (
                          <ReactPinField
                            ref={ref}
                            className={
                              theme.palette.mode === "dark"
                                ? styles.pinFieldDark
                                : styles.pinFieldLight
                            }
                            onComplete={() => { }}
                            length={6}
                            validate={/^[0-9]$/}
                            onChange={setCode}
                            type="text"
                            inputMode="numeric"
                            autoComplete="nope"
                          />
                        )}

                    </Box>

                    <Stack direction="row" mx={2} justifyContent="space-between"
                      alignItems="center" mb={4} spacing={0.2}>
                      {seconds > 0 || minutes > 0 ? (
                        <Typography
                          color="secondary"
                          variant="caption"
                          component="span"
                          fontSize={20}
                        // sx={{ textDecoration: "underline" }}
                        >
                          {minutes < 10 ? `0${minutes}` : minutes}:
                          {seconds < 10 ? `0${seconds}` : seconds}
                        </Typography>
                      ) : (
                        <Typography
                          color="secondary"
                          variant="caption"
                          component="span"
                          fontSize={18}
                        >
                          Didn't recieve code?
                        </Typography>
                      )}
                      {loading ? (
                        <LoadingButton
                          loading >
                          Resend OTP
                        </LoadingButton>
                      ) : (
                        <>
                          <Button
                            sx={{ textDecoration: "none", textTransform: "none" }}
                            disabled={seconds > 0 || minutes > 0}

                            onClick={resendOTP}
                          >
                            <Typography

                              style={{
                                color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#3063E9", textDecoration: "none"
                              }}
                              variant="caption"
                              component="span"
                              fontSize={18}
                            >
                              Resend OTP
                            </Typography>
                          </Button>
                        </>
                      )}
                    </Stack>
                    <Typography my={1} fontSize={20} variant="small" color="error">
                      {formError}
                    </Typography>
                    {authError && (
                      <Typography
                        sx={{
                          display: "inline-block",
                          textTransform: "capitalize",
                        }}
                        my={1}
                        textAlign={"center"}
                        fontSize={20}
                        variant="small"
                        color="error"
                      >
                        {/* {authError.slice(22, -2).split("-").join(" ")} */}
                        {authError}
                      </Typography>
                    )}
                    <Stack mt={4} mb={2}>
                      {isLoading ? (
                        <LoadingButton
                          style={{ height: 60, borderRadius: 10, fontSize: 20, textTransform: 'none' }}
                          loading variant="outlined">
                          Sign Up
                        </LoadingButton>
                      ) : (
                        <>
                          <Button
                            type="submit"
                            style={{ height: 60, borderRadius: 10, fontSize: 20, textTransform: 'none' }}
                            color="primary"
                            variant="contained"
                            fullWidth
                          >
                            Verify OTP{'  '} <LazyImageComponent src={FrontArrow} />
                          </Button>
                        </>
                      )}
                    </Stack>
                  </Box>


                </>

              ) : (
                <>
                  <Box >
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
                        2FA successful
                    </Typography>


                    <Typography
                      color="secondary"
                      variant="caption"
                      mt={!isMobile ? 4 : 8}
                      mb={2}
                      component="p"
                      fontSize={16}
                      textAlign={'center'}
                    >
                        You have successfully set up your 2 Factor Authentication.

                    </Typography>





                  </Box>
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