import { styled, Tooltip, tooltipClasses } from "@mui/material";

export const CustomToolTip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "transparent",
    color: "inherit",
    width: 25,
    height: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
