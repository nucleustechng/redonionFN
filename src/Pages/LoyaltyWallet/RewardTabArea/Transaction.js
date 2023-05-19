import React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";

// Custom Table Cell and Row
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/StyledTable/StyledTable";

// Styles
import styles from "./RewardTabArea.module.css";

// Fake Transaction Data
const transactionData = [
  {
    id: "1",
    transactionType: "Reward",
    coin: "50",
    transactionId: "2368712547285478",
    timeStamp: "Today, 03:12 PM",
  },
  {
    id: "2",
    transactionType: "Redeem",
    coin: "50",
    transactionId: "2368712547285478",
    timeStamp: "Today, 03:12 PM",
  },
  {
    id: "3",
    transactionType: "Reward",
    coin: "50",
    transactionId: "2368712547285478",
    timeStamp: "Today, 03:12 PM",
  },
  {
    id: "4",
    transactionType: "Redeem",
    coin: "50",
    transactionId: "2368712547285478",
    timeStamp: "Today, 03:12 PM",
  },
  {
    id: "5",
    transactionType: "Reward",
    coin: "50",
    transactionId: "2368712547285478",
    timeStamp: "Today, 03:12 PM",
  },
  {
    id: "6",
    transactionType: "Redeem",
    coin: "50",
    transactionId: "2368712547285478",
    timeStamp: "Today, 03:12 PM",
  },
  {
    id: "7",
    transactionType: "Reward",
    coin: "50",
    transactionId: "2368712547285478",
    timeStamp: "Today, 03:12 PM",
  },
  {
    id: "8",
    transactionType: "Reward",
    coin: "50",
    transactionId: "2368712547285478",
    timeStamp: "Today, 03:12 PM",
  },
  {
    id: "9",
    transactionType: "Reward",
    coin: "50",
    transactionId: "2368712547285478",
    timeStamp: "Today, 03:12 PM",
  },
  {
    id: "10",
    transactionType: "Reward",
    coin: "50",
    transactionId: "2368712547285478",
    timeStamp: "Today, 03:12 PM",
  },
  {
    id: "11",
    transactionType: "Reward",
    coin: "50",
    transactionId: "2368712547285478",
    timeStamp: "Today, 03:12 PM",
  },
];

const tableHeader = [
  {
    name: "Transaction Type",
  },
  {
    name: "Coin",
  },
  {
    name: "Transaction Id",
  },
  {
    name: "Timestamp",
  },
];

const Transaction = () => {
  const [tablePage, setTablePage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Table handler
  const handleChangePage = (event, newPage) => {
    setTablePage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setTablePage(0);
  };

  return (
    <React.Fragment>
      {!isMobile && (
        <Box className={styles.availableReward}>
          <Typography variant="button" color="secondary">
            Transactions
          </Typography>
          <Box className={styles.tableArea} mt={3}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {tableHeader.map((th) => (
                      <StyledTableCell key={th.name}>{th.name}</StyledTableCell>
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
                        <StyledTableCell align="left">
                          <Typography
                            variant="body2"
                            color={
                              td.transactionType === "Reward"
                                ? "text.success"
                                : "error"
                            }
                          >
                            {td.transactionType}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {td.coin}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {td.transactionId}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {td.timeStamp}
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
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Box>
      )}
      {isMobile && (
        <Box px={3}>
          <Typography variant="button" color="secondary">
            Transactions
          </Typography>
          <Box className={styles.tableAreaMobile} mt={3}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {tableHeader.map((th) => (
                      <StyledTableCell key={th.name}>
                        <Typography variant="caption">
                          {th.name.split(" ").slice(0, 1)}
                        </Typography>
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
                        <StyledTableCell align="left">
                          <Typography
                            variant="caption"
                            color={
                              td.transactionType === "Reward"
                                ? "text.success"
                                : "error"
                            }
                          >
                            {td.transactionType}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <Typography variant="caption">{td.coin}</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <Typography variant="caption">
                            {td.transactionId}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <Typography variant="caption">
                            {td.timeStamp}
                          </Typography>
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
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};

export default Transaction;
