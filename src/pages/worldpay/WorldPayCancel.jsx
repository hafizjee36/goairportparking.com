import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import { Cancel as CancelIcon, Home as HomeIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import theme from '../../theme';
import PageWrapper from '../../components/reusable/PageWrapper';

const WorldPayCancel = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get URL parameters (matching Next.js implementation)
  const bookingReference = searchParams.get('bookingReference');
  const referenceNo = searchParams.get('reference_no');
  
  // Component state
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    // Try to get booking data from session storage
    const storedBookingData = sessionStorage.getItem('booking_data');
    if (storedBookingData) {
      try {
        const parsedData = JSON.parse(storedBookingData);
        setBookingData(parsedData);
      } catch (error) {
        console.error('Error parsing stored booking data:', error);
      }
    }
  }, []);

  const handleRetryPayment = () => {
    // Navigate back to payment page with booking data intact
    navigate('/payment');
  };

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      <PageWrapper>
        <Container maxWidth="md" sx={{ py: 8 }}>
          {/* Cancel Header */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <CancelIcon sx={{ fontSize: 100, color: 'warning.main', mb: 2 }} />
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 800, color: 'warning.main' }}>
              Payment Cancelled
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              Your payment was cancelled. No charges have been made to your account.
            </Typography>
          </Box>

          <Card elevation={3} sx={{ mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                What happened?
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                You cancelled the payment process before it was completed. Your booking has not been confirmed 
                and no payment has been processed.
              </Typography>

              {bookingReference && (
                <Alert severity="info" sx={{ mb: 3 }}>
                  <Typography variant="body2">
                    <strong>Your Booking Reference:</strong> {bookingReference}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Your booking details are still saved. You can try the payment again.
                  </Typography>
                </Alert>
              )}

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                What would you like to do?
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<RefreshIcon />}
                  onClick={handleRetryPayment}
                  sx={{ flexGrow: 1, minWidth: 200 }}
                >
                  Try Payment Again
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<HomeIcon />}
                  onClick={() => navigate('/')}
                  sx={{ flexGrow: 1, minWidth: 200 }}
                >
                  Back to Home
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card elevation={1}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Need Help?
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                If you're experiencing issues with the payment process or need assistance, 
                our support team is here to help.
              </Typography>
              <Button
                variant="text"
                onClick={() => navigate('/contact-us')}
                color="primary"
              >
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </Container>
      </PageWrapper>
    </Box>
  );
};

export default WorldPayCancel;

