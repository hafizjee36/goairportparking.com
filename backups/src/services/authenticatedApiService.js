// Authenticated API Service
// This service handles API calls that require authentication token

import apiCall from './apiService';

// Get stored auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Get stored customer data from localStorage
const getCustomerData = () => {
  const customerData = localStorage.getItem('customerData');
  try {
    return customerData ? JSON.parse(customerData) : null;
  } catch (error) {
    console.error('Error parsing customer data:', error);
    return null;
  }
};

// Authenticated API service
export const authenticatedApiService = {
  // Get customer bookings with authentication
  getCustomerBookings: async (email) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await apiCall(
        'GET',
        `/customer/bookings?email=${encodeURIComponent(email)}`,
        null,
        headers,
        'get-customer-bookings-authenticated'
      );

      return response;
    } catch (error) {
      console.error('Error fetching customer bookings:', error);
      throw error;
    }
  },

  // Get specific booking details with authentication
  getBookingDetails: async (bookingId) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await apiCall(
        'GET',
        `/bookings/${bookingId}`,
        null,
        headers,
        'get-booking-details-authenticated'
      );

      return response;
    } catch (error) {
      console.error('Error fetching booking details:', error);
      throw error;
    }
  },

  // Update booking with authentication
  updateBooking: async (bookingId, updateData) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await apiCall(
        'PUT',
        `/bookings/${bookingId}`,
        updateData,
        headers,
        'update-booking-authenticated'
      );

      return response;
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  },

  // Cancel booking with authentication
  cancelBooking: async (bookingId, reason = '') => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const requestData = {
        reason: reason,
        cancelled_at: new Date().toISOString()
      };

      const response = await apiCall(
        'POST',
        `/bookings/${bookingId}/cancel`,
        requestData,
        headers,
        'cancel-booking-authenticated'
      );

      return response;
    } catch (error) {
      console.error('Error cancelling booking:', error);
      throw error;
    }
  },

  // Get customer profile with authentication
  getCustomerProfile: async () => {
    try {
      const token = getAuthToken();
      const customerData = getCustomerData();
      
      if (!token || !customerData?.email) {
        throw new Error('No authentication data found. Please login again.');
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await apiCall(
        'GET',
        `/customer/profile?email=${encodeURIComponent(customerData.email)}`,
        null,
        headers,
        'get-customer-profile-authenticated'
      );

      return response;
    } catch (error) {
      console.error('Error fetching customer profile:', error);
      throw error;
    }
  },

  // Update customer profile with authentication
  updateCustomerProfile: async (profileData) => {
    try {
      const token = getAuthToken();
      const customerData = getCustomerData();
      
      if (!token || !customerData?.email) {
        throw new Error('No authentication data found. Please login again.');
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await apiCall(
        'PUT',
        `/customer/profile`,
        { ...profileData, email: customerData.email },
        headers,
        'update-customer-profile-authenticated'
      );

      return response;
    } catch (error) {
      console.error('Error updating customer profile:', error);
      throw error;
    }
  },

  // Resend booking confirmation with authentication
  resendBookingConfirmation: async (bookingId) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await apiCall(
        'POST',
        `/bookings/${bookingId}/resend-confirmation`,
        {},
        headers,
        'resend-booking-confirmation-authenticated'
      );

      return response;
    } catch (error) {
      console.error('Error resending booking confirmation:', error);
      throw error;
    }
  },

  // Get booking payment history with authentication
  getBookingPaymentHistory: async (bookingId) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await apiCall(
        'GET',
        `/bookings/${bookingId}/payment-history`,
        null,
        headers,
        'get-booking-payment-history-authenticated'
      );

      return response;
    } catch (error) {
      console.error('Error fetching booking payment history:', error);
      throw error;
    }
  },

  // Validate current authentication token
  validateToken: async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        return { valid: false, error: 'No token found' };
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await apiCall(
        'GET',
        '/auth/validate-token',
        null,
        headers,
        'validate-auth-token'
      );

      return { valid: true, response };
    } catch (error) {
      console.error('Token validation failed:', error);
      return { valid: false, error: error.message };
    }
  },

  // Logout user with authentication
  logout: async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        // If no token, just clear local data
        localStorage.removeItem('authToken');
        localStorage.removeItem('customerData');
        return { success: true };
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await apiCall(
        'POST',
        '/logout',
        {},
        headers,
        'user-logout'
      );

      // Clear local storage regardless of API response
      localStorage.removeItem('authToken');
      localStorage.removeItem('customerData');

      return response;
    } catch (error) {
      console.error('Error during logout:', error);
      // Even if API call fails, clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('customerData');
      throw error;
    }
  },

  // Utility functions
  isAuthenticated: () => {
    const token = getAuthToken();
    return !!token;
  },

  getStoredAuthData: () => {
    return {
      token: getAuthToken(),
      customerData: getCustomerData()
    };
  },

  clearAuthData: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('customerData');
  }
};

export default authenticatedApiService;
