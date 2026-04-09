import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Alert,
  Divider,
  Grid,
} from '@mui/material';
import {
  Error as ErrorIcon,
  Home as HomeIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Refresh as RefreshIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

const BookingError = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get URL parameters (matching Next.js implementation)
  const multiModeReferenceNo = searchParams.get('multi_mode_reference_no') || searchParams.get('bookingReference');
  const referenceNo = searchParams.get('reference_no');
  const transactionID = searchParams.get('transactionID');
  const paymentMethod = searchParams.get('paymentMethod');
  const error = searchParams.get('error');

  // Component state
  const [bookingData, setBookingData] = useState(null);

  // Load booking data from session storage
  useEffect(() => {
    const loadBookingData = () => {
      try {
        // Try to get booking data from session storage
        const storedBookingData = sessionStorage.getItem('booking_data');
        const storedBookingDetails = sessionStorage.getItem('booking_details');
        
        let data = null;
        
        if (storedBookingData) {
          data = JSON.parse(storedBookingData);
        } else if (storedBookingDetails) {
          data = JSON.parse(storedBookingDetails);
        }
        
        if (data) {
          setBookingData({
            ...data,
            // Override with URL parameters if available
            multiModeReferenceNo: multiModeReferenceNo || data.multiModeReferenceNo,
            referenceNo: referenceNo || data.referenceNo,
            transactionID: transactionID || data.transactionID,
            paymentMethod: paymentMethod || data.paymentMethod || 'Worldpay',
          });
        }
      } catch (error) {
        console.error('Error loading booking data:', error);
      }
    };

    loadBookingData();
  }, [multiModeReferenceNo, referenceNo, transactionID, paymentMethod]);

  // Handle retry payment
  const handleRetryPayment = () => {
    // Navigate back to booking page with existing parameters
    const params = new URLSearchParams(searchParams);
    params.delete('error'); // Remove error parameter
    navigate(`/booking?${params.toString()}`);
  };

  // Get error message based on error type
  const getErrorMessage = () => {
    switch (error) {
      case 'payment_failed':
        return 'Your payment was declined. Please check your payment details and try again.';
      case 'payment_cancelled':
        return 'You cancelled the payment process. Your booking has not been confirmed.';
      case 'session_expired':
        return 'Your payment session has expired. Please try again.';
      case 'insufficient_funds':
        return 'Your payment was declined due to insufficient funds. Please try a different payment method.';
      case 'card_declined':
        return 'Your card was declined. Please check your card details or try a different card.';
      case 'invalid_card':
        return 'The card details you entered are invalid. Please check and try again.';
      case 'network_error':
        return 'There was a network error during payment processing. Please try again.';
      default:
        return 'We encountered an issue while processing your payment. Please try again or contact support.';
    }
  };

  // Get error severity
  const getErrorSeverity = () => {
    switch (error) {
      case 'payment_cancelled':
        return 'warning';
      case 'session_expired':
        return 'info';
      default:
        return 'error';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Error Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <ErrorIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
        <Typography variant="h3" gutterBottom sx={{ color: 'error.main', fontWeight: 600 }}>
          Payment {error === 'payment_cancelled' ? 'Cancelled' : 'Failed'}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          {error === 'payment_cancelled' 
            ? 'Your payment was cancelled and no charges were made.'
            : 'We were unable to process your payment at this time.'
          }
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Error Details */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <WarningIcon color="warning" />
                What Happened?
              </Typography>
              
              <Alert severity={getErrorSeverity()} sx={{ my: 3 }}>
                <Typography variant="body1">
                  {getErrorMessage()}
                </Typography>
              </Alert>

              {/* Booking Information (if available) */}
              {(multiModeReferenceNo || referenceNo) && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Typography variant="h6" gutterBottom>
                    Booking Information
                  </Typography>
                  <Grid container spacing={2}>
                    {multiModeReferenceNo && (
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Booking Reference
                        </Typography>
                        <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                          {multiModeReferenceNo}
                        </Typography>
                      </Grid>
                    )}
                    
                    {referenceNo && (
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Reference Number
                        </Typography>
                        <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                          {referenceNo}
                        </Typography>
                      </Grid>
                    )}

                    {paymentMethod && (
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Payment Method
                        </Typography>
                        <Typography variant="body1">
                          {paymentMethod}
                        </Typography>
                      </Grid>
                    )}

                    {transactionID && (
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Transaction ID
                        </Typography>
                        <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                          {transactionID}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </>
              )}

              {/* Service Details (if available) */}
              {bookingData?.selectedProduct && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Typography variant="h6" gutterBottom>
                    Service Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Service Type
                      </Typography>
                      <Typography variant="body1">
                        {bookingData.selectedProduct.type || 'Airport Parking'}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Airport
                      </Typography>
                      <Typography variant="body1">
                        {bookingData.searchData?.airport || 'Not specified'}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Total Amount
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        £{(bookingData.totalAmount || 0).toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              )}

              {/* Next Steps */}
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom>
                What Can You Do?
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <li>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Try Again:</strong> Click the "Retry Payment" button to attempt the payment again
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Check Payment Details:</strong> Ensure your card details, billing address, and available balance are correct
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Try Different Payment Method:</strong> Use a different card or payment method
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Contact Your Bank:</strong> If the issue persists, contact your bank to ensure there are no blocks on your card
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    <strong>Get Help:</strong> Contact our support team if you continue to experience issues
                  </Typography>
                </li>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Action Buttons & Contact Info */}
        <Grid item xs={12} md={4}>
          {/* Action Buttons */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Try Again
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                You can retry your payment or start over with a new booking.
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleRetryPayment}
                  startIcon={<RefreshIcon />}
                  color="primary"
                >
                  Retry Payment
                </Button>
                
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate('/')}
                  startIcon={<HomeIcon />}
                >
                  Start Over
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon color="primary" />
                Need Help?
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                If you're having trouble with your payment, our support team is here to help.
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Email:</strong> support@airportparking.com
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Phone:</strong> +44 123 456 7890
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>Hours:</strong> 24/7 Support Available
              </Typography>
              
              {multiModeReferenceNo && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  <Typography variant="caption">
                    <strong>Reference:</strong> {multiModeReferenceNo}
                    <br />
                    Please mention this reference when contacting support.
                  </Typography>
                </Alert>
              )}
              
              <Button
                variant="outlined"
                fullWidth
                component={Link}
                to="/contact-us"
                startIcon={<EmailIcon />}
                sx={{ mt: 2 }}
              >
                Contact Support
              </Button>
            </CardContent>
          </Card>

          {/* Security Information */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Payment Security
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Your payment information is secure and protected.
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, fontSize: '0.875rem' }}>
                • Your card details are encrypted and secure
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, fontSize: '0.875rem' }}>
                • No charges were made to your account
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, fontSize: '0.875rem' }}>
                • Your booking slot is temporarily held
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                • All payment data is processed securely
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* FAQ Section */}
      <Card sx={{ mt: 4, bgcolor: '#f8f9fa' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Frequently Asked Questions
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Will I be charged if the payment failed?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No, if your payment failed, no charges were made to your account. You may see a temporary authorization 
              which will be automatically released by your bank within 1-3 business days.
            </Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              How long is my booking held?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your booking slot is temporarily reserved for 15 minutes to allow you to complete the payment. 
              After this time, the reservation will be released.
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              What should I do if my card keeps getting declined?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Contact your bank to ensure there are no blocks on your card for online transactions. 
              Also, verify that your billing address matches the address on file with your bank.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BookingError;
