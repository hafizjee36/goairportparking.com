import React, { useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Divider,
  Chip,
  Button
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import SmsIcon from '@mui/icons-material/Sms';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import PageWrapper from '../../components/reusable/PageWrapper';
import theme from '../../theme/index';
import { setConfirmationDetails } from '../../redux/slice/paymentSlice';
import { worldPayService } from '../../services/worldpayService';
import { bookingService, notificationService } from '../../services/apiService';

// Animation components
import AnimateOnScroll from '../../components/reusable/AnimateOnScroll';
import { EASE_SOFT, THRESHOLD, ROOT_MARGIN, smoothStyle } from '../../components/utils/animation';

const BASE = 60;
const STEP = 90;

const BookingConfirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const { 
    bookingData, 
    personalData, 
    vehicleData, 
    selectedParking, 
    bookingOptions,
    ui 
  } = useSelector((state) => state.payment);

  const sessionKey = searchParams.get('sessionKey');
  const orderCode = searchParams.get('orderCode');
  const paymentStatus = searchParams.get('paymentStatus');

  useEffect(() => {
    const handlePaymentReturn = async () => {
      if (sessionKey && !bookingData.referenceNo) {
        try {
          // Verify payment with WorldPay
          const paymentResult = await worldPayService.handlePaymentReturn(sessionKey, {
            orderCode,
            paymentStatus
          });

          if (paymentResult.success) {
            // Create booking in backend
            const bookingResult = await bookingService.createBooking({
              personalData,
              vehicleData,
              parkingDetails: selectedParking,
              bookingOptions,
              paymentData: {
                transactionId: paymentResult.transactionId,
                paymentMethod: 'WorldPay',
                amount: selectedParking.totalPrice,
                status: 'completed'
              }
            });

            if (bookingResult.success) {
              // Update confirmation details
              dispatch(setConfirmationDetails({
                bookingReference: bookingResult.data.referenceNumber,
                confirmationNumber: bookingResult.data.confirmationNumber,
                totalPaid: selectedParking.totalPrice,
                paymentMethod: 'WorldPay'
              }));

              // Send confirmation notifications if enabled
              if (bookingOptions.emailNotifications) {
                await notificationService.sendBookingConfirmation(bookingResult.data.id);
              }

              if (bookingOptions.smsUpdates && personalData.phone) {
                await notificationService.sendSMSNotification(
                  personalData.phone,
                  `Booking confirmed! Reference: ${bookingResult.data.referenceNumber}`
                );
              }
            }
          } else {
            // Payment failed - redirect to payment page with error
            navigate('/payment?error=payment_failed');
          }
        } catch (error) {
          console.error('Error processing booking confirmation:', error);
          navigate('/payment?error=booking_failed');
        }
      }
    };

    handlePaymentReturn();
  }, [sessionKey, bookingData.referenceNo, dispatch, navigate]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!bookingData.referenceNo && sessionKey) {
    return (
      <PageWrapper>
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          minHeight="50vh"
        >
          <Typography variant="h6">Processing your booking confirmation...</Typography>
        </Box>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Box sx={{ py: 4 }}>
        <AnimateOnScroll
          type="slide-up"
          distance={20}
          duration={800}
          delay={BASE}
          easingTransform={EASE_SOFT}
          easingOpacity={EASE_SOFT}
          threshold={THRESHOLD}
          rootMargin={ROOT_MARGIN}
          once
          style={smoothStyle}
        >
          {/* Success Header */}
          <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            mb={4}
            textAlign="center"
          >
            <CheckCircleIcon 
              sx={{ 
                fontSize: 80, 
                color: 'success.main', 
                mb: 2 
              }} 
            />
            <Typography variant="h3" fontWeight={700} color="success.main" gutterBottom>
              Booking Confirmed!
            </Typography>
            <Typography variant="h6" color="text.secondary" mb={2}>
              Your parking reservation has been successfully created
            </Typography>
            <Chip
              label={`Reference: ${bookingData.referenceNo}`}
              color="success"
              variant="outlined"
              sx={{ fontSize: '1rem', px: 2, py: 1 }}
            />
          </Box>
        </AnimateOnScroll>

        <Grid container spacing={4}>
          {/* Booking Details */}
          <Grid item xs={12} md={8}>
            <AnimateOnScroll
              type="slide-up"
              distance={15}
              duration={700}
              delay={BASE + STEP}
              easingTransform={EASE_SOFT}
              easingOpacity={EASE_SOFT}
              threshold={THRESHOLD}
              rootMargin={ROOT_MARGIN}
              once
              style={smoothStyle}
            >
              <Card sx={{ mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    Booking Details
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Grid container spacing={3}>
                    {/* Parking Information */}
                    <Grid item xs={12} sm={6}>
                      <Box display="flex" alignItems="center" mb={2}>
                        <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="h6">Parking Location</Typography>
                      </Box>
                      <Typography variant="body1" fontWeight={500}>
                        {selectedParking.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedParking.category}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Airport: {selectedParking.airportCode}
                      </Typography>
                    </Grid>

                    {/* Dates */}
                    <Grid item xs={12} sm={6}>
                      <Box display="flex" alignItems="center" mb={2}>
                        <CalendarTodayIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="h6">Dates</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Drop-off:</strong> {formatDate(bookingOptions.departureDate)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Pick-up:</strong> {formatDate(bookingOptions.returnDate)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Duration:</strong> {bookingOptions.duration} days
                      </Typography>
                    </Grid>

                    {/* Vehicle Information */}
                    <Grid item xs={12} sm={6}>
                      <Box display="flex" alignItems="center" mb={2}>
                        <DirectionsCarIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="h6">Vehicle Details</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        <strong>License Plate:</strong> {vehicleData.licensePlate}
                      </Typography>
                      {vehicleData.vehicleMake && (
                        <Typography variant="body2" color="text.secondary">
                          <strong>Make:</strong> {vehicleData.vehicleMake}
                        </Typography>
                      )}
                      {vehicleData.vehicleModel && (
                        <Typography variant="body2" color="text.secondary">
                          <strong>Model:</strong> {vehicleData.vehicleModel}
                        </Typography>
                      )}
                      {vehicleData.vehicleColor && (
                        <Typography variant="body2" color="text.secondary">
                          <strong>Color:</strong> {vehicleData.vehicleColor}
                        </Typography>
                      )}
                    </Grid>

                    {/* Customer Information */}
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" gutterBottom>
                        Customer Details
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Name:</strong> {personalData.title} {personalData.firstName} {personalData.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Email:</strong> {personalData.email}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Phone:</strong> {personalData.phone}
                      </Typography>
                      {personalData.inboundFlight && (
                        <Typography variant="body2" color="text.secondary">
                          <strong>Inbound Flight:</strong> {personalData.inboundFlight}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </AnimateOnScroll>

            {/* Notifications Settings */}
            <AnimateOnScroll
              type="slide-up"
              distance={15}
              duration={700}
              delay={BASE + STEP * 2}
              easingTransform={EASE_SOFT}
              easingOpacity={EASE_SOFT}
              threshold={THRESHOLD}
              rootMargin={ROOT_MARGIN}
              once
              style={smoothStyle}
            >
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Notifications
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Box display="flex" alignItems="center" mb={1}>
                    <EmailIcon sx={{ mr: 1, color: bookingOptions.emailNotifications ? 'success.main' : 'text.secondary' }} />
                    <Typography variant="body2">
                      Email confirmation: {bookingOptions.emailNotifications ? 'Enabled' : 'Disabled'}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" alignItems="center">
                    <SmsIcon sx={{ mr: 1, color: bookingOptions.smsUpdates ? 'success.main' : 'text.secondary' }} />
                    <Typography variant="body2">
                      SMS updates: {bookingOptions.smsUpdates ? 'Enabled' : 'Disabled'}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          </Grid>

          {/* Payment Summary */}
          <Grid item xs={12} md={4}>
            <AnimateOnScroll
              type="slide-up"
              distance={15}
              duration={700}
              delay={BASE + STEP * 1.5}
              easingTransform={EASE_SOFT}
              easingOpacity={EASE_SOFT}
              threshold={THRESHOLD}
              rootMargin={ROOT_MARGIN}
              once
              style={smoothStyle}
            >
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Payment Summary
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Parking Fee:</Typography>
                    <Typography variant="body2">£{bookingOptions.basePrice.toFixed(2)}</Typography>
                  </Box>
                  
                  {selectedParking.adminCharges > 0 && (
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2">Admin Charges:</Typography>
                      <Typography variant="body2">£{selectedParking.adminCharges.toFixed(2)}</Typography>
                    </Box>
                  )}
                  
                  {bookingOptions.cancellationProtection && selectedParking.cancellationCharges > 0 && (
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2">Cancellation Protection:</Typography>
                      <Typography variant="body2">£{selectedParking.cancellationCharges.toFixed(2)}</Typography>
                    </Box>
                  )}
                  
                  {bookingOptions.smsUpdates && selectedParking.smsCharges > 0 && (
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2">SMS Updates:</Typography>
                      <Typography variant="body2">£{selectedParking.smsCharges.toFixed(2)}</Typography>
                    </Box>
                  )}
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography variant="h6" fontWeight={600}>Total Paid:</Typography>
                    <Typography variant="h6" fontWeight={600} color="success.main">
                      £{(bookingData.totalPaid || selectedParking.totalPrice || 0).toFixed(2)}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary">
                    Payment Method: {bookingData.paymentMethod || 'WorldPay'}
                  </Typography>
                  
                  {bookingData.confirmationNumber && (
                    <Typography variant="body2" color="text.secondary">
                      Confirmation: {bookingData.confirmationNumber}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </AnimateOnScroll>

            {/* Action Buttons */}
            <AnimateOnScroll
              type="slide-up"
              distance={15}
              duration={700}
              delay={BASE + STEP * 2.5}
              easingTransform={EASE_SOFT}
              easingOpacity={EASE_SOFT}
              threshold={THRESHOLD}
              rootMargin={ROOT_MARGIN}
              once
              style={smoothStyle}
            >
              <Box mt={3}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate('/my-bookings')}
                  sx={{ mb: 2 }}
                >
                  View My Bookings
                </Button>
                
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate('/')}
                >
                  Back to Home
                </Button>
              </Box>
            </AnimateOnScroll>
          </Grid>
        </Grid>
      </Box>
    </PageWrapper>
  );
};

export default BookingConfirmation;
