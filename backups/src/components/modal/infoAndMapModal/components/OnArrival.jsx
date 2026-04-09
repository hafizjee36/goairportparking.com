import { Typography, Box, CircularProgress } from "@mui/material";

export default function OnArrival({ productData, isLoading }) {
  // Parse schedule data if available
  const getScheduleInfo = () => {
    if (!productData?.schedule) return null;
    try {
      const scheduleData = JSON.parse(productData.schedule);
      return scheduleData;
    } catch (error) {
      return null;
    }
  };

  const scheduleInfo = getScheduleInfo();
  const hasArrivalInfo = productData && (productData.short_description || scheduleInfo);

  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5 }}>
        On Arrival
      </Typography>
      
      {/* Show loading spinner while fetching details */}
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
          <CircularProgress size={40} />
          <Typography variant="body2" sx={{ ml: 2, color: 'text.secondary' }}>
            Loading arrival instructions...
          </Typography>
        </Box>
      ) : (
        <>
          {/* Display drop_procedure content from API if available */}
          {productData?.drop_procedure ? (
            <Box
              sx={{
                mb: 2,
                '& ul': {
                  pl: 2,
                  mb: 2,
                },
                '& li': {
                  mb: 1,
                  color: 'text.primary',
                },
                '& h3': {
                  fontWeight: 700,
                  mb: 1,
                  mt: 2,
                  color: 'text.primary',
                },
                '& p': {
                  mb: 2,
                  color: 'text.secondary',
                  lineHeight: 1.6,
                },
                '& strong': {
                  fontWeight: 600,
                  color: 'text.primary',
                },
              }}
              dangerouslySetInnerHTML={{ __html: productData.drop_procedure }}
            />
          ) : (
            /* Fallback content if drop_procedure not available */
            <>
              {hasArrivalInfo ? (
                <>
                  {productData?.short_description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {productData.short_description}
                    </Typography>
                  )}
                  
                  {scheduleInfo && (
                    <>
                      <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
                        Operating Hours:
                      </Typography>
                      {Object.entries(scheduleInfo.days || {}).map(([day, hours]) => (
                        <Typography key={day} variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          <strong>{day.charAt(0).toUpperCase() + day.slice(1)}:</strong> {Array.isArray(hours) ? hours.join(', ') : hours || 'Closed'}
                        </Typography>
                      ))}
                    </>
                  )}
                  
                  {productData?.short_notice && (
                    <Typography variant="body2" sx={{ mb: 2, color: 'warning.main' }}>
                      ⚠ Short notice booking: {productData.short_notice} hour(s) minimum notice required
                    </Typography>
                  )}
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Follow signs to the designated drop-off. Keep booking confirmation and ID ready.
                  </Typography>
                  
                  {productData?.display_name?.toLowerCase().includes('meet') && (
                    <Typography variant="body2" color="text.secondary">
                      Meet-and-greet customers proceed to the arranged handover point.
                    </Typography>
                  )}
                </>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  Arrival information is not available for this service. Please contact the provider for specific arrival instructions.
                </Typography>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
