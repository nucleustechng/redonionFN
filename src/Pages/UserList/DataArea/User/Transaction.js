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
  List,
} from "@mui/material";
import moment from "moment";
import ListItem from "@mui/material/ListItem";
// import Back from "../../../assets/backArrow.svg";
import { LoadingButton } from "@mui/lab";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";

// Custom Theme
import { useTheme } from "@mui/material/styles";

import UpArrow from "../../../../assets/upArrow.svg";
import DownArrow from "../../../../assets/arrowDown.svg";

import ExchanageIcon from "../../../../assets/exchange.svg";

// Axios
import axios from "../../../../api/axios";

// Router
import { useNavigate } from "react-router-dom";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../../../components/LazyImageComponent/LazyImageComponent")
);



const Transaction = (prop) => {
  const [openRewardModal, setOpenRewardModal] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
 const [isloading, setIsLoading] = React.useState(false);
  const [tranz, setTransaz] = useState([]);

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [secondStep, setSecondStep] = React.useState(0);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  var passUser = prop.data;




  //   console.log(user);

  const GET_transaction_URL = "/transaction/transactions";

  useEffect(() => {
      var user = JSON.parse(localStorage.getItem("user"));
    axios
      .post(
        GET_transaction_URL,
        JSON.stringify({
          userId: prop.data?.id,
        }),

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data.offers);
        setTransaz(res.data.data.offers);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          navigate("/admin/sign-in");
        }
      })
      .finally(() => {});
  }, [prop, navigate]);

  return (
    <React.Fragment>
      {isloading ? (
        <center>
          <LoadingButton loading>Login</LoadingButton>
        </center>
      ) : (
        <>
          {secondStep === 0 && (
            <>
              {tranz.length > 0 ? (
                <List>
                  {tranz.map((info, index) => (
                    <>
                      <ListItem
                        key={index}
                        button
                        // onClick={() => getSubmit(info)}
                        sx={{ cursor: "pointer" }}
                      >
                        <Box m={isMobile ? 0 : 3} width={"100%"}>
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
                                {/* <Typography mt={0.2} fontSize={14}>
                                    Sent
                                  </Typography> */}
                              </Stack>
                              <Stack mt={2} ml={-1} direction="row">
                                <Box ml={1.5}>
                                  <Stack alignItems={"left"}>
                                    <Typography
                                      color="secondary"
                                      fontWeight={400}
                                      fontSize={15}
                                      mt={0.8}
                                      variant="body2"
                                    >
                                      {info?.offer?.currency?.currencyCode}
                                      {/* code */}
                                    </Typography>

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
                                        {/* {"776.00"} */}
                                        {parseFloat(
                                          info?.amountInFiat || 0
                                        ).toFixed(2)}
                                      </Typography>
                                    </Box>

                                    {/* <Typography
                          color="secondary"
                          fontWeight={400}
                          fontSize={12}
                          mt={0.8}
                          variant="body2"
                        >
                          {moment(info?.createdAt).format(
                                    "Do MMMM YYYY"
                                  )}
                          date
                        </Typography> */}

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
                                justifyContent={"center"}
                                alignItems={"center"}
                                mt={4}
                              >
                                <LazyImageComponent src={ExchanageIcon} />
                              </Stack>
                              {/* <Box ml={0}>
                    <center>
                      <Typography
                        color="secondary"
                        fontWeight={400}
                        fontSize={14}
                        mt={0.8}
                        variant="body2"
                      >
                        date
                        {moment(info?.createdAt).format("h:mm a")}{" "}
                      </Typography>

                      <Typography
                        color="secondary"
                        ml={-1}
                        fontWeight={400}
                        fontSize={16}
                        mt={0.8}
                        variant="body2"
                      >
                        id
                        {info?.cryptoTransactionId}
                      </Typography>
                    </center>
                  </Box> */}
                            </Box>

                            <Box mt={-2}>
                              <Stack
                                direction="row"
                                mr={2}
                                justifyContent="flex-end"
                              >
                                <LazyImageComponent
                                  sx={{ marginRight: 4 }}
                                  src={DownArrow}
                                />
                                {/* <Typography mt={0.2} fontSize={14}>
                                    To receive
                                  </Typography> */}
                              </Stack>

                              <Box mr={1.5} mt={2}>
                                <Stack
                                  direction="row"
                                  justifyContent="flex-end"
                                >
                                  <LazyImageComponent
                                style={{ width: 30 }}
                                src={info?.offer?.cryptoCurrency?.imgUri}
                              />
                                  <Typography
                                    color="secondary"
                                    fontWeight={400}
                                    fontSize={15}
                                    mt={0.8}
                                    variant="body2"
                                  >
                                    {/* receuve */}
                                    {info?.offer?.cryptoCurrency?.abbreviation}
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
                                      ~ {info?.amountInCrypto}
                                      {/* 5667 */}
                                    </Typography>
                                  </Box>
                                </Stack>
                                {/* <Stack direction="row" justifyContent="flex-end">
                      <Typography
                        color="secondary"
                        fontWeight={400}
                        fontSize={12}
                        mt={0.8}
                        variant="body2"
                      >
                        date
                        {moment(info?.createdAt).format("Do MMMM YYYY")}
                      </Typography>
                    </Stack> */}
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

                          {/* <Stack mt={4} direction="row" justifyContent="flex-end">
                <Button
                  onClick={handleCloseTwoFAPin}
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
              </Stack> */}
                        </Box>
                      </ListItem>
                    </>
                  ))}
                </List>
              ) : (
                <Box height={400} p={4}>
                  <Box height={200}></Box>
                  <center>
                    <Typography
                      variant="caption"
                      textTransform={"none"}
                      fontSize={14}
                      color="background.dark"
                    >
                      No transactions.
                    </Typography>
                  </center>
                </Box>
              )}
            </>
          )}
          {secondStep === 1 && (
            <>
              <Box
                button
                onClick={() => setSecondStep(0)}
                sx={{ cursor: "pointer" }}
                mt={3}
                ml={isMobile ? 2 : 0}
              >
                {/* <LazyImageComponent src={Back} /> */}
              </Box>

              {/* <SellDetail stranz={stranz} selldetail={selltranz} /> */}
            </>
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default Transaction;
