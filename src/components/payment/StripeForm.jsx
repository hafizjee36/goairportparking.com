import React, { useState, useEffect } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
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
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';


import { paymentService } from '../../services/apiService';
import { setPaymentSuccess, setPaymentError } from '../../redux/slice/paymentSlice';
import { calculateProductPrice } from '../../utils/calculateTotalBookingAmount';

const StripeForm = ({
  bookingData,
  totalAmount,
  clientSecret,
  onValidate,
  onPaymentSuccess,
  onPaymentError,
  onBookingSync, // Function to sync booking and get reference numbers
  multiModeReference, // Multi mode reference number
  referenceNo, // Booking reference numbers
  supplierCost, // Supplier cost for URL
  syncStatus, // Booking sync status from hook
  bookingOptions = {}, // Booking options including terms acceptance
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentReady, setPaymentReady] = useState(false); // CHANGE: new state

  // Check if Stripe and Elements are loaded
  const isLoaded = stripe && elements;

  const getCurrency = () => {
    const airport = bookingData?.searchData?.airport || '';

    // Convert to lowercase for case-insensitive comparison
    const airportLower = airport.toLowerCase();

    // If airport contains "dublin", use EUR
    if (airport === 'DUB' || airportLower.includes('dublin')) {
      return 'eur';
    }
    if (airport === 'DXB') {
      return 'aed';
    }

    return 'gbp';
  };
  // Function to get currency symbol for display
  const getCurrencySymbol = () => {
    const currency = getCurrency();
    return currency === 'eur' ? '€' : currency === 'aed' ? 'AED' : '£';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!paymentReady) {  // CHANGE: check if PaymentElement is ready
      toast.error('Payment form is still loading. Please wait.');
      return;
    }
    // Step 1: Validate form first (following reference project)
    let validationResult = onValidate ? onValidate() : true;

    if (validationResult?.length > 0) {
      return;
    }

    if (!validationResult) {
      toast.error('Please complete all required fields before proceeding.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    // Step 1.1: Validate terms and conditions acceptance
    // if (!bookingOptions?.agreeToTerms) {
    //   toast.error('Please accept the terms and conditions to proceed with payment.', {
    //     position: "top-right",
    //     autoClose: 4000,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     theme: "colored",
    //   });
    //   return;
    // }

    if (!isLoaded) {
      toast.error('Payment system is loading. Please wait.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    try {
      // Extract booking data (matching reference project)
      const firstName = bookingData.personalData?.firstName || '';
      const lastName = bookingData.personalData?.lastName || '';
      const email = bookingData.personalData?.email || '';
      const mobile = bookingData.personalData?.phone || '';
      const airport = bookingData.searchData?.airport || '';
      const service = bookingData.selectedProduct?.name || bookingData.selectedProduct?.type || 'Airport Parking';
      const discountCode = bookingData.searchData?.discountCode || '';
      const api_tag = bookingData.selectedProduct?.api_tag || '';
      const paymentIntentId = bookingData.paymentIntentId;
      const domainUrl = window.location.origin;

      // Extract booking dates for success page
      const entryDate = bookingData.searchData?.entryDate || '';
      const entryTime = bookingData.searchData?.entryTime || '';
      const exitDate = bookingData.searchData?.exitDate || '';
      const exitTime = bookingData.searchData?.exitTime || '';

      // Get currency based on airport
      const currency = getCurrency();

      if (!stripe || !elements) {
        throw new Error('Stripe not initialized');
      }

      // Step 2: Update booking first (following reference project pattern)
      let response = {};
      if (onBookingSync && typeof onBookingSync === 'function') {
        try {
          response = await onBookingSync();

          // Check if booking update was successful
          if (!response?.success) {
            throw new Error('Failed to update booking data');
          }
        } catch (syncError) {
          throw new Error('Failed to update booking data');
        }
      }

      // Get references from update response or existing props
      // Response has both top-level fields and nested data fields, use top-level first
      const currentMultiModeReference = response?.multiModeReference || response?.data?.multi_mode_reference_no || multiModeReference;
      const currentReferenceNo = response?.referenceNo || response?.data?.reference_no || (Array.isArray(referenceNo) ? referenceNo : [referenceNo]);

      if (!currentMultiModeReference || !currentReferenceNo?.length) {
        throw new Error('Missing booking references');
      }

      // Step 3: Skip initial payment intent status check to avoid duplicate calls
      // The payment intent will be retrieved after update for proper flow

      // Step 4: Update payment intent with booking references (following reference project)
      if (paymentIntentId && currentMultiModeReference && currentReferenceNo?.length) {

        try {
          const updatePaymentIntentPayload = {
            key: import.meta.env.VITE_API_KEY || 'DPyF4KAdI0F2cGT6',
            payment_intent: paymentIntentId,
            multi_mode_reference_no: currentMultiModeReference,
            reference_no: Array.isArray(currentReferenceNo) ? currentReferenceNo : [currentReferenceNo],
            amount: parseFloat(totalAmount),
            currency: currency, // Add currency to the payload
            api_tag: bookingData?.selectedProduct?.api_tag || bookingData?.selectedProduct?.sku_tag || null,
          };

          const updateResponse = await paymentService.updateStripePaymentIntent(paymentIntentId, updatePaymentIntentPayload);

          // Step 4.1: Update booking intent after successful payment intent update
          if (updateResponse?.data?.payment_intent) {
            try {
              const updateIntentPayload = {
                key: import.meta.env.VITE_API_KEY || 'DPyF4KAdI0F2cGT6',
                payment_token: updateResponse.data.payment_intent,
                multi_mode_reference_no: currentMultiModeReference,
                api_tag: bookingData?.selectedProduct?.api_tag || bookingData?.selectedProduct?.sku_tag || null,
              };

              await paymentService.updateBookingIntent(updateIntentPayload);
              console.log('✅ Booking intent updated successfully');
            } catch (intentError) {
              console.error('⚠️ Failed to update booking intent:', intentError);
              // Continue anyway as this might not be critical
            }
          }

          // Step 4.2: Retrieve payment intent after update (following reference project pattern)
          const retrieveResponse = await paymentService.getStripePaymentIntent(paymentIntentId, bookingData?.selectedProduct?.api_tag || bookingData?.selectedProduct?.sku_tag || null);
          console.log('✅ Payment intent retrieved after update:', retrieveResponse.data);
          // Continue with payment flow regardless of status
        } catch (updateError) {
          // Continue anyway as this might not be critical
        }
      }

      // Step 5: Confirm the payment with Stripe (following reference project)

      // Check references again before confirming
      if (!currentReferenceNo?.length) {
        throw new Error('Missing reference numbers for payment');
      }

      // FIXED: Parse actualPaidAmount to ensure it's a number
      const actualPaidAmount = parseFloat(totalAmount) || 0;


      // Calculate pricing breakdown to pass individual components to success page
      const pricingBreakdown = calculateProductPrice(
        bookingData.selectedProduct,
        bookingData.vehicleData?.length || 1,
        {
          cancellation: bookingData.bookingOptions?.cancellationProtection || false,
          sms: bookingData.bookingOptions?.smsUpdates || false
        }
      );

      // FIXED: Parse discountAmount to ensure it's a number
      const discountAmount = parseFloat(bookingData.selectedProduct?.discount) ||
        parseFloat(pricingBreakdown.breakdown?.discount) || 0;

      // FIXED: Parse originalPrice to ensure it's a number (prioritize pre-discount)
      const originalPrice = parseFloat(bookingData.selectedProduct?.price_before_discount) ||
        parseFloat(bookingData.selectedProduct?.price) ||
        actualPaidAmount || 0;

      // Get individual charge components for success page display (already numbers from calculateProductPrice)
      const cancellationCharge = pricingBreakdown.breakdown?.cancellationCharges || 0;
      const smsCharge = pricingBreakdown.breakdown?.smsCharges || 0;
      const bookingFee = pricingBreakdown.breakdown?.adminCharges || 0;
      const basePrice = pricingBreakdown.breakdown?.basePrice || 0;


      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${domainUrl}/success?bookingReference=${currentMultiModeReference}&reference_no=${currentReferenceNo.join(',')}&transactionID=${paymentIntentId}&payment_intent=${paymentIntentId}&paymentMethod=Stripe&suppliercost=${basePrice.toFixed(2)}&cancellationCharge=${cancellationCharge.toFixed(2)}&smsCharge=${smsCharge.toFixed(2)}&bookingFee=${bookingFee.toFixed(2)}&name=${firstName}${lastName}&email=${email}&mobile=${mobile}&totalamount=${actualPaidAmount.toFixed(2)}&originalPrice=${originalPrice.toFixed(2)}&discountAmount=${discountAmount.toFixed(2)}&airport=${airport}&service=${encodeURIComponent(service)}&discountCode=${discountCode}&api_tag=${api_tag}&entryDate=${entryDate}&entryTime=${entryTime}&exitDate=${exitDate}&exitTime=${exitTime}&currency=${currency}`,
          payment_method_data: {
            billing_details: {
              name: `${firstName} ${lastName}`.trim() || 'Customer',
              email: email || undefined,
            },
          },
        },
      });

      if (confirmError) {
        const errorMsg = confirmError.message || 'An unexpected error occurred during payment';
        if (confirmError.type === 'card_error' || confirmError.type === 'validation_error') {
          throw new Error(errorMsg || 'Card error occurred');
        } else {
          throw new Error(errorMsg);
        }
      }
      // Payment success - no need for additional processing here
      console.log('✅ Payment confirmed successfully, redirecting to success page...');

    } catch (error) {
      console.error('❌ StripeForm: Payment processing error:', error);

      const errorMsg = error.message || 'An unexpected error occurred during payment';
      setErrorMessage(errorMsg);

      // Show error toast
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });

      // Call error callback if provided
      if (onPaymentError) {
        onPaymentError(error);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // FIXED: Ensure totalAmount is parsed for display (in case prop is string)
  const displayTotalAmount = parseFloat(totalAmount) || 0;
  const currencySymbol = getCurrencySymbol();

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {/* Error Display */}
      {errorMessage && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          onClose={() => setErrorMessage('')}
        >
          {errorMessage}
        </Alert>
      )}
      {/* Currency Info Display */}
      {/* <Box
        sx={{
          background: '#e8f4fd',
          p: 2,
          borderRadius: 1,
          mb: 2,
          border: '1px solid #b6e0fe',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 500, color: '#055e8c' }}>
          Currency: {getCurrency().toUpperCase()} ({currencySymbol})
          {bookingData?.searchData?.airport && (
            <Typography component="span" variant="body2" sx={{ color: '#666', ml: 1 }}>
              (Based on {bookingData.searchData.airport})
            </Typography>
          )}
        </Typography>
      </Box> */}
      {/* Stripe Payment Section */}
      <Box
        sx={{
          background: '#F9F9F9',
          p: 2,
          borderRadius: 2,
          mb: 1,
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
            Secure Payment with Stripe
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{ mb: 1, lineHeight: 1.6, color: '#666' }}
        >
          Your payment information is securely processed by Stripe. We never store your card details.
        </Typography>



        {/* Stripe Payment Element */}
        {isLoaded && clientSecret ? (
          <Box sx={{ mb: 3 }}>
            <PaymentElement
              options={{
                layout: 'tabs',
                paymentMethodOrder: ['card', 'apple_pay', 'google_pay'],
                fields: {
                  billingDetails: {
                    name: 'never',
                    email: 'never',
                    address: {
                      country: 'auto',
                    },
                  },
                },
                defaultValues: {
                  billingDetails: {
                    address: {
                      country: currencySymbol,
                    },
                  },
                },
              }}
              onReady={() => setPaymentReady(true)} // <<< add this line
            />
          </Box>
        ) : (
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 100,
            mb: 3,
            backgroundColor: '#fff',
            borderRadius: 1,
            border: '1px solid #ddd'
          }}>
            <CircularProgress size={30} />
            <Typography sx={{ ml: 2 }}>Loading payment form...</Typography>
          </Box>
        )}
        {/* Payment Features sx={{ mb: 3 }}*/}
        <Box sx={{ mb: 2, }}>
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

        {/* Payment Button */}
        <Button
          type="submit"
          disabled={!isLoaded || isProcessing || !clientSecret}
          fullWidth
          variant="contained"
          size="large"
          startIcon={isProcessing ? <CircularProgress size={20} /> : <PaymentIcon />}
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
          {isProcessing
            ? 'Processing Payment...'
            : `Pay Now ${currencySymbol}${displayTotalAmount.toFixed(2)}`
          }
        </Button>
      </Box>

      {/* Payment Security Info */}
      {/* <Box
        sx={{
          p: 2,
          borderRadius: 1,
          bgcolor: '#f8f9fa',
          border: '1px solid #e9ecef',
        }}
      >
        <Typography variant="caption" sx={{ color: '#6c757d', fontSize: '12px' }}>
          <SecurityIcon sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
          Your card details are processed securely by Stripe and are never stored on our servers. 
          This transaction is protected by 256-bit SSL encryption and 3D Secure authentication.
        </Typography>
      </Box> */}
    </Box>
  );
};

export default StripeForm;
