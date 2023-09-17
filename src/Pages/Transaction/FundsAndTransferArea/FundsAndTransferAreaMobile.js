import React, { Suspense } from "react";
import {
  Skeleton,
  Tab,
  Tabs,
  Typography,
  InputAdornment,
  IconButton,
  Stack,
  Button,
  Input,
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

// Lazy tabpanel
const TableAreaMobile = React.lazy(() => import("../DataArea/TableAreaMobile"));
const TransactionAreaMobile = React.lazy(() =>
  import("../DataArea/TransactionAreaMobile")
);

const FundsAndTransferAreaMobile = () => {
  const [isReadOnly, setIsReadOnly] = React.useState(true);
  const [tabValue, setTabValue] = React.useState(0);
  const [fromDateValue, setFromDateValue] = React.useState(null);
  const [toDateValue, setToDateValue] = React.useState(null);

  const theme = useTheme();
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box className={styles.headerAreaMobile}>
      {/* Tab component */}
      <Box
        bgcolor={theme.palette.background.paper}
        className={styles.tabBoxMobile}
      >
        <Typography mb={2} component="p" variant="button" color="secondary">
          Funds and Transfers
        </Typography>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab sx={{ fontSize: "14px" }} label="Funds" />
          <Tab sx={{ fontSize: "14px" }} label="Transfer History" />
        </Tabs>
      </Box>
      <Box>
        <TabPanel value={tabValue} index={0}>
          <Box
            mt={-1}
            py={2}
            px={1}
            bgcolor={theme.palette.background.paper}
            className={styles.searchAreaMobile}
          >
            <Input
              readOnly={isReadOnly}
              disableUnderline
              fullWidth
              className="inputField"
              size="small"
              placeholder="Search"
              startAdornment={
                <InputAdornment position="start">
                  <Box className={styles.searchBoxMobile}>
                    <IconButton edge="start">
                      <SearchIcon color="secondary" />
                    </IconButton>
                  </Box>
                </InputAdornment>
              }
              onBlur={() => setIsReadOnly(true)}
              onFocus={() => setIsReadOnly(false)}
            />
          </Box>
          <Box mt={3}>
            <Suspense
              fallback={
                <Skeleton
                  variant="rectangular"
                  sx={{
                    backgroundColor: `${
                      theme.palette.mode === "dark" ? "#111" : "#f5f5f5"
                    }`,
                  }}
                />
              }
            >
              <TableAreaMobile />
            </Suspense>
          </Box>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Box>
            <Box mt={-1} py={2} px={1} bgcolor={theme.palette.background.paper}>
              <Input
                readOnly={isReadOnly}
                fullWidth
                className="inputField"
                disableUnderline
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
                onBlur={() => setIsReadOnly(true)}
                onFocus={() => setIsReadOnly(false)}
              />
            </Box>
            <Box py={2} px={1} mt={-1} bgcolor={theme.palette.background.paper}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box className={styles.datePickerAreaMobile}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack direction="row" alignItems="center" spacing={1}>
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
          </Box>
          <Box mt={3}>
            <Suspense
              fallback={
                <Skeleton
                  variant="rectangular"
                  sx={{
                    backgroundColor: `${
                      theme.palette.mode === "dark" ? "#111" : "#f5f5f5"
                    }`,
                  }}
                />
              }
            >
              <TransactionAreaMobile />
            </Suspense>
          </Box>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default FundsAndTransferAreaMobile;
