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




// Lazy image loader
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const NewRateModal = ({ open, handleClose, chatSession }) => {

  const theme = useTheme();
  const [showSnackbar, setShowSnackbar] = useState(false);

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
    axios 
    .patch( PATCH_NEW_TERM , 
      JSON.stringify({
        "chatSessionId": JSON.stringify(chatSession),
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
    })
    .catch((err) =>{
      console.log(err)
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
              NGN 90000000000.00
            </Typography>
          </Box>
          <Box  mt={4} mb={2} gap={2} >
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
          </Box>
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
            severity="success"
          >
            link Copied!
          </Alert>
        </Snackbar>
      </Box>
      
      </Modal>
      
    </>
  );
};

export default NewRateModal;
