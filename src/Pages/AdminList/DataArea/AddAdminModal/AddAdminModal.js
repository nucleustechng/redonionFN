import React, { useState, useEffect } from "react";
import {
  Button,
  Divider,
  IconButton,
  Modal,
  Stack,
  Tooltip,
  Typography,
  Zoom,
  styled,
  Input,
  Select,
  MenuItem,
  Snackbar,
  useMediaQuery,
  Alert
} from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import Close from "@mui/icons-material/Close";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";

// Styles
import styles from "./Admin.module.css";

// Authentication Hook
import useAuth from "../../../../hooks/useAuth";
import { LoadingButton } from "@mui/lab";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

// Axios
import axios from "../../../../api/axios";

// Custom Theme
import { useTheme } from "@mui/material/styles";


import successClock from "../../../../assets/clockSuccess.svg";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../../../../components/LazyImageComponent/LazyImageComponent")
);

// Custom input style
const ImageInput = styled("input")({
  display: "none",
});

const ProfileInfoModal = ({
  open,
  handleOpenSuccessModal,
  profileInformation,
  handleProfileInformationChange,
  handleEdit,
  userAvatar,
  handleImageUpload,
  setUserAvatar,
}) => {
  const theme = useTheme();
  const [userInfo, setUserInfo] = useState({});
  const [isCheck, setIsCheck] = useState(false);
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmed, setShowPasswordConfirmed] = useState(false);

  // Authentication
  const { registerUser, isLoading, authError } = useAuth();

  const [dropdown, setDropdown] = useState(false);

  const [step, setStep] = useState(1);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [value, setValue] = useState("ADMIN");
  const [countryData, setCountryData] = useState([]);
  const [country, setCountry] = useState(1);
  const [countrySplit, setCountrySplit] = useState(""
  );
  const [countryID, setCountryID] = useState("");

  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLName] = useState("");

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [showAuthenticationSnackbar, setShowAuthenticationSnackbar] =
    useState(false);

  const [loading, setLoading] = useState(false);

  // handler for auth progress
  const handleCloseAuthenticationSnackbar = () => {
    setShowAuthenticationSnackbar(false);
  };

  const COUNTRIES_URL = "/user/get-countries";
  const UPDATE_USER_URL = "/admin/register-staff";

  const handleCountrySelection = (e) => {
    var con = e.target.value;
    setCountry(con);
  };

  const handleRoleSelection = (e) => {
    var con = e.target.value;
    setValue(con);
  };


  const handleRegisterUser = () => {
   
    if (email === "" || fname === "" || lname === "") {
      setShowAuthenticationSnackbar(true);
    } else {
      setLoading(true);

      axios
        .post(
          UPDATE_USER_URL,
          JSON.stringify({
            email: email,
            firstName: fname,
            lastName: lname,
            countryId: country,
            roles: [value],
          }),
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);

          setStep(2);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    }
  };

  // Fetching Data
  useEffect(() => {
    axios
      .get(COUNTRIES_URL, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        let data = res.data.data.countries;
        data.sort((a, b) => a.name.localeCompare(b.name));
        setCountryData(data);
      });
  }, []);

  return (
    <Modal
      disableAutoFocus
      disableEnforceFocus
      keepMounted
      open={open}
      onClose={() => {
        setStep(1);
        handleOpenSuccessModal();
      }}
    >
      <Box
        bgcolor="background.paper"
        className={!isMobile ? styles.profileInfoModalBody : ""}
      >
        <Snackbar
          anchorOrigin={
            !isMobile
              ? { vertical: "top", horizontal: "right" }
              : { vertical: "bottom", horizontal: "center" }
          }
          open={showAuthenticationSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseAuthenticationSnackbar}
        >
          <Alert
            action={
              <IconButton
                onClick={handleCloseAuthenticationSnackbar}
                sx={{ mt: -0.5 }}
              >
                <Close sx={{ fontSize: "1.5rem" }} />
              </IconButton>
            }
            icon={<CheckCircleOutline sx={{ fontSize: "1.5rem" }} />}
            sx={!isMobile ? { fontSize: "1rem" } : { width: "100%" }}
            onClose={handleCloseAuthenticationSnackbar}
            severity="error"
          >
            Please fill all details
          </Alert>
        </Snackbar>
        {step === 1 ? (
          <>
            <Box className={styles.modalTopBar}>
              <IconButton color="secondary" onClick={handleOpenSuccessModal}>
                <Tooltip
                  placement="right"
                  TransitionComponent={Zoom}
                  title="Close Modal"
                >
                  <CloseIcon fontSize="medium" />
                </Tooltip>
              </IconButton>
            </Box>

            <center>
              <Box>
                <Typography
                  fontWeight={400}
                  color="primary"
                  fontSize={20}
                  letterSpacing={1}
                >
                  Create a new Admin
                </Typography>
              </Box>
            </center>

            <Box className={styles.profileInfoModalContentBox}>
              <Box mt={4}>
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
                    onChange={(e) => setFname(e.target.value)}
                    variant="outlined"
                    value={fname}
                    size="small"
                    color="secondary"
                    name="fname"
                  />
                </Stack>

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
                    value={lname}
                    variant="outlined"
                    size="small"
                    color="secondary"
                    name="lname"
                    onChange={(e) => setLName(e.target.value)}
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
                    value={email}
                    size="small"
                    color="secondary"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Stack>
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
                      theme.palette.mode === "dark" ? "" : styles.currencyBox
                    }
                    value={country}
                    onChange={handleCountrySelection}
                  >
                    {countryData.map(({ id, name, code, ext, regex }) => (
                      <MenuItem key={id} value={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
                {/* <Stack spacing={1} mb={2}>
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
                      country === user?.country?.id + " " + user?.country?.code
                        ? user?.country?.code.toLowerCase()
                        : countrySplit.toLowerCase()
                    }
                    placeholder="Enter phone number"
                    value={value}
                    disableDropdown={true}
                    onChange={setValue}
                  />
                </Stack> */}

                <Stack spacing={1} mb={2}>
                  <Typography
                    variant="body1"
                    color={theme.palette.text.primary}
                    fontSize={16}
                  >
                    *Role
                  </Typography>
                  <Select
                    // disabled
                    className={
                      theme.palette.mode === "dark" ? "" : styles.currencyBox
                    }
                    value={value}
                    onChange={handleRoleSelection}
                  >
                    <MenuItem key={1} value={"ADMIN"}>
                      ADMIN
                    </MenuItem>
                  </Select>
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
                      Sign Up
                    </LoadingButton>
                  ) : (
                    <>
                      <Button
                        onClick={handleRegisterUser}
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
                        Add Admin
                      </Button>
                    </>
                  )}
                </Stack>
              </Box>
            </Box>
          </>
        ) : (
          <Box pt={4}>
            <center>
              <LazyImageComponent src={successClock} />
            </center>
            <Typography
              variant="h3"
              mt={!isMobile ? 4 : 8}
              className={!isMobile ? styles.titleBox : styles.titleBoxMobile}
              color="secondary"
              fontWeight={500}
            >
              Account created successfully
            </Typography>

            <Typography
              color="secondary"
              variant="caption"
              mt={!isMobile ? 2 : 8}
              mb={2}
              component="p"
              fontSize={16}
              textAlign={"center"}
            >
              You have successfully registered a staff
            </Typography>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default ProfileInfoModal;
