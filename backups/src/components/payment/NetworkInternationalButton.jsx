import React, { useState } from 'react';
import axios from 'axios';
import { Button, CircularProgress, Alert } from '@mui/material';
import { Payment as PaymentIcon } from '@mui/icons-material';
import { apiConfig, apiKey, apiUrl } from '../../common/config/api';
import { calculateProductPrice } from '../../utils/calculateTotalBookingAmount';
// import { convertCurrency} from './CurrencyConverter';

const NetworkInternationalButton = async ({
  bookingData,
  amount,
  curr,
  email,
  firstName,
  lastName,
  bookingReference,
  multiModeReference,
  onSuccess,
  onError
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [config, setConfig] = useState({
    apiKey: "NmY4YTNkZmYtNmU2ZS00MGQ4LWFkOTYtNDU5NWJkY2JiMmQ5OmY1NWIwYjljLWUwY2MtNDZjMi1iNjRmLWZmODc0NDU0NWMyOA==",
    apiUrl: "https://api-gateway.ngenius-payments.com/identity/auth/access-token",
    outLetId: "5184f197-e85d-40a7-943f-4f79757ba194",
    orderUrl: "https://api-gateway.ngenius-payments.com/transactions/outlets/5184f197-e85d-40a7-943f-4f79757ba194/orders"

    // apiUrl: 'https://identity.sandbox.ngenius-payments.com/auth/realms/ni/protocol/openid-connect/token',
    // apiKey: "YTA5OWFhZmEtYmYwNS00YzNiLWEyYzAtMWFjM2RjYzg1NWVkOjNlMTNlYTJkLWIyM2UtNDRkMC1iMDg3LTY3YzhiN2FmMjFmYQ==",
    // outLetId: 'ddb7f6d8-f500-4a7b-a46c-b7bdda20ba06',
    // orderUrl: 'https://api-gateway.sandbox.ngenius-payments.com/transactions/outlets/ddb7f6d8-f500-4a7b-a46c-b7bdda20ba06/orders'
  });
  // console.log(bookingData);
  
  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      // Extract booking data (matching reference project)
      const firstName = bookingData.personalData?.firstName || '';
      const lastName = bookingData.personalData?.lastName || '';
      const email = bookingData.personalData?.email || '';
      const mobile = bookingData.personalData?.phone || '';
      const airport = bookingData.selectedProduct?.airport_code || '';
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

      // FIXED: Parse actualPaidAmount to ensure it's a number
      const actualPaidAmount = parseFloat(amount) || 0;

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

      const params = new URLSearchParams({
        bookingReference: multiModeReference,
        reference_no: bookingReference.join(','),
        transactionID: paymentIntentId || '',
        payment_intent: paymentIntentId || '',
        paymentMethod: 'NetworkInternational',
        suppliercost: basePrice.toFixed(2),
        cancellationCharge: cancellationCharge.toFixed(2),
        smsCharge: smsCharge.toFixed(2),
        bookingFee: bookingFee.toFixed(2),
        name: `${firstName} ${lastName}`,
        email: email,
        mobile: mobile,
        totalamount: actualPaidAmount.toFixed(2),
        originalPrice: originalPrice.toFixed(2),
        discountAmount: discountAmount.toFixed(2),
        airport: airport,
        service: service,
        discountCode: discountCode || '',
        api_tag: api_tag || '',
        entryDate: entryDate,
        entryTime: entryTime,
        exitDate: exitDate,
        exitTime: exitTime,
        currency: curr
      });

      const paymentData = {
        apiUrl: config.apiUrl,
        apikey: config.apiKey,
        amount: amount,
        currency: curr,
        email: email,
        orderUrl: config.orderUrl,
        redirectUrl: `https://www.goairportparking.com/success?${params.toString()}`,
        cancelUrl: `https://www.goairportparking.com/cancel?${params.toString()}`,
        failureUrl: `https://www.goairportparking.com/failure?${params.toString()}`,
      };
      // `${domainUrl}/success?${params.toString()}`

      console.log('Processing Network International payment...', paymentData);

      // const result = await networkGateway(paymentData);
      // setOrderResult(result);

      const resp = await fetch(
        `https://belfastinternationalairportparking.co.uk/network_gateway.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            apiUrl: config.apiUrl,
            apikey: config.apiKey,
            orderUrl: config.orderUrl,
            amount: paymentData.amount,
            currency: paymentData.currency,
            email: paymentData.email,
            redirectUrl: paymentData.redirectUrl,
            cancelUrl: paymentData.cancelUrl,
            failureUrl: paymentData.failureUrl
          })
        }
      );
      // redirectUrl: `${domainUrl}/success?bookingReference=${multiModeReference}&reference_no=${bookingReference.join(',')}&transactionID=${paymentIntentId}&payment_intent=${paymentIntentId}&paymentMethod=Stripe&suppliercost=${basePrice.toFixed(2)}&cancellationCharge=${cancellationCharge.toFixed(2)}&smsCharge=${smsCharge.toFixed(2)}&bookingFee=${bookingFee.toFixed(2)}&name=${firstName}${lastName}&email=${email}&mobile=${mobile}&totalamount=${actualPaidAmount.toFixed(2)}&originalPrice=${originalPrice.toFixed(2)}&discountAmount=${discountAmount.toFixed(2)}&airport=${airport}&service=${encodeURIComponent(service)}&discountCode=${discountCode}&api_tag=${api_tag}&entryDate=${entryDate}&entryTime=${entryTime}&exitDate=${exitDate}&exitTime=${exitTime}&currency=${currency}`

      const result = await resp.json();

      console.log('Api response:', result);

      if (!result?.paymentUrl) {
        throw new Error('Redirect url not found in response');
      }

      if (result.success) {
        console.log('Payment initialized successfully:', result);

        // Store in session storage for after redirect
        sessionStorage.setItem('ni_payment_data', JSON.stringify({
          orderId: result.order_reference,
          //   reference: result.reference,
          amount: paymentData.amount,
          currency: paymentData.currency,
          bookingReference: paymentData.bookingReference,
          timestamp: Date.now()
        }));

        // Redirect to payment page
        if (result.paymentUrl) {
          window.location.href = result.paymentUrl;
        }

        // // Call success callback
        // if (onSuccess) {
        //   onSuccess(response);
        // }
      } else {
        throw new Error(result.error || 'Payment initialization failed');
      }
    } catch (err) {
      console.error('💥 Payment error:', err);
      setError(err.message);

      if (onError) {
        onError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        onClick={handlePayment}
        disabled={loading || !amount || !email}
        fullWidth
        variant="contained"
        color="primary"
        size="large"
        startIcon={loading ? <CircularProgress size={20} /> : <PaymentIcon />}
        sx={{
          py: 1.5,
          px: 4,
          fontSize: '16px',
          fontWeight: 600,
        }}
      >
        {loading ? 'Processing...' : `Pay ${curr} ${amount.toFixed(2)}`}
      </Button>
    </div>
  );
};

export default NetworkInternationalButton;