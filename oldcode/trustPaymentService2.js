// TrustPayment service - Form-based gateway (minimal API needs)
// Matches pattern of worldpayService.js, stripe services in apiService.js

import { apiKey } from '../common/config/api.jsx';
import apiCall from './apiService.js';

export class TrustPaymentService {
  constructor() {
    this.sessionId = null;
    this.state = 'initial';
  }

  async initializePayment(paymentData) {
    // Form is self-contained; no session needed like WorldPay
    // Future: call backend /payments/trustpayment-init for sitereference
    return {
      success: true,
      redirectUrl: null, // Direct form submit
      sitereference: 'test_goairportp149005', // Backend-generated in future
    };
  }

  async verifyPayment(returnData) {
    // Server-side verification on callback (/trustpayment/verify)
    try {
    //   const response = await apiCall('POST', '/trustpayment/verify', returnData, {}, 'trustpayment-verify');
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  reset() {
    this.sessionId = null;
    this.state = 'initial';
    sessionStorage.removeItem('trustpayment_session');
  }
}

export const trustPaymentService = new TrustPaymentService();

export default trustPaymentService;

