import React, { useState } from "react";
import {
  Snackbar,
  Alert,
  Zoom,
  IconButton,
  Modal,
  Tooltip,
  Typography,
  Button,
  Slide,
  Stack,
  InputAdornment,
  Input,
  useMediaQuery,
  TextField
} from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

// Logout authentication
import useAuth from "../../../hooks/useAuth";

import { useNavigate } from "react-router-dom";

import { useTheme } from '@mui/material/styles';
import { LoadingButton } from "@mui/lab";
import styles from "../../ProfilePage/Account/Account.module.css";
import back from "../../../assets/back2.svg";
import back2 from "../../../assets/backArrow.svg";
import axios from "../../../api/axios";







// Lazy image loader
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);



const ViewRateModal = ({ open, handleClose, newRate, pricePerUnit, tokenAmount, chatSessionId  }) => {

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);

  const [acceptBox, setAcceptBox] = useState(false);
  const [rejectBox, setRejectBox] = useState(false);

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");


  const [reason , setReason] = useState("")
  const [amount , setAmount] = useState("")
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));


  const theme = useTheme();


  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const HandleOpenAcceptBox = () => {
    setAcceptBox(true);
  };
  const HandleOpenRejectBox = () => {
    setRejectBox(true);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    [theme.breakpoints.only('xs')]: {
      width: 350, 
    },
    [theme.breakpoints.only('sm')]: {
      width: 380, 
    },
    [theme.breakpoints.only('md')]: {
      width: 400, 
    },
    [theme.breakpoints.only('lg')]: {
      width: 450, 
    },
    [theme.breakpoints.only('xl')]: {
      width: 450, 
    },
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 22,
  };

  const ACCEPT_URL = "/transaction/accept-special-offer"
  const REJECT_URL = "/transaction/reject-special-offer"

  const Close = () =>{
    console.log("clickedddd")
    setAcceptBox(false)
    setRejectBox(false)
  }


  const Accept = () => {

    
    setLoading(true);

    axios.post(
      ACCEPT_URL,
      JSON.stringify({
        "chatSessionId": chatSessionId,
        "amount": parseInt(amount)
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }
      }
    ).then((res) => {
      console.log(res.data);
      setShowSnackbar(true)
      if(res.data.success === true){
        setSeverity("success")
        setMessage(res.data.msg)
      }else{
        setSeverity("error")
        setMessage(res.data.msg)
      }
      
    }).catch((err) => {
      if (err?.response?.status === 401) {
        navigate("/user/sign-in")
      } else {
        console.log(err)
        setShowSnackbar(true)
        setSeverity("error")
        setMessage(err.response.data.msg)
      }
    })
    .finally(() => setLoading(false));

  };

  const Reject = () => {

    
    setLoading(true);

    axios.post(
      REJECT_URL,
      JSON.stringify({
        "chatSessionId": chatSessionId,
        "reason": reason
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }
      }
    ).then((res) => {
      console.log(res.data);
      setShowSnackbar(true)
      if(res.data.success === true){
        setSeverity("success")
        setMessage(res.data.msg)
      }else{
        setSeverity("error")
        setMessage(res.data.msg)
      }
      
    }).catch((err) => {
      if (err?.response?.status === 401) {
        navigate("/user/sign-in")
      } else {
        console.log(err)
        setShowSnackbar(true)
        setSeverity("error")
        setMessage(err.response.data.msg)
      }
    })
    .finally(() => setLoading(false));

  };

  const navigate = useNavigate();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  return (
    <>
      <Modal
        disableAutoFocus
        disableEnforceFocus
        keepMounted
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleClose}
      >
        {newRate !== 0 ?
          <Box
            py={3}
            px={3}
            bgcolor="background.paper"
            sx={style}
          >
            <Box mb={2.5} display="flex" alignItems="center" justifyContent="space-between" alignContent="center">
            {(acceptBox || rejectBox) && (
              <Box  onClick={Close}>
                <LazyImageComponent src={theme.palette.mode === 'dark' ? back : back2}  />
              </Box>
            )}
              <Typography 
                fontSize="18px" 
                fontWeight={500}  
                variant="h6" component="p"
                sx={{
                  color: theme.palette.mode === 'light' ? 'black' : 'inherit',
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Review New Terms
              </Typography>
              <IconButton color="secondary" onClick={handleClose}   sx={{ justifyContent: 'flex-end' }} >
                <Tooltip
                  placement="right"
                  TransitionComponent={Zoom}
                  title="Close"
                >
                  <CloseIcon 
                    fontSize="medium" 
                    sx={{
                      color: theme.palette.mode === "light" ? "black" : "inherit",
                    }}
                  />
                </Tooltip>
              </IconButton>
            </Box>

            {acceptBox ?
              <Box
                component="form"
                onSubmit={Accept}
              >
                <Stack spacing={1} mb={2}>
                  <Typography
                    color={
                      theme.palette.mode === "dark"
                        ? "text.secondary"
                        : "common.black"
                    }
                  >
                    Amount
                  </Typography>
                  <Input
                    disableUnderline
                    sx={{
                      borderRadius: "4px",
                      padding: "10px",
                      bgcolor: theme.palette.mode === "dark" ? "#353638" : "#E1E6E8"
                    }}
                    onChange={(e)=> setAmount(e.target.value)}
                    type="number"
                    variant="filled"
                    color="secondary"
                    size="small"
                  />
                </Stack>
                
                <Stack mt={4} mb={2}>
                  {loading ? (
                    <LoadingButton
                      style={{
                        height: 60,
                        borderRadius: 10,
                        fontSize: 20,
                        textTransform: "none",
                      }}
                      loading
                      variant="outlined"
                    >
                    </LoadingButton>
                  ) : (
                    <>
                      <Button
                        type="submit"
                        onClick={Accept}
                        style={{
                          height: 60,
                          borderRadius: 10,
                          fontSize: 16,
                          textTransform: "none",
                        }}
                        color="primary"
                        variant="contained"
                        fullWidth
                      >
                        Purchase
                      </Button>
                    </>
                  )}
                </Stack>
              </Box>

              : rejectBox ? 
                <Box
                  component="form"
                  onSubmit={Reject}
                >
                  <Stack spacing={1} mb={2}>
                    <Typography
                      color={
                        theme.palette.mode === "dark"
                          ? "text.secondary"
                          : "common.black"
                      }
                    >
                       Reason
                    </Typography>
                    <TextField
                      InputProps={{ disableUnderline: true }}
                      sx={{
                        borderRadius: "4px",
                        bgcolor: theme.palette.mode === "dark" ? "#353638" : "#E1E6E8"
                      }}
                      onChange={(e)=> setReason(e.target.value)}
                      variant="filled"
                      multiline
                      rows={3}
                      color="secondary"
                    />
                  </Stack>
                  
                  <Stack mt={4} mb={2}>
                    {loading ? (
                      <LoadingButton
                        style={{
                          height: 60,
                          borderRadius: 10,
                          fontSize: 20,
                          textTransform: "none",
                        }}
                        loading
                        variant="outlined"
                      >
                      </LoadingButton>
                    ) : (
                      <>
                        <Button
                          type="submit"
                          onClick={Reject}
                          style={{
                            height: 60,
                            borderRadius: 10,
                            fontSize: 16,
                            textTransform: "none",
                          }}
                          color="primary"
                          variant="contained"
                          fullWidth
                        >
                          Confirm
                        </Button>
                      </>
                    )}
                  </Stack>
                </Box>   

              :
              <>
                <Box  px={1} py={2} borderRadius="8px"
                  sx={{
                    color: theme.palette.mode === "dark" ? "white" : "inherit",
                    bgcolor: theme.palette.mode === "dark" ? "#333333" : "#E1E1E1",
                  }}
                >
                  <Box display="flex" alignItems="center" pb={1} justifyContent="space-between" alignContent="center">
                    <Typography fontSize={{xs:"14px", lg:"16px"}} fontWeight={300} >
                      New Rate
                    </Typography>
                    <Box 
                      display="flex" 
                      justifyContent="space-between" alignItems="center"
                    >
                      <Typography
                        fontSize="14px"
                        pr={1}
                        fontWeight={500}
                      >
                        1 BNB =  
                      </Typography>
                      <Typography
                        fontSize="14px"
                        fontWeight={500}
                      >
                        NGN {newRate}
                      </Typography>
                    </Box>

                  </Box>
                  <Box display="flex" alignItems="center" justifyContent="space-between" alignContent="center">
                    <Typography fontSize={{xs:"14px", lg:"16px"}} fontWeight={300}>
                      Token Amount
                    </Typography>
                    <Typography fontSize="14px" fontWeight={500}>
                      {tokenAmount}
                    </Typography>
                  </Box>
                  <Box display="flex"  py={1} alignItems="center" justifyContent="space-between" alignContent="center">
                    <Typography fontSize={{xs:"14px", lg:"16px"}} fontWeight={300}>
                      Account number
                    </Typography>
                    <Typography fontSize="14px" fontWeight={500}>
                      234567890
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" justifyContent="space-between" alignContent="center">
                    <Typography fontSize={{xs:"14px", lg:"16px"}} fontWeight={300}>
                      Bank name
                    </Typography>
                    <Typography fontSize="14px" fontWeight={500}>
                      First bank
                    </Typography>
                  </Box>
                  
                </Box>
                <Box 
                  mt={2}
                  display="flex" 
                  alignItems="center"
                  color={theme.palette.mode === 'dark' ? '#ffff' : 'black'}
                >
                  <Typography
                    fontSize="14px"
                    pr={1}
                    fontWeight={300}
                  >
                    Original rate 
                  </Typography>
                  <Typography
                    fontSize="14x"
                    pr={1}
                    fontWeight={500}
                  >
                    1 BNB =  
                  </Typography>
                  <Typography
                    fontSize="12px"
                    fontWeight={500}
                  >
                    NGN {pricePerUnit}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="center"  mt={4} mb={2} gap={2} alignContent="center">
                  <Button variant="outlined" 
                    size="xl"
                    onClick={HandleOpenRejectBox}
                    style={{
                      color: '#3063E9',
                      borderColor: '#3063E9',
                      borderRadius: "8px",
                      padding: '8px 50px',
                    }}
                  >
                    Reject
                  </Button>
                  <Button variant="contained" 
                    style={{
                      color: 'white',
                      backgroundColor: '#3063E9',
                      borderRadius: "8px",
                      padding: '8px 50px',
                    }}
                    onClick={HandleOpenAcceptBox}
                  >
                    Accept
                  </Button>
                </Box>
              </>
            }

            <Snackbar
              anchorOrigin={{ vertical: "center", horizontal: "center" }}
              TransitionComponent={Slide} 
              open={showSnackbar}
              autoHideDuration={1000}
              onClose={handleCloseSnackbar}
              >
              <Alert
                onClose={handleCloseSnackbar}
                severity={severity}
              >
                {message}
              </Alert>
            </Snackbar>
          </Box>
        : 
          <Box
            py={3}
            px={3}
            textAlign="center"
            bgcolor="background.paper"
            sx={style}
          >
            <Typography>No new terms set</Typography>
          </Box>
        }
      </Modal>
      
    </>
  );
};

export default ViewRateModal;
