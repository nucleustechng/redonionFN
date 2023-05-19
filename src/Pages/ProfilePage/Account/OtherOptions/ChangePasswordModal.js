import React, { useState } from "react";
import {
  Divider,
  Zoom,
  IconButton,
  Modal,
  Tooltip,
  Typography,
  Button,
  Stack,
  InputAdornment,
  Input,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LightUIButtonPrimary } from "../../../../Utilities/LightUIButtons";

// Styles
import styles from "../Account.module.css";

// Logout authentication
import useAuth from "../../../../hooks/useAuth";

const ChangePasswordModal = ({ open, handleClose }) => {
  const [userPassword, setUserPassword] = useState({});
  const [passError, setPassError] = useState("");
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [showPasswordConfirmed, setShowPasswordConfirmed] = useState(false);

  const { logOut } = useAuth();
  const theme = useTheme();

  const handleChangePassword = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    const newUserPassword = { ...userPassword };
    newUserPassword[field] = value;
    setUserPassword(newUserPassword);
  };

  const handleSubmitUserPassword = (e) => {
    e.preventDefault();

    if (userPassword.passwordNew !== userPassword.passwordNewConfirmed) {
      setPassError("Password doesn't match!");
    } else if (!userPassword.passwordNew) {
      setPassError("You can't save unless you enter a new password");
    } else {
      setPassError("");
      setUserPassword({});
      handleClose();
      logOut();
    }
  };

  return (
    <Modal
      disableAutoFocus
      disableEnforceFocus
      keepMounted
      open={open}
      onClose={handleClose}
    >
      <Box
        bgcolor="background.paper"
        className={styles.changePasswordModalBody}
      >
        <Box className={styles.modalTopBar}>
          <Typography variant="h6" component="h2">
            Change Password
          </Typography>
          <IconButton color="secondary" onClick={handleClose}>
            <Tooltip
              placement="right"
              TransitionComponent={Zoom}
              title="Close Modal"
            >
              <CloseIcon fontSize="medium" />
            </Tooltip>
          </IconButton>
        </Box>
        <Divider />
        <Box
          component="form"
          onSubmit={handleSubmitUserPassword}
          className={styles.changePasswordModalContentBox}
        >
          <Stack spacing={1} mb={2}>
            <Typography
              variant="body2"
              color={
                theme.palette.mode === "dark"
                  ? "text.secondary"
                  : "common.black"
              }
            >
              Current Password
            </Typography>
            <Input
              disableUnderline
              className={styles.inputField}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPasswordCurrent(!showPasswordCurrent)}
                  >
                    {showPasswordCurrent ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              name="passwordOld"
              onChange={handleChangePassword}
              type={showPasswordCurrent ? "text" : "password"}
              variant="filled"
              color="secondary"
              size="small"
            />
          </Stack>
          <Stack spacing={1} mb={2}>
            <Typography
              variant="body2"
              color={
                theme.palette.mode === "dark"
                  ? "text.secondary"
                  : "common.black"
              }
            >
              New Password
            </Typography>
            <Input
              disableUnderline
              className={styles.inputField}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPasswordNew(!showPasswordNew)}
                  >
                    {showPasswordNew ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              name="passwordNew"
              onChange={handleChangePassword}
              type={showPasswordNew ? "text" : "password"}
              variant="outlined"
              color="secondary"
              size="small"
            />
          </Stack>
          <Stack spacing={1} mb={2}>
            <Typography
              variant="body2"
              color={
                theme.palette.mode === "dark"
                  ? "text.secondary"
                  : "common.black"
              }
            >
              Confirm Password
            </Typography>
            <Input
              disableUnderline
              className={styles.inputField}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowPasswordConfirmed(!showPasswordConfirmed)
                    }
                  >
                    {showPasswordConfirmed ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              error={passError ? true : false}
              name="passwordNewConfirmed"
              onChange={handleChangePassword}
              type={showPasswordConfirmed ? "text" : "password"}
              variant="outlined"
              color="secondary"
              size="small"
            />
            <Typography variant="caption" color="error">
              {passError && passError}
            </Typography>
          </Stack>
          {theme.palette.mode === "dark" ? (
            <Button type="submit" color="primary" variant="contained" fullWidth>
              Save
            </Button>
          ) : (
            <LightUIButtonPrimary type="submit" fullWidth>
              Save
            </LightUIButtonPrimary>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default ChangePasswordModal;
