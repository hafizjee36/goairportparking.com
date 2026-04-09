import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import {
  Person as PersonIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import bookingManagementService from '../../../services/bookingManagementService';

const ProfileTab = ({ bookings = [] }) => {
  const authData = useSelector((state) => state.auth);
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    title: 'Mr',
    first_name: '',
    last_name: '',
    email: '',
    contact_no: ''
  });
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [profileErrors, setProfileErrors] = useState({});

  // Initialize profile data from latest booking
  useEffect(() => {
    if (bookings && bookings.length > 0) {
      const latestBooking = bookings[0];
      if (latestBooking?.booking_details_current?.customer) {
        const customer = latestBooking.booking_details_current.customer;
        setProfileData({
          title: customer.title || 'Mr',
          first_name: customer.first_name || '',
          last_name: customer.last_name || '',
          email: customer.email || '',
          contact_no: customer.contact_no || ''
        });
      }
    }
  }, [bookings]);

  const handleProfileUpdate = async () => {
    setIsUpdatingProfile(true);
    setProfileErrors({});
    
    try {
      // Validate form
      const errors = {};
      if (!profileData.first_name.trim()) errors.first_name = 'First name is required';
      if (!profileData.last_name.trim()) errors.last_name = 'Last name is required';
      if (!profileData.email.trim()) errors.email = 'Email is required';
      if (!profileData.contact_no.trim()) errors.contact_no = 'Contact number is required';
      
      if (Object.keys(errors).length > 0) {
        setProfileErrors(errors);
        return;
      }

      // Get token from authData or localStorage
      const token = authData?.token || localStorage.getItem('authToken');
      
      const response = await bookingManagementService.updateCustomerProfile(profileData, token);
      
      if (response?.success) {
        toast.success('Profile updated successfully!', {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error(response?.message || 'Failed to update profile', {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error('❌ Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile', {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setIsUpdatingProfile(false);
    }
  };
  
  const handleProfileInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (profileErrors[field]) {
      setProfileErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleReset = () => {
    // Reset form to original data from latest booking
    if (bookings && bookings.length > 0) {
      const latestBooking = bookings[0];
      if (latestBooking?.booking_details_current?.customer) {
        const customer = latestBooking.booking_details_current.customer;
        setProfileData({
          title: customer.title || 'Mr',
          first_name: customer.first_name || '',
          last_name: customer.last_name || '',
          email: customer.email || '',
          contact_no: customer.contact_no || ''
        });
      }
    }
    setProfileErrors({});
  };

  return (
    <Box>
      <Card sx={{ borderRadius: 3, bgcolor: 'white' }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <Box sx={{ 
              bgcolor: '#6c757d', 
              p: 1.5, 
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <PersonIcon sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#495057', mb: 0.5 }}>
                Profile Information
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Update your personal information and contact details
              </Typography>
            </Box>
          </Box>
          
          <Grid container spacing={3}>
            {/* Title */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth error={!!profileErrors.title}>
                <InputLabel>Title</InputLabel>
                <Select
                  value={profileData.title}
                  onChange={(e) => handleProfileInputChange('title', e.target.value)}
                  label="Title"
                >
                  <MenuItem value="Mr">Mr</MenuItem>
                  <MenuItem value="Mrs">Mrs</MenuItem>
                  <MenuItem value="Ms">Ms</MenuItem>
                  <MenuItem value="Dr">Dr</MenuItem>
                  <MenuItem value="Prof">Prof</MenuItem>
                </Select>
                {profileErrors.title && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                    {profileErrors.title}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            
            {/* First Name */}
            <Grid item xs={12} sm={6} md={4.5}>
              <TextField
                fullWidth
                label="First Name"
                value={profileData.first_name}
                onChange={(e) => handleProfileInputChange('first_name', e.target.value)}
                error={!!profileErrors.first_name}
                helperText={profileErrors.first_name}
                required
              />
            </Grid>
            
            {/* Last Name */}
            <Grid item xs={12} sm={6} md={4.5}>
              <TextField
                fullWidth
                label="Last Name"
                value={profileData.last_name}
                onChange={(e) => handleProfileInputChange('last_name', e.target.value)}
                error={!!profileErrors.last_name}
                helperText={profileErrors.last_name}
                required
              />
            </Grid>
            
            {/* Email */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={profileData.email}
                onChange={(e) => handleProfileInputChange('email', e.target.value)}
                error={!!profileErrors.email}
                helperText={profileErrors.email}
                required
              />
            </Grid>
            
            {/* Contact Number */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Number"
                value={profileData.contact_no}
                onChange={(e) => handleProfileInputChange('contact_no', e.target.value)}
                error={!!profileErrors.contact_no}
                helperText={profileErrors.contact_no}
                required
              />
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={handleProfileUpdate}
              disabled={isUpdatingProfile}
              startIcon={isUpdatingProfile ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
              sx={{
                bgcolor: '#28a745',
                color: 'white',
                '&:hover': {
                  bgcolor: '#218838',
                },
                '&:disabled': {
                  bgcolor: '#6c757d',
                },
              }}
            >
              {isUpdatingProfile ? 'Updating...' : 'Update Profile'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileTab;
