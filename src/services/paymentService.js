// Dedicated payment service (imported by apiService)
// Extend existing paymentService in apiService.js

import apiCall from './apiService.js';
import { apiKey } from '../common/config/api.jsx';

export const dedicatedPaymentService = {
  // Existing methods (for reference/completeness)
  createStripePaymentIntent: async (data) => {
    return await apiCall('POST', '/stripe/paymentIntent/create', data, {}, 'stripe-intent');
  },

  // ... other methods
};

// Export for use in components/services
export default dedicatedPaymentService;

