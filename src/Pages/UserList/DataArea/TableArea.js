import React, { Suspense, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { styled } from '@mui/material/styles';
import {
  MenuItem,
  Divider,
  Select,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  useTheme,
  Grid,
  Tooltip,
  Button,
  IconButton,
  InputAdornment,
  Input,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import tableDetailsIcon from "../../../assets/tableDetailsIcon.svg";

import ComponentLoader from "../../../components/ProgressLoader/ComponentLoader";

import { Link, useNavigate } from "react-router-dom";

import moment from "moment";

// Axios
import axios from "../../../api/axios";

// Styles
import styles from "./TransactionDetailsArea.module.css";

import { LoadingButton } from "@mui/lab";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/StyledTable/StyledTable";
import { DatePickerTextField } from "../../../components/DatePickerTextField/DatePickerTextField";

import SearchIcon from "@mui/icons-material/Search";

import { ModalSkeletons } from "../../../components/Skeletons/ComponentSkeletons";

const UserArea = React.lazy(() => import("./UserArea"));

// Table Header
const tableHeader = [
  {
    name: "NAME",
  },
  {
    // name: "Method",
  },
  {
    // name: "Status",
  },
  {
    name: "LOCATION",
  },
];

const modalTableHeader = [
  {
    id: 1,
    name: "Amount",
  },
  {
    id: 2,
    name: "Payment Method",
  },
  {
    id: 3,
    name: "Status",
  },
  {
    id: 4,
    name: "Time Stamp",
  },
  {
    id: 5,
    name: "Transaction ID",
  },
];

const FiatTableDetailsModal = React.lazy(() =>
  import("../../History/TransactionDetailsArea/FiatTableDetailsModal")
);

const TransactionDetailsAreaMobile = () => {
  const [showModal, setShowModal] = useState(false);
  const [fromDateValue, setFromDateValue] = React.useState("01/01/2023");
  const [toDateValue, setToDateValue] = React.useState("01/08/2023");
  const [transactionData, setTransactionData] = useState([]);
  const [country, setcountry] = useState("Nigeria");

  const navigate = useNavigate();

  const countryData = [
    {
      id: "1",
      name: "Nigeria",
      // icon: BitCoinIcon,
    },
  ];

  // Pages
  const [tablePage, setTablePage] = React.useState(0);
  const rowsPerPage = 20;

  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState(false);

  const [isReadOnly, setIsReadOnly] = React.useState(true);

  const theme = useTheme();

  const [filteredRows, setFilteredRows] = useState([]);
  const [searched, setSearched] = useState("");

  // Table Handler
  const handleChangePage = (event, newPage) => {
    setTablePage(newPage);
  };

  // Modal Handler
  const handleOpenTableDetailsModal = (user) => {
    setUserData(user);
    setShowModal(true);
  };

  const handleCloseTableDetailsModal = () => {
    setShowModal(false);
  };

  const ADMIN_USER_URL = "/admin/get-users";

  const ADMIN_COUNTRY_URL = "/user/get-countries";

  const getCountry = (country) => {
    var user = JSON.parse(localStorage.getItem("user"));

    axios
      .get(ADMIN_COUNTRY_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        let data = res.data.data.countries;

        Object.keys(data).map((keys) => {
          if (country.countryId === data[keys].id) {
            return data[keys];
          }

          return 0;
        });
      });
  };

  // Loading coin data
  useEffect(() => {
    setToDateValue(moment().format("YYYY-MM-DD").toString());
    console.log(toDateValue);
    var user = JSON.parse(localStorage.getItem("user"));
    setLoading(true);

    axios
      .post(
        ADMIN_USER_URL,
        JSON.stringify({
          createdAtDateStart: fromDateValue,
          createdAtDateEnd: toDateValue,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        let data = res.data.data.users;
        let datanew = data.filter((course) => course.roles[0] === "CUSTOMER");
        setTransactionData(datanew);
        setFilteredRows(datanew);;
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.status === 401) {
          navigate("/admin/sign-in");
        }
      })
      .finally(() => setLoading(false));
      
  }, [
    navigate,
    ADMIN_USER_URL,
    setTransactionData,
    setLoading,
    fromDateValue,
    toDateValue,
  ]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearched(value);
    requestSearch(value);
  };

  const requestSearch = (searchedVal) => {

    if (searchedVal === undefined || searchedVal.trim() === "") {
      setFilteredRows(transactionData);
      return;
    }
    const filteredRows = transactionData.filter((row) => {
      return row.firstName.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setFilteredRows(filteredRows);
  };


  return (
    <Grid container columns={{ xs: 12, sm: 12, md: 12 }}>
      <Grid item xs={12} sm={12} md={showModal ? 7.5 : 12}>
        <Box className={styles.mainBoxMobile}>
          <Box>
            <Box>
              <Stack direction={{xs:"column" , sm:"column", md:"row"}} alignItems={{xs:"start" , sm:"start", md:"center"}} justifyContent="space-between" >
                <Typography
                  variant="h3"
                  className={styles.titleBox}
                  color="secondary"
                  pr={3}
                  pb={3}
                  fontWeight={600}
                >
                  Users
                </Typography>
              
                <Stack
                  direction="row"
                  // spacing={1}
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Box  className={styles.datePickerAreaMobile}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack direction="row" spacing={1}>
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
                          // disablePast
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
                    {/* <Select
                      className={
                        theme.palette.mode === "dark" ? "" : styles.currencyBox
                      }
                      fullWidth
                      value={country}
                      onChange={handlecountryelection}
                    >
                      {countryData.map(({ id, name, icon }) => (
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
                                    backgroundColor: `${
                                      theme.palette.mode === "dark"
                                        ? "#111"
                                        : "#f5f5f5"
                                    }`,
                                  }}
                                />
                              }
                            >
                          
                            </Suspense>
                            <Typography>{name}</Typography>
                          </Stack>
                        </MenuItem>
                      ))}
                    </Select> */}
                  </Box>
                </Stack>
              </Stack>
              <Box
                marginY={2}
              >
                <Input
                  disableUnderline
                  className="inputField"
                  size="small"
                  placeholder="Search"
                  startAdornment={
                    <InputAdornment position="start">
                      <Box>
                        <IconButton edge="start">
                          <SearchIcon color="secondary" />
                        </IconButton>
                      </Box>
                    </InputAdornment>
                  }
                  value={searched}
                  onChange={handleChange}
                />
              </Box>
            </Box>
            <Divider sx={{ mt: 3 }} />
          </Box>
          <Box className={styles.tableBoxMobile}>
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
              <Box className={styles.tableAreaMobile} mt={3}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {tableHeader.map((th) => (
                          <StyledTableCell key={th.name}>
                            <Typography
                              fontSize={18}
                              fontWeight={700}
                              variant="caption"
                            >
                              {th.name}
                            </Typography>
                          </StyledTableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredRows
                        .slice(
                          tablePage * rowsPerPage,
                          tablePage * rowsPerPage + rowsPerPage
                        )
                        .map((td) => (
                          <>
                            <StyledTableRow
                              Buttton
                              onClick={() => handleOpenTableDetailsModal(td)}
                              sx={{
                                cursor: "pointer",
                                backgroundColor:
                                  userData?.id === td.id ? "#ADD8E6" : "",
                              }}
                              key={td.id}
                            >
                              <StyledTableCell scope="row">
                                <Typography
                                  fontSize={18}
                                  // fontWeight={700}
                                  variant="caption"
                                >
                                  {td.firstName} {td.lastName} {td.middleName}
                                </Typography>
                              </StyledTableCell>
                              <StyledTableCell align="left"></StyledTableCell>
                              <StyledTableCell align="left"></StyledTableCell>
                              <StyledTableCell align="left">
                                <Tooltip title={td.country?.name}>
                                  <Typography
                                    fontSize={18}
                                    // fontWeight={700}
                                    variant="caption"
                                  >
                                    {td.country?.name}
                                  </Typography>
                                </Tooltip>
                              </StyledTableCell>
                            </StyledTableRow>
                          </>
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
            )}
          </Box>
        </Box>
      </Grid>
      {showModal && (
        <Grid item xs={12} sm={12} md={4.5}>
          <Box bgcolor={"#E8E8F3"} height={"100%"} borderRadius={5} p={3}>
            <Suspense fallback={<ComponentLoader />}>
              <UserArea data={userData} />
            </Suspense>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default TransactionDetailsAreaMobile;
