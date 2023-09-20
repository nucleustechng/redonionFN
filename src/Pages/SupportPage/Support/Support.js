import React, { Suspense, useEffect, useState } from "react";
import { Box } from "@mui/system";

// Styles
import styles from "./Support.module.css";

import {
  Alert,
  Divider,
  IconButton,
  Snackbar,
  useMediaQuery,
  useTheme,
  Typography,
  Button,
  Stack,
  Chip,
  Input,
  MenuItem,
  Select,
  
} from "@mui/material";


import { useNavigate } from "react-router-dom";

import AuthProgress from "../../../components/AuthProgress/AuthProgress";
import { ModalSkeletons } from "../../../components/Skeletons/ComponentSkeletons";
import Close from "@mui/icons-material/Close";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";

import RemoveIcon from "@mui/icons-material/Remove"

import { LoadingButton } from "@mui/lab";

// Axios
import axios from "../../../api/axios";

const SuccessModal = React.lazy(() => import("./SuccessModal"));

const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

// Lazy Components


const Support = () => {
  const [openAuthProgressModal, setOpenAuthProgressModal] = useState(true);
  const [showSendSuccessfullSnackbar, setShowSendSuccessfullSnackbar] =
    useState(false);

  const [openSuccessModal, setOpenSuccessModal] = useState(false);


  const [category, setCategory] = React.useState("DISPUTE_LODGING");
  const [trasactionID, setTrasactionID] = React.useState("");
  const [desc, setDesc] = React.useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const [characterLimit] = useState(100);

  const [characterLimitDec] = useState(4000);

  const [showMsg, setShowMsg] = useState("");

  const handleCloseSendSnackbar = () => {
    setShowSendSuccessfullSnackbar(false);
  };

  const handleOpenSuccessModal = () => {
    setOpenSuccessModal(!openSuccessModal);
  };


  // handler for auth progress
  const handleOpenAuthProgressModal = () => {
    // handleCloseTwoFAPin();
    setOpenAuthProgressModal(true);
  };

  const handleCloseAuthProgressModal = () => {
    setOpenAuthProgressModal(false);
  };



  const handleCountrySelection = (e) => {
    var con = e.target.value;
    setCategory(con);

  };


  // Close the authorization modal
  useEffect(() => {
    if (openAuthProgressModal) {
      const closeTheAuthorization = setTimeout(() => {
        setOpenAuthProgressModal(false);
      }, 5000);

      return () => clearTimeout(closeTheAuthorization);
    }
  }, [openAuthProgressModal]);


  const [userAuth, setUserAuth] = useState("");


  const HELP_URL = "/chat/send-message";



  const verifyAuthApp = () => {

    if (desc === "") {
      
      return;
    }
   

    setLoading(true);

    axios.post(
      HELP_URL,
      JSON.stringify({
        content: desc,
        supportType: category,
        transId: trasactionID
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }
      }
    ).then((res) => {
      console.log(res.data);
      // setShowMsg(1)
      // setShowSendSuccessfullSnackbar(true)
      setOpenSuccessModal(true)
      setDesc("")
      setTrasactionID("")

    }).catch((err) => {
      if (err?.response?.status === 401) {
        navigate("/user/sign-in")
      } else {
        setShowMsg(2)
        setShowSendSuccessfullSnackbar(true)
      }
    })
      .finally(() => setLoading(false));



  };

  return (
    <Box p={3} mt={-2} className={styles.mainBox}>
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
          severity={showMsg === 2 ? "error" : "success"}
        >
          {showMsg === 2 ? "Error processing data" : "Your message was sent!"}
        </Alert>
      </Snackbar>
      {/* <AuthProgress
        open={openAuthProgressModal}
        onClose={handleCloseAuthProgressModal}
      /> */}

      <Box ml={2} className={styles.infoContentTitleBox}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant={!isMobile ? "h6" : "subtitle1"}
            color="secondary"
            fontSize={24}
          >
            Help
          </Typography>
        </Stack>

        <Stack spacing={1} mt={5} mb={2}>
          <Typography
            variant="body1"
            color={theme.palette.text.primary}
            fontSize={16}
          >
            Category
          </Typography>
          <Select
            className={theme.palette.mode === "dark" ? "" : styles.currencyBox}
            value={category}
            onChange={handleCountrySelection}
          >
            <MenuItem value="DISPUTE_LODGING">Transaction (Disputes)</MenuItem>
            <MenuItem value="Account">Account</MenuItem>
            <MenuItem value="Verification">Verification</MenuItem>
            <MenuItem value="General Enquiries">General Enquiries</MenuItem>
          </Select>
        </Stack>
        {category === "DISPUTE_LODGING" && (
          <Stack spacing={1} mt={4} mb={2}>
            <Typography
              variant="body1"
              color={theme.palette.text.primary}
              fontSize={16}
            >
              Transaction ID (Optional)
            </Typography>
            <Input
              disableUnderline
              className="inputField"
              type="text"
              inputProps={{ maxLength: characterLimit }}
              variant="outlined"
              size="small"
              color="secondary"
              name="transID"
              onChange={(e) => setTrasactionID(e.target.value)}
            />
          </Stack>
        )}
        <Box
          display={"flex"}
          alignContent={"flex-end"}
          justifyContent={"flex-end"}
        >
          <Typography
            variant="body1"
            color={theme.palette.text.primary}
            fontSize={13}
          >
            {trasactionID.length}/{characterLimit}
          </Typography>
        </Box>

        <Stack spacing={1} mt={1}>
          <Typography
            variant="body1"
            color={theme.palette.text.primary}
            fontSize={16}
          >
            Issue Description
          </Typography>
          <Input
            multiline
            rows={14}
            sx={{ p: 1 }}
            disableUnderline
            className="inputField"
            type="text"
            // placeholder="johnjoe@gmail.com"
            variant="outlined"
            size="small"
            color="secondary"
            name="desc"
            onChange={(e) => setDesc(e.target.value)}
          />
        </Stack>
        <Box
          mt={1}
          display={"flex"}
          alignContent={"flex-end"}
          justifyContent={"flex-end"}
        >
          <Typography
            variant="body1"
            color={theme.palette.text.primary}
            fontSize={13}
          >
            {desc.length}/{characterLimitDec}
          </Typography>
        </Box>

        <Box
          display={"flex"}
          alignContent={"flex-end"}
          justifyContent={"flex-end"}
          mt={6}
          mb={2}
        >
          {loading ? (
            <LoadingButton
              style={{
                height: 60,
                borderRadius: 10,
                fontSize: 16,
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
                  fontSize: 18,
                  textTransform: "none",
                }}
                color="primary"
                variant="contained"
              >
                Submit
              </Button>
            </>
          )}
        </Box>
      </Box>

      <Suspense fallback={<ModalSkeletons />}>
        <SuccessModal
          open={openSuccessModal}
          handleClose={handleOpenSuccessModal}
        />
      </Suspense>
    </Box>
  );
};

export default Support;
