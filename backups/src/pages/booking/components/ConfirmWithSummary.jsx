import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  Chip,
  Alert,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  DirectionsCar as CarIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material';
import calculateTotalBookingAmount from '../../../utils/calculateTotalBookingAmount';
import { formatPrice } from '../../../utils/calculateTotalBookingAmount';
import theme from '../../../theme';
import BookingSummaryCard from './BookingSummaryCard';

const ConfirmWithSummary = ({ 
  bookingDetails, 
  multiModeReferenceNo, 
  referenceNo 
}) => {
  const navigate = useNavigate();

  if (!bookingDetails || bookingDetails.length === 0) {
    return (
      <Alert severity="warning">
        No booking details found. Please contact support.
      </Alert>
    );
  }

  const totalPrice = calculateTotalBookingAmount(bookingDetails);
  const mainBooking = bookingDetails[0];
  const displayReferenceNo = mainBooking?.third_party_reference || multiModeReferenceNo || referenceNo;

  const handleNewBooking = () => {
    // Clear any remaining session data
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.clear();
    }
    navigate('/');
  };

  const handlePrintBooking = () => {
    window.print();
  };

  return (
    <Box>
      {/* Success Header */}
      <Paper 
        elevation={3}
        sx={{ 
          p: 4, 
          mb: 4, 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
          color: 'white'
        }}
      >
        <CheckIcon sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Booking Confirmed!
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          Your parking has been successfully booked
        </Typography>
        
        <Box 
          sx={{ 
            mt: 3, 
            p: 2, 
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: 2,
            display: 'inline-block'
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
            Booking Reference
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {displayReferenceNo}
          </Typography>
        </Box>
      </Paper>

      {/* Confirmation Alert */}
      <Alert 
        severity="success" 
        icon={<EmailIcon />}
        sx={{ mb: 4 }}
      >
        <Typography variant="h6" gutterBottom>
          Confirmation Email Sent
        </Typography>
        <Typography variant="body2">
          A confirmation email with all your booking details has been sent to{' '}
          <strong>{mainBooking?.customer?.email || mainBooking?.email}</strong>
        </Typography>
      </Alert>

      <Grid container spacing={4}>
        {/* Booking Details */}
        <Grid item xs={12} md={8}>
          {bookingDetails.map((booking, index) => (
            <BookingSummaryCard 
              key={booking.id || index}
              bookingDetails={booking}
              isConfirmationPage={true}
            />
          ))}

          {/* Important Information */}
          <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom color="primary.main">
              Important Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <PhoneIcon color="primary" />
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Contact Number
                    </Typography>
                    <Typography variant="body2">
                      {mainBooking?.customer?.contact_no || mainBooking?.contact_no}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <LocationIcon color="primary" />
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Terminal
                    </Typography>
                    <Typography variant="body2">
                      {mainBooking?.departure_terminal || 'To be confirmed'}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12}>
                <Alert severity="info" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    Please arrive at the car park at least 30 minutes before your departure time.
                    Bring a printed copy of this confirmation or have it ready on your mobile device.
                  </Typography>
                </Alert>
              </Grid>
            </Grid>
          </Paper>

          {/* Terms and Conditions */}
          {mainBooking?.booking_details?.[0]?.company?.terms_conditions && (
            <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom color="primary.main">
                Terms & Conditions
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box 
                sx={{ 
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: 'text.secondary',
                  '& p': { mb: 1 },
                  '& ul': { pl: 2 },
                  '& li': { mb: 0.5 }
                }}
                dangerouslySetInnerHTML={{
                  __html: mainBooking.booking_details[0].company.terms_conditions
                }}
              />
            </Paper>
          )}
        </Grid>

        {/* Summary Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Booking Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {/* Price Breakdown */}
            <Box mb={3}>
              {bookingDetails.map((booking, index) => (
                <Box key={index} mb={2}>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">
                      Parking Service
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {formatPrice(booking.amount)}
                    </Typography>
                  </Box>
                  
                  {booking.admin_charges && parseFloat(booking.admin_charges) > 0 && (
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2" color="text.secondary">
                        Booking Fee
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatPrice(booking.admin_charges)}
                      </Typography>
                    </Box>
                  )}
                  
                  {booking.cancellation_status === '1' && booking.cancellation_charges && (
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2" color="text.secondary">
                        Cancellation Protection
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatPrice(booking.cancellation_charges)}
                      </Typography>
                    </Box>
                  )}
                  
                  {booking.sms_confirmation === '1' && booking.sms_charges && (
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2" color="text.secondary">
                        SMS Updates
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatPrice(booking.sms_charges)}
                      </Typography>
                    </Box>
                  )}
                  
                  {booking.discount_amount && parseFloat(booking.discount_amount) > 0 && (
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2" color="success.main">
                        Discount
                      </Typography>
                      <Typography variant="body2" color="success.main">
                        -{formatPrice(booking.discount_amount)}
                      </Typography>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            {/* Total */}
            <Box 
              display="flex" 
              justifyContent="space-between" 
              alignItems="center"
              sx={{
                p: 2,
                backgroundColor: theme.palette.primary.main,
                color: 'white',
                borderRadius: 2,
                mb: 3
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Total Amount
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {formatPrice(totalPrice)}
              </Typography>
            </Box>

            {/* Action Buttons */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<CarIcon />}
                  onClick={handleNewBooking}
                  sx={{ mb: 2 }}
                >
                  Book Another Parking
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<ReceiptIcon />}
                  onClick={handlePrintBooking}
                >
                  Print Confirmation
                </Button>
              </Grid>
            </Grid>

            {/* Contact Support */}
            <Box 
              sx={{ 
                mt: 3, 
                p: 2, 
                backgroundColor: theme.palette.grey[50],
                borderRadius: 2,
                textAlign: 'center'
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                Need Help?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Contact our customer service team if you have any questions about your booking.
              </Typography>
              <Button 
                size="small" 
                variant="text" 
                sx={{ mt: 1 }}
                onClick={() => navigate('/contact')}
              >
                Contact Support
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConfirmWithSummary;

