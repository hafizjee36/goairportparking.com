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
  Person as PersonIcon,
  Warning as WarningIcon,
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

  // Random booking alerts - generated once per session
  const [bookingAlerts] = useState(() => {
    return {
      // ranges updated: 5-20 and 5-10
      peopleBooked: Math.floor(Math.random() * (20 - 5 + 1)) + 5, // 5-20
      spacesLeft: Math.floor(Math.random() * (10 - 5 + 1)) + 5, // 5-10
    };
  });

  // Get search parameters with fallbacks to searchData prop
  // Map searchData field names to expected values
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

  // Timer effect - resets to 10 minutes every time component mounts
  useEffect(() => {
    setTimeLeft(600); // Always start with 10 minutes

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

  // Format timer display
  const formatTimer = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Format dates with improved error handling
  const formatDateTime = (dateTime) => {
    if (!dateTime) return "Not specified";
    try {
      // Handle different date formats
      const date = parseISO(dateTime);
      if (isValid(date)) {
        return format(date, "dd-MM-yyyy");
      }
      // If date-fns can't parse it, try to format as-is
      return dateTime.toString();
    } catch (error) {
      console.warn("Date formatting error:", error, "for value:", dateTime);
      return dateTime.toString();
    }
  };

  const formatTime = (dateTime, timeOnly) => {
    if (!dateTime && !timeOnly) return "Not specified";
    try {
      // If we have separate time, use it
      if (timeOnly) {
        return timeOnly;
      }
      // Otherwise try to extract time from datetime
      const date = parseISO(dateTime);
      if (isValid(date)) {
        return format(date, "HH:mm");
      }
      return dateTime.toString();
    } catch (error) {
      console.warn("Time formatting error:", error, "for value:", dateTime);
      return timeOnly || dateTime?.toString() || "Not specified";
    }
  };

  // Robust airport title resolver that accepts string, object, or array list
  const resolveAirportName = () => {
    try {
      // If a direct string was provided, use it
      if (typeof airports === "string") return airports;

      // If an object was provided (e.g., { level, value } or { name, code })
      if (
        airports &&
        typeof airports === "object" &&
        !Array.isArray(airports)
      ) {
        return airports.level || airports.name || "";
      }

      // If an array was provided, try resolving using searchData.airport
      if (Array.isArray(airports)) {
        const input = searchData?.airport;
        if (typeof input === "string" && input.length > 0) {
          const byCode = airports.find((a) => a?.value === input);
          if (byCode) return byCode.level;
          const byName = airports.find((a) => a?.level === input);
          if (byName) return byName.level;
          return input; // fallback to whatever we have
        }
      }
    } catch (e) {
      console.warn("resolveAirportName error:", e);
    }
    return "";
  };

  // Calculate pricing
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
        {/* Header Section */}
        <Box sx={{ p: 2, borderBottom: "1px solid #F0F0F0" }}>
          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            gap={2}
            mb={2}
          >
            {/* Product/Company Image */}
            {selectedProduct.image || selectedProduct.company?.image ? (
              <Avatar
                src={selectedProduct.image || selectedProduct.company.image}
                alt={selectedProduct.company?.name || selectedProduct.name}
                sx={{ width: "100%", height: "200px", objectFit: "fill" }}
                variant="rounded"
              />
            ) : (
              <Avatar
                sx={{ width: 100, height: 56, bgcolor: "primary.main" }}
                variant="rounded"
              >
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

          {/* Travel Information */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {/* <Grid item xs={12} sm={6}>
              <Box sx={{ p: 2, bgcolor: "#F8F9FA", borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Airport
                </Typography>
                <Typography variant="body1" fontWeight="500">
                  {resolveAirportName()}
                </Typography>
              </Box>
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <Box sx={{ p: 2, bgcolor: "#F8F9FA", borderRadius: 2 }}>
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

          {/* Price Summary */}
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
                Parking ({vehicles.length} vehicle
                {vehicles.length > 1 ? "s" : ""})
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {formatPrice(
                  pricing.breakdown.basePrice,
                   getAirport === "DUB" ? "€" : getAirport === "DXB" ? "AED" : "£"
                )}
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2">Service Fee</Typography>
              <Typography variant="body2">
                {formatPrice(
                  pricing.breakdown.adminCharges,
                  getAirport === "DUB" ? "€" : getAirport === "DXB" ? "AED" : "£"
                )}
              </Typography>
            </Box>

            {bookingOptions.cancellationProtection && (
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">Cancellation Protection</Typography>
                <Typography variant="body2">
                  {formatPrice(
                    pricing.breakdown.cancellationCharges,
                    getAirport === "DUB" ? "€" : getAirport === "DXB" ? "AED" : "£"
                  )}
                </Typography>
              </Box>
            )}

            {bookingOptions.smsUpdates && (
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">SMS Updates</Typography>
                <Typography variant="body2">
                  {formatPrice(
                    pricing.breakdown.smsCharges,
                    getAirport === "DUB" ? "€" : getAirport === "DXB" ? "AED" : "£"
                  )}
                </Typography>
              </Box>
            )}

            {/* Extra charges */}
            {Number(pricing.breakdown?.extraAmount || 0) > 0 && (
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">Additional charges</Typography>
                <Typography variant="body2">
                  {formatPrice(pricing.breakdown.extraAmount)}
                </Typography>
              </Box>
            )}
            {Number(pricing.breakdown?.extraCharges || 0) > 0 && (
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">Extra charges</Typography>
                <Typography variant="body2">
                  {formatPrice(pricing.breakdown.extraCharges)}
                </Typography>
              </Box>
            )}
            {Number(pricing.breakdown?.levyCharges || 0) > 0 && (
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">Levy charges</Typography>
                <Typography variant="body2">
                  {formatPrice(pricing.breakdown.levyCharges)}
                </Typography>
              </Box>
            )}

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6" fontWeight="bold">
                Total Price
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="primary.main">
                {formatPrice(pricing.total, getAirport  === "DUB" ? "€" : getAirport === "DXB" ? "AED" : "£")}
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* Booking Alerts */}
        <Box sx={{ px: 2, py: 1 }}>
          {/* Price Guarantee Timer */}
          <Alert
            severity="warning"
            icon={<TimeIcon />}
            sx={{
              mb: 1,
              borderRadius: 2,
              "& .MuiAlert-message": {
                fontWeight: 500,
              },
            }}
          >
            Price guaranteed for {formatTimer(timeLeft)} minutes
          </Alert>

          {/* People Booked Alert */}
          <Alert
            severity="info"
            icon={<PersonIcon />}
            sx={{
              mb: 1,
              borderRadius: 2,
              "& .MuiAlert-message": {
                fontWeight: 500,
              },
            }}
          >
            {bookingAlerts.peopleBooked} people booked this service today
          </Alert>

          {/* Spaces Left Alert */}
          <Alert
            severity="error"
            icon={<WarningIcon />}
            sx={{
              mb: 1,
              borderRadius: 2,
              "& .MuiAlert-message": {
                fontWeight: 500,
              },
            }}
          >
            Only {bookingAlerts.spacesLeft} spaces left at this price!
          </Alert>
        </Box>
      </Paper>

      {/* Change Dates Modal */}
      <Dialog
        open={showChangeModal}
        onClose={() => setShowChangeModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Change Dates</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            To change your travel dates, you'll need to start a new search.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This will take you back to the main search page where you can select
            new dates and times.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowChangeModal(false)}>Cancel</Button>
          <Button onClick={handleGoToSearch} variant="contained">
            New Search
          </Button>
        </DialogActions>
      </Dialog>

      {/* Product Info Modal */}
      <Dialog
        open={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedProduct.company?.name || selectedProduct.name} - Product
          Information
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            {selectedProduct.description ||
              "Professional parking service with excellent customer reviews."}
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Features & Benefits
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <SecurityIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Secure Parking"
                secondary="24/7 monitored and secure parking facilities"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon color="success" />
              </ListItemIcon>
              <ListItemText
                primary="Fully Insured"
                secondary="Comprehensive insurance coverage for your vehicle"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <TimeIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Flexible Service"
                secondary="Easy drop-off and pick-up process"
              />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowInfoModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookingSummary;
