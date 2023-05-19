import React, { Suspense } from "react";
import { Box } from "@mui/system";

// Theme
import { useTheme } from "@mui/material/styles";

// Router Outlet
import { Outlet } from "react-router-dom";

// Component Loader
import ComponentLoader from "../../components/ProgressLoader/ComponentLoader";

// Layout
const Layout = React.lazy(() => import("../../components/Layout/Layout"));

const StaticPageInterface = () => {
  const theme = useTheme();
  return (
    <Box px={3} bgcolor={theme.palette.background.default}>
      <Suspense fallback={<ComponentLoader />}>
        <Layout>
          <Outlet />
        </Layout>
      </Suspense>
    </Box>
  );
};

export default StaticPageInterface;
