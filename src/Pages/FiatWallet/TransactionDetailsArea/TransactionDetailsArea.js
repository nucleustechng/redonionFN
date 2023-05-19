import React, { useEffect, Suspense, useState } from "react";
import { Box } from "@mui/system";
import {
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  MenuItem,
  Select,
  Input,
  Skeleton,
  useMediaQuery
} from "@mui/material";
// Theme
import { useTheme } from "@mui/material/styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import {
  CardSkeleton,
  ComponentSkeleton,
  TableSkeleton,
} from "../../../components/Skeletons/ComponentSkeletons";

// Icons
import SearchIcon from "@mui/icons-material/Search";

// Styles
import styles from "./TransactionDetailsArea.module.css";

// Axios
import axios from "axios";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/StyledTable/StyledTable";
import { DatePickerTextField } from "../../../components/DatePickerTextField/DatePickerTextField";

import ExchanageIcon from "../../../assets/exchange.svg";

import BitCoinIcon from "../../../assets/bitCoinIcon.svg";

import upArrowIcon from "../../../assets/upArrow.svg";

import downArrowIcon from "../../../assets/arrowDown.svg";

// Lazy Image component
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

// Lazy component
const TransactionDrawer = React.lazy(() =>
  import("../../FiatWallet/TransactionDrawer/TransactionDrawer")
);
const TransactionDrawerMobile = React.lazy(() =>
  import("../../FiatWallet/TransactionDrawer/TransactionDrawerMobile")
);

const WithdrawFunds = React.lazy(() =>
  import("../../FiatWallet/WithdrawFunds/WithdrawFunds")
);



// sort
const sortData = [
  {
    id: "1",
    name: "Oldest",
  },
  {
    id: "2",
    name: "Newest",
  },
 
];

// Table Header
const tableHeader = [
  {
    name: "Sent",
  },
  {
    name: "exchange",
  },
  {
    name: "Recieved",
  },
 
];

const TransactionDetailsArea = () => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isReadOnlyDate, setIsReadOnlyDate] = useState({
    readOnlyToDate: true,
    readOnlyFromDate: true,
  });
  const [fromDateValue, setFromDateValue] = React.useState(null);
  const [toDateValue, setToDateValue] = React.useState(null);
  const [transactionData, setTransactionData] = useState([]);

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [withdrawDrawerOpen, setWithdrawDrawerOpen] = useState(false);

  // Pages
  const [tablePage, setTablePage] = React.useState(0);
  const rowsPerPage = 10;

  const [sortNames, setSortNames] = useState("Oldest");

  const [showPaymentAuthorization, setShowPaymentAuthorization] =
    useState(false);

  //Snackbar
  const [showPaymentSnackbar, setShowPaymentSnackbar] = useState(false);


  // Table Handler
  const handleChangePage = (event, newPage) => {
    setTablePage(newPage);
  };

  const handleSortNameSelection = (e) => {
    setSortNames(e.target.value);
  };

  const handleWithdrawDrawer = () => {
   setWithdrawDrawerOpen(!withdrawDrawerOpen);
  };

  // Authorization handler for withdraw
  const handleAuthorizeWithdraw = () => {
    setShowPaymentAuthorization(true);
    setWithdrawDrawerOpen(false);
    const showTheSnackBar = setTimeout(() => {
      setShowPaymentSnackbar(true);
    }, 2500);

    return () => clearInterval(showTheSnackBar);
  };

  

  

  // Fetching Data
  useEffect(() => {
    axios
      .get("/FiatTransactionData.json")
      .then((res) => setTransactionData(res.data));
  }, []);

  return (
   <Box>
      {/* Withdraw Drawer */}
      <Box>
        <Suspense fallback={<ComponentSkeleton />}>
          {!isMobile ? (
            <TransactionDrawer
              drawerOpen={withdrawDrawerOpen}
              handleDrawerToggle={handleWithdrawDrawer}
            >
              <Suspense fallback={<ComponentSkeleton />}>
                <WithdrawFunds
                  handleWithdrawPayment={handleAuthorizeWithdraw}
                  close={handleWithdrawDrawer}
                />
              </Suspense>
            </TransactionDrawer>
          ) : (
            <TransactionDrawerMobile
              drawerOpen={withdrawDrawerOpen}
              handleDrawerToggle={handleWithdrawDrawer}
            >
              <Suspense fallback={<ComponentSkeleton />}>
                <WithdrawFunds
                  handleWithdrawPayment={handleAuthorizeWithdraw}
                  close={handleWithdrawDrawer}
                />
              </Suspense>
            </TransactionDrawerMobile>
          )}
        </Suspense>
      </Box>
      <Box className={styles.mainBox}>
        <Box className={styles.filterBox}>
          {/* <Stack
          direction="row"
          alignItems="center"
          justifyContent="end"
        > */}
          {/* <Box className={styles.searchArea}>
            <Input
              readOnly={isReadOnly}
              disableUnderline
              className="inputField"
              size="small"
              placeholder="Search"
              id="filled-adornment-password"
              startAdornment={
                <InputAdornment position="start">
                  <Box className={styles.searchBox}>
                    <IconButton edge="start">
                      <SearchIcon color="secondary" />
                    </IconButton>
                  </Box>
                </InputAdornment>
              }
              onBlur={() => setIsReadOnly(true)}
              onFocus={() => setIsReadOnly(false)}
            />
          </Box> */}
          <Box mr={2}>
            <Stack
              direction="row"
              // spacing={4}
              alignItems="center"
              justifyContent="flex-end"
            >
              {/* <Box className={styles.datePickerArea}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack direction="row" spacing={3}>
                    <DatePicker
                      disableFuture
                      label="From Date"
                      value={fromDateValue}
                      onChange={(newValue) => {
                        setFromDateValue(newValue);
                      }}
                      renderInput={(params) => (
                        <DatePickerTextField
                          autoComplete="off"
                          color="secondary"
                          variant="outlined"
                          size="small"
                          {...params}
                        />
                      )}
                    />
                    <DatePicker
                      disablePast
                      label="To Date"
                      value={toDateValue}
                      onChange={(newValue) => {
                        setToDateValue(newValue);
                      }}
                      renderInput={(params) => (
                        <DatePickerTextField
                          autoComplete="off"
                          color="secondary"
                          variant="outlined"
                          size="small"
                          {...params}
                        />
                      )}
                    />
                  </Stack>
                </LocalizationProvider>
              </Box> */}
              {/* <Box>
                <Button sx={{ py: 1.2 }} variant="outlined" color="primary">
                  Search
                </Button>
              </Box> */}
              <Box>
                <Select
                  className={theme.palette.mode === "dark" ? "" : styles.currencyBox}
                  sx={{ width: "100%", height: 50, border: 0 }}
                  value={sortNames}
                  onChange={handleSortNameSelection}
                >
                  {sortData.map(({ id, name }) => (
                    <MenuItem key={id} value={name}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Suspense
                          fallback={
                            <Skeleton
                              animation="wave"
                              variant="circular"
                              width={40}
                              height={40}
                              sx={{
                                backgroundColor: `${theme.palette.mode === "dark" ? "#111" : "#f5f5f5"
                                  }`,
                              }}
                            />
                          }
                        >

                        </Suspense>
                        <Typography color="primary">{name}</Typography>
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Stack>
          </Box>
          {/* </Stack> */}
          {/* <Divider sx={{ mt: 3 }} /> */}
        </Box>
        <Box className={styles.tableBox}>

          <Box className={styles.tableArea} mt={3}>
            <TableContainer>
              <Table >
                <TableHead className={styles.tableBoxHead}>
                  <TableRow >

                    <StyledTableCell align="left"  component="th" >Sent</StyledTableCell>
                    <StyledTableCell align="center"  ><LazyImageComponent src={ExchanageIcon}
                    /></StyledTableCell>
                    <StyledTableCell align="right" >Recieved</StyledTableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactionData
                    .slice(
                      tablePage * rowsPerPage,
                      tablePage * rowsPerPage + rowsPerPage
                    )
                    .map((td) => (
                      <StyledTableRow  onClick={handleWithdrawDrawer} key={td.id}>
                        <StyledTableCell align="left"  component="th" >

                          <Stack direction="row"

                          >
                            <Box mt={2}>
                              <LazyImageComponent src={upArrowIcon}
                              />  
                            </Box >
                            <Box ml={1.5}>
                              <Stack direction="row">
                              <LazyImageComponent src={BitCoinIcon}
                              /> 
                                <Typography color="secondary" fontWeight={400} fontSize={15} mt={0.8} ml={1} variant="body2">
                                EUR
                                </Typography>
                              </Stack>
                              <Typography fontSize={16} mt={1.3} color="secondary" variant="body2">
                                ${td.amount}
                              </Typography>
                            </Box>
                          </Stack>

                          

                        </StyledTableCell>
                        <StyledTableCell align="center" >
                          
                          <Typography fontSize={14} mt={1.3} color="secondary" variant="body2">
                            ID: 6728390-465322
                          </Typography>
                          <Typography fontSize={14} mt={1.3} color="secondary" variant="body2">
                            14th October, 2022
                          </Typography>
                          
                        </StyledTableCell>

                        <StyledTableCell align="right">
                          <Stack direction="row"
                              justifyContent={"flex-end"}
                          >
                            
                            <Box mr={1.5}>
                              <Stack direction="row">
                                <LazyImageComponent src={BitCoinIcon}
                                />
                                <Typography color="secondary" fontWeight={400} fontSize={15} mt={0.8} ml={1} variant="body2">
                                  EUR
                                </Typography>
                              </Stack>
                              <Typography fontSize={16} mt={1.3} color="secondary" variant="body2">
                                ${td.amount}
                              </Typography>
                            </Box>
                            <Box  mt={2}>
                              <LazyImageComponent src={downArrowIcon}
                              />
                            </Box >
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
              count={transactionData.length}
              rowsPerPage={rowsPerPage}
              page={tablePage}
              onPageChange={handleChangePage}
            />
          </Box>
        </Box>
      </Box>
   </Box>
  );
};

export default TransactionDetailsArea;
