import React, { Suspense, useState } from "react";
import {
  Divider, Modal, Stack, Typography, useMediaQuery, Input, Button, Snackbar,
  IconButton,
  Alert,
} from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";

import Close from "@mui/icons-material/Close";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
// Styles
import styles from "./CreateBuyRequestModal.module.css";
import { ReactPinField } from "react-pin-field";
import CloseIcon from "@mui/icons-material/Close";

import { LoadingButton } from "@mui/lab";

import { useLocation, useNavigate } from "react-router-dom";

// Axios
import axios from "../../../api/axios";

import Send from "../../../assets/send.svg";
import SellRequest from "../../../assets/sellRequest.svg";

import Back from "../../../assets/back.svg";
import ExchanageIcon from "../../../assets/exchangeBlue.svg";
import FrontArrow from "../../../assets/frontArrow.svg";
import Profile from "../../../assets/profile.svg";
import { io } from "socket.io-client";

// Lazy image loader
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const ChatModal = ({ open, onClose, dataSingle, datao }) => {

  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [loading, setLoading] = useState(false);

  const [payTextField, setPayTextField] = useState("");

  const [payAddress, setPayAddress] = useState("");

  const [msg, setMsg] = useState("");

  const [firstModalA, setFirstModalA] = useState(0);

  // Send Snackbar
  const [showSendSuccessfullSnackbar, setShowSendSuccessfullSnackbar] =
    useState(false);

  const handleCloseSendSnackbar = () => {
    setShowSendSuccessfullSnackbar(false);
  };




  const USER_SUBMIT_URL = "/transaction/respond-to-offer";



  const handleSubmit = () => {
    var user = JSON.parse(localStorage.getItem('user'));
    setLoading(true);

    console.log(dataSingle?.id)


    axios.post(
      USER_SUBMIT_URL,
      JSON.stringify({
        "amountInCrypto": parseFloat(payTextField),
        "buyerWalletAddress": payAddress,
        "offerId": dataSingle?.id
      }),
      // formdata,
      {
        headers: {
          Accept: 'application/json',
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }
      }
    ).then((res) => {
      console.log(res.data.msg)
      if (res.data.data === null) {
        setMsg(res.data.msg)
        setShowSendSuccessfullSnackbar(true);

      } else {
        setFirstModalA(2)
      }


    }).catch((err) => {
      if (err?.response?.status === 401) {
        navigate("/user/sign-in")
      } else {
        console.log(err?.response?.data.message);
        setMsg(err?.response?.data.message);
        setShowSendSuccessfullSnackbar(true)
      }
    })
      .finally(() => setLoading(false));



  }


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
            severity="error"
          >
            {msg}
          </Alert>
        </Snackbar>
        <Box
          bgcolor={theme.palette.background.paper}
          className={styles.modalContentBox}
        >
          <Box py={4} px={4}>
            <>
              <Stack
                direction="row"
                alignItems={"center"}
                justifyContent="center"
                spacing={"8px"}
                px={4}
                py={1}
                borderBottom={0.1}
                borderColor={"#11111150"}
              >
                <Box mt={1} sx={{ cursor: "pointer" }} onClick={onClose}>
                  <LazyImageComponent src={Profile} />
                </Box>
                <Typography
                  variant="caption"
                  fontSize={18}
                  fontWeight={500}
                  color="primary"
                >
                  Seller
                </Typography>
              </Stack>
              <Box mt={2} height={600} fullWidth>
                <Stack
                  direction={"column"}
                  justifyContent={"center"}
                  alignItems={"flex-end"}
                >
                  <Box
                    width={350}
                    // height={80}
                    py={1.4}
                    px={1.5}
                    my={2}
                    bgcolor={"#F6F0F8"}
                    borderRadius={3}
                  >
                    <Box>
                      <Typography
                        color={"#000"}
                        textAlign={"left"}
                        // variant="caption"
                        fontSize={14}
                        fontWeight={400}
                      >
                        Me
                      </Typography>
                    </Box>
                    <Typography
                      color={"#000"}
                      textAlign={"left"}
                      // variant="caption"
                      fontSize={14}
                      fontWeight={400}
                    >
                      Alright, what do you propose?
                    </Typography>
                    <Box mt={1.5}>
                      <Typography
                        color={"#000"}
                        textAlign={"right"}
                        // variant="caption"
                        fontSize={14}
                        fontWeight={400}
                      >
                        2:34PM
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
                <Box
                  width={350}
                  // height={80}
                  py={1.4}
                  px={1.5}
                  bgcolor={"#3063E9"}
                  borderRadius={3}
                >
                  <Box>
                    <Typography
                      color={"#fff"}
                      textAlign={"left"}
                      // variant="caption"
                      fontSize={14}
                      fontWeight={400}
                    >
                      @jacerodman
                    </Typography>
                  </Box>
                  <Typography
                    color={"#fff"}
                    textAlign={"left"}
                    // variant="caption"
                    fontSize={14}
                    fontWeight={400}
                  >
                    Alright, what do you propose?
                  </Typography>
                  <Box mt={1.5}>
                    <Typography
                      color={"#fff"}
                      textAlign={"right"}
                      // variant="caption"
                      fontSize={14}
                      fontWeight={400}
                    >
                      2:34PM
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                border={1}
                borderColor={"#A4ACAF"}
                borderRadius={1.5}
                px={1.8}
                py={1}
              >
                <Stack
                  direction="row"
                  alignItems={"center"}
                  justifyItems={"center"}
                >
                  <Input
                    fullWidth
                    name="payInput"
                    value={payTextField}
                    type="text"
                    onChange={(e) => {}}
                    placeholder="Write a message "
                    disableUnderline
                  />

                  <LazyImageComponent src={Send} />
                </Stack>
              </Box>
            </>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ChatModal;
