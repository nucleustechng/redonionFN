import React, { useState } from "react";
import {
  Button,
  Typography,
  styled,
  Input,
  useMediaQuery,
  Select,
  MenuItem,
  Stack
} from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import { LoadingButton } from "@mui/lab";

import useAuth from "../../../hooks/useAuth";

import styles from "./AccountSetupStep.module.css";
import { GrowwBar } from "../../../components/GrowwBar/GrowwBar";

import successClock from "../../../assets/clockSuccess.svg";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

// Custom input style
const ImageInput = styled("input")({
  display: "none",
});

const AccountSetupStep = () => {
 
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { logInUser, authError, isLoading } = useAuth();

  const [bank, setBank] = React.useState('');

  const handleChange = (event) => {
    setBank(event.target.value);
  };

  return (
    <Box p={!isMobile ? 5 : 3} bgcolor="background.paper">
      <Typography
        className={styles.titleBox}
        variant="h3"
        color="secondaryDark"
        fontWeight={600}

      >
        Add account details
      </Typography>

      <Typography
        className={styles.titleBoxA}
        variant="h3"
        color="secondary"
        fontWeight={400}

      >
        All FIAT gotten through Exchange will be sent to this account.
      </Typography>
     
    
      <Box mt={4}>
        <Typography className={styles.nameFont} variant="body2" mb={1}>
          Account Name
        </Typography>
        <Input
          disableUnderline
          className="inputField"
          autoCapitalize="off"
          type="text"
          variant="outlined"
          size="small"
          fullWidth
          color="secondary"
        />
        <Typography className={styles.nameFont} variant="body2" mt={3} mb={1}>
          Account number
        </Typography>
        <Input
          disableUnderline
          className="inputField"
          type="number"
          variant="outlined"
          size="small"
          fullWidth
          color="secondary"
        />
        <Typography className={styles.nameFont} variant="body2" mt={3} mb={1}>
          Bank
        </Typography>
        <Select
          value={bank}
          onChange={handleChange}
          displayEmpty
          fullWidth
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="Nigeria">
            Nigeria
          </MenuItem>
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>

        <Stack mt={5} >
          {isLoading ? (
            <LoadingButton loading variant="outlined">
              Login
            </LoadingButton>
          ) : (
            <>
              <Button type="submit" style={{ height: 60, borderRadius: 10, fontSize: 20, textTransform: 'none' }} variant="contained" color="primary">
                Add Account
              </Button>

            </>
          )}
        </Stack>
      </Box>

      <Box mt={!isMobile ? 4 : 8}>
        <center>
          <LazyImageComponent src={successClock} />
        </center>
        <Typography
          className={styles.titleBoxA}
          variant="h3"
          color="primary"
          fontWeight={400}

        >
          Welcome to Exchange
        </Typography>

      
        <Stack mt={5} >
          {isLoading ? (
            <LoadingButton loading variant="outlined">
              Login
            </LoadingButton>
          ) : (
            <>
              <Button type="submit" style={{ height: 60, borderRadius: 10, fontSize: 20, textTransform: 'none' }} variant="contained" color="primary">
                  Continue to dashboard
              </Button>

            </>
          )}
        </Stack>


      </Box>
    </Box>
  );
};

export default AccountSetupStep;
