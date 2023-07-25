import React, { Suspense } from "react";
import { Box } from "@mui/system";

// Theme
import { useTheme } from "@mui/material/styles";

// Progress loader
import ProgressLoader from "../../components/ProgressLoader/ProgressLoader";

// Lazy Component
const Layout = React.lazy(() => import("../../components/Layout/Layout"));
const Contact = React.lazy(() => import("./Contact"));

const ProfileInteface = () => {
  const theme = useTheme();
  return (
    <Box px={3} bgcolor={theme.palette.background.default}>
      <Suspense fallback={<ProgressLoader />}>
       
          <Box mt={3}>
            <Suspense fallback={<ProgressLoader />}>
              <Contact />
            </Suspense>
          </Box>
      
      </Suspense>
    </Box>
  );
};

export default ProfileInteface;
