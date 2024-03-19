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
  useMediaQuery
} from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

import Close from "@mui/icons-material/Close";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";

// Logout authentication
import useAuth from "../../../hooks/useAuth";

import { useNavigate } from "react-router-dom";

import useTheme from "@mui/system/useTheme";
import axios from "../../../api/axios";
import { LoadingButton } from "@mui/lab";




// Lazy image loader
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const NewRateModal = ({ open, handleClose, chatSession, pricePerUnit }) => {

  const theme = useTheme();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");



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

  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));


  const PATCH_NEW_TERM = "/chat/update-terms"

  const handleSetTerms = () => {
     console.log(JSON.stringify(chatSession))
     setLoading(true)
    axios 
    .patch( PATCH_NEW_TERM , 
      JSON.stringify({
        "chatSessionId": chatSession,
        "amount": parseInt(amount),
        "tokenPricePerUnit": parseInt(price)
      }),
      {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((res) => {
      console.log(res)
      setLoading(false)
      setShowSnackbar(true)
      if(res.data.success === true){
        setSeverity("success")
        setMessage(res.data.msg)
      }else{
        setSeverity("error")
        setMessage(res.data.msg)
      }
    })
    .catch((err) =>{
      console.log(err)
      setLoading(false)
    })
  }

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
      <Box
        py={3}
        px={3}
        bgcolor="background.paper"
        sx={style}
      >
        <Box mb={2.5} display="flex" alignItems="center" justifyContent="space-between" alignContent="center">
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
            Set New Terms
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

        <form onSubmit={handleSetTerms}>

          <Box pb={1} >
            
              <Box
                border={1}
                borderColor={"#A4ACAF"}
                borderRadius={1.5}
                px={1.8} mb={2.5}
                py={1}
              >
                <Input
                  fullWidth
                  name="amount"
                  type="number"
                  placeholder=" "
                  onChange={(e) => setPrice(e.target.value)}
                  startAdornment={<InputAdornment position="start">1 BNB = NGN</InputAdornment>}
                  disableUnderline
                />
              </Box>
              <Box
                border={1}
                borderColor={"#A4ACAF"}
                borderRadius={1.5}
                px={1.8}
                py={1}
              >
                <Input
                  fullWidth
                  name="input"
                  type="number"
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder=" Token amount"
                  disableUnderline
                />
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
          <Stack  mt={4} mb={2} gap={2} >
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
            <Button variant="contained"
              style={{
              color: 'white',
              backgroundColor: '#3063E9',
              borderRadius: "8px",
              padding: '8px 50px',
              width: "100%"
              }}
              onClick={handleSetTerms}
            >
              Update Terms
            </Button>
            )}
          </Stack>
        </form>
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
      
      </Modal>
      
    </>
  );
};

export default NewRateModal;
