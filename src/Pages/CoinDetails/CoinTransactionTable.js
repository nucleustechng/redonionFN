import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import {
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
import { CopyToClipboard } from "react-copy-to-clipboard";

// Styles
import styles from "./CoinDetailsStyle.module.css";

import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/StyledTable/StyledTable";

const tableHeader = [
  {
    name: "Amount",
  },
  {
    name: "Adress",
  },
  {
    name: "Time Stamp",
  },
];

const CoinTransactionTable = ({ coinData }) => {
  const [tablePage, setTablePage] = useState(0);
  const [coinDetails, setCoinDetails] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [copied, setCopied] = useState(false);

  // Table Handler
  const handleChangePage = (event, newPage) => {
    setTablePage(newPage);
  };

  useEffect(() => {
    coinData.map((cd) => setCoinDetails(cd.coinDetails));
  }, [coinData]);

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
    <Box className={styles.tableArea}>
      <Box>
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
              {coinDetails
                .slice(
                  tablePage * rowsPerPage,
                  tablePage * rowsPerPage + rowsPerPage
                )
                ?.map((cd) => (
                  <StyledTableRow key={cd.id}>
                    <StyledTableCell align="left">
                      <Typography
                        variant="body2"
                        color={
                          cd.type === "received" ? "text.success" : "error"
                        }
                      >
                        {cd.amount} {cd.coinCode}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Tooltip
                        title={
                          copied ? (
                            <Typography variant="caption" color="text.success">
                              Address Copied
                            </Typography>
                          ) : (
                            "Copy"
                          )
                        }
                        TransitionComponent={Zoom}
                        placement="bottom-start"
                      >
                        <Box>
                          <CopyToClipboard
                            onCopy={() => setCopied(true)}
                            text={cd?.address}
                          >
                            <Typography
                              sx={{ cursor: "pointer" }}
                              variant="body2"
                            >
                              {cd.address?.slice(0, 20)}...
                            </Typography>
                          </CopyToClipboard>
                        </Box>
                      </Tooltip>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {cd.timeStamp}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={coinDetails.length}
          rowsPerPage={rowsPerPage}
          page={tablePage}
          onPageChange={handleChangePage}
        />
      </Box>
    </Box>
  );
};

export default CoinTransactionTable;
