import React, { useState, useEffect, useRef } from 'react';
import CryptoJS from 'crypto-js';
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
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  setPaymentProcessing,
  setPaymentError,
  setBookingInProgress,
  clearBookingError,
} from '../../redux/slice/paymentSlice';
import theme from '../../theme';

const TrustPaymentForm = ({
  onValidate,
  personalData,
  vehicleData,
  bookingOptions,
  selectedProduct,
  searchData,
  totalAmount,
  multimode,
  referenceNo,
  onBookingSync,
  airport,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ui } = useSelector((state) => state.payment);

  const [localState, setLocalState] = useState('initial');
  const [localError, setLocalError] = useState('');
  const [formReady, setFormReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  // Hardcoded test credentials from provided PHP
  const SITE_KEY = '59-06864b7484aafe5568a83cbf42905d03838c4842cd42fd95a7a5be9d229fa9f5';
  const SITEREFERENCE = 'test_goairportp149005'; // test_goairportp149005, goairportp149006
  const CURRENCY = 'GBP'; // Hardcoded per form; make dynamic if needed

  // Dynamic currency based on airport (fallback to form's EURO)
  const getCurrencyIso = () => {
    if (airport === 'DUB') return 'EURO';
    if (airport === 'DXB') return 'AED'; // Note: form expects ISO3A, AED supported?
    return CURRENCY; // Default EURO as per form
  };

  const currencyIso3a = getCurrencyIso();
  const mainAmount = parseFloat(totalAmount || 0).toFixed(2);

  // Generate SecureTrading timestamp matching PHP date('Y-m-d H:i:s')
  const getSiteSecurityTimestamp = () => {
    const now = new Date();
    return now.getFullYear() + '-' +
      String(now.getMonth() + 1).padStart(2, '0') + '-' +
      String(now.getDate()).padStart(2, '0') + ' ' +
      String(now.getHours()).padStart(2, '0') + ':' +
      String(now.getMinutes()).padStart(2, '0') + ':' +
      String(now.getSeconds()).padStart(2, '0');
  };

  const getSiteSecurity = () => {
    const timestamp = getSiteSecurityTimestamp();
    const data = `${SITEREFERENCE}${currencyIso3a}${mainAmount}${timestamp}`;
    return CryptoJS.HmacSHA256(data, SITE_KEY).toString(CryptoJS.enc.Hex);
  };

  const handleTrustPaymentSubmit = async () => {
    console.log('🔵 TrustPayment button clicked');

    // Validate form
    const validationStatus = onValidate ? onValidate() : true;
    if (!validationStatus) {
      toast.error('Please complete all required fields before proceeding.');
      return;
    }

    // Sync booking if needed (get multimode/referenceNo)
    let syncResult = { success: true };
    if (onBookingSync) {
      syncResult = await onBookingSync();
      if (!syncResult.success) {
        toast.error(syncResult.error || 'Booking sync failed');
        return;
      }
    }

    const hasReferences = (multimode || referenceNo?.length > 0) || syncResult.multiModeReference;
    if (!hasReferences) {
      toast.error('Booking not ready. Please wait.');
      return;
    }

    setIsSubmitting(true);
    dispatch(setPaymentProcessing(true));
    dispatch(setBookingInProgress(true));
    setLocalState('loading');

    try {
      // Store booking data for return (sanitized)
      
        const sessionData = {
          personalData: { ...personalData },
          vehicleData: Array.isArray(vehicleData) ? vehicleData.map(v => ({ ...v })) : vehicleData,
          totalAmount: String(totalAmount),
          bookingReference: multimode || syncResult.multiModeReference || '',
          referenceNo: referenceNo || syncResult.referenceNo || '',
          paymentMethod: 'TrustPayment',
        };
        sessionStorage.setItem('booking_data', JSON.stringify(sessionData));
        sessionStorage.setItem('trustpayment_session', JSON.stringify(sessionData));
      console.log('✅ TrustPayment session data stored in booking_data & trustpayment_session');
      

      // Form is ready - trigger submit
      setFormReady(true);
      setTimeout(() => {
        if (formRef.current) {
          formRef.current.submit();
        }
      }, 500);

    } catch (error) {
      console.error('TrustPayment error:', error);
      const errorMsg = error.message || 'Payment initialization failed';
      setLocalError(errorMsg);
      dispatch(setPaymentError(errorMsg));
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
      dispatch(setPaymentProcessing(false));
      dispatch(setBookingInProgress(false));
    }
  };

  const isLoading = isSubmitting || ui.isSubmitting || ui.bookingInProgress || localState === 'loading';
  const hasError = localError || ui.responseError;
  const isButtonDisabled = isLoading || !personalData?.firstName || !personalData?.lastName || !personalData?.email;

  const buildRedirectUrl = (status) => {
    const baseUrl = window.location.origin;
    const path = status === '1' ? 'success' : 'cancel';
    const params = new URLSearchParams({
      status,
      bookingReference: multimode || SITEREFERENCE,
      reference_no: Array.isArray(referenceNo) ? referenceNo.join(',') : referenceNo,
      paymentMethod: 'TrustPayment',
      totalamount: mainAmount,
      currency: currencyIso3a,
      sitereference: SITEREFERENCE,
      transactionID: SITEREFERENCE,
      email_payment: 'true',
      payment_intent: SITEREFERENCE,
    });
    return `${baseUrl}/${path}?${params.toString()}`;
  };

  const timestamp = getSiteSecurityTimestamp();
  const sitesecurity = getSiteSecurity();

  return (
    <Box sx={{ mt: 3 }}>
      {hasError && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => dispatch(clearBookingError())}>
          {hasError}
        </Alert>
      )}

      <Box sx={{ background: '#F9F9F9', p: 3, borderRadius: 2, mb: 3, border: '1px solid #E0E0E0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <SecurityIcon sx={{ fontSize: 24, color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Secure Payment with Trust Payments
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6, color: '#666' }}>
          Processed securely via SecureTrading. You'll be redirected to complete payment.
        </Typography>

        {/* Payment Features */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ color: '#555', mb: 1 }}>✓ 256-bit SSL encryption</Typography>
          <Typography variant="body2" sx={{ color: '#555', mb: 1 }}>✓ PCI DSS compliant</Typography>
          <Typography variant="body2" sx={{ color: '#555', mb: 1 }}>✓ All major cards</Typography>
          <Typography variant="body2" sx={{ color: '#555' }}>✓ 3D Secure</Typography>
        </Box>

        {/* TrustPayment Form */}
        <form
          ref={formRef}
          method="POST"
          action="https://payments.securetrading.net/process/payments/details"
          style={{ display: formReady ? 'block' : 'none' }}
        >
          <input type="hidden" name="sitereference" value={SITEREFERENCE} />
          <input type="hidden" name="currencyiso3a" value={currencyIso3a} />
          <input type="hidden" name="mainamount" value={mainAmount} />
          
          {/* Billing */}
          <input type="hidden" name="billingfirstname" value={personalData?.firstName || 'Jay'} />
          <input type="hidden" name="billinglastname" value={personalData?.lastName || 'Doe'} />
          <input type="hidden" name="billingemail" value={personalData?.email || 'test@email.com'} />
          <input type="hidden" name="strequiredfields" value="billingfirstname" />
          <input type="hidden" name="strequiredfields" value="billinglastname" />
          <input type="hidden" name="strequiredfields" value="billingemail" />
          <input type="hidden" name="billingpremise" value="" />
          <input type="hidden" name="billingstreet" value="" />
          <input type="hidden" name="billingtown" value="" />
          <input type="hidden" name="billingcounty" value="" />
          <input type="hidden" name="billingpostcode" value="" />
          <input type="hidden" name="billingcountryiso2a" value="GB" />
          
          {/* Customer (same as billing for test) */}
          <input type="hidden" name="customerfirstname" value={personalData?.firstName || 'Jay'} />
          <input type="hidden" name="customerlastname" value={personalData?.lastName || 'Doe'} />
          <input type="hidden" name="customerpremise" value="" />
          <input type="hidden" name="customerstreet" value="" />
          <input type="hidden" name="customertown" value="" />
          <input type="hidden" name="customercounty" value="" />
          <input type="hidden" name="customerpostcode" value="" />
          <input type="hidden" name="customercountryiso2a" value="GB" />
          
          {/* Rules & Redirects */}
          <input type="hidden" name="ruleidentifier" value="STR-2" />
          <input type="hidden" name="ruleidentifier" value="STR-3" />
          <input type="hidden" name="ruleidentifier" value="STR-4" />
          <input type="hidden" name="ruleidentifier" value="STR-5" />
          <input type="hidden" name="merchantemail" value="merchant@email.com" />
          <input type="hidden" name="ruleidentifier" value="STR-6" />
          <input type="hidden" name="successfulurlredirect" value={buildRedirectUrl('1')} />
          <input type="hidden" name="ruleidentifier" value="STR-8" />
          <input type="hidden" name="successfulurlnotification" value={buildRedirectUrl('1')} />
          <input type="hidden" name="ruleidentifier" value="STR-9" />
          <input type="hidden" name="declinedurlnotification" value={buildRedirectUrl('2')} />
          
          {/* Security */}
          <input type="hidden" name="version" value="2" />
          <input type="hidden" name="stprofile" value="default" />
          <input type="hidden" name="stdefaultprofile" value="st_cardonly" />
          <input type="hidden" name="sitesecurity" value={sitesecurity} />
          <input type="hidden" name="sitesecuritytimestamp" value={timestamp} />
        </form>

        {/* Pay Button */}
        <Button
          onClick={handleTrustPaymentSubmit}
          disabled={isButtonDisabled}
          fullWidth
          variant="contained"
          size="large"
          startIcon={isLoading ? <CircularProgress size={20} /> : <PaymentIcon />}
          sx={{
            backgroundColor: 'primary.main',
            py: 1.5,
            fontSize: '16px',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': { bgcolor: 'primaryLight.main' },
            '&:disabled': { backgroundColor: '#cccccc', color: '#666' },
          }}
        >
          {isLoading ? 'Processing...' : `Pay ${currencyIso3a === 'EURO' ? '€' : currencyIso3a === 'AED' ? 'AED' : '£'}${mainAmount}`}
        </Button>

        {/* Debug Info (dev only) */}
        {/* {process.env.NODE_ENV === 'development' && (
          <Box sx={{ mt: 2, p: 2, bgcolor: '#f0f0f0', borderRadius: 1, fontSize: '12px' }}>
            <Typography variant="caption">Debug: Ref={SITEREFERENCE}, Amount={mainAmount}, TS={timestamp.slice(0,19)}, HMAC={sitesecurity.slice(0,20)}...</Typography>
            <Typography variant="caption" sx={{ display: 'block' }}>Success URL: {buildRedirectUrl('1').slice(0,60)}...</Typography>
          </Box>
        )} */}
      </Box>

      {/* Security Notice */}
      <Box sx={{ p: 2, borderRadius: 1, bgcolor: '#f8f9fa', border: '1px solid #e9ecef' }}>
        <Typography variant="caption" sx={{ color: '#6c757d', fontSize: '12px' }}>
          <SecurityIcon sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
          Secure processing by Trust Payments (SecureTrading). 256-bit SSL encryption.
        </Typography>
      </Box>
    </Box>
  );
};

export default TrustPaymentForm;

