import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Print as PrintIcon,
  Home as HomeIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';

const BookingSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get URL parameters (matching Next.js implementation)
  const multiModeReferenceNo = searchParams.get('multi_mode_reference_no') || searchParams.get('bookingReference');
  const referenceNo = searchParams.get('reference_no');
  const transactionID = searchParams.get('transactionID');
  const paymentMethod = searchParams.get('paymentMethod');

  // Component state
  const [bookingData, setBookingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load booking data from session storage
  useEffect(() => {
    const loadBookingData = () => {
      try {
        // Try to get booking data from session storage
        const storedBookingData = sessionStorage.getItem('booking_data');
        const storedBookingDetails = sessionStorage.getItem('booking_details');

        let data = null;

        if (storedBookingData) {
          data = JSON.parse(storedBookingData);
        } else if (storedBookingDetails) {
          data = JSON.parse(storedBookingDetails);
        }

        if (data) {
          setBookingData({
            ...data,
            // Override with URL parameters if available
            multiModeReferenceNo: multiModeReferenceNo || data.multiModeReferenceNo,
            referenceNo: referenceNo || data.referenceNo,
            transactionID: transactionID || data.transactionID,
            paymentMethod: paymentMethod || data.paymentMethod || 'Worldpay',
          });
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error loading booking data:', error);
        setIsLoading(false);
      }
    };

    loadBookingData();
  }, [multiModeReferenceNo, referenceNo, transactionID, paymentMethod]);

  // Handle print functionality
  const handlePrint = () => {
    window.print();
  };

  // Calculate total amount
  const calculateTotal = () => {
    if (!bookingData?.selectedProduct) return 0;

    const basePrice = bookingData.selectedProduct.payment?.amount
      ? parseFloat(bookingData.selectedProduct.payment.amount)
      : parseFloat(bookingData.selectedProduct.price || 0);

    let total = basePrice;

    // Add admin charges
    const adminCharges = bookingData.selectedProduct.payment?.admin_charges
      ? parseFloat(bookingData.selectedProduct.payment.admin_charges)
      : parseFloat(bookingData.selectedProduct.admin_charges || 0);
    total += adminCharges;

    // Add cancellation charges if selected
    if (bookingData.bookingOptions?.cancellationProtection) {
      const cancellationCharges = bookingData.selectedProduct.payment?.cancellation_charges
        ? parseFloat(bookingData.selectedProduct.payment.cancellation_charges)
        : parseFloat(bookingData.selectedProduct.cancellation_charges || 2);
      total += cancellationCharges;
    }

    // Add SMS charges if selected
    if (bookingData.bookingOptions?.smsUpdates) {
      const smsCharges = bookingData.selectedProduct.payment?.sms_charges
        ? parseFloat(bookingData.selectedProduct.payment.sms_charges)
        : parseFloat(bookingData.selectedProduct.sms_charges || 0.99);
      total += smsCharges;
    }

    return Math.max(0, total);
  };

  // Format date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Not specified';
    try {
      return format(new Date(dateStr), 'dd MMM yyyy HH:mm');
    } catch {
      return dateStr;
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} sx={{ mb: 3, color: 'success.main' }} />
        <Typography variant="h5" gutterBottom>
          Loading your booking confirmation...
        </Typography>
      </Container>
    );
  }

  if (!multiModeReferenceNo && !referenceNo) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            No booking information found
          </Typography>
          <Typography variant="body2">
            We couldn't find your booking details. This might be because you accessed this page directly
            or your session has expired.
          </Typography>
        </Alert>
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
            startIcon={<HomeIcon />}
          >
            Return to Home
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Success Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <CheckIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
        <Typography variant="h3" gutterBottom sx={{ color: 'success.main', fontWeight: 600 }}>
          Booking Confirmed!
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Thank you for your booking. Your payment has been processed successfully.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          A confirmation email has been sent to your registered email address.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Booking Details */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckIcon color="success" />
                Booking Details
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Booking Reference
                  </Typography>
                  <Typography variant="h6" sx={{ fontFamily: 'monospace', color: 'success.main' }}>
                    {multiModeReferenceNo || 'N/A'}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Reference Number
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                    {referenceNo || 'N/A'}
                  </Typography>
                </Grid>

                {transactionID && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Transaction ID
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                      {transactionID}
                    </Typography>
                  </Grid>
                )}

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Payment Method
                  </Typography>
                  <Typography variant="body1">
                    {paymentMethod || 'Worldpay'}
                  </Typography>
                </Grid>
              </Grid>

              {/* Service Details */}
              {bookingData?.selectedProduct && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Typography variant="h6" gutterBottom>
                    Service Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Service Type
                      </Typography>
                      <Typography variant="body1">
                        {bookingData.selectedProduct.type || 'Airport Parking'}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Airport
                      </Typography>
                      <Typography variant="body1">
                        {bookingData.searchData?.airport || 'Not specified'}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Entry Date & Time
                      </Typography>
                      <Typography variant="body1">
                        {formatDate(`${bookingData.searchData?.entryDate} ${bookingData.searchData?.entryTime}`)}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Exit Date & Time
                      </Typography>
                      <Typography variant="body1">
                        {formatDate(`${bookingData.searchData?.exitDate} ${bookingData.searchData?.exitTime}`)}
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              )}

              {/* Customer Details */}
              {bookingData?.personalData && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Typography variant="h6" gutterBottom>
                    Customer Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Name
                      </Typography>
                      <Typography variant="body1">
                        {`${bookingData.personalData.first_name || ''} ${bookingData.personalData.last_name || ''}`.trim() ||
                          `${bookingData.personalData.firstName || ''} ${bookingData.personalData.lastName || ''}`.trim() ||
                          'Not provided'}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body1">
                        {bookingData.personalData.email || bookingData.personalData.email || 'Not provided'}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Phone
                      </Typography>
                      <Typography variant="body1">
                        {bookingData.personalData.contact_no || bookingData.personalData.phone || 'Not provided'}
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              )}

              {/* Vehicle Details */}
              {bookingData?.vehicleData?.length > 0 && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Typography variant="h6" gutterBottom>
                    Vehicle Details
                  </Typography>
                  {bookingData.vehicleData.map((vehicle, index) => (
                    <Box key={index} sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Vehicle {index + 1}
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6} sm={3}>
                          <Typography variant="body2" color="text.secondary">Make</Typography>
                          <Typography variant="body1">{vehicle.make || 'N/A'}</Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <Typography variant="body2" color="text.secondary">Model</Typography>
                          <Typography variant="body1">{vehicle.model || 'N/A'}</Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <Typography variant="body2" color="text.secondary">Color</Typography>
                          <Typography variant="body1">{vehicle.color || 'N/A'}</Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <Typography variant="body2" color="text.secondary">Registration</Typography>
                          <Typography variant="body1" sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                            {vehicle.reg_no || vehicle.reg_no || 'N/A'}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Payment Summary & Actions */}
        <Grid item xs={12} md={4}>
          {/* Payment Summary */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Payment Summary
              </Typography>
              <Divider sx={{ my: 2 }} />

              {bookingData?.selectedProduct && (
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Base Price:</Typography>
                    <Typography variant="body2">
                      £{(parseFloat(bookingData.selectedProduct.price || 0)).toFixed(2)}
                    </Typography>
                  </Box>

                  {bookingData.bookingOptions?.smsUpdates && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">SMS Updates:</Typography>
                      <Typography variant="body2">£0.99</Typography>
                    </Box>
                  )}

                  {bookingData.bookingOptions?.cancellationProtection && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Cancellation Cover:</Typography>
                      <Typography variant="body2">£2.00</Typography>
                    </Box>
                  )}

                  <Divider sx={{ my: 1 }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">Total Paid:</Typography>
                    <Typography variant="h6" sx={{ color: 'success.main' }}>
                      £{(bookingData.totalAmount || calculateTotal()).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              )}

              <Alert severity="success" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  Payment Status: <strong>Confirmed</strong>
                </Typography>
              </Alert>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                What's Next?
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handlePrint}
                  startIcon={<PrintIcon />}
                >
                  Print Confirmation
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate('/')}
                  startIcon={<HomeIcon />}
                >
                  Return to Home
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  component={Link}
                  to="/contact-us"
                  startIcon={<EmailIcon />}
                >
                  Contact Support
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon color="primary" />
                Need Help?
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                If you have any questions about your booking, please contact us:
              </Typography>
              <Typography variant="body2">
                <strong>Email:</strong> support@airportparking.com
              </Typography>
              <Typography variant="body2">
                <strong>Phone:</strong> +44 123 456 7890
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, fontSize: '0.875rem', color: 'text.secondary' }}>
                Reference: {multiModeReferenceNo}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Important Information */}
      <Card sx={{ mt: 4, bgcolor: '#f8f9fa' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Important Information
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            • Please arrive at the designated location at least 15 minutes before your scheduled time
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            • Keep your booking reference handy when you arrive
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            • Check your email for detailed instructions and directions
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Contact us immediately if your travel plans change
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BookingSuccess;
