import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
  Chip,
  Avatar,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import apiCall from '../../services/apiService';
import { apiKey } from '../../common/config/api';
import {
  CheckCircle as CheckIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Receipt as ReceiptIcon,
  Home as HomeIcon,
  Close as CloseIcon,
  AttachMoney as MoneyIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { format as formatFn, isValid, parseISO, addDays } from 'date-fns';
import theme from '../../theme';
import PageWrapper from '../../components/reusable/PageWrapper';
import { getAirportByCode } from '../../services/airportService';
import Seo from '../../components/reusable/Seo';

import AnimateOnScroll from '../../components/reusable/AnimateOnScroll';
import {
  EASE_SOFT,
  THRESHOLD,
  ROOT_MARGIN,
  smoothStyle,
} from '../../components/utils/animation';
import AwinTracking from '../../components/AwinTracking/AwinTracking';
import AwinFallbackPixel from '../../components/AwinTracking/AwinFallbackPixel';
import AwinConversionScript from '../../components/AwinTracking/AwinConversionScript';
import { getCookie } from '../../utils/getCookie';

const BookingSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  // On your success page:
  const session = JSON.parse(localStorage.getItem('trustpayment_session'));
  console.log('trustpaymetn session: ',session)

  const bookingReference =
    searchParams.get('bookingReference') ||
    searchParams.get('multi_mode_reference_no');
  const referenceNo = searchParams.get('reference_no');
  const transactionId =
    searchParams.get('transactionID') || searchParams.get('ref');
  const paymentIntent =
    searchParams.get('payment_intent') || searchParams.get('ref');
  const paymentMethod = searchParams.get('paymentMethod');
  const totalAmount = searchParams.get('totalamount');
  const customerName = searchParams.get('name') || session.name;
  const customerEmail = searchParams.get('email') || session.email;
  const customerMobile = searchParams.get('mobile') || session.mobile;
  const airport = searchParams.get('airport') || session.airport;
  const service = searchParams.get('service') || session.service;
  const emailPayment = searchParams.get('email_payment');
  const apiTag = searchParams.get('api_tag');
  const trafficSource = searchParams.get('traffic_source');

  const entryDate = searchParams.get('entryDate') || session.entryDate;
  const entryTime = searchParams.get('entryTime') || session.entryTime;
  const exitDate = searchParams.get('exitDate') || session.exitDate;
  const exitTime = searchParams.get('exitTime') || session.exitTime;

  const supplierCost = parseFloat(searchParams.get('suppliercost') || '0');
  const cancellationCharge = parseFloat(searchParams.get('cancellationCharge') || '0');
  const smsCharge = parseFloat(searchParams.get('smsCharge') || '0');
  const bookingFee = parseFloat(searchParams.get('bookingFee') || '0');

  const currencyCode =
    airport === 'DXB'
      ? 'AED'
      : airport === 'DUB' || (!airport && service?.toLowerCase().includes('dublin'))
      ? 'EUR'
      : 'GBP';

  const currencySymbol =
    airport === 'DXB'
      ? 'AED'
      : airport === 'DUB' || (!airport && service?.toLowerCase().includes('dublin'))
      ? '€'
      : '£';

  const awcValue = getCookie('awc');

  const canonicalUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${location.pathname}`
      : 'https://www.goairportparking.com/booking-success';

  const conversionKey = useMemo(() => {
    return transactionId
      ? `booking_success_conversion_fired_${transactionId}`
      : bookingReference
      ? `booking_success_conversion_fired_${bookingReference}`
      : null;
  }, [transactionId, bookingReference]);

  const [bookingData, setBookingData] = useState(null);
  const [airportName, setAirportName] = useState('');
  const [loadingAirport, setLoadingAirport] = useState(false);
  const [paymentFinalized, setPaymentFinalized] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const status = searchParams.get('status');
    console.log('🟢 BookingSuccess loaded with status:', status, 'All params:', Object.fromEntries(searchParams));
    
    if (status !== '1') {
      setPaymentError(`Payment status invalid: ${status}. Check payment or contact support.`);
      return;
    }

    // EXTENDED: TrustPayment + all payment methods session keys
    const allSessionKeys = ['trustpayment_session', 'booking_data', 'worldpay_session', 'stripe_session'];
    let parsedData = null;
    let loadedKey = null;

    for (const key of allSessionKeys) {
      const storedData = sessionStorage.getItem(key);
      if (storedData) {
        try {
          parsedData = JSON.parse(storedData);
          loadedKey = key;
          console.log(`✅ Loaded booking data from ${key}:`, parsedData ? 'Success' : 'Empty');
          break;
        } catch (error) {
          console.error(`❌ Error parsing ${key}:`, error);
        }
      }
    }
    
    if (!parsedData) {
      console.warn('⚠️ No session data - using URL params. Common for test payments.');
      // Fallback: construct minimal data from URL
      parsedData = {
        personalData: {},
        searchData: {
          entryDate: searchParams.get('entryDate'),
          entryTime: searchParams.get('entryTime'),
          exitDate: searchParams.get('exitDate'),
          exitTime: searchParams.get('exitTime'),
        }
      };
    }

    if (parsedData) {
      setBookingData(parsedData);
    }

    // Clean up ALL session keys to prevent stale data
    allSessionKeys.forEach(key => sessionStorage.removeItem(key));
  }, [searchParams]);

  useEffect(() => {
    const fetchAirportName = async () => {
      if (airport) {
        setLoadingAirport(true);
        try {
          const airportData = await getAirportByCode(airport);
          if (airportData) {
            setAirportName(airportData.level);
          } else {
            setAirportName(airport);
          }
        } catch (error) {
          console.error('Error fetching airport name:', error);
          setAirportName(airport);
        } finally {
          setLoadingAirport(false);
        }
      }
    };

    fetchAirportName();
  }, [airport]);

  useEffect(() => {
    const finalizePayment = async () => {
      if (!bookingReference || !transactionId) {
        return;
      }

      if (paymentFinalized) {
        return;
      }

      try {
        const paymentUpdatePayload = {
          key: apiKey,
          multi_mode_reference_no: bookingReference,
          reference_no: referenceNo?.split(',') || [],
          transaction_id: transactionId,
          payment_intent: paymentIntent,
          payment_type: paymentMethod || 'stripe',
          api_tag: apiTag,
          email_payment: emailPayment,
        };

        const response = await apiCall(
          'post',
          '/payments/update',
          paymentUpdatePayload,
          {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          window.location.pathname
        );

        if (response?.success) {
          setPaymentFinalized(true);

          const bookingId = localStorage.getItem('bookingId');
          if (bookingId) {
            const updateBookingStatus = {
              access_token: '5MEsB9lLwVqu4qndXvEUE428bqGZY',
              booking_id: bookingId,
              transaction_id: transactionId,
              booking_type: 'Online',
              stripe_ref_id: '',
            };

            const urlupdateBookingStatus =
              `https://globalparkingtech.co.uk/update_booking_status_api?` +
              new URLSearchParams(updateBookingStatus).toString();

            await fetch(urlupdateBookingStatus);
            localStorage.removeItem('bookingId');
          }
        } else {
          setPaymentError(response?.message || 'Failed to finalize payment');
        }
      } catch (error) {
        console.error('❌ BookingSuccess: Payment finalization error:', error);
        setPaymentError('An error occurred while finalizing payment');
      }
    };

    finalizePayment();
  }, [
    bookingReference,
    referenceNo,
    transactionId,
    paymentIntent,
    paymentMethod,
    emailPayment,
    apiTag,
    paymentFinalized,
  ]);

  useEffect(() => {
    if (!paymentFinalized || !conversionKey) return;

    const alreadyFired =
      typeof window !== 'undefined' &&
      sessionStorage.getItem(conversionKey) === '1';

    if (alreadyFired) return;

    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'purchase',
        transaction_id: transactionId || bookingReference,
        value: parseFloat(totalAmount || '0'),
        currency: currencyCode,
        booking_reference: bookingReference,
        payment_method: paymentMethod || 'stripe',
        traffic_source: trafficSource || '',
      });
    }

    if (typeof window !== 'undefined') {
      sessionStorage.setItem(conversionKey, '1');
    }
  }, [
    paymentFinalized,
    conversionKey,
    transactionId,
    bookingReference,
    totalAmount,
    currencyCode,
    paymentMethod,
    trafficSource,
  ]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = parseISO(dateString);
    return isValid(date) ? formatFn(date, 'dd MMM yyyy') : dateString;
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'Not specified';
    return timeString;
  };

  const handleDownloadVoucher = () => {
    const voucherContent = `
      PARKING BOOKING CONFIRMATION

      Booking Reference: ${bookingReference}
      Reference Number: ${referenceNo}
      Transaction ID: ${transactionId}

      Customer: ${customerName}
      Email: ${customerEmail}
      Phone: ${customerMobile}

      Booking Details:
      Airport: ${airport}
      Service: ${service}
      Drop-off: ${formatDate(entryDate || bookingData?.searchData?.entryDate)} at ${formatTime(entryTime || bookingData?.searchData?.entryTime)}
      Pick-up: ${formatDate(exitDate || bookingData?.searchData?.exitDate)} at ${formatTime(exitTime || bookingData?.searchData?.exitTime)}

      Payment:
      Total Paid: ${currencySymbol}${totalAmount}
      Payment Method: ${paymentMethod}

      Generated: ${formatFn(new Date(), 'dd/MM/yyyy HH:mm')}
    `;

    const element = document.createElement('a');
    const file = new Blob([voucherContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `booking-${bookingReference}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setShowSuccessMessage(true);
  };

  const handlePrintVoucher = () => {
    const printContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1>Parking Booking Confirmation</h1>
        <div style="border: 1px solid #ccc; padding: 20px; margin: 20px 0;">
          <h2>Booking Details</h2>
          <p><strong>Booking Reference:</strong> ${bookingReference}</p>
          <p><strong>Reference Number:</strong> ${referenceNo}</p>
          <p><strong>Transaction ID:</strong> ${transactionId}</p>
        </div>
        <div style="border: 1px solid #ccc; padding: 20px; margin: 20px 0;">
          <h2>Customer Information</h2>
          <p><strong>Name:</strong> ${customerName}</p>
          <p><strong>Email:</strong> ${customerEmail}</p>
          <p><strong>Phone:</strong> ${customerMobile}</p>
        </div>
        <div style="border: 1px solid #ccc; padding: 20px; margin: 20px 0;">
          <h2>Service Details</h2>
          <p><strong>Airport:</strong> ${airport}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Drop-off Date & Time:</strong> ${formatDate(entryDate || bookingData?.searchData?.entryDate)} at ${formatTime(entryTime || bookingData?.searchData?.entryTime)}</p>
          <p><strong>Pick-up Date & Time:</strong> ${formatDate(exitDate || bookingData?.searchData?.exitDate)} at ${formatTime(exitTime || bookingData?.searchData?.exitTime)}</p>
        </div>
        <div style="border: 1px solid #ccc; padding: 20px; margin: 20px 0;">
          <h2>Payment Information</h2>
          <p><strong>Total Paid:</strong> ${currencySymbol}${totalAmount}</p>
          <p><strong>Payment Method:</strong> ${paymentMethod}</p>
        </div>
        <p style="margin-top: 40px;"><em>Printed on: ${formatFn(new Date(), 'dd/MM/yyyy HH:mm')}</em></p>
      </div>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const handleShareBooking = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Parking Booking Confirmation',
          text: `My parking booking has been confirmed! Reference: ${bookingReference}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
        setShowShareDialog(true);
      }
    } else {
      setShowShareDialog(true);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setShowSuccessMessage(true);
  };

  const handleAddToCalendar = () => {
    const startDate =
      bookingData?.searchData?.entryDate || formatFn(new Date(), 'yyyy-MM-dd');
    const endDate =
      bookingData?.searchData?.exitDate ||
      formatFn(addDays(new Date(), 1), 'yyyy-MM-dd');

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Airport Parking - ${airport}&dates=${formatFn(parseISO(startDate), 'yyyyMMdd')}/${formatFn(parseISO(endDate), 'yyyyMMdd')}&details=Booking Reference: ${bookingReference}%0AService: ${service}%0ALocation: ${airport}&location=${airport}`;

    window.open(calendarUrl, '_blank');
  };

  // RELAXED: Show partial page even without full data (use URL params)
  const status = searchParams.get('status');
  if (status !== '1') {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Alert severity="error">
          Payment status: {status || 'unknown'}. Reference: {bookingReference || 'N/A'}.
        </Alert>
        <Button variant="contained" onClick={() => navigate('/payment')} sx={{ mt: 2, mr: 1 }}>
          Try Payment Again
        </Button>
        <Button variant="outlined" onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      <Seo
        title="Booking Confirmed | Go Airport Parking"
        description="Your airport parking booking has been confirmed."
        canonical={canonicalUrl}
        robots="noindex,follow"
      />

      {paymentFinalized && (
        <>
          <AwinTracking
            price={totalAmount}
            currency={currencyCode}
            refId={bookingReference}
            awc={awcValue}
          />
          <AwinFallbackPixel
            price={totalAmount}
            currency={currencyCode}
            refId={bookingReference}
          />
          <AwinConversionScript
            price={totalAmount}
            currency={currencyCode}
            refId={bookingReference}
          />
        </>
      )}

      <PageWrapper>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          {paymentError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {paymentError}
            </Alert>
          )}

          {!paymentFinalized && !paymentError && (
            <Alert severity="info" sx={{ mb: 3 }}>
              Finalising your booking confirmation...
            </Alert>
          )}

          <AnimateOnScroll
            type="zoom-in"
            duration={800}
            delay={100}
            easingTransform={EASE_SOFT}
            threshold={THRESHOLD}
            rootMargin={ROOT_MARGIN}
            once
            style={smoothStyle}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <CheckIcon sx={{ fontSize: 100, color: 'success.main', mb: 2 }} />
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 800, color: 'success.main' }}>
                Booking Confirmed!
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                Your parking has been successfully booked and payment confirmed.
              </Typography>
              <Chip
                label={`Reference: ${bookingReference}`}
                color="success"
                variant="outlined"
                sx={{ fontSize: '1rem', py: 1, px: 2, height: 'auto' }}
              />
            </Box>
          </AnimateOnScroll>

          <Grid
            container
            display="flex"
            sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
            justifyContent="space-between"
            spacing={4}
          >
            <Grid item lg={8} flex="1.2">
              <AnimateOnScroll
                type="slide-up"
                distance={20}
                duration={700}
                delay={200}
                easingTransform={EASE_SOFT}
                threshold={THRESHOLD}
                rootMargin={ROOT_MARGIN}
                once
                style={smoothStyle}
              >
                <Card elevation={3} sx={{ mb: 3 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                      <ReceiptIcon sx={{ mr: 2, color: 'primary.main' }} />
                      Booking Details
                    </Typography>
                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Booking Reference
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                          {bookingReference}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Transaction ID
                        </Typography>
                        <Typography variant="body1">
                          {transactionId || 'Processing...'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Payment Method
                        </Typography>
                        <Typography variant="body1">
                          {paymentMethod || 'WorldPay'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Total Paid
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
                          {currencySymbol}{totalAmount || 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </AnimateOnScroll>

              <AnimateOnScroll
                type="slide-up"
                distance={20}
                duration={700}
                delay={300}
                easingTransform={EASE_SOFT}
                threshold={THRESHOLD}
                rootMargin={ROOT_MARGIN}
                once
                style={smoothStyle}
              >
                <Card elevation={3} sx={{ mb: 3 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                      <LocationIcon sx={{ mr: 2, color: 'primary.main' }} />
                      Service Information
                    </Typography>
                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Airport
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {loadingAirport ? (
                            <>
                              <CircularProgress size={16} sx={{ mr: 1 }} />
                              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                Loading airport...
                              </Typography>
                            </>
                          ) : (
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {airportName || airport || 'Airport information not available'}
                              {airport && airport !== airportName && (
                                <Typography
                                  variant="body2"
                                  component="span"
                                  sx={{ ml: 1, color: 'text.secondary' }}
                                >
                                  ({airport})
                                </Typography>
                              )}
                            </Typography>
                          )}
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Service Type
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {service || 'Service information not available'}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          gutterBottom
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          <ScheduleIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          Drop-off Date & Time
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>
                          {formatDate(entryDate || bookingData?.searchData?.entryDate)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                          at {formatTime(entryTime || bookingData?.searchData?.entryTime)}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          gutterBottom
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          <ScheduleIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          Pick-up Date & Time
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>
                          {formatDate(exitDate || bookingData?.searchData?.exitDate)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                          at {formatTime(exitTime || bookingData?.searchData?.exitTime)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </AnimateOnScroll>

              {(supplierCost > 0 || cancellationCharge > 0 || smsCharge > 0 || bookingFee > 0) && (
                <AnimateOnScroll
                  type="slide-up"
                  distance={20}
                  duration={700}
                  delay={400}
                  easingTransform={EASE_SOFT}
                  threshold={THRESHOLD}
                  rootMargin={ROOT_MARGIN}
                  once
                  style={smoothStyle}
                >
                  <Card elevation={3} sx={{ mb: 3 }}>
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                        <MoneyIcon sx={{ mr: 2, color: 'primary.main' }} />
                        Payment Breakdown
                      </Typography>
                      <Divider sx={{ mb: 3 }} />

                      <Grid container spacing={2}>
                        {supplierCost > 0 && (
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                Parking:
                              </Typography>
                              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                {currencySymbol}{supplierCost.toFixed(2)}
                              </Typography>
                            </Box>
                          </Grid>
                        )}

                        {cancellationCharge > 0 && (
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                Cancellation Protection:
                              </Typography>
                              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                {currencySymbol}{cancellationCharge.toFixed(2)}
                              </Typography>
                            </Box>
                          </Grid>
                        )}

                        {smsCharge > 0 && (
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                SMS updates:
                              </Typography>
                              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                {currencySymbol}{smsCharge.toFixed(2)}
                              </Typography>
                            </Box>
                          </Grid>
                        )}

                        {bookingFee > 0 && (
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                Booking fee:
                              </Typography>
                              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                {currencySymbol}{bookingFee.toFixed(2)}
                              </Typography>
                            </Box>
                          </Grid>
                        )}

                        <Grid item xs={12}>
                          <Divider sx={{ my: 2 }} />
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              Total Paid:
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
                              {currencySymbol}{totalAmount || '0.00'}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </AnimateOnScroll>
              )}
            </Grid>

            <Grid item xs={12} lg={4} flex="0.4">
              <AnimateOnScroll
                type="slide-up"
                distance={20}
                duration={700}
                delay={200}
                easingTransform={EASE_SOFT}
                threshold={THRESHOLD}
                rootMargin={ROOT_MARGIN}
                once
                style={smoothStyle}
              >
                <Card elevation={3} sx={{ mb: 3 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      Quick Actions
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                      <Button variant="outlined" fullWidth startIcon={<DownloadIcon />} onClick={handleDownloadVoucher}>
                        Download Voucher
                      </Button>
                      <Button variant="outlined" fullWidth startIcon={<PrintIcon />} onClick={handlePrintVoucher}>
                        Print Confirmation
                      </Button>
                      <Button variant="outlined" fullWidth startIcon={<CalendarIcon />} onClick={handleAddToCalendar}>
                        Add to Calendar
                      </Button>
                      <Button variant="outlined" fullWidth startIcon={<ShareIcon />} onClick={handleShareBooking}>
                        Share Booking
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </AnimateOnScroll>

              {(customerName || customerEmail) && (
                <AnimateOnScroll
                  type="slide-up"
                  distance={20}
                  duration={700}
                  delay={300}
                  easingTransform={EASE_SOFT}
                  threshold={THRESHOLD}
                  rootMargin={ROOT_MARGIN}
                  once
                  style={smoothStyle}
                >
                  <Card elevation={3} sx={{ mb: 3 }}>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        Contact Information
                      </Typography>

                      {customerName && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                            {customerName.charAt(0).toUpperCase()}
                          </Avatar>
                          <Typography variant="body1">{customerName}</Typography>
                        </Box>
                      )}

                      {customerEmail && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <EmailIcon sx={{ mr: 2, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {customerEmail}
                          </Typography>
                        </Box>
                      )}

                      {customerMobile && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <PhoneIcon sx={{ mr: 2, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {customerMobile}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </AnimateOnScroll>
              )}
            </Grid>
          </Grid>

          <AnimateOnScroll
            type="slide-up"
            distance={20}
            duration={700}
            delay={600}
            easingTransform={EASE_SOFT}
            threshold={THRESHOLD}
            rootMargin={ROOT_MARGIN}
            once
            style={smoothStyle}
          >
            <Alert severity="info" sx={{ mt: 4, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                What happens next?
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                • You will receive a confirmation email with your booking details within the next few minutes
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                • Please arrive at the designated location at your specified time
              </Typography>
              <Typography variant="body2">
                • Keep your booking reference handy for easy check-in
              </Typography>
            </Alert>
          </AnimateOnScroll>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<HomeIcon />}
              onClick={() => navigate('/')}
              sx={{ mr: 2 }}
            >
              Back to Home
            </Button>
          </Box>
        </Container>
      </PageWrapper>

      <Dialog open={showShareDialog} onClose={() => setShowShareDialog(false)}>
        <DialogTitle>
          Share Booking Confirmation
          <IconButton
            onClick={() => setShowShareDialog(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" gutterBottom>
            Share your booking reference:
          </Typography>
          <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
            <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
              {bookingReference}
            </Typography>
          </Box>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => copyToClipboard(bookingReference)}
          >
            Copy Reference
          </Button>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={3000}
        onClose={() => setShowSuccessMessage(false)}
        message="Action completed successfully!"
      />
    </Box>
  );
};

export default BookingSuccess;