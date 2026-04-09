import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Avatar,
  Divider,
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  DirectionsCar as CarIcon,
  Person as PersonIcon,
  LocalParking as ParkingIcon,
} from '@mui/icons-material';
import { format, parseISO, isValid } from 'date-fns';
import { formatPrice } from '../../../utils/calculateTotalBookingAmount';
import theme from '../../../theme';

const BookingSummaryCard = ({
  bookingDetails,
  isConfirmationPage = false
}) => {
  if (!bookingDetails) return null;

  const formatDateTime = (dateTime) => {
    if (!dateTime) return 'Not specified';
    try {
      const date = parseISO(dateTime);
      return isValid(date) ? format(date, 'dd MMM yyyy, HH:mm') : dateTime;
    } catch {
      return dateTime;
    }
  };

  const getServiceType = () => {
    if (bookingDetails.booking_details?.[0]?.company?.type) {
      return bookingDetails.booking_details[0].company.type;
    }
    return bookingDetails.type || 'Parking Service';
  };

  const getCompanyName = () => {
    if (bookingDetails.booking_details?.[0]?.company?.name) {
      return bookingDetails.booking_details[0].company.name;
    }
    return bookingDetails.company_name || 'Parking Provider';
  };

  const getCompanyImage = () => {
    if (bookingDetails.booking_details?.[0]?.company?.image) {
      return bookingDetails.booking_details[0].company.image;
    }
    return bookingDetails.company_image || null;
  };

  return (
    <Paper
      elevation={isConfirmationPage ? 2 : 3}
      sx={{
        p: 3,
        mb: 3,
        border: isConfirmationPage ? `1px solid ${theme.palette.primary.main}` : 'none'
      }}
    >
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Box display="flex" alignItems="center" gap={2}>
          {getCompanyImage() ? (
            <Avatar
              src={getCompanyImage()}
              alt={getCompanyName()}
              sx={{ width: 60, height: 60 }}
            />
          ) : (
            <Avatar sx={{ width: 60, height: 60, bgcolor: 'primary.main' }}>
              <ParkingIcon fontSize="large" />
            </Avatar>
          )}
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {getCompanyName()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {getServiceType()}
            </Typography>
            {isConfirmationPage && (
              <Chip
                label="Confirmed"
                color="success"
                size="small"
                sx={{ mt: 1 }}
              />
            )}
          </Box>
        </Box>

        <Box textAlign="right">
          <Typography variant="h6" fontWeight="bold" color="primary.main">
            {formatPrice(bookingDetails.amount)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Total Paid
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Booking Details */}
      <Grid container spacing={3}>
        {/* Dates and Times */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            <CalendarIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Parking Duration
          </Typography>

          <Box mb={2}>
            <Typography variant="body2" color="text.secondary">
              Drop-off
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {formatDateTime(bookingDetails.departure)}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">
              Pick-up
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {formatDateTime(bookingDetails.arrival)}
            </Typography>
          </Box>
        </Grid>

        {/* Customer Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            <PersonIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Customer Details
          </Typography>

          <Box mb={2}>
            <Typography variant="body2" color="text.secondary">
              Name
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {bookingDetails.customer?.title || bookingDetails.title} {bookingDetails.customer?.first_name || bookingDetails.first_name} {bookingDetails.customer?.last_name || bookingDetails.last_name}
            </Typography>
          </Box>

          <Box mb={2}>
            <Typography variant="body2" color="text.secondary">
              Email
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {bookingDetails.customer?.email || bookingDetails.email}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">
              Phone
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {bookingDetails.customer?.contact_no || bookingDetails.contact_no}
            </Typography>
          </Box>
        </Grid>

        {/* Flight Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            <LocationIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Flight Details
          </Typography>

          <Box mb={2}>
            <Typography variant="body2" color="text.secondary">
              Departure Terminal
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {bookingDetails.departure_terminal || 'To be confirmed'}
            </Typography>
          </Box>

          <Box mb={2}>
            <Typography variant="body2" color="text.secondary">
              Departure Flight
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {bookingDetails.departure_flight_no || 'To be confirmed'}
            </Typography>
          </Box>

          <Box mb={2}>
            <Typography variant="body2" color="text.secondary">
              Arrival Terminal
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {bookingDetails.arrival_terminal || 'To be confirmed'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">
              Arrival Flight
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {bookingDetails.arrival_flight_no || 'To be confirmed'}
            </Typography>
          </Box>
        </Grid>

        {/* Vehicle Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            <CarIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Vehicle Details
          </Typography>

          {bookingDetails.vehicles && bookingDetails.vehicles.length > 0 ? (
            bookingDetails.vehicles.map((vehicle, index) => (
              <Box key={index} mb={2}>
                <Typography variant="body2" color="text.secondary">
                  Vehicle {index + 1}
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {vehicle.reg_no || 'Not specified'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {vehicle.make && vehicle.model ? `${vehicle.make} ${vehicle.model}` : 'Details TBC'}
                  {vehicle.color && ` - ${vehicle.color}`}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              Vehicle details not available
            </Typography>
          )}
        </Grid>

        {/* Additional Services */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Additional Services
          </Typography>

          <Box display="flex" flexWrap="wrap" gap={1}>
            {bookingDetails.cancellation_status === '1' && (
              <Chip
                label="Cancellation Protection"
                color="primary"
                size="small"
                variant="outlined"
              />
            )}
            {bookingDetails.sms_confirmation === '1' && (
              <Chip
                label="SMS Updates"
                color="primary"
                size="small"
                variant="outlined"
              />
            )}
            {bookingDetails.cancellation_status !== '1' && bookingDetails.sms_confirmation !== '1' && (
              <Typography variant="body2" color="text.secondary">
                No additional services selected
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>

      {isConfirmationPage && (
        <Box
          sx={{
            mt: 3,
            p: 2,
            backgroundColor: theme.palette.success.light,
            borderRadius: 1,
            textAlign: 'center'
          }}
        >
          <Typography variant="body2" color="success.dark" fontWeight="bold">
            ✓ This booking has been confirmed and payment has been processed
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default BookingSummaryCard;

