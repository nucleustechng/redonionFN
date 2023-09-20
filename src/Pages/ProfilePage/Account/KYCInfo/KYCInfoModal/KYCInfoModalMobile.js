import React from "react";
import { Button, Input, Stack, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";

// Styles
import styles from "../../Account.module.css";
import { LightUIButtonPrimary } from "../../../../../Utilities/LightUIButtons";

const KYCInfoModalMobile = ({
  KYCInformation,
  handleKYCInformationChange,
  handleEdit,
}) => {
  const theme = useTheme();

  return (
    <Box
      px={2}
      py={2}
      height={"100%"}
      bgcolor="background.paper"
      className={styles.KYCInfoModalBodyMobile}
    >
      <Box className={styles.KYCInfoModalContentBox}>
        {/* Full Name */}
        <Stack spacing={1} mb={2}>
          <Typography
            variant="body2"
            color={
              theme.palette.mode === "dark" ? "text.secondary" : "common.black"
            }
          >
            Full Name
          </Typography>
          <Input
            disableUnderline
            className="inputField"
            value={KYCInformation.fullName ? KYCInformation.fullName : ""}
            name="fullName"
            onChange={handleKYCInformationChange}
            variant="filled"
            size="small"
            color="secondary"
          />
        </Stack>
        {/* Address */}
        <Stack spacing={1} mb={2}>
          <Typography
            variant="body2"
            color={
              theme.palette.mode === "dark" ? "text.secondary" : "common.black"
            }
          >
            Address
          </Typography>
          <Input
            disableUnderline
            className="inputField"
            value={KYCInformation.address ? KYCInformation.address : ""}
            name="address"
            onChange={handleKYCInformationChange}
            variant="filled"
            size="small"
            color="secondary"
          />
        </Stack>
        {/* Adhar Card */}
        <Stack spacing={1} mb={2}>
          <Typography
            variant="body2"
            color={
              theme.palette.mode === "dark" ? "text.secondary" : "common.black"
            }
          >
            Adhar Card
          </Typography>
          <Input
            disableUnderline
            className="inputField"
            value={
              KYCInformation.adharCardNumber
                ? KYCInformation.adharCardNumber
                : ""
            }
            name="adharCardNumber"
            onChange={handleKYCInformationChange}
            variant="filled"
            size="small"
            color="secondary"
            type="number"
          />
        </Stack>
      </Box>
      {theme.palette.mode === "dark" ? (
        <Button
          onClick={handleEdit}
          color="primary"
          variant="contained"
          fullWidth
        >
          Save
        </Button>
      ) : (
        <LightUIButtonPrimary onClick={handleEdit} color="primary" fullWidth>
          Save
        </LightUIButtonPrimary>
      )}
    </Box>
  );
};

export default KYCInfoModalMobile;
