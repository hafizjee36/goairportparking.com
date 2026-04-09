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

const OrderSummary = ({ basketTotal, orderTotal, airport, bookingOptions = {} }) => {
  const { selectedParking } = useSelector((state) => state.payment);
  const searchData = useSelector((state) => state.search.searchData);

  const { airports } = useAirports();

  const BASE = 140;
  const STEP = 90;

  const getAirportTitle = (airportCode) => {
    if (!airportCode) return "Airport";
    const airportMatch = airports.find((item) => item.value === airportCode);
    return airportMatch ? airportMatch.level : airportCode;
  };

  const formatDateTime = (date, time) => {
    if (!date || !time) return "Not set";

    const dateObj = new Date(date);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    return `${day} ${month}, ${year} - ${time}`;
  };

  const parkingName =
    selectedParking?.name || "Airparks Short Run - Park and Ride";
  const parkingPrice = Number(selectedParking?.price || 45.99);
  const priceBeforeDiscount = Number(
    selectedParking?.priceBeforeDiscount || parkingPrice
  );

  const adminCharges = Number(selectedParking?.adminCharges || 0);
  const smsCharges = Number(selectedParking?.smsCharges || 0);
  const extraAmount = Number(selectedParking?.extraAmount || 0);
  const cancellationCharges = bookingOptions?.cancellationProtection
    ? Number(
        selectedParking?.payment?.cancellation_charges ||
          selectedParking?.cancellation_charges ||
          2
      )
    : 0;
  
  const bookingFee = adminCharges > 0 ? adminCharges : 1.95;
  const discountAmount = Math.max(0, priceBeforeDiscount - parkingPrice);
  const totalPrice =
    parkingPrice +
    bookingFee +
    smsCharges +
    extraAmount +
    cancellationCharges;

  const airportCode = selectedParking?.airportCode || searchData?.airport || "BHX";
  const airportName = getAirportTitle(airportCode) || airport || "Birmingham";

  const entryDateTime = formatDateTime(
    searchData?.entryDate,
    searchData?.entryTime
  );
  const exitDateTime = formatDateTime(searchData?.exitDate, searchData?.exitTime);

  const currency =
    airportCode?.toUpperCase() === "DXB"
      ? "AED"
      : airportCode?.toUpperCase() === "DUB"
      ? "€"
      : "£";

  const formatMoney = (amount) =>
    `${currency}${Number(amount || 0).toFixed(2)}`;

  return (
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
          width: "100%",
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
              <Box sx={{ p: 2, minHeight: 84 }}>
                <Typography variant="h4" fontWeight={600} gutterBottom>
                  Order summary
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {airportName}
                </Typography>
              </Box>
            </AnimateOnScroll>

            <Divider />

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
                <Stack direction="row" justifyContent="space-between" gap={2}>
                  <Typography fontWeight="500" sx={{ minHeight: 40 }}>
                    {parkingName}
                  </Typography>
                  <Typography fontWeight="500" sx={{ whiteSpace: "nowrap" }}>
                    {formatMoney(parkingPrice)}
                  </Typography>
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
              <Box
                sx={{
                  mb: 2,
                  px: 1.5,
                  py: 1.1,
                  borderRadius: 2,
                  backgroundColor: "#FFF8E1",
                  border: "1px solid rgba(248, 190, 20, 0.35)",
                  minHeight: 48,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "#5F4B00",
                    fontWeight: 600,
                    width: "100%",
                  }}
                >
                  A {currency}1.95 booking fee applies to all bookings.
                </Typography>
              </Box>

              {discountAmount > 0 && (
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography
                    color="text.secondary"
                    sx={{ textDecoration: "line-through" }}
                  >
                    Original price
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{ textDecoration: "line-through" }}
                  >
                    {formatMoney(priceBeforeDiscount)}
                  </Typography>
                </Stack>
              )}

              {discountAmount > 0 && (
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography color="success.main">Discount</Typography>
                  <Typography color="success.main">
                    -{formatMoney(discountAmount)}
                  </Typography>
                </Stack>
              )}

              <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography>Booking fee</Typography>
                <Typography>{formatMoney(bookingFee)}</Typography>
              </Stack>

              {cancellationCharges > 0 && (
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography>Cancellation Protection</Typography>
                  <Typography>{formatMoney(cancellationCharges)}</Typography>
                </Stack>
              )}

              {smsCharges > 0 && (
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography>SMS updates</Typography>
                  <Typography>{formatMoney(smsCharges)}</Typography>
                </Stack>
              )}

              {extraAmount > 0 && (
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography>Additional charges</Typography>
                  <Typography>{formatMoney(extraAmount)}</Typography>
                </Stack>
              )}
            </Box>
          </AnimateOnScroll>
        </Box>

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
              <Typography variant="h6" fontWeight="bold">
                Total
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="primary.main">
                {formatMoney(totalPrice)}
              </Typography>
            </Stack>
          </Box>
        </AnimateOnScroll>
      </Box>
    </AnimateOnScroll>
  );
};

export default OrderSummary;  