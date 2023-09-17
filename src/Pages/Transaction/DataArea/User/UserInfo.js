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

const UserInfo = (prop) => {
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

  var user = prop.data;

   const [message, setMessage] = React.useState("");
   const chooseMessage = (message) => {
     setMessage(message);
     if(message === "close"){
      handleOpenSuccessModal(false);
      getSuspend();
     }
   };

   

  const GET_SUSPEND_URL = "/admin/set-user-status/";

  const getSuspend = () => {
    var userInfo = JSON.parse(localStorage.getItem("user"));

    setLoading(true);

    axios
      .get(GET_SUSPEND_URL + user?.id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setStatus(res.data.data);
        
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          navigate("/admin/sign-in");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box pt={1} pr={2}>
      <Suspense fallback={<ModalSkeletons />}>
        <SuspendModal
          chooseMessage={chooseMessage}
          open={openSuccessModal}
          user={user}
          handleClose={handleOpenSuccessModal}
        />
      </Suspense>
      <Typography fontSize={20} fontWeight={600} variant="caption">
        Pending confirmation
      </Typography>
      <Stack mt={4} direction={"row"} justifyContent={"space-between"}>
        <Box>
          <Typography fontSize={16} variant="caption">
            Transaction ID: {user.firstName}
          </Typography>
          <Box mt={2}>
            <Typography fontSize={16} variant="caption">
              I made a payment to Tunji Ojigho by morning yesterday but I am yet
              to recieve the crypto equivalent of the money I sent
            </Typography>
          </Box>
        </Box>
      </Stack>

      <Stack mt={4} direction={"row"} justifyContent={"flex-end"}>
        <Typography fontSize={16} variant="caption">
          {moment(user?.createdAt).format("Do MMMM YYYY")}
        </Typography>
      </Stack>
      <Stack mt={0} direction={"row"} justifyContent={"flex-end"}>
        <Typography fontSize={16} variant="caption">
          {moment(user?.createdAt).format("hh:mm A ")}
        </Typography>
      </Stack>

      {/* <Stack direction="row" mt={8} justifyContent="flex-end">
        <Box>
          {loading ? (
            <LoadingButton fullWidth loading variant="outlined">
              Login
            </LoadingButton>
          ) : (
            <>
              {user.active || status.active ? (
                <Button
                  onClick={() => setOpenSuccessModal(true)}
                  // onClick={getSuspend}
                  fullWidth
                  style={{
                    height: 50,
                    borderRadius: 10,
                    fontSize: 20,
                    textTransform: "none",
                  }}
                  variant="contained"
                  color="primary"
                >
                  Suspend
                </Button>
              ) : (
                <Button
                  onClick={() => setOpenSuccessModal(true)}
                  // onClick={getSuspend}
                  fullWidth
                  style={{
                    height: 50,
                    borderRadius: 10,
                    fontSize: 20,
                    textTransform: "none",
                  }}
                  variant="contained"
                  color="primary"
                >
                  UnSuspend
                </Button>
              )}
            </>
          )}
        </Box>
      </Stack> */}
    </Box>
  );
};

export default UserInfo;
