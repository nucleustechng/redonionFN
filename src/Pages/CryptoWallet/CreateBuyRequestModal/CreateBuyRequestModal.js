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

import BuyRequest from "../../../assets/buyRequest.svg";
import SellRequest from "../../../assets/sellRequest.svg";

import BitCoinIcon from "../../../assets/bitCoinIcon.svg";
import ExchanageIcon from "../../../assets/exchangeBlue.svg";
import FrontArrow from "../../../assets/frontArrow.svg";

// Lazy image loader
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const CreateRequestModal = ({ open, onClose, dataSingle, datao }) => {

  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [loading, setLoading] = useState(false);

  const [payTextField, setPayTextField] = useState("");

  const [payAddress, setPayAddress] = useState("");

  const [msg, setMsg] = useState("");

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

      }


    }).catch((err) => {
      if (err?.response?.status === 401) {
        navigate("/user/sign-in")
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
        if (reason !== "backdropClick") {
          onClose();
        }
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
          <Box p={4} borderRadius="10px">


            <Stack direction="row" justifyContent="space-between" spacing={"5px"}>
              <Typography variant="caption" fontSize={16} fontWeight={500} color="primary">
                Purchase
              </Typography>
              <Typography
                // variant="body2"
                color="primary"
                sx={{ cursor: "pointer" }}
                onClick={onClose}
              >
                <CloseIcon />
              </Typography>
            </Stack>
            <Box mt={2} bgcolor={theme.palette.mode === "dark" ? "#333" : "#E8E8F3"} fullWidth p={2} borderRadius={2}>
              <Stack direction="row" justifyContent="space-between" >


                <Stack direction="row" spacing={"5px"}>
                  <LazyImageComponent src={BuyRequest} />
                  <Box>
                    <Typography variant="caption" fontSize={14} fontWeight={400} color="#838383">
                      Buy
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={"5px"}>
                  <LazyImageComponent src={SellRequest} />
                  <Box>
                    <Typography variant="caption" fontSize={14} fontWeight={400} color="#838383">
                      Sell
                    </Typography>
                  </Box>
                </Stack>

              </Stack>


              <Box pl={4} pr={4} mt={2} >
                <center>

                  <Box>
                    <LazyImageComponent src={ExchanageIcon} />
                  </Box>

                  <Typography variant="caption" fontSize={16} fontWeight={400} >
                    {datao?.data?.coinAbb} 1 =   {datao?.currency?.currencyCode}  {parseFloat(dataSingle?.tokenPricePerUnit).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </Typography>

                </center>
              </Box>

              <Box mt={1} >
                <Stack direction="row" justifyContent={"space-between"} >
                  <Box>
                    <Stack direction="row" >
                      <Box p={0.5}>
                        <LazyImageComponent className={styles.coinIcons} src={datao?.data?.coinImg} />
                      </Box>
                      <Box>

                        <Typography variant="caption" fontSize={18} fontWeight={400} >
                          {datao?.data?.coinAbb}
                        </Typography>


                      </Box>
                    </Stack>
                  </Box>

                  <Box>

                    <Typography variant="caption" fontSize={18} fontWeight={400} >
                      {datao?.country?.code}
                    </Typography>


                  </Box>


                </Stack>



              </Box>

              <Divider color="#3063E9" />

              <Box mt={1} >
                <Stack direction="row" justifyContent="space-between" >
                  <Box>

                    <Typography variant="caption" fontSize={14} fontWeight={400} >
                      {datao?.data?.coinAbb} {payTextField}
                    </Typography>

                  </Box>

                  <Box>

                    <Typography variant="caption" fontSize={14} fontWeight={600} >
                      {datao?.currency?.currencyCode} {(((payTextField === "" ? 1 : payTextField) * dataSingle?.tokenPricePerUnit).toFixed(2)).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </Typography>

                  </Box>


                </Stack>



              </Box>
            </Box>
            <Box
              mt={3}
            >
              <Typography variant="body2" fontSize={16} fontWeight={300} color="secondary" mb={2}>
                Input the amount you would like to buy
              </Typography>
              <Box>



                <Box borderRadius={2} height={50} >
                  <Stack direction="row" justifyItems={"center"} >

                    <Input
                      fullWidth
                      name="payInput"
                      value={payTextField}
                      type="number"
                      onChange={(e) => {
                        if (e.target.value <= dataSingle?.amountInCrypto) {
                          setPayTextField(e.target.value)
                        }

                      }}
                      placeholder="0.0"
                      disableUnderline
                      className={
                        theme.palette.mode === "dark"
                          ? "inputField"
                          : styles.inputFieldLight
                      }
                    />
                  </Stack>
                </Box>

                <Stack ml={1} mt={1} direction="row" >
                  <Typography variant="caption" fontSize={13} textAlign={"left"} fontWeight={500} color="secondary" mb={1}>
                    Maximum:  {dataSingle?.amountInCrypto}
                  </Typography>
                </Stack>
              </Box>

              <Box
                mt={3}
                mb={3}
              >
                <Typography variant="body2" fontSize={16} fontWeight={500} color="secondary" mb={2}>
                  Your Wallet Address
                </Typography>
                <Box>



                  <Box borderRadius={2} height={50} >
                    <Stack direction="row" justifyItems={"center"} >

                      <Input
                        fullWidth
                        name="payInput"
                        value={payAddress}
                        type="text"
                        onChange={(e) => {
                          setPayAddress(e.target.value)


                        }}
                        placeholder=""
                        disableUnderline
                        className={
                          theme.palette.mode === "dark"
                            ? "inputField"
                            : styles.inputFieldLight
                        }
                      />
                    </Stack>
                  </Box>
                </Box>
              </Box>


            </Box>

            {(payAddress !== "" && payTextField <= dataSingle?.amountInCrypto) && (
              <>
                <Box mt={4} bgcolor={"#E8E8F3"} fullWidth p={2} borderRadius={2}>
                  <Stack direction="row" justifyContent="space-between" >

                    <Box>

                      <Typography variant="caption" fontSize={14} fontWeight={400} color="#838383">
                        Account name:
                      </Typography>

                    </Box>

                    <Box>

                      <Typography variant="caption" fontSize={14} fontWeight={400} color="#111">
                        {dataSingle?.createdBy.firstName}   {dataSingle?.createdBy.lastName} {dataSingle?.createdBy.middleName}
                      </Typography>

                    </Box>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" >

                    <Box>

                      <Typography variant="caption" fontSize={14} fontWeight={400} color="#838383">
                        Account number:
                      </Typography>

                    </Box>

                    <Box>

                      <Typography variant="caption" fontSize={14} fontWeight={400} color="primary">
                        {dataSingle?.createdBy.bankAccount.number}
                      </Typography>

                    </Box>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" >

                    <Box>

                      <Typography variant="caption" fontSize={14} fontWeight={400} color="#838383">
                        Bank:
                      </Typography>

                    </Box>

                    <Box>

                      <Typography variant="caption" fontSize={14} fontWeight={400} color="#111">
                        {dataSingle?.createdBy.bankAccount.bankName}
                      </Typography>

                    </Box>
                  </Stack>

                </Box>

                <Stack direction="row" mt={3} justifyContent="space-between" >

                  {loading ? (

                    <LoadingButton fullWidth loading variant="outlined">
                      Login
                    </LoadingButton>

                  ) : (
                    <>
                      <Button
                        onClick={handleSubmit}
                        fullWidth style={{ height: 50, borderRadius: 10, fontSize: 20, textTransform: 'none' }} variant="contained" color="primary">
                        Continue  <LazyImageComponent src={FrontArrow} />
                      </Button>

                    </>
                  )}

                  {/* <Box ml={2}>
                    <Button onClick={onClose} style={{ height: 50, width: 150, borderRadius: 10, fontSize: 20, textTransform: 'none' }} variant="contained" color="btncolor">
                      <Typography variant="caption" fontSize={18} fontWeight={400} color="primary">
                        Close
                      </Typography>
                    </Button>
                  </Box> */}
                </Stack>
              </>
            )}



          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateRequestModal;
