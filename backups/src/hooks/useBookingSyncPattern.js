import { useState, useEffect, useCallback } from 'react';
import { format, parse } from 'date-fns';
import { toast } from 'react-toastify';
import { apiKey } from '../common/config/api';
import apiCall from '../services/apiService';
import { useSearchParams } from 'react-router-dom';
// import Cookies from 'js-cookie';

/**
 * Custom hook that implements the store/update booking pattern
 * Based on the reference BookingForm code pattern
 */
export const useBookingSyncPattern = ({
  personalData,
  vehicleData,
  bookingOptions,
  selectedProduct,
  searchData,
  enabled = true
}) => {
  const [searchParams] = useSearchParams();

  // State management - matching the reference pattern
  const [syncBookingState, setSyncBookingState] = useState('initial');
  const [state, setState] = useState('initial');
  const [responseError, setResponseError] = useState('');
  const [status, setStatus] = useState('');
  const [referenceNo, setReferenceNo] = useState('');
  const [multiModeReferenceNo, setMultiModeReferenceNo] = useState('');
  const [supplierCost, setSupplierCost] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Get URL parameters
  const getReference = searchParams.get('reference_no');
  const getDeparture = searchParams.get('departure');
  const getArrival = searchParams.get('arrival');
  const getPromocode = searchParams.get('promocode');
  const getAirport = searchParams.get('airport');

  // Get cookie for campaign tracking
  const [cookie, setCookie] = useState(null);

  // useEffect(() => {
  //   const value = Cookies.get('customCid');
  //   if (value) {
  //     setCookie(value);
  //   }
  // }, []);

  useEffect(() => {
    if (getReference) {
      setReferenceNo([getReference]);
      setMultiModeReferenceNo(`MM-${getReference}`);
    }
  }, [getReference]);

  useEffect(() => {
    // Calculate supplier cost based on vehicles and product price
    if (selectedProduct?.price && vehicleData) {
      const quoteAmount = parseFloat(selectedProduct.price);
      setSupplierCost(vehicleData.length * quoteAmount);
    }
  }, [vehicleData, selectedProduct?.price]);

  // Auto-trigger booking sync when form is ready (like the reference)
  useEffect(() => {
    if (!enabled) return;

    // Check if vehicles are complete
    const isVehicleComplete = vehicleData?.some(vehicle =>
      vehicle.make?.length &&
      vehicle.model?.length &&
      vehicle.color?.length &&
      vehicle.reg_no?.length
    );

    // Check if personal details are complete
    const isFormComplete = personalData?.title?.length &&
      personalData?.firstName?.length &&
      personalData?.lastName?.length &&
      personalData?.phone?.length &&
      personalData?.email?.length;

    if (isFormComplete && syncBookingState === 'initial') {
      console.log('🔄 Auto-triggering booking sync - form is ready');
      const delayInterval = setTimeout(() => {
        handleSyncBooking();
      }, 3000); // 3-second delay like in reference

      return () => clearTimeout(delayInterval);
    }
  }, [personalData, vehicleData, syncBookingState, enabled]);

  /**
   * Store initial booking - Step 1 (when user fills personal details)
   */
  const handleSyncBooking = useCallback(async (paymentType = '') => {
    if (!selectedProduct || !personalData) {
      console.log('⚠️ Missing required data for booking sync');
      return { success: false, error: 'Missing required booking data' };
    }

    setSyncBookingState('triggered');
    setStatus('');
    setResponseError('');
    setIsLoading(true);

    try {
      // Prepare booking details following the reference pattern
      const buildDateTime = (dateStr, timeStr) => {
        if (!dateStr) return '';
        const t = timeStr && typeof timeStr === 'string' ? timeStr : '12:00';
        return format(parse(`${dateStr} ${t}`, 'yyyy-MM-dd HH:mm', new Date()), 'dd-MM-yyyy HH:mm');
      };
      const formatFromUrl = (dt) => dt ? format(parse(dt, 'yyyy-MM-dd HH:mm', new Date()), 'dd-MM-yyyy HH:mm') : '';
      const dep = getDeparture ? formatFromUrl(getDeparture) : buildDateTime(searchData?.entryDate, searchData?.entryTime);
      const arr = getArrival ? formatFromUrl(getArrival) : buildDateTime(searchData?.exitDate, searchData?.exitTime);

      const details = {
        key: apiKey,
        api_tag: selectedProduct.api_tag || '',
        option_id: selectedProduct?.option_id ? JSON.stringify(selectedProduct.option_id) : '',
        search_id: selectedProduct?.search_id || '',
        multi_mode_reference_no: multiModeReferenceNo,
        reference_no: referenceNo,
        status: '0',
        departure: dep,
        arrival: arr,
        sku: selectedProduct?.sku,
        amount: selectedProduct?.price,

        // Personal details
        title: personalData.title || 'Mr',
        first_name: personalData.firstName || '',
        last_name: personalData.lastName || '',
        email: personalData.email || '',
        contact_no: personalData.phone || '',

        // Vehicle details
        vehicles: vehicleData || [{
          make: 'TBC',
          model: 'TBC',
          color: 'TBC',
          reg_no: 'TBC'
        }],

        discount_amount: selectedProduct.discount || '0.00',
        discount_code: getPromocode?.toString() || '',
        admin_charges: selectedProduct.admin_charges || 0,
        cancellation_status: bookingOptions?.cancellationProtection ? '1' : '0',
        sms_confirmation: bookingOptions?.smsUpdates ? '1' : '0',
        // icampaign: cookie || '', 
      };

      console.log('🔄 CREATE BOOKING API DEBUG');
      console.log('='.repeat(50));
      console.log('📝 Storing booking with details...');

      // Step 1: Store booking if no references exist
      if (!multiModeReferenceNo.length && !referenceNo.length) {
        console.log('📤 CREATE BOOKING API - REQUEST PAYLOAD:');
        console.log(JSON.stringify(details, null, 2));

        const storeResponse = await apiCall(
          'post',
          '/bookings/store',
          details
        );

        console.log('📥 CREATE BOOKING API - RESPONSE:');
        console.log(JSON.stringify(storeResponse, null, 2));

        if (storeResponse.data?.reference_no && storeResponse.data?.multi_mode_reference_no) {
          // Store in session storage like the reference
          if (typeof sessionStorage !== 'undefined') {
            sessionStorage.setItem('detail', JSON.stringify({
              ...details,
              reference_no: storeResponse.data.reference_no,
              multi_mode_reference_no: storeResponse.data.multi_mode_reference_no,
            }));
          }

          setMultiModeReferenceNo(storeResponse.data.multi_mode_reference_no);
          setReferenceNo(storeResponse.data.reference_no);
          setSyncBookingState('stored');
          setState('success');

          console.log('✅ Booking stored successfully:', {
            multiMode: storeResponse.data.multi_mode_reference_no,
            reference: storeResponse.data.reference_no
          });

          return {
            success: true,
            data: storeResponse.data,
            multiModeReference: storeResponse.data.multi_mode_reference_no,
            referenceNo: storeResponse.data.reference_no
          };
        } else {
          throw new Error(storeResponse.message || 'Failed to store booking');
        }
      } else {
        // Booking already exists - just return success
        setSyncBookingState('stored');
        setState('success');
        return {
          success: true,
          multiModeReference: multiModeReferenceNo,
          referenceNo: referenceNo
        };
      }
    } catch (error) {
      console.error('❌ Booking sync error:', error);
      setState('error');
      setStatus(error.message);
      setResponseError(error.message);
      setSyncBookingState('error');

      return {
        success: false,
        error: error.message || 'Failed to sync booking'
      };
    } finally {
      setIsLoading(false);
    }
  }, [personalData, vehicleData, bookingOptions, selectedProduct, searchData, multiModeReferenceNo, referenceNo, cookie]);

  /**
   * Update booking before payment - Step 2 (before payment processing)
   */
  const updateBookingForPayment = useCallback(async () => {
    if (!multiModeReferenceNo) {
      console.log('⚠️ No booking reference for update');
      return { success: false, error: 'No booking reference found' };
    }

    setIsLoading(true);

    try {
      console.log('🔄 Updating booking before payment...');

      // Prepare update details
      const buildDateTime = (dateStr, timeStr) => {
        if (!dateStr) return '';
        const t = timeStr && typeof timeStr === 'string' ? timeStr : '12:00';
        return format(parse(`${dateStr} ${t}`, 'yyyy-MM-dd HH:mm', new Date()), 'dd-MM-yyyy HH:mm');
      };
      const formatFromUrl = (dt) => dt ? format(parse(dt, 'yyyy-MM-dd HH:mm', new Date()), 'dd-MM-yyyy HH:mm') : '';
      const dep = getDeparture ? formatFromUrl(getDeparture) : buildDateTime(searchData?.entryDate, searchData?.entryTime);
      const arr = getArrival ? formatFromUrl(getArrival) : buildDateTime(searchData?.exitDate, searchData?.exitTime);

      const updateDetails = {
        key: apiKey,
        multi_mode_reference_no: multiModeReferenceNo,
        status: '0',
        departure: dep,
        arrival: arr,
        sku: selectedProduct?.sku,

        // Personal details
        title: personalData?.title || 'Mr',
        first_name: personalData?.firstName || '',
        last_name: personalData?.lastName || '',
        email: personalData?.email || '',
        contact_no: personalData?.phone || '',

        // Vehicles
        vehicles: vehicleData || [{
          make: 'TBC',
          model: 'TBC',
          color: 'TBC',
          reg_no: 'TBC'
        }],

        amount: selectedProduct?.price,
        discount_amount: selectedProduct.discount || '0.00',
        discount_code: getPromocode?.toString() || '',
        admin_charges: selectedProduct?.admin_charges || 0,
        cancellation_status: bookingOptions?.cancellationProtection ? '1' : '0',
        sms_confirmation: bookingOptions?.smsUpdates ? '1' : '0',
        option_id: selectedProduct?.option_id ? JSON.stringify(selectedProduct.option_id) : '',
        search_id: selectedProduct?.search_id || '',
        api_tag: selectedProduct?.api_tag || '',
        icampaign: cookie || '',
      };

      console.log('🔄 Update booking details:', updateDetails);

      const updateResponse = await apiCall(
        'post',
        '/bookings/update',
        updateDetails
      );

      console.log('🔄 Update response:', updateResponse);

      if (updateResponse.data?.reference_no && updateResponse.data?.multi_mode_reference_no) {
        // Update session storage
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('detail', JSON.stringify({
            ...updateDetails,
            reference_no: updateResponse.data.reference_no,
            multi_mode_reference_no: updateResponse.data.multi_mode_reference_no,
          }));
        }

        setMultiModeReferenceNo(updateResponse.data.multi_mode_reference_no);
        setReferenceNo(updateResponse.data.reference_no);

        console.log('✅ Booking updated successfully');

        return {
          success: true,
          data: updateResponse.data,
          multiModeReference: updateResponse.data.multi_mode_reference_no,
          referenceNo: updateResponse.data.reference_no
        };
      } else {
        setResponseError(updateResponse.message);
        throw new Error(updateResponse.message || 'Failed to update booking');
      }
    } catch (error) {
      console.error('❌ Booking update error:', error);
      setResponseError(error.message);
      return {
        success: false,
        error: error.message || 'Failed to update booking'
      };
    } finally {
      setIsLoading(false);
    }
  }, [multiModeReferenceNo, personalData, vehicleData, bookingOptions, selectedProduct, searchData, cookie]);

  /**
   * Reset sync state
   */
  const resetSync = useCallback(() => {
    setSyncBookingState('initial');
    setState('initial');
    setResponseError('');
    setStatus('');
    setReferenceNo('');
    setMultiModeReferenceNo('');
    setIsLoading(false);
  }, []);

  /**
   * Check if form is ready for payment
   */
  const isFormReady = Boolean(
    personalData?.firstName &&
    personalData?.lastName &&
    personalData?.email &&
    personalData?.phone &&
    vehicleData?.length > 0 &&
    syncBookingState === 'stored'
  );

  return {
    // State
    syncBookingState,
    state,
    responseError,
    status,
    referenceNo,
    multiModeReferenceNo,
    supplierCost,
    isLoading,
    isFormReady,

    // Actions
    handleSyncBooking,
    updateBookingForPayment,
    resetSync,

    // Computed values
    hasBookingReferences: Boolean(multiModeReferenceNo || referenceNo),
    error: responseError || status,
  };
};

export default useBookingSyncPattern;
