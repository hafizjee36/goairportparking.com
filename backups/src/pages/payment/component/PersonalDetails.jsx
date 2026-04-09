// components/PaymentForm/PersonalDetails.js
import React from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  FormLabel,
  FormHelperText,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import CustomInput from "../../../components/reusable/CustomInput";

import theme from "../../../theme/index";
import { useBookingForm } from "../../../hooks/useBookingForm";
import { validateEmail, validatePhone } from "../../../utils/validateBookingForm";

// ✨ animation imports
import AnimateOnScroll from "../../../components/reusable/AnimateOnScroll";
import {
  EASE_SOFT,
  THRESHOLD,
  ROOT_MARGIN,
  smoothStyle,
} from "../../../components/utils/animation";
import CustomPhoneInput from "../../../components/reusable/CustomPhoneInput";

const BASE = 60;
const STEP = 90;

const PersonalDetails = () => {
  const {
    personalData,
    updatePersonal,
    getFieldError,
    hasFieldError,
    validation
  } = useBookingForm();

  const validateName = (name) => name.trim().length >= 2;

  const [searchParams] = useSearchParams();
  const getAirport = searchParams.get("airport");

  const titles = [
    { value: 'Mr', label: 'Mr' },
    { value: 'Mrs', label: 'Mrs' },
    { value: 'Miss', label: 'Miss' },
    { value: 'Ms', label: 'Ms' },
    { value: 'Dr', label: 'Dr' },
    { value: 'Prof', label: 'Prof' },
  ];

  return (
    <AnimateOnScroll
      type="slide-up"
      distance={18}
      duration={720}
      delay={BASE}
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
          p: 3,
          mb: 3,
          borderRadius: 3,
          border: "1px solid #F4F5F5",
          backgroundColor: theme.palette.background.paper,
        }}
      >
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
            Your details
          </Typography>
        </AnimateOnScroll>

        <Grid container spacing={2}>
          {/* Title */}
          <Grid size={{ xs: 12, md: 3 }}>
            <AnimateOnScroll
              type="slide-up"
              distance={14}
              duration={700}
              delay={BASE}
              easingTransform={EASE_SOFT}
              easingOpacity={EASE_SOFT}
              threshold={THRESHOLD}
              rootMargin={ROOT_MARGIN}
              once
              style={smoothStyle}
            >
              <FormControl fullWidth required error={hasFieldError('title')}>
                <FormLabel sx={{ mb: 1 }}>Title</FormLabel>
                <Select
                  value={personalData.title || ''}
                  onChange={(e) => updatePersonal('title', e.target.value)}
                  displayEmpty
                  sx={{ 
                    borderRadius: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                >
                  <MenuItem value="" disabled>Select title</MenuItem>
                  {titles.map((title) => (
                    <MenuItem key={title.value} value={title.value}>
                      {title.label}
                    </MenuItem>
                  ))}
                </Select>
                {hasFieldError('title') && (
                  <FormHelperText>{getFieldError('title')}</FormHelperText>
                )}
              </FormControl>
            </AnimateOnScroll>
          </Grid>

          {/* First Name */}
          <Grid size={{ xs: 12, md: 4.5 }}>
            <AnimateOnScroll
              type="slide-up"
              distance={14}
              duration={700}
              delay={BASE + STEP * 0}
              easingTransform={EASE_SOFT}
              easingOpacity={EASE_SOFT}
              threshold={THRESHOLD}
              rootMargin={ROOT_MARGIN}
              once
              style={smoothStyle}
            >
              <CustomInput
                label="First name"
                required
                value={personalData.firstName}
                onChange={(val) => updatePersonal("firstName", val)}
                placeholder="Enter your first name"
                validation={validateName}
                helperText={getFieldError('firstName')}
                externalError={hasFieldError('firstName')}
                adornment={<PersonIcon />}
                adornmentPosition="left"
              />
            </AnimateOnScroll>
          </Grid>

          {/* Last Name */}
          <Grid size={{ xs: 12, md: 4.5 }}>
            <AnimateOnScroll
              type="slide-up"
              distance={14}
              duration={700}
              delay={BASE + STEP * 0 + 70}
              easingTransform={EASE_SOFT}
              easingOpacity={EASE_SOFT}
              threshold={THRESHOLD}
              rootMargin={ROOT_MARGIN}
              once
              style={smoothStyle}
            >
              <CustomInput
                label="Last name"
                required
                value={personalData.lastName}
                onChange={(val) => updatePersonal("lastName", val)}
                placeholder="Enter your last name"
                validation={validateName}
                helperText={getFieldError('lastName')}
                externalError={hasFieldError('lastName')}
                adornment={<PersonIcon />}
                adornmentPosition="left"
              />
            </AnimateOnScroll>
          </Grid>

          {/* Email & Confirm Email */}
          <Grid size={{ xs: 12, md: 6 }}>
            <AnimateOnScroll
              type="slide-up"
              distance={14}
              duration={700}
              delay={BASE + STEP * 1}
              easingTransform={EASE_SOFT}
              easingOpacity={EASE_SOFT}
              threshold={THRESHOLD}
              rootMargin={ROOT_MARGIN}
              once
              style={smoothStyle}
            >
              <CustomInput
                label="Email Address"
                required
                value={personalData.email}
                onChange={(val) => updatePersonal("email", val)}
                placeholder="Enter your email"
                adornment={<EmailIcon />}
                adornmentPosition="right"
                type="email"
                validation={validateEmail}
                helperText={getFieldError('email')}
                externalError={hasFieldError('email')}
              />
            </AnimateOnScroll>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <AnimateOnScroll
              type="slide-up"
              distance={14}
              duration={700}
              delay={BASE + STEP * 1 + 70}
              easingTransform={EASE_SOFT}
              easingOpacity={EASE_SOFT}
              threshold={THRESHOLD}
              rootMargin={ROOT_MARGIN}
              once
              style={smoothStyle}
            >
              <CustomInput
                label="Confirm Email"
                required
                value={personalData.confirmEmail}
                onChange={(val) => updatePersonal("confirmEmail", val)}
                placeholder="Confirm your email"
                helperText={getFieldError('confirmEmail')}
                externalError={hasFieldError('confirmEmail')}
              />
            </AnimateOnScroll>
          </Grid>

          {/* Phone & Inbound flight */}
          <Grid size={{ xs: 12, md: 6 }}>
            <AnimateOnScroll
              type="slide-up"
              distance={14}
              duration={700}
              delay={BASE + STEP * 2}
              easingTransform={EASE_SOFT}
              easingOpacity={EASE_SOFT}
              threshold={THRESHOLD}
              rootMargin={ROOT_MARGIN}
              once
              style={smoothStyle}
            >
              <CustomPhoneInput
                label="Phone"
                required
                value={personalData.phone}
                onChange={(val) => updatePersonal("phone", val)}
                defaultCountry={getAirport == "DXB"? "AED":"GB"}
                fullWidth
                showError
                externalError={hasFieldError('phone')}
                helperText={getFieldError('phone') || ""}
                placeholder="1234567890"
              />
            </AnimateOnScroll>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <AnimateOnScroll
              type="slide-up"
              distance={14}
              duration={700}
              delay={BASE + STEP * 2 + 70}
              easingTransform={EASE_SOFT}
              easingOpacity={EASE_SOFT}
              threshold={THRESHOLD}
              rootMargin={ROOT_MARGIN}
              once
              style={smoothStyle}
            >
              <CustomInput
                label="Inbound flight"
                value={personalData.inboundFlight}
                onChange={(val) => updatePersonal("inboundFlight", val)}
                placeholder="Enter inbound flight (optional)"
              />
            </AnimateOnScroll>
          </Grid>
        </Grid>
      </Box>
    </AnimateOnScroll>
  );
};

export default PersonalDetails;
