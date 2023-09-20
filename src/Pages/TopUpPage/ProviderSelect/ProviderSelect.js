import React from "react";
import { Box } from "@mui/system";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

// Styles
import styles from "../TopUpPage.module.css";

// Fake Provider Mapping
const providerInfo = [
  {
    id: "1",
    name: "NET BANKING",
    feeAmount: "0.2%",
    feeText: "on each transaction",
  },
  {
    id: "2",
    name: "CREDIT / DEBIT",
    feeAmount: "0.2%",
    feeText: "on each transaction",
  },
  {
    id: "3",
    name: "WALLET",
    feeAmount: "0%",
    feeText: "on each transaction",
  },
  {
    id: "4",
    name: "UPI",
    feeAmount: "0.2%",
    feeText: "on each transaction",
  },
];

const ProviderSelect = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      className={
        !isMobile ? styles.providerSelectBox : styles.providerSelectBoxMobile
      }
    >
      {isMobile && (
        <Typography
          mb={1}
          color="secondary"
          fontWeight={500}
          variant="subtitle1"
        >
          Select a Provider
        </Typography>
      )}
      <RadioGroup defaultValue={providerInfo[1].name}>
        <Stack direction="column" spacing={3}>
          {providerInfo.map(({ id, name, feeText, feeAmount }) => (
            <Box
              className={
                !isMobile
                  ? styles.providerNameBox
                  : styles.providerNameBoxMobile
              }
              key={id}
            >
              <FormControlLabel
                value={name}
                control={<Radio />}
                label={
                  <Typography
                    variant={!isMobile ? "h6" : "subtitle1"}
                    color="secondary"
                  >
                    {name}
                  </Typography>
                }
              />
              <Typography
                component="p"
                variant="caption"
                className={styles.feesBox}
              >
                Fee{" "}
                <Typography color="primary" variant="caption" component="span">
                  {feeAmount}
                </Typography>{" "}
                <Typography
                  color="secondary"
                  variant="caption"
                  component="span"
                >
                  {feeText}
                </Typography>
              </Typography>
            </Box>
          ))}
        </Stack>
      </RadioGroup>
    </Box>
  );
};

export default ProviderSelect;
