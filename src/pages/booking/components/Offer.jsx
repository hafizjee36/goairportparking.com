import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  Security as SecurityIcon,
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

  const [open, setOpen] = useState(false);

  // Get pricing from product data
  const getCancellationPrice = () => {
    if (!selectedProduct) return 2; // fallback £2
    if (selectedProduct.payment?.cancellation_charges) {
      return parseFloat(selectedProduct.payment.cancellation_charges);
    }
    return parseFloat(selectedProduct.cancellation_charges || 2);
  };

  const cancellationPrice = getCancellationPrice();

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

                  <Chip 
                    label={formatPrice(cancellationPrice, currencySymbol)}
                    color="primary"
                    size="small"
                  />
                </Box>

                {/* SHORT DESCRIPTION */}
                <Typography variant="body2" color="text.secondary" mb={0.5}>
                  Cancel your booking before arrival and receive a refund (excludes booking fee).
                </Typography>

                {/* LEARN MORE LINK */}
                <Typography
                  variant="body2"
                  sx={{
                    color: '#1976d2',
                    cursor: 'pointer',
                    fontWeight: 500,
                  }}
                  onClick={() => setOpen(true)}
                >
                  Learn more
                </Typography>

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

      </FormGroup>

      {/* MODAL */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Cancellation Protection</DialogTitle>
        <DialogContent>
          <Typography variant="body2" mb={1}>
            You can cancel your booking up to 24 hours before your arrival time.
          </Typography>
          <Typography variant="body2" mb={1}>
            A full refund will be issued excluding the booking fee.
          </Typography>
          <Typography variant="body2">
            Refunds are processed back to your original payment method.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default Offer;