import React, { Suspense, useEffect, useState } from "react";
import {
  Input,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { Box } from "@mui/system";
import { CopyToClipboard } from "react-copy-to-clipboard";

// axios
import axios from "axios";

// Custom Table Cell and Row
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/StyledTable/StyledTable";

// Theme
import { useTheme } from "@mui/material/styles";

// Bitcoin Logo
import BitcoinLogo from "../../../assets/bitCoinIcon.svg";

// Styles
import styles from "./TableArea.module.css";

// Lazy Image
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

// Table Header
const tableHeader = [
  {
    name: "Asset",
  },
  {
    name: "Amount",
  },
  {
    name: "Address",
  },
  {
    name: "Time Stamp",
  },
];

const TransactionArea = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [tablePage, setTablePage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [copied, setCopied] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    axios
      .get("/CryptoWalletTransactionHistoryData.json")
      .then((res) => setTransactionData(res.data));
  }, []);

  const emptyRows =
    tablePage > 0
      ? Math.max(0, (1 + tablePage) * rowsPerPage - transactionData.length)
      : 0;

  // Table Handler
  const handleChangePage = (event, newPage) => {
    setTablePage(newPage);
  };

  // This will set the copy status to its preavious state
  useEffect(() => {
    if (copied) {
      const changeCopyStatus = setTimeout(() => {
        setCopied(false);
      }, 1000);

      return () => clearInterval(changeCopyStatus);
    }
  }, [copied]);

  return (
    <Box>
      <Box>
        <Typography variant="button" color="secondary">
          Transactions
        </Typography>
        <Box mt={3} className={styles.tableArea}>
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
                      <StyledTableCell component="th" scope="row">
                        <Stack direction="row" spacing={3}>
                          <Box>
                            <Suspense
                              fallback={
                                <Skeleton
                                  animation="wave"
                                  variant="circular"
                                  width={20}
                                  height={20}
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
                              <LazyImageComponent
                                style={{ width: "20px", height: "20px" }}
                                src={BitcoinLogo}
                              />
                            </Suspense>
                          </Box>
                          <Box mt={-0.5}>{td.asset}</Box>
                        </Stack>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {td.transactionType === "deposit" ? (
                          <Typography variant="body2" color="text.success">
                            {td.transactionAmount}
                          </Typography>
                        ) : (
                          <Typography variant="body2" color="error">
                            {td.transactionAmount}
                          </Typography>
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <Tooltip
                          placement="bottom-start"
                          TransitionComponent={Zoom}
                          title={
                            copied ? (
                              <Typography
                                variant="caption"
                                color="text.success"
                              >
                                Address Copied!
                              </Typography>
                            ) : (
                              "Copy"
                            )
                          }
                        >
                          <Box>
                            <CopyToClipboard
                              text={td.transactionAddress}
                              onCopy={() => setCopied(true)}
                            >
                              <Input
                                inputProps={{
                                  style: {
                                    fontSize: "14px",
                                    cursor: "pointer",
                                  },
                                }}
                                size="small"
                                fullWidth
                                disableUnderline
                                value={td.transactionAddress}
                                readOnly
                              />
                            </CopyToClipboard>
                          </Box>
                        </Tooltip>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {td.transactionTimeStamp}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                {emptyRows > 0 && (
                  <StyledTableRow>
                    <StyledTableCell colSpan={6} />
                  </StyledTableRow>
                )}
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

export default TransactionArea;
