import React from "react";
import {
  Button,
  Divider,
  IconButton,
  Input,
  InputAdornment,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

// Styles
import styles from "./CoinDetailsStyle.module.css";
import { DatePickerTextField } from "../../components/DatePickerTextField/DatePickerTextField";

const CoinFilterArea = () => {
  const [fromDateValue, setFromDateValue] = React.useState(null);
  const [toDateValue, setToDateValue] = React.useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <React.Fragment>
      {!isMobile && (
        <Box pr={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            className={styles.filterArea}
            spacing={1}
            alignItems="center"
          >
            <Input
              disableUnderline
              className="inputField"
              color="secondary"
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
            />
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
                      variant="outlined"
                      color="secondary"
                      size="small"
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
                      variant="outlined"
                      color="secondary"
                      size="small"
                      {...params}
                    />
                  )}
                />
              </Stack>
            </LocalizationProvider>
            <Box>
              <Button sx={{ py: 1.2 }} variant="outlined" color="primary">
                Search
              </Button>
            </Box>
          </Stack>
          <Divider />
        </Box>
      )}
      {isMobile && (
        <Box>
          <Box>
            <Input
              fullWidth
              disableUnderline
              className="inputField"
              color="secondary"
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
            />
          </Box>
          <Box mt={2} mb={2}>
            <Stack direction="row" spacing={1} alignItems="center">
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
                        variant="outlined"
                        color="secondary"
                        size="small"
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
                        variant="outlined"
                        color="secondary"
                        size="small"
                        {...params}
                      />
                    )}
                  />
                </Stack>
              </LocalizationProvider>
              <Box>
                <Button sx={{ py: 1.2 }} variant="outlined" color="primary">
                  Search
                </Button>
              </Box>
            </Stack>
          </Box>
          <Divider sx={{ mb: 4 }} />
          <Typography variant="button">Transactions</Typography>
        </Box>
      )}
    </React.Fragment>
  );
};

export default CoinFilterArea;
