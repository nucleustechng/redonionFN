import React, { useState, useEffect } from "react";
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
  useMediaQuery,
  Snackbar,
  Alert
} from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LightUIButtonPrimary } from "../../../../Utilities/LightUIButtons";
import { LoadingButton } from "@mui/lab";

import Close from "@mui/icons-material/Close";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";

// Styles
import styles from "../Account.module.css";

import { useNavigate } from "react-router-dom";
// Axios
import axios from "../../../../api/axios";

// Logout authentication
import useAuth from "../../../../hooks/useAuth";

import successClock from "../../../../assets/clockSuccess.svg";
import FrontArrow from "../../../../assets/frontArrow.svg";
import Back from "../../../../assets/backArrow.svg";

// Lazy image loader
const LazyImageComponent = React.lazy(() =>
  import("../../../../components/LazyImageComponent/LazyImageComponent")
);

const ChangePasswordModal = ({ open, handleClose }) => {
  const [userPassword, setUserPassword] = useState({});
  const [step, setStep] = useState(1);
  const [passError, setPassError] = useState("");



  const [userAuth, setUserAuth] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [payTextField, setPayTextField] = useState("");

  // Send Snackbar
  const [showSendSuccessfullSnackbar, setShowSendSuccessfullSnackbar] =
    useState(false);



  const [showMsg, setShowMsg] = useState("");

  const { logOut } = useAuth();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  const [userAccountNumber, setAccountNumber] = useState("");
  const [userBank, setUserBank] = useState("");

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const handleCloseSendSnackbar = () => {
    setShowSendSuccessfullSnackbar(false);
  };



  const GET_ACCOUNT_URL = "/user/bank-accounts";

  const ACCOUNT_URL = "/user/add-bank-account";

  useEffect(() => {

    authApp();
   
  }, []);

  const authApp = () => {
    setLoading(true);

    axios.get(
      GET_ACCOUNT_URL,
     
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }
      }
    ).then((res) => {
      // console.log(res.data);
      setUserAuth(res.data.data.bankAccount);
    
      // setcheckStatus(true);
    }).catch((err) => {
      if (err?.response?.status === 401) {
        navigate("/user/sign-in")
      }
    })
      .finally(() => setLoading(false));



  };
 

  const verifyBankApp = () => {

    if (userAccountNumber === "" || userBank === "") {
      return;
    }


    setLoading(true);

    axios.post(
      ACCOUNT_URL,
      JSON.stringify({
        bankName:userAccountNumber,
        number: userBank
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }
      }
    ).then((res) => {
      console.log(res.data);
      if (res.data.data === null || res.data.data === "") {
        setShowMsg(2)
        setShowSendSuccessfullSnackbar(true);

      } else {
        setStep(3)
      }

    }).catch((err) => {
      if (err?.response?.status === 401) {
        navigate("/user/sign-in")
      } else {

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
      onClose={handleClose}
    >
      <Box
        bgcolor="background.paper"
        className={styles.changePasswordModalBody}
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
            severity={showMsg === 1 || showMsg === 2 ? "error" : "success"}
          >
            {"Error changing account details"}
          </Alert>
        </Snackbar>
       
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
              Change account details
            </Typography>

            <Box mt={4} pl={3} pr={3} borderRadius={2} bgcolor={theme.palette.mode === "dark" ? "#333" : "#E8E8F3"}>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
              >
                <Typography
                  color="secondary"
                  variant="caption"
                  mt={!isMobile ? 2 : 8}
                  mb={1}
                  component="p"
                  fontSize={14}
                  textAlign={'left'}
                >
                  Account name:

                </Typography>

                <Typography
                  color="secondary"
                  variant="caption"
                  mt={!isMobile ? 2 : 8}
                  mb={1}
                  component="p"
                  fontSize={14}
                  textAlign={'left'}
                >
                  {user?.user?.firstName}   {user?.user?.lastName}


                </Typography>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
              >
                <Typography
                  color="secondary"
                  variant="caption"
                  mt={!isMobile ? 0 : 8}
                  mb={1}
                  component="p"
                  fontSize={14}
                  textAlign={'left'}
                >
                  Account number:

                </Typography>

                <Typography
                  color="secondary"
                  variant="caption"
                  mt={!isMobile ? 0 : 8}
                  mb={1}
                  component="p"
                  fontSize={14}
                  textAlign={'left'}
                >
                  {userAuth?.number} 


                </Typography>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
              >
                <Typography
                  color="secondary"
                  variant="caption"
                  mt={!isMobile ? 0 : 8}
                  mb={2}
                  component="p"
                  fontSize={14}
                  textAlign={'left'}
                >
                  Bank:

                </Typography>

                <Typography
                  color="secondary"
                  variant="caption"
                  mt={!isMobile ? 0 : 8}
                  mb={2}
                  component="p"
                  fontSize={14}
                  textAlign={'left'}
                >
                  {userAuth?.bankName} 


                </Typography>
              </Stack>
            </Box>

            <Box mt={4}>
              <Stack mt={5} >
              
                  <>
                    <Button
                      onClick={()=> setStep(2) }
                      style={{ height: 60, borderRadius: 10, fontSize: 17, textTransform: 'none' }} variant="contained" color="primary">
                        Change account   <LazyImageComponent src={FrontArrow} />
                    </Button>

                  </>
               
              </Stack>
             
            </Box>

          </Box>
        ) : (
          <>
            {step === 2 ? (
                <Box>
                  <Box className={styles.modalTopBarspace}>
                    <IconButton color="secondary" onClick={()=>setStep(1)}>
                      <Tooltip
                        placement="right"
                        TransitionComponent={Zoom}
                        title="Back"
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
                    Add account details
                  </Typography>

                  <Box mt={4}>
                   
                    <Typography className={styles.nameFont} variant="body2" mt={3} mb={1}>
                      Account number
                    </Typography>
                    <Input
                      disableUnderline
                      className="inputField"
                      type="number"
                      variant="outlined"
                      onChange={(e) => setAccountNumber(e.target.value)}
                      size="small"
                      fullWidth
                      color="secondary"
                    />
                    <Typography className={styles.nameFont} variant="body2" mt={3} mb={1}>
                      Bank
                    </Typography>
                    <Input
                      disableUnderline
                      className="inputField"
                      type="text"
                      variant="outlined"
                      onChange={(e) => setUserBank(e.target.value)}
                      size="small"
                      fullWidth
                      color="secondary"
                    />
                
                    <Stack mt={5} >
                      {loading ? (
                        <LoadingButton loading variant="outlined">
                          Login
                        </LoadingButton>
                      ) : (
                        <>
                          <Button
                            onClick={
                                verifyBankApp
                            }
                            style={{ height: 60, borderRadius: 10, fontSize: 18, textTransform: 'none' }} variant="contained" color="primary">
                              Complete {" "} <LazyImageComponent  src={FrontArrow} />
                          </Button>

                        </>
                      )}
                    </Stack>
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
                      Account number changed successfully
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
                      You have successfully changed your account number on Red Onion.
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
