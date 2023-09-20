import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/system";
import {
  Button,
  Stack,
  Typography,
  useMediaQuery,
  Input,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ReactPinField } from "react-pin-field";

import Close from "@mui/icons-material/Close";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";

import useUser from "../../../hooks/useUser";

import useAuth from "../../../hooks/useUser";

// Axios
import axios from "../../../api/axios";

// styles
import styles from "./OTPVerification.module.css";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

import Back from "../../../assets/backArrow.svg";
import FrontArrow from "../../../assets/frontArrow.svg";
import bg from "../../../assets/authBg.svg";
import { CodeSharp } from "@mui/icons-material";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const OTPVerification = () => {
  const theme = useTheme();

  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [code, setCode] = useState("");

  const [checkStatus, setcheckStatus] = useState(false);

  const [loading, setLoading] = useState(false);

  const allAuthContext = useAuth();
  // Authentication
  const { verifyEmail, isLoading, authError } = useUser();

  // Send Snackbar
  const [showSendSuccessfullSnackbar, setShowSendSuccessfullSnackbar] =
    useState(false);

  const ref = useRef(null);

  const [formError, setFormError] = useState("");
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);

  const RESEND_OPT_URL = "/auth/resend-otp";

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleCloseSendSnackbar = () => {
    setShowSendSuccessfullSnackbar(false);
  };

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

    axios
      .post(
        RESEND_OPT_URL,
        JSON.stringify({
          email: user?.user?.email,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setcheckStatus(true);
        setMinutes(1);
        setSeconds(59);
        setLoading(false);
        setShowSendSuccessfullSnackbar(true);
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  };

  const handleEmailVerify = (code) => {
    // e.preventDefault();
    console.log(code);
    if (code.length < 6) {
      setFormError("Please enter 6 digit code sent to your mailbox!");
    } else {
      setFormError("");
      verifyEmail(code, navigate);
      console.log(formError);
      if (formError === "success") {
        setShowSendSuccessfullSnackbar(true);
      }
    }
  };

  return (
    <Box
      bgcolor={theme.palette.background.default}
      className={!isMobile ? styles.mainBox : styles.mainBoxMobile}
      style={{
        backgroundImage: `url(${isMobile ? bg : bg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
      }}
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
          {checkStatus
            ? "Email Sent Successfully"
            : "Email Verification Successful"}
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
            !isMobile ? styles.verificationBox : styles.verificationBoxMobile
          }
        >
          <Button
            style={{
              textDecoration: "none",
              color: "inherit",
              textTransform: "none",
              marginLeft: "-20px",
              marginTop: "0",
              marginBottom: "25px",
            }}
            color="secondary"
          >
            <a href="/auth/sign-in">
              <LazyImageComponent src={Back} />
            </a>
          </Button>
          <Typography
            variant="h3"
            className={!isMobile ? styles.titleBox : styles.titleBoxMobile}
            color="secondary"
            fontWeight={500}
          >
            Email Verification
          </Typography>
          <Typography
            color="secondary"
            variant="caption"
            mt={!isMobile ? 4 : 8}
            mb={2}
            component="p"
            fontSize={18}
            textAlign={"center"}
          >
            Input the verification code sent to <br />
            {user?.user.email}
          </Typography>
          {formError && (
            <Box mx={3} mt={3} mb={3}>
              <Alert sx={{ fontSize: "1rem" }} severity="error">
                {formError}
              </Alert>
            </Box>
          )}
          {authError && (
            <Box mx={3} mt={3} mb={3}>
              <Alert sx={{ fontSize: "1rem" }} severity="error">
                {authError}
              </Alert>
            </Box>
          )}
          {/* component="form" onSubmit={handleEmailVerify} */}
          <Box>
            <Box
              mt={3}
              mb={4}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {isMobile ? (
                //  <ReactPinField
                //     ref={ref}
                //     // className={styles.pinFieldLightMobile}
                //     onComplete={() => { }}
                //     length={6}
                //     validate={/^[0-9]$/}
                //     onChange={setCode}
                //     type="text"
                //     inputMode="numeric"
                //     autoComplete="nope"
                //   />

                <Input
                  fullWidth
                  name="payInput"
                  // value={code}
                  type="number"
                  onChange={(e) => {
                    setCode(e.target.value);
                    let coda = e.target.value;
                    if (coda.length === 6) {
                      handleEmailVerify(coda);
                    }
                    //
                  }}
                  placeholder="Verification Code"
                  disableUnderline
                  className={
                    theme.palette.mode === "dark"
                      ? "inputField"
                      : styles.inputFieldLight
                  }
                />
              ) : (
                <ReactPinField
                  ref={ref}
                  className={
                    theme.palette.mode === "dark"
                      ? styles.pinFieldDark
                      : styles.pinFieldLight
                  }
                  onComplete={(code) => handleEmailVerify(code)}
                  length={6}
                  validate={/^[0-9]$/}
                  onChange={setCode}
                  type="text"
                  inputMode="numeric"
                  autoComplete="nope"
                />
              )}
            </Box>

            <Stack
              direction="row"
              mx={2}
              justifyContent="space-between"
              alignItems="center"
              mb={4}
              spacing={0.2}
            >
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
                <LoadingButton loading>Resend OTP</LoadingButton>
              ) : (
                <>
                  <Button
                    sx={{ textDecoration: "none", textTransform: "none" }}
                    disabled={seconds > 0 || minutes > 0}
                    onClick={resendOTP}
                  >
                    <Typography
                      style={{
                        color:
                          seconds > 0 || minutes > 0 ? "#DFE3E8" : "#3063E9",
                        textDecoration: "none",
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

            <Stack mt={4} mb={2}>
              {isLoading ? (
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
                    onClick={handleEmailVerify}
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
                    Verify Account{"  "} <LazyImageComponent src={FrontArrow} />
                  </Button>
                </>
              )}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OTPVerification;
