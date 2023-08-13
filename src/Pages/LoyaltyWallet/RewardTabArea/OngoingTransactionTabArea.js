import React, { Suspense } from "react";
import { Box } from "@mui/system";
import { Tab, Tabs, useTheme, Typography, useMediaQuery } from "@mui/material";

// Styles
import styles from "./RewardTabArea.module.css";

// Custom Tabpanel
import TabPanel from "../../../components/TabPanel/TabPanel";

// Skeletons
import {
  GridCardSkeleton,
  TableSkeleton,
} from "../../../components/Skeletons/ComponentSkeletons";

import BitCoinIcon from "../../../assets/bitCoinIcon.svg";
import BuyIcon from "../../../assets/buyRequest.svg";
import BuyIconDark from "../../../assets/buyRequestDark.svg";
import SellIcon from "../../../assets/sellRequestWhite.svg";
import SellIconDark from "../../../assets/sellRequest.svg";

import ExchanageIcon from "../../../assets/exchange.svg";

// Lazy Image component
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

// Lazy Component
const Sell = React.lazy(() => import("./Sell"));
const AvailableRewardsMobile = React.lazy(() =>
  import("./AvailableRewardsMobile")
);
const Buy = React.lazy(() => import("./Buy"));
const MyRewardsMobile = React.lazy(() => import("./MyRewardsMobile"));
const Transaction = React.lazy(() => import("./Transaction"));

const RewardTabArea = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box className={styles.mainBox}>
      {/* Tab component */}
      {/* {!isMobile ? ( */}
      <Box
        mt={!isTablet ? 4 : ""}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            sx={{
              mr: 2,
              width: isMobile ? "50%" : "",
              backgroundColor: isMobile
                ? ""
                : tabValue === 0
                ? "#3063E9"
                : "inherit",
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              marginTop: -1.4,
              marginBottom: -2,
            }}
            label={
              <Typography
                color={tabValue === 0 ? (isMobile ? "#000" : "#fff") : "#000"}
              >
                Sell
              </Typography>
            }
            iconPosition="start"
            icon={
              <LazyImageComponent
                src={
                  tabValue === 0
                    ? isMobile
                      ? SellIconDark
                      : SellIcon
                    : SellIconDark
                }
              />
            }
          />
          <Tab
            sx={{
              mr: 2,
              width: isMobile ? "50%" : "",
              backgroundColor: isMobile
                ? ""
                : tabValue === 1
                ? "#3063E9"
                : "#inherit",
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              marginTop: -1.4,
              marginBottom: -2,
            }}
            label={
              <Typography
                color={tabValue === 1 ? (isMobile ? "#000" : "#fff") : "#000"}
              >
                Buy
              </Typography>
            }
            iconPosition="start"
            icon={
              isMobile ? (
                <LazyImageComponent src={BuyIcon} />
              ) : (
                <LazyImageComponent
                  src={tabValue === 1 ? BuyIconDark : BuyIcon}
                />
              )
            }
          />

          {/* <Tab sx={{ mr: 2 }} label="Transaction" /> */}
        </Tabs>
      </Box>

      <Box>
        {/* Available Rewards */}
        <TabPanel value={tabValue} index={0}>
          <Box bgcolor={"inherit"}>
            <Suspense
              fallback={
                <GridCardSkeleton
                  columns={{ md: 12, xl: 12, sm: 1, xs: 1 }}
                  spacing={{ md: 2, xl: 2, sm: 3 }}
                  rowGap={{ md: 0 }}
                  md={6}
                  xl={4}
                  sm={12}
                />
              }
            >
              {/* {!isMobile ? */}
              <Sell />

              {/* : <AvailableRewardsMobile /> */}
            </Suspense>
          </Box>
        </TabPanel>
        {/* My Rewards */}
        <TabPanel value={tabValue} index={1}>
          <Box bgcolor={"inherit"}>
            <Suspense
              fallback={
                <GridCardSkeleton
                  columns={{ md: 12, xl: 12, sm: 1, xs: 1 }}
                  spacing={{ md: 2, xl: 2, sm: 3 }}
                  rowGap={{ md: 0 }}
                  md={6}
                  xl={4}
                  sm={12}
                />
              }
            >
              {/* {!isMobile ?  */}
              <Buy />
              {/* : <MyRewardsMobile />} */}
            </Suspense>
          </Box>
        </TabPanel>
        {/* Transactions */}
        {/* <TabPanel value={tabValue} index={2}>
          <Box className={styles.tabPanel}>
            <Suspense fallback={<TableSkeleton />}>
              <Transaction />
            </Suspense>
          </Box>
        </TabPanel> */}
      </Box>
    </Box>
  );
};

export default RewardTabArea;
