import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
} from "@mui/material";
import {
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Edit as EditIcon,
  CheckCircle as CheckIcon,
  LocalParking as ParkingIcon,
  Star as StarIcon,
  Security as SecurityIcon,
} from "@mui/icons-material";
import { format, parseISO, isValid } from "date-fns";
import {
  calculateProductPrice,
  formatPrice,
} from "../../../utils/calculateTotalBookingAmount";
import theme from "../../../theme";

const BookingSummary = ({
  selectedProduct,
  airports = "",
  bookingOptions = {},
  vehicles = [],
  searchData = {},
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Timer state (10 minutes = 600 seconds)
  const [timeLeft, setTimeLeft] = useState(600);

  // Get search parameters with fallbacks
  const getDeparture =
    searchParams.get("departure") ||
    searchData.entryDate ||
    searchData.departureDate;
  const getArrival =
    searchParams.get("arrival") ||
    searchData.exitDate ||
    searchData.arrivalDate;
  const getAirport = searchParams.get("airport") || searchData.airport;
  const getPromocode =
    searchParams.get("promocode") ||
    searchData.discountCode ||
    searchData.promocode;
  const getDepartureTime =
    searchParams.get("departureTime") ||
    searchData.entryTime ||
    searchData.departureTime ||
    "10:00";
  const getArrivalTime =
    searchParams.get("arrivalTime") ||
    searchData.exitTime ||
    searchData.arrivalTime ||
    "10:00";

  // Timer effect
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

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "Not specified";
    try {
      const date = parseISO(dateTime);
      if (isValid(date)) {
        return format(date, "dd-MM-yyyy");
      }
      return dateTime.toString();
    } catch (error) {
      console.warn("Date formatting error:", error, "for value:", dateTime);
      return dateTime.toString();
    }
  };

  const formatTime = (dateTime, timeOnly) => {
    if (!dateTime && !timeOnly) return "Not specified";
    try {
      if (timeOnly) return timeOnly;
      const date = parseISO(dateTime);
      if (isValid(date)) return format(date, "HH:mm");
      return dateTime.toString();
    } catch (error) {
      console.warn("Time formatting error:", error, "for value:", dateTime);
      return timeOnly || dateTime?.toString() || "Not specified";
    }
  };

  const resolveAirportName = () => {
    try {
      if (typeof airports === "string") return airports;
      if (airports && typeof airports === "object" && !Array.isArray(airports)) {
        return airports.level || airports.name || "";
      }
      if (Array.isArray(airports)) {
        const input = searchData?.airport;
        if (typeof input === "string" && input.length > 0) {
          const byCode = airports.find((a) => a?.value === input);
          if (byCode) return byCode.level;
          const byName = airports.find((a) => a?.level === input);
          if (byName) return byName.level;
          return input;
        }
      }
    } catch (e) {
      console.warn("resolveAirportName error:", e);
    }
    return "";
  };

  const pricing = calculateProductPrice(selectedProduct, vehicles.length, {
    cancellation: bookingOptions.cancellationProtection,
    sms: bookingOptions.smsUpdates,
  });

  if (!selectedProduct) return null;

  const handleChangeDates = () => {
    setShowChangeModal(true);
  };

  const handleGoToSearch = () => {
    navigate("/");
  };

  const handleShowInfo = () => {
    setShowInfoModal(true);
  };

  return (
    <>
      <Paper elevation={2} sx={{ mb: 1, borderRadius: 3, overflow: "hidden" }}>
        <Box sx={{ p: 2, borderBottom: "1px solid #F0F0F0" }}>
          <Box display="flex" alignItems="center" flexDirection="column" gap={2} mb={2}>
            {selectedProduct.image || selectedProduct.company?.image ? (
              <Avatar
                src={selectedProduct.image || selectedProduct.company.image}
                alt={selectedProduct.company?.name || selectedProduct.name}
                sx={{ width: "100%", height: "200px", objectFit: "fill" }}
                variant="rounded"
              />
            ) : (
              <Avatar sx={{ width: 100, height: 56, bgcolor: "primary.main" }} variant="rounded">
                <ParkingIcon fontSize="large" />
              </Avatar>
            )}
            <Box flex={1}>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                {selectedProduct.company?.name || selectedProduct.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedProduct.category}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Booking Details */}
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight="600" gutterBottom sx={{ mb: 1 }}>
            Booking Details
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ p: 2, bgcolor: "#F8F9FA", borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Travel Dates
                </Typography>
                <Typography variant="body1" fontWeight="500">
                  {getDeparture && getArrival ? (
                    <>
                      <Box component="span" sx={{ display: "block", mb: 0.5 }}>
                        Departure: {getDeparture.split(" ")[0]} at {getDeparture.split(" ")[1]}
                      </Box>
                      <Box component="span" sx={{ display: "block" }}>
                        Arrival: {getArrival.split(" ")[0]} at {getArrival.split(" ")[1]}
                      </Box>
                    </>
                  ) : (
                    "Dates not specified"
                  )}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Price Summary */}
          <Box sx={{ p: 3, bgcolor: "#FAFAFA", borderRadius: 2, border: "1px solid #E0E0E0" }}>
            <Typography variant="h6" fontWeight="600" gutterBottom>
              Price Summary
            </Typography>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2">
                Parking ({vehicles.length} vehicle{vehicles.length > 1 ? "s" : ""})
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {formatPrice(pricing.breakdown.basePrice)}
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2">Booking Fee</Typography>
              <Typography variant="body2">
                {formatPrice(pricing.breakdown.adminCharges)}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6" fontWeight="bold">
                Total Price
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="primary.main">
                {formatPrice(pricing.total)}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Only timer kept */}
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