import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Avatar,
  Alert,
} from "@mui/material";
import {
  AccessTime as TimeIcon,
  LocalParking as ParkingIcon,
} from "@mui/icons-material";
import {
  calculateProductPrice,
  formatPrice,
} from "../../../utils/calculateTotalBookingAmount";

const BookingSummary = ({
  selectedProduct,
  airports = "",
  bookingOptions = {},
  vehicles = [],
  searchData = {},
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(600);

  const getDeparture =
    searchParams.get("departure") ||
    searchData.entryDate ||
    searchData.departureDate;
  const getArrival =
    searchParams.get("arrival") ||
    searchData.exitDate ||
    searchData.arrivalDate;

  useEffect(() => {
    setTimeLeft(600);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const pricing = calculateProductPrice(selectedProduct, vehicles.length, {
    cancellation: bookingOptions.cancellationProtection,
    sms: bookingOptions.smsUpdates,
  });

  if (!selectedProduct) return null;

  const currency =
    searchData?.airport === "DXB"
      ? `AED`
      : searchData?.airport  === "DUB"
      ? `€`
      : `£`;

  const bookingFeeAmount = formatPrice((pricing.breakdown.adminCharges, currency) || 0);
  const cancellationEnabled = !!bookingOptions.cancellationProtection;
  const cancellationAmount = formatPrice(
    (pricing.breakdown.cancellationCharges, currency) || 0
  );

  return (
    <>
      <Paper elevation={2} sx={{ mb: 1, borderRadius: 3, overflow: "hidden" }}>
        <Box sx={{ p: 2, borderBottom: "1px solid #F0F0F0" }}>
          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            gap={2}
            mb={2}
          >
            {selectedProduct.image || selectedProduct.company?.image ? (
              <Avatar
                src={selectedProduct.image || selectedProduct.company.image}
                alt={selectedProduct.company?.name || selectedProduct.name}
                variant="rounded"
                imgProps={{
                  loading: "lazy",
                  decoding: "async",
                }}
                sx={{
                  width: "100%",
                  height: 200,
                  borderRadius: 2,
                  "& .MuiAvatar-img": {
                    objectFit: "cover",
                  },
                }}
              />
            ) : (
              <Avatar
                sx={{ width: 100, height: 56, bgcolor: "primary.main" }}
                variant="rounded"
              >
                <ParkingIcon fontSize="large" />
              </Avatar>
            )}

            <Box flex={1} sx={{ width: "100%" }}>
              <Typography
                variant="h6"
                fontWeight="600"
                gutterBottom
                sx={{ minHeight: 32 }}
              >
                {selectedProduct.company?.name || selectedProduct.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedProduct.category}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight="600" gutterBottom sx={{ mb: 1 }}>
            Booking Details
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "#F8F9FA",
                  borderRadius: 2,
                  minHeight: 108,
                }}
              >
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Travel Dates
                </Typography>
                <Typography variant="body1" fontWeight="500">
                  {getDeparture && getArrival ? (
                    <>
                      <Box component="span" sx={{ display: "block", mb: 0.5 }}>
                        Departure: {getDeparture.split(" ")[0]} at{" "}
                        {getDeparture.split(" ")[1]}
                      </Box>
                      <Box component="span" sx={{ display: "block" }}>
                        Arrival: {getArrival.split(" ")[0]} at{" "}
                        {getArrival.split(" ")[1]}
                      </Box>
                    </>
                  ) : (
                    "Dates not specified"
                  )}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box
            sx={{
              mb: 2,
              px: 2,
              py: 1.25,
              borderRadius: 2,
              backgroundColor: "#FFF8E1",
              border: "1px solid rgba(248, 190, 20, 0.35)",
              minHeight: 52,
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

          <Box
            sx={{
              mb: 2,
              px: 2,
              py: 1.25,
              borderRadius: 2,
              backgroundColor: cancellationEnabled ? "#E8F5E9" : "#FAFAFA",
              border: cancellationEnabled
                ? "1px solid rgba(46, 125, 50, 0.2)"
                : "1px solid #E0E0E0",
              minHeight: 52,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: cancellationEnabled ? "#1B5E20" : "text.secondary",
                fontWeight: 600,
                width: "100%",
              }}
            >
              {cancellationEnabled
                ? `Cancellation Protection added: ${cancellationAmount}`
                : "Cancellation Protection not added."}
            </Typography>
          </Box>

          <Box
            sx={{
              p: 3,
              bgcolor: "#FAFAFA",
              borderRadius: 2,
              border: "1px solid #E0E0E0",
            }}
          >
            <Typography variant="h6" fontWeight="600" gutterBottom>
              Price Summary
            </Typography>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2">
                Parking ({vehicles.length} vehicle{vehicles.length > 1 ? "s" : ""})
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {formatPrice(pricing.breakdown.basePrice, currency)}
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2">Booking fee</Typography>
              <Typography variant="body2">{formatPrice(pricing.breakdown.adminCharges, currency)}</Typography>
            </Box>

            {pricing.breakdown.cancellationCharges > 0 && (
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">Cancellation Protection</Typography>
                <Typography variant="body2">
                  {cancellationAmount}
                </Typography>
              </Box>
            )}

            {pricing.breakdown.smsCharges > 0 && (
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">SMS updates</Typography>
                <Typography variant="body2">
                  {formatPrice(pricing.breakdown.smsCharges,currency)}
                </Typography>
              </Box>
            )}

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6" fontWeight="bold">
                Total Price
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="primary.main">
                {formatPrice(pricing.total,currency)}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ px: 2, py: 1 }}>
          <Alert severity="warning" icon={<TimeIcon />} sx={{ mb: 1, borderRadius: 2 }}>
            Price guaranteed for {formatTimer(timeLeft)} minutes
          </Alert>
        </Box>
      </Paper>
    </>
  );
};

export default BookingSummary;