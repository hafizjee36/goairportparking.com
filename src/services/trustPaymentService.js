// TrustPayment service - Minimal for now (form-based gateway)
// Extend with backend APIs for init/verify as needed

import { apiKey } from '../common/config/api.jsx';

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
    // Backend call /payments/trustpayment-verify?status=1&sitereference=...
    console.log('TrustPayment verify:', returnData);
    return { success: returnData.status === '1', data: returnData };
  }

  reset() {
    this.sessionId = null;
    this.state = 'initial';
    sessionStorage.removeItem('trustpayment_session');
  }
}

export const trustPaymentService = new TrustPaymentService();

export const useTrustPayment = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const initializePayment = async (data) => {
    setLoading(true);
    try {
      const result = await trustPaymentService.initializePayment(data);
      return result;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    initializePayment,
  };
};

export default trustPaymentService;

