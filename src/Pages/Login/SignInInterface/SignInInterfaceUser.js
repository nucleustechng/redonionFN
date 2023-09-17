import React, { Suspense, useEffect, useState } from "react";

// Material UI
import {
  Button,
  IconButton,
  Input,
  InputAdornment,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LightUIButtonPrimary } from "../../../Utilities/LightUIButtons";

// Custom Theme
import { useTheme } from "@mui/material/styles";



// CSS Module
import styles from "./SignInInterface.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { LoadingButton } from "@mui/lab";
import { GrowwBar } from "../../../components/GrowwBar/GrowwBar";

import Back from "../../../assets/backArrow.svg";
import FrontArrow from "../../../assets/frontArrow.svg";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const SignInInterface = () => {
  // State
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [mailError, setMailError] = useState("");
  const [passError, setPassError] = useState("");

  const [formError, setFormError] = useState("");

  // Hooks
  const { logInUser, authError, isLoading } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [user, setUser] = useState("");

  useEffect(() => {
    var userInfo = JSON.parse(localStorage.getItem('user'));
    setUser(userInfo);
    setUserEmail(userInfo.user.email);
   
  },[])



  const handleLoginUser = (e) => {
    e.preventDefault();
    if (userEmail === "") {
      setFormError("Please enter an email");
    } else if (userPass === "") {
      setFormError("Please enter a password");
    } else {
      setFormError("");
      logInUser(
        userEmail,
        userPass,
        location,
        navigate
      );
    }


  };

  return (
    <Box
      className={!isMobile ? styles.mainBox : styles.mainBoxMobile}
    >
      <Box
        className={!isMobile ? styles.registerBox : styles.registerBoxMobile}
      >
        {/* Form Section */}
        <Box
        
          className={!isMobile ? styles.contentBox : ""}
          sx={!isMobile ? { borderRadius: "10px" } : {}}
        >

          <Box
            bgcolor={theme.palette.background.paper}
            p={!isMobile ? 5 : 3}
            borderRadius="10px"
          >
            <Button
              style={{ textDecoration: "none", color: "inherit", textTransform: "none", marginLeft: "-20px", marginTop: "0", marginBottom: "25px" }}

              color="secondary">
              <a
                href="/"
              >
                <LazyImageComponent src={Back} />
              </a>

            </Button>
            <Typography
              className={!isMobile ? styles.titleBox : styles.titleBox}
              variant="h3"
              color="secondary"
              fontWeight={500}

            >
              Welcome back, {user?.user?.firstName}
            </Typography>

            <Typography
            mt={1}
              className={!isMobile ? styles.titleBox : styles.titleBox}
              variant="h3"
              color="secondary"
              fontWeight={500}

            >
              Sign in into your Account
            </Typography>

            <Box
              component="form"
              onSubmit={handleLoginUser}
              mt={!isMobile ? 4 : 8}
            >
              {/* <Stack spacing={1} mb={2}>
                <Typography variant="body1" fontSize={20} color={theme.palette.text.primary}>
                  Email
                </Typography>
                <Input
                  // defaultValue={fakeEmail}
                  error={mailError ? true : false}
                  disableUnderline
                  className="inputField"
                  placeholder="joe@gmail.com"
                  type="email"
                  variant="outlined"
                  size="small"
                  color="secondary"
                  name="email"

                  onChange={(e) => setUserEmail(e.target.value)}
                />

              </Stack> */}
              <Stack spacing={1} mb={2}>
                <Typography variant="body1" fontSize={20} color={theme.palette.text.primary}>
                  Password
                </Typography>
                <Input
                  // defaultValue={fakePass}
                  // error={passError ? true : false}
                  disableUnderline
                  className="inputField"
                  type={showPassword ? "text" : "password"}
                  variant="filled"
                  size="small"
                  color="secondary"
                  name="password"
                  onChange={(e) => setUserPass(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {!showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Stack>
              <Typography
                sx={{
                  textTransform: "capitalize",
                  display: "inline-block",
                }}
                my={1}
                textAlign={"center"}
                fontSize={20}
                variant="small"
                color="error"
              >
                {formError}
              </Typography>
              {authError && (
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    display: "inline-block",
                  }}
                  my={1}
                  variant="small"
                  color="error"
                  textAlign={"center"}
                  fontSize={20}
                >
                  {authError}
                </Typography>
              )}



            
              <Stack mt={0} >
                {isLoading ? (
                  <LoadingButton loading variant="outlined">
                    Login
                  </LoadingButton>
                ) : (
                  <>
                    {/* {theme.palette.mode === "dark" ? ( */}
                    <Button
                      type="submit"
                      style={{ height: 60, borderRadius: 10, fontSize: 20, textTransform: 'none' }} variant="contained" color="primary">
                      Sign in  <LazyImageComponent src={FrontArrow} />
                    </Button>
                    
                  </>
                )}
              </Stack>

              <Stack
              mt={5}
                alignItems="center"
                justifyContent="center"
                spacing={1}
                mb={2}
              >
                <Typography
                  variant="body2"
                  component="span"
                  color="primary"

                  sx={{
                    cursor: "pointer",
                    fontSize: 20,
                    fontWeight: 4500
                  }}
                  onClick={() => navigate("/auth/sign-in")}
                >
                  Not  {user?.user?.firstName}? Log in
                </Typography>
              </Stack>

              <Stack
                mt={3}
                alignItems="center"
                justifyContent="center"
                spacing={1}
                mb={2}
              >
                <Typography
                  variant="body2"
                  component="span"
                  color="primary"

                  sx={{
                    cursor: "pointer",
                    fontSize: 20,
                    fontWeight: 4500
                  }}
                  onClick={() => navigate("/registration/sign-up")}
                >
                 Don't have the account? Sign up
                </Typography>
              </Stack>
            
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignInInterface;
