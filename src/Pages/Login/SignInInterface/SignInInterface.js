import React, { Suspense, useState } from "react";

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

  // Hooks
  const { logInUser, authError, isLoading } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Fake login creds
  const fakeEmail = "";
  const fakePass = "";

  const handleLoginUser = (e) => {
    e.preventDefault();

    logInUser(
      userEmail ? userEmail : fakeEmail,
      userPass ? userPass : fakePass,
      location,
      navigate
    );
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
              Log in to get started
            </Typography>
            {/* {!isMobile ? (
              <Typography className={styles.textUnderScore}></Typography>
            ) : (
              <Box width={"10%"}>
                <GrowwBar />
              </Box>
            )} */}
            <Box
              component="form"
              onSubmit={handleLoginUser}
              mt={!isMobile ? 4 : 8}
            >
              <Stack spacing={1} mb={2}>
                <Typography variant="body1" fontSize={20} color={theme.palette.text.primary}>
                  Email
                </Typography>
                <Input
                  defaultValue={fakeEmail}
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
                {mailError && (
                  <Typography
                    sx={{
                      textTransform: "capitalize",
                      display: "inline-block",
                    }}
                    my={1}
                    variant="small"
                    color="error"
                  >
                    {mailError}
                  </Typography>
                )}
              </Stack>
              <Stack spacing={1} mb={2}>
                <Typography variant="body1" fontSize={20} color={theme.palette.text.primary}>
                  Password
                </Typography>
                <Input
                  defaultValue={fakePass}
                  error={passError ? true : false}
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
              {authError && (
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    display: "inline-block",
                  }}
                  my={1}
                  variant="small"
                  color="error"
                >
                  {authError.slice(22, -2).split("-").join(" ")}
                </Typography>
              )}
              {passError && (
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    display: "inline-block",
                  }}
                  my={1}
                  variant="small"
                  color="error"
                >
                  {passError}
                </Typography>
              )}
              <Stack
                alignItems="flex-end"
                justifyContent="flex-end"
                spacing={1}
                mb={2}
              >
                <Typography
                  variant="body2"
                  component="span"
                  color="primary"

                  sx={{
                    cursor: "pointer",
                    fontSize: 17,
                    fontWeight: 4500
                  }}
                  onClick={() => navigate("/auth/forgot-pass")}
                >
                  Forgot Password
                </Typography>
              </Stack>
              <Stack mt={5} >
                {isLoading ? (
                  <LoadingButton loading variant="outlined">
                    Login
                  </LoadingButton>
                ) : (
                  <>
                    {/* {theme.palette.mode === "dark" ? ( */}
                    <Button type="submit" style={{ height: 60, borderRadius: 10, fontSize: 20, textTransform: 'none' }} variant="contained" color="primary">
                      Log in  <LazyImageComponent src={FrontArrow} />
                    </Button>
                    {/* ) : ( */}
                    {/* <LightUIButtonPrimary
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Login
                      </LightUIButtonPrimary> */}
                    {/* )} */}
                  </>
                )}
              </Stack>
              {/* <Stack
                mb={4}
                alignItems="center"
                direction="row"
                justifyContent="center"
                spacing={0.2}
              >
                <Typography
                  variant="body2"
                  fontWeight={300}
                  sx={{ textDecoration: "underline" }}
                  color={theme.palette.text.primary}
                >
                  Don't have an account?{" "}
                </Typography>{" "}
                <Typography
                  onClick={() => navigate("/registration/sign-up")}
                  component="span"
                  color="primary"
                  variant="body2"
                  sx={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  Sign Up
                </Typography>
              </Stack> */}
              {/* <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-evenly"
              >
                <Box>
                  <IconButton>
                    <Suspense
                      fallback={
                        <Skeleton
                          animation="wave"
                          variant="circular"
                          width={40}
                          height={40}
                        />
                      }
                    >
                      <LazyImageComponent src={GoogleIcon} />
                    </Suspense>
                  </IconButton>
                </Box>
                <Box>
                  <IconButton>
                    <Suspense
                      fallback={
                        <Skeleton
                          animation="wave"
                          variant="circular"
                          width={40}
                          height={40}
                        />
                      }
                    >
                      <LazyImageComponent src={TwitterIcon} />
                    </Suspense>
                  </IconButton>
                </Box>
                <Box>
                  <IconButton>
                    <Suspense
                      fallback={
                        <Skeleton
                          animation="wave"
                          variant="circular"
                          width={40}
                          height={40}
                        />
                      }
                    >
                      <LazyImageComponent src={FacebookIcon} />
                    </Suspense>
                  </IconButton>
                </Box>
              </Stack> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignInInterface;
