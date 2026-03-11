import React from "react";
import { Box, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import theme from "../../theme";

const CustomStepper = ({
  totalSteps = 3,
  activeStep = 1,
  steps = ["Details", "Results", "Payment"],
}) => {
  const getStepStatus = (stepIndex) => {
    if (stepIndex < activeStep) return "completed";
    if (stepIndex === activeStep) return "active";
    return "inactive";
  };

  const getStepStyles = (status) => {
    switch (status) {
      case "completed":
        return {
          backgroundColor: "#ffffff",
          color: theme.palette.primary.main,
          border: `1px solid ${theme.palette.primary.main}`,
          width: 52,
          height: 52,
          fontSize: "14px",
        };
      case "active":
        return {
          backgroundColor: theme.palette.primary.main,
          color: "white",
          border: `1px solid ${theme.palette.primary.main}`,
          width: 42,
          height: 42,
          fontSize: "14px",
          fontWeight: "600",
        };
      default:
        return {
          backgroundColor: "transparent",
          color: "#999",
          border: "1px solid #e0e0e0",
          width: 52,
          height: 52,
          fontSize: "134x",
        };
    }
  };

  const getConnectorStyles = () => {
    return {
      backgroundColor: "black",
      height: "1px",
      flex: 1,
      margin: "0 12px",
    };
  };

  const getLabelStyles = (status) => ({
    fontSize:
      status === "completed" ? "15px" : status === "active" ? "13px" : "14px",
    fontWeight: status === "active" ? "600" : "500",
    color:
      status === "active"
        ? "black"
        : status === "completed"
        ? theme.palette.primary.main
        : "#999",
    textAlign: "center",
    transition: "all 0.3s ease",
    marginTop: "8px",
  });

  return (
    <Box sx={{ width: "100%"  }}>
      {/* Circles + Connectors py: 3 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        {Array.from({ length: totalSteps }, (_, index) => {
          const status = getStepStatus(index);
          const stepStyles = getStepStyles(status);

          return (
            <React.Fragment key={index}>
              {/* Circle */}
              <Box
                sx={{
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  ...stepStyles,
                }}
              >
                {status === "completed" ? (
                  <CheckIcon
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: theme.palette.primary.main,
                    }}
                  />
                ) : (
                  String(index + 1).padStart(2, "0")
                )}
              </Box>

              {/* Connector */}
              {index < totalSteps - 1 && (
                <Box sx={getConnectorStyles(index + 1)} />
              )}
            </React.Fragment>
          );
        })}
      </Box>

      {/* Labels */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        {Array.from({ length: totalSteps }, (_, index) => {
          const status = getStepStatus(index);
          return (
            <Typography key={index} variant="body2" sx={getLabelStyles(status)}>
              {steps[index] || `Step ${index + 1}`}
            </Typography>
          );
        })}
      </Box>
    </Box>
  );
};

export default CustomStepper;
