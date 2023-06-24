import React from "react";
import {
  Button,
  Divider,
  IconButton,
  Input,
  InputAdornment,
  MenuItem,
  Select,
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

// Fake Bank details
const bankDetails = [
  {
    id: "1",
    name: "Kotak Mahindra Bank",
    accNumber: "XXXX-XXXXXX-Mahindra",
  },
  {
    id: "2",
    name: "The Citi Bank",
    accNumber: "XXXX-XXXXXX-Citi",
  },
];

const WithdrawFunds = ({ close, help, handleWithdrawPayment }) => {
  const [bankNames, setBankNames] = React.useState("Kotak Mahindra Bank");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleBankChange = (event) => {
    setBankNames(event.target.value);
  };

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
            Withdraw Funds
          </Typography>
          <IconButton>
            <HelpIcon color="secondary" />
          </IconButton>
        </Stack>
      </Box>
      <Divider />
      <Box my={2} px={3}>
        <Typography variant="body2" color="secondary" mt={3} mb={1}>
          Amount to withdraw
        </Typography>
        <Input
          disableUnderline
          className="inputField"
          type="number"
          startAdornment={<InputAdornment position="start">₹</InputAdornment>}
          placeholder="Amount to withdraw"
          color="secondary"
        />
        <Typography variant="body2" color="text.secondary" mt={3}>
          Choose a Bank Account
        </Typography>
        <Box mt={1}>
          <Select fullWidth value={bankNames} onChange={handleBankChange}>
            {bankDetails.map(({ id, name, accNumber }) => (
              <MenuItem key={id} value={name}>
                <Stack direction="column">
                  <Typography variant="body1">{name}</Typography>
                  <Typography variant="caption">{accNumber}</Typography>
                </Stack>
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Button
          onClick={handleWithdrawPayment}
          variant="contained"
          color="orange"
          fullWidth
          sx={{ mt: 2, py: 1.5 }}
        >
          <Typography
            variant="body2"
            sx={{ textTransform: "capitalize", color: "#ffffff" }}
          >
            Place Withdrawal Request
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default WithdrawFunds;
