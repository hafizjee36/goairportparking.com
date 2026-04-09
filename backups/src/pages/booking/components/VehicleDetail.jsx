import React from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
  Paper,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  DirectionsCar as CarIcon,
} from '@mui/icons-material';
import theme from '../../../theme';

const VehicleDetail = ({
  vehicles = [],
  setVehicles,
  getFieldError,
  hasFieldError,
  hasAttemptedSubmit = false,
}) => {
  // Initialize with one vehicle if none exist
  React.useEffect(() => {
    if (vehicles.length === 0) {
      setVehicles([{
        make: 'TBC',
        model: 'TBC',
        color: 'TBC',
        reg_no: '',
      }]);
    }
  }, [vehicles, setVehicles]);

  const handleAddVehicle = () => {
    setVehicles([
      ...vehicles,
      {
        make: 'TBC',
        model: 'TBC', 
        color: 'TBC',
        reg_no: '',
      },
    ]);
  };

  const handleRemoveVehicle = (index) => {
    if (vehicles.length > 1) {
      const updatedVehicles = vehicles.filter((_, i) => i !== index);
      setVehicles(updatedVehicles);
    }
  };

  const handleVehicleChange = (index, field, value) => {
    const updatedVehicles = [...vehicles];
    updatedVehicles[index] = {
      ...updatedVehicles[index],
      [field]: value,
    };
    setVehicles(updatedVehicles);
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
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h5" fontWeight="bold" color="primary.main">
          Vehicle Details
        </Typography>
        {/* <Button
          startIcon={<AddIcon />}
          onClick={handleAddVehicle}
          variant="outlined"
          size="small"
        >
          Add Vehicle
        </Button> */}
      </Box>

      {vehicles.map((vehicle, index) => (
        <Paper
          key={index}
          elevation={1}
          sx={{
            p: 3,
            mb: 2,
            border: '1px solid #E0E0E0',
            backgroundColor: '#FAFAFA',
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <CarIcon color="primary" />
              <Typography variant="h6" color="primary.main">
                Vehicle 
              </Typography>
            </Box>
            {vehicles.length > 1 && (
              <IconButton
                onClick={() => handleRemoveVehicle(index)}
                color="error"
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>

          <Grid container spacing={3}>
            {/* Registration Number - Most Important Field */}
            <Grid item size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="medium"
                label="Registration Number *"
                value={vehicle.reg_no || ''}
                onChange={(e) => handleVehicleChange(index, 'reg_no', e.target.value)}
                error={hasAttemptedSubmit && hasFieldError(`reg_no_${index}`)}
                helperText={
                  hasAttemptedSubmit && hasFieldError(`reg_no_${index}`)
                    ? getFieldError(`reg_no_${index}`)
                    : 'e.g. AB12 CDE'
                }
                placeholder="Enter your number plate"
                inputProps={{ 
                  maxLength: 10,
                  style: { textTransform: 'uppercase' }
                }}
              />
            </Grid>

            {/* Vehicle Make */}
            <Grid item size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="medium"
                label="Make"
                value={vehicle.make || ''}
                onChange={(e) => handleVehicleChange(index, 'make', e.target.value)}
                error={hasAttemptedSubmit && hasFieldError(`make_${index}`)}
                helperText={
                  hasAttemptedSubmit && hasFieldError(`make_${index}`)
                    ? getFieldError(`make_${index}`)
                    : 'e.g. Ford, BMW, Toyota'
                }
                placeholder="Vehicle make"
                inputProps={{ maxLength: 30 }}
              />
            </Grid>

            {/* Vehicle Model */}
            <Grid item size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="medium"
                label="Model"
                value={vehicle.model || ''}
                onChange={(e) => handleVehicleChange(index, 'model', e.target.value)}
                error={hasAttemptedSubmit && hasFieldError(`model_${index}`)}
                helperText={
                  hasAttemptedSubmit && hasFieldError(`model_${index}`)
                    ? getFieldError(`model_${index}`)
                    : 'e.g. Focus, 3 Series, Corolla'
                }
                placeholder="Vehicle model"
                inputProps={{ maxLength: 30 }}
              />
            </Grid>

            {/* Vehicle Color */}
            <Grid item size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="medium"
                label="Color"
                value={vehicle.color || ''}
                onChange={(e) => handleVehicleChange(index, 'color', e.target.value)}
                error={hasAttemptedSubmit && hasFieldError(`color_${index}`)}
                helperText={
                  hasAttemptedSubmit && hasFieldError(`color_${index}`)
                    ? getFieldError(`color_${index}`)
                    : 'e.g. Blue, Silver, Red'
                }
                placeholder="Vehicle color"
                inputProps={{ maxLength: 20 }}
              />
            </Grid>
          </Grid>

          {index < vehicles.length - 1 && (
            <Box mt={3}>
              <Divider />
            </Box>
          )}
        </Paper>
      ))}


    </Box>
  );
};

export default VehicleDetail;

