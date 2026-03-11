import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography,
  Alert,
  CircularProgress,
  Container 
} from '@mui/material';
import { CheckCircle as CheckIcon } from '@mui/icons-material';
import apiCall from '../../services/apiService';
import { apiKey } from '../../common/config/api';
import theme from '../../theme';
import ConfirmWithSummary from './components/ConfirmWithSummary';

const BookingConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get URL parameters
  const multiModeReferenceNo = searchParams.get('bookingReference');
  const referenceNo = searchParams.get('reference_no');
  const transactionId = searchParams.get('transactionID');
  const paymentIntent = searchParams.get('payment_intent');
  const paymentMethod = searchParams.get('paymentMethod') || 'worldpay';
  const emailPayment = searchParams.get('email_payment');
  const apiTag = searchParams.get('api_tag');
  const trafficSource = searchParams.get('traffic_source');
  
  // Component state
  const [booking, setBooking] = useState({});
  const [state, setState] = useState('loading');
  const [error, setError] = useState('');
  
  useEffect(() => {
    const updatePaymentStatus = async () => {
      console.log('🏁 BookingConfirm: Starting payment update process...');
      console.log('📋 BookingConfirm: URL Parameters:', {
        multiModeReferenceNo,
        referenceNo,
        transactionId,
        paymentIntent,
        paymentMethod,
        emailPayment,
        apiTag
      });
      
      setState('loading');
      setError('');
      
      if (!multiModeReferenceNo && !referenceNo) {
        console.error('❌ BookingConfirm: Missing booking reference');
        setError('Missing booking reference. Please contact support.');
        setState('error');
        return;
      }
      
      try {
        const paymentUpdatePayload = {
          key: apiKey,
          multi_mode_reference_no: multiModeReferenceNo,
          reference_no: referenceNo?.split(',') || [],
          transaction_id: transactionId,
          payment_intent: paymentIntent,
          payment_type: paymentMethod,
          api_tag: apiTag,
          email_payment: emailPayment,
          traffic_source: trafficSource || '',
        };
        
        console.log('📦 BookingConfirm: /payments/update payload:', paymentUpdatePayload);
        console.log('🔄 BookingConfirm: Calling /payments/update API...');
        
        // Update payment status in the backend
        const responseBooking = await apiCall(
          'post',
          '/payments/update',
          paymentUpdatePayload,
          {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          location.pathname
        );
        
        console.log('📋 BookingConfirm: /payments/update response:', responseBooking);
        
        if (responseBooking?.success) {
          console.log('✅ BookingConfirm: Payment update successful');
          setState('success');
          setBooking(responseBooking);
          
          // Clear any stored booking data since payment is complete
          if (typeof sessionStorage !== 'undefined') {
            sessionStorage.removeItem('booking_data');
            sessionStorage.removeItem('booking_details');
            sessionStorage.removeItem('worldpay_session');
            console.log('🧹 BookingConfirm: Cleared session storage');
          }
        } else {
          console.error('❌ BookingConfirm: Payment update failed:', responseBooking);
          throw new Error(responseBooking?.message || 'Failed to confirm booking');
        }
      } catch (error) {
        console.error('❌ BookingConfirm: Payment update error:', error);
        setError(error.message || 'Failed to confirm your booking. Please contact support.');
        setState('error');
      }
    };
    
    // Only run if we have the required parameters
    if (multiModeReferenceNo || referenceNo) {
      updatePaymentStatus();
    } else {
      // Try to get booking data from session storage
      const storedBookingData = sessionStorage.getItem('booking_data');
      if (storedBookingData) {
        const bookingData = JSON.parse(storedBookingData);
        if (bookingData.multiModeReferenceNo) {
          // Redirect with proper parameters
          navigate(`/booking-confirmation?bookingReference=${bookingData.multiModeReferenceNo}&reference_no=${bookingData.referenceNo}`, { replace: true });
        } else {
          setError('No booking reference found. Please contact support.');
          setState('error');
        }
      } else {
        setError('No booking information found. Please contact support.');
        setState('error');
      }
    }
  }, [multiModeReferenceNo, referenceNo, transactionId, paymentIntent, paymentMethod, apiTag, emailPayment, location.pathname, navigate]);

  // Loading state
  if (state === 'loading') {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} sx={{ mb: 3 }} />
        <Typography variant="h5" gutterBottom>
          Confirming your booking...
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Please wait while we process your payment and confirm your booking.
        </Typography>
      </Container>
    );
  }

  // Error state
  if (state === 'error') {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          icon={<CheckIcon />}
        >
          <Typography variant="h6" gutterBottom>
            Booking Confirmation Error
          </Typography>
          <Typography variant="body2">
            {error}
          </Typography>
        </Alert>
        
        <Box textAlign="center" mt={4}>
          <Typography variant="body2" color="text.secondary">
            If you continue to experience issues, please contact our support team.
          </Typography>
        </Box>
      </Container>
    );
  }

  // Success state with booking details
  return (
    <Box 
      sx={{ 
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        py: 4
      }}
    >
      <Container maxWidth="lg">
        {booking?.data?.length > 0 ? (
          <ConfirmWithSummary 
            bookingDetails={booking.data}
            multiModeReferenceNo={multiModeReferenceNo}
            referenceNo={referenceNo}
          />
        ) : (
          <Box textAlign="center" py={8}>
            <CircularProgress size={60} sx={{ mb: 3 }} />
            <Typography variant="h6">
              Loading booking details...
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default BookingConfirm;

