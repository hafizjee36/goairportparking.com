// components/PaymentForm/OrderSummary.js
import React from "react";
import { Box, Typography, Divider, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useAirports } from "../../../hooks/useAirports";

import {
  EASE_SOFT,
  THRESHOLD,
  ROOT_MARGIN,
  smoothStyle,
} from "../../../components/utils/animation";
import AnimateOnScroll from "../../../components/reusable/AnimateOnScroll";

const OrderSummary = ({ basketTotal, orderTotal, airport }) => {
  // Get selected parking data and search data from Redux
  const { selectedParking } = useSelector((state) => state.payment);
  const searchData = useSelector((state) => state.search.searchData);
  
  // Get airports data to convert airport code to title
  const { airports, loading: airportsLoading } = useAirports();
  
  // small stagger for inner rows
  const BASE = 140;
  const STEP = 90;
  
  // Function to get airport title from airport code
  const getAirportTitle = (airportCode) => {
    if (!airportCode) return "Airport";
    const airport = airports.find(airport => airport.value === airportCode);
    return airport ? airport.level : airportCode;
  };
  
  // Function to format date and time
  const formatDateTime = (date, time) => {
    if (!date || !time) return "Not set";
    
    const dateObj = new Date(date);
    const months = ["January", "February", "March", "April", "May", "June",
                   "July", "August", "September", "October", "November", "December"];
    
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    
    return `${day} ${month}, ${year} - ${time}`;
  };
  
  // Use selected parking data or fallback values
  const parkingName = selectedParking?.name || "Airparks Short Run - Park and Ride";
  const parkingPrice = selectedParking?.price || 45.99;
  const priceBeforeDiscount = selectedParking?.priceBeforeDiscount || parkingPrice;
  
  // Get individual charges from selected parking
  const adminCharges = selectedParking?.adminCharges || 0;
  const smsCharges = selectedParking?.smsCharges || 0;
  const extraAmount = selectedParking?.extraAmount || 0;
  
  // Calculate booking fee (could be different per booking)
  const bookingFee = adminCharges > 0 ? adminCharges : 2.99;
  
  // Calculate discount amount
  const discountAmount = priceBeforeDiscount - parkingPrice;
  
  // Calculate subtotal and total
  const subtotal = parkingPrice + bookingFee + smsCharges + extraAmount;
  const totalPrice = subtotal;
  
  // Get airport info
  const airportCode = selectedParking?.airportCode || searchData?.airport || "BHX";
  const airportName = getAirportTitle(airportCode) || airport || "Birmingham";
  
  // Get entry and exit dates
  const entryDateTime = formatDateTime(searchData?.entryDate, searchData?.entryTime);
  const exitDateTime = formatDateTime(searchData?.exitDate, searchData?.exitTime);

  const currency = (airportCode == "DXB") ? 'AED': airportCode && ["DUB", "DUBLIN"].includes(airport.toUpperCase()) ? "€" : "£";

  return (
    // Slide the whole card in from the left, then fade/slide pieces inside
    <AnimateOnScroll
      type="slide-left"
      distance={18}
      duration={760}
      delay={80}
      easingTransform={EASE_SOFT}
      easingOpacity={EASE_SOFT}
      threshold={THRESHOLD}
      rootMargin={ROOT_MARGIN}
      once
      as="div"
      style={{
        ...smoothStyle,
        position: "sticky",
        top: 24,
        alignSelf: "flex-start",
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          mx: "auto",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#EFF3F5",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <AnimateOnScroll
              type="fade"
              duration={640}
              delay={BASE}
              easingTransform={EASE_SOFT}
              easingOpacity={EASE_SOFT}
              threshold={THRESHOLD}
              rootMargin={ROOT_MARGIN}
              once
              as="div"
              style={smoothStyle}
            >
              <Box sx={{ p: 2 }}>
                <Typography variant="h4" fontWeight={600} gutterBottom>
                  Order summary
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {airportName}
                </Typography>
              </Box>
            </AnimateOnScroll>

            <Divider />

            {/* Selected product + times */}
            <AnimateOnScroll
              type="slide-up"
              distance={14}
              duration={680}
              delay={BASE + STEP}
              easingTransform={EASE_SOFT}
              easingOpacity={EASE_SOFT}
              threshold={THRESHOLD}
              rootMargin={ROOT_MARGIN}
              once
              as="div"
              style={smoothStyle}
            >
              <Box sx={{ p: 2 }}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight="500">
                    {parkingName}
                  </Typography>
                  <Typography fontWeight="500">£{parkingPrice.toFixed(2)}</Typography>
                </Stack>

                <Box sx={{ mt: 1 }}>
                  <Stack mt={1.5} direction="row" spacing={1}>
                    <Stack alignItems="center" spacing={0.5}>
                      <AccessTimeIcon fontSize="small" color="action" />
                      <Box
                        sx={{
                          height: 18,
                          borderLeft: "2px dotted grey",
                        }}
                      />
                      <AccessTimeIcon fontSize="small" color="action" />
                    </Stack>
                    <Stack spacing={3}>
                      <Typography variant="caption" color="text.secondary">
                        Entry: {entryDateTime}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Exit: {exitDateTime}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </AnimateOnScroll>
          </Box>

          {/* Price Breakdown */}
          <AnimateOnScroll
            type="fade"
            duration={620}
            delay={BASE + STEP * 2}
            easingTransform={EASE_SOFT}
            easingOpacity={EASE_SOFT}
            threshold={THRESHOLD}
            rootMargin={ROOT_MARGIN}
            once
            as="div"
            style={smoothStyle}
          >
            <Box sx={{ p: 2 }}>
              {/* Original Price (if there's a discount) */}
              {discountAmount > 0 && (
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography color="text.secondary" sx={{ textDecoration: 'line-through' }}>Original price</Typography>
                  <Typography color="text.secondary" sx={{ textDecoration: 'line-through' }}>£{priceBeforeDiscount.toFixed(2)}</Typography>
                </Stack>
              )}
              
              {/* Discount Amount */}
              {discountAmount > 0 && (
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography color="success.main">Discount</Typography>
                  <Typography color="success.main">-£{discountAmount.toFixed(2)}</Typography>
                </Stack>
              )}
              
              {/* Booking fee */}
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography>Booking fee</Typography>
                <Typography>£{bookingFee.toFixed(2)}</Typography>
              </Stack>
              
              {/* SMS Charges (if applicable) */}
              {smsCharges > 0 && (
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography>SMS charges</Typography>
                  <Typography>£{smsCharges.toFixed(2)}</Typography>
                </Stack>
              )}
              
              {/* Extra Amount (if applicable) */}
              {extraAmount > 0 && (
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography>Additional charges</Typography>
                  <Typography>£{extraAmount.toFixed(2)}</Typography>
                </Stack>
              )}
            </Box>
          </AnimateOnScroll>
        </Box>

        {/* Total */}
        <AnimateOnScroll
          type="zoom-in"
          duration={700}
          delay={BASE + STEP * 3}
          easingTransform={EASE_SOFT}
          easingOpacity={EASE_SOFT}
          threshold={THRESHOLD}
          rootMargin={ROOT_MARGIN}
          once
          as="div"
          style={smoothStyle}
        >
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              mt: 2,
              p: 2,
            }}
          >
            <Divider sx={{ mb: 2 }} />
            <Stack direction="row" justifyContent="space-between" mb={2}>
              <Typography variant="h6" fontWeight="bold">Total</Typography>
              <Typography variant="h6" fontWeight="bold" color="primary.main">{currency}{totalPrice.toFixed(2)}</Typography>
            </Stack>
          </Box>
        </AnimateOnScroll>
      </Box>
    </AnimateOnScroll>
  );
};

export default OrderSummary;
