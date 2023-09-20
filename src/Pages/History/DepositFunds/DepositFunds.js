import React from "react";
import {
  Button,
  Divider,
  FormControlLabel,
  IconButton,
  Input,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";

// Icons
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HelpIcon from "@mui/icons-material/Help";

// Styles
import styles from "./DepositFunds.module.css";

const DepositFunds = ({ close, help, handleAuthorizePayment }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <Box my={2} px={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <IconButton onClick={close}>
            {!isMobile ? (
              <CloseIcon color="secondary" />
            ) : (
              <ArrowBackIcon color="primary" />
            )}
          </IconButton>
          <Typography variant="body1" color="secondary">
            Deposit Funds
          </Typography>
          <IconButton>
            <HelpIcon color="secondary" />
          </IconButton>
        </Stack>
      </Box>
      <Divider />
      <Box my={2} px={3}>
        <Typography variant="body2" color="secondary" mt={3} mb={1}>
          Amount to deposit
        </Typography>
        <Input
          disableUnderline
          className="inputField"
          type="number"
          startAdornment={<InputAdornment position="start">₹</InputAdornment>}
          placeholder="Amount to Deposit"
          color="secondary"
        />
        <Typography variant="body2" color="text.secondary" mt={1}>
          Between ₹100 - ₹1,00,000
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={3}>
          Choose a Payment Method
        </Typography>
        <Box className={styles.radioContainer}>
          <RadioGroup
            defaultValue="net-banking"
            aria-labelledby="Choose a Payment Method"
            name="payment-method-chooser"
          >
            <Box className={styles.radioBox}>
              <Box>
                <FormControlLabel
                  value="net-banking"
                  control={<Radio />}
                  label={
                    <Typography variant="button" color="secondary">
                      net banking
                    </Typography>
                  }
                />
              </Box>
              <Typography
                variant="caption"
                color="text.orange"
                textAlign="right"
                component="p"
              >
                ₹ 7/trx
              </Typography>
            </Box>
            <Box className={styles.radioBox}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <FormControlLabel
                  value="upi"
                  control={<Radio />}
                  label={
                    <Typography variant="button" color="secondary">
                      upi
                    </Typography>
                  }
                />
                <Typography variant="caption" color="text.success">
                  No Charges
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Choose a payment method
              </Typography>
              <Input
                disableUnderline
                className="inputField"
                size="small"
                endAdornment={
                  <InputAdornment position="end">
                    <Typography
                      variant="caption"
                      color="text.success"
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      Verify
                    </Typography>
                  </InputAdornment>
                }
              ></Input>
            </Box>
            <Box className={styles.radioBox}>
              <Box>
                <FormControlLabel
                  value="NEFT-IMPS-RTGS"
                  control={<Radio />}
                  label={
                    <Typography variant="button" color="secondary">
                      NEFT/IMPS/RTGS
                    </Typography>
                  }
                />
              </Box>
              <Typography
                variant="caption"
                color="text.orange"
                textAlign="right"
                component="p"
              >
                Charges as per bank
              </Typography>
            </Box>
          </RadioGroup>
        </Box>
        <Button
          onClick={handleAuthorizePayment}
          variant="contained"
          color="success"
          fullWidth
          sx={{ mt: 2, py: 1.5 }}
        >
          <Typography
            variant="body2"
            sx={{ textTransform: "capitalize", color: "#ffffff" }}
          >
            Authorize Payment
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default DepositFunds;
