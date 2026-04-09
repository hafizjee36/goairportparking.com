// Custom hook for managing booking form state
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  updatePersonalData, 
  updateVehicleData, 
  updatePaymentData,
  updateBookingOptions,
  clearValidationError,
  setValidationErrors,
  clearAllValidationErrors,
  setFormStep
} from '../redux/slice/paymentSlice';
import validateBookingForm from '../utils/validateBookingForm';
import { calculateTotalPrice } from '../services/apiService';

export const useBookingForm = () => {
  const dispatch = useDispatch();
  
  const {
    personalData,
    vehicleData,
    paymentData,
    bookingOptions,
    validation
  } = useSelector((state) => state.payment);

  // Personal data handlers
  const updatePersonal = (field, value) => {
    dispatch(updatePersonalData({ field, value }));
    // Clear validation error when user starts typing
    if (validation.errors[field]) {
      dispatch(clearValidationError(field));
    }
  };

  // Vehicle data handlers
  const updateVehicle = (field, value) => {
    dispatch(updateVehicleData({ field, value }));
    // Clear validation error when user starts typing
    if (validation.errors[field]) {
      dispatch(clearValidationError(field));
    }
  };

  // Payment data handlers
  const updatePayment = (field, value) => {
    dispatch(updatePaymentData({ field, value }));
    // Clear validation error when user starts typing
    if (validation.errors[field]) {
      dispatch(clearValidationError(field));
    }
  };

  // Booking options handlers
  const updateBooking = (field, value) => {
    dispatch(updateBookingOptions({ field, value }));
  };

  // Get error for specific field
  const getFieldError = (field) => {
    return validation.errors[field];
  };

  // Check if field has error
  const hasFieldError = (field) => {
    return !!validation.errors[field];
  };

  // Validate entire form
  const validateForm = useCallback(() => {
    const validationResult = validateBookingForm(
      personalData,
      vehicleData,
      bookingOptions.agreeToTerms
    );
    
    if (validationResult.state === 'error') {
      const errorMap = {};
      validationResult.errors.forEach(error => {
        errorMap[error.label] = error.message;
      });
      dispatch(setValidationErrors(errorMap));
      return false;
    }
    
    dispatch(clearAllValidationErrors());
    return true;
  }, [personalData, vehicleData, bookingOptions.agreeToTerms, dispatch]);

  // Calculate total booking cost
  const calculateTotal = useCallback(() => {
    const { selectedProduct, basePrice } = bookingOptions;
    if (!selectedProduct || !basePrice) return 0;
    
    return calculateTotalPrice(
      selectedProduct,
      basePrice,
      bookingOptions.cancellationProtection,
      bookingOptions.smsUpdates
    );
  }, [bookingOptions]);

  // Get form completion status
  const getFormCompletion = useCallback(() => {
    const requiredPersonalFields = ['title', 'firstName', 'lastName', 'email', 'confirmEmail', 'phone'];
    const requiredVehicleFields = ['licensePlate'];
    
    const personalComplete = requiredPersonalFields.every(field => 
      personalData[field]?.trim()
    );
    const vehicleComplete = requiredVehicleFields.every(field => 
      vehicleData[field]?.trim()
    );
    const termsAccepted = bookingOptions.agreeToTerms;
    
    return {
      personal: personalComplete,
      vehicle: vehicleComplete,
      terms: termsAccepted,
      overall: personalComplete && vehicleComplete && termsAccepted
    };
  }, [personalData, vehicleData, bookingOptions.agreeToTerms]);

  // Reset form to initial state
  const resetForm = useCallback(() => {
    dispatch(clearAllValidationErrors());
    // Reset form data would need additional actions in slice
  }, [dispatch]);

  // Navigate between form steps
  const goToStep = useCallback((step) => {
    dispatch(setFormStep(step));
  }, [dispatch]);

  // Get current totals breakdown
  const getTotalsBreakdown = useCallback(() => {
    const { selectedProduct, basePrice } = bookingOptions;
    if (!selectedProduct || !basePrice) {
      return {
        basePrice: 0,
        adminCharges: 0,
        cancellationCharges: 0,
        smsCharges: 0,
        total: 0
      };
    }
    
    const adminCharges = selectedProduct?.payment
      ? parseFloat(selectedProduct?.payment?.admin_charges || 0)
      : parseFloat(selectedProduct?.admin_charges || 0);
      
    let cancellationCharges = 0;
    if (bookingOptions.cancellationProtection) {
      cancellationCharges = selectedProduct?.payment
        ? parseFloat(selectedProduct?.payment?.cancellation_charges || 0)
        : parseFloat(selectedProduct?.cancellation_charges || 0);
    }
    
    let smsCharges = 0;
    if (bookingOptions.smsUpdates) {
      smsCharges = selectedProduct?.payment
        ? parseFloat(selectedProduct?.payment?.sms_charges || 0)
        : parseFloat(selectedProduct?.sms_charges || 0);
    }
    
    const total = basePrice + adminCharges + cancellationCharges + smsCharges;
    
    return {
      basePrice,
      adminCharges,
      cancellationCharges,
      smsCharges,
      total
    };
  }, [bookingOptions]);

  return {
    // Data
    personalData,
    vehicleData,
    paymentData,
    bookingOptions,
    validation,
    
    // Handlers
    updatePersonal,
    updateVehicle,
    updatePayment,
    updateBooking,
    
    // Validation helpers
    getFieldError,
    hasFieldError,
    validateForm,
    
    // Form utilities
    calculateTotal,
    getFormCompletion,
    resetForm,
    goToStep,
    getTotalsBreakdown
  };
};
