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
const AvailableRewards = React.lazy(() =>
  import("../RewardTabArea/AvailableRewards")
);
const AvailableRewardsMobile = React.lazy(() =>
  import("../RewardTabArea/AvailableRewardsMobile")
);
const MyRewards = React.lazy(() => import("../RewardTabArea/MyRewards"));
const MyRewardsMobile = React.lazy(() =>
  import("../RewardTabArea/MyRewardsMobile")
);
const Transaction = React.lazy(() => import("../RewardTabArea/Transaction"));

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
      {!isMobile ? (
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
            <Tab sx={{ mr: 2, backgroundColor: tabValue === 0 ? "#3063E9" : "#fff", borderTopRightRadius: 10, borderTopLeftRadius:10, marginTop: -1.4, marginBottom: -2 }} 
              label={<Typography color={tabValue === 0 ? "#fff" : "#000"}>Sell</Typography>} iconPosition="start" icon={<LazyImageComponent src={tabValue === 0 ? SellIcon : SellIconDark} />} />
            <Tab sx={{ mr: 2, backgroundColor: tabValue === 1 ? "#3063E9" : "#fff", borderTopRightRadius: 10, borderTopLeftRadius: 10, marginTop: -1.4, marginBottom: -2 }}
              label={<Typography color={tabValue === 1 ? "#fff" : "#000"}>Buy</Typography>} iconPosition="start" icon={<LazyImageComponent src={tabValue === 1 ? BuyIconDark : BuyIcon} />} />

            {/* <Tab sx={{ mr: 2 }} label="Transaction" /> */}
          </Tabs>
        </Box>
      ) : (
        <Box mb={5} sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            scrollButtons
            sx={{ background: theme.palette.background.paper, px: 3 }}
            value={tabValue}
            onChange={handleChangeTab}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab sx={{ fontSize: "12px" }} label="Available Rewards" />
            <Tab sx={{ fontSize: "12px" }} label="My Rewards" />
            {/* <Tab sx={{ fontSize: "12px" }} label="Transaction" /> */}
          </Tabs>
        </Box>
      )}
      <Box className={styles.tabPanelBox}>
        {/* Available Rewards */}
        <TabPanel value={tabValue} index={0}>
          <Box className={styles.tabPanel}>
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
              {!isMobile ? <AvailableRewards /> : <AvailableRewardsMobile />}
            </Suspense>
          </Box>
        </TabPanel>
        {/* My Rewards */}
        <TabPanel value={tabValue} index={1}>
          <Box className={styles.tabPanel}>
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
              {!isMobile ? <MyRewards /> : <MyRewardsMobile />}
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
