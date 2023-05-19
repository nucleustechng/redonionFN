import React, { Suspense, useEffect } from "react";

// Material
import { Box } from "@mui/system";

// Component Loader
import ComponentLoader from "../../components/ProgressLoader/ComponentLoader";

import { useMediaQuery, useTheme } from "@mui/material";

// Axios
import axios from "axios";

// Lazy Image component
const CryptoWalletTopCards = React.lazy(() =>
  import("../CryptoWallet/CryptoWalletTopCards/CryptoWalletTopCards")
);
const CryptoWalletTopCardsMobile = React.lazy(() =>
  import("./CryptoWalletTopCards/CryptoWalletTopCardsMobile")
);
const FundsAndTransferArea = React.lazy(() =>
  import("../CryptoWallet/FundsAndTransferArea/FundsAndTransferArea")
);
const FundsAndTransferAreaMobile = React.lazy(() =>
  import("../CryptoWallet/FundsAndTransferArea/FundsAndTransferAreaMobile")
);

const CryptoWalletInterface = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    axios.get("/CryptoWalletData.json").then();
  }, []);

  return (
    <Box >
      <Box px={3}>
        <Suspense fallback={<ComponentLoader />}>
          {/* {!isMobile ? ( */}
            <CryptoWalletTopCards />
           {/* ) : (
           <CryptoWalletTopCardsMobile />
           )}  */}
        </Suspense>
      </Box>
      <Box px={3}>
        <Suspense fallback={<ComponentLoader />}>
          {/* {!isMobile ? ( */}
            <FundsAndTransferArea />
          {/* ) : (
            <FundsAndTransferAreaMobile />
          )} */}
        </Suspense>
      </Box>
    </Box>
  );
};

export default CryptoWalletInterface;
