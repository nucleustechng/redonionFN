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

  var user = JSON.parse(localStorage.getItem("user"));

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
        // console.log(res.data.data)
        setTransaz(res.data.data.offers);
      })
      .catch((err) => {
        // console.log(err?.response?.status);
        if (err?.response?.status === 401) {
          navigate("/user/sign-in");
        }
      })
      .finally(() => {});
  }, [user, navigate, setTransaz, GET_CURRENCY_URL]);

  return (
    <React.Fragment>
      <Paper style={{ maxHeight: "100%", overflow: "auto" }}>
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
          <>
            <Stack
              mt={6}
              direction="row"
              alignItems={"center"}
              justifyContent="center"
            >
              <Button variant="contained" color="primary">
                <Typography
                  variant="caption"
                  textTransform={"none"}
                  fontSize={20}
                  color="background.light"
                >
                  No pending transaction
                </Typography>
              </Button>
            </Stack>
          </>
        )}
      </Paper>
    </React.Fragment>
  );
};

export default MyRewards;
