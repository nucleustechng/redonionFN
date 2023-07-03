import React from "react";
import { Input, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";

import styles from "./BankStep.module.css";
import { GrowwBar } from "../../../components/GrowwBar/GrowwBar";

const BankStep = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box p={!isMobile ? 5 : 3} bgcolor={theme.palette.background.surface}>
      <Typography
        className={styles.titleBox}
        variant="h3"
        color="secondaryDark"
        fontWeight={600}

      >
        Required Identification
      </Typography>

      <Typography
        className={styles.titleBoxA}
        variant="h3"
        color="secondaryDark"
        fontWeight={400}

      >
        Please ensure you select the right ID type that matches the ID you intend to upload.
      </Typography>
     
      <Box mt={!isMobile ? 4 : 8}>
        <Typography variant="body2" mb={1}>
          Account holder name
        </Typography>
        <Input
          disableUnderline
          className="inputField"
          type="text"
          variant="outlined"
          size="small"
          fullWidth
          color="secondary"
        />
        <Typography variant="body2" mt={3} mb={1}>
          IFSC Code
        </Typography>
        <Input
          disableUnderline
          className="inputField"
          type="text"
          variant="outlined"
          size="small"
          fullWidth
          color="secondary"
        />
        <Typography variant="body2" mt={3} mb={1}>
          Account Number
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
        <Typography variant="body2" mt={3} mb={1}>
          Confirm Account Number
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
      </Box>
    </Box>
  );
};

export default BankStep;
