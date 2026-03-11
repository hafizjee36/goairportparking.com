import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Grid, Alert, Typography, CircularProgress } from "@mui/material";
import { Payment as PaymentIcon } from "@mui/icons-material";

import apiCall from "../../services/apiService";
import { apiKey } from "../../common/config/api";
import BookingSummary from "../booking/components/BookingSummary";
import StripePay from "../../components/payment/StripePay";
import { calculateProductPrice } from "../../utils/calculateTotalBookingAmount";

const PaymentDetails = () => {
  const [searchParams] = useSearchParams();
  const referenceNo = (searchParams.get("reference_no") || "").trim();

  const [state, setState] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const [airports, setAirports] = useState("");
  const [product, setProduct] = useState(null); // booking_details[0]
  const [site, setSite] = useState(null); // for Stripe key

  console.log("site",site)

  // Derived booking options (for pricing display only)
  const bookingOptions = useMemo(() => ({
    agreeToTerms: true,
    cancellationProtection: product?.cancellation_status === 1 || product?.cancellation_status === "1",
    smsUpdates: product?.sms_confirmation === 1 || product?.sms_confirmation === "1",
  }), [product]);

  // Vehicles count affects price calculation (keep 1 for airport parking)
  const vehicles = useMemo(() => {
    const v = product?.vehicle
      ? [{
          make: product.vehicle.make || "",
          model: product.vehicle.model || "",
          color: product.vehicle.color || "",
          reg_no: product.vehicle.reg_no || "",
        }]
      : [{ make: "", model: "", color: "", reg_no: "" }];
    return v;
  }, [product]);

  // Compute totals using existing helper (matches BookingSummary logic)
  const pricing = useMemo(() => {
    if (!product) return { total: 0, breakdown: {} };
    // Attach site onto product so StripePay can find publishable key
    const p = site ? { ...product, site } : product;
    return calculateProductPrice(p, vehicles.length, {
      cancellation: bookingOptions.cancellationProtection,
      sms: bookingOptions.smsUpdates,
    });
  }, [product, site, vehicles.length, bookingOptions]);

  // Personal data from booking (for Stripe billing_details)
  const personalDataFromBooking = useMemo(() => ({
    firstName: product?.customer?.first_name || "",
    lastName: product?.customer?.last_name || "",
    email: product?.customer?.email || "",
    phone: product?.customer?.contact_no || "",
  }), [product]);

  // Minimal searchData for BookingSummary dates
  const searchData = useMemo(() => {
    // Prefer separate date/time fields when present
    const entryDate = product?.departure_date || product?.departure || "";
    const exitDate = product?.arrival_date || product?.arrival || "";
    const entryTime = product?.departure_time || (product?.departure?.split(" ")?.[1] || "");
    const exitTime = product?.arrival_time || (product?.arrival?.split(" ")?.[1] || "");

    // Resolve airport code from product or map name->code using airports list
    const codeFromProduct = product?.company?.airport?.code || product?.airport_code || "";
    let airportCode = codeFromProduct;
    // if (!airportCode) {
    //   const byName = airports?.find(a => a?.level === product?.company?.airport?.name);
    //   airportCode = byName?.value || "";
    // }

    return {
      entryDate,
      exitDate,
      entryTime,
      exitTime,
      airport: airportCode,
    };
  }, [product, airports]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState("loading");
        setError("");

        if (!referenceNo) {
          throw new Error("Missing reference_no in URL");
        }

        const [airportsRes, bookingRes] = await Promise.all([
          apiCall("GET", `/airports?key=${apiKey}`),
          apiCall(
            "GET",
            `/bookings/show/MM-${referenceNo}?key=${apiKey}&reference_no=${referenceNo}`
          ),
        ]);

        if (!(airportsRes?.success && bookingRes?.success)) {
          throw new Error("Failed to fetch required data");
        }

        const bookingDetails = bookingRes?.data?.[0]?.booking_details?.[0] || null;
        setAirports(bookingDetails?.company?.airport?.name || []);
        setProduct(bookingDetails);

        // Fetch site by api_tag to get Stripe key
        const api_tag = bookingDetails?.api_tag;
      
          const siteRes = await apiCall(
            "GET",
            `/sites?${new URLSearchParams({ key: apiKey, api_tag })}`
          );
          if (siteRes?.success) setSite(siteRes?.data || null);
        

        setState("success");
      } catch (err) {
        console.error("PaymentDetails load error:", err);
        setError(err?.message || "Something went wrong");
        setState("error");
      }
    };

    fetchData();
  }, [referenceNo]);

  // Always allow submit (no personal/vehicle forms on this page)
  const handleValidate = () => true;

  console.log("productproductproductproductproduct",product)

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          Payment Details
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        )}

        {state === "loading" && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 6 }}>
            <CircularProgress size={28} />
            <Typography>Loading booking...</Typography>
          </Box>
        )}

     {state === "success" && product && (
  product?.status === "completed" ? (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 240,
        gap: 1.5,
      }}
    >
      <PaymentIcon sx={{ fontSize: 56, color: 'success.main' }} />
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
        Payment Already Completed
      </Typography>
    </Box>
  ) : (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'flex-start',
        gap: 4,
        width: '100%',
      }}
    >
      {/* Left: Stripe Section */}
      <Box
        sx={{
          flex: { xs: '1 1 100%', md: '1 1 60%' },
          width: { xs: '100%', md: '60%' },
        }}
      >
        {site?.stripe?.key ? (
          <StripePay
            personalData={personalDataFromBooking}
            vehicleData={vehicles}
            bookingOptions={bookingOptions}
            selectedProduct={{ ...product, site }}
            searchData={searchData}
            totalAmount={pricing.total || 0}
            onValidate={handleValidate}
            onPaymentSuccess={() => {}}
            onPaymentError={() => {}}
            multiModeReference={`MM-${referenceNo}`}
            referenceNo={[referenceNo]}
            supplierCost={pricing.breakdown?.basePrice || 0}
            syncStatus={"stored"}
            airport={searchData.airport}
          />
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1.5,
              p: 3,
              borderRadius: 2,
              bgcolor: '#fff',
              border: '1px solid #eee',
            }}
          >
            <CircularProgress size={28} />
            <Typography variant="body2">Preparing secure payment...</Typography>
          </Box>
        )}
      </Box>

      {/* Right: Booking Summary */}
      <Box
        sx={{
          flex: { xs: '1 1 100%', md: '1 1 40%' },
          width: { xs: '100%', md: '40%' },
        }}
      >
        <BookingSummary
          selectedProduct={site ? { ...product, site } : product}
          airports={airports}
          bookingOptions={bookingOptions}
          vehicles={vehicles}
          searchData={searchData}
        />
      </Box>
    </Box>
  )
)}

      </Box>
    </Box>
  );
};

export default PaymentDetails;