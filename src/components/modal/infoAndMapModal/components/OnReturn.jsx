import { Typography, Box, CircularProgress } from "@mui/material";

export default function OnReturn({ productData, isLoading }) {
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
  const hasReturnInfo = productData && (productData.short_description || scheduleInfo);
  const isMeetAndGreet = productData?.display_name?.toLowerCase().includes('meet');

  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5 }}>
        On Return
      </Typography>
      
      {/* Show loading spinner while fetching details */}
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
          <CircularProgress size={40} />
          <Typography variant="body2" sx={{ ml: 2, color: 'text.secondary' }}>
            Loading return instructions...
          </Typography>
        </Box>
      ) : (
        <>
          {/* Display return_procedure content from API if available */}
          {productData?.return_procedure ? (
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
              dangerouslySetInnerHTML={{ __html: productData.return_procedure }}
            />
          ) : (
            /* Fallback content if return_procedure not available */
            <>
              {hasReturnInfo ? (
                <>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    After landing, collect luggage and clear customs.
                  </Typography>
                  
                  {isMeetAndGreet ? (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      For meet-and-greet service, call the return number provided in your booking confirmation.
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Go to the shuttle pick-up area and keep your receipt to collect your keys.
                    </Typography>
                  )}
                  
                  {scheduleInfo && (
                    <>
                      <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
                        Return Service Hours:
                      </Typography>
                      {Object.entries(scheduleInfo.days || {}).map(([day, hours]) => (
                        <Typography key={day} variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          <strong>{day.charAt(0).toUpperCase() + day.slice(1)}:</strong> {Array.isArray(hours) ? hours.join(', ') : hours || 'Closed'}
                        </Typography>
                      ))}
                    </>
                  )}
                  
                  {productData?.terms_conditions && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {productData.terms_conditions}
                    </Typography>
                  )}
                  
                  <Typography variant="body2" color="text.secondary">
                    Inspect your vehicle before leaving and report any concerns immediately.
                  </Typography>
                </>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  Return information is not available for this service. Please contact the provider for specific return instructions.
                </Typography>
              )}
            </>
          )}
          
          {/* Display terms and conditions if available and not already shown */}
          {productData?.terms_conditions && !productData?.return_procedure && (
            <Box
              sx={{
                mt: 3,
                p: 2,
                backgroundColor: 'grey.50',
                borderRadius: 1,
                borderLeft: '4px solid',
                borderColor: 'warning.main',
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'warning.main' }}>
                Terms & Conditions:
              </Typography>
              <Box
                sx={{
                  '& p': { mb: 1, color: 'text.secondary', lineHeight: 1.6 },
                  '& ul': { pl: 2, mb: 1 },
                  '& li': { mb: 0.5, color: 'text.secondary' },
                  '& strong': { fontWeight: 600, color: 'text.primary' },
                }}
                dangerouslySetInnerHTML={{ __html: productData.terms_conditions }}
              />
            </Box>
          )}
        </>
      )}
    </>
  );
}
