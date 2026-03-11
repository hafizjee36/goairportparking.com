# Go Airport Parking LTD App - React Frontend

A React frontend application for the Go Airport Parking LTD booking system. This app is built with Vite and integrates with Stripe for secure payment processing.

## Features

- ✅ **Stripe Payment Integration** - Secure payment processing with Stripe Elements
- ✅ **Booking Management** - Complete booking flow with vehicle details and additional services
- ✅ **Redux State Management** - Centralized state management with Redux Toolkit
- ✅ **Material-UI Components** - Modern UI components with Material-UI
- ✅ **Responsive Design** - Mobile-first responsive design
- ✅ **Form Validation** - Comprehensive form validation throughout the app
- ✅ **Animation Support** - Smooth animations with Framer Motion
- ⏸️ **WorldPay Integration** - Temporarily disabled (can be re-enabled)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Stripe account for payment processing
- Go backend server running at the configured API URL

## Environment Setup

1. Copy the environment template:
```bash
cp .env.example .env.local
```

2. Update the environment variables in `.env.local`:

### Required Variables
```bash
# API Configuration
VITE_API_URL=https://goparking.binaryparkme.com/api/v1.0
VITE_API_KEY=your_api_key_here

# Stripe Configuration (Frontend)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

### Getting Stripe Keys

1. Create a [Stripe account](https://dashboard.stripe.com/register)
2. Navigate to **Developers** → **API Keys**
3. Copy your **Publishable key** (starts with `pk_test_` for testing)
4. Add it to your `.env.local` file as `VITE_STRIPE_PUBLISHABLE_KEY`

⚠️ **Important**: Never expose your Stripe secret key in the frontend. Secret keys should only be used on your Go backend server.

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── payment/
│   │   ├── StripeForm.jsx      # Stripe payment form component
│   │   ├── StripePay.jsx       # Stripe wrapper component
│   │   └── WorldPayForm.jsx    # WorldPay form (disabled)
│   └── ...
├── pages/
│   ├── payment/
│   │   └── Payment.jsx         # Main payment page
│   ├── booking/
│   └── ...
├── redux/
│   └── slice/
│       └── paymentSlice.js     # Payment state management
├── services/
│   └── apiService.js           # API service with Stripe endpoints
└── utils/
    └── calculateTotalBookingAmount.js
```

## Payment Flow

The Stripe payment integration follows this flow:

1. **User fills booking details** → Personal info, vehicle details, additional services
2. **Payment intent creation** → Frontend calls backend to create Stripe PaymentIntent
3. **Stripe Elements rendered** → Secure payment form loads with client secret
4. **Payment confirmation** → User submits payment, Stripe processes securely
5. **Backend verification** → Payment confirmed with backend, booking created
6. **Success redirect** → User redirected to booking confirmation page

## API Endpoints (Backend)

The frontend expects these Stripe endpoints on your Go backend:

```bash
POST /payments/stripe/create-payment-intent  # Create payment intent
POST /payments/stripe/confirm-payment/:id    # Confirm payment
POST /payments/stripe/webhook                # Stripe webhooks (optional)
GET  /payments/stripe/payment-intent/:id     # Get payment status
```

## Development Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Testing Stripe Integration

### Test Cards

Use these test card numbers in development:

| Card Number | Brand | CVC | Expiry |
|-------------|-------|-----|--------|
| 4242424242424242 | Visa | Any 3 digits | Any future date |
| 4000002500003155 | Visa (3D Secure) | Any 3 digits | Any future date |
| 5555555555554444 | Mastercard | Any 3 digits | Any future date |

### Webhook Testing (Optional)

If implementing webhooks:

1. Install Stripe CLI: `brew install stripe/stripe-cli/stripe`
2. Login: `stripe login`
3. Forward events: `stripe listen --forward-to localhost:8000/payments/stripe/webhook`

## Production Deployment

1. **Environment Variables**: Update `.env.local` with production values
2. **Stripe Keys**: Switch to live Stripe keys (`pk_live_...`)
3. **Build**: Run `npm run build`
4. **Deploy**: Deploy `dist/` folder to your hosting provider

## Troubleshooting

### Common Issues

**Stripe not loading**
- Check `VITE_STRIPE_PUBLISHABLE_KEY` is set correctly
- Ensure you're using the correct key format (`pk_test_...` or `pk_live_...`)

**Payment fails**
- Check browser console for Stripe errors
- Verify backend API is running and accessible
- Check network tab for failed API calls

**Environment variables not working**
- Ensure variables start with `VITE_` prefix
- Restart development server after changing `.env.local`
- Check `.env.local` is in project root

## WorldPay Integration

WorldPay integration is temporarily disabled but can be re-enabled by:

1. Uncommenting WorldPay components in `Payment.jsx`
2. Commenting out Stripe components
3. Updating environment variables for WorldPay credentials

## Contributing

When contributing to payment functionality:

1. Test thoroughly with Stripe test cards
2. Never commit real API keys or secrets
3. Update this README if adding new payment features
4. Follow existing Redux patterns for state management

## Security Notes

- ✅ Stripe publishable keys are safe for frontend use
- ❌ Never expose Stripe secret keys in frontend code
- ✅ Payment processing happens securely through Stripe
- ✅ Card details never pass through your servers
- ✅ All sensitive data is handled by Stripe's secure infrastructure

## Technology Stack

- **Frontend Framework**: React 19 + Vite
- **State Management**: Redux Toolkit
- **UI Library**: Material-UI (MUI)
- **Payment Processing**: Stripe Elements
- **Styling**: Material-UI + Custom CSS
- **Animation**: Framer Motion
- **Form Handling**: Custom hooks + validation
- **HTTP Client**: Fetch API with custom service layer
