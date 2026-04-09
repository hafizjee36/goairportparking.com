// components/payment/NetworkInternationalForm.jsx
import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Alert,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  Payment as PaymentIcon,
  Security as SecurityIcon,
  CreditCard as CreditCardIcon,
  Lock as LockIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import NetworkInternationalButton from "./NetworkInternationalButton";

const NetworkInternationalForm = ({
  bookingData,
  totalAmount,
  onValidate,
  onPaymentSubmit,
  onPaymentSuccess,
  onPaymentError,
  onBookingSync,
  multiModeReference,
  referenceNo,
  supplierCost,
  syncStatus,
  bookingOptions,
  hasBookingReferences,
  isLoading,
  currency,
  paymentUrl,
  orderData,
}) => {
  const { personalData } = bookingData || {};

  const handleSubmit = async () => {
    try {
      await onPaymentSubmit();
    } catch (error) {
      console.error("Payment submission error:", error);
      toast.error(error.message || "Payment failed", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  // Button disabled conditions
  const isButtonDisabled = 
    isLoading ||
    !personalData?.firstName || 
    !personalData?.lastName || 
    !personalData?.email || 
    !hasBookingReferences;

  const buttonText = () => {
    if (isLoading) {
      return "Processing...";
    }
    return `Pay ${currency} ${totalAmount?.toFixed(2) || "0.00"}`;
  };

  return (
    <Card
      sx={{
        mb: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <CardContent>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 3,
            pb: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              bgcolor: "#1A237E",
              p: 1,
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CreditCardIcon sx={{ color: "white", fontSize: 28 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Network International
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Secure card payment
            </Typography>
          </Box>
        </Box>

        {/* Features */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>
            Why pay with Network International?
          </Typography>
          
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <SecurityIcon sx={{ color: "success.main", fontSize: 20 }} />
              <Typography variant="body2">
                PCI DSS Level 1 certified
              </Typography>
            </Box>
            
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <LockIcon sx={{ color: "success.main", fontSize: 20 }} />
              <Typography variant="body2">
                256-bit SSL encryption
              </Typography>
            </Box>
            
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <PaymentIcon sx={{ color: "success.main", fontSize: 20 }} />
              <Typography variant="body2">
                Accepts all major cards (Visa, MasterCard, AMEX)
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Booking Status */}
          {!hasBookingReferences && (
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">
                Please complete your booking details first. The payment button will become available once your booking is saved.
              </Typography>
            </Alert>
          )}

          {/* Payment Amount Display */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              p: 2,
              bgcolor: "background.default",
              borderRadius: 1,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Total Amount:
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "primary.main" }}>
              {currency} {totalAmount?.toFixed(2) || "0.00"}
            </Typography>
          </Box>

          {/* Payment Button */}
          {/* <Button
            onClick={handleSubmit}
            disabled={isButtonDisabled}
            fullWidth
            variant="contained"
            size="large"
            startIcon={
              isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <PaymentIcon />
              )
            }
            sx={{
              py: 1.5,
              fontSize: "16px",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 2,
              bgcolor: "#1A237E",
              "&:hover": {
                bgcolor: "#283593",
              },
              "&:disabled": {
                bgcolor: "action.disabledBackground",
                color: "action.disabled",
              },
            }}
          >
            {buttonText()}
          </Button> */}

          <NetworkInternationalButton
            bookingData={bookingData}
            amount={totalAmount}
            curr={currency}
            email={personalData?.email}
            firstName={personalData?.firstName}
            lastName={personalData?.lastName}
            bookingReference={referenceNo}
            multiModeReference={multiModeReference}
          />

          {/* Helper Text */}
          <Typography
            variant="caption"
            sx={{
              display: "block",
              textAlign: "center",
              mt: 1.5,
              color: "text.secondary",
            }}
          >
            You will be redirected to Network International's secure payment page
          </Typography>
        </Box>

        {/* Security Info */}
        <Box
          sx={{
            p: 2,
            bgcolor: "background.default",
            borderRadius: 1,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              fontSize: "12px",
              lineHeight: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <LockIcon sx={{ fontSize: 12 }} />
            Your payment details are secured with 256-bit encryption and processed by Network International. We never store your card information.
          </Typography>
        </Box>

        {/* Debug Info (Development only) */}
        {process.env.NODE_ENV === "development" && orderData && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: "grey.100",
              borderRadius: 1,
              border: "1px dashed",
              borderColor: "grey.400",
            }}
          >
            <Typography variant="caption" sx={{ color: "grey.700", fontFamily: "monospace" }}>
              {orderData.orderReference && `Order Ref: ${orderData.orderReference}`}
              <br />
              {paymentUrl && `Payment URL: ${paymentUrl.substring(0, 50)}...`}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default NetworkInternationalForm;