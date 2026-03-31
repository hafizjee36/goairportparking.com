import React, { useState, useEffect, useRef } from "react";
import { Box, CircularProgress, Typography, Alert } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import TrustPaymentForm from "./TrustPaymentForm";
import { paymentService } from "../../services/apiService";
import trustPaymentService from "../../services/trustPaymentService.js";
import {
  setPaymentProcessing,
  setPaymentError,
  setBookingInProgress,
  clearBookingError,
} from "../../redux/slice/paymentSlice";

const TrustPaymentPay = ({
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
  const [localState, setLocalState] = useState("initial");
  const initRef = useRef(false);

  // Currency logic matching other gateways
  const currency = airport == "DXB" ? 'AED' : airport && ["DUB", "DUBLIN"].includes(airport.toUpperCase()) ? "EUR" : "GBP";

  // Minimal initialization (form-based gateway, no intent needed)
  useEffect(() => {
    if (initRef.current) return;
    
    // Validate prerequisites
    if (!selectedProduct || !correctPricing?.total || correctPricing.total <= 0) {
      const err = !selectedProduct 
        ? "Booking details not found" 
        : "Invalid payment amount";
      setError(err);
      setLocalState("error");
      setIsLoading(false);
      return;
    }

    initRef.current = true;
    setIsLoading(false);
    setLocalState("ready");
  }, [selectedProduct, correctPricing]);

  const handlePaymentSubmit = async () => {
    dispatch(clearBookingError());
    const validationResult = onValidate?.() || true;
    if (!validationResult || validationResult.length > 0) {
      toast.error("Please complete all required fields");
      return false;
    }

    try {
      dispatch(setPaymentProcessing(true));
      dispatch(setBookingInProgress(true));
      
      console.log('🔄 TrustPayment: Initializing service...');
      
      // Initialize TrustPayment service (get dynamic siteReference)
      const initData = {
        totalAmount: correctPricing?.total,
        currency,
        bookingReference: multiModeReference,
        email: personalData?.email,
        airport,
      };
      
      const initResult = await trustPaymentService.initializePayment(initData);
      console.log('✅ TrustPayment init result:', initResult);
      
      if (!initResult.success) {
        throw new Error(initResult.error || 'TrustPayment initialization failed');
      }
      
      // Store for form use
      sessionStorage.setItem('trustpayment_init', JSON.stringify(initResult));
      
      // Sync booking before payment (matching other gateways)
      if (onBookingSync) {
        const syncResult = await onBookingSync();
        if (!syncResult?.success) {
          throw new Error(syncResult?.error || "Booking sync failed");
        }
      }

      return true; // Allow form to proceed
    } catch (err) {
      const msg = `TrustPayment init failed: ${err.message}`;
      console.error('❌ TrustPayment error:', err);
      setError(msg);
      dispatch(setPaymentError(msg));
      toast.error(msg);
      return false;
    } finally {
      dispatch(setPaymentProcessing(false));
      dispatch(setBookingInProgress(false));
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: 200, p: 3 }}>
        <CircularProgress size={40} sx={{ mb: 2 }} />
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
          Preparing TrustPayment
        </Typography>
        <Typography variant="body2" sx={{ color: "#666", textAlign: "center" }}>
          Setting up secure payment processing...
        </Typography>
      </Box>
    );
  }

  if (error || localState === "error") {
    return (
      <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
        {error || "Payment setup failed. Please refresh and try again."}
      </Alert>
    );
  }
  console.log

  return (
    <Box>
      <TrustPaymentForm
        bookingData={{
          personalData: personalData || {},
          vehicleData: vehicleData || [],
          bookingOptions: bookingOptions || {},
          selectedProduct: selectedProduct || {},
          searchData: searchData || {},
        }}
        totalAmount={correctPricing?.total}
        currency={currency}
        onValidate={onValidate}
        onPaymentSubmit={handlePaymentSubmit}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
        onBookingSync={onBookingSync}
        multiModeReference={multiModeReference || ''}
        referenceNo={referenceNo || []}
        supplierCost={supplierCost || 0}
        syncStatus={syncStatus || 'initial'}
        airport={airport || ''}
        isLoading={ui.isSubmitting || ui.bookingInProgress || localState === "loading"}
      />
    </Box>
  );
};

export default TrustPaymentPay;

