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

import Back from "../../../assets/back.svg";
import ExchanageIcon from "../../../assets/exchangeBlue.svg";
import FrontArrow from "../../../assets/frontArrow.svg";
import successClock from "../../../assets/clockSuccess.svg";

const ChatModal = React.lazy(() =>
  import("./ChatModal")
);

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

    const [showPin, setShowPin] = useState(false);

  const [firstModalA, setFirstModalA] = useState(0);

  // Send Snackbar
  const [showSendSuccessfullSnackbar, setShowSendSuccessfullSnackbar] =
    useState(false);

  const handleCloseSendSnackbar = () => {
    setShowSendSuccessfullSnackbar(false);
  };

 const handleCloseTwoFAPin = () => {
  console.log(3)
   setShowPin(!showPin);
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
    <Box>
      <ChatModal open={showPin} onClose={handleCloseTwoFAPin} />
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
        <Box px={4}>
          {firstModalA === 0 ? (
            <>
              <Box mt={-5}>
                <Button
                  // onClick={handleCloseTwoFAPin}
                  width={200}
                  style={{
                    height: 50,
                    borderRadius: 10,
                    fontSize: 16,
                    textTransform: "none",
                  }}
                  variant="contained"
                  color="primary"
                >
                  Create A Sell Offer
                </Button>
              </Box>

              <Stack
                my={5}
                direction="row"
                alignItems={"center"}
                // justifyContent="space-between"
                spacing={"8px"}
              >
                <Box mt={1} sx={{ cursor: "pointer" }} onClick={onClose}>
                  <LazyImageComponent src={Back} />
                </Box>
                <Typography
                  variant="caption"
                  fontSize={18}
                  fontWeight={500}
                  color="primary"
                >
                  Request offer
                </Typography>
              </Stack>
              <Box px={4} mb={6} borderBottom={0.1} borderColor={"#11111150"}>
                <Button
                  // onClick={handleCloseTwoFAPin}
                  style={{
                    height: 44,
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 0,
                    fontSize: 18,
                    paddingLeft: 30,
                    paddingRight: 30,
                    textTransform: "none",
                  }}
                  variant="contained"
                  color="primary"
                >
                  Trade
                </Button>

                <Button
                  onClick={handleCloseTwoFAPin}
                  style={{
                    height: 44,
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 0,
                    fontSize: 18,
                    paddingLeft: 30,
                    paddingRight: 30,
                    textTransform: "none",
                  }}
                >
                  Chat
                </Button>
              </Box>
              <Box
                mt={2}
                bgcolor={theme.palette.mode === "dark" ? "#333" : "#E8E8F3"}
                fullWidth
                p={2}
                borderRadius={2}
              >
                <Stack direction="row" justifyContent="space-between">
                  <Stack direction="row" spacing={"5px"}>
                    <LazyImageComponent src={BuyRequest} />
                    <Box>
                      <Typography
                        variant="caption"
                        fontSize={14}
                        fontWeight={400}
                        color="#838383"
                      >
                        Buy
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={"5px"}>
                    <LazyImageComponent src={SellRequest} />
                    <Box>
                      <Typography
                        variant="caption"
                        fontSize={14}
                        fontWeight={400}
                        color="#838383"
                      >
                        Sell
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>

                <Box pl={4} pr={4} mt={2}>
                  <center>
                    <Box>
                      <LazyImageComponent src={ExchanageIcon} />
                    </Box>

                    <Typography
                      variant="caption"
                      fontSize={16}
                      fontWeight={400}
                    >
                      {datao?.data?.coinAbb} 1 = {datao?.currency?.currencyCode}{" "}
                      {parseFloat(dataSingle?.tokenPricePerUnit).toLocaleString(
                        undefined,
                        { maximumFractionDigits: 2 }
                      )}
                    </Typography>
                  </center>
                </Box>

                <Box mt={1}>
                  <Stack direction="row" justifyContent={"space-between"}>
                    <Box>
                      <Stack direction="row">
                        <Box p={0.5}>
                          {/* <LazyImageComponent
                             
                            className={styles.coinIcons}
                            src={datao?.data?.coinImg}
                          /> */}
                        </Box>
                        <Box>
                          <Typography
                            variant="caption"
                            fontSize={18}
                            fontWeight={400}
                          >
                            {datao?.data?.coinAbb}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>

                    <Box>
                      <Typography
                        variant="caption"
                        fontSize={18}
                        fontWeight={400}
                      >
                        {datao?.country?.code}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                <Divider color="#3063E9" />

                <Box mt={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Box>
                      <Typography
                        variant="caption"
                        fontSize={14}
                        fontWeight={400}
                      >
                        {datao?.data?.coinAbb} {payTextField}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="caption"
                        fontSize={14}
                        fontWeight={600}
                      >
                        {datao?.currency?.currencyCode}{" "}
                        {(
                          (payTextField === "" ? 1 : payTextField) *
                          dataSingle?.tokenPricePerUnit
                        )
                          .toFixed(2)
                          .toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Box>
              <Stack justifyContent={"space-between"} direction={"row"} mt={3}>
                <Box mr={5} width={"100%"}>
                  <Typography
                    variant="body2"
                    fontSize={16}
                    fontWeight={300}
                    color="secondary"
                    mb={2}
                  >
                    Input the amount you would like to buy
                  </Typography>
                  <Box>
                    <Box borderRadius={2} height={50}>
                      <Stack direction="row" justifyItems={"center"}>
                        <Input
                          fullWidth
                          name="payInput"
                          value={payTextField}
                          type="number"
                          onChange={(e) => {
                            if (e.target.value <= dataSingle?.amountInCrypto) {
                              setPayTextField(e.target.value);
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

                    <Stack ml={1} mt={1} direction="row">
                      <Typography
                        variant="caption"
                        fontSize={13}
                        textAlign={"left"}
                        fontWeight={500}
                        color="secondary"
                        mb={1}
                      >
                        Maximum: {dataSingle?.amountInCrypto}
                      </Typography>
                    </Stack>
                  </Box>
                </Box>

                <Box width={"100%"}>
                  <Typography
                    variant="body2"
                    fontSize={16}
                    fontWeight={500}
                    color="secondary"
                    mb={2}
                  >
                    Your Wallet Address
                  </Typography>
                  <Box>
                    <Box borderRadius={2} height={50}>
                      <Stack direction="row" justifyItems={"center"}>
                        <Input
                          fullWidth
                          name="payInput"
                          value={payAddress}
                          type="text"
                          onChange={(e) => {
                            setPayAddress(e.target.value);
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
              </Stack>

              {payAddress !== "" &&
                payTextField <= dataSingle?.amountInCrypto && (
                  <>
                    <Box
                      mt={4}
                      bgcolor={"#E8E8F3"}
                      fullWidth
                      p={2}
                      borderRadius={2}
                    >
                      <Stack direction="row" justifyContent="space-between">
                        <Box>
                          <Typography
                            variant="caption"
                            fontSize={14}
                            fontWeight={400}
                            color="#838383"
                          >
                            Account Name:
                          </Typography>
                        </Box>

                        <Box>
                          <Typography
                            variant="caption"
                            fontSize={14}
                            fontWeight={400}
                            color="#111"
                          >
                            {dataSingle?.createdBy.firstName}{" "}
                            {dataSingle?.createdBy.lastName}{" "}
                            {dataSingle?.createdBy.middleName}
                          </Typography>
                        </Box>
                      </Stack>

                      <Stack direction="row" justifyContent="space-between">
                        <Box>
                          <Typography
                            variant="caption"
                            fontSize={14}
                            fontWeight={400}
                            color="#838383"
                          >
                            Account Number:
                          </Typography>
                        </Box>

                        <Box>
                          <Typography
                            variant="caption"
                            fontSize={14}
                            fontWeight={400}
                            color="primary"
                          >
                            {dataSingle?.createdBy.bankAccount.number}
                          </Typography>
                        </Box>
                      </Stack>

                      <Stack direction="row" justifyContent="space-between">
                        <Box>
                          <Typography
                            variant="caption"
                            fontSize={14}
                            fontWeight={400}
                            color="#838383"
                          >
                            Bank:
                          </Typography>
                        </Box>

                        <Box>
                          <Typography
                            variant="caption"
                            fontSize={14}
                            fontWeight={400}
                            color="#111"
                          >
                            {dataSingle?.createdBy.bankAccount.bankName}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>

                    <Stack direction="row" mt={3} justifyContent="flex-end">
                      {loading ? (
                        <Box width={200}>
                          <LoadingButton fullWidth loading variant="outlined">
                            Login
                          </LoadingButton>
                        </Box>
                      ) : (
                        <>
                          <Button
                            onClick={handleSubmit}
                            style={{
                              height: 50,
                              width: 200,
                              borderRadius: 10,
                              fontSize: 20,
                              textTransform: "none",
                            }}
                            variant="contained"
                            color="primary"
                          >
                            Continue <LazyImageComponent src={FrontArrow} />
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
            </>
          ) : (
            <>
              <Box mt={3}>
                <center>
                  <LazyImageComponent src={successClock} />
                </center>
                <Typography
                  variant="h3"
                  mt={!isMobile ? 4 : 8}
                  color="secondary"
                  fontSize={24}
                  fontWeight={500}
                >
                  Payment successful
                </Typography>

                <Typography
                  color="secondary"
                  variant="caption"
                  mt={!isMobile ? 3 : 8}
                  mb={2}
                  component="p"
                  fontSize={16}
                  textAlign={"center"}
                >
                  You will recieve your token once your payment has been
                  confirmed by the 2nd party.{" "}
                </Typography>
              </Box>
            </>
          )}

          <Box mt={10}>
            <Typography
              variant="body2"
              fontSize={18}
              fontWeight={500}
              color="secondary"
              mb={4}
            >
              Seller Review
            </Typography>

            <Typography
              variant="body2"
              fontSize={15}
              fontWeight={300}
              color="secondary"
              mb={2}
            >
              - Transactions were quite fast, I would recommend the seller.
            </Typography>

            <Typography
              variant="body2"
              fontSize={15}
              fontWeight={300}
              color="secondary"
              mb={2}
            >
              - The rates seemed a bit too high for me
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateRequestModal;