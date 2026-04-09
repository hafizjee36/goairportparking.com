// components/payment/NetworkInternationalPay.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Alert,
} from "@mui/material";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import NetworkInternationalForm from "./NetworkInternationalForm";
import {
  setPaymentProcessing,
  setPaymentError,
  setBookingInProgress,
  clearBookingError,
} from "../../redux/slice/paymentSlice";

const NetworkInternationalPay = ({
  bookingData,
  personalData,
  vehicleData,
  bookingOptions,
  selectedProduct,
  searchData,
  correctPricing,
  onValidate,
  onPaymentSuccess,
  onPaymentError,
  onBookingSync,
  multiModeReference,
  referenceNo,
  supplierCost,
  syncStatus,
  airport,
}) => {
  const dispatch = useDispatch();
  const { ui } = useSelector((state) => state.payment);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentUrl, setPaymentUrl] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [localState, setLocalState] = useState("initial");

  // Refs to prevent duplicate initialization
  const initRef = useRef(false);

  // Configuration
  const config = {
    currency: airport == "DXB" ? 'AED': airport === "DUB" ? "EUR" : "GBP",
  };

  // Initialize Network International payment
  const initializePayment = async () => {
    try {
      setIsLoading(true);
      setError("");
      setLocalState("loading");

      // Validate prerequisites
      if (!selectedProduct) {
        throw new Error("Booking details not found. Please try again.");
      }

      if (!correctPricing?.total || correctPricing.total <= 0) {
        throw new Error("Invalid payment amount. Please contact support.");
      }

      if (!personalData?.email) {
        throw new Error("Please provide your email address.");
      }

      // Create order data
      const orderPayload = {
        action: "PURCHASE",
        amount: {
          currencyCode: config.currency,
          value: correctPricing.total * 100, // Convert to cents
        },
        emailAddress: personalData.email,
      };

      console.log("🔄 Creating Network International order...", {
        amount: orderPayload.amount,
        currency: orderPayload.amount.currencyCode,
      });

      // Call API to create order
      const response = await paymentService.createNetworkInternationalIntent({
        ...orderPayload,
        productId: selectedProduct.id,
        siteId: selectedProduct.site?.id,
        bookingReferences: referenceNo || multiModeReference,
        personalData,
        vehicleData,
        searchData,
      });

      if (response?.success) {
        console.log("✅ Order created successfully:", response.data);
        
        const { paymentUrl, orderReference, orderId } = response.data;
        
        setOrderData(response.data);
        setPaymentUrl(paymentUrl);
        setLocalState("ready");
        
        // Store order data in session storage
        sessionStorage.setItem("ni_order_data", JSON.stringify({
          orderId,
          orderReference,
          bookingReferences: referenceNo || multiModeReference,
          personalData,
          vehicleData,
          searchData,
          selectedProduct,
          totalAmount: correctPricing.total,
          currency: config.currency,
          timestamp: new Date().toISOString(),
        }));

        return {
          success: true,
          paymentUrl,
          orderId,
          orderReference,
        };
      } else {
        throw new Error(
          response?.error || "Failed to initialize payment. Please try again."
        );
      }
    } catch (error) {
      console.error("❌ Network International initialization error:", error);
      const errorMessage = error.message || "Failed to initialize payment. Please refresh and try again.";
      setError(errorMessage);
      setLocalState("error");
      
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
      
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Handle payment submission from form
  const handlePaymentSubmit = async () => {
    // Clear any previous errors
    setError("");
    dispatch(clearBookingError());

    // Validate form
    if (onValidate) {
      const validationStatus = onValidate();
      if (!validationStatus) {
        toast.error("Please complete all required fields before proceeding.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
    }

    // Validate personal data
    if (!personalData?.email || !personalData?.firstName || !personalData?.lastName) {
      toast.error("Please provide your email, first name, and last name.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      setLocalState("processing");
      dispatch(setPaymentProcessing(true));
      dispatch(setBookingInProgress(true));

      // Initialize payment
      const result = await initializePayment();
      
      if (result.success && result.paymentUrl) {
        // Redirect to payment page
        console.log("🔗 Redirecting to Network International payment page...");
        window.location.assign(result.paymentUrl);
      } else {
        throw new Error(result.error || "Payment initialization failed");
      }
    } catch (error) {
      console.error("💥 Payment submission error:", error);
      setError(error.message || "Payment processing failed. Please try again.");
      setLocalState("error");
      dispatch(setPaymentError(error.message));
      
      toast.error(error.message || "Payment failed", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      dispatch(setPaymentProcessing(false));
      dispatch(setBookingInProgress(false));
    }
  };

  // Initialize on component mount
  useEffect(() => {
    const init = async () => {
      // Skip if already initialized
      if (initRef.current) {
        return;
      }

      // Just set loading to false (no auto-initialization)
      setIsLoading(false);
      initRef.current = true;
    };

    init();
  }, []);

  // Handle payment success
  const handlePaymentSuccess = (result) => {
    if (onPaymentSuccess) {
      onPaymentSuccess(result);
    }
  };

  // Handle payment error
  const handlePaymentError = (error) => {
    if (onPaymentError) {
      onPaymentError(error);
    }
    setError(error.message || error);
  };

  // Check if booking references exist
  const hasBookingReferences = multiModeReference || (referenceNo && referenceNo.length > 0);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 200,
          p: 3,
        }}
      >
        <CircularProgress size={40} sx={{ mb: 2 }} />
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
          Preparing Network International Payment
        </Typography>
        <Typography variant="body2" sx={{ color: "#666", textAlign: "center" }}>
          Setting up secure payment processing...
        </Typography>
      </Box>
    );
  }

  if (error && localState === "error") {
    return (
      <Box>
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          onClose={() => setError("")}
        >
          <Typography variant="body2">{error}</Typography>
        </Alert>
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            Please refresh the page or try again later.
          </Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      {/* Error Display */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          onClose={() => setError("")}
        >
          <Typography variant="body2">{error}</Typography>
        </Alert>
      )}

      {/* Network International Form Component */}
      <NetworkInternationalForm
        bookingData={{
          personalData,
          vehicleData,
          bookingOptions,
          selectedProduct,
          searchData,
        }}
        totalAmount={correctPricing?.total}
        onValidate={onValidate}
        onPaymentSubmit={handlePaymentSubmit}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentError={handlePaymentError}
        onBookingSync={onBookingSync}
        multiModeReference={multiModeReference}
        referenceNo={referenceNo}
        supplierCost={supplierCost}
        syncStatus={syncStatus}
        bookingOptions={bookingOptions}
        hasBookingReferences={hasBookingReferences}
        isLoading={isLoading || ui.isSubmitting || ui.bookingInProgress || localState === "loading" || localState === "processing"}
        currency={config.currency}
        paymentUrl={paymentUrl}
        orderData={orderData}
      />
    </Box>
  );
};

export default NetworkInternationalPay;