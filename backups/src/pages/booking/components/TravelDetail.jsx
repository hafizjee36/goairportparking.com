import React from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import theme from '../../../theme';

const TravelDetail = ({
  personalData = {},
  updatePersonal,
  selectedProduct = null,
  selectedAirport = '',
}) => {
  
  const getTerminalOptions = () => {
    // Use dynamic terminals from selected product if available
    if (selectedProduct?.terminals && Array.isArray(selectedProduct.terminals) && selectedProduct.terminals.length > 0) {
      const dynamicTerminals = selectedProduct.terminals.map(terminal => ({
        value: terminal.name,
        label: terminal.name
      }));
      // Add TBC option
      dynamicTerminals.push({ value: 'TBC', label: 'To Be Confirmed' });
      return dynamicTerminals;
    }
    
    // Fallback to static terminals if no product terminals available
    const terminals = [];
    for (let i = 1; i <= 5; i++) {
      terminals.push({ value: `Terminal ${i}`, label: `Terminal ${i}` });
    }
    terminals.push({ value: 'TBC', label: 'To Be Confirmed' });
    return terminals;
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
        {selectedAirport === 'SOP' ? 'Cruise Details' : 'Flight Details'}
      </Typography>

      <Grid container spacing={3}>

        {selectedAirport === 'SOP' ? (
          <>
            {/* SOP Cruise - Departure Terminal */}
            <Grid item  size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size="medium" sx={{ width: '100%' }}>
                <InputLabel>Departure Terminal</InputLabel>
                <Select
                  label="Departure Terminal"
                  value={personalData.departureTerminal || 'CITY CRUISE TERMINAL'}
                  onChange={(e) => updatePersonal('departureTerminal', e.target.value)}
                  sx={{ width: '100%' }}
                >
                  <MenuItem value="CITY CRUISE TERMINAL">CITY CRUISE TERMINAL</MenuItem>
                  <MenuItem value="HORIZON CRUISE TERMINAL">HORIZON CRUISE TERMINAL</MenuItem>
                  <MenuItem value="MAYFLOWER CRUISE TERMINAL">MAYFLOWER CRUISE TERMINAL</MenuItem>
                  <MenuItem value="OCEAN CRUISE TERMINAL">OCEAN CRUISE TERMINAL</MenuItem>
                  <MenuItem value="QEII CRUISE TERMINAL">QEII CRUISE TERMINAL</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* SOP Cruise - Return Terminal (Ship Name) */}
            <Grid item  size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="medium"
                label="Name of Cruise Ship"
                name="Return_Terminal"
                value={personalData.returnTerminal || ''}
                onChange={(e) => updatePersonal('returnTerminal', e.target.value)}
                placeholder="Name of Cruise Ship"
                sx={{ width: '100%' }}
              />
            </Grid>
          </>
        ) : (
          <>
            {/* Flight - Departure Terminal */}
            <Grid item size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size="medium" sx={{ width: '100%' }}>
                <InputLabel id="departure-terminal-label">Departure Terminal</InputLabel>
                <Select
                  labelId="departure-terminal-label"
                  label="Departure Terminal"
                  value={personalData.departureTerminal || 'TBC'}
                  onChange={(e) => updatePersonal('departureTerminal', e.target.value)}
                  sx={{ width: '100%' }}
                >
                  {getTerminalOptions().map((terminal) => (
                    <MenuItem key={terminal.value} value={terminal.value}>
                      {terminal.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  Select your departure terminal (can be updated later)
                </FormHelperText>
              </FormControl>
            </Grid>

            {/* Flight - Departure Flight Number */}
            <Grid item size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="medium"
                label="Departure Flight Number"
                value={personalData.departureFlightNo || ''}
                onChange={(e) => updatePersonal('departureFlightNo', e.target.value)}
                placeholder="e.g. BA123, TBC"
                inputProps={{ maxLength: 20 }}
                helperText="Your outbound flight number (optional)"
                sx={{ width: '100%' }}
              />
            </Grid>

            {/* Flight - Arrival Terminal */}
            <Grid item size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size="medium" sx={{ width: '100%' }}>
                <InputLabel id="arrival-terminal-label">Arrival Terminal</InputLabel>
                <Select
                  labelId="arrival-terminal-label"
                  label="Arrival Terminal"
                  value={personalData.arrivalTerminal || 'TBC'}
                  onChange={(e) => updatePersonal('arrivalTerminal', e.target.value)}
                  sx={{ width: '100%' }}
                >
                  {getTerminalOptions().map((terminal) => (
                    <MenuItem key={terminal.value} value={terminal.value}>
                      {terminal.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  Select your arrival terminal (can be updated later)
                </FormHelperText>
              </FormControl>
            </Grid>

            {/* Flight - Arrival Flight Number */}
            <Grid item size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="medium"
                label="Arrival Flight Number"
                value={personalData.arrivalFlightNo || ''}
                onChange={(e) => updatePersonal('arrivalFlightNo', e.target.value)}
                placeholder="e.g. BA456, TBC"
                inputProps={{ maxLength: 20 }}
                helperText="Your return flight number (optional)"
                sx={{ width: '100%' }}
              />
            </Grid>
          </>
        )}

      </Grid>

 
    </Box>
  );
};

export default TravelDetail;

