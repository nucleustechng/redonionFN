import React, { Suspense } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Stack,
  Skeleton,
  Chip,
  Snackbar,
  Alert,
  IconButton,
  useMediaQuery,
  Divider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

// Image

import BitCoinIcon from "../../../assets/bitCoinIcon.svg";

// Styles
import styles from "./RewardTabArea.module.css";

// Custom Theme
import { useTheme } from "@mui/material/styles";

import UpArrow from "../../../assets/upArrow.svg";
import DownArrow from "../../../assets/arrowDown.svg";

import ExchanageIcon from "../../../assets/exchange.svg";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);




const AvailableRewards = () => {
  const [openRewardModal, setOpenRewardModal] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));


  return (
    <React.Fragment>
      <Box m={6}>
        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Stack direction="row" >
              <LazyImageComponent sx={{ marginRight: 4 }} src={UpArrow} />
              <Typography mt={0.2} fontSize={14}>
                Sent
              </Typography>


            </Stack>
            <Stack mt={2} ml={-1} direction="row"

            >

              <Box ml={1.5}  >
                <Stack direction="row">
                  <LazyImageComponent src={BitCoinIcon}
                  />
                  <Typography color="secondary" fontWeight={400} fontSize={14} mt={0.8} ml={1} variant="body2">
                    EUR
                  </Typography>
                </Stack>
                <Box sx={{ borderBottom: 1, borderBottomStyle: 'dashed', width: 70 }}>
                  <Typography fontSize={16} mt={0.4} color="secondary" variant="body2">
                    $5677.00
                  </Typography>
                </Box>

                <Typography color="secondary" fontWeight={400} fontSize={12} mt={0.8} variant="body2">
                  14th October, 2022
                </Typography>


                <Typography color="secondary" fontWeight={600} fontSize={14} mt={2} variant="body2">
                  Amount left in escrow
                </Typography>
              </Box>




            </Stack>
          </Box>

          <Box>
            <Stack direction="row" mt={1} >
              <LazyImageComponent sx={{ marginRight: 4 }} src={ExchanageIcon} />

            </Stack>
            <Box ml={-5}>
              <Typography color="secondary" fontWeight={400} fontSize={14} mt={0.8} variant="body2">
                Rate: $1 = 466.77
              </Typography>
              <Typography color="secondary" ml={-1} fontWeight={400} fontSize={12} mt={0.8} variant="body2">
                Official rate: $1 = 433.72
              </Typography>
            </Box>
          </Box>

          <Box>
            <Stack direction="row" >
              <LazyImageComponent sx={{ marginRight: 4 }} src={DownArrow} />
              <Typography mt={0.2} fontSize={14}>
                To receive
              </Typography>
            </Stack>

            <Box mr={1.5} mt={2}  >
              <Stack direction="row" justifyContent="flex-end">
                <LazyImageComponent src={BitCoinIcon}
                />
                <Typography color="secondary" fontWeight={400} fontSize={14} mt={0.8} ml={1} variant="body2">
                  EUR
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="flex-end">
                <Box sx={{ borderBottom: 1, borderBottomStyle: 'dashed', width: 70 }}>
                  <Typography fontSize={16} mt={0.4} color="secondary" variant="body2">
                    $5677.00
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" justifyContent="flex-end">
                <Typography color="secondary" fontWeight={400} fontSize={12} mt={0.8} variant="body2">
                  14th October, 2022
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="flex-end">
                <Typography color="primary" fontWeight={400} fontSize={16} mt={2} variant="body2">
                  $786.00
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Stack>

        <Stack mt={4} direction="row" justifyContent="flex-end">
          <Button
            // onClick={handleCloseTwoFAPin}
            variant="contained" color="primary">
            <Typography variant="caption" p={0.6} textTransform={"none"} fontSize={14} color="background.light">


              Withdraw from Escrow

            </Typography>
          </Button>
        </Stack>
      </Box>
    </React.Fragment>
  );
};

export default AvailableRewards;
