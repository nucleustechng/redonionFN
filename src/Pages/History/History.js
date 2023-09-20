import React, { Suspense, useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  Grid,
  IconButton,
  Snackbar,
  useMediaQuery,
  Typography,
  Stack,
  Slide,
  Alert,
  Tooltip,
} from "@mui/material";
import Close from "@mui/icons-material/Close";
// Theme
import { useTheme } from "@mui/material/styles";

import { CopyToClipboard } from "react-copy-to-clipboard";

import styles from "./HistoryTabArea/RewardTabArea.module.css";
import {
  CardSkeleton,
  ComponentSkeleton,
  TableSkeleton,
} from "../../components/Skeletons/ComponentSkeletons";

import Deail from "../../assets/deail.svg";
import Ranz from "../../assets/ranz.svg";
import O from "../../assets/o.svg";
import From from "../../assets/from.svg";
import Arrow from "../../assets/arrow.svg";
import Sender from "../../assets/sender.svg";
import Download from "../../assets/download.svg";
import Share from "../../assets/share.svg";
import LazyImageComponent from "../../components/LazyImageComponent/LazyImageComponent";
import { set } from "date-fns";
import moment from "moment";

const RewardTabArea = React.lazy(() =>
  import("./HistoryTabArea/HistoryTabArea")
);

const FiatWalletInterface = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [panel, setPanel] = React.useState(0);

  const [infoValue, setInfoValue] = React.useState("");

  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setShowSnackbar(!showSnackbar);
  };


  const handleCallback = (childData) => {
    // Update the name in the component's state
    setInfoValue(childData);
    setPanel(1);
    console.log(childData);
  };

  return (
    <Stack mt={-9} width={"100%"} direction="row">
      <Box
        width={panel === 0 ? "100%" : "75%"}
        mt={5}
        sx={{ overflowX: "hidden" }}
        px={!isMobile ? 5 : 1}
        // className={styles.mainBox}
      >
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          TransitionComponent={Slide}
          open={showSnackbar}
          autoHideDuration={1000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            sx={{ width: "100%", mt: 1 }}
            onClose={handleCloseSnackbar}
            severity="success"
          >
            Address Copied!
          </Alert>
        </Snackbar>
        <Box mb={4}>
          <Typography
            variant="caption"
            fontSize={25}
            fontWeight={400}
            color="secondary"
          >
            History{" "}
          </Typography>
        </Box>

        {/* {!isMobile && ( */}
        <Box>
          <Grid
            container
            columns={{ xs: 1, sm: 1, md: 12 }}
            spacing={{ xs: 4, sm: 2, md: 12 }}
          >
            <Grid item xs={12} sm={12} md={12}>
              <Box>
                <Suspense fallback={<ComponentSkeleton />}>
                  <RewardTabArea parentCallback={handleCallback} />
                </Suspense>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/* )} */}
        {/* {isMobile && (
        <Box>
          {" "}
          <Box className={styles.rewardTabArea}>
            <Suspense fallback={<ComponentSkeleton />}>
              <RewardTabArea />
            </Suspense>
          </Box>
        </Box>
      )} */}
      </Box>
      {panel === 1 && (
        <Box
          borderRadius={0}
          px={3}
          position={"absolute"}
          right={0}
          py={4}
          width={"25%"}
          bgcolor={theme.palette.mode === "dark" ? "#222" : "#E8E8F3"}
          height={"100%"}
        >
          <Stack direction="row" justifyContent={"space-between"}>
            <Typography color={theme.palette.mode === "dark" ? "#fff" : "#000"}>
              History
            </Typography>
            <IconButton onClick={() => setPanel(0)} sx={{ mt: -0.5 }}>
              <Close sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          </Stack>
          <Box
            mt={3}
            borderRadius={2}
            py={3}
            px={3}
            bgcolor={theme.palette.mode === "dark" ? "#111" : "#fff"}
          >
            <LazyImageComponent src={Deail} />

            <Stack mt={2} direction="row" justifyContent={"space-between"}>
              <Typography fontSize={14}>Date:</Typography>
              <Typography fontWeight={600} fontSize={14}>
                {moment(infoValue?.createdAt).format("Do MMMM, YYYY")}
              </Typography>
            </Stack>
            <Stack mt={2} direction="row" justifyContent={"space-between"}>
              <Typography fontSize={14}>Time:</Typography>
              <Typography fontWeight={600} fontSize={14}>
                {moment(infoValue?.createdAt).format("HH:mm a")}
              </Typography>
            </Stack>

            <Stack mt={2} direction="row" justifyContent={"space-between"}>
              <Typography fontSize={14}>Transaction ID:</Typography>
              <CopyToClipboard
                onCopy={() => setShowSnackbar(true)}
                text={infoValue?.id}
              >
                <Tooltip title="Copy Address">
                  <Box button sx={{ cursor: "pointer" }}>
                    <Typography
                      fontWeight={500}
                      fontSize={15}
                      mt={0}
                      color={"#fff"}
                      variant="body2"
                    >
                     {infoValue?.id.substr(0, 15) + "\u2026"}
                    </Typography>
                  </Box>
                </Tooltip>
              </CopyToClipboard>
              {/* <Typography fontWeight={600} fontSize={14}>
                {infoValue?.cryptoTransactionId}
              </Typography> */}
            </Stack>
            <br />
            <hr />

            <Box mt={3}>
              <LazyImageComponent src={Ranz} />

              {/* <Stack mt={2} direction="row" justifyContent={"space-between"}>
                <LazyImageComponent src={From} />
                <LazyImageComponent src={O} />
              </Stack> */}
              <Stack mt={2} direction="row" justifyContent={"space-between"}>
                <LazyImageComponent src={From} />
                <LazyImageComponent src={Arrow} />
                <LazyImageComponent src={O} />
              </Stack>

              <Stack mt={2} direction="row" justifyContent={"space-between"}>
                <Typography fontWeight={600} fontSize={16}>
                  {infoValue?.amountInCrypto}
                </Typography>
                <Typography fontWeight={600} fontSize={16}>
                  --
                </Typography>
              </Stack>
              {/* <Stack mt={2} direction="row" justifyContent={"space-between"}>
                <Typography fontSize={14}>Rate:</Typography>
                <Typography fontWeight={600} fontSize={14}>
                  1$ =₦720
                </Typography>
              </Stack> */}
            </Box>
            <br />
            {/* <hr />
            <Box>
              <Stack mt={2} direction="row" justifyContent={"space-between"}>
                <Typography fontSize={14}>Tunde Ojigho</Typography>
                <Typography fontWeight={600} fontSize={14}>
                  $100
                </Typography>
              </Stack>
              <Stack mt={2} direction="row" justifyContent={"space-between"}>
                <Typography fontSize={14}>Tunde Ojigho</Typography>
                <Typography fontWeight={600} fontSize={14}>
                  $100
                </Typography>
              </Stack>
            </Box>
            <br /> */}
            {/* <hr /> */}
            {/* <br />
            <LazyImageComponent src={Sender} />
            <Stack mt={2} direction="row" justifyContent={"space-between"}>
              <Typography fontSize={14}>Sender:</Typography>
              <Typography fontWeight={600} fontSize={14}>
                Tunde Ojigho
              </Typography>
            </Stack>
            <Stack mt={2} direction="row" justifyContent={"space-between"}>
              <Typography fontSize={14}>Location:</Typography>
              <Typography fontWeight={600} fontSize={14}>
                Nigeria
              </Typography>
            </Stack> */}
          </Box>
          {/* <Box>
            <Stack
              mx={10}
              mt={8}
              direction="row"
              justifyContent={"space-between"}
            >
              <LazyImageComponent src={Download} />
              <LazyImageComponent src={Share} />
            </Stack>
          </Box> */}
        </Box>
      )}
    </Stack>
  );
};

export default FiatWalletInterface;
