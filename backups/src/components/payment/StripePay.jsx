import React, { useState, useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Box, CircularProgress, Typography, Alert } from "@mui/material";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";


import StripeForm from "./StripeForm";
import { paymentService } from "../../services/apiService";
import apiCall from "../../services/apiService";
import { apiConfig, apiKey } from "../../common/config/api";
import { useBookingSync } from "../../hooks/useBookingSync";
import {
  setStripeClientSecret,
  setStripePaymentIntent,
  setStripeLoading,
  setStripeError,
  setStripeSuccess,
} from "../../redux/slice/paymentSlice";
import { current } from "@reduxjs/toolkit";

// Stripe promise will be loaded dynamically based on site data

const StripePay = ({
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
  onBookingSync, // Function to sync booking and get reference numbers
  multiModeReference, // Multi mode reference number
  referenceNo, // Booking reference numbers
  supplierCost, // Supplier cost for URL
  syncStatus, // Booking sync status from hook
  airport,
}) => {
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [stripePromise, setStripePromise] = useState(null);

  // Stripe appearance configuration
  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#0570de",
      colorBackground: "#ffffff",
      colorText: "#30313d",
      colorDanger: "#df1b41",
      fontFamily: "Inter, system-ui, sans-serif",
      spacingUnit: "4px",
      borderRadius: "6px",
    },
    rules: {
      ".Input": {
        fontSize: "14px",
        padding: "12px",
      },
      ".Tab": {
        fontSize: "14px",
        fontWeight: "500",
      },
      ".Label": {
        fontSize: "13px",
        fontWeight: "500",
        marginBottom: "6px",
      },
    },
  };

  // Stripe elements options
  const options = {
    clientSecret,
    appearance,
    loader: "auto",
  };

  // Create payment intent when component mounts (following reference pattern)
  const intentRef = useRef(false);
  const stripeInitRef = useRef(false);
  // Make currency detection case-insensitive and handle multiple Dublin formats
  // Also handle cases where airport might be undefined or in different formats
  const currency = (airport == "DXB") ? 'AED': airport && ["DUB", "DUBLIN"].includes(airport.toUpperCase()) ? "EUR" : "GBP";
 
  const fetchPaymentIntent = async () => {
    try {
      setIsLoading(true);
      setError("");

      const paymentIntentData = {
        key: apiKey,
        currency: currency,
        amount: correctPricing?.total
          ? parseFloat(correctPricing?.total?.toFixed(2))
          : 0,
        api_tag: selectedProduct?.api_tag || null,
      };
      console.log('currency: ',currency)
      const response = await paymentService.createStripePaymentIntent(
        paymentIntentData
      );

      if (response?.data?.client_secret) {
        setClientSecret(response.data.client_secret);
        setPaymentIntentId(response.data.payment_intent);
      } else {
        // console.log("❌ Payment intent creation failed");
        setClientSecret("");
        setPaymentIntentId("");
        throw new Error(
          response?.message ||
          response?.error ||
          "Failed to create payment intent"
        );
      }
    } catch (error) {
      // console.error("❌ Error creating payment intent:", error);
      setError(
        error.message ||
        "Failed to initialize payment. Please refresh and try again."
      );
      setClientSecret("");
      setPaymentIntentId("");
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize Stripe and create payment intent together to avoid race condition
  useEffect(() => {
    const initializeStripeAndPayment = async () => {
      // Skip if already initialized
      if (stripeInitRef.current) {
        // console.log("🚫 Stripe initialization skipped - already initialized");
        return;
      }

      // Validate prerequisites
      if (!selectedProduct) {
        // console.log("🔍 No selectedProduct available yet");
        // FIX: incorrect return caused infinite loading
        setIsLoading(false);
        setError("Booking details not found. Please try again.");
        return;
      }

      if (!correctPricing?.total || correctPricing.total <= 0) {
        // console.log("⚠️ Invalid total amount:", totalAmount);
        // FIX: incorrect return caused infinite loading
        setIsLoading(false);
        setError("Invalid payment amount. Please contact support.");
        return;
      }

      try {
        // console.log('🚀 Starting Stripe initialization and payment intent creation...');
        stripeInitRef.current = true;
        setIsLoading(true);

        // Step 1: Initialize Stripe
        // console.log('🔍 StripePay: Checking selectedProduct:', selectedProduct);
        // console.log('🔍 StripePay: Has site data:', !!selectedProduct?.site);

        const stripeKey = selectedProduct?.site?.stripe?.key;
        let stripe = null;

        if (stripeKey) {
          stripe = await loadStripe(stripeKey);
        } else {
          // Fallback to environment variable if no key in product data
          const fallbackKey =
            import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
            "pk_test_51QFfkSD7dkOJPl2m5Jsu3Ct1Fc9QsYBTTZejgMnVCuPJJr7RXO7b1CHx1L7Uk7KNhQNKYTzBqLLPCyZqZJrE1wdh007fJGKjRZ";

          if (fallbackKey) {
            stripe = await loadStripe(fallbackKey);
          } else {
            throw new Error(
              "Stripe configuration not found. Please contact support."
            );
          }
        }

        if (!stripe) {
          throw new Error("Failed to initialize Stripe");
        }

        setStripePromise(stripe);

        // Step 2: Create payment intent (only if not already created)
        if (!intentRef.current && correctPricing?.total > 0) {
          console.log("🚀 Creating payment intent...");
          intentRef.current = true;
          await fetchPaymentIntent();
        } else {
          // Ensure loading is false if we didn't fetch intent (though loop above checks price)
          setIsLoading(false);
        }
      } catch (error) {
        console.error("❌ Error during initialization:", error);
        setError(error.message || "Failed to initialize payment system.");
        setIsLoading(false);
        // Reset refs to allow retry
        stripeInitRef.current = false;
        intentRef.current = false;
      }
    };

    initializeStripeAndPayment();
  }, [selectedProduct, correctPricing?.total]);

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
          Preparing Payment
        </Typography>
        <Typography variant="body2" sx={{ color: "#666", textAlign: "center" }}>
          Setting up secure payment processing with Stripe...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        <Typography variant="body2">{error}</Typography>
      </Alert>
    );
  }

  if (!clientSecret || !stripePromise) {
    return (
      <Alert severity="warning" sx={{ mb: 2 }}>
        <Typography variant="body2">
          Payment initialization failed. Please refresh the page and try again.
        </Typography>
      </Alert>
    );
  }

  return (
    <Elements options={options} stripe={stripePromise}>
      <StripeForm
        bookingData={{
          personalData,
          vehicleData,
          bookingOptions,
          selectedProduct,
          searchData,
          paymentIntentId,
        }}
        totalAmount={correctPricing?.total}
        clientSecret={clientSecret}
        onValidate={onValidate}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
        onBookingSync={onBookingSync}
        multiModeReference={multiModeReference}
        referenceNo={referenceNo}
        supplierCost={supplierCost}
        syncStatus={syncStatus}
        bookingOptions={bookingOptions}
      />
    </Elements>
  );
};

export default StripePay;
