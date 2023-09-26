import React, { Suspense, useEffect, useState } from "react";

// Material
import { Box } from "@mui/system";
// Axios
import axios from "../../../api/axios";

// Styles
import styles from "./TableArea.module.css";
import {
  Skeleton,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Button,
  Typography,
  TablePagination,
  useMediaQuery,
  Tab,
  Tabs,
} from "@mui/material";

// Skeletons
import { GridCardSkeleton } from "../../../components/Skeletons/ComponentSkeletons";

// Bitcoin logo

// Theme
import { useTheme } from "@mui/material/styles";

import TabPanel from "../../../components/TabPanel/TabPanel";

// Route
import { Link, useNavigate } from "react-router-dom";

import { LoadingButton } from "@mui/lab";

import BuyIcon from "../../../assets/buyRequest.svg";
import BuyIconDark from "../../../assets/buyRequestDark.svg";
import SellIcon from "../../../assets/sellRequestWhite.svg";
import SellIconDark from "../../../assets/sellRequest.svg";

const ComplaintInfo = React.lazy(() => import("./Complaint/ComplaintInfo"));

const History = React.lazy(() => import("./Complaint/History"));

const Transaction = React.lazy(() => import("./Complaint/Transaction"));

// Lazy Image Loader
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

// table header
const tableHeader = [
  {
    name: "NAME",
  },
  // {
  //   name: "Amount",
  // },
  // {
  //   name: "Available",
  // },
  // {
  //   name: "Value",
  // },
  {
    name: "LOCATION",
  },
];

const UserArea = (prop) => {
  const [coinData, setCoinData] = useState([]);
  const [tablePage, setTablePage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();

  // theme
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [loading, setLoading] = useState(false);

  const [showPin, setShowPin] = useState(false);

  const [showSingleData, setShowSingleData] = useState();

  const [tabValue, setTabValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Box
        height={"100%"}
        p={3}
        borderRadius={5}
        width={"100%"}
        bgcolor={"#fff"}
      >
        {loading ? (
          <Box>
            <LoadingButton
              fullWidth
              style={{
                height: 120,
                borderRadius: 10,
                fontSize: 20,
                textTransform: "none",
              }}
              loading
            >
              Sign Up
            </LoadingButton>
          </Box>
        ) : (
          <Box>
            <>
              <Tabs
                value={tabValue}
                onChange={handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab
                  sx={{
                    mr: 2,
                    backgroundColor: tabValue === 0 ? "#3063E9" : "#fff",
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    marginTop: -1.4,
                    marginBottom: -2,
                  }}
                  label={
                    <Typography
                      textTransform={"none"}
                      fontSize={14}
                      color={tabValue === 0 ? "#fff" : "#000"}
                    >
                      Message
                    </Typography>
                  }
                  iconPosition="start"
                  icon={
                    <LazyImageComponent
                      src={tabValue === 0 ? SellIcon : SellIconDark}
                    />
                  }
                />
              </Tabs>
            </>
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
                    <ComplaintInfo data={prop.data} />
                  </Suspense>
                </Box>
              </TabPanel>
              {/* My Rewards */}
              {/* <TabPanel value={tabValue} index={1}>
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
                    <History />
                  </Suspense>
                </Box>
              </TabPanel> */}

              {/* <TabPanel value={tabValue} index={1}>
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
                    <Transaction />
                  </Suspense>
                </Box>
              </TabPanel> */}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default UserArea;
