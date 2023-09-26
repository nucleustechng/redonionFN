import React, { useState, useEffect, Suspense } from "react";
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
} from "@mui/material";
import moment from "moment";

import { LoadingButton } from "@mui/lab";

// Custom Theme
import { useTheme } from "@mui/material/styles";

// Axios
import axios from "../../../../api/axios";

import { ModalSkeletons } from "../../../../components/Skeletons/ComponentSkeletons";

// Router
import { useNavigate } from "react-router-dom";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../../../components/LazyImageComponent/LazyImageComponent")
);

const SuspendModal = React.lazy(() => import("./SuspendModal"));

const ComplaintInfo = (prop) => {
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState(false);

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const navigate = useNavigate();

  const handleOpenSuccessModal = () => {
    setOpenSuccessModal(!openSuccessModal);
  };

  var complaint = prop.data;

   const [message, setMessage] = React.useState("");
   const chooseMessage = (message) => {
     setMessage(message);
     if(message === "close"){
      handleOpenSuccessModal(false);
      // getSuspend();
     }
   };

   


  return (
    <Box pt={4} pr={2}>
      <Suspense fallback={<ModalSkeletons />}>
        {/* <SuspendModal
          chooseMessage={chooseMessage}
          open={openSuccessModal}
          user={user}
          handleClose={handleOpenSuccessModal}
        /> */}
      </Suspense>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Box>
          <Typography fontSize={20} variant="caption">
            {complaint.content}
          </Typography>
        </Box>
      </Stack>

      {/* <Stack mt={4} direction={"row"} justifyContent={"space-between"}>
        <Box>
          <Typography fontSize={16} variant="caption">
            Date:
          </Typography>
        </Box>
        <Typography fontSize={16} variant="caption">
          {moment(complaint?.createdAt).format("Do MMMM YYYY")}
        </Typography>
      </Stack> */}

      <Stack mt={4} direction={"row"} justifyContent={"space-between"}>
        <Box>
          <Typography fontSize={16} variant="caption">
            Date:
          </Typography>
        </Box>
        <Typography fontSize={16} variant="caption">
          {moment(complaint?.createdAt).format("Do MMMM YYYY")}
        </Typography>
      </Stack>
    </Box>
  );
};

export default ComplaintInfo;
