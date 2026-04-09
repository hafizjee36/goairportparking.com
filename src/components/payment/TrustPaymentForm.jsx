import React, { useState, useRef, useMemo } from 'react';
import CryptoJS from 'crypto-js';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { Payment as PaymentIcon, Security as SecurityIcon } from '@mui/icons-material';
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

  const [localError, setLocalError] = useState('');
  const [formReady, setFormReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  // SecureTrading credentials - UPDATE WITH PROD VALUES
  const SITE_KEY = '59-06864b7484aafe5568a83cbf42905d03838c4842cd42fd95a7a5be9d229fa9f5';
  const SITEREFERENCE = 'goairportp149006'; // test_goairportp149005, goairportp149006

  const getSiteReference = () => SITEREFERENCE;
  const getCurrencyIso = () => (airport === 'DUB' ? 'EUR' : 'GBP');
  const currencyIso3a = getCurrencyIso();

  // Ensure consistent amount formatting: keep decimal "1.00" like your PHP example.
  // If provider expects minor units (pence), uncomment the alternative below.
  const mainAmount = useMemo(() => {
    const amt = (parseFloat(totalAmount || 0) || 1.0);
    // const amt = (parseFloat(1.00 || 0) || 1.0);
    return amt.toFixed(2); // "1.00"
    // return String(Math.round(amt * 100)); // use this if provider expects minor units (e.g., 100 for £1)
  }, [totalAmount]);
  // console.log('totalAmount',totalAmount)

  // Timestamp generator matching PHP "Y-m-d H:i:s"
  const getSiteSecurityTimestamp = () => {
    const now = new Date();
    return now.getFullYear() + '-' +
      String(now.getMonth() + 1).padStart(2, '0') + '-' +
      String(now.getDate()).padStart(2, '0') + ' ' +
      String(now.getHours()).padStart(2, '0') + ':' +
      String(now.getMinutes()).padStart(2, '0') + ':' +
      String(now.getSeconds()).padStart(2, '0');
  };

  // HMAC using provided timestamp
  const getSiteSecurity = (timestamp) => {
    const siteRef = getSiteReference();
    const data = `${siteRef}${currencyIso3a}${mainAmount}${timestamp}`;
    const hmac = CryptoJS.HmacSHA256(data, SITE_KEY).toString(CryptoJS.enc.Hex);
    // console.log('🔐 HMAC data:', { data, hmacPreview: hmac.slice(0, 16) + '...' });
    return hmac;
  };

  // compute once per render (will change each render; keeps timestamp/hmac pair consistent)
  const computedTimestamp = useMemo(() => getSiteSecurityTimestamp(), []);
  const sitesecurity = useMemo(() => getSiteSecurity(computedTimestamp), [computedTimestamp]);

  const isLoading = isSubmitting || ui.isSubmitting || ui.bookingInProgress;
  const hasError = localError || ui.responseError;
  const isButtonDisabled = isLoading || !personalData?.firstName || !personalData?.lastName || !personalData?.email;
  
  // Replace buildRedirectUrl with this:
  const buildCallbackUrl = () => {
    const siteOrigin = window.location.origin; // e.g. https://www.goairportparking.com
    const siteRef = getSiteReference();
    const callbackBase = `https://lywkpomnzaldwzmekorr.supabase.co/functions/v1/trustpayment-callback`;
    const params = new URLSearchParams({
      site_origin: siteOrigin,
      bookingReference: multimode || referenceNo,
      reference_no: Array.isArray(referenceNo) ? referenceNo.join(',') : referenceNo || '',
      totalamount: mainAmount,
      email_payment: 'true',
    });
    return `${callbackBase}?${params.toString()}`;
  };


  const handleTrustPaymentSubmit = async () => {
    const validationStatus = onValidate ? onValidate() : true;
    if (!validationStatus) {
      toast.error('Please complete all required fields before proceeding.');
      return;
    }

    setIsSubmitting(true);
    dispatch(setPaymentProcessing(true));
    dispatch(setBookingInProgress(true));

    try {
      // Optional booking sync
      let syncResult = { success: true };
      if (onBookingSync) {
        syncResult = await onBookingSync();
        if (!syncResult.success) {
          // toast.error(syncResult.error || 'Booking sync failed');
          setIsSubmitting(false);
          dispatch(setPaymentProcessing(false));
          dispatch(setBookingInProgress(false));
          return;
        }
      }

      const sessionData = {
        name: personalData?.firstName+' '+personalData?.lastName,
        email: personalData?.email,
        mobile: personalData?.phone,
        airport: searchData?.airport,
        service: selectedProduct?.name,
        entryDate: searchData?.entryDate,
        entryTime: searchData?.entryTime,
        exitDate: searchData?.exitDate,
        exitTime: searchData?.exitTime,
        personalData: personalData,
        vehicleData: Array.isArray(vehicleData) ? vehicleData.map(v => ({ ...v })) : vehicleData,
        totalAmount: String(totalAmount),
        bookingReference: multimode || syncResult.multiModeReference || '',
        referenceNo: referenceNo || syncResult.referenceNo || '',
        referenceNo: referenceNo || syncResult.referenceNo || '',
        paymentMethod: 'TrustPayment',
      };
      localStorage.setItem('booking_data', JSON.stringify(sessionData));
      localStorage.setItem('trustpayment_session', JSON.stringify(sessionData));

      // Make form visible and submit immediately (use requestAnimationFrame to ensure DOM updated)
      setFormReady(true);
      requestAnimationFrame(() => {
        if (formRef.current) formRef.current.submit();
      });

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

        <form
          ref={formRef}
          method="POST"
          action="https://payments.securetrading.net/process/payments/details"
          style={{ display: formReady ? 'block' : 'none' }}
        >
          <input type="hidden" name="sitereference" value={getSiteReference()} />
          <input type="hidden" name="currencyiso3a" value={currencyIso3a} />
          <input type="hidden" name="mainamount" value={mainAmount} />

          <input type="hidden" name="billingfirstname" value={personalData?.firstName || ''} />
          <input type="hidden" name="billinglastname" value={personalData?.lastName || ''} />
          <input type="hidden" name="billingemail" value={personalData?.email || 'test@gmail.com'} />
          <input type="hidden" name="strequiredfields" value="billingfirstname" />
          <input type="hidden" name="strequiredfields" value="billinglastname" />
          <input type="hidden" name="strequiredfields" value="billingemail" />
          <input type="hidden" name="billingpremise" value="" />
          <input type="hidden" name="billingstreet" value="" />
          <input type="hidden" name="billingtown" value="" />
          <input type="hidden" name="billingcounty" value="" />
          <input type="hidden" name="billingpostcode" value="" />
          <input type="hidden" name="billingcountryiso2a" value="GB" />

          <input type="hidden" name="customerfirstname" value={personalData?.firstName || ''} />
          <input type="hidden" name="customerlastname" value={personalData?.lastName || ''} />
          <input type="hidden" name="customerpremise" value="" />
          <input type="hidden" name="customerstreet" value="" />
          <input type="hidden" name="customertown" value="" />
          <input type="hidden" name="customercounty" value="" />
          <input type="hidden" name="customerpostcode" value="" />
          <input type="hidden" name="customercountryiso2a" value="GB" />

          <input type="hidden" name="ruleidentifier" value="STR-2" />
          <input type="hidden" name="ruleidentifier" value="STR-3" />
          <input type="hidden" name="ruleidentifier" value="STR-4" />
          <input type="hidden" name="ruleidentifier" value="STR-5" />
          <input type="hidden" name="merchantemail" value="merchant@email.com" />
          <input type="hidden" name="ruleidentifier" value="STR-6" />
          <input type="hidden" name="successfulurlredirect" value={buildCallbackUrl()} />
          <input type="hidden" name="ruleidentifier" value="STR-7" />
          <input type="hidden" name="declinedurlredirect" value={buildCallbackUrl()} />
          <input type="hidden" name="ruleidentifier" value="STR-8" />
          <input type="hidden" name="successfulurlnotification" value={buildCallbackUrl()} />
          <input type="hidden" name="ruleidentifier" value="STR-9" />
          <input type="hidden" name="declinedurlnotification" value={buildCallbackUrl()} />

          <input type="hidden" name="version" value="2" />
          <input type="hidden" name="stprofile" value="default" />
          <input type="hidden" name="stdefaultprofile" value="st_cardonly" />
          <input type="hidden" name="sitesecurity" value={sitesecurity} />
          <input type="hidden" name="sitesecuritytimestamp" value={computedTimestamp} />
        </form>

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
          {isLoading ? 'Processing...' : `Pay ${currencyIso3a === 'EUR' ? '€' : '£'}${mainAmount}`}
        </Button>
      </Box>

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