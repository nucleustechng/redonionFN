import React, { Suspense, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Grid, IconButton, Snackbar, useMediaQuery, Typography, Button } from "@mui/material";

// Theme
import { useTheme } from "@mui/material/styles";


import {
  CardSkeleton,
  ComponentSkeleton,
  TableSkeleton,
} from "../../components/Skeletons/ComponentSkeletons";

const RewardTabArea = React.lazy(() =>
  import("./HistoryTabArea/HistoryTabArea")
);

const FiatWalletInterface = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      mt={0}
      sx={{ overflowX: "hidden" }}
      px={!isMobile ? 5 : 1}
      // className={styles.mainBox}
    >

      <Box mb={4} >
        <Typography variant="caption" fontSize={25} fontWeight={400} color="secondary">
         History </Typography>

      </Box>

      {/* {!isMobile && ( */}
        <Box >
          <Grid
            container
            columns={{ xs: 1, sm: 1, md: 12 }}
            spacing={{ xs: 4, sm: 2, md: 12 }}
          >

            <Grid item xs={12} sm={12} md={12}>
              <Box >
                <Suspense fallback={<ComponentSkeleton />}>
                  <RewardTabArea />
                </Suspense>
              </Box>
            </Grid>
          </Grid>
        </Box>
      {/* )} */}
      {/* {isMobile && (
        <Box>
          {" "}
          <Box className={styles.rewardTabArea}>
            <Suspense fallback={<ComponentSkeleton />}>
              <RewardTabArea />
            </Suspense>
          </Box>
        </Box>
      )} */}
    </Box>
  );
};

export default FiatWalletInterface;
