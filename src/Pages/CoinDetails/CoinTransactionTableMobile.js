import React, { useState } from "react";
import { Box } from "@mui/system";
import {
  Alert,
  IconButton,
  Slide,
  Snackbar,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopy from "@mui/icons-material/ContentCopy";

import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/StyledTable/StyledTable";

const tableHeader = [
  {
    name: "Amount",
  },
  {
    name: "Time Stamp",
  },
];

const CoinTransactionTableMobile = ({ coinData }) => {
  const [tablePage, setTablePage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Table Handler
  const handleChangePage = (event, newPage) => {
    setTablePage(newPage);
  };

  // Copy Snackbar
  const [showSnackbar, setShowSnackbar] = useState(false);

  // Close Handler for Snackbar
  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        TransitionComponent={Slide}
        open={showSnackbar}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          sx={{ width: "100%", mt: 1 }}
          onClose={handleCloseSnackbar}
          severity="success"
        >
          Address Copied!
        </Alert>
      </Snackbar>
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
            {coinData.coinDetails
              ?.slice(
                tablePage * rowsPerPage,
                tablePage * rowsPerPage + rowsPerPage
              )
              ?.map((cd) => (
                <StyledTableRow key={cd.id}>
                  <StyledTableCell align="left">
                    <Typography
                      sx={{ display: "inline-block", width: "100px" }}
                      variant="caption"
                      color={cd.type === "received" ? "text.success" : "error"}
                    >
                      {cd.amount} {cd.coinCode}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Typography
                      sx={{ display: "inline-block", width: "120px" }}
                      variant="caption"
                    >
                      {cd.timeStamp}
                    </Typography>
                    <CopyToClipboard
                      onCopy={() => setShowSnackbar(true)}
                      text={cd.address}
                    >
                      <Tooltip title="Copy Address">
                        <IconButton sx={{ ml: 5 }} size="small">
                          <ContentCopy color="primary" />
                        </IconButton>
                      </Tooltip>
                    </CopyToClipboard>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={coinData?.coinDetails.length}
        rowsPerPage={rowsPerPage}
        page={tablePage}
        onPageChange={handleChangePage}
      />
    </Box>
  );
};

export default CoinTransactionTableMobile;
