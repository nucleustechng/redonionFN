import React, { useState } from "react";
import { Input, Typography, useTheme, useMediaQuery, Select, MenuItem, Button, Stack, Grid, styled, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CancelIcon from "@mui/icons-material/Cancel";

import styles from "./BankStep.module.css";
import useAuth from "../../../hooks/useAuth";

import FrontArrow from "../../../assets/frontArrow.svg";

import IDShow from "../../../assets/idShow.svg";

import successClock from "../../../assets/clockSuccess.svg";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

// Custom input style
const ImageInput = styled("input")({
  display: "none",
});

const BankStep = (props) => {
  const [frontImage, setFrontImage] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { logInUser, authError, isLoading } = useAuth();

  const [country, setCountry] = React.useState('Nigeria');
  const [kycID, setKycID] = React.useState('');

  const [activeStepKYC, setActiveStepKYC] = React.useState(0);

  const handleNext = () => {
    setActiveStepKYC(activeStepKYC + 1)

  }

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  const handleChangeKycID = (event) => {
    setKycID(event.target.value);
  };

  const handleImageUploadFront = (e) => {
    setFrontImage(URL.createObjectURL(e.target.files[0]));
  };

  const onClick = () => {
   props.sendData(2);
   
  }




  return (
    <Box
      p={!isMobile ? 5 : 3}
      bgcolor={theme.palette.background.surface}>
      {activeStepKYC !== 2 && (
        <Box>
          <Typography
            className={styles.titleBox}
            variant="h3"
            color="secondaryDark"
            fontWeight={600}

          >
            Required Identification
          </Typography>

          <Typography
            className={isMobile ? styles.titleBoxMobile : styles.titleBoxA}
            variant="h3"
            color="secondaryDark"
            fontWeight={400}

          >
            Please ensure you select the right ID type that matches the ID you intend to upload.
          </Typography>
        </Box>
      )}
      {activeStepKYC === 0 && (
        <Box mt={!isMobile ? 4 : 8}>
          <Typography variant="body2" className={styles.nameFont} mb={1}>
            Country
          </Typography>
          <Select
            value={country}
            onChange={handleChange}
            displayEmpty
            fullWidth
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="Nigeria">
              Nigeria
            </MenuItem>
            {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
          </Select>
          <Typography variant="body2" className={styles.nameFont} mt={3} mb={1}>
            Select ID
          </Typography>
          <Select
            value={kycID}
            onChange={handleChangeKycID}
            displayEmpty
            fullWidth
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value={"NIN ID"}>
              NIN ID
            </MenuItem>
            <MenuItem value={"NIN Slip"}>NIN Slip</MenuItem>
            <MenuItem value={"Voter's Card"}>Voter's Card</MenuItem>
            <MenuItem value={"Passport"}>Passport</MenuItem>
            <MenuItem value={"Driver's license"}>Driver's license</MenuItem>
          </Select>
          <Stack mt={5} >
            {isLoading ? (
              <LoadingButton loading variant="outlined">
                Login
              </LoadingButton>
            ) : (
              <>
                <Button
                  disabled={kycID === "" ? true : false}
                  onClick={
                    handleNext
                  }
                  style={{ height: 60, borderRadius: 10, fontSize: 20, textTransform: 'none' }} variant="contained" color="primary">
                  Start Verification <LazyImageComponent src={FrontArrow} />
                </Button>

              </>
            )}
          </Stack>
        </Box>
      )}
      {activeStepKYC === 1 && (
        <Box mt={!isMobile ? 4 : 8}>
          <Typography
            className={!isMobile ? styles.titleBoxA : styles.titleBoxAMobile}
            variant="h3"
            color="secondaryDark"
            fontWeight={400}

          >
            {kycID}
          </Typography>

          <Box className={styles.imageBox} mt={5}>
            <Grid
              sx={{
                border: `${theme.palette.mode === "dark"
                  ? "3px dashed #f5f5f5"
                  : "3px dashed #c4c4c4"
                  }`,
                borderRadius: "10px",
              }}
              item
              xs={12}
              md={12}
            >
              {!frontImage ? (
                <Box className={styles.imageUploadBox}>
                  <label htmlFor="icon-button-file-upload">
                    <Box>
                      <Typography variant="caption" sx={{ fontSize: "1.2rem", display: "flex", justifyContent: "center" }}>Your ID should look like this </Typography>
                      <ImageInput
                        accept="image/*"
                        id="icon-button-file-upload"
                        type="file"
                        onChange={handleImageUploadFront}
                      />
                      <Stack justifyContent="center">
                        <IconButton
                          variant="outlined"
                          aria-label="upload picture"
                          component="span"
                        >
                          {/* <AddPhotoAlternateIcon sx={{ fontSize: "3.5rem" }} /> */}
                          <LazyImageComponent src={IDShow} />
                        </IconButton>
                      </Stack>
                      <Typography variant="caption" sx={{ fontSize: "1.2rem", display: "flex", justifyContent: "center" }}>Click to upload ID</Typography>

                    </Box>
                  </label>
                </Box>
              ) : (
                <Box className={styles.uploadedImage}>
                  <img src={frontImage} style={{ display: "flex", justifyContent: "center", width: "100%" }} alt="Front side" />
                  <Box className={styles.cancelButton}>
                    <IconButton onClick={() => setFrontImage(null)} color="error">
                      <CancelIcon />
                    </IconButton>
                  </Box>
                </Box>
              )}
            </Grid>

            <Stack mt={5} >
              {isLoading ? (
                <LoadingButton loading variant="outlined">
                  Login
                </LoadingButton>
              ) : (
                <>
                  <Button
                    disabled={frontImage === null ? true : false}
                    onClick={
                      handleNext
                    }
                    style={{ height: 60, borderRadius: 10, fontSize: 20, textTransform: 'none' }} variant="contained" color="primary">
                    Start Verification <LazyImageComponent src={FrontArrow} />
                  </Button>

                </>
              )}
            </Stack>

          </Box>


        </Box>
      )}
      {activeStepKYC === 2 && (
        <Box mt={!isMobile ? 4 : 8}>
          <center>
            <LazyImageComponent src={successClock} />
          </center>
          <Typography
            className={!isMobile ? styles.titleBoxA : styles.titleBoxAMobile}
            mt={4}
            variant="h3"
            color="primary"
            fontWeight={400}

          >
            We are now verifying your details
          </Typography>

          <Typography
            className={!isMobile ? styles.titleBoxA : styles.titleBoxAMobile}
            variant="h3"
            color={"#202020"}
            fontWeight={400}

          >
            We will send you an email and in-app notification once we’re done verifying your documents.
          </Typography>

          <Stack mt={5} >
            {isLoading ? (
              <LoadingButton loading variant="outlined">
                Login
              </LoadingButton>
            ) : (
              <>
                <Button
                  onClick={onClick}
                  style={{ height: 60, borderRadius: 10, fontSize: 20, textTransform: 'none' }} variant="contained" color="primary">
                  Continue
                </Button>

              </>
            )}
          </Stack>


        </Box>
      )}
    </Box>
  );
};

export default BankStep;
