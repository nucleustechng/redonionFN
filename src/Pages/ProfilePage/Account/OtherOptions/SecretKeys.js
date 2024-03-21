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
  useMediaQuery,
  Slide
} from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LightUIButtonPrimary } from "../../../../Utilities/LightUIButtons";

import Close from "@mui/icons-material/Close";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";

import link from "../../../../assets/link.svg";
import CopyToClipboard from "react-copy-to-clipboard";


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

const SecretKeysModal = ({ open, handleClose, blockchainIds }) => {
  const [userPassword, setUserPassword] = useState("");
  const [blockchainId, setBlockchainId] = useState({});
  const [privateKey, setPrivateKey] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  
  const [loading, setLoading] = useState(false);

  const [showSnackbar, setShowSnackbar] = useState(false);

  


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

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const handleCloseModal = () => {
    handleClose(); 
    setPrivateKey(""); 
  };


  

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));




  // const handleGetKey = (e) => {
  //   const field = e.target.name;
  //   const value = e.target.value;

  //   const newUserPassword = { ...userPassword };
  //   newUserPassword[field] = value;
  //   setUserPassword(newUserPassword);
  // };

  
  const GET_KEY_URL = "/wallet/pk";


  const GetKey = () => {

    
    setLoading(true);

    axios.post(
      GET_KEY_URL,
      JSON.stringify({
        "password": userPassword,
        "blockchainId": parseInt(blockchainIds)
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }
      }
    ).then((res) => {
      console.log(res.data);
      if (res.data.success === true ){
        setPrivateKey(res.data.data.privateKey)
      }else {
        setShowSendSuccessfullSnackbar(true)
        setErrMessage(res.data.msg)
      }
           
      setErrMessage("");
    }).catch((err) => {
      if (err?.response?.status === 401) {
        navigate("/user/sign-in")
      } else {
        console.log(err)
        setShowSendSuccessfullSnackbar(true)
        setErrMessage(err.response.data.message)
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
      onClose={handleCloseModal}
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
            {errMessage}
          </Alert>
        </Snackbar>
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
        <Box display="flex" alignItems="center" justifyContent="space-between"   >
          <Box >
            <Typography variant="h6" component="h2">
              Get Secret Key
            </Typography>
          </Box>
          <IconButton color="secondary" onClick={handleCloseModal}>
            <Tooltip
              placement="right"
              TransitionComponent={Zoom}
              title="Close"
            >
              <CloseIcon fontSize="medium" />
            </Tooltip>
          </IconButton>
        </Box>
        
        <Box>
          

          {privateKey ?  
            <CopyToClipboard
                onCopy={() => setShowSnackbar(true)}
                text={privateKey}
            >
              <Box
                display="flex"
                sx={{
                  cursor: "pointer",
                }}
                alignItems="center"
                justifyContent="center"
                flexWrap="wrap"
                gap={2}
                mt={5}
              >
                <Box 
                  sx={{
                    maxWidth: { xs: "250px", sm: "390px", lg: "410px" }, 
                    overflow: "auto",
                  }}>
                  <Typography fontSize={14} variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                    {privateKey.substring(0, 24)}{"..."}
                  </Typography>
                </Box>
                <LazyImageComponent src={link}  />
                
              </Box>
            </CopyToClipboard>
          :
            <Box
              component="form"
              onSubmit={GetKey}
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
                  Password
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
                  name="password"
                  onChange={(e) => setUserPassword(e.target.value)}
                  type={showPasswordCurrent ? "text" : "password"}
                  variant="filled"
                  color="secondary"
                  size="small"
                />
              </Stack>
              {/* <Stack spacing={1} mb={2}>
                <Typography
                  variant="body2"
                  color={
                    theme.palette.mode === "dark"
                      ? "text.secondary"
                      : "common.black"
                  }
                >
                  Blockchain Id
                </Typography>
                <Input
                  disableUnderline
                  className={styles.inputField}
                  type="number"
                  value={parseInt(blockchainIds)}
                  variant="outlined"
                  color="secondary"
                  size="small"
                />
              </Stack> */}
              
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
                      onClick={GetKey}
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
                      Get Secret Key
                    </Button>
                  </>
                )}
              </Stack>
            </Box>
          }
        </Box>
        
        
      </Box>
      
    </Modal>
  );
};

export default SecretKeysModal;
