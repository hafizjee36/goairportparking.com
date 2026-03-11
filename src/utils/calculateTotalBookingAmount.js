/**
 * Calculate total booking amount from booking details
 * Adapted from budget-react-app for the MUI-based project
 */

export default function calculateTotalBookingAmount(bookingDetails) {
  if (!bookingDetails || !Array.isArray(bookingDetails) || bookingDetails.length === 0) {
    return 0;
  }

  let total = 0;

  bookingDetails.forEach((booking) => {
    // Base amount
    if (booking.amount) {
      total += parseFloat(booking.amount);
    }

    // Admin charges
    if (booking.admin_charges) {
      total += parseFloat(booking.admin_charges);
    }

    // Cancellation charges (if applicable)
    if (booking.cancellation_status === "1" && booking.cancellation_charges) {
      total += parseFloat(booking.cancellation_charges);
    }

    // SMS charges (if applicable)
    if (booking.sms_confirmation === "1" && booking.sms_charges) {
      total += parseFloat(booking.sms_charges);
    }

    // Handle discount (subtract from total)
    if (booking.discount_amount) {
      total -= parseFloat(booking.discount_amount);
    }
  });

  return Math.max(0, total); // Ensure total is never negative
}

/**
 * Calculate price breakdown for a single product
 * Updated to handle new API response structure from single product endpoint
 * FIXED: total now = subtotal (no discount subtraction, as discount is pre-applied in basePrice)
 */
export function calculateProductPrice(product, quantity = 1, options = {}) {
  if (!product) return { total: 0, breakdown: {} };

  const {
    cancellation = false,
    sms = false,
  } = options;

  let basePrice = 0;
  let adminCharges = 0;
  let cancellationCharges = 0;
  let smsCharges = 0;
  let extraAmount = 0; // legacy/show_extra_amount or extraAmount
  let extraCharges = 0; // payment.extra_charges or product.extra_charges
  let levyCharges = 0;  // payment.levy_charges or product.levy_charges
  let discount = 0;

  // Base price - handle both old and new API structure
  if (product.payment?.amount) {
    basePrice = parseFloat(product.payment.amount) * quantity;
  } else if (product.price) {
    basePrice = parseFloat(product.price) * quantity;
  }

  // Admin charges - handle both old and new API structure
  if (product.payment?.admin_charges) {
    adminCharges = parseFloat(product.payment.admin_charges);
  } else if (product.admin_charges) {
    adminCharges = parseFloat(product.admin_charges);
  }

  // Extra amount (new API field)
  if (product.show_extra_amount) {
    extraAmount = parseFloat(product.show_extra_amount);
  } else if (product.extraAmount) {
    extraAmount = parseFloat(product.extraAmount);
  }
  // Extra/levy charges from payment or product
  if (product.payment?.extra_charges) {
    extraCharges = parseFloat(product.payment.extra_charges);
  } else if (product.extra_charges) {
    extraCharges = parseFloat(product.extra_charges);
  }
  if (product.payment?.levy_charges) {
    levyCharges = parseFloat(product.payment.levy_charges);
  } else if (product.levy_charges) {
    levyCharges = parseFloat(product.levy_charges);
  }

  // Cancellation charges
  if (cancellation) {
    if (product.payment?.cancellation_charges) {
      cancellationCharges = parseFloat(product.payment.cancellation_charges);
    } else if (product.cancellation_charges) {
      cancellationCharges = parseFloat(product.cancellation_charges);
    }
  }

  // SMS charges
  if (sms) {
    if (product.payment?.sms_charges) {
      smsCharges = parseFloat(product.payment.sms_charges);
    } else if (product.sms_charges) {
      smsCharges = parseFloat(product.sms_charges);
    }
  }

  // Discount - handle both old and new API structure (kept for reference/display, but NOT subtracted)
  if (product.payment?.discount) {
    discount = parseFloat(product.payment.discount);
  } else if (product.discount) {
    discount = parseFloat(product.discount);
  }

  const subtotal = basePrice + adminCharges + extraAmount + extraCharges + levyCharges + cancellationCharges + smsCharges;
  const total = subtotal; // No discount subtraction - discount is pre-applied in amount


  return {
    total,
    breakdown: {
      basePrice,
      adminCharges,
      extraAmount,
      extraCharges,
      levyCharges,
      cancellationCharges,
      smsCharges,
      discount,
      subtotal,
    }
  };
}

/**
 * Format price for display
 */
export function formatPrice(amount, currency = "£") {
  if (typeof amount !== 'number') {
    amount = parseFloat(amount) || 0;
  }
  return `${currency}${amount.toFixed(2)}`;
}
