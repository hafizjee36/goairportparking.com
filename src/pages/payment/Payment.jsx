// pages/PaymentPage.js
import React, { useMemo, useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Grid, Alert, Typography } from "@mui/material";
import { baseProduct } from "../../assets/data";
import CustomStepper from "../../components/stepper/Stepper";
import PageWrapper from "../../components/reusable/PageWrapper";
import CustomButton from "../../components/reusable/CustomButton";

// Enhanced booking components from budget-react-app adaptation
import UserDetails from "../booking/components/UserDetails";
import TravelDetail from "../booking/components/TravelDetail";
import VehicleDetail from "../booking/components/VehicleDetail";
import Offer from "../booking/components/Offer";
import Confirm from "../booking/components/Confirm";
import BookingSummary from "../booking/components/BookingSummary";

import StripePay from "../../components/payment/StripePay";
import TrustPaymentForm from "../../components/payment/TrustPaymentForm";
import NetworkInternationalPay from "../../components/payment/NetworkInternationalPay";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from '@mui/material';
import OrderSummary from "./component/OrderSummary";
import theme from "../../theme/index";

import {
  setHasAttemptedSubmit,
  setPaymentSuccess,
  setPaymentError,
  clearBookingError,
  updateBookingTotals,
} from "../../redux/slice/paymentSlice";
import { selectSearchData, updateSearchField } from "../../redux/slice/searchSlice";
import { useBookingForm } from "../../hooks/useBookingForm";
import { useAirports } from "../../hooks/useAirports";
import { useWorldPay } from "../../services/worldpayService";
import { useBookingSync } from "../../hooks/useBookingSync";
import { calculateProductPrice } from "../../utils/calculateTotalBookingAmount";
import { fetchSingleProduct } from "../../services/productService";
import { setSelectedParking } from "../../redux/slice/paymentSlice";
import { toast } from 'react-toastify';

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Redux state
  const { personalData, bookingOptions, selectedParking, ui, validation } =
    useSelector((state) => state.payment);

  const searchData = useSelector(selectSearchData);

  // Component state (moved before hooks that use these states)
  const [basket, setBasket] = useState([]);
  const [airport, setAirport] = useState("Birmingham");
  const [paymentError, setPaymentErrorState] = useState("");
  const [vehicles, setVehicles] = useState([
    {
      make: "",
      model: "",
      color: "",
      reg_no: "",
    },
  ]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Hooks
  const {
    updatePersonal,
    updateBooking,
    getFieldError,
    hasFieldError,
    getTotalsBreakdown,
  } = useBookingForm();

  const { airports, loading: airportsLoading } = useAirports();

  const { loading: worldPayLoading, error: worldPayError } = useWorldPay();

  // Use only ONE booking sync hook - following reference pattern
  const {
    syncStatus,
    multimode,
    referenceNo,
    error: syncError,
    triggerSync,
    isLoading: syncLoading,
    isFormReady,
    handleSyncBooking,
  } = useBookingSync({
    personalData,
    vehicleData: vehicles,
    bookingOptions,
    selectedProduct: selectedProduct || selectedParking,
    searchData,
    enabled: false, // disable internal auto-sync; we'll control scheduling
  });

  const getAirport = searchParams.get("airport");
  const getDeparture = searchParams.get("departure");
  const getArrival = searchParams.get("arrival");
  const getPromocode = searchParams.get("promocode");
  const getSku = searchParams.get("sku");
  const getTrafficSource = searchParams.get("traffic_source");

  // Handle payment errors from URL params
  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      switch (error) {
        case "payment_failed":
          setPaymentErrorState("Payment failed. Please try again.");
          break;
        case "booking_failed":
          setPaymentErrorState("Booking creation failed. Please try again.");
          break;
        default:
          setPaymentErrorState("An error occurred. Please try again.");
      }
    }
  }, [searchParams]);

  // Capture traffic_source from URL and store in Redux
  useEffect(() => {
    if (getTrafficSource && getTrafficSource !== searchData.trafficSource) {
      dispatch(updateSearchField({ field: "trafficSource", value: getTrafficSource }));
      console.log('💳 Payment: Captured traffic_source from URL:', getTrafficSource);
    }
  }, [getTrafficSource, searchData.trafficSource, dispatch]);

  useMemo(() => {
    const fetchProduct = async () => {
      if (getSku) {
        try {
          if (getDeparture && getSku) {
            const response = await fetchSingleProduct({
              sku: getSku,
              departure: getDeparture,
              arrival: getArrival,
              airport: getAirport,
              discount_code: getPromocode || "",
            });

            if (response && response.data) {
              dispatch(setSelectedParking(response.data));
            }
          }
        } catch (error) {
          console.error("❌ Error fetching product:", error);
        }
      }
    };

    fetchProduct();
  }, [getAirport, getDeparture, getArrival, getPromocode, getSku]);

  // Phone typing suppression for store API
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [phoneLastTypedAt, setPhoneLastTypedAt] = useState(0);

  useEffect(() => {
    if (!isFormReady || syncStatus !== "initial") return;

    if (phoneFocused) return; // do not schedule while typing/focused

    const now = Date.now();
    const target = (phoneLastTypedAt || now) + 3000; // 3s after last typed
    const delay = Math.max(0, target - now);

    const t = setTimeout(() => {
      if (!phoneFocused && Date.now() - (phoneLastTypedAt || 0) >= 3000) {
        handleSyncBooking();
      }
    }, delay);

    return () => clearTimeout(t);
  }, [
    isFormReady,
    syncStatus,
    phoneFocused,
    phoneLastTypedAt,
    handleSyncBooking,
  ]);

  // Update totals when booking options change
  useEffect(() => {
    const totals = getTotalsBreakdown();
    dispatch(updateBookingTotals(totals));
  }, [bookingOptions, dispatch, getTotalsBreakdown]);

  // Remove the duplicate handleSubmit function as WorldPayForm handles this now

  const basketTotal = useMemo(
    () => basket.reduce((s, b) => s + b.price, 0),
    [basket]
  );

  const totalsBreakdown = useMemo(
    () => getTotalsBreakdown(),
    [getTotalsBreakdown]
  );

  // Calculate correct total amount using the same logic as BookingSummary
  const correctPricing = useMemo(() => {
    if (selectedProduct || selectedParking) {
      return calculateProductPrice(
        selectedProduct || selectedParking,
        vehicles.length,
        {
          cancellation: bookingOptions.cancellationProtection,
          sms: bookingOptions.smsUpdates,
        }
      );
    }
    return { total: baseProduct.price + baseProduct.bookingFee + basketTotal };
  }, [
    selectedProduct,
    selectedParking,
    vehicles.length,
    bookingOptions.cancellationProtection,
    bookingOptions.smsUpdates,
    baseProduct,
    basketTotal,
  ]);

  const orderTotal =
    correctPricing.total ||
    totalsBreakdown.total ||
    baseProduct.price + baseProduct.bookingFee + basketTotal;
  const [step, setStep] = useState(1);
  const initialGateway = getAirport === 'DXB' ? 'networkinternational' : (getAirport === 'DUB' ? 'stripe' : 'trustpayment');
  const [selectedGateway, setSelectedGateway] = useState(initialGateway); // 'stripe', 'trustpayment'
  useEffect(() => {
  if (step === 2) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}, [step]);
  return (
    <>
      <Box sx={{ backgroundColor: theme.palette.background.paper, py: 3 }}>
        <PageWrapper>
          <Box>
            <CustomStepper activeStep={3} />
          </Box>
        </PageWrapper>
      </Box>

      <Box sx={{ backgroundColor: theme.palette.background.default }}>
        <PageWrapper>
          <Box sx={{ py: 4 }}>
            {/* Error Display */}
            {(paymentError ||
              worldPayError ||
              ui.responseError ||
              syncError) && (
              <Alert
                severity="error"
                sx={{ mb: 3 }}
                onClose={() => {
                  setPaymentErrorState("");
                  dispatch(clearBookingError());
                }}
              >
                {paymentError || worldPayError || ui.responseError || syncError}
              </Alert>
            )}

            <Grid container spacing={4}>
              {/* Left Column - Enhanced Booking Form */}
              <Grid size={{ xs: 12, md: 8 }}>
                {/* STEP 1 – Additional Services */}
              {step === 1 && (
                <>
                {/* Enhanced User Details */}
                <UserDetails
                  personalData={personalData}
                  updatePersonal={updatePersonal}
                  getFieldError={getFieldError}
                  hasFieldError={hasFieldError}
                  hasAttemptedSubmit={validation.hasAttemptedSubmit}
                  onPhoneFocus={() => setPhoneFocused(true)}
                  onPhoneBlur={() => setPhoneFocused(false)}
                  onPhoneTyping={() => setPhoneLastTypedAt(Date.now())}
                />

                {/* Enhanced Travel Details */}
                <TravelDetail
                  personalData={personalData}
                  updatePersonal={updatePersonal}
                  getFieldError={getFieldError}
                  hasFieldError={hasFieldError}
                  hasAttemptedSubmit={validation.hasAttemptedSubmit}
                  airports={airports}
                  selectedAirport={getAirport}
                  selectedProduct={selectedParking}
                />

                {/* Enhanced Vehicle Details */}
                <VehicleDetail
                  vehicles={vehicles}
                  setVehicles={setVehicles}
                  getFieldError={getFieldError}
                  hasFieldError={hasFieldError}
                  hasAttemptedSubmit={validation.hasAttemptedSubmit}
                />

                {/* Enhanced Additional Services */}
                <Offer
                  bookingOptions={bookingOptions}
                  updateBooking={updateBooking}
                  selectedProduct={selectedProduct || selectedParking}
                />

                {/* Enhanced Terms & Conditions */}
                {/* <Confirm
                  bookingOptions={bookingOptions}
                  updateBooking={updateBooking}
                  selectedProduct={selectedProduct || selectedParking}
                  hasAttemptedSubmit={validation.hasAttemptedSubmit}
                  getFieldError={getFieldError}
                  hasFieldError={hasFieldError}
                  syncStatus={syncStatus}
                  referenceNo={referenceNo}
                  multimode={multimode}
                /> */}
                <CustomButton
                  customVariant="primary"
                  size="medium"
                  onClick={() => {
                      dispatch(setHasAttemptedSubmit(true));

                      const requiredPersonalFields = [
                        "firstName",
                        "lastName",
                        "email",
                        "phone",
                      ];

                      const personalComplete = requiredPersonalFields.every((field) => {
                        const value = personalData[field]?.trim();
                        return value;
                      });

                      console.log("📝 Validation result:", personalComplete);

                      if (!personalComplete) {
                         toast.error('Please complete all required fields before proceeding.', {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                theme: "colored",
                              });
                        return; // STOP here
                      }

                      console.log("✅ Validation passed");
                      setStep(2); // ✅ Move to next step ONLY if valid
                    }}
                  sx={{
                    fontSize: 15,
                    fontWeight: 500,
                    float: "right",
                  }}
                > Next → Payment
                </CustomButton>
                </>
              )}
              {/* STEP 2 – Payment */}
              {step === 2 && (
                <>
                {/* Stripe Payment Section */}
                {/* Gateway Selector */}
                {/* <FormControl component="fieldset" sx={{ mb: 3 }}>
                  <FormLabel component="legend">Choose Payment Gateway</FormLabel>
                  <RadioGroup
                    value={selectedGateway}
                    onChange={(e) => setSelectedGateway(e.target.value)}
                    row
                  >
                    <FormControlLabel value="stripe" control={<Radio />} label="Stripe (Card)" />
                    <FormControlLabel value="trustpayment" control={<Radio />} label="Trust Payments" />
                    <FormControlLabel value="networkinternational" control={<Radio />} label="Network International" />
                  </RadioGroup>
                </FormControl> */}

                {/* Payment Section */}
                <Box
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 3,
                    border: "1px solid #F4F5F5",
                    backgroundColor: theme.palette.background.paper,
                  }}
                >
                  {selectedGateway === 'stripe' ? (
                    <>
                    <StripePay
                      personalData={personalData}
                      vehicleData={vehicles}
                      bookingOptions={bookingOptions}
                      selectedProduct={selectedProduct || selectedParking}
                      searchData={searchData}
                      correctPricing={correctPricing}
                      airport={getAirport}
                      onValidate={() => {
                        dispatch(setHasAttemptedSubmit(true));
                        const requiredPersonalFields = [
                          "firstName",
                          "lastName",
                          "email",
                          "phone",
                        ];
                        const personalComplete = requiredPersonalFields.every(
                          (field) => {
                            const value = personalData[field]?.trim();
                            return value;
                          }
                        );
                        console.log(
                          "📝 Personal details validation result:",
                          personalComplete
                        );
                        if (!personalComplete) {
                          console.log(
                            "❌ Validation failed - missing required personal details"
                          );
                          return false;
                        }
                        console.log(
                          "✅ Validation passed - all required personal details present"
                        );
                        return true;
                      }}
                      onPaymentSuccess={(result) => {
                        console.log("✅ Stripe payment successful:", result);
                        dispatch(setPaymentSuccess(result));
                      }}
                      onPaymentError={(error) => {
                        console.error("❌ Stripe payment failed:", error);
                        dispatch(
                          setPaymentError(error.message || "Payment failed")
                        );
                      }}
                      onBookingSync={triggerSync}
                      multiModeReference={multimode}
                      referenceNo={referenceNo}
                      supplierCost={correctPricing.supplierCost || 0}
                      syncStatus={syncStatus}
                    />
                    </>
                  ) : selectedGateway === 'networkinternational' ? (
                    <NetworkInternationalPay
                      personalData={personalData}
                      vehicleData={vehicles}
                      bookingOptions={bookingOptions}
                      selectedProduct={selectedProduct || selectedParking}
                      searchData={searchData}
                      correctPricing={correctPricing}
                      airport={getAirport}
                      onValidate={() => {
                        dispatch(setHasAttemptedSubmit(true));
                        const requiredPersonalFields = [
                          "firstName",
                          "lastName",
                          "email",
                          "phone",
                        ];
                        const personalComplete = requiredPersonalFields.every(
                          (field) => {
                            const value = personalData[field]?.trim();
                            return value;
                          }
                        );
                        return personalComplete;
                      }}
                      onPaymentSuccess={(result) => {
                        console.log("✅ NetworkInternational payment successful:", result);
                        dispatch(setPaymentSuccess(result));
                      }}
                      onPaymentError={(error) => {
                        console.error("❌ NetworkInternational payment failed:", error);
                        dispatch(
                          setPaymentError(error.message || "Payment failed")
                        );
                      }}
                      onBookingSync={triggerSync}
                      multiModeReference={multimode}
                      referenceNo={referenceNo}
                      supplierCost={correctPricing.supplierCost || 0}
                      syncStatus={syncStatus}
                    />
                  ) : (
                    <TrustPaymentForm
                      personalData={personalData}
                      vehicleData={vehicles}
                      bookingOptions={bookingOptions}
                      selectedProduct={selectedProduct || selectedParking}
                      searchData={searchData}
                      totalAmount={correctPricing.total || orderTotal}
                      multimode={multimode}
                      referenceNo={referenceNo}
                      onValidate={() => {
                        dispatch(setHasAttemptedSubmit(true));
                        const requiredPersonalFields = [
                          "firstName",
                          "lastName",
                          "email",
                          "phone",
                        ];
                        const personalComplete = requiredPersonalFields.every(
                          (field) => personalData[field]?.trim()
                        );
                        return personalComplete;
                      }}
                      onBookingSync={triggerSync}
                      airport={getAirport}
                    />
                  )}
                </Box>
                <CustomButton
                  customVariant="primary"
                  size="medium"
                  onClick={() => setStep(1)}
                  sx={{
                    fontSize: 15,
                    fontWeight: 500,
                    float: "left",
                  }}
                >
                  ← Back to Details
                </CustomButton>
                </>
              )}
              </Grid>

              {/* Right Column - Enhanced Booking Summary */}
              <Grid size={{ xs: 12, md: 4 }}>
                {/* Enhanced Booking Summary */}
                {(selectedProduct || selectedParking) && (
                  <BookingSummary
                    selectedProduct={selectedProduct || selectedParking}
                    airports={airports}
                    bookingOptions={bookingOptions}
                    vehicles={vehicles}
                    searchData={searchData}
                  />
                )}

                {/* Fallback Order Summary */}
                {!(selectedProduct || selectedParking) && (
                  <OrderSummary
                    basketTotal={basketTotal}
                    orderTotal={orderTotal}
                    airport={airport}
                    totalsBreakdown={totalsBreakdown}
                    bookingOptions={bookingOptions}
                    selectedParking={selectedParking}
                  />
                )}
              </Grid>
            </Grid>
          </Box>
        </PageWrapper>
      </Box>
    </>
  );
};

export default PaymentPage;
