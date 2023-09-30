import React, { Suspense, useEffect, useState } from "react";

// Material
import { Box } from "@mui/system";
// Axios
import axios from "../../../api/axios";

// Styles
import styles from "./TableArea.module.css";
import {
  Skeleton,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Button,
  Typography,
  TablePagination,
  useMediaQuery,
} from "@mui/material";

import BANK from "../../../assets/bank.svg";

import moment from "moment";

// Theme
import { useTheme } from "@mui/material/styles";

// Table
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/StyledTable/StyledTable";

// Route
import { Link, useNavigate } from "react-router-dom";

import { LoadingButton } from "@mui/lab";

// Lazy Image Loader
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

// table header
const tableHeader = [
  {
    name: "To Wallet Address",
  },
  {
    name: "Date",
  },
  {
    name: "Amount",
  },
  // {
  //   name: "Value",
  // },
  // {
  //   name: "Status",
  // },
];

const TableArea = (props) => {
  const [coinData, setCoinData] = useState([]);
  const [tablePage, setTablePage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [abbreviation, setAbbreviation] = useState("");

  const navigate = useNavigate();

  // theme
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [loading, setLoading] = useState(false);

  const [showPin, setShowPin] = useState(false);

  const [showSingleData, setShowSingleData] = useState();

  const handleCloseTwoFAPin = (data) => {
    console.log(data);
    setShowSingleData(data);
    setShowPin(!showPin);
  };

  // Table Handler
  const handleChangePage = (event, newPage) => {
    setTablePage(newPage);
  };

  const USER_UPLOAD_URL = "/wallet/transactions";
  console.log(props);
  // Loading coin data
  useEffect(() => {
    //  console.log(props.coinID);
    if (props.coinID !== "") {
      var user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);

      axios
        .post(
          USER_UPLOAD_URL,
          JSON.stringify({
            walletId: props.coinID,
          }),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((res) => {
          const dataa = res.data.data.transactions;
          console.log(dataa);
          // const filtered = dataa.filter((data) => {
          //   return data.status === "COMPLETED";
          // });

          setCoinData(dataa);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    }
    setAbbreviation(props?.abbreviation)
  }, [props, USER_UPLOAD_URL, setLoading]);

  return (
    <>
      {loading ? (
        <Box>
          <LoadingButton
            fullWidth
            style={{
              height: 120,
              borderRadius: 10,
              fontSize: 20,
              textTransform: "none",
            }}
            loading
          >
            Sign Up
          </LoadingButton>
        </Box>
      ) : (
        <>
          <Box className={styles.mainBox}>
            {!isMobile ? (
              <Box
                className={!isTablet ? styles.tableArea : styles.tableAreaTab}
              >
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {tableHeader.map((th) => (
                          <StyledTableCell key={th.name}>
                            <Typography
                              variant="caption"
                              textTransform={"none"}
                              fontWeight={600}
                              fontSize={16}
                              color="primary"
                            >
                              {th.name}
                            </Typography>
                          </StyledTableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <>
                        {coinData.length > 0 ? (
                          <>
                            {coinData
                              .slice(
                                tablePage * rowsPerPage,
                                tablePage * rowsPerPage + rowsPerPage
                              )
                              .map((cd) => (
                                <StyledTableRow key={cd.coinName}>
                                  <StyledTableCell
                                    // onClick={() => navigate(`/wallets/${cd.coinName}`)}
                                    // onClick={handleCloseTwoFAPin}
                                    component="th"
                                    scope="row"
                                    sx={{ cursor: "pointer" }}
                                  >
                                    <Stack direction="row" spacing={3}>
                                      <Box mt={-0.5}>
                                        {"Trade No: "}
                                        {cd?.toAddress}
                                      </Box>
                                    </Stack>
                                  </StyledTableCell>
                                  <StyledTableCell align="left">
                                    {moment(cd?.createdAt).format(
                                      "MMMM Do, YYYY"
                                    )}
                                  </StyledTableCell>
                                  <StyledTableCell align="left">
                                    {cd.amount}
                                  </StyledTableCell>

                                  {/* <StyledTableCell align="left">
                                  <LazyImageComponent src={COMPLETED} />
                                </StyledTableCell> */}
                                </StyledTableRow>
                              ))}
                          </>
                        ) : (
                          <>
                            <Box mb={1} ml={1.8}>
                              <Typography>
                                No Transactions Available...
                              </Typography>
                            </Box>
                          </>
                        )}
                      </>
                    </TableBody>
                  </Table>
                </TableContainer>
                {coinData.length > 0 && (
                  <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={coinData.length}
                    rowsPerPage={rowsPerPage}
                    page={tablePage}
                    onPageChange={handleChangePage}
                  />
                )}
              </Box>
            ) : (
              <Box>
                {coinData.length > 0 ? (
                  <Box>
                    {coinData.map((cd) => (
                      <Box py={1.5}>
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                        >
                          <Box>
                            <Stack
                              direction={"row"}
                              // alignItems={"center"}
                              // justifyContent={"space-between"}
                            >
                              <LazyImageComponent src={BANK} />
                              <Box ml={2}>
                                <Typography textAlign={"left"} fontSize={13}>
                                  Sent
                                </Typography>
                                <Typography textAlign={"left"} fontSize={13}>
                                  {moment(cd?.createdAt).format(
                                    "MMMM Do, YYYY"
                                  )}
                                </Typography>
                              </Box>
                            </Stack>
                          </Box>
                          <Typography fontSize={14} fontWeight={700}>
                            {abbreviation + " " +cd.amount}
                          </Typography>
                        </Stack>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography fontSize={13}>
                    No Transactions Available...{" "}
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default TableArea;
