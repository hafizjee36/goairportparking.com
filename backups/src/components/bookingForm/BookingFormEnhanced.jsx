import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Alert, CircularProgress } from '@mui/material';

// Redux
import { selectSearchData } from '../../redux/slice/searchSlice';
import { useBookingForm } from '../../hooks/useBookingForm';

// Components
import UserDetails from '../../pages/booking/components/UserDetails';
import TravelDetail from '../../pages/booking/components/TravelDetail';
import VehicleDetail from '../../pages/booking/components/VehicleDetail';
import Offer from '../../pages/booking/components/Offer';
import Confirm from '../../pages/booking/components/Confirm';

// Services and utilities
import apiCall from '../../services/apiService';
import { useWorldPay } from '../../services/worldpayService';
import validateBookingForm from '../../utils/validateBookingForm';
import { validateBookingForm as validateNextjsForm, convertFormDataToNextjsFormat, convertVehicleDataToNextjsFormat } from '../../utils/validateBookingFormNextjs';
import { apiKey } from '../../common/config/api';
import WorldPayForm from '../payment/WorldPayForm';
// import Cookies from 'js-cookie'; // Uncomment if using cookies

const BookingFormEnhanced = ({
  selectedProduct,
  onBookingComplete,
  airports = [],
  selectedAirport = '',
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const searchData = useSelector(selectSearchData);

  // WorldPay service - commenting out Stripe as requested
  const {
    loading: worldPayLoading,
    error: worldPayError,
    initializePayment,
    processPayment
  } = useWorldPay();

  // Booking form hook
  const {
    personalData,
    vehicleData,
    bookingOptions,
    updatePersonal,
    updateVehicle,
    updateBooking,
    getFieldError,
    hasFieldError,
    validateForm,
    getTotalsBreakdown,
    getFormCompletion
  } = useBookingForm();

  // Component state
  const [state, setState] = useState('initial');
  const [responseError, setResponseError] = useState('');
  const [syncBookingState, setSyncBookingState] = useState('initial');
  const [status, setStatus] = useState('');
  const [referenceNo, setReferenceNo] = useState('');
  const [multiModeReferenceNo, setMultiModeReferenceNo] = useState('');
  const [agree, setAgree] = useState(true);
  const [errors, setErrors] = useState([]);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [vehicles, setVehicles] = useState([]);

  // Validation and loading states
  const [validationErrors, setValidationErrors] = useState({});
  const [isSearching, setIsSearching] = useState(false);

  // Get URL parameters
  const getDeparture = searchParams.get('departure');
  const getArrival = searchParams.get('arrival');
  const getPromocode = searchParams.get('promocode');
  const getReference = searchParams.get('reference_no');

  // Initialize vehicles if empty
  useEffect(() => {
    if (vehicles.length === 0) {
      setVehicles([{
        make: 'TBC',
        model: 'TBC',
        color: 'TBC',
        reg_no: '',
      }]);
    }
  }, [vehicles.length]);

  // Initialize form from session storage
  useEffect(() => {
    if (typeof window.sessionStorage !== 'undefined') {
      const getDetails = JSON.parse(sessionStorage.getItem('booking_details') || '{}');
      if (getDetails && Object.keys(getDetails).length > 0) {
        // Restore personal data
        Object.keys(getDetails).forEach(key => {
          if (key in personalData) {
            updatePersonal(key, getDetails[key]);
          }
        });

        // Restore vehicles
        if (getDetails.vehicles) {
          setVehicles(getDetails.vehicles);
        }

        // Restore options
        updateBooking('cancellationProtection', getDetails.cancellation_status === '1');
        updateBooking('smsUpdates', getDetails.sms_confirmation === '1');
      }
    }
  }, []);

  // Initialize reference numbers from URL
  useEffect(() => {
    if (getReference) {
      setReferenceNo(getReference);
      setMultiModeReferenceNo(`MM-${getReference}`);
    }
  }, [getReference]);

  // Calculate total price
  const calculateTotal = () => {
    if (!selectedProduct) return 0;

    const basePrice = selectedProduct.payment?.amount
      ? parseFloat(selectedProduct.payment.amount)
      : parseFloat(selectedProduct.price || 0);

    let total = basePrice * vehicles.length;

    // Add admin charges
    const adminCharges = selectedProduct.payment?.admin_charges
      ? parseFloat(selectedProduct.payment.admin_charges)
      : parseFloat(selectedProduct.admin_charges || 0);
    total += adminCharges;

    // Add cancellation charges if selected
    if (bookingOptions.cancellationProtection) {
      const cancellationCharges = selectedProduct.payment?.cancellation_charges
        ? parseFloat(selectedProduct.payment.cancellation_charges)
        : parseFloat(selectedProduct.cancellation_charges || 0);
      total += cancellationCharges;
    }

    // Add SMS charges if selected
    if (bookingOptions.smsUpdates) {
      const smsCharges = selectedProduct.payment?.sms_charges
        ? parseFloat(selectedProduct.payment.sms_charges)
        : parseFloat(selectedProduct.sms_charges || 0);
      total += smsCharges;
    }

    return Math.max(0, total);
  };

  // Validate form data using Next.js compatible validation
  const handleValidate = () => {
    // Convert form data to Next.js format for validation
    const nextjsFormData = {
      first_name: personalData.firstName || '',
      last_name: personalData.lastName || '',
      email: personalData.email || '',
      contact_no: personalData.phone || '',
      title: personalData.title || 'Mr',
    };

    // Convert vehicles to Next.js format
    const nextjsVehicles = vehicles.map(vehicle => ({
      make: vehicle.make || 'TBC',
      model: vehicle.model || 'TBC',
      color: vehicle.color || 'TBC',
      reg_no: vehicle.reg_no || '',
    }));

    const errorResponse = validateNextjsForm(
      nextjsFormData,
      nextjsVehicles,
      bookingOptions.agreeToTerms
    );

    // Convert errors to the format expected by components
    const errorMap = {};
    errorResponse.errors.forEach(error => {
      errorMap[error.field] = error.message;
    });

    setErrors(errorResponse.errors);
    setValidationErrors(errorMap);

    if (errorResponse.errors.length > 0 && errorResponse.state === 'error') {
      errorResponse.errors.forEach((error) => {
        console.error(error.message);
      });
      return false;
    }
    return true;
  };

  // Handle booking synchronization with API
  const handleSyncBooking = async () => {
    setSyncBookingState('triggered');
    setStatus('');
    setResponseError('');

    const ensureTimeOrNoon = (dt) => {
      if (!dt || typeof dt !== 'string') return dt;
      const parts = dt.split(' ');
      // If only date is present (no time), default time to 12:00
      if (parts.length === 1 || (parts.length === 2 && !parts[1])) {
        return `${parts[0]} 12:00`;
      }
      return dt; // keep any provided time as-is (including 00:00)
    };

    const details = {
      key: apiKey,
      api_tag: selectedProduct?.api_tag || '',
      option_id: selectedProduct?.option_id ? JSON.stringify(selectedProduct.option_id) : '',
      search_id: selectedProduct?.search_id || '',
      multi_mode_reference_no: multiModeReferenceNo,
      reference_no: referenceNo,
      status: '0',
      departure: ensureTimeOrNoon(getDeparture),
      arrival: ensureTimeOrNoon(getArrival),
      sku: selectedProduct?.sku,
      amount: selectedProduct?.price,
      discount_amount: selectedProduct?.discount || '0.00',
      discount_code: getPromocode || '',
      admin_charges: selectedProduct?.admin_charges,
      cancellation_status: bookingOptions.cancellationProtection ? '1' : '0',
      sms_confirmation: bookingOptions.smsUpdates ? '1' : '0',

      // Personal details
      title: personalData.title || 'Mr',
      first_name: personalData.firstName,
      last_name: personalData.lastName,
      email: personalData.email,
      contact_no: personalData.phone,
      no_of_peoples: personalData.numberOfPeople || 1,
      address: personalData.address || '',
      postcode: personalData.postcode || '',

      // Flight details
      departure_terminal: personalData.departureTerminal || '',
      departure_flight_no: personalData.departureFlightNo || 'To be confirmed',
      arrival_terminal: personalData.arrivalTerminal || '',
      arrival_flight_no: personalData.arrivalFlightNo || 'To be confirmed',

      // Vehicles
      vehicles: vehicles,

      // Additional data
      // icampaign: Cookies.get('customCid') || '', // Uncomment if using cookies
    };

    try {
      let response;

      if (!multiModeReferenceNo && !referenceNo) {
        // Create new booking
        response = await apiCall(
          'post',
          '/bookings/store',
          details,
          {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          location.pathname
        );

        if (response.data?.reference_no && response.data?.multi_mode_reference_no) {
          setReferenceNo(response.data.reference_no);
          setMultiModeReferenceNo(response.data.multi_mode_reference_no);

          // Store in session storage
          if (typeof sessionStorage !== 'undefined') {
            sessionStorage.setItem('booking_details', JSON.stringify({
              ...details,
              reference_no: response.data.reference_no,
              multi_mode_reference_no: response.data.multi_mode_reference_no,
            }));
          }

          return response.data;
        }
      } else {
        // Update existing booking
        response = await apiCall(
          'post',
          '/bookings/update',
          {
            ...details,
            multi_mode_reference_no: multiModeReferenceNo,
          },
          {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          location.pathname
        );

        if (response.data?.reference_no && response.data?.multi_mode_reference_no) {
          // Update session storage
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('booking_details', JSON.stringify({
              ...details,
              reference_no: response.data.reference_no,
              multi_mode_reference_no: response.data.multi_mode_reference_no,
            }));
          }

          return response.data;
        } else {
          setResponseError(response.message);
        }
      }

      setState('success');
    } catch (error) {
      setState('error');
      setStatus(error.message);
      setResponseError(error.message);
    }
  };

  // Handle payment processing with WorldPay
  const handlePayment = async () => {
    setHasAttemptedSubmit(true);

    // Validate form
    if (!handleValidate()) {
      return;
    }

    // Check form completion
    const formCompletion = getFormCompletion();
    if (!formCompletion.overall) {
      setResponseError('Please complete all required fields before proceeding.');
      return;
    }

    try {
      setIsSearching(true);

      // Sync booking first
      const bookingResult = await handleSyncBooking();
      if (!bookingResult) {
        throw new Error('Failed to create booking');
      }

      // Calculate total amount
      const totalAmount = calculateTotal();

      // Generate unique order code
      const orderCode = `APK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Initialize WorldPay payment session with Next.js compatible data structure
      const paymentResult = await initializePayment({
        personalData: {
          first_name: personalData.firstName,
          last_name: personalData.lastName,
          email: personalData.email,
          contact_no: personalData.phone,
          title: personalData.title || 'Mr',
        },
        vehicleData: vehicles.map(vehicle => ({
          make: vehicle.make || 'TBC',
          model: vehicle.model || 'TBC',
          color: vehicle.color || 'TBC',
          reg_no: vehicle.reg_no || '',
        })),
        bookingOptions: {
          cancellationProtection: bookingOptions.cancellationProtection,
          smsUpdates: bookingOptions.smsUpdates,
        },
        selectedProduct,
        searchData: {
          airport: selectedAirport || searchData?.airport,
          entryDate: getDeparture?.split(' ')[0],
          entryTime: getDeparture?.split(' ')[1],
          exitDate: getArrival?.split(' ')[0],
          exitTime: getArrival?.split(' ')[1],
          discountCode: getPromocode || '',
        },
        totalAmount,
        domainUrl: window.location.origin
      });

      if (paymentResult.success) {
        // Store complete booking data in session for confirmation page
        sessionStorage.setItem('booking_data', JSON.stringify({
          personalData,
          vehicleData,
          bookingOptions,
          selectedProduct,
          orderCode,
          totalAmount,
          multiModeReferenceNo,
          referenceNo
        }));

        // Process payment (redirect to WorldPay)
        await processPayment();

        if (onBookingComplete) {
          onBookingComplete({
            referenceNo,
            multiModeReferenceNo,
            totalAmount
          });
        }
      } else {
        throw new Error(paymentResult.error || 'Failed to initialize payment');
      }
    } catch (error) {
      console.error('Payment initialization error:', error);
      setResponseError(error.message || 'Payment processing failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // Track phone input focus/typing to suppress store calls while typing
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [phoneLastTypedAt, setPhoneLastTypedAt] = useState(0);

  // Auto-sync booking only after typing stops (3s) and form is ready
  useEffect(() => {
    const formReady =
      personalData.firstName?.length > 0 &&
      personalData.lastName?.length > 0 &&
      personalData.email?.length > 0 &&
      personalData.phone?.length > 0 &&
      vehicles.some(v => v.reg_no?.length > 0) &&
      syncBookingState === 'initial';

    if (!formReady) return;

    if (phoneFocused) return; // do not schedule while focused/typing

    const now = Date.now();
    const target = (phoneLastTypedAt || now) + 3000; // 3s after last type
    const delay = Math.max(0, target - now);

    const t = setTimeout(() => {
      // Re-check before firing
      if (!phoneFocused && Date.now() - (phoneLastTypedAt || 0) >= 3000) {
        handleSyncBooking();
      }
    }, delay);

    return () => clearTimeout(t);
  }, [personalData, vehicles, syncBookingState, phoneFocused, phoneLastTypedAt]);

  if (!selectedProduct) {
    return (
      <Alert severity="warning">
        Please select a parking option to continue with booking.
      </Alert>
    );
  }

  console.log("formCompletion",)

  return (
    <Box>
      {/* Error Display */}
      {(status || responseError) && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {status || responseError}
        </Alert>
      )}

      {/* WorldPay Error Display */}
      {worldPayError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {worldPayError}
        </Alert>
      )}

      {/* User Details */}
      <UserDetails
        personalData={personalData}
        updatePersonal={updatePersonal}
        getFieldError={(field) => validationErrors[field]}
        hasFieldError={(field) => !!validationErrors[field]}
        hasAttemptedSubmit={hasAttemptedSubmit}
        onPhoneFocus={() => setPhoneFocused(true)}
        onPhoneBlur={() => setPhoneFocused(false)}
        onPhoneTyping={() => setPhoneLastTypedAt(Date.now())}
      />

      {/* Travel Details */}
      <TravelDetail
        personalData={personalData}
        updatePersonal={updatePersonal}
        getFieldError={(field) => validationErrors[field]}
        hasFieldError={(field) => !!validationErrors[field]}
        hasAttemptedSubmit={hasAttemptedSubmit}
        airports={airports}
        selectedAirport={selectedAirport}
      />

      {/* Vehicle Details */}
      <VehicleDetail
        vehicles={vehicles}
        setVehicles={setVehicles}
        getFieldError={(field) => validationErrors[field]}
        hasFieldError={(field) => !!validationErrors[field]}
        hasAttemptedSubmit={hasAttemptedSubmit}
      />

      {/* Additional Services */}
      <Offer
        bookingOptions={bookingOptions}
        updateBooking={updateBooking}
        selectedProduct={selectedProduct}
      />

      {/* Terms & Conditions */}
      <Confirm
        bookingOptions={bookingOptions}
        updateBooking={updateBooking}
        selectedProduct={selectedProduct}
        hasAttemptedSubmit={hasAttemptedSubmit}
        getFieldError={(field) => validationErrors[field]}
        hasFieldError={(field) => !!validationErrors[field]}
      />

      {/* WorldPay Payment Section */}
      {referenceNo && multiModeReferenceNo && (
        <Box sx={{ mt: 3, p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
          <WorldPayForm
            onValidate={handleValidate}
            personalData={{
              first_name: personalData.firstName,
              last_name: personalData.lastName,
              email: personalData.email,
              contact_no: personalData.phone,
            }}
            vehicleData={vehicles.map(vehicle => ({
              make: vehicle.make || 'TBC',
              model: vehicle.model || 'TBC',
              color: vehicle.color || 'TBC',
              reg_no: vehicle.reg_no || '',
            }))}
            bookingOptions={{
              cancellationProtection: bookingOptions.cancellationProtection,
              smsUpdates: bookingOptions.smsUpdates,
            }}
            selectedProduct={selectedProduct}
            searchData={{
              airport: selectedAirport || searchData?.airport,
              entryDate: getDeparture?.split(' ')[0],
              entryTime: getDeparture?.split(' ')[1],
              exitDate: getArrival?.split(' ')[0],
              exitTime: getArrival?.split(' ')[1],
              discountCode: getPromocode || '',
            }}
            totalAmount={calculateTotal()}
          />
        </Box>
      )}

      {/* Loading State */}
      {(isSearching || worldPayLoading) && (
        <Box display="flex" justifyContent="center" my={3}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default BookingFormEnhanced;

