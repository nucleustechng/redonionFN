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
    name: "Sender",
  },
  {
    name: "Rate",
  },
  // {
  //   name: "Value",
  // },
  {
    name: "Take Action",
  },
];

const TableArea = () => {
  const [coinData, setCoinData] = useState([]);
  const [tablePage, setTablePage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();

  // theme
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

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
      <Box className={!isTablet ? styles.tableArea : styles.tableAreaTab}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {tableHeader.map((th) => (
                  <StyledTableCell key={th.name}>
                    <Typography variant="caption" textTransform={"none"} fontWeight={600} fontSize={16} color="primary">
                      {th.name}</Typography>
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
                        {!isTablet && (
                          <Box>
                            <Suspense
                              fallback={
                                <Skeleton
                                  animation="wave"
                                  variant="circular"
                                  width={20}
                                  height={20}
                                />
                              }
                            >
                              <LazyImageComponent
                                style={{ width: "20px", height: "20px" }}
                                src={cd.coinIcon}
                              />
                            </Suspense>
                          </Box>
                        )}
                        <Box mt={-0.5}>{cd.coinName}</Box>
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      $ {cd.coinPrice}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {cd.coinBTC} {cd.coinCode}
                    </StyledTableCell>
                    {/* <StyledTableCell align="left">
                      ${" "}
                      {(
                        parseFloat(cd.coinPrice) * parseFloat(cd.coinBTC)
                      ).toFixed(2)}
                    </StyledTableCell> */}
                    <StyledTableCell align="left">
                      <Stack direction="row" spacing={2}>
                        <Button
                          disableElevation
                          color="success"
                          className={styles.depositButton}
                          variant="text"
                          onClick={() => navigate(`/wallets/${cd.coinName}`)}
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
  );
};

export default TableArea;
