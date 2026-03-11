import React from 'react';
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import theme from '../../../theme';

const titles = [
  { value: 'Mr', label: 'Mr' },
  { value: 'Mrs', label: 'Mrs' },
  { value: 'Miss', label: 'Miss' },
  { value: 'Ms', label: 'Ms' },
  { value: 'Dr', label: 'Dr' },
];

const UserDetails = ({
  personalData = {},
  updatePersonal,
  getFieldError,
  hasFieldError,
  hasAttemptedSubmit = false,
  onPhoneFocus,
  onPhoneBlur,
  onPhoneTyping,
}) => {
  const [searchParams] = useSearchParams();
  const getAirport = searchParams.get("airport");
  // Helper function to check phone length
  const isValidPhoneLength = (phone) => {
    if (!phone) return false;
    // Remove all non-digit characters and count
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length >= 12;
  };
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
      <Typography variant="h5" fontWeight="bold" color="primary.main" mb={2}>
        Personal Details
      </Typography>

      <Grid container spacing={3}>
        {/* First Row: Title, First Name, Last Name */}
        <Grid item size={{ xs: 12, sm: 2 }}>
          <FormControl 
            fullWidth 
            error={hasAttemptedSubmit && hasFieldError('title')}
            size="medium"
            sx={{ width: '100%' }}
          >
            <InputLabel id="title-label">Title *</InputLabel>
            <Select
              labelId="title-label"
              label="Title *"
              value={personalData.title || ''}
              onChange={(e) => updatePersonal('title', e.target.value)}
              sx={{ width: '100%' }}
            >
              {titles.map((title) => (
                <MenuItem key={title.value} value={title.value}>
                  {title.label}
                </MenuItem>
              ))}
            </Select>
            {hasAttemptedSubmit && hasFieldError('title') && (
              <FormHelperText>{getFieldError('title')}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item size={{ xs: 12, sm: 5 }}>
          <TextField
            fullWidth
            size="medium"
            label="First Name *"
            value={personalData.firstName || ''}
            onChange={(e) => updatePersonal('firstName', e.target.value)}
            error={hasAttemptedSubmit && hasFieldError('firstName')}
            helperText={hasAttemptedSubmit ? getFieldError('firstName') : ''}
            inputProps={{ maxLength: 50 }}
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 5 }}>
          <TextField
            fullWidth
            size="medium"
            label="Last Name *"
            value={personalData.lastName || ''}
            onChange={(e) => updatePersonal('lastName', e.target.value)}
            error={hasAttemptedSubmit && hasFieldError('lastName')}
            helperText={hasAttemptedSubmit ? getFieldError('lastName') : ''}
            inputProps={{ maxLength: 50 }}
            sx={{ width: '100%' }}
          />
        </Grid>

        {/* Second Row: Email, Phone, Number of People */}
        <Grid item size={{ xs: 12, sm: 5 }}>
          <TextField
            fullWidth
            size="medium"
            type="email"
            label="Email Address *"
            value={personalData.email || ''}
            onChange={(e) => updatePersonal('email', e.target.value)}
            error={hasAttemptedSubmit && hasFieldError('email')}
            helperText={hasAttemptedSubmit ? getFieldError('email') : ''}
            inputProps={{ maxLength: 100 }}
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <MuiTelInput
            fullWidth
            size="medium"
            label="Phone Number *"
            value={personalData.phone || ''}
            onChange={(phone) => {
              onPhoneTyping && onPhoneTyping();
              updatePersonal('phone', phone);
            }}
            onFocus={() => onPhoneFocus && onPhoneFocus()}
            onBlur={() => onPhoneBlur && onPhoneBlur()}
            defaultCountry={getAirport == "DXB"? "AE":"GB"}
            preferredCountries={['AE', 'GB', 'US', 'IN', 'PK']}
            error={hasAttemptedSubmit && (hasFieldError('phone') || !isValidPhoneLength(personalData.phone))}
            helperText={
              hasAttemptedSubmit 
                ? getFieldError('phone') || 
                  (!isValidPhoneLength(personalData.phone) ? 'Phone number must be at least 12 digits' : '')
                : ''
            }
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 3 }}>
          <TextField
            fullWidth
            size="medium"
            type="number"
            label="Number of People*"
            value={personalData.numberOfPeople || ''}
            onChange={(e) => updatePersonal('numberOfPeople', parseInt(e.target.value) || '')}
            inputProps={{ min: 1, max: 20 }}
            error={hasAttemptedSubmit && hasFieldError('numberOfPeople')}
            helperText={hasAttemptedSubmit ? getFieldError('numberOfPeople') : ''}
            sx={{ width: '100%' }}
          />
        </Grid>

      </Grid>

    </Box>
  );
};

export default UserDetails;

