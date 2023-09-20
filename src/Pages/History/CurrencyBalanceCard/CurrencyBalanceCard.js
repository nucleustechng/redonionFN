import React from "react";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { Typography, Stack, Button, useMediaQuery } from "@mui/material";

// Styles
import styles from "./CurrencyBalanceCard.module.css";

const CurrencyBalanceCard = ({ deposit, withdraw }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <React.Fragment>
      {!isTablet && (
        <Box
          className={!isMobile ? styles.mainBox : styles.mainBoxMobile}
          bgcolor={
            !isMobile
              ? theme.palette.background.card
              : theme.palette.background.default
          }
        >
          <Box
            className={
              !isMobile ? styles.cardContent : styles.cardContentMobile
            }
          >
            <Typography variant="body2" color="secondary">
              Fiat currency balance
            </Typography>
            <Typography
              variant={!isMobile ? "h3" : "h4"}
              className={!isMobile ? styles.cardTitle : styles.cardTitle}
              mt={!isMobile ? 3 : 2}
            >
              ₹20,500
            </Typography>
            <Stack direction="row" spacing={2} mt={3}>
              <Button
                disableElevation
                onClick={deposit}
                color="success"
                variant="contained"
                className={styles.cardButton}
              >
                <Typography component="span" color="#ffffff">
                  Deposit
                </Typography>
              </Button>
              <Button
                disableElevation
                onClick={withdraw}
                color="orange"
                variant="contained"
                className={styles.cardButton}
              >
                <Typography component="span" color="#ffffff">
                  Withdraw
                </Typography>
              </Button>
            </Stack>
          </Box>
          <Box className={!isMobile ? styles.cardNote : styles.cardNoteMobile}>
            <Typography
              variant="body2"
              color="text.secondary"
              lineHeight={2}
              fontWeight={300}
            >
              <Typography color="primary" component="span">
                Note:
              </Typography>{" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              vitae metus ullamcorper, ornare nisl a, porta ex. Integer
              dignissim ipsum est, sed vulputate lorem pharetra vel. Nullam nec
              rutrum enim.{" "}
            </Typography>
          </Box>
        </Box>
      )}
      {isTablet && (
        <Box
          bgcolor={
            !isMobile
              ? theme.palette.background.card
              : theme.palette.background.default
          }
        >
          <Stack>
            <Box p={3} className={styles.cardContentMobile}>
              <Typography variant="body2" color="secondary">
                Fiat currency balance
              </Typography>
              <Typography
                variant={!isMobile ? "h3" : "h4"}
                className={!isMobile ? styles.cardTitle : styles.cardTitle}
                mt={!isMobile ? 3 : 2}
              >
                ₹20,500
              </Typography>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                mt={3}
              >
                <Button
                  disableElevation
                  onClick={deposit}
                  color="success"
                  variant="contained"
                  className={styles.cardButton}
                >
                  <Typography component="span" color="#ffffff">
                    Deposit
                  </Typography>
                </Button>
                <Button
                  disableElevation
                  onClick={withdraw}
                  color="orange"
                  variant="contained"
                  className={styles.cardButton}
                >
                  <Typography component="span" color="#ffffff">
                    Withdraw
                  </Typography>
                </Button>
              </Stack>
            </Box>
            <Box p={5} className={styles.cardNoteMobile}>
              <Typography
                variant="body2"
                color="text.secondary"
                lineHeight={2}
                fontWeight={300}
              >
                <Typography color="primary" component="span">
                  Note:
                </Typography>{" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                vitae metus ullamcorper, ornare nisl a, porta ex. Integer
                dignissim ipsum est, sed vulputate lorem pharetra vel. Nullam
                nec rutrum enim.{" "}
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}
    </React.Fragment>
  );
};

export default CurrencyBalanceCard;
