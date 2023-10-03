import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  styled,
  Input,
  useMediaQuery,
  Select,
  MenuItem,
  Stack,
  Snackbar,
  IconButton,
  Alert,
  
} from "@mui/material";
import { Box, } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import Close from "@mui/icons-material/Close";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";

import { LoadingButton } from "@mui/lab";

import useAuth from "../../../hooks/useAuth";

import styles from "./AccountSetupStep.module.css";
import { GrowwBar } from "../../../components/GrowwBar/GrowwBar";

import successClock from "../../../assets/clockSuccess.svg";

import { useNavigate } from "react-router-dom";

// Axios
import axios from "../../../api/axios";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

// Custom input style
const ImageInput = styled("input")({
  display: "none",
});

const AccountSetupStep = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [userAccountName, setAccountName] = useState("");
  const [userAccountNumber, setAccountNumber] = useState("");
  const [userBank, setUserBank] = useState("");
  const [info, setInfo] = useState("");
  const [userInfo, setUser] = useState({});

  const [bank, setBank] = React.useState('');

  const [activeStepBank, setActiveStepBank] = React.useState(0);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { logInUser, authError, getUser, isLoading } = useAuth();

  // Send Snackbar
  const [showSendSuccessfullSnackbar, setShowSendSuccessfullSnackbar] =
    useState(false);

  const handleCloseSendSnackbar = () => {
    setShowSendSuccessfullSnackbar(false);
  };

  const allAuthContext = useAuth();
  // Authentication

  const user = Object.keys(allAuthContext.user).length
    > 0 ? allAuthContext.user : '';

  const USER_BANK_URL = "/user/add-bank-account";

  
  const handleNext = () => {
    if (userAccountNumber === "" || userBank === "") {
      setShowSendSuccessfullSnackbar(true);     
    } else {
      
      setLoading(true);
     
      axios.post(
        USER_BANK_URL,
        JSON.stringify({
          "bankName": userBank,
          "number": userAccountNumber
        }),
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: 'application/json',
            "Content-Type": "application/json",
            
          }
        }
      ).then((res) => {
       
       
        setActiveStepBank(activeStepBank + 1)

      }).catch((err) => {
        console.log(err)
      })
        .finally(() => setLoading(false));


    }

  }


  useEffect(() => {
    
    setUser(user.user);
   
  }, [user, setUser]);

  const onClickDashboard = ()=>{
    navigate("/dashboard/exchange")
  }

  const handleChange = (event) => {
    setBank(event.target.value);
  };

  return (
    <Box p={!isMobile ? 5 : 3} bgcolor="background.paper">
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
          Fill all fields!
        </Alert>
      </Snackbar>
      {activeStepBank === 0 && (
        <Box>
          <Typography
            className={styles.titleBox}
            variant="h3"
            color="secondaryDark"
            fontWeight={600}

          >
            Add account details
          </Typography>

          <Typography
            className={styles.titleBoxA}
            variant="h3"
            color="secondary"
            fontWeight={400}

          >
            All fiat gotten through Red Onion will be sent to this account.
          </Typography>


          <Box mt={4}>
            <Typography className={styles.nameFont} variant="body2" mb={1}>
              Account Name
            </Typography>
            <Input
              disableUnderline
              className="inputField"
              autoCapitalize="off"
              type="text"
              variant="outlined"
              size="small"
              value={userInfo?.firstName + " " + userInfo.lastName}
              // onChange={(e) => setAccountName(e.target.value)}
              fullWidth
              color="secondary"
            />
            <Typography className={styles.nameFont} variant="body2" mt={3} mb={1}>
              Account Number
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
            {/* <Select
              value={bank}
              onChange={handleChange}
              displayEmpty
              fullWidth
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="Nigeria">
                First Bank
              </MenuItem>
             
            </Select> */}

            <Stack mt={5} >
              {loading ? (
                <LoadingButton loading variant="outlined">
                  Sign In
                </LoadingButton>
              ) : (
                <>
                  <Button
                    onClick={
                      handleNext
                    }
                    style={{ height: 60, borderRadius: 10, fontSize: 20, textTransform: 'none' }} variant="contained" color="primary">
                    Add Account
                  </Button>

                </>
              )}
            </Stack>
          </Box>
        </Box>

      )}
      {activeStepBank === 1 && (
        <Box mt={!isMobile ? 4 : 8}>
          <center>
            <LazyImageComponent src={successClock} />
          </center>
          <Typography
            className={styles.titleBoxA}
            variant="h3"
            color="primary"
            fontWeight={400}

          >
            Welcome to Red Onion
          </Typography>


          <Stack mt={5} >
            {loading ? (
              <LoadingButton loading variant="outlined">
                Sign In
              </LoadingButton>
            ) : (
              <>
                <Button 
                    onClick={onClickDashboard}
                style={{ height: 60, borderRadius: 10, fontSize: 20, textTransform: 'none' }} variant="contained" color="primary">
                  Continue to dashboard
                </Button>

              </>
            )}
          </Stack>


        </Box>
      )}
    </Box>
  );
};

export default AccountSetupStep;
