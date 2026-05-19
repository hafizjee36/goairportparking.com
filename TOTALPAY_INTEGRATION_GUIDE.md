# TotalPay Gateway Integration Setup Guide

This guide walks you through integrating TotalPay payment gateway into your parking booking application.

## Overview

TotalPay is a payment gateway that supports multiple currencies (AED, GBP, EUR, etc.) and provides a hosted checkout experience. This integration includes:

- React frontend with payment form and success/cancel pages
- Node.js/Express backend API endpoints
- Environment variable configuration
- Test mode support

## Prerequisites

- Node.js backend (Express.js)
- TotalPay merchant account with credentials
- Frontend built with React

## Step 1: Get TotalPay Credentials

1. Sign up at [TotalPay](https://www.totalpay.global/)
2. Get your credentials:
   - **Merchant Key**: Your unique merchant identifier
   - **Password**: Secure password for API calls
   - **Host URL**: `https://checkout.totalpay.global/api/v1/session` (Live)

## Step 2: Configure Environment Variables

### Backend (.env file)

```env
# TotalPay Gateway
TOTALPAY_HOST_URL=https://checkout.totalpay.global/api/v1/session
TOTALPAY_MERCHANT_KEY=your_merchant_key_here
TOTALPAY_PASSWORD=your_password_here
TOTALPAY_TEST_MODE=true

# Frontend URL for redirects
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend (.env file)

```env
VITE_API_URL=http://localhost:3001/api
```

## Step 3: Backend Setup

### 3.1 Install Dependencies

```bash
npm install node-fetch crypto
```

### 3.2 Add Routes to Express Server

Copy the code from `backend-totalpay-routes.js` and add to your Express server:

```javascript
// In your main server file (e.g., server.js or index.js)
const express = require('express');
const totalPayRoutes = require('./routes/payment-totalpay');

const app = express();

app.use(express.json());

// Add TotalPay routes
app.use('/api/payment', totalPayRoutes);

// ... rest of your server configuration
```

### 3.3 Create Payment Routes File

Create `routes/payment-totalpay.js` with the content from `backend-totalpay-routes.js`

## Step 4: Frontend Setup

### 4.1 Already Included Components

The following files have been created and integrated:

- ✅ `src/services/totalPayService.js` - API client
- ✅ `src/components/payment/TotalPayForm.jsx` - Payment form component
- ✅ `src/pages/payment/TotalPaySuccess.jsx` - Success page
- ✅ `src/pages/payment/TotalPayCancel.jsx` - Cancel page
- ✅ `src/routes/AppRoutes.jsx` - Routes added

### 4.2 Verify Payment.jsx Integration

The Payment page has been updated to include TotalPay as a gateway option. For Dubai airport, TotalPay is now the default gateway.

Check `src/pages/payment/Payment.jsx`:
- TotalPayForm import added ✅
- initialGateway logic updated ✅
- TotalPayForm rendering added ✅

## Step 5: Testing

### Test Credentials

- **Test Card Number**: 4111 1111 1111 1111
- **Expiry Date**: 01/38
- **CVV**: Any 3 digits

### Test Flow

1. Navigate to payment page
2. Select Dubai airport (TotalPay will be default)
3. Fill in all required details
4. Check the "I agree to terms" checkbox
5. Click "Pay with TotalPay"
6. You'll be redirected to TotalPay hosted checkout
7. Use test card details
8. Complete or cancel the payment
9. You'll be redirected back to success/cancel page

## Step 6: Payment Flow

```
User fills form
    ↓
Clicks "Pay with TotalPay"
    ↓
Frontend validates form
    ↓
Calls /api/payment/totalpay/initiate (Backend)
    ↓
Backend creates TotalPay session (MD5+SHA1 hash)
    ↓
Backend returns redirect_url
    ↓
Frontend redirects to TotalPay hosted checkout
    ↓
User completes payment at TotalPay
    ↓
TotalPay redirects to success/cancel URL
    ↓
Frontend displays confirmation
```

## Step 7: Production Deployment

### Environment Setup

```env
# Production
TOTALPAY_HOST_URL=https://checkout.totalpay.global/api/v1/session
TOTALPAY_MERCHANT_KEY=your_live_merchant_key
TOTALPAY_PASSWORD=your_live_password
TOTALPAY_TEST_MODE=false
FRONTEND_URL=https://yourdomain.com
NODE_ENV=production
```

### Security Checklist

- [ ] Use HTTPS only in production
- [ ] Store credentials in environment variables (never commit)
- [ ] Validate all inputs on backend
- [ ] Implement proper error handling
- [ ] Add request logging for debugging
- [ ] Test with real cards before going live
- [ ] Implement webhook for payment notifications (optional)

## Step 8: Webhook Integration (Optional)

For production, implement webhook handling to verify payments:

```javascript
router.post('/totalpay/webhook', (req, res) => {
  // Verify signature
  // Update booking status
  // Send confirmation email
  res.status(200).json({ success: true });
});
```

Refer to TotalPay documentation for webhook signature verification.

## Troubleshooting

### Issue: "Failed to resolve import"

**Solution**: Make sure all files are created in the correct paths:
- Services: `src/services/totalPayService.js`
- Components: `src/components/payment/TotalPayForm.jsx`
- Pages: `src/pages/payment/TotalPaySuccess.jsx` and `TotalPayCancel.jsx`

### Issue: "No redirect URL received"

**Solution**: 
- Check TotalPay credentials are correct
- Verify merchant key and password in .env
- Check backend logs for API errors
- Ensure node-fetch is installed

### Issue: "Payment redirects but shows error"

**Solution**:
- Verify billing address country matches currency
- Check order amount is valid number
- Validate email and phone format
- Check hash calculation (MD5 then SHA1)

### Issue: "Callback not received"

**Solution**:
- Verify success_url and cancel_url are correct
- Make sure frontend URLs are accessible
- Check TotalPay dashboard for webhook logs
- Implement proper error handling in callback handler

## File Structure

```
src/
├── components/
│   └── payment/
│       └── TotalPayForm.jsx          ✅ Created
├── pages/
│   └── payment/
│       ├── Payment.jsx                ✅ Updated
│       ├── TotalPaySuccess.jsx        ✅ Created
│       └── TotalPayCancel.jsx         ✅ Created
├── services/
│   └── totalPayService.js             ✅ Created
└── routes/
    └── AppRoutes.jsx                  ✅ Updated

backend/
├── routes/
│   └── payment-totalpay.js            📄 Copy from backend-totalpay-routes.js
└── .env                               ✅ Add credentials
```

## API Endpoints

### Frontend Service

```javascript
// Initiate payment
initiateTotalPayPayment(paymentData) 
  // POST /api/payment/totalpay/initiate
  // Returns: { success, redirect_url, sessionData }

// Handle callback
handleTotalPayCallback(sessionId)
  // POST /api/payment/totalpay/callback
  // Returns: { success, message }

// Get payment status
getTotalPayStatus(orderId)
  // GET /api/payment/totalpay/status/:orderId
  // Returns: { success, status, orderId }
```

## Support & Documentation

- **TotalPay Docs**: https://docs.totalpay.global/
- **TotalPay Testing**: https://docs.totalpay.global/docs/guides/checkout_integration/#testing
- **API Reference**: https://api.totalpay.global/

## Additional Notes

1. **Currency Handling**: 
   - AED for Dubai/UAE
   - GBP for UK airports
   - EUR for Irish airports

2. **Amount Formatting**: Always use 2 decimal places (e.g., "100.00")

3. **Order Numbers**: Use unique order numbers - recommend format: `ORDER-{timestamp}`

4. **Hash Calculation**: Must be uppercase before hashing

5. **Test Mode**: Always test in sandbox first before going live

## Checklist for Going Live

- [ ] TotalPay account created
- [ ] Credentials added to production environment
- [ ] Backend routes deployed
- [ ] Frontend components and routes integrated
- [ ] Success and cancel pages tested
- [ ] Payment form validation working
- [ ] Email notifications configured
- [ ] Booking database updated with TotalPay session IDs
- [ ] SSL certificates configured
- [ ] Error logging and monitoring setup
- [ ] Support team trained
- [ ] Documentation updated

## Testing Checklist

- [ ] Domestic cards work
- [ ] International cards work
- [ ] Invalid card rejected
- [ ] Cancel payment works
- [ ] Success page displays correctly
- [ ] Cancel page displays correctly
- [ ] Email confirmations sent
- [ ] Dashboard updated after payment
- [ ] Amount calculation correct
- [ ] Currency displays correctly

---

**Last Updated**: May 15, 2026
**Version**: 1.0
