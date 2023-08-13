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
} from "@mui/material";
import moment from "moment";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";

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

const MyRewards = () => {
  const [openRewardModal, setOpenRewardModal] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const [tranz, setTransaz] = useState([]);

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const GET_CURRENCY_URL = "/transaction/my-transactions";

  useEffect(() => {
    axios
      .post(
        GET_CURRENCY_URL,
        JSON.stringify({
          start: 0,
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
        setTransaz(res.data.data.transactions);
      })
      .catch((err) => {
        // console.log(err?.response?.status);
        if (err?.response?.status === 401) {
          navigate("/user/sign-in");
        }
      })
      .finally(() => {});
  }, [user, navigate]);

  return (
    <React.Fragment>
     {tranz.length > 0 ? (
          <List>
            {tranz.map((info) => (
              <>
                {(info?.status === "PENDING" ||
                  info.status === "REPORTED" ||
                  info.status === "EXPIRED") && (
                  <ListItem>
                    <Box m={6} width={"100%"}>
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
                                justifyContent={"center"}
                                alignItems={"left"}
                              >
                                <Typography
                                  color="secondary"
                                  fontWeight={400}
                                  fontSize={16}
                                  mt={0.8}
                                  ml={1}
                                  variant="body2"
                                >
                                  {info?.offer?.currency?.currencyCode}
                                </Typography>

                                <Box
                                  sx={{
                                    borderBottom: 1,
                                    borderBottomStyle: "dashed",
                                  }}
                                >
                                  <Typography
                                    fontSize={20}
                                    mt={0.4}
                                    color="secondary"
                                    variant="body2"
                                  >
                                    ~{" "}
                                    {parseFloat(
                                      info?.amountInFiat || 0
                                    ).toFixed(2)}
                                  </Typography>
                                </Box>

                                <Typography
                                  color="secondary"
                                  fontWeight={400}
                                  fontSize={12}
                                  mt={0.8}
                                  variant="body2"
                                >
                                  {moment(info?.createdAt).format(
                                    "Do MMMM YYYY"
                                  )}
                                </Typography>

                                <Typography
                                  color="secondary"
                                  fontWeight={600}
                                  fontSize={18}
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
                          {/* <Stack direction="row" justifyContent={"center"} alignItems={"center"} mt={4} >
              <LazyImageComponent  src={ExchanageIcon} />

            </Stack> */}
                          <Box ml={0}>
                            <center>
                              <Typography
                                color="secondary"
                                fontWeight={400}
                                fontSize={14}
                                mt={0.8}
                                variant="body2"
                              >
                                {moment(info?.createdAt).format("h:mm a")}
                              </Typography>

                              <Typography
                                color="secondary"
                                ml={-1}
                                fontWeight={400}
                                fontSize={16}
                                mt={0.8}
                                variant="body2"
                              >
                                {info?.cryptoTransactionId}
                              </Typography>
                            </center>
                          </Box>
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
                            <Stack direction="row" justifyContent="flex-end">
                              <LazyImageComponent
                                style={{ width: 30 }}
                                src={info?.offer?.CryptoCurrency?.imgUri}
                              />
                              <Typography
                                color="secondary"
                                fontWeight={400}
                                fontSize={14}
                                mt={0.8}
                                ml={1}
                                variant="body2"
                              >
                                {info?.offer?.CryptoCurrency?.abbreviation}
                              </Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="flex-end">
                              <Box
                                sx={{
                                  borderBottom: 1,
                                  borderBottomStyle: "dashed",
                                }}
                              >
                                <Typography
                                  fontSize={20}
                                  mt={0.4}
                                  color="secondary"
                                  variant="body2"
                                >
                                  ~ {info?.amountInCrypto}
                                </Typography>
                              </Box>
                            </Stack>
                            <Stack direction="row" justifyContent="flex-end">
                              <Typography
                                color="secondary"
                                fontWeight={400}
                                fontSize={12}
                                mt={0.8}
                                variant="body2"
                              >
                                {moment(info?.createdAt).format("Do MMMM YYYY")}
                              </Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="flex-end">
                              <Typography
                                color="primary"
                                fontWeight={400}
                                fontSize={16}
                                mt={2}
                                variant="body2"
                              >
                                {info?.status}
                              </Typography>
                            </Stack>
                          </Box>
                        </Box>
                      </Stack>

                      {/* <Stack mt={4} direction="row" justifyContent="flex-end">
          <Button
            // onClick={handleCloseTwoFAPin}
            variant="contained" color="primary">
            <Typography variant="caption" p={0.6} textTransform={"none"} fontSize={14} color="background.light">


              Withdraw from Escrow

            </Typography>
          </Button>
        </Stack> */}
                    </Box>
                  </ListItem>
                )}
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
                You do not have any pending buy transactions.
              </Typography>
              <br />
              <Stack direction={"row"} justifyContent={"center"}>
                <Typography mr={0.5} fontSize={14} sx={{ color: "#3063E9" }}>
                  Check your history
                </Typography>
                <Typography
                  variant="caption"
                  textTransform={"none"}
                  fontSize={14}
                  color="background.dark"
                >
                  {" "}
                  to view completed transactions
                </Typography>
              </Stack>
            </center>
          </Box>
        )}
      
    </React.Fragment>
  );
};

export default MyRewards;
