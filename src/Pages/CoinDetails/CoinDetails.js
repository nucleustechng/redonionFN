import React, { Suspense, useState, useEffect } from "react";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";

// Custom Theme
import { useTheme } from "@mui/material/styles";

// Styles
import styles from "./CoinDetailsStyle.module.css";

// Axios
import axios from "axios";

// Component Loader
import ComponentLoader from "../../components/ProgressLoader/ComponentLoader";
import { useLocation, useParams } from "react-router-dom";
import {
  CoinFilterSkeleton,
  ComponentSkeleton,
  TableSkeleton,
} from "../../components/Skeletons/ComponentSkeletons";

// Lazy Component
const CoinFilterArea = React.lazy(() => import("./CoinFilterArea"));
const BalanceArea = React.lazy(() => import("./BalanceArea.js"));
const CoinTransactionTable = React.lazy(() => import("./CoinTransactionTable"));
const CoinDetailsMobile = React.lazy(() => import("./CoinDetailsMobile"));

const CoinDetails = () => {
  const { coinName } = useParams();
  const [coinData, setCoinData] = useState([]);

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    axios.get("/CryptoWalletData.json").then((res) => setCoinData(res.data));
  }, []);

  const filteredCoin = coinData.filter((id) => id.coinName === coinName);

  return (
    <React.Fragment>
      {!isMobile ? (
        <Box mb={5} className={styles.mainBox}>
          <Grid
            container
            columns={{ sm: 1, md: 12 }}
            spacing={{ sm: 4, md: 4 }}
          >
            <Grid item sm={12} md={7}>
              <Box className={styles.coinFilterArea}>
                <Suspense fallback={<CoinFilterSkeleton />}>
                  <CoinFilterArea />
                </Suspense>
              </Box>
              <Box className={styles.bitCoinDetails}>
                <Typography variant="button" color="secondary">
                  Transactions
                </Typography>
                {/* Table */}
                <Box>
                  <Suspense fallback={<TableSkeleton />}>
                    <CoinTransactionTable coinData={filteredCoin} />
                  </Suspense>
                </Box>
              </Box>
            </Grid>
            <Grid item sm={12} md={5}>
              <Box className={styles.balanceArea}>
                <Suspense fallback={<ComponentSkeleton />}>
                  <BalanceArea
                    coinData={filteredCoin.map((cd) => cd.coinCode)}
                  />
                </Suspense>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : null}
      {isMobile ? (
        <Box>
          <Suspense fallback={<ComponentLoader />}>
            <CoinDetailsMobile coinData={filteredCoin} />
          </Suspense>
        </Box>
      ) : null}
    </React.Fragment>
  );
};

export default CoinDetails;
