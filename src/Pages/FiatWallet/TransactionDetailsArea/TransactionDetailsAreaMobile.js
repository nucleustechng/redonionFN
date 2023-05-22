import React, { Suspense, useEffect, useState } from "react";
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
  useTheme,
  Input,
  Tooltip,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import tableDetailsIcon from "../../../assets/tableDetailsIcon.svg";

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
import { ModalSkeletons } from "../../../components/Skeletons/ComponentSkeletons";

// Table Header
const tableHeader = [
  {
    name: "Amount",
  },
  {
    name: "Method",
  },
  {
    name: "Status",
  },
  {
    name: "Details",
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
  import("./FiatTableDetailsModal")
);

const TransactionDetailsAreaMobile = () => {
  const [showModal, setShowModal] = useState(false);
  const [fromDateValue, setFromDateValue] = React.useState(null);
  const [toDateValue, setToDateValue] = React.useState(null);
  const [transactionData, setTransactionData] = useState([]);

  // Pages
  const [tablePage, setTablePage] = React.useState(0);
  const rowsPerPage = 10;

  const theme = useTheme();

  // Table Handler
  const handleChangePage = (event, newPage) => {
    setTablePage(newPage);
  };

  // Modal Handler
  const handleOpenTableDetailsModal = () => {
    setShowModal(true);
  };

  const handleCloseTableDetailsModal = () => {
    setShowModal(false);
  };

  // Fetching Data
  useEffect(() => {
    axios
      .get("/FiatTransactionData.json")
      .then((res) => setTransactionData(res.data));
  }, []);

  return (
    <Box className={styles.mainBoxMobile}>
      <Suspense fallback={<ModalSkeletons />}>
        <FiatTableDetailsModal
          open={showModal}
          onClose={handleCloseTableDetailsModal}
          modalTitle="Transaction Details"
          tableHeads={modalTableHeader}
          tableData={transactionData}
        />
      </Suspense>
      <Box
        bgcolor={theme.palette.background.paper}
        className={styles.filterBoxMobile}
      >
        <Box className={styles.searchAreaMobile}>
          <Input
            disableUnderline
            fullWidth
            className="inputField"
            size="small"
            placeholder="Search"
            id="filled-adornment-password"
            startAdornment={
              <InputAdornment position="start">
                <Box className={styles.searchBoxMobile}>
                  <IconButton edge="start">
                    <SearchIcon color="secondary" />
                  </IconButton>
                </Box>
              </InputAdornment>
            }
          />
        </Box>
        <Box>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Box className={styles.datePickerAreaMobile}>
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
            </Box>
            <Box>
              <Button sx={{ py: 1.2 }} variant="outlined" color="primary">
                Search
              </Button>
            </Box>
          </Stack>
        </Box>
        <Divider sx={{ mt: 3 }} />
      </Box>
      <Box className={styles.tableBoxMobile}>
        <Box mt={-1} py={2} px={2} bgcolor={theme.palette.background.paper}>
          <Typography variant="button" color="secondary">
            Transactions
          </Typography>
        </Box>
        <Box className={styles.tableAreaMobile} mt={3}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {tableHeader.map((th) => (
                    <StyledTableCell key={th.name}>
                      <Typography variant="caption">{th.name}</Typography>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionData
                  .slice(
                    tablePage * rowsPerPage,
                    tablePage * rowsPerPage + rowsPerPage
                  )
                  .map((td) => (
                    <StyledTableRow key={td.id}>
                      <StyledTableCell scope="row">
                        {td?.type === "deposit" ? (
                          <Typography color="text.success" variant="caption">
                            ₹ {td.amount}
                          </Typography>
                        ) : (
                          <Typography color="error" variant="caption">
                            ₹ {td.amount}
                          </Typography>
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <Typography variant="caption">
                          {td.paymentMethod}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {td.status === "Success" && (
                          <Typography color="text.success" variant="caption">
                            {td.status}
                          </Typography>
                        )}
                        {td.status === "Pending" && (
                          <Typography color="text.tertiary" variant="caption">
                            {td.status}
                          </Typography>
                        )}
                        {td.status === "Failed" && (
                          <Typography color="error" variant="caption">
                            {td.status}
                          </Typography>
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <Tooltip title={td.timeStamp}>
                          <IconButton
                            onClick={handleOpenTableDetailsModal}
                            color="secondary"
                          >
                            <img src={tableDetailsIcon} alt="Details" />
                          </IconButton>
                        </Tooltip>
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
  );
};

export default TransactionDetailsAreaMobile;
