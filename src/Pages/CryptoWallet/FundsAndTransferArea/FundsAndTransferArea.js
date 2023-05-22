import React, { Suspense } from "react";
import {
  Tab,
  Tabs,
  Typography,
  InputAdornment,
  IconButton,
  Divider,
  Stack,
  Button,
  Input,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

// Styles
import styles from "./FundsAndTransferArea.module.css";

// Theme
import { useTheme } from "@mui/material/styles";

// Tabpanel component
import TabPanel from "../../../components/TabPanel/TabPanel";
import { DatePickerTextField } from "../../../components/DatePickerTextField/DatePickerTextField";

// Skeleton
import { TableSkeleton } from "../../../components/Skeletons/ComponentSkeletons";

// Lazy tabpanel
const TableArea = React.lazy(() => import("../DataArea/TableArea"));
const TransactionArea = React.lazy(() => import("../DataArea/TransactionArea"));

const FundsAndTransferArea = () => {
  const [isReadOnly, setIsReadOnly] = React.useState(true);
  const [tabValue, setTabValue] = React.useState(0);
  const [fromDateValue, setFromDateValue] = React.useState(null);
  const [toDateValue, setToDateValue] = React.useState(null);

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const removeReadOnlyOnFocus = () => {
    setIsReadOnly(false);
  };

  const addReadOnlyOnBlur = () => {
    setIsReadOnly(true);
  };

  return (
    <Box className={styles.headerArea}>
      {/* <Typography variant="button" color="secondary">
        Funds and Transfers
      </Typography> */}
      {/* Tab component */}
      {/* <Box className={styles.tabBox}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Funds" />
          <Tab label="Transfer History" />
        </Tabs>
      </Box> */}
      <Box>
        <TabPanel value={tabValue} index={0}>
          {/* <Box className={styles.searchArea}>
            <Input
              disableUnderline
              readOnly={isReadOnly}
              color="secondary"
              className="inputField"
              size="small"
              sx={!isTablet ? { width: "30%" } : { width: "100%" }}
              placeholder="Search"
              startAdornment={
                <InputAdornment position="start">
                  <Box className={styles.searchBox}>
                    <IconButton edge="start">
                      <SearchIcon color="secondary" />
                    </IconButton>
                  </Box>
                </InputAdornment>
              }
              onFocus={removeReadOnlyOnFocus}
              onBlur={addReadOnlyOnBlur}
            />
          </Box>
          <Divider /> */}
          <Box mt={3}>
            <Suspense fallback={<TableSkeleton />}>
              <TableArea />
            </Suspense>
          </Box>
        </TabPanel>
        {/* <TabPanel value={tabValue} index={1}>
          <Stack
            direction={!isTablet ? "row" : "column"}
            justifyContent={!isTablet ? "space-between" : ""}
            className={styles.filterArea}
          >
            <Box>
              <Input
                disableUnderline
                readOnly={isReadOnly}
                className="inputField"
                sx={!isTablet ? { width: "130%" } : { width: "100%" }}
                size="small"
                placeholder="Transaction Hash or Address"
                startAdornment={
                  <InputAdornment position="start">
                    <Box>
                      <IconButton edge="start">
                        <SearchIcon color="secondary" />
                      </IconButton>
                    </Box>
                  </InputAdornment>
                }
                onFocus={removeReadOnlyOnFocus}
                onBlur={addReadOnlyOnBlur}
              />
            </Box>
            <Box>
              <Stack
                mt={!isTablet ? "" : 3}
                direction="row"
                spacing={4}
                alignItems="center"
                justifyContent={!isTablet ? "flex-end" : "flex-start"}
              >
                <Box className={styles.datePickerArea}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack
                      direction="row"
                      spacing={3}
                      justifyContent={!isTablet ? "flex-end" : "flex-start"}
                      alignItems="stretch"
                    >
                      <DatePicker
                        disableFuture
                        label="From Date"
                        value={fromDateValue}
                        onChange={(newValue) => {
                          setFromDateValue(newValue);
                        }}
                        renderInput={(params) => (
                          <DatePickerTextField
                            autoComplete="off"
                            sx={!isTablet ? { width: "30%" } : { width: "50%" }}
                            variant="outlined"
                            size="small"
                            color="secondary"
                            className="dateInputField"
                            {...params}
                          />
                        )}
                      />
                      <DatePicker
                        disablePast
                        label="To Date"
                        value={toDateValue}
                        onChange={(newValue) => {
                          setToDateValue(newValue);
                        }}
                        renderInput={(params) => (
                          <DatePickerTextField
                            autoComplete="off"
                            sx={!isTablet ? { width: "30%" } : { width: "50%" }}
                            variant="outlined"
                            color="secondary"
                            size="small"
                            {...params}
                          />
                        )}
                      />
                    </Stack>
                  </LocalizationProvider>
                </Box>
                <Box>
                  <Button sx={{ py: 1.2 }} variant="outlined" color="primary">
                    Search
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Stack>
          <Divider />
          <Box mt={3}>
            <Suspense fallback={<TableSkeleton />}>
              <TransactionArea />
            </Suspense>
          </Box>
        </TabPanel> */}
      </Box>
    </Box>
  );
};

export default FundsAndTransferArea;
