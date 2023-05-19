import React, { Suspense } from "react";
import { Box } from "@mui/system";

import { useTheme } from "@mui/material";
// Skeleton
import {
  CoinFilterSkeleton,
  TableSkeleton,
} from "../../../components/Skeletons/ComponentSkeletons";

// Lazy component
const CoinFilterArea = React.lazy(() => import("../CoinFilterArea"));
const CoinTransactionTableMobile = React.lazy(() =>
  import("../CoinTransactionTableMobile")
);

const TransactionBoxMobile = ({ coinData }) => {
  const theme = useTheme();

  return (
    <Box px={2}>
      <Box pb={2}>
        <Suspense fallback={<CoinFilterSkeleton />}>
          <CoinFilterArea />
        </Suspense>
      </Box>
      <Box mx={-2} bgcolor={theme.palette.background.default}>
        <Suspense fallback={<TableSkeleton />}>
          <CoinTransactionTableMobile coinData={coinData} />
        </Suspense>
      </Box>
    </Box>
  );
};

export default TransactionBoxMobile;
