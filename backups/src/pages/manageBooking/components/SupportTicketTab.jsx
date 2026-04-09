import React, { useState } from 'react';
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
  Alert,
  CircularProgress,
  Avatar,
  Divider,
} from '@mui/material';
import {
  SupportAgent as SupportIcon,
  Send as SendIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Subject as SubjectIcon,
  Description as InstructionsIcon,
  Category as TypeIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import apiCall from '../../../services/apiService';
import { apiKey } from '../../../common/config/api.jsx';

const SupportTicketTab = ({ bookings = [] }) => {
  const [formData, setFormData] = useState({
    reference_no: '',
    name: '',
    contact_no: '',
    type: '',
    subject: '',
    email: '',
    instructions: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
    
    // Clear success/error messages when user starts typing
    if (success) setSuccess(false);
    if (error) setError('');
  };

  const validateForm = () => {
    const requiredFields = ['reference_no', 'name', 'contact_no', 'type', 'subject', 'email', 'instructions'];
    const missingFields = requiredFields.filter(field => !formData[field].trim());
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Phone validation (basic)
    const phoneRegex = /^\+?[\d\s-()]+$/;
    if (!phoneRegex.test(formData.contact_no)) {
      setError('Please enter a valid phone number');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        key: apiKey,
        reference_no: formData.reference_no,
        name: formData.name,
        contact_no: formData.contact_no,
        type: formData.type,
        subject: formData.subject,
        email: formData.email,
        instructions: formData.instructions,
      };

      console.log('🔄 Submitting support ticket:', payload);

      const response = await apiCall(
        'POST',
        '/supports/store',
        payload,
        {},
        'create-support-ticket',
        'airport parking app'
      );

      console.log('📥 Support ticket response:', response);

      if (response?.success) {
        setSuccess(true);
        toast.success('Support ticket submitted successfully! We will get back to you soon.', {
          position: "top-right",
          autoClose: 5000,
        });

        // Reset form completely
        setFormData({
          reference_no: '',
          name: '',
          contact_no: '',
          type: '',
          subject: '',
          email: '',
          instructions: '',
        });
      } else {
        setError(response?.message || 'Failed to submit support ticket');
        toast.error(response?.message || 'Failed to submit support ticket', {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error('❌ Error submitting support ticket:', error);
      setError(error.message || 'An error occurred while submitting the support ticket');
      toast.error(error.message || 'An error occurred while submitting the support ticket', {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      reference_no: '',
      name: '',
      contact_no: '',
      type: '',
      subject: '',
      email: '',
      instructions: '',
    });
    setSuccess(false);
    setError('');
  };

  return (
    <Box>
      {/* Header Card */}
      <Card sx={{ mb: 3, borderRadius: 3, bgcolor: 'white' }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar sx={{ bgcolor: '#17a2b8', width: 50, height: 50 }}>
              <SupportIcon sx={{ fontSize: 28 }} />
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                Support Ticket
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Need help with your booking? Submit a support ticket and our team will assist you.
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Success Alert */}
      {success && (
        <Alert 
          severity="success" 
          sx={{ mb: 3, borderRadius: 2 }}
          onClose={() => setSuccess(false)}
        >
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            Support Ticket Submitted Successfully!
          </Typography>
          <Typography variant="body2">
            We have received your support ticket and will get back to you as soon as possible.
          </Typography>
        </Alert>
      )}

      {/* Error Alert */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3, borderRadius: 2 }}
          onClose={() => setError('')}
        >
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            Error Submitting Ticket
          </Typography>
          <Typography variant="body2">
            {error}
          </Typography>
        </Alert>
      )}

      {/* Support Ticket Form */}
      <Card sx={{ borderRadius: 3, bgcolor: 'white' }}>
        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            {/* Row 1: Reference Number and Full Name */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' }, 
              gap: 3, 
              mb: 3 
            }}>
              <TextField
                fullWidth
                label="Booking Reference Number"
                value={formData.reference_no}
                onChange={handleInputChange('reference_no')}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                      <SubjectIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </Box>
                  ),
                }}
                sx={{ 
                  flex: 1,
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#17a2b8',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#17a2b8',
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                onChange={handleInputChange('name')}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                      <PersonIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </Box>
                  ),
                }}
                sx={{ 
                  flex: 1,
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#17a2b8',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#17a2b8',
                    },
                  },
                }}
              />
            </Box>

            {/* Row 2: Email and Contact Number */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' }, 
              gap: 3, 
              mb: 3 
            }}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                      <EmailIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </Box>
                  ),
                }}
                sx={{ 
                  flex: 1,
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#17a2b8',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#17a2b8',
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Contact Number"
                value={formData.contact_no}
                onChange={handleInputChange('contact_no')}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                      <PhoneIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </Box>
                  ),
                }}
                sx={{ 
                  flex: 1,
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#17a2b8',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#17a2b8',
                    },
                  },
                }}
              />
            </Box>

            {/* Row 3: Ticket Type and Subject */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' }, 
              gap: 3, 
              mb: 3 
            }}>
              <FormControl 
                fullWidth 
                required
                sx={{ 
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#17a2b8',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#17a2b8',
                    },
                  },
                }}
              >
                <InputLabel sx={{ color: 'text.secondary' }}>Ticket Type</InputLabel>
                <Select
                  value={formData.type}
                  onChange={handleInputChange('type')}
                  label="Ticket Type"
                  startAdornment={
                    <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                      <TypeIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </Box>
                  }
                >
                  <MenuItem value="booking">Booking Issue</MenuItem>
                  <MenuItem value="amend">Booking Amendment</MenuItem>
                  <MenuItem value="cancel">Booking Cancellation</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Subject"
                value={formData.subject}
                onChange={handleInputChange('subject')}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                      <SubjectIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </Box>
                  ),
                }}
                sx={{ 
                  flex: 1,
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#17a2b8',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#17a2b8',
                    },
                  },
                }}
              />
            </Box>

            {/* Row 4: Instructions (Full Width) */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Message / Instructions"
                value={formData.instructions}
                onChange={handleInputChange('instructions')}
                required
                multiline
                rows={6}
                variant="outlined"
                placeholder="Please describe your issue or request in detail..."
                InputProps={{
                  startAdornment: (
                    <Box sx={{ mr: 1, display: 'flex', alignItems: 'flex-start', mt: 1 }}>
                      <InstructionsIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </Box>
                  ),
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#17a2b8',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#17a2b8',
                    },
                  },
                }}
              />
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Action Buttons */}
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              justifyContent: 'flex-end',
              flexWrap: 'wrap',
            }}>
              <Button
                type="button"
                variant="outlined"
                onClick={handleReset}
                disabled={loading}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  borderColor: '#6c757d',
                  color: '#6c757d',
                  '&:hover': {
                    borderColor: '#5a6268',
                    bgcolor: 'rgba(108, 117, 125, 0.04)',
                  },
                }}
              >
                Reset Form
              </Button>
              
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  bgcolor: '#17a2b8',
                  '&:hover': {
                    bgcolor: '#138496',
                  },
                  minWidth: 150,
                }}
              >
                {loading ? 'Submitting...' : 'Submit Ticket'}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>

      {/* Help Information */}
      <Card sx={{ mt: 3, borderRadius: 3, bgcolor: '#f8f9fa', border: '1px solid #e9ecef' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#495057' }}>
            Need Help?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Our support team is here to help you with any issues or questions you may have regarding your booking.
          </Typography>
          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              <strong>Booking Issues:</strong> Problems with your current booking
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              <strong>Booking Amendment:</strong> Need to modify your booking details
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary">
              <strong>Booking Cancellation:</strong> Request to cancel your booking
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SupportTicketTab;
