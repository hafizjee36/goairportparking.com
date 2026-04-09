// WorldPay integration service - Enhanced for React implementation
import { useState } from 'react';
import { generateWorldpaySession, storeInitialBooking, updateBookingDetails, fetchWorldpaySessionDetails, updateWorldpayBookingStatus } from './worldpayApiService.js';
import { apiKey } from '../common/config/api.jsx';
import { format } from 'date-fns';

export class WorldPayService {
  constructor() {
    this.sessionId = null;
    this.redirectUrl = null;
    this.isInitialized = false;
    this.bookingReference = null;
    this.multiModeReference = null;
    this.state = 'initial';
    this.syncBookingState = 'initial';
  }

  /**
   * Step 1: Store initial booking when user fills personal details
   * @param {Object} bookingData - Basic booking information
   * @returns {Promise<Object>} Store booking response
   */
  async storeBooking(bookingData) {
    try {
      const {
        personalData,
        vehicleData,
        bookingOptions,
        selectedProduct,
        searchData,
      } = bookingData;

      // Format booking details similar to Next.js implementation
      const details = {
        key: apiKey,
        quote: selectedProduct?.quote || '',
        token: selectedProduct?.token || '',
        multimode: this.multiModeReference || '',
        reference_no: this.bookingReference || [],
        status: '0',
        departure: searchData?.entryDate ?
          format(new Date(searchData.entryDate), 'dd-MM-yyyy HH:mm') : '',
        arrival: searchData?.exitDate ?
          format(new Date(searchData.exitDate), 'dd-MM-yyyy HH:mm') : '',
        sku: selectedProduct?.sku || '',

        // Personal details
        title: personalData?.title || 'Mr',
        first_name: personalData?.firstName || '',
        last_name: personalData?.lastName || '',
        email: personalData?.email || '',
        contact_no: personalData?.phone || '',

        // Vehicle details
        vehicles: vehicleData || [{
          make: 'TBC',
          model: 'TBC',
          color: 'TBC',
          reg_no: 'TBC'
        }],

        // Pricing
        amount: selectedProduct?.payment?.amount || selectedProduct?.price || 0,
        admin_charges: selectedProduct?.admin_charges || 0,
        discount_amount: selectedProduct?.payment?.discount || selectedProduct?.discount || '0.00',
        discount_code: searchData?.discountCode || '',

        // Options
        cancellation_status: bookingOptions?.cancellationProtection ? '1' : '0',
        sms_confirmation: bookingOptions?.smsUpdates ? '1' : '0',

        // API specific
        api_tag: selectedProduct?.api_tag || '',
        option_id: selectedProduct?.option_id ? JSON.stringify(selectedProduct.option_id) : '',
        search_id: selectedProduct?.search_id || '',
      };

      const response = await storeInitialBooking(details);

      if (response.success) {
        this.bookingReference = response.data.reference_no;
        this.multiModeReference = response.data.multi_mode_reference_no;
        this.syncBookingState = 'stored';

        return {
          success: true,
          data: {
            reference_no: this.bookingReference,
            multi_mode_reference_no: this.multiModeReference,
            ...response.data
          }
        };
      } else {
        throw new Error(response.error || 'Failed to store booking');
      }
    } catch (error) {
      console.error('Store booking error:', error);
      return {
        success: false,
        error: error.message || 'Failed to store booking'
      };
    }
  }

  /**
   * Step 2: Update booking with final details before WorldPay session
   * @param {Object} sessionData - Complete booking and payment data
   * @returns {Promise<Object>} Update booking response
   */
  async updateBookingForPayment(sessionData) {
    try {
      const {
        personalData,
        vehicleData,
        bookingOptions,
        selectedProduct,
        searchData,
        totalAmount,
      } = sessionData;

      // Format booking details to match backend API expectations
      const details = {
        debug: true,
        key: apiKey,
        sku: selectedProduct?.sku || '',
        multi_mode_reference_no: this.multiModeReference,

        // Personal details
        title: personalData?.title || 'Mr',
        first_name: personalData?.firstName || '',
        last_name: personalData?.lastName || '',
        email: personalData?.email || '',
        contact_no: personalData?.phone || '',

        // Travel details
        departure: searchData?.entryDate ?
          format(new Date(searchData.entryDate), 'dd-MM-yyyy HH:mm') : '',
        arrival: searchData?.exitDate ?
          format(new Date(searchData.exitDate), 'dd-MM-yyyy HH:mm') : '',
        departure_terminal: personalData?.departureTerminal || 'Terminal 1',
        departure_flight_no: personalData?.departureFlightNo || personalData?.inboundFlight || '',
        arrival_terminal: personalData?.arrivalTerminal || 'Terminal 1',
        arrival_flight_no: personalData?.arrivalFlightNo || personalData?.outboundFlight || '',

        // Pricing
        amount: (selectedProduct?.payment?.amount || selectedProduct?.price || totalAmount || 0).toString(),
        discount_amount: (selectedProduct?.payment?.discount || selectedProduct?.discount || '0.00').toString(),
        discount_code: searchData?.discountCode || '',

        // Options
        cancellation_status: bookingOptions?.cancellationProtection ? '1' : '0',
        sms_confirmation: bookingOptions?.smsUpdates ? '1' : '0',
        valet_type: selectedProduct?.valet_type || '',
        instruction: bookingOptions?.specialInstructions || 'Booking updated via payment system',
        no_of_peoples: parseInt(bookingOptions?.numberOfPeople || '1'),

        // Vehicle details - format to match backend expectations
        vehicles: (vehicleData && vehicleData.length > 0) ? vehicleData.map(vehicle => ({
          make: vehicle.make || vehicle.vehicleMake || 'TBC',
          model: vehicle.model || vehicle.vehicleModel || 'TBC',
          color: vehicle.color || vehicle.vehicleColor || 'TBC',
          reg_no: vehicle.reg_no || vehicle.licensePlate || vehicle.registration || 'TBC' // Fixed: reg_no first, then alternatives
        })) : [{
          make: 'TBC',
          model: 'TBC',
          color: 'TBC',
          reg_no: 'TBC'
        }]
      };

      console.log('📦 Update API Payload:', details);

      const response = await updateBookingDetails(details);

      if (response.success) {
        return {
          success: true,
          data: response.data
        };
      } else {
        throw new Error(response.error || 'Failed to update booking');
      }
    } catch (error) {
      console.error('Update booking error:', error);
      return {
        success: false,
        error: error.message || 'Failed to update booking'
      };
    }
  }

  /**
   * Step 3: Initialize WorldPay session after booking update (Next.js pattern)
   * @param {Object} sessionData - Complete booking and payment data
   * @returns {Promise<Object>} Session initialization response
   */
  async initializeSession(sessionData) {
    console.log('🔄 WorldPay Service: initializeSession called with:', {
      personalDataExists: !!sessionData.personalData,
      vehicleDataCount: sessionData.vehicleData?.length || 0,
      totalAmount: sessionData.totalAmount,
      currentSyncState: this.syncBookingState,
      existingReferences: { multimode: this.multiModeReference, bookingRef: this.bookingReference }
    });

    try {
      const {
        personalData,
        vehicleData,
        bookingOptions,
        selectedProduct,
        searchData,
        totalAmount,
        domainUrl = window.location.origin
      } = sessionData;

      this.state = 'loading';
      console.log('✅ Service state set to loading');

      // Step 1: Store booking if not already stored
      if (this.syncBookingState === 'initial') {
        console.log('📝 Step 1: Store booking - sync state is initial, calling storeBooking...');
        const storeResponse = await this.storeBooking({
          personalData,
          vehicleData,
          bookingOptions,
          selectedProduct,
          searchData
        });

        console.log('📝 Store booking response:', storeResponse);

        if (!storeResponse.success) {
          this.state = 'error';
          console.log('❌ Store booking failed:', storeResponse.error);
          throw new Error(storeResponse.error || 'Failed to store booking');
        }
        console.log('✅ Store booking successful');
      } else {
        console.log('📝 Step 1: Skipped - booking already stored (syncBookingState:', this.syncBookingState, ')');
      }

      // Step 2: Update booking with final details before payment
      console.log('🔄 Step 2: Calling updateBookingForPayment...');
      const updateResponse = await this.updateBookingForPayment({
        personalData,
        vehicleData,
        bookingOptions,
        selectedProduct,
        searchData,
        totalAmount
      });

      console.log('🔄 Update booking response:', updateResponse);

      if (!updateResponse.success) {
        this.state = 'error';
        console.log('❌ Update booking failed:', updateResponse.error);
        throw new Error(updateResponse.error || 'Failed to update booking');
      }
      console.log('✅ Update booking successful');

      // Step 3: Generate WorldPay session (like Next.js)
      console.log('🌍 Step 3: Generating WorldPay session...');
      const customerName = `${personalData.firstName} ${personalData.lastName}`;
      const storeUrl = `${domainUrl}/worldpay-confirmation?bookingReference=${this.multiModeReference}&reference_no=${this.bookingReference}`;
      const notifyUrl = `${domainUrl}/api/worldpay-response?bookingReference=${this.multiModeReference}&reference_no=${this.bookingReference}`;
      const cancelUrl = `${domainUrl}/worldpay-cancel?bookingReference=${this.multiModeReference}&reference_no=${this.bookingReference}`;

      console.log('🌍 WorldPay session parameters:', {
        customerName,
        customerEmail: personalData.email,
        customerMobile: personalData.phone,
        reference_no: this.bookingReference,
        multi_mode_reference_no: this.multiModeReference,
        amount: totalAmount,
        storeUrl,
        notifyUrl,
        cancelUrl
      });

      const worldpayResponse = await generateWorldpaySession({
        customerName,
        customerEmail: personalData.email,
        customerMobile: personalData.phone,
        reference_no: this.bookingReference,
        multi_mode_reference_no: this.multiModeReference,
        amount: totalAmount,
        storeUrl,
        notifyUrl,
        cancelUrl,
      });

      console.log('🌍 WorldPay session response:', worldpayResponse);

      if (worldpayResponse.success && worldpayResponse.data.status === 'SUCCESS') {
        this.sessionId = worldpayResponse.data.sessionId;
        this.redirectUrl = worldpayResponse.data.redirectUrl;
        this.isInitialized = true;
        this.state = 'success';

        return {
          success: true,
          sessionId: this.sessionId,
          redirectUrl: this.redirectUrl,
          bookingReference: this.bookingReference,
          multiModeReference: this.multiModeReference,
          data: worldpayResponse.data
        };
      } else {
        this.state = 'processedButFailed';
        throw new Error(worldpayResponse.data?.reasonMessage || worldpayResponse.error || 'WorldPay session creation failed');
      }
    } catch (error) {
      console.error('WorldPay session initialization error:', error);
      this.state = 'error';
      return {
        success: false,
        error: error.message || 'Failed to initialize payment session'
      };
    }
  }

  /**
   * Redirect to WorldPay payment page
   */
  redirectToPayment() {
    if (!this.isInitialized || !this.redirectUrl) {
      throw new Error('WorldPay session not initialized');
    }

    // Store session data for return
    sessionStorage.setItem('worldpay_session', JSON.stringify({
      sessionId: this.sessionId,
      timestamp: Date.now()
    }));

    // Redirect to WorldPay
    window.location.href = this.redirectUrl;
  }

  /**
   * Handle return from WorldPay
   * @param {string} sessionKey - Session key from WorldPay return
   * @param {Object} returnData - Data returned from WorldPay
   * @returns {Promise<Object>} Payment verification result
   */
  async handlePaymentReturn(sessionKey, returnData = {}) {
    try {
      // Get stored session data
      const storedSession = sessionStorage.getItem('worldpay_session');
      if (!storedSession) {
        throw new Error('No payment session found');
      }

      const { sessionId } = JSON.parse(storedSession);

      // Verify payment with our backend - using WorldPay API service
      const response = await fetchWorldpaySessionDetails({
        sessionId,
        reference_no: this.bookingReference,
        multi_mode_reference_no: this.multiModeReference,
        ...returnData
      });

      // Clean up session storage
      sessionStorage.removeItem('worldpay_session');

      if (response.success) {
        return {
          success: true,
          paymentStatus: response.data.status,
          transactionId: response.data.transactionId,
          orderCode: response.data.orderCode,
          data: response.data
        };
      } else {
        throw new Error(response.message || 'Payment verification failed');
      }
    } catch (error) {
      console.error('WorldPay payment verification error:', error);
      sessionStorage.removeItem('worldpay_session');
      return {
        success: false,
        error: error.message || 'Payment verification failed'
      };
    }
  }

  /**
   * Check payment status
   * @param {string} sessionId - WorldPay session ID
   * @returns {Promise<Object>} Payment status
   */
  async checkPaymentStatus(sessionId, referenceNo, multiModeRef) {
    try {
      const response = await fetchWorldpaySessionDetails({
        sessionId,
        reference_no: referenceNo || this.bookingReference,
        multi_mode_reference_no: multiModeRef || this.multiModeReference
      });

      return {
        success: response.success,
        status: response.data?.status,
        transactionId: response.data?.hostedSessionStatus?.transactionState?.id,
        data: response.data
      };
    } catch (error) {
      console.error('WorldPay status check error:', error);
      return {
        success: false,
        error: error.message || 'Failed to check payment status'
      };
    }
  }

  /**
   * Process refund (if supported)
   * @param {string} transactionId - Original transaction ID
   * @param {number} amount - Refund amount
   * @returns {Promise<Object>} Refund result
   */
  async processRefund(transactionId, amount, referenceNo, multiModeRef) {
    try {
      // Note: Refund functionality would need to be implemented on the backend
      // For now, this is a placeholder that updates booking status
      const response = await updateWorldpayBookingStatus({
        multi_mode_reference_no: multiModeRef || this.multiModeReference,
        reference_no: referenceNo || this.bookingReference,
        transactionId,
        paymentStatus: 'refund_requested'
      });

      return {
        success: response.success,
        refundId: transactionId,
        status: response.data?.status || 'refund_requested',
        data: response.data
      };
    } catch (error) {
      console.error('WorldPay refund error:', error);
      return {
        success: false,
        error: error.message || 'Refund processing failed'
      };
    }
  }

  /**
   * Reset service state
   */
  reset() {
    this.sessionId = null;
    this.redirectUrl = null;
    this.isInitialized = false;
    this.bookingReference = null;
    this.multiModeReference = null;
    this.state = 'initial';
    this.syncBookingState = 'initial';
    sessionStorage.removeItem('worldpay_session');
  }

  /**
   * Get session info
   * @returns {Object} Current session information
   */
  getSessionInfo() {
    return {
      sessionId: this.sessionId,
      redirectUrl: this.redirectUrl,
      isInitialized: this.isInitialized
    };
  }
}

// Create singleton instance
export const worldPayService = new WorldPayService();

// WorldPay integration hooks for React components
export const useWorldPay = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionData, setSessionData] = useState(null);

  const initializePayment = async (paymentData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await worldPayService.initializeSession(paymentData);

      if (result.success) {
        setSessionData(result);
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      const errorMsg = err.message || 'Payment initialization failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const processPayment = async () => {
    if (!sessionData) {
      const errorMsg = 'No payment session available';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }

    try {
      worldPayService.redirectToPayment();
      return { success: true };
    } catch (err) {
      const errorMsg = err.message || 'Payment redirect failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const handlePaymentReturn = async (sessionKey, returnData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await worldPayService.handlePaymentReturn(sessionKey, returnData);
      return result;
    } catch (err) {
      const errorMsg = err.message || 'Payment verification failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    worldPayService.reset();
    setSessionData(null);
    setError(null);
  };

  return {
    loading,
    error,
    sessionData,
    initializePayment,
    processPayment,
    handlePaymentReturn,
    reset
  };
};

export default worldPayService;
