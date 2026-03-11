// redux/slice/paymentSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedParking: {
    id: null,
    name: "",
    category: "",
    price: 0,
    priceBeforeDiscount: 0,
    image: "",
    rating: 0,
    reviews: 0,
    features: [],
    airportCode: "",
    offer: null,
    adminCharges: 0,
    smsCharges: 0,
    extraAmount: 0,
  },
  personalData: {
    title: "Mr",
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    phone: "",
    inboundFlight: "",
    // Terminal and flight details
    departureTerminal: "",
    departureFlightNo: "",
    arrivalTerminal: "",
    arrivalFlightNo: "",
    numberOfPeople: 1,
  },
  vehicleData: {
    licensePlate: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleColor: "",
  },
  paymentData: {
    discountCode: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    country: "United Kingdom",
  },
  bookingOptions: {
    cancellationProtection: false,
    smsConfirmation: false,
    smsUpdates: false,
    agreeToTerms: false,
    selectedProduct: null,
    basePrice: 0,
    duration: 0,
    departureDate: null,
    returnDate: null,
  },
  bookingData: {
    referenceNo: "",
    multiModeReferenceNo: "",
    status: "initial",
    syncBookingState: "initial",
  },
  worldpay: {
    sessionId: "",
    redirectUrl: "",
    state: "initial", // initial, loading, success, processedButFailed, error
    bookingReference: "",
    multiModeReference: "",
    transactionId: "",
    responseError: "",
  },
  stripe: {
    clientSecret: "",
    paymentIntentId: "",
    paymentMethodId: "",
    state: "initial", // initial, loading, processing, succeeded, failed, error
    errorMessage: "",
    confirmationToken: "",
    isCreatingPaymentIntent: false,
    isProcessingPayment: false,
  },
  validation: {
    errors: {},
    hasAttemptedSubmit: false,
    agree: false,
  },
  ui: {
    isSubmitting: false,
    responseError: "",
    status: "",
  },
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    updatePersonalData: (state, action) => {
      const { field, value } = action.payload;
      // This should update the nested personalData object
      state.personalData[field] = value;

      // Clear error when user starts typing
      if (state.validation.hasAttemptedSubmit && state.validation.errors[field]) {
        delete state.validation.errors[field];
      }
    },
    updateVehicleData: (state, action) => {
      const { field, value } = action.payload;
      state.vehicleData[field] = value;

      if (state.validation.hasAttemptedSubmit && state.validation.errors[field]) {
        delete state.validation.errors[field];
      }
    },
    updatePaymentData: (state, action) => {
      const { field, value } = action.payload;
      state.paymentData[field] = value;

      if (state.validation.hasAttemptedSubmit && state.validation.errors[field]) {
        delete state.validation.errors[field];
      }
    },
    setErrors: (state, action) => {
      state.validation.errors = action.payload;
    },
    setSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    setSelectedParking: (state, action) => {
      state.selectedParking = action.payload;
    },
    updateBookingOptions: (state, action) => {
      const { field, value } = action.payload;
      state.bookingOptions[field] = value;
    },
    setBookingData: (state, action) => {
      state.bookingData = { ...state.bookingData, ...action.payload };
    },
    setWorldpayData: (state, action) => {
      state.worldpay = { ...state.worldpay, ...action.payload };
    },
    setValidationErrors: (state, action) => {
      state.validation.errors = action.payload;
    },
    setHasAttemptedSubmit: (state, action) => {
      state.validation.hasAttemptedSubmit = action.payload;
    },
    setAgree: (state, action) => {
      state.validation.agree = action.payload;
    },
    setUIState: (state, action) => {
      state.ui = { ...state.ui, ...action.payload };
    },
    clearValidationError: (state, action) => {
      const field = action.payload;
      if (state.validation.errors[field]) {
        delete state.validation.errors[field];
      }
    },
    resetForm: () => {
      return initialState;
    },
    clearAllValidationErrors: (state) => {
      state.validation.errors = {};
    },
    setFormStep: (state, action) => {
      state.ui.currentStep = action.payload;
    },
    setBookingConfirmation: (state, action) => {
      state.bookingData = {
        ...state.bookingData,
        ...action.payload,
        status: 'confirmed'
      };
    },
    setPaymentProcessing: (state, action) => {
      state.ui.isSubmitting = action.payload;
      if (action.payload) {
        state.ui.status = 'processing';
      }
    },
    setPaymentSuccess: (state, action) => {
      state.ui.isSubmitting = false;
      state.ui.status = 'success';
      state.bookingData.status = 'paid';
      if (action.payload) {
        state.bookingData = { ...state.bookingData, ...action.payload };
      }
    },
    setPaymentError: (state, action) => {
      state.ui.isSubmitting = false;
      state.ui.status = 'error';
      state.ui.responseError = action.payload;
    },
    updateBookingTotals: (state, action) => {
      const { basePrice, adminCharges, cancellationCharges, smsCharges, total } = action.payload;
      state.bookingOptions.basePrice = basePrice;
      state.selectedParking.adminCharges = adminCharges;
      state.selectedParking.cancellationCharges = cancellationCharges;
      state.selectedParking.smsCharges = smsCharges;
      state.selectedParking.totalPrice = total;
    },
    // Enhanced booking flow actions
    initializeBooking: (state, action) => {
      const { searchData, selectedProduct } = action.payload;
      state.bookingOptions = {
        ...state.bookingOptions,
        selectedProduct,
        departureDate: searchData?.departureDate,
        returnDate: searchData?.returnDate,
        duration: searchData?.duration,
        basePrice: searchData?.price || selectedProduct?.price || 0
      };
      state.selectedParking = {
        ...state.selectedParking,
        ...selectedProduct
      };
    },
    setBookingProgress: (state, action) => {
      const { step, completed = false } = action.payload;
      if (!state.ui.bookingProgress) {
        state.ui.bookingProgress = {};
      }
      state.ui.bookingProgress[step] = completed;
    },
    setPaymentMethod: (state, action) => {
      state.paymentData.paymentMethod = action.payload;
    },
    updateBookingPreferences: (state, action) => {
      const preferences = action.payload;
      state.bookingOptions = {
        ...state.bookingOptions,
        ...preferences
      };
    },
    setBookingInProgress: (state, action) => {
      state.ui.bookingInProgress = action.payload;
      if (action.payload) {
        state.ui.status = 'booking';
      }
    },
    setBookingError: (state, action) => {
      state.ui.bookingError = action.payload;
      state.ui.status = 'error';
      state.ui.bookingInProgress = false;
    },
    clearBookingError: (state) => {
      state.ui.bookingError = '';
      if (state.ui.status === 'error') {
        state.ui.status = '';
      }
    },
    setConfirmationDetails: (state, action) => {
      const { bookingReference, confirmationNumber, totalPaid, paymentMethod } = action.payload;
      state.bookingData = {
        ...state.bookingData,
        referenceNo: bookingReference,
        confirmationNumber,
        totalPaid,
        paymentMethod,
        status: 'confirmed',
        confirmedAt: new Date().toISOString()
      };
    },
    setValidationStep: (state, action) => {
      state.validation.currentStep = action.payload;
    },
    setTermsAcceptance: (state, action) => {
      state.validation.agree = action.payload;
      state.bookingOptions.agreeToTerms = action.payload;
    },
    updateNotificationPreferences: (state, action) => {
      const { email, sms } = action.payload;
      state.bookingOptions.emailNotifications = email;
      state.bookingOptions.smsUpdates = sms;
    },
    setParkingDetails: (state, action) => {
      const parkingDetails = action.payload;
      state.selectedParking = {
        ...state.selectedParking,
        ...parkingDetails
      };
    },
    setDiscountApplied: (state, action) => {
      const { discountCode, discountAmount, newTotal } = action.payload;
      state.paymentData.discountCode = discountCode;
      state.paymentData.discountAmount = discountAmount;
      state.selectedParking.discountedPrice = newTotal;
    },
    clearDiscount: (state) => {
      state.paymentData.discountCode = '';
      state.paymentData.discountAmount = 0;
      delete state.selectedParking.discountedPrice;
    },
    // Stripe-specific actions
    setStripeClientSecret: (state, action) => {
      state.stripe.clientSecret = action.payload;
      state.stripe.state = 'ready';
    },
    setStripePaymentIntent: (state, action) => {
      const { paymentIntentId, clientSecret } = action.payload;
      state.stripe.paymentIntentId = paymentIntentId;
      if (clientSecret) {
        state.stripe.clientSecret = clientSecret;
      }
    },
    setStripeLoading: (state, action) => {
      state.stripe.isCreatingPaymentIntent = action.payload;
      if (action.payload) {
        state.stripe.state = 'loading';
      }
    },
    setStripeProcessing: (state, action) => {
      state.stripe.isProcessingPayment = action.payload;
      if (action.payload) {
        state.stripe.state = 'processing';
        state.ui.isSubmitting = true;
      }
    },
    setStripeSuccess: (state, action) => {
      const { paymentIntentId, paymentMethodId, confirmationToken } = action.payload || {};
      state.stripe.state = 'succeeded';
      state.stripe.isProcessingPayment = false;
      state.ui.isSubmitting = false;
      state.ui.status = 'success';
      if (paymentIntentId) state.stripe.paymentIntentId = paymentIntentId;
      if (paymentMethodId) state.stripe.paymentMethodId = paymentMethodId;
      if (confirmationToken) state.stripe.confirmationToken = confirmationToken;
    },
    setStripeError: (state, action) => {
      state.stripe.state = 'error';
      state.stripe.errorMessage = action.payload;
      state.stripe.isProcessingPayment = false;
      state.stripe.isCreatingPaymentIntent = false;
      state.ui.isSubmitting = false;
      state.ui.status = 'error';
      state.ui.responseError = action.payload;
    },
    clearStripeError: (state) => {
      state.stripe.errorMessage = '';
      if (state.stripe.state === 'error') {
        state.stripe.state = state.stripe.clientSecret ? 'ready' : 'initial';
      }
    },
    resetStripeState: (state) => {
      state.stripe = {
        clientSecret: "",
        paymentIntentId: "",
        paymentMethodId: "",
        state: "initial",
        errorMessage: "",
        confirmationToken: "",
        isCreatingPaymentIntent: false,
        isProcessingPayment: false,
      };
    },
    setStripePaymentMethod: (state, action) => {
      state.stripe.paymentMethodId = action.payload;
    },
  },
});

export const {
  updatePersonalData,
  updateVehicleData,
  updatePaymentData,
  setErrors,
  setSubmitting,
  setSelectedParking,
  updateBookingOptions,
  setBookingData,
  setWorldpayData,
  setValidationErrors,
  setHasAttemptedSubmit,
  setAgree,
  setUIState,
  clearValidationError,
  clearAllValidationErrors,
  setFormStep,
  setBookingConfirmation,
  setPaymentProcessing,
  setPaymentSuccess,
  setPaymentError,
  updateBookingTotals,
  resetForm,
  // New booking actions
  initializeBooking,
  setBookingProgress,
  setPaymentMethod,
  updateBookingPreferences,
  setBookingInProgress,
  setBookingError,
  clearBookingError,
  setConfirmationDetails,
  setValidationStep,
  setTermsAcceptance,
  updateNotificationPreferences,
  setParkingDetails,
  setDiscountApplied,
  clearDiscount,
  // Stripe-specific actions
  setStripeClientSecret,
  setStripePaymentIntent,
  setStripeLoading,
  setStripeProcessing,
  setStripeSuccess,
  setStripeError,
  clearStripeError,
  resetStripeState,
  setStripePaymentMethod,
} = paymentSlice.actions;

export default paymentSlice.reducer;
