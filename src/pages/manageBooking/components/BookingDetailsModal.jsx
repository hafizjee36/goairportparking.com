import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Button,
  Chip,
  Divider,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Close as CloseIcon,
  Person as PersonIcon,
  DirectionsCar as CarIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  Payment as PaymentIcon,
  Flight as FlightIcon,
  AccessTime as TimeIcon,
  Receipt as ReceiptIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Badge as BadgeIcon,
} from '@mui/icons-material';
import { format, parse } from 'date-fns';

const BookingDetailsModal = ({ open, booking, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  if (!booking) return null;

  const bookingDetails = booking.booking_details_current;
  const customer = bookingDetails?.customer;
  const vehicle = bookingDetails?.vehicle;
  const payment = bookingDetails?.payment;
  const company = bookingDetails?.company;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return theme.palette.success.main;
      case 'confirmed':
        return theme.palette.info.main;
      case 'incompleted':
        return theme.palette.warning.main;
      case 'cancelled':
        return theme.palette.error.main;
      default:
        return theme.palette.text.secondary;
    }
  };

  const getStatusLabel = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'Completed';
      case 'confirmed':
        return 'Confirmed';
      case 'incompleted':
        return 'Incomplete';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status || 'Unknown';
    }
  };

  const formatDate = (date) => {
    return date ? format(new Date(date), 'dd-MM-yyyy') : 'TBC';
  };

  const formatTime = (time) => {
    return time && time !== 'TBC' ? format(parse(time, 'HH:mm:ss', new Date()), 'HH:mm') : 'TBC';
  };

  const formatCurrency = (amount) => {
    return amount ? `£${parseFloat(amount).toFixed(2)}` : '£0.00';
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="lg"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: fullScreen ? 0 : 3,
          maxHeight: fullScreen ? '100vh' : '90vh',
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          bgcolor: '#ffc107',
          color: 'white',
          py: 2,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ReceiptIcon sx={{ fontSize: 28 }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
              Booking Details
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Reference: {booking.reference_no}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ p: 0, bgcolor: '#f8f9fa' }}>
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          {/* Status Banner */}
          <Card sx={{ mb: 3, borderRadius: 2, overflow: 'visible' }}>
            <CardContent sx={{ p: 3, textAlign: 'center', position: 'relative' }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: -15,
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              >
                <Chip
                  label={getStatusLabel(bookingDetails?.status)}
                  sx={{
                    bgcolor: getStatusColor(bookingDetails?.status),
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    px: 2,
                    py: 0.5,
                    height: 30,
                  }}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  {booking.reference_no}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Booking created on {format(new Date(booking.created_at), 'dd-MM-yyyy HH:mm')}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Grid container spacing={3}>
            {/* Customer Information */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', borderRadius: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Avatar sx={{ bgcolor: '#007bff', width: 40, height: 40 }}>
                      <PersonIcon />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Customer Information
                    </Typography>
                  </Box>

                  <Box sx={{ space: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <BadgeIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {customer?.title || 'N/A'} {customer?.first_name || 'N/A'} {customer?.last_name || 'N/A'}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <EmailIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                      <Typography variant="body2">
                        {customer?.email || 'N/A'}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <PhoneIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                      <Typography variant="body2">
                        {customer?.contact_no || 'N/A'}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PersonIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                      <Typography variant="body2">
                        {bookingDetails?.no_of_peoples || 1} Person(s)
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Vehicle Information */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', borderRadius: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Avatar sx={{ bgcolor: '#28a745', width: 40, height: 40 }}>
                      <CarIcon />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Vehicle Information
                    </Typography>
                  </Box>

                  <Box sx={{ space: 2 }}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                        Registration Number
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {vehicle?.reg_no || 'TBC'}
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                        Make & Model
                      </Typography>
                      <Typography variant="body1">
                        {vehicle?.make || 'TBC'} {vehicle?.model || 'TBC'}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                        Color
                      </Typography>
                      <Typography variant="body1">
                        {vehicle?.color || 'TBC'}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Booking Details */}
            <Grid item xs={12} md={8}>
              <Card sx={{ height: '100%', borderRadius: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Avatar sx={{ bgcolor: '#dc3545', width: 40, height: 40 }}>
                      <CalendarIcon />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Booking Details
                    </Typography>
                  </Box>

                  <Grid container spacing={3}>
                    {/* Departure */}
                    <Grid item xs={12} sm={6}>
                      <Box sx={{
                        p: 2,
                        bgcolor: '#e3f2fd',
                        borderRadius: 2,
                        border: '1px solid #bbdefb'
                      }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#1976d2' }}>
                          DEPARTURE
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2">
                            {formatDate(bookingDetails?.departure_date)}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <TimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2">
                            {formatTime(bookingDetails?.departure_time)}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <FlightIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2">
                            {bookingDetails?.departure_flight_no || 'TBC'}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2">
                            Terminal {bookingDetails?.departure_terminal || 'TBC'}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    {/* Arrival */}
                    <Grid item xs={12} sm={6}>
                      <Box sx={{
                        p: 2,
                        bgcolor: '#e8f5e8',
                        borderRadius: 2,
                        border: '1px solid #c8e6c9'
                      }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#388e3c' }}>
                          ARRIVAL
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2">
                            {formatDate(bookingDetails?.arrival_date)}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <TimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2">
                            {formatTime(bookingDetails?.arrival_time)}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <FlightIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2">
                            {bookingDetails?.arrival_flight_no || 'TBC'}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2">
                            Terminal {bookingDetails?.arrival_terminal || 'TBC'}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3 }} />

                  {/* Additional Info */}
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Duration
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {bookingDetails?.no_of_days || 0} day(s)
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Service Provider
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {company?.name || 'N/A'}
                      </Typography>
                    </Grid>
                  </Grid>

                  {bookingDetails?.instructions && bookingDetails.instructions !== 'N/A' && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Special Instructions
                      </Typography>
                      <Typography variant="body2" sx={{
                        bgcolor: '#f5f5f5',
                        p: 2,
                        borderRadius: 1,
                        mt: 1,
                        fontStyle: 'italic'
                      }}>
                        {bookingDetails.instructions}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Payment Information */}
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', borderRadius: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Avatar sx={{ bgcolor: '#ffc107', width: 40, height: 40 }}>
                      <PaymentIcon />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Payment Details
                    </Typography>
                  </Box>

                  <Box sx={{ space: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Amount
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {formatCurrency(payment?.amount)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Admin Charges
                      </Typography>
                      <Typography variant="body1">
                        {formatCurrency(payment?.admin_charges)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Extra Charges
                      </Typography>
                      <Typography variant="body1">
                        {formatCurrency(payment?.extra_charges)}
                      </Typography>
                    </Box>

                    {payment?.discount && parseFloat(payment.discount) > 0 && (
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Discount
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'success.main' }}>
                          -{formatCurrency(payment.discount)}
                        </Typography>
                      </Box>
                    )}

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Total Amount
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        {formatCurrency(
                          (parseFloat(payment?.amount || 0) +
                            parseFloat(payment?.admin_charges || 0) +
                            parseFloat(payment?.extra_charges || 0)) -
                          parseFloat(payment?.discount || 0)
                        )}
                      </Typography>
                    </Box>

                    {payment?.transaction_id && (
                      <Box sx={{ mt: 2, p: 2, bgcolor: '#f8f9fa', borderRadius: 1 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                          Transaction ID
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                          {payment.transaction_id}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ p: 3, bgcolor: 'white', borderTop: '1px solid #e0e0e0' }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ px: 4, py: 1.5, borderRadius: 2 }}
        >
          Close
        </Button>
        <Button
          variant="contained"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            bgcolor: '#ffc107',
            '&:hover': { bgcolor: '#e0a800' }
          }}
          onClick={() => {
            // TODO: Implement print functionality
            window.print();
          }}
        >
          Print Details
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingDetailsModal;
