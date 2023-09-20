import React from "react";
import { Box } from "@mui/system";
import { Stack, Typography } from "@mui/material";

// Theme
import { useTheme } from "@mui/material/styles";

// Styles
import styles from "./TimeLineArea.module.css";

// Fake timeline data
const timelineData = [
  {
    number: "66",
    type: "BTC",
    message: "Make transaction of minimum 0.01 BTC",
  },
  {
    number: "67",
    type: "BTC",
    message: "Make transaction of minimum 0.01 BTC",
  },
  {
    number: "68",
    type: "ETH",
    message: "Make transaction of minimum 0.01 ETH",
  },
  {
    number: "69",
    type: "ETH",
    message: "Make transaction of minimum 0.01 ETH",
  },
  {
    number: "70",
    type: "ETH",
    message: "Make transaction of minimum 0.01 ETH",
  },
  {
    number: "71",
    type: "BTC",
    message: "Make transaction of minimum 0.01 BTC",
  },
];

const TimeLineArea = () => {
  const theme = useTheme();
  return (
    <Box className={styles.mainBox}>
      <Box className={styles.timeLineArea}>
        {timelineData.map((tld) => (
          <Box className={styles.timeLineBox} key={tld.number}>
            <Box
              bgcolor={theme.palette.mode === "dark" ? "#fff" : "#111"}
              className={styles.timeLineDivider}
            ></Box>
            <Stack direction="row" alignItems="center" spacing={3}>
              <Box
                className={styles.numberArea}
                bgcolor={tld.type === "BTC" ? "#6C63FF" : "#F9E006"}
              >
                <Typography color={theme.palette.common.white}>
                  {tld.number}
                </Typography>
              </Box>
              <Box className={styles.messageArea}>
                <Typography variant="body1" color="secondary">
                  {tld.message}
                </Typography>
              </Box>
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TimeLineArea;
