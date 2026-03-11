import React from "react";
import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  Paper,
  Link,
} from "@mui/material";
import {
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import theme from "../../../theme";

const Confirm = ({
  bookingOptions = {},
  updateBooking,
  selectedProduct = null,
  hasAttemptedSubmit = false,
  getFieldError,
  hasFieldError,
  // New props for reference number validation
  syncStatus = "initial",
  referenceNo = [],
  multimode = "",
}) => {
  const agreeToTerms = bookingOptions.agreeToTerms || true;
  const hasError = hasAttemptedSubmit && hasFieldError("agree");

  // Check if booking has been stored and has reference numbers
  const hasBookingReferences =
    syncStatus === "stored" &&
    (referenceNo?.length > 0 || multimode?.length > 0);
  const isTermsEnabled = hasBookingReferences;

  // console.log('🔍 Confirm component state:', {
  //   syncStatus,
  //   referenceNo,
  //   multimode,
  //   hasBookingReferences,
  //   isTermsEnabled,
  //   agreeToTerms
  // });

  return (
    <Box
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 3,
        border: hasError ? "2px solid #d32f2f" : "1px solid #E0E0E0",
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h5" fontWeight="bold" color="primary.main" mb={3}>
        Terms & Conditions
      </Typography>

      <Paper
        elevation={1}
        sx={{
          p: 3,
          border: agreeToTerms
            ? "2px solid #4caf50"
            : hasError
            ? "2px solid #d32f2f"
            : "1px solid #E0E0E0",
          backgroundColor: agreeToTerms
            ? "#f3f9f3"
            : hasError
            ? "#ffeaea"
            : "#FAFAFA",
          transition: "all 0.3s ease",
        }}
      >
        <Box display="flex" alignItems="flex-start" gap={2}>
          {agreeToTerms ? (
            <CheckIcon color="success" fontSize="large" sx={{ mt: 0.5 }} />
          ) : (
            <WarningIcon
              color={hasError ? "error" : "action"}
              fontSize="large"
              sx={{ mt: 0.5 }}
            />
          )}

          <Box flex={1}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={2}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                color={hasError ? "error" : "inherit"}
              >
                Agreement Required
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={agreeToTerms}
                    disabled={!isTermsEnabled}
                    onChange={(e) => {
                      if (isTermsEnabled) {
                        updateBooking("agreeToTerms", e.target.checked);
                      }
                    }}
                    color="primary"
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#4caf50",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "#4caf50",
                        },
                      "& .MuiSwitch-switchBase.Mui-disabled": {
                        color: !isTermsEnabled ? "#ccc" : undefined,
                      },
                      "& .MuiSwitch-switchBase.Mui-disabled + .MuiSwitch-track":
                        {
                          backgroundColor: !isTermsEnabled
                            ? "#f5f5f5"
                            : undefined,
                        },
                    }}
                  />
                }
                label={
                  !isTermsEnabled
                    ? "Please wait for booking to be saved..."
                    : agreeToTerms
                    ? "Agreed"
                    : "Agree"
                }
                labelPlacement="start"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    color: !isTermsEnabled ? "#999" : "inherit",
                    fontStyle: !isTermsEnabled ? "italic" : "normal",
                  },
                }}
              />
            </Box>

            <Typography
              variant="body2"
              color={!isTermsEnabled ? "#999" : "text.secondary"}
              mb={2}
            >
              I accept the{" "}
              <Link
                href="/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
                color={!isTermsEnabled ? "#ccc" : "primary.main"}
                sx={{
                  textDecoration: "underline",
                  pointerEvents: !isTermsEnabled ? "none" : "auto",
                  cursor: !isTermsEnabled ? "not-allowed" : "pointer",
                }}
              >
                Go Airport Parking LTD Terms & Conditions
              </Link>
              {selectedProduct?.company?.name && (
                <>
                  {" "}
                  and{" "}
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (isTermsEnabled) {
                        // Open product-specific terms modal or link
                        console.log(
                          "Open product terms:",
                          selectedProduct.company.name
                        );
                      }
                    }}
                    color={!isTermsEnabled ? "#ccc" : "primary.main"}
                    sx={{
                      textDecoration: "underline",
                      pointerEvents: !isTermsEnabled ? "none" : "auto",
                      cursor: !isTermsEnabled ? "not-allowed" : "pointer",
                    }}
                  >
                    {selectedProduct.company.name} Terms & Conditions
                  </Link>
                </>
              )}{" "}
              to proceed with the booking.
            </Typography>

            {hasError && (
              <Typography
                variant="body2"
                color="error"
                sx={{
                  mt: 1,
                  p: 1,
                  backgroundColor: "rgba(211, 47, 47, 0.1)",
                  borderRadius: 1,
                  border: "1px solid rgba(211, 47, 47, 0.2)",
                }}
              >
                {getFieldError("agree")}
              </Typography>
            )}

            <Box
              mt={2}
              p={2}
              bgcolor={
                !isTermsEnabled
                  ? "rgba(150, 150, 150, 0.08)"
                  : "rgba(25, 118, 210, 0.08)"
              }
              borderRadius={2}
            >
              <Typography
                variant="body2"
                color={!isTermsEnabled ? "#999" : "text.secondary"}
              >
                <strong>By agreeing, you confirm that:</strong>
                <br />
                • You have read and understood all terms and conditions
                <br />
                • You agree to the booking and cancellation policies
                <br />
                • The information provided is accurate and complete
                <br />• You authorize payment for the services selected
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {!isTermsEnabled && (
        <Box mt={2}>
          <Typography
            variant="body2"
            color="warning.main"
            textAlign="center"
            sx={{
              p: 2,
              backgroundColor: "rgba(255, 193, 7, 0.1)",
              borderRadius: 1,
              border: "1px solid rgba(255, 193, 7, 0.3)",
            }}
          >
            ⏳ Terms and conditions will be enabled once your booking details
            are saved. Please wait...
          </Typography>
        </Box>
      )}

      {isTermsEnabled && !agreeToTerms && !hasError && (
        <Box mt={2}>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Please review and accept the terms and conditions to proceed with
            your booking.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Confirm;
