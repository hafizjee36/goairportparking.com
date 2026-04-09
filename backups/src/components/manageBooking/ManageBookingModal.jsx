import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Close as CloseIcon,
  Search as SearchIcon,
  BookmarkBorder as BookmarkIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  DirectionsCar as CarIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import apiCall from '../../services/apiService';
import { apiKey } from '../../common/config/api';
import { setAuthData } from '../../redux/slice/authSlice';

const ManageBookingModal = ({ open, onClose, onBookingFound }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchMethod, setSearchMethod] = useState('reference'); // 'reference' or 'email'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Form states for reference search
  const [referenceData, setReferenceData] = useState({
    bookingReference: '',
    emailAddress: '',
  });

  // Form states for email search
  const [emailData, setEmailData] = useState({
    emailAddress: '',
    mobileOrVehicleReg: '',
  });

  const handleInputChange = (field, value) => {
    setError(''); // Clear error when user starts typing
    
    if (searchMethod === 'reference') {
      setReferenceData(prev => ({
        ...prev,
        [field]: value
      }));
    } else {
      setEmailData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const validateForm = () => {
    if (searchMethod === 'reference') {
      if (!referenceData.bookingReference.trim()) {
        setError('Please enter your booking reference number.');
        return false;
      }
      if (!referenceData.emailAddress.trim()) {
        setError('Please enter your email address.');
        return false;
      }
      // Basic email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(referenceData.emailAddress)) {
        setError('Please enter a valid email address.');
        return false;
      }
    } else {
      if (!emailData.emailAddress.trim()) {
        setError('Please enter your email address.');
        return false;
      }
      if (!emailData.mobileOrVehicleReg.trim()) {
        setError('Please enter your mobile number or vehicle registration.');
        return false;
      }
      // Basic email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailData.emailAddress)) {
        setError('Please enter a valid email address.');
        return false;
      }
    }
    return true;
  };

  const handleSearch = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      let loginData;
      
      if (searchMethod === 'reference') {
        // Login with booking reference and email
        loginData = {
          key: apiKey,
          email: referenceData.emailAddress,
          common: '', // This seems to be a default value from your example
          reference_no: referenceData.bookingReference
        };
      } else {
        // Login with email and mobile/vehicle registration
        loginData = {
          key: apiKey,
          email: emailData.emailAddress,
          common: emailData.mobileOrVehicleReg, // Mobile number or vehicle reg
          reference_no: '' // Empty for email-based search
        };
      }

      console.log('🔄 Login API Request:', {
        endpoint: '/login',
        data: { ...loginData, key: loginData.key.substring(0, 8) + '...' } // Hide full API key in logs
      });

      // Make actual API call to login endpoint
      const response = await apiCall('POST', '/login', loginData, {}, 'customer-login');

      console.log('📥 Login API Response:', response);

      if (response?.success && response?.data) {
        const { token, site, password } = response.data;

        // Store token in localStorage for persistence
        if (token) {
          localStorage.setItem('authToken', token);
          localStorage.setItem('customerData', JSON.stringify({
            email: searchMethod === 'reference' ? referenceData.emailAddress : emailData.emailAddress,
            searchMethod: searchMethod,
            loginTime: new Date().toISOString(),
            site: site,
            password: password
          }));
        }

        // Store auth data in Redux for app state
        dispatch(setAuthData({
          token: token,
          customerEmail: searchMethod === 'reference' ? referenceData.emailAddress : emailData.emailAddress,
          searchMethod: searchMethod,
          site: site,
          password: password,
          isLoggedIn: true,
          loginTime: new Date().toISOString()
        }));

        // Prepare booking data for dashboard
        const bookingData = {
          referenceNo: searchMethod === 'reference' ? referenceData.bookingReference : '',
          customerEmail: searchMethod === 'reference' ? referenceData.emailAddress : emailData.emailAddress,
          searchMethod: searchMethod,
          token: token,
          site: site,
          password: password,
          loginResponse: response
        };

        // Call parent callback with found booking data (if provided)
        if (onBookingFound) {
          onBookingFound(bookingData);
        }

        // Show success message
        toast.success('Login successful! Redirecting to dashboard...', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });

        // Close modal
        onClose();

        // Navigate to customer dashboard with booking data
        setTimeout(() => {
          navigate('/customer-dashboard', {
            state: { bookingData }
          });
        }, 500);

      } else {
        // Handle API error response
        const errorMessage = response?.message || 'Login failed. Please check your credentials and try again.';
        setError(errorMessage);
        
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }

    } catch (error) {
      console.error('❌ Login API Error:', error);
      
      const errorMessage = error.message || 'Unable to connect to server. Please check your internet connection and try again.';
      setError(errorMessage);
      
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    // Reset form data when closing
    setReferenceData({ bookingReference: '', emailAddress: '' });
    setEmailData({ emailAddress: '', mobileOrVehicleReg: '' });
    setError('');
    setIsLoading(false);
    onClose();
  };

  const switchSearchMethod = (method) => {
    setSearchMethod(method);
    setError(''); // Clear any existing errors
    // Reset forms when switching
    setReferenceData({ bookingReference: '', emailAddress: '' });
    setEmailData({ emailAddress: '', mobileOrVehicleReg: '' });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', sm: '90%', md: 900 },
          maxHeight: { xs: '100%', sm: '90vh' },
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 24,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 3,
            borderBottom: `1px solid ${theme.palette.divider}`,
            bgcolor: theme.palette.secondary.main,
            color: 'white',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: 'white',
            }}
          >
            Manage My Booking(s)
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            p: 3,
          }}
        >
          <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
            {/* Reference Number Search */}
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  p: 3,
                  border: `2px solid ${searchMethod === 'reference' ? theme.palette.secondary.main : theme.palette.divider}`,
                  borderRadius: 3,
                  bgcolor: searchMethod === 'reference' ? 'rgba(37, 38, 84, 0.02)' : 'background.paper',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: theme.palette.secondary.main,
                    bgcolor: 'rgba(37, 38, 84, 0.02)',
                  },
                }}
                onClick={() => switchSearchMethod('reference')}
              >
                <Box sx={{ mb: 3, textAlign: 'center' }}>
                  <BookmarkIcon
                    sx={{
                      fontSize: 48,
                      color: theme.palette.secondary.main,
                      mb: 1,
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.secondary.main,
                      mb: 1,
                    }}
                  >
                    Search Booking By Reference No
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Booking Reference"
                    placeholder="Enter your booking reference"
                    value={referenceData.bookingReference}
                    onChange={(e) => handleInputChange('bookingReference', e.target.value)}
                    required
                    fullWidth
                    variant="outlined"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchMethod('reference');
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: theme.palette.secondary.main,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.secondary.main,
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: theme.palette.secondary.main,
                      },
                    }}
                  />
                  
                  <TextField
                    label="Email Address"
                    placeholder="Enter your email address"
                    type="email"
                    value={referenceData.emailAddress}
                    onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                    required
                    fullWidth
                    variant="outlined"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchMethod('reference');
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: theme.palette.secondary.main,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.secondary.main,
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: theme.palette.secondary.main,
                      },
                    }}
                  />

                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={isLoading || searchMethod !== 'reference'}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSearch();
                    }}
                    startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
                    sx={{
                      mt: 1,
                      py: 1.5,
                      bgcolor: theme.palette.secondary.main,
                      color: 'white',
                      fontWeight: 600,
                      '&:hover': {
                        bgcolor: theme.palette.secondary.dark || 'rgba(37, 38, 84, 0.9)',
                      },
                      '&:disabled': {
                        bgcolor: theme.palette.divider,
                        color: theme.palette.text.disabled,
                      },
                    }}
                  >
                    {isLoading && searchMethod === 'reference' ? 'Searching...' : 'Search Booking(S)'}
                  </Button>
                </Box>
              </Box>
            </Grid>

            {/* Email Address Search */}
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  p: 3,
                  border: `2px solid ${searchMethod === 'email' ? theme.palette.primary.main : theme.palette.divider}`,
                  borderRadius: 3,
                  bgcolor: searchMethod === 'email' ? 'rgba(248, 191, 18, 0.02)' : 'background.paper',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    bgcolor: 'rgba(248, 191, 18, 0.02)',
                  },
                }}
                onClick={() => switchSearchMethod('email')}
              >
                <Box sx={{ mb: 3, textAlign: 'center' }}>
                  <EmailIcon
                    sx={{
                      fontSize: 48,
                      color: theme.palette.primary.main,
                      mb: 1,
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.primary.main,
                      mb: 1,
                    }}
                  >
                    Search Booking by Email Address
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Email Address"
                    placeholder="Enter your email address"
                    type="email"
                    value={emailData.emailAddress}
                    onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                    required
                    fullWidth
                    variant="outlined"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchMethod('email');
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  />
                  
                  <TextField
                    label="Mobile or Vehicle Reg Number"
                    placeholder="Mobile number or vehicle registration"
                    value={emailData.mobileOrVehicleReg}
                    onChange={(e) => handleInputChange('mobileOrVehicleReg', e.target.value)}
                    required
                    fullWidth
                    variant="outlined"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchMethod('email');
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  />

                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={isLoading || searchMethod !== 'email'}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSearch();
                    }}
                    startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
                    sx={{
                      mt: 1,
                      py: 1.5,
                      bgcolor: theme.palette.primary.main,
                      color: 'white',
                      fontWeight: 600,
                      '&:hover': {
                        bgcolor: theme.palette.primary.dark || 'rgba(248, 191, 18, 0.9)',
                      },
                      '&:disabled': {
                        bgcolor: theme.palette.divider,
                        color: theme.palette.text.disabled,
                      },
                    }}
                  >
                    {isLoading && searchMethod === 'email' ? 'Searching...' : 'Search Booking(S)'}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Error Display */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mt: 3,
                borderRadius: 2,
              }}
              onClose={() => setError('')}
            >
              {error}
            </Alert>
          )}

          {/* Help Text */}
          <Box sx={{ mt: 4, p: 3, bgcolor: 'rgba(0, 0, 0, 0.02)', borderRadius: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              <strong>Need help?</strong> Your booking reference was sent to your email address when you completed your booking.
              For assistance, please contact our customer service team.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ManageBookingModal;
