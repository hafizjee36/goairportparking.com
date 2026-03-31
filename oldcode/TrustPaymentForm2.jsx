import React, { useState, useRef, useMemo, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Payment as PaymentIcon,
  Security as SecurityIcon,
  CreditCard as CreditCardIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { calculateProductPrice } from '../../utils/calculateTotalBookingAmount';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPaymentSuccess,
  setPaymentError,
} from '../../redux/slice/paymentSlice';

const TrustPaymentForm = ({
  bookingData,
  totalAmount,
  currency,
  onValidate,
  onPaymentSubmit,
  onPaymentSuccess,
  onPaymentError,
  onBookingSync,
  multiModeReference,
  referenceNo,
  supplierCost,
  syncStatus,
  airport,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ui } = useSelector((state) => state.payment);

  const [errorMessage, setErrorMessage] = useState('');
  const [formReady, setFormReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [computedTimestamp, setComputedTimestamp] = useState('');
  const [sitesecurity, setSitesecurity] = useState('');
  const formRef = useRef(null);

  // Initialize form ready when parent loading completes (keep but don't pre-render sitesecurity)
  useEffect(() => {
    if (!isLoading && !formReady) {
      setFormReady(false); // keep false until explicit submit (avoid accidental auto-render)
    }
  }, [isLoading, formReady]);

  const isButtonDisabled = isProcessing || isLoading;

  // SecureTrading config - dynamic from service/env fallback
  const getTrustConfig = () => {
    try {
      const initData = sessionStorage.getItem('trustpayment_init');
      if (initData) {
        const parsed = JSON.parse(initData);
        if (parsed.sitereference && parsed.sitekey) {
          console.log('✅ TrustPayment: Using service init config');
          return parsed;
        }
      }
    } catch (e) {
      console.warn('TrustPayment init parse error:', e);
    }

    const siteRef = import.meta.env.VITE_TRUST_SITE_REF || 'test_goairportp149005';
    const siteKey = import.meta.env.VITE_TRUST_SITE_KEY || '59-06864b7484aafe5568a83cbf42905d03838c4842cd42fd95a7a5be9d229fa9f5';

    console.log('🔄 TrustPayment: Using env fallback config', { siteRef });
    return { sitereference: siteRef, sitekey: siteKey };
  };

  const { sitereference: SITEREFERENCE, sitekey: SITE_KEY } = getTrustConfig();

  const currencyIso3a = currency || 'GBP';
  const currencySymbol = currencyIso3a === 'EUR' ? '€' : currencyIso3a === 'AED' ? 'AED' : '£';

  const mainAmount = useMemo(() => {
    return (parseFloat(totalAmount || 0) || 0).toFixed(2);
  }, [totalAmount]);

  const getSiteSecurityTimestamp = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ` +
           `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  };

  const getSiteSecurity = (timestamp) => {
    const data = `${SITEREFERENCE}${currencyIso3a}${mainAmount}${timestamp}`;
    return CryptoJS.HmacSHA256(data, SITE_KEY).toString(CryptoJS.enc.Hex);
  };

  const {
    personalData = { firstName: '', lastName: '', email: '' },
    selectedProduct = {},
    searchData = {},
    vehicleData = [],
    bookingOptions = {}
  } = bookingData || {};

  const buildRedirectUrl = (status) => {
    const domainUrl = window.location.origin;
    const firstName = personalData.firstName || '';
    const lastName = personalData.lastName || '';
    const email = personalData.email || '';
    const mobile = personalData.phone || '';
    const apiTag = selectedProduct.api_tag || '';

    const pricingBreakdown = calculateProductPrice(
      selectedProduct,
      vehicleData?.length || 1,
      {
        cancellation: bookingOptions?.cancellationProtection || false,
        sms: bookingOptions?.smsUpdates || false
      }
    );

    const basePrice = pricingBreakdown.breakdown?.basePrice || 0;
    const cancellationCharge = pricingBreakdown.breakdown?.cancellationCharges || 0;
    const smsCharge = pricingBreakdown.breakdown?.smsCharges || 0;
    const bookingFee = pricingBreakdown.breakdown?.adminCharges || 0;
    const originalPrice = parseFloat(selectedProduct?.price_before_discount || selectedProduct?.price || totalAmount) || 0;
    const discountAmount = parseFloat(selectedProduct?.discount || 0) || 0;

    const entryDate = searchData.entryDate || '';
    const entryTime = searchData.entryTime || '';
    const exitDate = searchData.exitDate || '';
    const exitTime = searchData.exitTime || '';

    const params = new URLSearchParams({
      status,
      bookingReference: multiModeReference,
      reference_no: Array.isArray(referenceNo) ? referenceNo.join(',') : referenceNo || '',
      paymentMethod: 'TrustPayment',
      suppliercost: basePrice.toFixed(2),
      cancellationCharge: cancellationCharge.toFixed(2),
      smsCharge: smsCharge.toFixed(2),
      bookingFee: bookingFee.toFixed(2),
      name: `${firstName} ${lastName}`.trim(),
      email,
      mobile,
      totalamount: parseFloat(totalAmount || 0).toFixed(2),
      originalPrice: originalPrice.toFixed(2),
      discountAmount: discountAmount.toFixed(2),
      airport,
      service: selectedProduct.name || selectedProduct.type || 'Airport Parking',
      discountCode: searchData.discountCode || '',
      api_tag: apiTag,
      entryDate,
      entryTime,
      exitDate,
      exitTime,
      currency: currencyIso3a,
      sitereference: SITEREFERENCE,
      transactionID: SITEREFERENCE,
    });

    return `${domainUrl}/success?${params.toString()}`;
  };
  console.log('personalData: ',bookingData);
  const handleSubmit = async (event) => {
    event?.preventDefault();
    
    // Allow parent hook to block by returning false explicitly.
    if (onPaymentSubmit) {
      try {
        const parentResult = onPaymentSubmit();
        if (parentResult === false) {
          return;
        }
      } catch (e) {
        console.warn('onPaymentSubmit threw:', e);
      }
    }

    if (isProcessing) return;

    setIsProcessing(true);
    setErrorMessage('');

    try {
      // Validation: accept true OR empty-array as valid
      const validationResult = onValidate ? onValidate() : true;
      const isValid = validationResult === true || (Array.isArray(validationResult) && validationResult.length === 0);
      if (!isValid) {
        throw new Error('Please complete all required fields');
      }

      // Sync booking if provided
      if (onBookingSync) {
        const syncResult = await onBookingSync();
        console.log('syncResult: ',syncResult);
        if (!syncResult?.success) {
          throw new Error(syncResult?.error || 'Booking sync failed');
        }
      }

      // Store session data
      const sessionData = {
        personalData,
        bookingData,
        totalAmount,
        paymentMethod: 'TrustPayment',
        timestamp: new Date().toISOString(),
      };
      sessionStorage.setItem('trustpayment_session', JSON.stringify(sessionData));

      // compute timestamp and sitesecurity right before submit (avoid expiry)
      const ts = getSiteSecurityTimestamp();
      const ss = getSiteSecurity(ts);
      setComputedTimestamp(ts);
      setSitesecurity(ss);

      // ensure form is visible and then submit
      setFormReady(true);

      // small delay to allow DOM to update and inputs to reflect new timestamp/sitesecurity
      setTimeout(() => {
        if (!formRef.current) {
          const msg = 'Payment form not available to submit.';
          setErrorMessage(msg);
          toast.error(msg);
          dispatch(setPaymentError(msg));
          if (onPaymentError) onPaymentError(new Error(msg));
          setIsProcessing(false);
          return;
        }

        // debug logs
        console.debug('Submitting TrustPayment form', {
          action: formRef.current.action,
          mainAmount,
          currencyIso3a,
          computedTimestamp: ts,
          sitesecurity: ss ? ss.substring(0, 8) + '...' : '',
        });

        // ensure full-page redirect target
        formRef.current.target = '_top';

        // update hidden inputs programmatically in case React hasn't flushed (defensive)
        const tsInput = formRef.current.querySelector('input[name="sitesecuritytimestamp"]');
        const ssInput = formRef.current.querySelector('input[name="sitesecurity"]');
        if (tsInput) tsInput.value = ts;
        if (ssInput) ssInput.value = ss;

        // finally submit
        try {
          // formRef.current.submit();
        } catch (submitErr) {
          console.error('Form submit error', submitErr);
          const msg = 'Unable to submit payment form';
          setErrorMessage(msg);
          toast.error(msg);
          dispatch(setPaymentError(msg));
          if (onPaymentError) onPaymentError(submitErr);
        } finally {
          setIsProcessing(false);
        }
      }, 300);
    } catch (error) {
      const msg = error.message || 'Payment failed to initialize';
      setErrorMessage(msg);
      toast.error(msg);
      if (onPaymentError) onPaymentError(error);
      dispatch(setPaymentError(msg));
      setIsProcessing(false);
    }
  };

  return (
    <Card sx={{ mb: 3, border: "1px solid", borderColor: "divider", borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3, pb: 2, borderBottom: "1px solid", borderColor: "divider" }}>
          <Box sx={{ bgcolor: "#1e3a8a", p: 1.5, borderRadius: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CreditCardIcon sx={{ color: "white", fontSize: 28 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Trust Payments (SecureTrading)</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>Secure card processing</Typography>
          </Box>
        </Box>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setErrorMessage('')}>
            {errorMessage}
          </Alert>
        )}

        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>Secure payment processing</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <SecurityIcon sx={{ color: "success.main", fontSize: 20 }} />
              <Typography variant="body2">256-bit SSL encryption</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <LockIcon sx={{ color: "success.main", fontSize: 20 }} />
              <Typography variant="body2">PCI DSS compliant</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <PaymentIcon sx={{ color: "success.main", fontSize: 20 }} />
              <Typography variant="body2">Visa, MasterCard, AMEX supported</Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, p: 2.5, bgcolor: "background.default", borderRadius: 1.5, border: "1px solid", borderColor: "divider" }}>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>Total Amount:</Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "primary.main" }}>
              {currencySymbol}{parseFloat(totalAmount || 0).toFixed(2)}
            </Typography>
          </Box>
        </Box>

        <form
          ref={formRef}
          method="POST"
          action="https://payments.securetrading.net/process/payments/details"
          target="_top"
          onSubmit={(e) => {
            // debug only: form submit should come from our manual submit call
            console.debug('form onSubmit', e);
          }}
          style={{ display: formReady ? 'block' : 'none' }}
        >
          <input type="hidden" name="sitereference" value={SITEREFERENCE} />
          <input type="hidden" name="currencyiso3a" value={currencyIso3a} />
          <input type="hidden" name="mainamount" value={mainAmount} />

          <input type="hidden" name="billingfirstname" value={personalData.firstName || ''} />
          <input type="hidden" name="billinglastname" value={personalData.lastName || ''} />
          <input type="hidden" name="billingemail" value={personalData.email || ''} />
          <input type="hidden" name="strequiredfields" value="billingfirstname" />
          <input type="hidden" name="strequiredfields" value="billinglastname" />
          <input type="hidden" name="strequiredfields" value="billingemail" />
          <input type="hidden" name="billingpremise" value="" />
          <input type="hidden" name="billingstreet" value="" />
          <input type="hidden" name="billingtown" value="" />
          <input type="hidden" name="billingcounty" value="" />
          <input type="hidden" name="billingpostcode" value="" />
          <input type="hidden" name="billingcountryiso2a" value="GB" />

          <input type="hidden" name="customerfirstname" value={personalData.firstName || ''} />
          <input type="hidden" name="customerlastname" value={personalData.lastName || ''} />
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

          <input type="hidden" name="successfulurlredirect" value={buildRedirectUrl('1')} />
          <input type="hidden" name="ruleidentifier" value="STR-8" />
          <input type="hidden" name="successfulurlnotification" value={buildRedirectUrl('1')} />
          <input type="hidden" name="ruleidentifier" value="STR-9" />
          <input type="hidden" name="declinedurlnotification" value={buildRedirectUrl('2')} />

          <input type="hidden" name="version" value="2" />
          <input type="hidden" name="stprofile" value="default" />
          <input type="hidden" name="stdefaultprofile" value="st_cardonly" />
          <input type="hidden" name="sitesecurity" value={sitesecurity} />
          <input type="hidden" name="sitesecuritytimestamp" value={computedTimestamp} />
        </form>

        <Button
          onClick={handleSubmit}
          fullWidth
          variant="contained"
          size="large"
          startIcon={isProcessing ? <CircularProgress size={20} color="inherit" /> : <PaymentIcon />}
          sx={{
            py: 1.8,
            fontSize: '1.1rem',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: 2,
            bgcolor: '#1e40af',
            '&:hover': { bgcolor: '#1e3a8a' },
            '&:disabled': { bgcolor: 'action.disabledBackground', color: 'action.disabled' },
          }}
          disabled={isButtonDisabled}
        >
          {isProcessing ? 'Processing Secure Payment...' : `Pay Securely ${currencySymbol}${parseFloat(totalAmount || 0).toFixed(2)}`}
        </Button>

        <Box sx={{ mt: 2.5, p: 2, bgcolor: '#f8fafc', borderRadius: 1, border: '1px solid #e2e8f0' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LockIcon sx={{ fontSize: 14 }} />
            Securely processed by Trust Payments. 256-bit SSL encryption. We never store card details.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TrustPaymentForm;
