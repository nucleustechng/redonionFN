import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";

const TextUnderScoreMobile = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 0,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.mode === "light" ? "#fbfbfb" : "#252628",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 0,
    backgroundColor: theme.palette.mode === "light" ? "#F9E006" : "#F9E006",
  },
}));

export const GrowwBar = () => {
  const [progressValue, setProgressValue] = useState(0);

  // For animating the groww linear bar
  useEffect(() => {
    const timer = setInterval(() => {
      setProgressValue((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 100
      );
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [progressValue]);

  return <TextUnderScoreMobile variant="determinate" value={progressValue} />;
};
