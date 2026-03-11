// components/PaymentForm/PaymentSection.js
import React, { useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import CustomInput from "../../../components/reusable/CustomInput";
import CustomButton from "../../../components/reusable/CustomButton";

import discover from "../../../assets/optimized/discover.webp";
import masterCard from "../../../assets/optimized/mastercard.webp";
import visa from "../../../assets/optimized/visa.webp";
import amex from "../../../assets/optimized/amex.webp";
import {
  updatePaymentData,
  updatePersonalData,
} from "../../../redux/slice/paymentSlice";
import { currencies } from "../../../assets/data";

// ✨ animations
import AnimateOnScroll from "../../../components/reusable/AnimateOnScroll";
import {
  EASE_SOFT,
  THRESHOLD,
  ROOT_MARGIN,
  smoothStyle,
} from "../../../components/utils/animation";
import theme from "../../../theme";

const BASE = 80; // a touch slower to avoid “popping in”
const STEP = 100;

const PaymentSection = () => {
  const dispatch = useDispatch();
  const { paymentData, personalData, errors } = useSelector(
    (state) => state.payment
  );

  // Extract country names from currencies and sort them alphabetically
  const countryOptions = useMemo(() => {
    return currencies
      .map((currency) => currency.name)
      .sort()
      .filter((name, index, arr) => arr.indexOf(name) === index);
  }, []);

  const validateEmail = (email) =>
    /^(?!.*\.\.)[A-Za-z0-9](?:[A-Za-z0-9._%+-]*[A-Za-z0-9])?@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/.test(
      email
    );

  const validateCardNumber = (cardNumber) =>
    /^\d{16}$/.test(cardNumber.replace(/\s/g, ""));

  const validateExpiry = (expiry) => {
    if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiry)) return false;
    const [m, y] = expiry.split("/");
    const month = parseInt(m, 10);
    const year = parseInt(y, 10);
    const now = new Date();
    const cy = now.getFullYear() % 100;
    const cm = now.getMonth() + 1;
    return year > cy || (year === cy && month >= cm);
  };

  const validateCVC = (cvc) => /^\d{3}$/.test(cvc);

  const formatCardNumber = (value) => {
    const numeric = value.replace(/\D/g, "").slice(0, 16);
    return numeric.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = useCallback((value, prevValue = "") => {
    const numeric = value.replace(/\D/g, "");
    if (value.length < prevValue.length) {
      if (prevValue.includes("/") && value.length === 2 && numeric.length === 2)
        return numeric;
      if (prevValue.length === 5 && value.includes("/") && value.length === 3)
        return numeric.slice(0, 2);
      if (prevValue.includes("/") && !value.includes("/") && numeric.length < 2)
        return numeric;
    }
    let limited = numeric.slice(0, 4);
    if (limited.length >= 1) {
      const first = limited[0];
      if (first !== "0" && first !== "1") limited = "0" + first;
    }
    if (limited.length >= 2) {
      const mm = parseInt(limited.slice(0, 2), 10);
      if (mm === 0) limited = "01" + limited.slice(2);
      else if (mm > 12) limited = "12" + limited.slice(2);
    }
    return limited.length >= 2
      ? `${limited.slice(0, 2)}/${limited.slice(2)}`
      : limited;
  }, []);

  const formatCVC = (value) => value.replace(/\D/g, "").slice(0, 3);

  const handleChange = (field, value) => {
    dispatch(updatePaymentData({ field, value }));
  };

  const handleCardNumberChange = (value) => {
    dispatch(
      updatePaymentData({ field: "cardNumber", value: formatCardNumber(value) })
    );
  };

  const handleExpiryChange = useCallback(
    (value) => {
      dispatch(
        updatePaymentData({
          field: "expiry",
          value: formatExpiry(value, paymentData.expiry),
        })
      );
    },
    [formatExpiry, dispatch, paymentData.expiry]
  );

  const handleCVCChange = (value) => {
    dispatch(updatePaymentData({ field: "cvc", value: formatCVC(value) }));
  };

  const handleEmailChange = (field, value) => {
    dispatch(updatePersonalData({ field, value }));
  };

  return (
    <>
      {/* Section heading */}
      <AnimateOnScroll
        type="fade"
        duration={680}
        delay={BASE}
        easingTransform={EASE_SOFT}
        easingOpacity={EASE_SOFT}
        threshold={THRESHOLD}
        rootMargin={ROOT_MARGIN}
        once
        as="header"
        style={smoothStyle}
      >
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Payment
        </Typography>
    
      </AnimateOnScroll>

      {/* Stripe Payment Section */}
      <AnimateOnScroll
        type="slide-up"
        distance={18}
        duration={740}
        delay={BASE + STEP * 2}
        easingTransform={EASE_SOFT}
        easingOpacity={EASE_SOFT}
        threshold={THRESHOLD}
        rootMargin={ROOT_MARGIN}
        once
        as="section"
        style={smoothStyle}
      >
        <Box
          sx={{
            background: "#F9F9F9",
            p: 3,
            borderRadius: 2,
            mb: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 2,
            }}
          >
            <GppGoodOutlinedIcon sx={{ fontSize: 20, color: "primary.main" }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Secure Payment with Stripe
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{ mb: 3, lineHeight: 1.5, color: "#A6A6A6" }}
          >
            Your payment will be processed securely through Stripe. We support all major credit and debit cards with 3D Secure authentication.
          </Typography>
        </Box>
      </AnimateOnScroll>
      
      {/* WorldPay Payment Section - Temporarily Disabled */}
      {/* <AnimateOnScroll
        type="slide-up"
        distance={18}
        duration={740}
        delay={BASE + STEP * 2}
        easingTransform={EASE_SOFT}
        easingOpacity={EASE_SOFT}
        threshold={THRESHOLD}
        rootMargin={ROOT_MARGIN}
        once
        as="section"
        style={smoothStyle}
      >
        <Box
          sx={{
            background: "#F9F9F9",
            p: 3,
            borderRadius: 2,
            mb: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 2,
            }}
          >
            <GppGoodOutlinedIcon sx={{ fontSize: 20, color: "primary.main" }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Secure Payment with WorldPay
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{ mb: 3, lineHeight: 1.5, color: "#A6A6A6" }}
          >
            Your payment will be processed securely through WorldPay. Click the button below to proceed to payment.
          </Typography>
        </Box>
      </AnimateOnScroll> */}

      {/* Commented out Stripe Elements */}
      {/* 
      <AnimateOnScroll
        type="slide-up"
        distance={18}
        duration={740}
        delay={BASE + STEP * 2}
        easingTransform={EASE_SOFT}
        easingOpacity={EASE_SOFT}
        threshold={THRESHOLD}
        rootMargin={ROOT_MARGIN}
        once
        as="section"
        style={smoothStyle}
      >
        <Box
          sx={{
            background: "#F9F9F9",
            p: 3,
            borderRadius: 2,
            mb: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 2,
            }}
          >
            <GppGoodOutlinedIcon sx={{ fontSize: 20, color: "primary.main" }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Secure, fast checkout with Link
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{ mb: 3, lineHeight: 1.5, color: "#A6A6A6" }}
          >
            Securely pay with your saved info, or create a Link account for
            faster checkout next time.
          </Typography>

          <CustomInput
            value={personalData.email}
            placeholder="Enter your email"
            type="email"
            required
            validation={validateEmail}
            onChange={(val) => handleEmailChange("email", val)}
            // helperText={errors.email}
            // externalError={Boolean(errors.email)}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
                borderRadius: 1,
                "& fieldset": { border: "1px solid #e0e0e0" },
                "&:hover fieldset": { border: "1px solid #cccccc" },
                "&.Mui-focused fieldset": { border: "2px solid #2e7d32" },
              },
              "& .MuiInputBase-input": {
                padding: "12px 14px",
                fontSize: "14px",
                color: "black",
              },
              "& .MuiFormHelperText-root": { color: "#ffcdd2" },
            }}
          />
        </Box>
      </AnimateOnScroll>

      <AnimateOnScroll
        type="slide-up"
        distance={16}
        duration={720}
        delay={BASE + STEP * 3}
        easingTransform={EASE_SOFT}
        easingOpacity={EASE_SOFT}
        threshold={THRESHOLD}
        rootMargin={ROOT_MARGIN}
        once
        as="section"
        style={smoothStyle}
      >
        <Box sx={{ mb: 0, pb: 0 }}>
          <Grid container spacing={1}>
            <Grid size={{ xs: 12 }}>
              <CustomInput
                label="Card Information"
                required
                placeholder="1234 1234 1234 1234"
                value={paymentData.cardNumber}
                onChange={handleCardNumberChange}
                validation={validateCardNumber}
                // helperText={errors.cardNumber}
                // externalError={Boolean(errors.cardNumber)}
                adornment={
                  <Box
                    sx={{
                      display: { xs: "none", sm: "block" },
                      gap: 0.5,
                      alignItems: "center",
                    }}
                  >
                    <Box
                      component="img"
                      src={visa}
                      alt="Visa"
                      sx={{ height: 20 }}
                    />
                    <Box
                      component="img"
                      src={masterCard}
                      alt="Mastercard"
                      sx={{ height: 20 }}
                    />
                    <Box
                      component="img"
                      src={amex}
                      alt="American Express"
                      sx={{ height: 20 }}
                    />
                    <Box
                      component="img"
                      src={discover}
                      alt="Discover"
                      sx={{ height: 20 }}
                    />
                  </Box>
                }
                adornmentPosition="right"
              />
            </Grid>

            <Grid size={{ xs: 6 }}>
              <CustomInput
                label="Expiry Date"
                placeholder="MM/YY"
                value={paymentData.expiry}
                onChange={handleExpiryChange}
                validation={validateExpiry}
                // helperText={errors.expiry}
                // externalError={Boolean(errors.expiry)}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <CustomInput
                label="CVV"
                placeholder="123"
                value={paymentData.cvc}
                onChange={handleCVCChange}
                validation={validateCVC}
                // helperText={errors.cvc}
                // externalError={Boolean(errors.cvc)}
              />
            </Grid>
          </Grid>
        </Box>
      </AnimateOnScroll>

      <AnimateOnScroll
        type="slide-up"
        distance={14}
        duration={700}
        delay={BASE + STEP * 4}
        easingTransform={EASE_SOFT}
        easingOpacity={EASE_SOFT}
        threshold={THRESHOLD}
        rootMargin={ROOT_MARGIN}
        once
        style={smoothStyle}
      >
        <Box sx={{ mt: 2 }}>
          <Typography sx={{ fontWeight: "450", fontSize: "16px", mb: 1 }}>
            Country
          </Typography>
          <FormControl fullWidth>
            <Select
              value={paymentData.country}
              onChange={(e) => handleChange("country", e.target.value)}
              displayEmpty
              sx={{
                backgroundColor: "white",
                "& .MuiSelect-select": {
                  color: paymentData.country ? "black" : "#999",
                },
              }}
            >
              <MenuItem value="" disabled>
                Select Country
              </MenuItem>
              {countryOptions.map((countryName) => (
                <MenuItem key={countryName} value={countryName}>
                  {countryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </AnimateOnScroll>
      */}


    </>
  );
};

export default PaymentSection;
