import React, { Suspense } from "react";
import { Box } from "@mui/system";

// Theme
import { useTheme } from "@mui/material/styles";

// Progress loader
import ProgressLoader from "../../components/ProgressLoader/ProgressLoader";

// Lazy Component
const Layout = React.lazy(() => import("../../components/Layout/Layout"));
const Account = React.lazy(() => import("./Account/Account"));

const ProfileInteface = () => {
  const theme = useTheme();
  return (
    <Box px={3} bgcolor={theme.palette.background.default}>
      <Suspense fallback={<ProgressLoader />}>
        <Layout>
          <Box mt={3}>
            <Suspense fallback={<ProgressLoader />}>
              <Account />
            </Suspense>
          </Box>
        </Layout>
      </Suspense>
    </Box>
  );
};

export default ProfileInteface;
