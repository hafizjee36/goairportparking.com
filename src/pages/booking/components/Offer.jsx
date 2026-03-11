import React from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Paper,
  Chip,
  Divider,
} from '@mui/material';
import {
  Security as SecurityIcon,
  Sms as SmsIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import theme from '../../../theme';
import { formatPrice } from '../../../utils/calculateTotalBookingAmount';
import { selectSearchData } from '../../../redux/slice/searchSlice';
import { useSelector } from 'react-redux';

const Offer = ({
  bookingOptions = {},
  updateBooking,
  selectedProduct = null,
}) => {
  // Get pricing from product data
  const getCancellationPrice = () => {
    if (!selectedProduct) return 0;
    if (selectedProduct.payment?.cancellation_charges) {
      return parseFloat(selectedProduct.payment.cancellation_charges);
    }
    return parseFloat(selectedProduct.cancellation_charges || 0);
  };

  const getSmsPrice = () => {
    if (!selectedProduct) return 0;
    if (selectedProduct.payment?.sms_charges) {
      return parseFloat(selectedProduct.payment.sms_charges);
    }
    return parseFloat(selectedProduct.sms_charges || 0);
  };

  const cancellationPrice = getCancellationPrice();
  const smsPrice = getSmsPrice();

  const searchData = useSelector(selectSearchData);
  const currencySymbol = searchData?.airport === "DXB" ? "AED" : searchData?.airport === "DUB" ? "€" : "£";

  return (
    <Box
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 3,
        border: '1px solid #E0E0E0',
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="h5" fontWeight="bold" color="primary.main" mb={1}>
        Additional Services
      </Typography>

      <FormGroup>
        {/* Cancellation Protection */}
        <Paper
          elevation={1}
          sx={{
            p: 1,
            mb: 1,
            border: bookingOptions.cancellationProtection ? '2px solid #1976d2' : '1px solid #E0E0E0',
            backgroundColor: bookingOptions.cancellationProtection ? '#f3f8ff' : '#FAFAFA',
            transition: 'all 0.3s ease',
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={2}>
              <SecurityIcon 
                color={bookingOptions.cancellationProtection ? 'primary' : 'action'}
                fontSize="large"
              />
              <Box>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Typography variant="h6" fontWeight="bold">
                    Cancellation Protection
                  </Typography>
                  {cancellationPrice > 0 && (
                    <Chip 
                      label={formatPrice(cancellationPrice, currencySymbol)}
                      color="primary"
                      size="small"
                    />
                  )}
                </Box>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Cancel your booking before your arrival date
                </Typography>
                {/* <Box display="flex" alignItems="center" gap={1}>
                  <CheckIcon color="success" fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    Full refund available
                  </Typography>
                </Box> */}
              </Box>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={bookingOptions.cancellationProtection || false}
                  onChange={(e) => updateBooking('cancellationProtection', e.target.checked)}
                  color="primary"
                />
              }
              label=""
            />
          </Box>
        </Paper>

        {/* SMS Updates */}
        {/* <Paper
          elevation={1}
          sx={{
            p: 1,
            mb: 1,
            border: bookingOptions.smsUpdates ? '2px solid #1976d2' : '1px solid #E0E0E0',
            backgroundColor: bookingOptions.smsUpdates ? '#f3f8ff' : '#FAFAFA',
            transition: 'all 0.3s ease',
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={2}>
              <SmsIcon 
                color={bookingOptions.smsUpdates ? 'primary' : 'action'}
                fontSize="large"
              />
              <Box>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Typography variant="h6" fontWeight="bold">
                    SMS Updates
                  </Typography>
                  {smsPrice > 0 && (
                    <Chip 
                      label={formatPrice(smsPrice)}
                      color="primary"
                      size="small"
                    />
                  )}
                </Box>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Receive text message updates about your booking and parking instructions
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <CheckIcon color="success" fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    Real-time notifications
                  </Typography>
                </Box>
              </Box>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={bookingOptions.smsUpdates || false}
                  onChange={(e) => updateBooking('smsUpdates', e.target.checked)}
                  color="primary"
                />
              }
              label=""
            />
          </Box>
        </Paper> */}
      </FormGroup>

    </Box>
  );
};

export default Offer;

