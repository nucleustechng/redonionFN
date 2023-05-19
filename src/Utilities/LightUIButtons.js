import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const LightUIButtonPrimary = styled(Button)({
  color: "#ffffff",
  border: "none",
  background: "linear-gradient(90deg, #F9E006 0%, #F8931A 100%)",
  boxShadow: "none",
  textTransform: "uppercase",
  "&:hover": {
    boxShadow: "none",
    background: "linear-gradient(90deg, #F9E006 0%, #F8931A 100%)",
  },
  "&:active": {
    boxShadow: "none",
    background: "linear-gradient(90deg, #F9E006 100%, #F8931A 0%)",
  },
  "&:focus": {
    background: "linear-gradient(90deg, #F9E006 0%, #F8931A 100%)",
  },
});

export { LightUIButtonPrimary };
