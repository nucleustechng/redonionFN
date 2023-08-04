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

// Bitcoin logo

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

import Star from "../../../assets/star.svg"

import CreateBuyRequestModal from "../CreateBuyRequestModal/CreateBuyRequestModal";

// Lazy Image Loader
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

// table header
const tableHeader = [
  {
    name: "Price",
  },
  {
    name: "Amount",
  },
  {
    name: "Available",
  },
  {
    name: "Selling Rate",
  },
  {
    name: "Take Action",
  },
];

const TableArea = (prop) => {
  const [coinData, setCoinData] = useState([]);
  const [tablePage, setTablePage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();

  // theme
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [loading, setLoading] = useState(false);

  const [showPin, setShowPin] = useState(false);

  const [showSingleData, setShowSingleData] = useState();

  // const handleBuyModal = (data) => {
  //   // console.log(data)
  //   setShowSingleData(data);
  //   // setShowPin(!showPin);
  // };

  // Table Handler
  const handleChangePage = (event, newPage) => {
    setTablePage(newPage);
  };

  const USER_UPLOAD_URL = "/transaction/get-offers";

  // Loading coin data
  useEffect(() => {
    if (prop.data !== "") {
      var user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);

      axios
        .post(USER_UPLOAD_URL, JSON.stringify(prop.data), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setCoinData(res.data.data);
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    }
  }, [prop, USER_UPLOAD_URL, setCoinData, setLoading]);

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
          {/* <CreateBuyRequestModal
                dataSingle={showSingleData}
                datao={prop}
                open={showPin}
                onClose={handleCloseTwoFAPin}
              /> */}

          <Box className={styles.mainBox}>
            <Box className={!isTablet ? styles.tableArea : styles.tableAreaTab}>
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
                    {coinData
                      .slice(
                        tablePage * rowsPerPage,
                        tablePage * rowsPerPage + rowsPerPage
                      )
                      .map((cd) => (
                        <StyledTableRow key={cd.id}>
                          <StyledTableCell
                            // onClick={() => navigate(`/wallets/${cd.coinName}`)}
                            // onClick={handleCloseTwoFAPin}
                            component="th"
                            scope="row"
                            sx={{ cursor: "pointer" }}
                          >
                            <Stack direction="row" spacing={3}>
                              <Box mt={-0.5}>
                                {" "}
                                {prop.currency.currencyCode}{" "}
                                {parseFloat(
                                  cd.tokenPricePerUnit * prop.data.amount
                                ).toFixed(2)}
                              </Box>
                            </Stack>
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {prop.data.coinAbb} 1 ={" "}
                            {parseFloat(cd.tokenPricePerUnit).toLocaleString(
                              undefined,
                              { maximumFractionDigits: 2 }
                            )}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {prop.data.coinAbb} {cd.amountInCrypto}
                          </StyledTableCell>

                          <StyledTableCell align="left">
                            <LazyImageComponent src={Star} />
                            4.5
                          </StyledTableCell>

                          <StyledTableCell align="left">
                            <Stack direction="row" spacing={2}>
                              <Button
                                disableElevation
                                color="success"
                                className={styles.depositButton}
                                variant="text"
                                // onClick={() => navigate(`/wallets/${cd.coinName}`)}
                                onClick={() => prop.handleBuyModal(cd)}
                              >
                                <Typography
                                  variant="caption"
                                  fontWeight={500}
                                  color="text.success"
                                >
                                  Request
                                </Typography>
                              </Button>
                              {/* <Link
                          style={{ textDecoration: "none", color: "inherit" }}
                          to={`/wallets/${cd.coinName}`}
                          state={{ isSending: true }}
                        >
                          <Button
                            disableElevation
                            color="error"
                            className={styles.withdrawButton}
                            variant="text"
                          >
                            <Typography
                              variant="caption"
                              fontWeight={500}
                              color="error"
                            >
                              withdraw
                            </Typography>
                          </Button>
                        </Link> */}
                            </Stack>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={coinData.length}
                rowsPerPage={rowsPerPage}
                page={tablePage}
                onPageChange={handleChangePage}
              />
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default TableArea;