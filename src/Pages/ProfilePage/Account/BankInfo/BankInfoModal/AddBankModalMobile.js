import React from "react";
import { Button, Input, Stack, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";

// Styles
import styles from "../../Account.module.css";
import { LightUIButtonPrimary } from "../../../../../Utilities/LightUIButtons";

const AddBankModalMobile = ({
  handleAddBankInformationChange,
  addBankInformation,
  handleSaveNewAddBank,
  handleClose,
}) => {
  const theme = useTheme();

  return (
    <Box
      px={2}
      py={2}
      height={"100%"}
      bgcolor="background.paper"
      className={styles.bankInfoModalBodyMobile}
    >
      <Box className={styles.bankInfoModalContentBoxMobile}>
        {/* Bank Name */}
        <Stack spacing={1} mb={2}>
          <Typography
            variant="body2"
            color={
              theme.palette.mode === "dark" ? "text.secondary" : "common.black"
            }
          >
            Bank Name
          </Typography>
          <Input
            disableUnderline
            className="inputField"
            value={
              addBankInformation.bankName ? addBankInformation.bankName : ""
            }
            name="bankName"
            onChange={handleAddBankInformationChange}
            variant="filled"
            size="small"
            color="secondary"
          />
        </Stack>
        {/* IFSC */}
        <Stack spacing={1} mb={2}>
          <Typography
            variant="body2"
            color={
              theme.palette.mode === "dark" ? "text.secondary" : "common.black"
            }
          >
            IFSC
          </Typography>
          <Input
            disableUnderline
            className="inputField"
            value={
              addBankInformation.bankIFSC ? addBankInformation.bankIFSC : ""
            }
            name="bankIFSC"
            onChange={handleAddBankInformationChange}
            variant="filled"
            size="small"
            color="secondary"
          />
        </Stack>
        {/* Account Holder */}
        <Stack spacing={1} mb={2}>
          <Typography
            variant="body2"
            color={
              theme.palette.mode === "dark" ? "text.secondary" : "common.black"
            }
          >
            Account Holder Name
          </Typography>
          <Input
            disableUnderline
            className="inputField"
            value={
              addBankInformation.bankAccountHolderName
                ? addBankInformation.bankAccountHolderName
                : ""
            }
            name="bankAccountHolderName"
            onChange={handleAddBankInformationChange}
            variant="filled"
            size="small"
            color="secondary"
          />
        </Stack>
      </Box>
      {theme.palette.mode === "dark" ? (
        <Button
          onClick={handleClose}
          color="primary"
          variant="contained"
          fullWidth
        >
          Save
        </Button>
      ) : (
        <LightUIButtonPrimary color="primary" fullWidth>
          Save
        </LightUIButtonPrimary>
      )}
    </Box>
  );
};

export default AddBankModalMobile;
