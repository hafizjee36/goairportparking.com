import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
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
  DialogActions,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import {
  Cancel as CancelIcon,
  Home as HomeIcon,
  Refresh as RefreshIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { format as formatFn, isValid, parseISO } from 'date-fns';
import theme from '../../theme';
import PageWrapper from '../../components/reusable/PageWrapper';
import { getAirportByCode } from '../../services/airportService';

// Animation components
import AnimateOnScroll from '../../components/reusable/AnimateOnScroll';
import {
  EASE_SOFT,
  THRESHOLD,
  ROOT_MARGIN,
  smoothStyle,
} from '../../components/utils/animation';

const BookingCancel = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const raw = localStorage.getItem('trustpayment_session') ?? localStorage.getItem('totalpay_session');
  const session = raw ? JSON.parse(raw) : null;
  console.log('totalpay/trustpayment session:', session);

  // Get URL parameters
  const bookingReference = searchParams.get('bookingReference') || searchParams.get('multi_mode_reference_no') || session?.bookingReference;
  const referenceNo = searchParams.get('reference_no') || session?.referenceNo;
  const transactionId = searchParams.get('transactionID') || searchParams.get('ref') || session?.transactionId;
  const customerName = searchParams.get('name') || session?.name;
  const customerEmail = searchParams.get('email') || session?.email;
  const customerMobile = searchParams.get('mobile') || session?.mobile;
  const airport = searchParams.get('airport') || session?.airport;
  const service = searchParams.get('service') || session?.service;

  // Get booking dates and times
  const entryDate = searchParams.get('entryDate') || session?.entryDate;
  const entryTime = searchParams.get('entryTime') || session?.entryTime;
  const exitDate = searchParams.get('exitDate') || session?.exitDate;
  const exitTime = searchParams.get('exitTime') || session?.exitTime;

  // Get charge breakdown (may not be available for cancelled payments)
  const supplierCost = parseFloat(searchParams.get('suppliercost') || '0');
  const cancellationCharge = parseFloat(searchParams.get('cancellationCharge') || '0');
  const smsCharge = parseFloat(searchParams.get('smsCharge') || '0');
  const bookingFee = parseFloat(searchParams.get('bookingFee') || '0');

  const currencyCode = (airport === 'DXB' ? "AED": airport === 'DUB' || (!airport && service?.toLowerCase().includes('dublin'))) ? 'EUR' : 'GBP';

  // Component state
  const [bookingData, setBookingData] = useState(null);
  const [airportName, setAirportName] = useState('');
  const [loadingAirport, setLoadingAirport] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  // Try to get booking data from session storage on mount
  useEffect(() => {
    const storedBookingData = sessionStorage.getItem('booking_data');
    if (storedBookingData) {
      try {
        const parsedData = JSON.parse(storedBookingData);
        setBookingData(parsedData);
      } catch (error) {
        console.error('Error parsing stored booking data:', error);
      }
    }

    // Clean up session storage
    sessionStorage.removeItem('booking_data');
    sessionStorage.removeItem('worldpay_session');
  }, []);

  // Fetch airport name by code
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

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = parseISO(dateString);
    return isValid(date) ? formatFn(date, 'dd MMM yyyy') : dateString;
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'Not specified';
    return timeString;
  };

  const handleRetryPayment = () => {
    navigate('/payment');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleContactSupport = () => {
    navigate('/contact-us');
  };

  if (!bookingReference && !bookingData) {
    return (
      <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
        <PageWrapper>
          <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
            <Alert severity="warning">
              No booking information found. Your session may have expired.
            </Alert>
            <Button
              variant="contained"
              onClick={() => navigate('/')}
              sx={{ mt: 2 }}
            >
              Back to Home
            </Button>
          </Container>
        </PageWrapper>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      <PageWrapper>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          {/* Cancel Header */}
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
              <CancelIcon sx={{ fontSize: 100, color: 'warning.main', mb: 2 }} />
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 800, color: 'warning.main' }}>
                Payment Cancelled
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                Your payment was cancelled. No charges have been made to your account.
              </Typography>
              {bookingReference && (
                <Chip
                  label={`Reference: ${bookingReference}`}
                  color="warning"
                  variant="outlined"
                  sx={{ fontSize: '1rem', py: 1, px: 2, height: 'auto' }}
                />
              )}
            </Box>
          </AnimateOnScroll>

          <Grid container display="flex" sx={{
            flexDirection: { xs: "column", sm: "row" },
          }} justifyContent="space-between" spacing={4}>
            {/* Main Content - Left Column: Booking Details, Service Information */}
            <Grid item lg={8} flex="1.2" >
              {/* Booking Details */}
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
                      <InfoIcon sx={{ mr: 2, color: 'primary.main' }} />
                      Booking Details
                    </Typography>
                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Booking Reference
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'warning.main' }}>
                          {bookingReference || 'Not available'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Transaction ID
                        </Typography>
                        <Typography variant="body1">
                          {transactionId || 'Not available'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Status
                        </Typography>
                        <Chip
                          label="Cancelled"
                          color="warning"
                          size="small"
                          variant="filled"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </AnimateOnScroll>

              {/* Service Information */}
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
                                <Typography variant="body2" component="span" sx={{ ml: 1, color: 'text.secondary' }}>
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

                      {/* Departure Date and Time */}
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
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

                      {/* Arrival Date and Time */}
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
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

              {/* What Happened Card */}
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
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                      What happened?
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                      You cancelled the payment process before it was completed. Your booking has not been confirmed 
                      and no payment has been processed.
                    </Typography>
                    <Alert severity="info" sx={{ mb: 0 }}>
                      <Typography variant="body2">
                        Your booking details are still saved. You can try the payment again or contact support for assistance.
                      </Typography>
                    </Alert>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            </Grid>

            {/* Sidebar - Right Column: Quick Actions and Contact Information */}
            <Grid item xs={12} lg={4} flex="0.4">
              {/* Quick Actions */}
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
                      What would you like to do?
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        startIcon={<RefreshIcon />}
                        onClick={handleRetryPayment}
                      >
                        Try Payment Again
                      </Button>
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<HomeIcon />}
                        onClick={handleGoHome}
                      >
                        Back to Home
                      </Button>
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={handleContactSupport}
                      >
                        Contact Support
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </AnimateOnScroll>

              {/* Contact Information */}
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
                          <Avatar sx={{ mr: 2, bgcolor: 'warning.main' }}>
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

          {/* Next Steps */}
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
                Need help?
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                • If you experienced any issues during the payment process, please try again
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                • Your booking details have been saved - you can complete the payment later
              </Typography>
              <Typography variant="body2">
                • Contact our support team if you need assistance
              </Typography>
            </Alert>
          </AnimateOnScroll>

          {/* Navigation */}
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<HomeIcon />}
              onClick={handleGoHome}
              sx={{ mr: 2 }}
            >
              Back to Home
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<RefreshIcon />}
              onClick={handleRetryPayment}
            >
              Try Again
            </Button>
          </Box>
        </Container>
      </PageWrapper>

      {/* Message Snackbar */}
      <Snackbar
        open={showMessage}
        autoHideDuration={3000}
        onClose={() => setShowMessage(false)}
        message="Action completed!"
      />
    </Box>
  );
};

export default BookingCancel;
