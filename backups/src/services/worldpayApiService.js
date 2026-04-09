// WorldPay API Service functions
// Adapted from Next.js project for React implementation
import { apiUrl, apiKey } from '../common/config/api.jsx';
import apiCall from './apiService.js';

/**
 * Generate WorldPay payment session
 * @param {Object} sessionParams - Parameters for session creation
 * @returns {Promise<Object>} WorldPay session response
 */
export const generateWorldpaySession = async ({
  customerName,
  customerEmail,
  customerMobile,
  reference_no,
  multi_mode_reference_no,
  amount,
  storeUrl,
  notifyUrl,
  cancelUrl,
}) => {
  // Input validation
  if (!customerName || !customerEmail || !customerMobile) {
    return {
      success: false,
      error: 'Missing required customer information'
    };
  }

  if (!reference_no || !multi_mode_reference_no) {
    return {
      success: false,
      error: 'Missing required booking references'
    };
  }

  if (!amount || isNaN(amount) || amount <= 0) {
    return {
      success: false,
      error: 'Invalid payment amount'
    };
  }

  try {
    const response = await apiCall(
      'POST',
      '/bookings/generateWorldpaySession',
      {
        key: apiKey,
        customerName,
        customerEmail,
        customerMobile,
        reference_no,
        multi_mode_reference_no,
        amount: parseFloat(amount).toFixed(2),
        storeUrl,
        notifyUrl,
        cancelUrl,
      },
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      'generate-worldpay-session'
    );

    if (response.success === true) {
      return {
        success: true,
        data: response.data
      };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to generate WorldPay session'
      };
    }
  } catch (error) {
    console.error('WorldPay session generation error:', error);
    return {
      success: false,
      error: error.message || 'WorldPay session generation failed'
    };
  }
};

/**
 * Fetch WorldPay session details for confirmation
 * @param {Object} sessionParams - Parameters for fetching session details
 * @returns {Promise<Object>} WorldPay session details response
 */
export const fetchWorldpaySessionDetails = async ({
  reference_no,
  multi_mode_reference_no,
  sessionId,
}) => {
  try {
    const response = await apiCall(
      'POST',
      '/bookings/fetchWorldpaySessionDetails',
      {
        key: apiKey,
        reference_no: Array.isArray(reference_no) ? reference_no : reference_no?.split(',') || [],
        multi_mode_reference_no,
        sessionId,
      },
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      'fetch-worldpay-session-details'
    );

    if (response.success === true) {
      return {
        success: true,
        data: response.data
      };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to fetch WorldPay session details'
      };
    }
  } catch (error) {
    console.error('WorldPay session details fetch error:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch session details'
    };
  }
};

/**
 * Store initial booking (for multimode & reference_no) - Step 1
 * @param {Object} bookingData - Basic booking information
 * @returns {Promise<Object>} Store booking response
 */
export const storeInitialBooking = async (bookingData) => {
  if (!bookingData) {
    return {
      success: false,
      error: 'Missing booking data'
    };
  }

  try {
    const response = await apiCall('POST', '/bookings/store', bookingData, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }, 'store-initial-booking');

    if (response.success) {
      return {
        success: true,
        data: {
          reference_no: response.data.reference_no,
          multi_mode_reference_no: response.data.multi_mode_reference_no, // Fixed to match Next.js naming
          ...response.data
        }
      };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to store booking'
      };
    }
  } catch (error) {
    console.error('Store booking error:', error);
    return {
      success: false,
      error: error.message || 'Booking storage failed'
    };
  }
};

/**
 * Update booking with final details before payment - Step 2
 * @param {Object} bookingData - Complete booking information
 * @returns {Promise<Object>} Update booking response
 */
export const updateBookingDetails = async (bookingData) => {
  if (!bookingData) {
    return {
      success: false,
      error: 'Missing booking data'
    };
  }

  try {
    const response = await apiCall('POST', '/bookings/update', bookingData, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }, 'update-booking-details');

    if (response.success) {
      return {
        success: true,
        data: {
          reference_no: response.data.reference_no,
          multi_mode_reference_no: response.data.multi_mode_reference_no, // Fixed to match Next.js naming
          ...response.data
        }
      };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to update booking'
      };
    }
  } catch (error) {
    console.error('Update booking error:', error);
    return {
      success: false,
      error: error.message || 'Booking update failed'
    };
  }
};

/**
 * Update booking payment status after WorldPay confirmation
 * @param {Object} paymentData - Payment confirmation data
 * @returns {Promise<Object>} Update response
 */
export const updateWorldpayBookingStatus = async ({
  multi_mode_reference_no,
  reference_no,
  transactionId,
  sessionId,
  paymentStatus = 'paid'
}) => {
  try {
    const response = await apiCall(
      'POST',
      '/payments/update',
      {
        key: apiKey,
        multi_mode_reference_no,
        reference_no: Array.isArray(reference_no) ? reference_no : reference_no?.split(',') || [],
        transaction_id: transactionId,
        session_id: sessionId,
        payment_type: 'worldpay',
        payment_status: paymentStatus,
        api_tag: '', // Will be set by backend based on booking
      },
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      'update-worldpay-booking-status'
    );

    return {
      success: response.success || false,
      data: response.data || {},
      message: response.message || ''
    };
  } catch (error) {
    console.error('WorldPay booking status update error:', error);
    return {
      success: false,
      error: error.message || 'Failed to update booking status'
    };
  }
};

export default {
  generateWorldpaySession,
  fetchWorldpaySessionDetails,
  storeInitialBooking,
  updateBookingDetails,
  updateWorldpayBookingStatus
};

