import React, { Suspense, useEffect, useState } from "react";

// Material
import { Box } from "@mui/system";

// Component Loader
import ComponentLoader from "../../components/ProgressLoader/ComponentLoader";

import { useMediaQuery, useTheme, Typography } from "@mui/material";

// Router
import { useNavigate } from "react-router-dom";

// Axios
import axios from "../../api/axios";


const FundsAndTransferArea = React.lazy(() =>
  import("../Complaint/FundsAndTransferArea/FundsAndTransferArea")
);


const CryptoWalletInterface = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  console.log(user)


  return (
    <Box>
      {/* <Box px={3}>
        <Suspense fallback={<ComponentLoader />}>
          <CryptoWalletTopCards  />
          
        </Suspense>
      </Box> */}
      <Box px={3}>
        <Suspense fallback={<ComponentLoader />}>
          <FundsAndTransferArea />
        </Suspense>
      </Box>
    </Box>
  );
};

export default CryptoWalletInterface;
