import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  CircularProgress,
  Typography,
  Alert,
  Button,
} from '@mui/material';
import { CheckCircle as CheckIcon, Error as ErrorIcon } from '@mui/icons-material';
import { fetchWorldpaySessionDetails } from '../../services/worldpayApiService';
import theme from '../../theme';

const WorldPayConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get URL parameters (matching Next.js implementation)
  const bookingReference = searchParams.get('bookingReference');
  const referenceNo = searchParams.get('reference_no');
  const sessionId = searchParams.get('sessionId');
  
  // Component state
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [transactionDetails, setTransactionDetails] = useState(null);

  useEffect(() => {
    const processWorldPayReturn = async () => {
      setStatus('loading');
      setError('');
      
      // Validate required parameters
      if (!bookingReference || !referenceNo) {
        setError('Missing booking reference. Please contact support.');
        setStatus('error');
        return;
      }

      try {
        // Fetch WorldPay session details (like Next.js)
        const response = await fetchWorldpaySessionDetails({
          multi_mode_reference_no: bookingReference,
          reference_no: referenceNo,
          sessionId: sessionId,
        });

        if (response.success) {
          const { data } = response;
          setTransactionDetails(data);
          
          // Determine transaction status
          let transactionState = null;
          let redirectUrl = '';
          
          if (data.status === 'SUCCESS' && data.hostedSessionStatus?.transactionState) {
            transactionState = data.hostedSessionStatus.transactionState;
            
            if (transactionState.transactionState === 'SUCCESS') {
              redirectUrl = 'success';
              setStatus('success');
            } else if (transactionState.transactionState === 'FAILED') {
              redirectUrl = 'error';
              setStatus('failed');
            } else {
              redirectUrl = 'error';
              setStatus('failed');
            }
          } else {
            redirectUrl = 'error';
            setStatus('failed');
          }

          // Clean up session storage
          sessionStorage.removeItem('worldpay_session');
          sessionStorage.removeItem('booking_data');

          // Redirect to success/error page with transaction details
          const redirectParams = new URLSearchParams({
            multi_mode_reference_no: bookingReference,
            reference_no: referenceNo,
            bookingReference: bookingReference,
            transactionID: transactionState?.id || '',
            paymentMethod: 'Worldpay',
          });

          // Small delay to show loading state, then redirect
          setTimeout(() => {
            navigate(`/${redirectUrl}?${redirectParams.toString()}`, { replace: true });
          }, 1000);

        } else {
          throw new Error(response.error || 'Failed to verify payment status');
        }
      } catch (error) {
        console.error('WorldPay confirmation error:', error);
        setError(error.message || 'Something went wrong. Please contact support.');
        setStatus('error');
      }
    };

    // Only process if we have required parameters
    if (bookingReference && referenceNo) {
      processWorldPayReturn();
    } else {
      setError('Invalid payment confirmation URL. Please contact support.');
      setStatus('error');
    }
  }, [bookingReference, referenceNo, sessionId, navigate]);

  // Loading state
  if (status === 'loading') {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} sx={{ mb: 3, color: 'primary.main' }} />
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Processing Your Payment...
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Please wait while we confirm your payment with WorldPay.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This may take a few moments. Please don't close this window.
        </Typography>
        
        {/* Progress indicator */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 1 }}>
          {[1, 2, 3].map((step) => (
            <Box
              key={step}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: step === 1 ? 'primary.main' : '#e0e0e0',
                animation: step === 1 ? 'pulse 1.5s ease-in-out infinite' : 'none',
                '@keyframes pulse': {
                  '0%': { opacity: 1 },
                  '50%': { opacity: 0.5 },
                  '100%': { opacity: 1 },
                },
              }}
            />
          ))}
        </Box>
      </Container>
    );
  }

  // Success state (brief display before redirect)
  if (status === 'success') {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <CheckIcon sx={{ fontSize: 80, color: 'success.main', mb: 3 }} />
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'success.main' }}>
          Payment Successful!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Your booking has been confirmed. Redirecting you to the confirmation page...
        </Typography>
        <CircularProgress size={24} sx={{ color: 'success.main' }} />
      </Container>
    );
  }

  // Error state
  if (status === 'error' || status === 'failed') {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <ErrorIcon sx={{ fontSize: 80, color: 'error.main', mb: 3 }} />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'error.main' }}>
            Payment Confirmation Error
          </Typography>
        </Box>

        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          icon={<ErrorIcon />}
        >
          <Typography variant="h6" gutterBottom>
            Unable to Confirm Payment
          </Typography>
          <Typography variant="body2">
            {error || 'We encountered an issue while confirming your payment status.'}
          </Typography>
        </Alert>
        
        {/* Booking Reference Info */}
        {bookingReference && (
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Your Booking Reference:</strong> {bookingReference}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Please keep this reference number for your records and contact support if needed.
            </Typography>
          </Alert>
        )}

        {/* Action Buttons */}
        <Box sx={{ textAlign: 'center', gap: 2, display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/')}
            sx={{ minWidth: 120 }}
          >
            Back to Home
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/contact-us')}
            sx={{ minWidth: 120 }}
          >
            Contact Support
          </Button>
        </Box>

        {/* Support Information */}
        <Box sx={{ mt: 4, p: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Need Help?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            If you continue to experience issues or if your payment was processed but you're seeing this error,
            please contact our support team with your booking reference: <strong>{bookingReference}</strong>
          </Typography>
        </Box>
      </Container>
    );
  }

  return null;
};

export default WorldPayConfirmation;

