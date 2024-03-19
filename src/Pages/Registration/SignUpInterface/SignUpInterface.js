import React, { Suspense, useState, useEffect } from "react";

// Material UI
import {
  Button,
  Alert,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Skeleton,
  Stack,
  Typography,
  MenuItem,
  Select,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

// Custom Theme
import { useTheme } from "@mui/material/styles";



// CSS Module
import styles from "./SignUpInterface.module.css";

// Router
import { useNavigate } from "react-router-dom";

// Logo
import MainVectorLogo from "../../../assets/mainLogo.svg";

// Illustration
import SignUpImageDark from "../../../assets/authenticationImages/signUpDark.svg";
import SignUpImageLight from "../../../assets/authenticationImages/SignUpLight.svg";

// Loader Component
import ComponentLoader from "../../../components/ProgressLoader/ComponentLoader";

// Authentication Hook
import useAuth from "../../../hooks/useAuth";
import { LoadingButton } from "@mui/lab";

// Axios
import axios from "../../../api/axios";


// MainLogo
import MainLogo from "../../../assets/mainLogoDark.svg";
import Handburger from "../../../assets/handburger.svg";
import Close from "../../../assets/close.svg";

import bg from "../../../assets/authBg.svg";

import MainLogoDark from "../../../assets/mainLogo.svg";
import HandburgerDark from "../../../assets/handburgerDark.svg";
import CloseDark from "../../../assets/closeDark.svg";

import Back from "../../../assets/backArrow.svg";
import FrontArrow from "../../../assets/frontArrow.svg";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../../components/LazyImageComponent/LazyImageComponent")
);

const SignUpInterface = () => {
  // States
  const [userInfo, setUserInfo] = useState({});
  const [isCheck, setIsCheck] = useState(false);
  const [formError, setFormError] = useState("");
  const [formError1, setFormError1] = useState("");
  const [formError2, setFormError2] = useState("");
  const [formError3, setFormError3] = useState("");
  const [formError4, setFormError4] = useState("");
  const [formError5, setFormError5] = useState("");
  const [formError6, setFormError6] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmed, setShowPasswordConfirmed] = useState(false);

  // Authentication
  const { registerUser, isLoading, authError } = useAuth();

  const [dropdown, setDropdown] = useState(false);

  const [value, setValue] = useState("")

  const [countryData, setCountryData] = useState([]);
  const [country, setCountry] = useState("1 US");
  const [countrySplit, setCountrySplit] = useState("1 US");
  const [countryID, setCountryID] = useState("1");

  const COUNTRIES_URL = "/user/get-countries";


  // Fetching Data
  useEffect(() => {
    axios.get(
      COUNTRIES_URL,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then((res) => {
      let data = res.data.data.countries;
      data.sort((a, b) => a.name.localeCompare(b.name));
      setCountryData(data);
    });

  }, []);

  const handleCountrySelection = (e) => {
    var con = e.target.value;
    setCountry(con);
    setCountryID(con.split(' ')[0]);
    setCountrySplit(con.split(' ')[1]);
  };



  // Theme
  const theme = useTheme();
  // Breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // Router
  const navigate = useNavigate();

  const handleUserInfo = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    const newUserInfo = { ...userInfo };
    newUserInfo[field] = value;
    setUserInfo(newUserInfo);
  };

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

  const handleRegisterUser = (e) => {
    e.preventDefault();
    setFormError("");
    setFormError1("");
    setFormError2("");
    setFormError3("");
    setFormError4("");
    setFormError5("");
    setFormError6("");

    
    if (!userInfo.fname) {
      setFormError("Please provide your First Name");
    } else if (!userInfo.lname) {
      setFormError1("Please provide your Last Name");
    } else if (!userInfo.email) {
      setFormError2("Please provide your Email Address");
    } else if (countryID === "") {
      setFormError3("Please select a country");
    } else if (value === "") {
      setFormError4("Please enter a phone number");
    } else if (!userInfo.password) {
      setFormError5("Please create a Password");
    } else if (userInfo.password.length < 8) {
      setFormError5("Password must be longer than or equal to 8 characters");
    } else if (!passwordRegex.test(userInfo.password)){
      setFormError5("Password must contain atleast one uppercase letter, one lowercase letter, a number and a special character!");
    } else if (userInfo.password !== userInfo.confirmPassword) {
      setFormError6("Your Password and Confirmation do not match");
    } else {
     
      registerUser(userInfo.fname, userInfo.mname, userInfo.lname, userInfo.email, 
        countryID, "+" + value, userInfo.confirmPassword,userInfo.referralCode, navigate);
    }
  };

  return (
    <React.Fragment>
      {/* {!isMobile && ( */}
      <Box
        bgcolor={theme.palette.background.default}
        className={styles.mainBox}
        style={{
          backgroundImage: `url(${isMobile ? bg : bg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
        }}
      >
        <Stack
          pt={isMobile ? 0 : 3}
          pl={isMobile ? 1 : 15}
          pr={isMobile ? 1 : 20}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className={styles.topBox}
        >
          <Box>
            <Suspense
              fallback={<Skeleton variant="circular" height={30} width={110} />}
            >
              <a href="/">
                <LazyImageComponent
                  className={styles.logo}
                  src={
                    theme.palette.mode === "dark" ? MainLogoDark : MainLogoDark
                  }
                />
              </a>
            </Suspense>
          </Box>
          {isMobile ? (
            <Box mt={2}>
              <Button onClick={() => setDropdown(!dropdown)}>
                <LazyImageComponent
                  className={styles.logo}
                  src={dropdown ? CloseDark : HandburgerDark}
                />
              </Button>
              {dropdown && (
                <Box
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    background: "#000",
                    padding: 30,
                    zIndex: 9999,
                  }}
                >
                  <center>
                    <Box>
                      <Button fullWidth variant="contained" color="primary">
                        <Typography
                          fontSize={16}
                          variant="caption"
                          p={0.3}
                          color="background.light"
                        >
                          <a
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                              textTransform: "none",
                            }}
                            href="/auth/sign-in"
                          >
                            Log in
                          </a>
                        </Typography>
                      </Button>
                    </Box>
                  </center>
                </Box>
              )}
            </Box>
          ) : (
            <Stack direction="row" justifyContent="space-evenly">
              <Box>
                <Button fullWidth variant="contained" color="primary">
                  <Typography
                    variant="caption"
                    p={0.3}
                    color="background.light"
                  >
                    <a
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        textTransform: "none",
                        fontSize: 15,
                        fontWeight: 500,
                      }}
                      href="/auth/sign-in"
                    >
                      Log in
                    </a>
                  </Typography>
                </Button>
              </Box>
            </Stack>
          )}
        </Stack>
        <Grid columns={{ xs: 12, md: 12 }} mt={!isMobile ? -6 : 0}>
          <Grid item xs={12} md={12}>
            <Box className={styles.registerBox}>
              {/* Form Section */}
              <Box
                className={!isMobile ? styles.contentBox : ""}
                borderRadius="10px"
                bgcolor={!isMobile ? theme.palette.background.paper : "#111"}
              >
                <Box p={5}>
                  {/* <Button
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      textTransform: "none",
                      marginLeft: "-20px",
                      marginTop: "0",
                      marginBottom: "25px",
                    }}
                    color="secondary"
                  >
                    <a href="/">
                      <LazyImageComponent src={Back} />
                    </a>
                  </Button> */}
                  <Typography
                    mt={isMobile ? 0 : 3}
                    className={styles.titleBox}
                    variant="h3"
                    color="secondary"
                    fontWeight={500}
                  >
                    Create an Account <br />
                    to Get Started
                  </Typography>

                  {authError && (
                    <Box mt={3} mb={-3}>
                      <Alert sx={{ fontSize: "1rem" }} severity="error">
                        {authError}
                      </Alert>
                    </Box>
                  )}
                  {/* <Typography className={styles.textUnderScore}></Typography> */}
                  <Box component="form" onSubmit={handleRegisterUser} mt={4}>
                    <Stack spacing={1} mb={2}>
                      <Typography
                        variant="body1"
                        color={theme.palette.text.primary}
                        fontSize={16}
                      >
                        *First Name
                      </Typography>
                      <Input
                        disableUnderline
                        className="inputField"
                        type="text"
                        variant="outlined"
                        size="small"
                        color="secondary"
                        name="fname"
                        onChange={handleUserInfo}
                      />
                    </Stack>
                    <Box mx={0.5} mb={2}>
                      <Typography
                        my={1}
                        fontSize={16}
                        variant="small"
                        color="error"
                      >
                        {formError}
                      </Typography>
                    </Box>

                    <Stack spacing={1} mb={2}>
                      <Typography
                        variant="body1"
                        color={theme.palette.text.primary}
                        fontSize={16}
                      >
                        *Last Name
                      </Typography>
                      <Input
                        disableUnderline
                        className="inputField"
                        type="text"
                        variant="outlined"
                        size="small"
                        color="secondary"
                        name="lname"
                        onChange={handleUserInfo}
                      />
                    </Stack>
                    <Box mx={0.5} mb={2}>
                      <Typography
                        my={1}
                        fontSize={16}
                        variant="small"
                        color="error"
                      >
                        {formError1}
                      </Typography>
                    </Box>

                    <Stack spacing={1} mb={2}>
                      <Typography
                        variant="body1"
                        color={theme.palette.text.primary}
                        fontSize={16}
                      >
                        Middle Name
                      </Typography>
                      <Input
                        disableUnderline
                        className="inputField"
                        type="text"
                        variant="outlined"
                        size="small"
                        color="secondary"
                        name="mname"
                        onChange={handleUserInfo}
                      />
                    </Stack>
                    <Stack spacing={1} mb={2}>
                      <Typography
                        variant="body1"
                        color={theme.palette.text.primary}
                        fontSize={16}
                      >
                        *Email
                      </Typography>
                      <Input
                        disableUnderline
                        className="inputField"
                        type="email"
                        placeholder="joe@gmail.com"
                        variant="outlined"
                        size="small"
                        color="secondary"
                        name="email"
                        onChange={handleUserInfo}
                      />
                    </Stack>
                    <Box mx={0.5} mb={2}>
                      <Typography
                        my={1}
                        fontSize={16}
                        variant="small"
                        color="error"
                      >
                        {formError2}
                      </Typography>
                    </Box>
                    <Stack spacing={1} mb={2}>
                      <Typography
                        variant="body1"
                        color={theme.palette.text.primary}
                        fontSize={16}
                      >
                        *Country
                      </Typography>
                      <Select
                        className={
                          theme.palette.mode === "dark"
                            ? ""
                            : styles.currencyBox
                        }
                        value={country}
                        onChange={handleCountrySelection}
                      >
                        {countryData.map(({ id, name, code, ext, regex }) => (
                          <MenuItem key={id} value={id + " " + code}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Stack>
                    <Box mx={0.5} mb={2}>
                      <Typography
                        my={1}
                        fontSize={16}
                        variant="small"
                        color="error"
                      >
                        {formError3}
                      </Typography>
                    </Box>
                    <Stack spacing={1} mb={2}>
                      <Typography
                        variant="body1"
                        color={theme.palette.text.primary}
                        fontSize={16}
                      >
                        *Phone Number
                      </Typography>
                      <PhoneInput
                        inputStyle={{
                          width: "100%",
                          height: 53,
                          fontSize: 16,
                          background: "#f3f3f3",
                          border: 0,
                        }}
                        country={
                          country === "1 US" ? "us" : countrySplit.toLowerCase()
                        }
                        placeholder="Enter phone number"
                        value={value}
                        disableDropdown={true}
                        onChange={setValue}
                      />
                    </Stack>
                    <Box mx={0.5} mb={2}>
                      <Typography
                        my={1}
                        fontSize={16}
                        variant="small"
                        color="error"
                      >
                        {formError4}
                      </Typography>
                    </Box>
                    <Stack spacing={1} mb={2}>
                      <Typography
                        color={theme.palette.text.primary}
                        variant="body1"
                        fontSize={16}
                      >
                        *Password
                      </Typography>
                      <Input
                        disableUnderline
                        className="inputField"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        size="small"
                        color="secondary"
                        name="password"
                        onChange={handleUserInfo}
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
                      <Box mx={0.5} mb={2}>
                        <Typography
                          my={1}
                          fontSize={16}
                          variant="small"
                          color="error"
                        >
                          {formError5}
                        </Typography>
                      </Box>
                      {/* <Typography
                        color={theme.palette.text.primary}
                        variant="body1"
                        fontSize={15}
                      >
                        Your Password must be at least eight characters long and
                        must contain a mix of letters, numbers and special
                        characters
                      </Typography> */}
                    </Stack>
                    <Stack spacing={1} mb={2}>
                      <Typography
                        color={theme.palette.text.primary}
                        variant="body1"
                        fontSize={16}
                      >
                        *Confirm Password
                      </Typography>
                      <Input
                        disableUnderline
                        className="inputField"
                        type={showPasswordConfirmed ? "text" : "password"}
                        variant="outlined"
                        size="small"
                        color="secondary"
                        name="confirmPassword"
                        onChange={handleUserInfo}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowPasswordConfirmed(!showPasswordConfirmed)
                              }
                            >
                              {!showPasswordConfirmed ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <Box mx={0.5} mb={2}>
                        <Typography
                          my={1}
                          fontSize={16}
                          variant="small"
                          color="error"
                        >
                          {formError6}
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack spacing={1} mb={2}>
                      <Typography
                        color={theme.palette.text.primary}
                        variant="body1"
                        fontSize={16}
                      >
                        Referral code
                      </Typography>
                      <Input
                        disableUnderline
                        className="inputField"
                        variant="outlined"
                        type="text"
                        size="small"
                        color="secondary"
                        name="referralCode"
                        onChange={handleUserInfo}
                      />
                      
                    </Stack>
                    {/* <Stack spacing={1} mb={2}>
                        <Typography
                          color={theme.palette.text.primary}
                          variant="body1"
                        >
                          Referral Code
                        </Typography>
                        <Input
                          disableUnderline
                          className="inputField"
                          type="text"
                          variant="outlined"
                          size="small"
                          color="secondary"
                          name="referralCode"
                        />
                      </Stack> */}
                    {/* <Stack direction="row" alignItems="center" mb={1}>
                        <Checkbox
                          onChange={() => setIsCheck(!isCheck)}
                          sx={{ ml: -1.5 }}
                        />
                        <Typography
                          color={theme.palette.text.primary}
                          variant="body2"
                          fontWeight={300}
                        >
                          I agree to Terms & conditions of Thrifty Wallet
                        </Typography>
                      </Stack> */}
                    <Stack mt={4} mb={2}>
                      {isLoading ? (
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
                          Sign Up
                        </LoadingButton>
                      ) : (
                        <>
                          <Button
                            // className={styles.userButton}
                            style={{
                              height: 60,
                              borderRadius: 10,
                              fontSize: 20,
                              textTransform: "none",
                            }}
                            type="submit"
                            variant="contained"
                            color="primary"
                          >
                            Continue <LazyImageComponent src={FrontArrow} />
                          </Button>
                        </>
                      )}
                    </Stack>
                    <Stack mb={0} mt={2} alignItems="center">
                      <center>
                        <Typography
                          color={theme.palette.text.primary}
                          variant="body2"
                          fontWeight={400}
                          fontSize={20}
                          // sx={{ textDecoration: "underline" }}
                        >
                          By clicking continue, you agree to Red Onion's
                          <Typography
                            color={theme.palette.text.primary}
                            variant="body2"
                            fontWeight={400}
                            fontSize={20}
                            // sx={{ textDecoration: "underline" }}
                          >
                            <Typography
                              component="span"
                              color="primary"
                              variant="body2"
                              fontWeight={400}
                              fontSize={20}
                              sx={{ cursor: "pointer" }}
                              onClick={() => navigate("/auth/sign-in")}
                            >
                              Terms of Service
                            </Typography>{" "}
                            and{" "}
                            <Typography
                              component="span"
                              color="primary"
                              variant="body2"
                              fontWeight={400}
                              fontSize={20}
                              sx={{ cursor: "pointer" }}
                              onClick={() => navigate("/auth/sign-in")}
                            >
                              Privacy Policy
                            </Typography>
                          </Typography>
                        </Typography>
                      </center>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* )} */}
      {/* {isMobile && ( */}

      {/* )} */}
    </React.Fragment>
  );
};

export default SignUpInterface;
