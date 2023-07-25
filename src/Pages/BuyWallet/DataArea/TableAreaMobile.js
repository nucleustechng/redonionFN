import React, { Suspense, useEffect, useState } from "react";

// Material
import { Box } from "@mui/system";
import axios from "axios";

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
} from "@mui/material";

// Theme
import { useTheme } from "@mui/material/styles";

// Table
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/StyledTable/StyledTable";

// Route
import { Link, useNavigate } from "react-router-dom";

// Lazy Image Loader
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

// table header
const tableHeader = [
  {
    name: "Coin",
  },
  {
    name: "Balance",
  },
  {
    name: "Take Action",
  },
];

const TableAreaMobile = () => {
  const [coinData, setCoinData] = useState([]);
  const [tablePage, setTablePage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();

  // theme
  const theme = useTheme();

  // Table Handler
  const handleChangePage = (event, newPage) => {
    setTablePage(newPage);
  };

  // Loading coin data
  useEffect(() => {
    axios.get("/CryptoWalletData.json").then((res) => setCoinData(res.data));
  }, []);

  return (
    <Box className={styles.mainBox}>
      <Box className={styles.tableAreaMobile}>
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
              {coinData
                .slice(
                  tablePage * rowsPerPage,
                  tablePage * rowsPerPage + rowsPerPage
                )
                .map((cd) => (
                  <StyledTableRow key={cd.id}>
                    <StyledTableCell
                      onClick={() => navigate(`/wallets/${cd.coinName}`)}
                      component="th"
                      scope="row"
                      sx={{ cursor: "pointer" }}
                    >
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
                                  backgroundColor: `${theme.palette.mode === "dark"
                                    ? "#111"
                                    : "#f5f5f5"
                                    }`,
                                }}
                              />
                            }
                          >
                            <LazyImageComponent
                              style={{ width: "20px", height: "20px" }}
                              src={cd.coinIcon}
                            />
                          </Suspense>
                        </Box>
                        <Box mt={-0.5}>
                          <Typography variant="caption">
                            {cd.coinName}
                          </Typography>
                        </Box>
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Typography variant="caption">
                        {cd.coinBTC} {cd.coinCode}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Stack direction="row" spacing={2}>
                        <Link
                          style={{ textDecoration: "none", color: "inherit" }}
                          to={`/wallets/${cd.coinName}`}
                          state={{ isReceiving: true }}
                        >
                          <Button
                            size="small"
                            disableElevation
                            color="success"
                            className={styles.depositButton}
                            variant="text"
                          >
                            <Typography
                              variant="caption"
                              fontWeight={500}
                              color="text.success"
                            >
                              deposit
                            </Typography>
                          </Button>
                        </Link>
                        <Button
                          size="small"
                          disableElevation
                          color="error"
                          className={styles.withdrawButton}
                          variant="text"
                          onClick={() => navigate(`/wallets/${cd.coinName}`)}
                        >
                          <Typography
                            variant="caption"
                            fontWeight={500}
                            color="error"
                          >
                            withdraw
                          </Typography>
                        </Button>
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
  );
};

export default TableAreaMobile;
