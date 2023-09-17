import React, { Suspense, useEffect, useState } from "react";
import {
  IconButton,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

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
import tableDetailsIcon from "../../../assets/tableDetailsIcon.svg";

// Component Loader
import ComponentLoader from "../../../components/ProgressLoader/ComponentLoader";

// Styles
import styles from "./TableArea.module.css";

// Lazy Image
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

//Lazy Modal
const TableDetailsModal = React.lazy(() =>
  import("../../../components/TableDetailsModal/TableDetailsModal")
);

const modalDataHeader = [
  {
    id: "1",
    name: "Asset",
  },
  {
    id: "2",
    name: "Amount",
  },
  {
    id: "3",
    name: "Address",
  },
  {
    id: "4",
    name: "Time Stamp",
  },
];

// Table Header
const tableHeader = [
  {
    name: "Asset",
  },
  {
    name: "Amount",
  },
  {
    name: "Time Stamp",
  },
];

const TransactionAreaMobile = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [tablePage, setTablePage] = useState(0);
  const rowsPerPage = 10;
  const [copied, setCopied] = useState(false);

  // Modal
  const [showTableDetailsModal, setShowTableDetailsModal] = useState(false);

  const theme = useTheme();

  // Table Handler
  const handleChangePage = (event, newPage) => {
    setTablePage(newPage);
  };

  // Table details modal open
  const handleOpenTableDetailsModal = () => {
    setShowTableDetailsModal(true);
  };

  // Close handler for table details modal
  const handleCloseTableDetailsModal = () => {
    setShowTableDetailsModal(false);
  };

  // Oncopy handler
  const handleOnCopy = () => {
    setCopied(true);
  };

  useEffect(() => {
    axios
      .get("/CryptoWalletTransactionHistoryData.json")
      .then((res) => setTransactionData(res.data));
  }, []);

  const emptyRows =
    tablePage > 0
      ? Math.max(0, (1 + tablePage) * rowsPerPage - transactionData.length)
      : 0;

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
      <Suspense fallback={<ComponentLoader />}>
        <TableDetailsModal
          open={showTableDetailsModal}
          onClose={handleCloseTableDetailsModal}
          modalTitle={"Transaction Details"}
          tableData={transactionData}
          tableHeads={modalDataHeader}
          handleOnCopy={handleOnCopy}
          copied={copied}
        />
      </Suspense>
      <Box>
        <Box mt={-3} px={1} py={2} bgcolor={theme.palette.background.paper}>
          <Typography variant="button" color="secondary">
            Transactions
          </Typography>
        </Box>
        <Box mt={3} className={styles.tableAreaMobile}>
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
                        <Stack direction="row" spacing={1}>
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
                          <Box mt={-0.5}>
                            <Typography variant="caption">
                              {td.asset}
                            </Typography>
                          </Box>
                        </Stack>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {td.transactionType === "deposit" ? (
                          <Typography variant="caption" color="text.success">
                            {td.transactionAmount}
                          </Typography>
                        ) : (
                          <Typography variant="caption" color="error">
                            {td.transactionAmount}
                          </Typography>
                        )}
                      </StyledTableCell>
                      <StyledTableCell sx={{ width: "150%" }} align="left">
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={1}
                        >
                          <Typography variant="caption">
                            {td.transactionTimeStamp}
                          </Typography>
                          <IconButton onClick={handleOpenTableDetailsModal}>
                            <img src={tableDetailsIcon} alt="Table Details" />
                          </IconButton>
                        </Stack>
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
            component="div"
            rowsPerPageOptions={[]}
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

export default TransactionAreaMobile;
