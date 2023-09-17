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
import UserVeifyModal from "./UserVeifyModal";

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

   const [openVerifyModal, setOpenVerifyModal] = useState(false);

  const navigate = useNavigate();

  const handleOpenSuccessModal = () => {
    setOpenSuccessModal(!openSuccessModal);
  };

   const handleOpenVerifyModal = () => {
     setOpenVerifyModal(!openVerifyModal);
   };

  var user = prop.data;

  // console.log(user);

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
        console.log(res.data.data);
        setStatus(res.data.data.active);
        
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
    <Box pt={4} pr={2}>
      <Suspense fallback={<ModalSkeletons />}>
        <SuspendModal
          chooseMessage={chooseMessage}
          open={openSuccessModal}
          user={user}
          status={status}
          handleClose={handleOpenSuccessModal}
        />
      </Suspense>
      <Suspense fallback={<ModalSkeletons />}>
        <UserVeifyModal
          // chooseMessage={chooseMessage}
          open={openVerifyModal}
          user={user}
          status={status}
          handleClose={handleOpenVerifyModal}
        />
      </Suspense>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Box>
          <Typography fontSize={20} variant="caption">
            {user.firstName} {user.lastName} {user.middleName}
          </Typography>
          <Box mt={-1.0}>
            <Typography fontSize={13} color={"primary"} variant="caption">
              {user.email}
            </Typography>
          </Box>
        </Box>
        <Typography fontSize={15} variant="caption">
          {user.countryId}
        </Typography>
      </Stack>

      <Stack mt={4} direction={"row"} justifyContent={"space-between"}>
        <Box>
          <Typography fontSize={16} variant="caption">
            Sign Up Date:
          </Typography>
        </Box>
        <Typography fontSize={16} variant="caption">
          {moment(user?.createdAt).format("Do MMMM YYYY")}
        </Typography>
      </Stack>

      <Stack direction="row" mt={8} spacing={3} justifyContent="flex-end">
        <Box>
          {loading ? (
            <LoadingButton fullWidth loading variant="outlined">
              Login
            </LoadingButton>
          ) : (
            <>
              {!user?.identityIsVerified ? (
                <Button
                  onClick={() => setOpenVerifyModal(true)}
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
                  Verify
                </Button>
              ) : (
                <Button
                  // onClick={() => setOpenSuccessModal(true)}
                  // onClick={getSuspend}
                  fullWidth
                  style={{
                    height: 50,
                    borderRadius: 10,
                    fontSize: 20,
                    textTransform: "none",
                    backgroundColor: "#aaaaaa",
                  }}
                  variant="contained"
                  // color="primary"
                >
                  Verified
                </Button>
              )}
            </>
          )}
        </Box>

        <Box>
          {loading ? (
            <LoadingButton fullWidth loading variant="outlined">
              Login
            </LoadingButton>
          ) : (
            <>
              {status ? (
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
      </Stack>
    </Box>
  );
};

export default UserInfo;