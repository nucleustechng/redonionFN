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

// Logout authentication
import useAuth from "../../../hooks/useAuth";

import { useNavigate } from "react-router-dom";

import { useTheme } from '@mui/material/styles';





// Lazy image loader
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);



const ViewRateModal = ({ open, handleClose }) => {

  const theme = useTheme();
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
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
        <Box  px={1} py={2} bgcolor="#F6F0F8" borderRadius="8px"
          sx={{
            color: theme.palette.mode === "dark" ? "black" : "inherit",
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
                NGN 900000000.00
              </Typography>
            </Box>

          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between" alignContent="center">
            <Typography fontSize={{xs:"14px", lg:"16px"}} fontWeight={300}>
              Token Amount
            </Typography>
            <Typography fontSize="14px" fontWeight={500}>
              0.00
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
            NGN 900000000.00
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center"  mt={4} mb={2} gap={2} alignContent="center">
          <Button variant="outlined" 
            size="xl"
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
          >
            Accept
          </Button>
        </Box>
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

export default ViewRateModal;
