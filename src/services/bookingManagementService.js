// Booking Management Service
// This service handles API calls related to booking management and customer dashboard

import apiCall from './apiService';

export const bookingManagementService = {
  // Search booking by reference number and email
  searchBookingByReference: async (referenceNo, email) => {
    try {
      const requestData = {
        bookingReference: referenceNo,
        emailAddress: email
      };
      
      const response = await apiCall(
        'POST',
        '/bookings/search/reference',
        requestData,
        {},
        'search-booking-by-reference',
        'airport parking app'
      );
      
      return response;
    } catch (error) {
      throw new Error(`Failed to search booking by reference: ${error.message}`);
    }
  },

  // Search booking by email and mobile/vehicle registration
  searchBookingByEmail: async (email, mobileOrVehicleReg) => {
    try {
      const requestData = {
        emailAddress: email,
        mobileOrVehicleReg: mobileOrVehicleReg
      };
      
      const response = await apiCall(
        'POST',
        '/bookings/search/email',
        requestData,
        {},
        'search-booking-by-email',
        'airport parking app'
      );
      
      return response;
    } catch (error) {
      throw new Error(`Failed to search booking by email: ${error.message}`);
    }
  },

  // Get customer bookings (all bookings for a customer)
  getCustomerBookings: async (customerId) => {
    try {
      const response = await apiCall(
        'GET',
        `/customers/${customerId}/bookings`,
        null,
        {},
        'get-customer-bookings',
        'airport parking app'
      );
      
      return response;
    } catch (error) {
      throw new Error(`Failed to get customer bookings: ${error.message}`);
    }
  },

  // Get booking details by booking ID
  getBookingDetails: async (bookingId) => {
    try {
      const response = await apiCall(
        'GET',
        `/bookings/${bookingId}`,
        null,
        {},
        'get-booking-details',
        'airport parking app'
      );
      
      return response;
    } catch (error) {
      throw new Error(`Failed to get booking details: ${error.message}`);
    }
  },

  // Update booking details
  updateBookingDetails: async (bookingId, updateData) => {
    try {
      const response = await apiCall(
        'PUT',
        `/bookings/${bookingId}`,
        updateData,
        {},
        'update-booking-details',
        'airport parking app'
      );
      
      return response;
    } catch (error) {
      throw new Error(`Failed to update booking: ${error.message}`);
    }
  },

  // Cancel booking
  cancelBooking: async (bookingId, cancellationReason = '') => {
    try {
      const requestData = {
        reason: cancellationReason,
        cancelledAt: new Date().toISOString()
      };
      
      const response = await apiCall(
        'POST',
        `/bookings/${bookingId}/cancel`,
        requestData,
        {},
        'cancel-booking',
        'airport parking app'
      );
      
      return response;
    } catch (error) {
      throw new Error(`Failed to cancel booking: ${error.message}`);
    }
  },

  // Resend booking confirmation email
  resendConfirmationEmail: async (bookingId) => {
    try {
      const response = await apiCall(
        'POST',
        `/bookings/${bookingId}/resend-confirmation`,
        {},
        {},
        'resend-confirmation-email',
        'airport parking app'
      );
      
      return response;
    } catch (error) {
      throw new Error(`Failed to resend confirmation email: ${error.message}`);
    }
  },

  // Get booking payment history
  getBookingPayments: async (bookingId) => {
    try {
      const response = await apiCall(
        'GET',
        `/bookings/${bookingId}/payments`,
        null,
        {},
        'get-booking-payments',
        'airport parking app'
      );
      
      return response;
    } catch (error) {
      throw new Error(`Failed to get booking payments: ${error.message}`);
    }
  },

  // Update customer notification preferences
  updateNotificationPreferences: async (customerId, preferences) => {
    try {
      const response = await apiCall(
        'PUT',
        `/customers/${customerId}/notification-preferences`,
        preferences,
        {},
        'update-notification-preferences',
        'airport parking app'
      );
      
      return response;
    } catch (error) {
      throw new Error(`Failed to update notification preferences: ${error.message}`);
    }
  },

  // Get customer profile information
  getCustomerProfile: async (customerId) => {
    try {
      const response = await apiCall(
        'GET',
        `/customers/${customerId}/profile`,
        null,
        {},
        'get-customer-profile',
        'airport parking app'
      );
      
      return response;
    } catch (error) {
      throw new Error(`Failed to get customer profile: ${error.message}`);
    }
  },


  // Get logged in user details after authentication
  getUserDetails: async (email, token) => {
    try {
      const requestData = {
        key: import.meta.env.VITE_API_KEY || 'DPyF4KAdI0F2cGT6',
        // email: email
      };
      
      const headers = token ? {
        'Authorization': `Bearer ${token}`
      } : {};
      
      const response = await apiCall(
        'GET',
        `/customerBookingShow?key=${import.meta.env.VITE_API_KEY}`,
        "",
        headers,
        'get-user-details',
        'airport parking app'
      );
      
      return response;
    } catch (error) {
      throw new Error(`Failed to get user details: ${error.message}`);
    }
  },

  // Update customer profile
  updateCustomerProfile: async (profileData, token = null) => {
    try {
      const requestData = {
        key: import.meta.env.VITE_API_KEY || 'TzlexmpXGpYQbBpu',
        title: profileData.title,
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        email: profileData.email,
        contact_no: profileData.contact_no
      };
      
      const headers = token ? {
        'Authorization': `Bearer ${token}`
      } : {};
      
      const response = await apiCall(
        'POST',
        '/customer/profile/update',
        requestData,
        headers,
        'update-customer-profile',
        'airport parking app'
      );
      
      return response;
    } catch (error) {
      throw new Error(`Failed to update customer profile: ${error.message}`);
    }
  }
};

export default bookingManagementService;
