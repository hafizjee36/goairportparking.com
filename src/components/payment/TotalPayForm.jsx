import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Grid,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  Payment as PaymentIcon,
  Security as SecurityIcon,
  ErrorOutline as ErrorIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import SparkMD5 from "spark-md5";

const TotalPayForm = ({
  personalData = {},
  vehicleData = [],
  searchData = {},
  totalAmount,
  selectedProduct = {},
  correctPricing = {},
  airport,
  bookingOptions = {},
  onValidate,
  onPaymentSuccess,
  onPaymentError,
  onBookingSync,
  multiModeReference,
  referenceNo,
  syncStatus,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(true);

  const currency = airport === 'DXB' ? 'AED' : (airport === 'DUB' ? 'EUR' : 'GBP');


  const handleTotalPayPayment = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (onValidate && typeof onValidate === 'function') {
      const validationResult = onValidate();
      if (!validationResult) {
        toast.error('Please complete all required fields', {
          position: 'top-right',
          autoClose: 3000,
        });
        return;
      }
    }

    if (!agreeToTerms) {
      toast.error('Please accept the terms and conditions to proceed', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    // Sync booking first if callback provided
    if (onBookingSync && typeof onBookingSync === 'function') {
      try {
        const syncResult = await onBookingSync();
        if (!syncResult?.success) {
          throw new Error('Failed to sync booking');
        }
      } catch (syncErr) {
        console.error('❌ Booking sync failed:', syncErr);
        toast.error('Failed to sync booking. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
        });
        return;
      }
    }

    setIsProcessing(true);

    try {
        
        // Prepare payment data for TotalPay
        const paymentData = {
            order: {
                number: referenceNo?.[0] || '',
                amount: (correctPricing?.total || 0).toFixed(2),
                currency: currency,
                description: `Parking booking at ${airport}`,
            },
            customer: {
                name: `${personalData.firstName || ''} ${personalData.lastName || ''}`.trim(),
                email: personalData.email || '',
            },
            billing_address: {
                country: 'UAE',
                state:  'Dubai',
                city: 'Dubai',
                address:'',
                zip: '0000',
                phone:'0000000000',
            },
            // Booking reference for tracking
            booking_reference: multiModeReference || '',
            // Return URLs
            success_url: `${window.location.origin}/success?status=1`,
            cancel_url: `${window.location.origin}/cancel`,
        };

    //   console.log('🔄 Initiating TotalPay payment with data:', paymentData);

        const res = await fetch('https://belfastinternationalairportparking.co.uk/api/totalpay.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paymentData),
        });
        const httpCode = res.status;
        const bodyText = await res.text();
        let result;
        try {
            result = JSON.parse(bodyText);
        } catch (e) {
            throw new Error('Invalid JSON response: ' + bodyText);
        }
        console.log('🔄 TotalPay API response:', result);

        // Now check the returned fields (your API returns paymentUrl)
        if (result.success && result.paymentUrl) {
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
                bookingReference: multiModeReference || '',
                referenceNo: referenceNo?.[0] || multiModeReference || '',
                paymentMethod: 'TotalPay',
            };
            localStorage.setItem('totalpay_session', JSON.stringify(sessionData));
            console.log('✅ TotalPay session created, redirecting to:', result.paymentUrl);
            window.location.href = result.paymentUrl;
        } else {
            throw new Error(result.error || `Failed to initiate TotalPay payment (HTTP ${httpCode})`);
        }
    } catch (err) {
      console.error('❌ TotalPay payment error:', err);
      const errorMessage = err.message || 'Failed to process TotalPay payment';
      setError(errorMessage);

      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 4000,
      });

      if (onPaymentError) {
        onPaymentError(new Error(errorMessage));
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleTotalPayPayment}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mb: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 2,
          color: 'white',
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <PaymentIcon sx={{ fontSize: 40 }} />
          </Grid>
          <Grid item xs>
            <Typography variant="h6" fontWeight={700}>
              TotalPay Payment Gateway
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
              Secure payment processing by TotalPay
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Error Alert */}
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          icon={<ErrorIcon />}
          onClose={() => setError('')}
        >
          {error}
        </Alert>
      )}
      {/* Security Info */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          p: 2,
          mb: 3,
          backgroundColor: '#e8f5e9',
          borderRadius: 1,
          border: '1px solid #81c784',
        }}
      >
        <SecurityIcon sx={{ color: '#4caf50' }} />
        <Typography variant="body2" color="textPrimary">
          Your payment is secured with industry-standard encryption by TotalPay
        </Typography>
      </Box>

      {/* Terms Agreement */}
      <FormControlLabel
        control={
          <Checkbox
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            disabled={isProcessing}
          />
        }
        label={
          <Typography variant="body2">
            I agree to the{' '}
            <Box component="span" sx={{ fontWeight: 700 }}>
              terms and conditions
            </Box>
          </Typography>
        }
        sx={{ mb: 3 }}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        disabled={isProcessing || !agreeToTerms}
        sx={{
          py: 1.5,
          fontWeight: 700,
          textTransform: 'none',
          fontSize: 16,
          position: 'relative',
        }}
      >
        {isProcessing ? (
          <>
            <CircularProgress size={24} sx={{ mr: 1 }} />
            Processing...
          </>
        ) : (
          `Pay Now ${airport === 'DXB' ? 'AED' : (airport === 'DUB' ? '€' : '£')}${(correctPricing?.total || 0).toFixed(2)}`
        )}
      </Button>
    </Box>
  );
};

export default TotalPayForm;
