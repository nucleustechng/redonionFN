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
import Chat from "../../../assets/chat.svg";
import ChatDark from "../../../assets/chatDark.svg";

import ChatHistory from "./chat";

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
              width: isMobile ? "30%" : "",
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
                color={
                  tabValue === 0
                    ? isMobile
                      ? theme.palette.mode === "dark"
                        ? "#fff"
                        : "#000"
                      : "#fff"
                    : theme.palette.mode === "dark"
                    ? "#fff"
                    : "#000"
                }
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
              width: isMobile ? "30%" : "",
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
                color={
                  tabValue === 1
                    ? isMobile
                      ? theme.palette.mode === "dark"
                        ? "#fff"
                        : "#000"
                      : "#fff"
                    : theme.palette.mode === "dark"
                    ? "#fff"
                    : "#000"
                }
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
          <Tab
            sx={{
              mr: 0,
              width: isMobile ? "40%" : "150px",
              backgroundColor: isMobile
                ? ""
                : tabValue === 2
                ? "#3063E9"
                : "inherit",
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              marginTop: -1.4,  mx:2,
              marginBottom: -2,
            }}
            label={
              <Typography
                color={
                  tabValue === 2
                    ? isMobile
                      ? theme.palette.mode === "dark"
                        ? "#fff"
                        : "#000"
                      : "#fff"
                    : theme.palette.mode === "dark"
                    ? "#fff"
                    : "#000"
                }
              >
                Negotiations
              </Typography>
            }
            iconPosition="start"
            icon={
              <LazyImageComponent
                src={
                  tabValue === 2
                    ? isMobile
                      ? ChatDark
                      : Chat
                    : ChatDark
                }
              />
            }
          />
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

        <TabPanel value={tabValue} index={2}>
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
              <ChatHistory />
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
