import { TextField, styled } from "@mui/material";

export const DatePickerTextField = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {
    color: theme.palette.text.primary,
    borderColor: theme.palette.background.default,
    borderRadius: "4px",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "none",
    borderRadius: "4px",
    mt: 1,
  },
  "& .MuiOutlinedInput-root": {
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "5px",
    paddingRight: "1rem",
    borderRadius: "4px",
    "& fieldset": {
      background: "rgba(196, 196, 196, 0.1)",
      borderColor: theme.palette.background.default,
      borderRadius: "4px",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.background.default,
      borderRadius: "4px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(196, 196, 196, 0.1)",
      borderRadius: "4px",
    },
  },
}));
