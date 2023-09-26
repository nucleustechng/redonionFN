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

const UserInfo = React.lazy(() => import("./User/UserInfo"));

const History = React.lazy(() => import("./User/History"));

const Transaction = React.lazy(() => import("./User/Transaction"));

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
              <UserInfo data={prop.data} />
            </Suspense>
          </Box>
        )}
      </Box>
    </>
  );
};

export default UserArea;
