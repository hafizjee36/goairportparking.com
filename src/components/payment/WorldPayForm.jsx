import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Payment as PaymentIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useWorldPay } from '../../services/worldpayService';
import {
  setPaymentProcessing,
  setPaymentError,
  setBookingInProgress,
  clearBookingError,
} from '../../redux/slice/paymentSlice';
import theme from '../../theme';

// Toast notifications
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WorldPayForm = ({
  onValidate,
  personalData,
  vehicleData,
  bookingOptions,
  selectedProduct,
  searchData,
  totalAmount,
  multimode,
  referenceNo,
}) => {
  const dispatch = useDispatch();
  const { ui } = useSelector((state) => state.payment);
  
  const {
    loading: worldPayLoading,
    error: worldPayError,
    sessionData,
    initializePayment,
    processPayment,
  } = useWorldPay();

  const [localState, setLocalState] = useState('initial');
  const [localError, setLocalError] = useState('');
  const [worldpaySession, setWorldpaySession] = useState('');
  const [worldpayRedirectUrl, setWorldpayRedirectUrl] = useState('');
  const [responseError, setResponseError] = useState('');

  const handleWorldPaySubmit = async () => {
    console.log('🔵 WorldPay button clicked - Starting payment process');
    
    // Check if booking references exist (from store API response)
    const hasBookingReferences = multimode || (referenceNo && referenceNo.length > 0);
    
    console.log('📋 Current props:', { multimode, referenceNo, totalAmount, hasBookingReferences });
    console.log('👤 Personal data:', personalData);
    console.log('🚗 Vehicle data:', vehicleData);
    
    // Clear any previous errors
    setLocalError('');
    setResponseError('');
    dispatch(clearBookingError());
    console.log('✅ Cleared previous errors');

    // Validate form first
    console.log('🔍 Starting form validation...');
    const validationStatus = onValidate ? onValidate() : true;
    console.log('📝 Validation result:', validationStatus);
    
    if (!validationStatus) {
      console.log('❌ Validation failed - showing error');
      // Show toast errors for validation failures
      toast.error('Please complete all required fields before proceeding.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      setLocalError('Please complete all required fields before proceeding.');
      return;
    }
    
    console.log('✅ Form validation passed - proceeding to payment...');

    try {
      console.log('🟡 Setting loading state and dispatching actions...');
      setLocalState('loading');
      dispatch(setPaymentProcessing(true));
      dispatch(setBookingInProgress(true));
      console.log('✅ Loading state set, calling initializePayment...');

      // Initialize WorldPay payment with booking creation (following Next.js pattern)
      console.log('🔄 Calling initializePayment with data:', {
        personalData: personalData?.firstName + ' ' + personalData?.lastName,
        vehicleCount: vehicleData?.length || 0,
        totalAmount,
        domainUrl: window.location.origin,
      });
      
      const paymentResult = await initializePayment({
        personalData,
        vehicleData,
        bookingOptions,
        selectedProduct,
        searchData,
        totalAmount,
        domainUrl: window.location.origin,
      });
      
      console.log('🔄 Payment result received:', paymentResult);

      if (paymentResult.success) {
        console.log('✅ Payment initialization successful:', paymentResult);
        // Store WorldPay session details (like Next.js)
        setWorldpaySession(paymentResult.sessionId);
        setWorldpayRedirectUrl(paymentResult.redirectUrl);
        setLocalState('success');
        
        // Store session data for return
        sessionStorage.setItem('booking_data', JSON.stringify({
          personalData,
          vehicleData,
          bookingOptions,
          selectedProduct,
          searchData,
          bookingReference: paymentResult.bookingReference,
          multiModeReference: paymentResult.multiModeReference,
          totalAmount,
          sessionId: paymentResult.sessionId,
        }));

        // Redirect to WorldPay payment page (like Next.js)
        if (paymentResult.redirectUrl) {
          window.location.assign(paymentResult.redirectUrl);
        } else {
          await processPayment();
        }
      } else {
        console.log('❌ Payment initialization failed:', paymentResult);
        setLocalState('processedButFailed');
        const errorMessage = paymentResult.error || 'Failed to initialize WorldPay payment';
        console.log('📝 Setting error message:', errorMessage);
        setResponseError(errorMessage);
        setLocalError(errorMessage);
        dispatch(setPaymentError(errorMessage));
        
        // Show error toast
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error('💥 WorldPay payment initialization error:', error);
      console.error('💥 Error stack:', error.stack);
      setLocalState('error');
      const errorMessage = error.message || 'Payment processing failed. Please try again.';
      console.log('📝 Catch block - Setting error message:', errorMessage);
      setResponseError(errorMessage);
      setLocalError(errorMessage);
      dispatch(setPaymentError(errorMessage));
      
      // Show error toast
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } finally {
      console.log('🏁 Payment process finished - cleaning up...');
      dispatch(setPaymentProcessing(false));
      dispatch(setBookingInProgress(false));
    }
  };

  const isLoading = worldPayLoading || ui.isSubmitting || ui.bookingInProgress || localState === 'loading';
  const hasError = worldPayError || localError || ui.responseError || responseError;
  
  // Check if booking references exist (from store API response)
  const hasBookingReferences = multimode || (referenceNo && referenceNo.length > 0);
  
  // Button should be disabled if:
  // 1. Currently loading
  // 2. Missing required personal data
  // 3. No booking references (booking not stored yet)
  const isButtonDisabled = isLoading || !personalData?.firstName || !personalData?.lastName || !personalData?.email || !hasBookingReferences;

  return (
    <Box sx={{ mt: 3 }}>
      {/* Error Display */}
      {hasError && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          onClose={() => {
            setLocalError('');
            dispatch(clearBookingError());
          }}
        >
          {hasError}
        </Alert>
      )}

      {/* WorldPay Payment Section */}
      <Box
        sx={{
          background: '#F9F9F9',
          p: 3,
          borderRadius: 2,
          mb: 3,
          border: '1px solid #E0E0E0',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 2,
          }}
        >
          <SecurityIcon sx={{ fontSize: 24, color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Secure Payment with WorldPay
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{ mb: 3, lineHeight: 1.6, color: '#666' }}
        >
          Your payment will be processed securely through WorldPay. You'll be redirected to WorldPay's secure payment page to complete your transaction.
        </Typography>

        {/* Payment Features */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ color: '#555', mb: 1 }}>
            ✓ 256-bit SSL encryption
          </Typography>
          <Typography variant="body2" sx={{ color: '#555', mb: 1 }}>
            ✓ PCI DSS compliant
          </Typography>
          <Typography variant="body2" sx={{ color: '#555', mb: 1 }}>
            ✓ Supports all major credit and debit cards
          </Typography>
          <Typography variant="body2" sx={{ color: '#555' }}>
            ✓ 3D Secure authentication
          </Typography>
        </Box>

        {/* Booking Status Message */}
        {!hasBookingReferences && (
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              Please complete your personal details and vehicle information. Your booking will be automatically saved, and the payment button will become available.
            </Typography>
          </Alert>
        )}

        {/* Payment Button */}
        <Button
          onClick={handleWorldPaySubmit}
          disabled={isButtonDisabled}
          fullWidth
          variant="contained"
          size="large"
          startIcon={isLoading ? <CircularProgress size={20} /> : <PaymentIcon />}
          title={!personalData?.firstName || !personalData?.lastName || !personalData?.email 
            ? "Please complete all required fields before proceeding" 
            : ""}
          sx={{
            backgroundColor: 'primary.main',
            py: 1.5,
            fontSize: '16px',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': { 
              bgcolor: 'primaryLight.main',
            },
            '&:disabled': { 
              backgroundColor: '#cccccc',
              color: '#666',
            },
          }}
        >
          {isLoading 
            ? (localState === 'loading' ? 'Processing...' : ui.bookingInProgress ? 'Creating Booking...' : 'Preparing Payment...')
            : `Pay By Card`
          }
        </Button>

        {/* Session Info (Development) */}
        {process.env.NODE_ENV === 'development' && (sessionData || worldpaySession) && (
          <Box sx={{ mt: 2, p: 2, bgcolor: '#f0f0f0', borderRadius: 1 }}>
            <Typography variant="caption" sx={{ color: '#666' }}>
              Debug Info: Session ID: {(sessionData?.sessionId || worldpaySession)?.substring(0, 10)}...
            </Typography>
            {worldpayRedirectUrl && (
              <Typography variant="caption" sx={{ color: '#666', display: 'block', mt: 1 }}>
                Redirect URL: {worldpayRedirectUrl?.substring(0, 50)}...
              </Typography>
            )}
          </Box>
        )}
        
        {/* Response Error Display */}
        {responseError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            <Typography variant="body2">
              {responseError}
            </Typography>
          </Alert>
        )}
      </Box>

      {/* Payment Security Info */}
      <Box
        sx={{
          p: 2,
          borderRadius: 1,
          bgcolor: '#f8f9fa',
          border: '1px solid #e9ecef',
        }}
      >
        <Typography variant="caption" sx={{ color: '#6c757d', fontSize: '12px' }}>
          <SecurityIcon sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
          Your card details are processed securely by WorldPay and are not stored on our servers. 
          This transaction is protected by 256-bit SSL encryption.
        </Typography>
      </Box>
    </Box>
  );
};

export default WorldPayForm;

