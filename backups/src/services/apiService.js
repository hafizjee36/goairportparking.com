// API Service utility for making HTTP requests
import { apiUrl, apiKey } from '../common/config/api.jsx';

export default async function apiCall(
  method,
  path,
  data,
  headers = {},
  route = "",
  site = "airport parking app"
) {
  try {
    const baseHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...headers
    };

    const response = await fetch(`${apiUrl}${path}`, {
      method: method.toUpperCase(),
      headers: baseHeaders,
      ...(method.toLowerCase() !== 'get' && { body: JSON.stringify(data) }),
    });

    // Check content type before parsing
    const contentType = response.headers.get('content-type');

    // If response is not JSON, try to get text for better error messages
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('❌ Non-JSON response received:', {
        status: response.status,
        contentType,
        textPreview: text.substring(0, 200)
      });

      // If it's an HTML error page, throw a user-friendly error
      if (contentType && contentType.includes('text/html')) {
        throw new Error(
          `Server returned an error page (HTTP ${response.status}). Please check your network connection and try again.`
        );
      }

      throw new Error(
        `Invalid response format from server (expected JSON, got ${contentType || 'unknown'})`
      );
    }

    // Get the response text first
    const text = await response.text();

    // Try to parse as JSON
    let json;
    try {
      json = JSON.parse(text);
    } catch (parseError) {
      console.error('❌ JSON parse error:', {
        error: parseError.message,
        responsePreview: text.substring(0, 300)
      });
      throw new Error(
        `Failed to parse server response: ${parseError.message}. Please try again or contact support.`
      );
    }

    // Check if response indicates an error status
    if (!response.ok) {
      const errorMessage = json.message || json.error || `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return json;
  } catch (error) {
    // Log errors to API
    try {
      await fetch(`${apiUrl}/bookingErrorLogs/store`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: `site=${site} route=${route} endpoint=${path}`,
          error_log: `${error.message || error}`,
        }),
      });
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }

    throw error;
  }
}

// Helper function to calculate total booking price
export const calculateTotalPrice = (product, price, cancellation, sms) => {
  let total = product?.payment
    ? price + parseFloat(product?.payment?.admin_charges || 0)
    : price + parseFloat(product?.admin_charges || 0);

  if (cancellation) {
    const cancellationCharge = product?.payment
      ? parseFloat(product?.payment?.cancellation_charges || 0)
      : parseFloat(product?.cancellation_charges || 0);
    total += cancellationCharge;
  }

  if (sms) {
    const smsCharge = product?.payment
      ? parseFloat(product?.payment?.sms_charges || 0)
      : parseFloat(product?.sms_charges || 0);
    total += smsCharge;
  }

  return total;
};

// Booking API Service
export const bookingService = {
  // Create a new booking
  createBooking: async (bookingData) => {
    return await apiCall('POST', '/bookings', bookingData, {}, 'create-booking');
  },

  // Get booking by ID
  getBooking: async (bookingId) => {
    return await apiCall('GET', `/bookings/${bookingId}`, null, {}, 'get-booking');
  },

  // Update booking
  updateBooking: async (bookingId, updates) => {
    return await apiCall('PUT', `/bookings/${bookingId}`, updates, {}, 'update-booking');
  },

  // Cancel booking
  cancelBooking: async (bookingId) => {
    return await apiCall('DELETE', `/bookings/${bookingId}`, null, {}, 'cancel-booking');
  },

  // Get user bookings
  getUserBookings: async (userId) => {
    return await apiCall('GET', `/users/${userId}/bookings`, null, {}, 'get-user-bookings');
  }
};

// Payment API Service
export const paymentService = {
  // Process payment
  processPayment: async (paymentData) => {
    return await apiCall('POST', '/payments/process', paymentData, {}, 'process-payment');
  },

  // Validate payment
  validatePayment: async (paymentId) => {
    return await apiCall('GET', `/payments/${paymentId}/validate`, null, {}, 'validate-payment');
  },

  // Get payment status
  getPaymentStatus: async (paymentId) => {
    return await apiCall('GET', `/payments/${paymentId}/status`, null, {}, 'get-payment-status');
  },

  // Create WorldPay session
  createWorldPaySession: async (sessionData) => {
    return await apiCall('POST', '/payments/worldpay/session', sessionData, {}, 'create-worldpay-session');
  },

  // Verify WorldPay payment
  verifyWorldPayPayment: async (sessionId, paymentData) => {
    return await apiCall('POST', `/payments/worldpay/verify/${sessionId}`, paymentData, {}, 'verify-worldpay-payment');
  },

  // Stripe Payment Integration
  // Create Stripe payment intent with booking data
  createStripePaymentIntent: async (bookingData) => {
    return await apiCall('POST', '/stripe/paymentIntent/create', bookingData, {}, 'create-stripe-payment-intent');
  },

  // Update Stripe payment intent
  updateStripePaymentIntent: async (paymentIntentId, updateData) => {
    return await apiCall('POST', '/stripe/paymentIntent/update', updateData, {}, 'update-stripe-payment-intent');
  },

  // Confirm Stripe payment and finalize booking
  confirmStripePayment: async (paymentIntentId, confirmationData) => {
    return await apiCall('POST', `/payments/stripe/confirm-payment/${paymentIntentId}`, confirmationData, {}, 'confirm-stripe-payment');
  },

  // Retrieve Stripe payment intent status
  getStripePaymentIntent: async (paymentIntentId, apiTag = null) => {
    const payload = {
      key: apiKey,
      payment_intent_id: paymentIntentId,
      ...(apiTag ? { api_tag: apiTag } : {}),
    };
    return await apiCall('POST', '/stripe/paymentIntent/retrieve', payload, {}, 'get-stripe-payment-intent');
  },

  // Handle Stripe webhook events
  handleStripeWebhook: async (webhookData) => {
    return await apiCall('POST', '/payments/stripe/webhook', webhookData, {}, 'stripe-webhook');
  },

  // Update booking before payment (following reference pattern)
  updateBooking: async (updateData) => {
    return await apiCall('POST', '/bookings/update', updateData, {}, 'update-booking');
  },

  // Update booking intent with payment token
  updateBookingIntent: async (intentData) => {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
    return await apiCall('POST', '/bookings/updateIntent', intentData, headers, 'update-booking-intent');
  }
};

// Notification service
export const notificationService = {
  // Send booking confirmation email
  sendBookingConfirmation: async (bookingId) => {
    return await apiCall('POST', `/notifications/booking-confirmation`, { bookingId }, {}, 'send-booking-confirmation');
  },

  // Send SMS notification
  sendSMSNotification: async (phone, message) => {
    return await apiCall('POST', '/notifications/sms', { phone, message }, {}, 'send-sms');
  }
};
