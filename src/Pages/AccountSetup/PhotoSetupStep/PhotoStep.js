import React, { useState, useEffect } from "react";
import { Input, Typography, useTheme, useMediaQuery, Select, MenuItem, Button, Stack, Grid, styled, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CancelIcon from "@mui/icons-material/Cancel";

import styles from "./PhotoStep.module.css";
import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";

import FrontArrow from "../../../assets/frontArrow.svg";


// Axios
import axios from "../../../api/axios";

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
  const [Image, setImage] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { getSucessUser } = useAuth();

  const { setUser } = useUser();


  const [loading, setLoading] = useState(false);

  const [userImage, setUserImage] = useState("");

  const [activeStepKYC, setActiveStepKYC] = React.useState(0);



  const allAuthContext = useAuth();
  // Authentication

  // const user = Object.keys(allAuthContext.user).length
  //   > 0 ? allAuthContext.user : '';

  var user = JSON.parse(localStorage.getItem('user'));

  const USER_UPLOAD_URL = "/user/upload-selfie";


  const handleNext = () => {
    setLoading(true);


    

    var formdata = new FormData();
    formdata.append("selfie", Image, Image.name);
    console.log(formdata);
    axios.post(
      USER_UPLOAD_URL,
      formdata,
      {
        headers: {
          Accept: 'application/json',
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        }
      }
    ).then((res) => {
      console.log(res.data.data.user)
      const user = res.data.data.user;

      const token = user.token;

      const newUser = { token, user };
     
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
      console.log(user);
      setActiveStepKYC(activeStepKYC + 2)
      
    }).catch((err) => {
      console.log(err)
    })
      .finally(() => setLoading(false));

    

  }


  const handleImageUploadFront = (e) => {
    if (e.target.files[0].size >= 1000000) {
      console.log(e.target.files[0].size);
      alert("image size is larger than 1MB")
    } else {
      setImage(e.target.files[0]);
      setFrontImage(URL.createObjectURL(e.target.files[0]));
    }


  };

  const onClick = () => {


    props.sendData(2);

  }

  const onClickSuccess = () => {
    props.sendData(2);
  }

  
  

  useEffect(() => {
   
   

    setUserImage(user?.user?.selfieImage);
    
  }, [user, getSucessUser, setUserImage, userImage]);




  return (
    <Box
      p={!isMobile ? 5 : 3}
      bgcolor={theme.palette.background.surface}>
      {userImage === null ? (
        <>
          {activeStepKYC !== 2 && (
            <>
              <Box>
                <Typography
                  className={styles.titleBox}
                  variant="h3"
                  color="secondaryDark"
                  fontWeight={600}

                >
                  Required Image Identification
                </Typography>

                <Typography
                  className={isMobile ? styles.titleBoxMobile : styles.titleBoxA}
                  variant="h3"
                  color="secondaryDark"
                  fontWeight={400}

                >
                  Files uploaded can be either images (PNG OR JPEG) and cannot be larger than 1 MB
                </Typography>
              </Box>


              <Box mt={!isMobile ? 4 : 8}>


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
                            {/* <Typography variant="caption" sx={{ fontSize: "1.2rem", display: "flex", justifyContent: "center" }}>Your ID should look like this </Typography> */}
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
                                <AddPhotoAlternateIcon sx={{ fontSize: "8.5rem" }} />
                                {/* <LazyImageComponent src={IDShow} /> */}
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
                    {loading ? (
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
                          Upload Image <LazyImageComponent src={FrontArrow} />
                        </Button>

                      </>
                    )}
                  </Stack>

                </Box>


              </Box>
            </>
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
               
                  <>
                    <Button
                      onClick={onClick}
                      style={{ height: 60, borderRadius: 10, fontSize: 20, textTransform: 'none' }} variant="contained" color="primary">
                      Continue
                    </Button>

                  </>
              
              </Stack>


            </Box>
          )}
        </>
      ) : (
        <>
          <Box>
            <Typography
              className={styles.titleBox}
              mb={5}
              variant="h3"
              color="secondaryDark"
              fontWeight={600}

            >
              Image Already Uploaded
            </Typography>

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
          </Box>

          <Stack mt={5} >

            <>
              <Button
                onClick={onClickSuccess}
                style={{ height: 60, borderRadius: 10, fontSize: 20, textTransform: 'none' }} variant="contained" color="primary">
                Continue
              </Button>

            </>

          </Stack>
        </>
      )}
    </Box>
  );
};

export default BankStep;
