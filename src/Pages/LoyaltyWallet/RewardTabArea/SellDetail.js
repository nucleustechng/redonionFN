import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Stack,
  Skeleton,
  Chip,
  Snackbar,
  Alert,
  IconButton,
  useMediaQuery,
  Paper,
  List,
  Input,
} from "@mui/material";
import moment from "moment";
import ListItem from "@mui/material/ListItem";
import NGFlag from "../../../assets/NGFlag.svg";
import Back from "../../../assets/backArrow.svg";
import Chat from "../../../assets/chat.svg";
import Confirmed from "../../../assets/confirmed.svg";

import { LoadingButton } from "@mui/lab";

// Image

import BitCoinIcon from "../../../assets/bitCoinIcon.svg";

// Styles
import styles from "./RewardTabArea.module.css";

// Custom Theme
import { useTheme } from "@mui/material/styles";

import UpArrow from "../../../assets/upArrow.svg";
import DownArrow from "../../../assets/arrowDown.svg";

import ExchanageIcon from "../../../assets/exchange.svg";

// Axios
import axios from "../../../api/axios";

// Router
import { useNavigate } from "react-router-dom";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const SellDetail = (props) => {
  const [openRewardModal, setOpenRewardModal] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const [secondStep, setSecondStep] = React.useState("");
  const [secondStepInfo, setSecondStepInfo] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [reason, setReason] = React.useState("");
  const [isloading, setIsLoading] = React.useState(false);
  const [nloading, setNLoading] = React.useState(false);
  const [transaz, setTransaz] = useState([]);

  const [stransaz, setSTransaz] = useState("");

  const [cryptoTransactionId, setcryptoTransactionId] = useState("");

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const GET_CURRENCY_URL = "/transaction/confirm-receipt-of-payment";

  const GET_ESCROW_URL = "/transaction/withdraw-from-offer";

  const GET_BY_ID_URL = "/transaction/offer/";

  const GET_OFFER_URL = "/transaction/get-offers";

  // transaction/offer/2592e667-b3e3-4a8c-98d2-7dc7c905d162

  const respond = (data) => {
    console.log(data);
    setNLoading(true);
    axios
      .post(
        GET_CURRENCY_URL,
        JSON.stringify({
          transactionId: data?.id,
          received: true,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data.data.transaction.id);
        setSecondStep(res.data.data.transaction.id);
        setNLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Error processing request: " + err.message);

        setNLoading(false);
      });
  };

  const escrowSubmit = () => {
    console.log(stransaz);
    if (reason === "") return alert("Please fill all input");
    if (amount > stransaz?.amountInCrypto)
      return alert(
        "amount must be less than or equal to " + stransaz.amountInCrypto
      );

    setLoading(true);
    axios
      .post(
        GET_ESCROW_URL,
        JSON.stringify({
          amount: amount,
          offerId: stransaz?.id,
          reason: reason,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Error processing request: " + err.message);

        setLoading(false);
      });
  };

  useEffect(() => {
    console.log(props);
    setTransaz(props.selldetail);
    setSTransaz(props.stranz);
    setcryptoTransactionId(props.stranz?.cryptoTransactionId);
  }, [user, props]);

  return (
    <React.Fragment>
      <>
        <Box mx={4}>
          <Typography
            color="background.dark"
            fontWeight={400}
            fontSize={14}
            mt={2}
            variant="body2"
          >
            Transaction ID:
            {cryptoTransactionId !== ""
              ? " " + cryptoTransactionId.substr(0, 26) + "\u2026"
              : ""}
          </Typography>
        </Box>

        <ListItem>
          <Box
            // borderWidth={1}
            // borderBottom={1}
            m={isMobile ? 2 : 3}
            width={"100%"}
          >
            <Stack
              direction="row"
              alignItems={"center"}
              justifyContent="space-between"
            >
              <Box>
                <Stack direction="row">
                  <LazyImageComponent sx={{ marginRight: 4 }} src={UpArrow} />
                  <Typography mt={0.2} fontSize={14}>
                    Sent
                  </Typography>
                </Stack>
                <Stack mt={2} ml={-1} direction="row">
                  <Box ml={1.5}>
                    <Stack
                      direction="row"
                      justifyItems={"center"}
                      alignItems={"center"}
                    >
                      <LazyImageComponent
                        style={{
                          marginRight: 4,
                          width: 25,
                          height: 25,
                        }}
                        src={stransaz?.cryptoCurrency?.imgUri}
                      />
                      <Typography
                        color="secondary"
                        fontWeight={400}
                        fontSize={15}
                        mt={0.5}
                        variant="body2"
                      >
                        {stransaz?.cryptoCurrency?.abbreviation}
                      </Typography>
                    </Stack>
                    <Stack alignItems={"left"}>
                      <Typography
                        color="secondary"
                        fontWeight={600}
                        fontSize={18}
                        mt={0.8}
                        variant="body2"
                      >
                        {stransaz?.amountInCrypto}
                      </Typography>

                      {/* <Typography
                        color="secondary"
                        fontWeight={600}
                        fontSize={16}
                        mt={2}
                        variant="body2"
                      >
                        Status
                      </Typography> */}
                    </Stack>
                  </Box>
                </Stack>
              </Box>

              <Box>
                <Stack
                  direction="row"
                  justifyContent={"top"}
                  alignItems={"center"}
                  mt={-3}
                >
                  <LazyImageComponent src={ExchanageIcon} />
                </Stack>
              </Box>

              <Box>
                <Stack direction="row" mr={2} justifyContent="flex-end">
                  <LazyImageComponent sx={{ marginRight: 4 }} src={DownArrow} />
                  <Typography mt={0.2} fontSize={14}>
                    To receive
                  </Typography>
                </Stack>

                <Box mr={1.5} mt={2}>
                  <Stack direction="row" justifyContent="flex-end">
                    <LazyImageComponent
                      style={{ width: 25, marginRight: 4 }}
                      src={NGFlag}
                    />
                    <Typography
                      color="secondary"
                      fontWeight={400}
                      fontSize={15}
                      mt={0.2}
                      variant="body2"
                    >
                      {stransaz?.currency?.currencyCode}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="flex-end">
                    <Box
                    // sx={{
                    //   borderBottom: 1,
                    //   borderBottomStyle: "dashed",
                    // }}
                    >
                      <Typography
                        fontSize={18}
                        fontWeight={600}
                        mt={0.4}
                        color="secondary"
                        variant="body2"
                      >
                        {(stransaz?.amountInCrypto*stransaz?.tokenPricePerUnit).toFixed(2)}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* <Stack direction="row" justifyContent="flex-end">
                    <Typography
                      color="primary"
                      fontWeight={600}
                      fontSize={16}
                      mt={2}
                      variant="body2"
                    >
                      paid
                      {stransaz?.status}
                    </Typography>
                  </Stack> */}
                </Box>
              </Box>
            </Stack>
          </Box>
        </ListItem>
      </>

      {isloading ? (
        <center>
          <LoadingButton loading>Login</LoadingButton>
        </center>
      ) : (
        <>
          <>
            {transaz.length > 0 ? (
              <>
                <List>
                  {transaz.map((info, index) => (
                    <>
                      <ListItem>
                        <Box
                          borderWidth={1}
                          borderBottom={1}
                          m={isMobile ? 0 : 3}
                          width={"100%"}
                        >
                          <Stack
                            direction="row"
                            alignItems={"center"}
                            justifyContent="space-between"
                          >
                            <Box>
                              <Stack direction="row">
                                <LazyImageComponent
                                  sx={{ marginRight: 4 }}
                                  src={UpArrow}
                                />
                                <Typography mt={0.2} fontSize={14}>
                                  Sent
                                </Typography>
                              </Stack>
                              <Stack mt={2} ml={-1} direction="row">
                                <Box ml={1.5}>
                                  <Stack
                                    direction="row"
                                    justifyItems={"center"}
                                    alignItems={"center"}
                                  >
                                    <LazyImageComponent
                                      style={{
                                        marginRight: 4,
                                        width: 25,
                                        height: 25,
                                      }}
                                      src={info?.offer?.cryptoCurrency?.imgUri}
                                    />
                                    <Typography
                                      color="secondary"
                                      fontWeight={400}
                                      fontSize={15}
                                      mt={0.5}
                                      variant="body2"
                                    >
                                      {
                                        info?.offer?.cryptoCurrency
                                          ?.abbreviation
                                      }
                                    </Typography>
                                  </Stack>
                                  <Stack alignItems={"left"}>
                                    <Typography
                                      color="secondary"
                                      fontWeight={600}
                                      fontSize={18}
                                      mt={0.8}
                                      variant="body2"
                                    >
                                      {info?.amountInCrypto.toFixed(6)}
                                    </Typography>

                                    <Typography
                                      color="secondary"
                                      fontWeight={600}
                                      fontSize={16}
                                      mt={2}
                                      variant="body2"
                                    >
                                      Status
                                    </Typography>
                                  </Stack>
                                </Box>
                              </Stack>
                            </Box>

                            <Box>
                              <Stack
                                direction="row"
                                justifyContent={"top"}
                                alignItems={"center"}
                                mt={-3}
                              >
                                <LazyImageComponent src={ExchanageIcon} />
                              </Stack>
                            </Box>

                            <Box>
                              <Stack
                                direction="row"
                                mr={2}
                                justifyContent="flex-end"
                              >
                                <LazyImageComponent
                                  sx={{ marginRight: 4 }}
                                  src={DownArrow}
                                />
                                <Typography mt={0.2} fontSize={14}>
                                  To receive
                                </Typography>
                              </Stack>

                              <Box mr={1.5} mt={2}>
                                <Stack
                                  direction="row"
                                  justifyContent="flex-end"
                                >
                                  <LazyImageComponent
                                    style={{ width: 25, marginRight: 4 }}
                                    src={NGFlag}
                                  />
                                  <Typography
                                    color="secondary"
                                    fontWeight={400}
                                    fontSize={15}
                                    mt={0.2}
                                    variant="body2"
                                  >
                                    {info?.offer?.currency?.currencyCode}
                                  </Typography>
                                </Stack>
                                <Stack
                                  direction="row"
                                  justifyContent="flex-end"
                                >
                                  <Box
                                  // sx={{
                                  //   borderBottom: 1,
                                  //   borderBottomStyle: "dashed",
                                  // }}
                                  >
                                    <Typography
                                      fontSize={18}
                                      fontWeight={600}
                                      mt={0.4}
                                      color="secondary"
                                      variant="body2"
                                    >
                                      {info?.amountInFiat.toFixed(2)}
                                    </Typography>
                                  </Box>
                                </Stack>

                                <Stack
                                  direction="row"
                                  justifyContent="flex-end"
                                >
                                  <Typography
                                    color="primary"
                                    fontWeight={600}
                                    fontSize={16}
                                    mt={2}
                                    variant="body2"
                                  >
                                    {/* paid */}
                                    {info?.status}
                                  </Typography>
                                </Stack>
                              </Box>
                            </Box>
                          </Stack>

                          <Box
                            mt={2}
                            p={1.6}
                            mb={2}
                            borderRadius={5}
                            bgcolor={"#E8E8F3"}
                          >
                            <Stack
                              mx={0.5}
                              direction="row"
                              justifyContent="space-between"
                              alignItems={"center"}
                            >
                              {/* <Stack direction="row"> */}
                              {/* <Typography
                                  mr={2}
                                  variant="caption"
                                  textTransform={"none"}
                                  fontSize={14}
                                  color="#202020"
                                >
                                  {info?.createdBy?.firstName + " "}
                                  {info?.createdBy?.lastName}
                                </Typography> */}
                              {/* <LazyImageComponent src={Chat} /> */}
                              {/* </Stack> */}
                              {info?.sellerHasReceivedFiat ||
                              secondStep === info?.id ? (
                                <Stack direction="row">
                                  <Typography
                                    mr={1}
                                    variant="caption"
                                    textTransform={"none"}
                                    fontSize={14}
                                    color="#05A753"
                                  >
                                    Confirmed
                                  </Typography>
                                  <LazyImageComponent src={Confirmed} />
                                </Stack>
                              ) : (
                                <Box
                                  button
                                  onClick={() => respond(info)}
                                  sx={{ cursor: "pointer" }}
                                >
                                  {nloading ? (
                                    <Box>
                                      <LoadingButton
                                        style={{
                                          height: 30,
                                          color: "#000",
                                          borderRadius: 10,
                                          fontSize: 12,
                                          textTransform: "none",
                                        }}
                                        nloading
                                      ></LoadingButton>
                                    </Box>
                                  ) : (
                                    <Typography
                                      variant="caption"
                                      textTransform={"none"}
                                      fontSize={14}
                                      color="#3063E9"
                                    >
                                      Confirm Receipt
                                    </Typography>
                                  )}
                                </Box>
                              )}

                              <Typography
                                variant="caption"
                                textTransform={"none"}
                                fontSize={14}
                                color="#202020"
                              >
                                {parseFloat(info?.amountInFiat).toFixed(4)}
                              </Typography>
                            </Stack>
                          </Box>
                        </Box>
                      </ListItem>
                    </>
                  ))}
                </List>
              </>
            ) : (
              <Box height={200} p={4}>
                <Box height={50}></Box>
                <center>
                  <Typography
                    variant="caption"
                    textTransform={"none"}
                    fontSize={14}
                    color="background.dark"
                  >
                    You do not have any sell transactions details.
                  </Typography>
                </center>
              </Box>
            )}
          </>
          <Box mx={2}>
            <Stack mt={2} direction="row" justifyContent="space-between">
              <Typography
                variant="caption"
                textTransform={"none"}
                fontSize={14}
                color="background.dark"
              >
                Total
              </Typography>

              <Typography
                variant="caption"
                textTransform={"none"}
                fontSize={14}
                color="background.dark"
              >
                {stransaz?.cryptoCurrency?.abbreviation}{" "}
                {stransaz?.amountInCrypto}
              </Typography>
            </Stack>
            {secondStepInfo ? (
              <Box mt={4}>
                <Typography className={styles.nameFont} variant="body2" mb={1}>
                  Amount
                </Typography>
                <Input
                  disableUnderline
                  className="inputField"
                  autoCapitalize="off"
                  type="text"
                  variant="outlined"
                  size="small"
                  placeholder={
                    "Amount between 0 and " + stransaz?.amountInCrypto
                  }
                  // value={userInfo?.firstName + " " + userInfo.lastName}
                  onChange={(e) => setAmount(e.target.value)}
                  fullWidth
                  color="secondary"
                />
                <Typography
                  className={styles.nameFont}
                  variant="body2"
                  mt={3}
                  mb={1}
                >
                  Reason
                </Typography>

                <Input
                  disableUnderline
                  className="inputField"
                  type="text"
                  variant="outlined"
                  placeholder="Reason"
                  onChange={(e) => setReason(e.target.value)}
                  size="small"
                  fullWidth
                  color="secondary"
                />

                <Stack direction={"row"} mt={5}>
                  <Box mr={4}>
                    <Button
                      onClick={() => setSecondStepInfo(false)}
                      style={{
                        height: 60,
                        width: "120px",
                        borderRadius: 10,
                        fontSize: 20,
                        textTransform: "none",
                      }}
                      variant="outlined"
                      color="primary"
                    >
                      Close
                    </Button>
                  </Box>
                  {loading ? (
                    <LoadingButton loading variant="outlined">
                      Login
                    </LoadingButton>
                  ) : (
                    <>
                      <Button
                        fullWidth
                        onClick={() => escrowSubmit()}
                        style={{
                          height: 60,
                          borderRadius: 10,
                          fontSize: 20,
                          textTransform: "none",
                        }}
                        variant="contained"
                        color="primary"
                      >
                        Withdraw
                      </Button>
                    </>
                  )}
                </Stack>
              </Box>
            ) : (
              <Stack
                mt={4}
                direction="row"
                justifyContent={isMobile ? " " : "flex-end"}
              >
                <Button
                  onClick={() => setSecondStepInfo(true)}
                  fullWidth={isMobile ? true : false}
                  variant="contained"
                  color="primary"
                >
                  <Typography
                    variant="caption"
                    p={0.6}
                    textTransform={"none"}
                    fontSize={14}
                    color="background.light"
                  >
                    Withdraw from Escrow
                  </Typography>
                </Button>
              </Stack>
            )}
          </Box>
        </>
      )}
    </React.Fragment>
  );
};

export default SellDetail;
