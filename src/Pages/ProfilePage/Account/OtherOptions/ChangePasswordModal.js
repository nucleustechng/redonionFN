import React, { useState } from "react";
import {
  Snackbar,
  Alert,
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

import Close from "@mui/icons-material/Close";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";

// Styles
import styles from "../Account.module.css";

// Logout authentication
import useAuth from "../../../../hooks/useAuth";

// Axios
import axios from "../../../../api/axios";

import { useNavigate } from "react-router-dom";

import { LoadingButton } from "@mui/lab";

import successClock from "../../../../assets/clockSuccess.svg";

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

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { logOut } = useAuth();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Send Snackbar
  const [showSendSuccessfullSnackbar, setShowSendSuccessfullSnackbar] =
    useState(false);


  const handleCloseSendSnackbar = () => {
    setShowSendSuccessfullSnackbar(false);
  };

  

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;


  const handleChangePassword = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    const newUserPassword = { ...userPassword };
    newUserPassword[field] = value;
    setUserPassword(newUserPassword);
  };

  const handleSubmitUserPassword = (e) => {
    e.preventDefault();
   
    if (!userPassword.passwordOld) {
      setPassError("Current Password cannot be empty!");
    } else if (userPassword?.passwordNew?.length < 8) {
      setPassError("Password must be longer than or equal to 8 characters");
    } else if (!passwordRegex.test(userPassword.passwordNew)) {
      setPassError("Password must contain atleast one uppercase letter, one lowercase letter, a number and a special character!");
    } else if (userPassword.passwordNew !== userPassword.passwordNewConfirmed) {
      setPassError("Password doesn't match!");
    } else {
      verifyAuthApp(userPassword.passwordNew, userPassword.passwordOld);
      
      // handleClose();
      // logOut();
    }
  };
  const CHANGE_PASSWORD_URL = "/user/change-password";
  const verifyAuthApp = (newPassword, oldPassword) => {

    
    setLoading(true);

    axios.post(
      CHANGE_PASSWORD_URL,
      JSON.stringify({
        newPassword: newPassword,
        oldPassword: oldPassword
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }
      }
    ).then((res) => {
      console.log(res.data);
     
        setStep(2)
      
      setPassError("");
      setUserPassword({});

    }).catch((err) => {
      if (err?.response?.status === 401) {
        navigate("/user/sign-in")
      } else {
        console.log(err)
        setShowSendSuccessfullSnackbar(true)
      }
    })
      .finally(() => setLoading(false));



  };

  return (
    <Modal
      disableAutoFocus
      disableEnforceFocus
      keepMounted
      open={open}
      sx={{ overflow: "scroll", marginTop: isMobile ? 10 : 0, marginLeft: isMobile ?  2 : 0, marginRight: isMobile ? 2 : 0 }}
      onClose={handleClose}
    >
      <Box
        bgcolor="background.paper"
        className={!isMobile ? styles.changePasswordModalBody : ""}
        p={isMobile ? 3 : 0}
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
            severity={"error"}
          >
            {"Failed to change password"}
          </Alert>
        </Snackbar>
        <Box className={styles.modalTopBar}>
          <IconButton color="secondary" onClick={handleClose}>
            <Tooltip
              placement="right"
              TransitionComponent={Zoom}
              title="Close"
            >
              <CloseIcon fontSize="medium" />
            </Tooltip>
          </IconButton>
        </Box>
        {/* {step === 1 ? (
           <Box>
              <Typography
                variant="h3"
                className={!isMobile ? styles.titleBox : styles.titleBoxMobile}
                color="secondary"
                fontWeight={500}
                
              >
                Verify your password change
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
                Click the link sent to  {user?.user?.email}
                to verify your password change.

              </Typography>
          </Box>
        ) : (
          <> */}
        {step === 1 ? (
          <Box>
            <Box mt={-4}>
              <Typography variant="h6" component="h2">
                Change Password
              </Typography>
            </Box>

            <Box
              component="form"
              onSubmit={handleSubmitUserPassword}
              className={styles.changePasswordModalContentBox}
            >
              <Stack spacing={1} mb={2}>
                <Typography
                  variant="body2"
                  color={
                    theme.palette.mode === "dark"
                      ? "text.secondary"
                      : "common.black"
                  }
                >
                  Current Password
                </Typography>
                <Input
                  disableUnderline
                  className={styles.inputField}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPasswordCurrent(!showPasswordCurrent)
                        }
                      >
                        {showPasswordCurrent ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  name="passwordOld"
                  onChange={handleChangePassword}
                  type={showPasswordCurrent ? "text" : "password"}
                  variant="filled"
                  color="secondary"
                  size="small"
                />
              </Stack>
              <Stack spacing={1} mb={2}>
                <Typography
                  variant="body2"
                  color={
                    theme.palette.mode === "dark"
                      ? "text.secondary"
                      : "common.black"
                  }
                >
                  Create A Password
                </Typography>
                <Input
                  disableUnderline
                  className={styles.inputField}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPasswordNew(!showPasswordNew)}
                      >
                        {showPasswordNew ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  name="passwordNew"
                  onChange={handleChangePassword}
                  type={showPasswordNew ? "text" : "password"}
                  variant="outlined"
                  color="secondary"
                  size="small"
                />
              </Stack>
              <Typography
                variant="h3"
                mt={-1}
                mb={3}
                color="secondary"
                fontWeight={500}
                fontSize={12}
              >
                Your password must be at least 8 characters long and must
                contain a mix of letters, numbers and special characters
              </Typography>
              <Stack spacing={1} mb={2}>
                <Typography
                  variant="body2"
                  color={
                    theme.palette.mode === "dark"
                      ? "text.secondary"
                      : "common.black"
                  }
                >
                  Confirm Password
                </Typography>
                <Input
                  disableUnderline
                  className={styles.inputField}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPasswordConfirmed(!showPasswordConfirmed)
                        }
                      >
                        {showPasswordConfirmed ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  error={passError ? true : false}
                  name="passwordNewConfirmed"
                  onChange={handleChangePassword}
                  type={showPasswordConfirmed ? "text" : "password"}
                  variant="outlined"
                  color="secondary"
                  size="small"
                />
                <Typography variant="caption" color="error">
                  {passError && passError}
                </Typography>
              </Stack>
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
                      type="submit"
                      // onClick={verifyAuthApp}
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
                      Update Password
                    </Button>
                  </>
                )}
              </Stack>
            </Box>
          </Box>
        ) : (
          <Box>
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
              Password change successful
            </Typography>

            <Typography
              color="secondary"
              variant="caption"
              mt={!isMobile ? 2 : 8}
              mb={2}
              component="p"
              fontSize={16}
              textAlign={"center"}
            >
              You have successfully changed your Red Onion log in password.
            </Typography>
          </Box>
        )}
        {/* </>
        )} */}
      </Box>
    </Modal>
  );
};

export default ChangePasswordModal;
