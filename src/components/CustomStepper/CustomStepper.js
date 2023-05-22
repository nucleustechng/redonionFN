import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import PropTypes from "prop-types";

// Icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StepperIconPending from "../../assets/stepperIconPending.svg";
import StepperIconEmpty from "../../assets/stepperIconEmpty.svg";
import { IconButton } from "@mui/material";

export const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 30px)",
    right: "calc(50% + 30px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#58BD7D",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#58BD7D",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#58BD7D",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#ffffff",
    zIndex: 1,
    fontSize: 20,
  },
  "& .QontoStepIcon-circle": {
    width: 30,
    height: 30,
    borderRadius: "50%",
    backgroundColor: "#58BD7D",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export function QontoStepIcon(props, onClickBack, onClickNext) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <div className="QontoStepIcon-circle">
          <IconButton>
            <CheckCircleIcon
              color="success"
              className="QontoStepIcon-completedIcon"
            />
          </IconButton>
        </div>
      ) : (
        <IconButton>
          <Typography sx={{ mt: 1 }}>
            {active ? (
              <img src={StepperIconPending} alt="Pending" />
            ) : (
              <img src={StepperIconEmpty} alt="Pending" />
            )}
          </Typography>
        </IconButton>
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};
