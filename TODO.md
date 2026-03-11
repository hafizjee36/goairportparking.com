# TODO - IP-based Region Detection for Dubai Airport

## Plan Approved: Yes

### Tasks:
- [x] 1. Create `src/services/ipDetectionService.js` - Service to detect user region from IP
- [x] 2. Create `src/hooks/useUserRegion.js` - Custom hook for IP detection
- [x] 3. Modify `src/components/bookingForm/BookingForm.jsx` - Use the hook to set Dubai as default

### Implementation Steps:

1. **Create IP Detection Service** (`src/services/ipDetectionService.js`)
   - Use ipwho.is free API (no API key required)
   - Detect user's region/country
   - Include caching mechanism

2. **Create User Region Hook** (`src/hooks/useUserRegion.js`)
   - Use the IP detection service
   - Return region, loading, error states
   - Cache result in localStorage

3. **Modify BookingForm** (`src/components/bookingForm/BookingForm.jsx`)
   - Import useUserRegion hook
   - Check user's region after airports load
   - Set Dubai Airport (DXB) as default if region is Dubai

## Status: COMPLETED ✅
