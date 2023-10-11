import React, { Suspense, useState } from "react";
import {
  Snackbar,
  Alert,
  Zoom,
  IconButton,
  Modal,
  Slide,
  Typography,
  Button,
  Stack,
  InputAdornment,
  Input,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

import Close from "@mui/icons-material/Close";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";

// Logout authentication
import useAuth from "../../../hooks/useAuth";

import styles from "../TopUpPage.module.css";

import { useNavigate } from "react-router-dom";

import { LoadingButton } from "@mui/lab";

import successClock from "../../../assets/logout.svg";

// Axios
import axios from "../../../api/axios";
import SendConfirmationModal from "../../CoinDetails/SendConfirmationModal";
import { ModalSkeletons } from "../../../components/Skeletons/ComponentSkeletons";

const SendTokenModal = ({ open, handleClose, wallet }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [rate, setRate] = useState("");
  const [fee, setFee] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgShow, setMsgShow] = useState("");
    const [openTransactionPinModal, setOpenTransactionPinModal] =
      useState(false);

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

   const handleTransactionPinModal = () => {
     setOpenTransactionPinModal(!openTransactionPinModal);
   };



  const WALLET_MAIN_URL = "/wallet/estimated-gas";

  const TRANSFER_MAIN_URL = "/wallet/transfer";

  const getCyptoExchangeRate = () => {
    setRate(wallet?.cryptoCurrency?.abbreviation);
    if (amount === "" || address === "") {
       setShowSnackbar(true);
       setMsg("Enter amount and address");
      return;
    }
    console.log(user);
    setLoading(true);
    axios
      .post(
        WALLET_MAIN_URL,
        JSON.stringify({
          fromWalletId: wallet?.id,
          toWalletAddress: address,
          amount: Number(amount),
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        console.log(res.data.data);
        setFee(res.data.data?.estimatedGasFee);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          navigate("/user/sign-in");
        } else {
          setShowSnackbar(true);
          setMsg(err.response?.data.msg);
        }
      })
      .finally(() => setLoading(false));
  };

  const postTransfer = () => {
    if (amount === "" || address === "") {
      return;
    }

    setLoading(true);
    axios
      .post(
        TRANSFER_MAIN_URL,
        JSON.stringify({
          fromWalletId: wallet?.id,
          toWalletAddress: address,
          amount: Number(amount),
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setShowSnackbar(true);
        // console.log(res?.data?.msg);
        setMsgShow("success");
        setMsg(res?.data?.msg);
        setAddress("");
        setAmount("");
        // alert(res?.data?.msg);
        // setWalletData(data);
      })
      .catch((err) => {
         setShowSnackbar(true);
         setMsg(err.response?.data.msg);
        if (err?.response?.status === 401) {
          navigate("/user/sign-in");
        }
      })
      .finally(() => setLoading(false));
  };

  const handleConfirmationModal = (e) =>{
    console.log(e)
    if(e === "success"){
      postTransfer();
    }else{
      setShowSnackbar(true);
      setMsg("Something went wrong!");
    }
  }

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {openTransactionPinModal ? (
        <Suspense fallback={<ModalSkeletons />}>
          <SendConfirmationModal
            open={openTransactionPinModal}
            onClose={handleTransactionPinModal}
            handleConfirmation={handleConfirmationModal}
          />
        </Suspense>
      ) : (
        <Modal
          disableAutoFocus
          disableEnforceFocus
          keepMounted
          open={open}
          onClose={handleClose}
        >
          <Box
            bgcolor="background.paper"
            className={
              isMobile
                ? styles.changePasswordModalBodyMobile
                : styles.changePasswordModalBody
            }
          >
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              open={showSnackbar}
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
            >
              <Alert
                action={
                  <IconButton onClick={handleCloseSnackbar} sx={{ mt: -0.5 }}>
                    <Close sx={{ fontSize: "1.5rem" }} />
                  </IconButton>
                }
                icon={<CheckCircleOutline sx={{ fontSize: "1.5rem" }} />}
                sx={{ fontSize: "1rem" }}
                onClose={handleCloseSnackbar}
                severity={msgShow === "success" ? "success" : "error"}
              >
                {msg}
              </Alert>
            </Snackbar>
            <Box mt={3}>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography
                  variant="h3"
                  fontSize={16}
                  color="secondary"
                  fontWeight={500}
                >
                  Make Transfer
                </Typography>

                <Typography
                  // variant="body2"
                  color="primary"
                  sx={{ cursor: "pointer" }}
                  onClick={handleClose}
                >
                  <CloseIcon />
                </Typography>
              </Stack>
            </Box>
            <Box mt={2}>
              <Box>
                <Typography fontSize={15} mb={1.5} fontWeight={600}>
                  Amount
                </Typography>
                <Input
                  disableUnderline
                  className="inputField"
                  size="small"
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    if (e.target.value <= Number(wallet?.balance)) {
                      setAmount(e.target.value);
                    } else {
                      setShowSnackbar(true);
                      setMsg("Amount is out of range!");
                    }
                  }}
                  placeholder="0.00"
                  fullWidth
                />
                <Typography mt={0.3} fontSize={11} fontWeight={600}>
                  Maximum {wallet?.balance}
                </Typography>
              </Box>

              <Box mt={2}>
                <Typography fontSize={15} mb={1.5} fontWeight={600}>
                  Address
                </Typography>
                <Input
                  disableUnderline
                  className="inputField"
                  size="small"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  fullWidth
                />
              </Box>
            </Box>
            <Box mt={1}>
              {rate && (
                <Typography fontSize={14} mb={1.5} fontWeight={600}>
                  Estimated Gas Fee: {rate} {fee}
                </Typography>
              )}
            </Box>
            <Stack mt={4}>
              {loading ? (
                <LoadingButton loading variant="outlined">
                  Login
                </LoadingButton>
              ) : (
                <>
                  {rate && fee !== "" ? (
                    <Button
                      // onClick={postTransfer}
                      onClick={handleTransactionPinModal}
                      style={{
                        height: 60,
                        borderRadius: 10,
                        fontSize: 18,
                        textTransform: "none",
                      }}
                      variant="contained"
                      color="primary"
                    >
                      Transfer
                    </Button>
                  ) : (
                    <Button
                      onClick={getCyptoExchangeRate}
                      // onClick={handleTransactionPinModal}
                      style={{
                        height: 60,
                        borderRadius: 10,
                        fontSize: 18,
                        textTransform: "none",
                      }}
                      variant="contained"
                      color="primary"
                    >
                      Get Fee
                    </Button>
                  )}
                </>
              )}
            </Stack>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default SendTokenModal;
