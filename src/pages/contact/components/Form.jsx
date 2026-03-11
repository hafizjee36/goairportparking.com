// src/pages/Contact/Form.jsx
import React, { useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@mui/material";

// shared animation utils

import AnimateOnScroll from "../../../components/reusable/AnimateOnScroll";
import CustomInput from "../../../components/reusable/CustomInput";
import CustomPhoneInput from "../../../components/reusable/CustomPhoneInput";
import CustomButton from "../../../components/reusable/CustomButton";
import theme from "../../../theme";
import { EASE_SOFT, ROOT_MARGIN, smoothStyle, THRESHOLD } from "../../../components/utils/animation";

const BASE = 80;
const STEP = 90;

const enquiryTypes = [
  "General Enquiry",
  "Booking Information",
  "Pricing",
  "Support",
  "Partnership",
  "Other",
];

const validateEmail = (email) => {
  const EMAIL_RE =
    /^(?!.*\.\.)[A-Za-z0-9](?:[A-Za-z0-9._%+-]*[A-Za-z0-9])?@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/i;
  return EMAIL_RE.test(String(email).trim());
};
const validateName = (name) => name.trim().length >= 2;
const validateEnquiry = (enquiry) => enquiry.trim().length >= 10;

export default function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    enquiryType: "",
    enquiry: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (hasAttemptedSubmit && errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    else if (!/^[A-Za-z]+$/.test(formData.firstName.trim()))
      newErrors.firstName = "First name can only contain letters";
    else if (formData.firstName.trim().length < 2)
      newErrors.firstName = "First name must be at least 2 characters";

    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    else if (!/^[A-Za-z]+$/.test(formData.lastName.trim()))
      newErrors.lastName = "Last name can only contain letters";
    else if (formData.lastName.trim().length < 2)
      newErrors.lastName = "Last name must be at least 2 characters";

    if (!formData.email.trim()) newErrors.email = "Email address is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Please enter a valid email address";

    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";

    if (!formData.enquiryType)
      newErrors.enquiryType = "Please select an enquiry type";

    if (!formData.enquiry.trim())
      newErrors.enquiry = "Please enter your enquiry";
    else if (!validateEnquiry(formData.enquiry))
      newErrors.enquiry = "Enquiry must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setHasAttemptedSubmit(true);

    if (validateForm()) {
      try {
        console.log("Form Data:", formData);
        alert("Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          enquiryType: "",
          enquiry: "",
        });
        setErrors({});
        setHasAttemptedSubmit(false);
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Error sending message. Please try again.");
      }
    }

    setIsSubmitting(false);
  };

  return (
    <AnimateOnScroll
      type="zoom-in"
      duration={900}
      delay={40}
      easingTransform={EASE_SOFT}
      easingOpacity={EASE_SOFT}
      threshold={THRESHOLD}
      rootMargin={ROOT_MARGIN}
      once
      style={smoothStyle}
    >
      <Box
        sx={{
          p: 4,
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
          willChange: "transform, opacity",
          transform: "translateZ(0)",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          Get In Touch
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            {/* First Name */}
            <Grid size={{ xs: 12, md: 6 }}>
              <AnimateOnScroll
                type="slide-up"
                distance={16}
                duration={720}
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
                  value={formData.firstName}
                  placeholder="Enter your first name"
                  validation={validateName}
                  onChange={(value) => handleInputChange("firstName", value)}
                  required
                  helperText={errors.firstName}
                  externalError={Boolean(errors.firstName)}
                />
              </AnimateOnScroll>
            </Grid>

            {/* Last Name */}
            <Grid size={{ xs: 12, md: 6 }}>
              <AnimateOnScroll
                type="slide-up"
                distance={16}
                duration={720}
                delay={BASE + STEP * 1}
                easingTransform={EASE_SOFT}
                easingOpacity={EASE_SOFT}
                threshold={THRESHOLD}
                rootMargin={ROOT_MARGIN}
                once
                style={smoothStyle}
              >
                <CustomInput
                  label="Last name"
                  value={formData.lastName}
                  placeholder="Enter your last name"
                  required
                  validation={validateName}
                  onChange={(value) => handleInputChange("lastName", value)}
                  helperText={errors.lastName}
                  externalError={Boolean(errors.lastName)}
                />
              </AnimateOnScroll>
            </Grid>

            {/* Email */}
            <Grid size={{ xs: 12 }}>
              <AnimateOnScroll
                type="slide-up"
                distance={16}
                duration={720}
                delay={BASE + STEP * 2}
                easingTransform={EASE_SOFT}
                easingOpacity={EASE_SOFT}
                threshold={THRESHOLD}
                rootMargin={ROOT_MARGIN}
                once
                style={smoothStyle}
              >
                <CustomInput
                  label="Email address"
                  value={formData.email}
                  placeholder="Enter your email address"
                  type="text"
                  required
                  validation={validateEmail}
                  onChange={(value) => handleInputChange("email", value)}
                  helperText={errors.email}
                  externalError={Boolean(errors.email)}
                />
              </AnimateOnScroll>
            </Grid>

            {/* Phone */}
            <Grid size={{ xs: 12 }}>
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
                style={smoothStyle}
              >
                <Box>
                  <CustomPhoneInput
                    label="Phone number"
                    value={formData.phoneNumber}
                    onChange={(v) => handleInputChange("phoneNumber", v)}
                    required
                    defaultCountry="GB"
                    clampToMax
                    externalError={Boolean(errors.phoneNumber)}
                    helperText={errors.phoneNumber}
                  />
                </Box>
              </AnimateOnScroll>
            </Grid>

            {/* Enquiry Type */}
            <Grid size={{ xs: 12 }}>
              <AnimateOnScroll
                type="slide-up"
                distance={16}
                duration={720}
                delay={BASE + STEP * 4}
                easingTransform={EASE_SOFT}
                easingOpacity={EASE_SOFT}
                threshold={THRESHOLD}
                rootMargin={ROOT_MARGIN}
                once
                style={smoothStyle}
              >
                <Box>
                  <Typography
                    sx={{ fontWeight: "450", fontSize: "16px", mb: 1 }}
                  >
                    Enquiry type
                    <Box component="span" sx={{ color: "red", ml: 0.5 }}>
                      *
                    </Box>
                  </Typography>
                  <FormControl fullWidth error={!!errors.enquiryType}>
                    <Select
                      value={formData.enquiryType}
                      onChange={(e) =>
                        handleInputChange("enquiryType", e.target.value)
                      }
                      displayEmpty
                      placeholder="Please select..."
                    >
                      <MenuItem value="" disabled>
                        Please select...
                      </MenuItem>
                      {enquiryTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.enquiryType && (
                      <FormHelperText>{errors.enquiryType}</FormHelperText>
                    )}
                  </FormControl>
                </Box>
              </AnimateOnScroll>
            </Grid>

            {/* Your Enquiry */}
            <Grid size={{ xs: 12 }}>
              <AnimateOnScroll
                type="slide-up"
                distance={16}
                duration={720}
                delay={BASE + STEP * 5}
                easingTransform={EASE_SOFT}
                easingOpacity={EASE_SOFT}
                threshold={THRESHOLD}
                rootMargin={ROOT_MARGIN}
                once
                style={smoothStyle}
              >
                <CustomInput
                  label="Your enquiry"
                  value={formData.enquiry}
                  placeholder="Please describe your enquiry..."
                  required
                  validation={validateEnquiry}
                  onChange={(value) => handleInputChange("enquiry", value)}
                  helperText={errors.enquiry}
                  externalError={Boolean(errors.enquiry)}
                  multiline
                  rows={4}
                />
              </AnimateOnScroll>
            </Grid>

            {/* Submit */}
            <Grid size={{ xs: 12 }}>
              <AnimateOnScroll
                type="fade"
                duration={680}
                delay={BASE + STEP * 6}
                easingTransform={EASE_SOFT}
                easingOpacity={EASE_SOFT}
                threshold={THRESHOLD}
                rootMargin={ROOT_MARGIN}
                once
                style={smoothStyle}
              >
                <CustomButton
                  type="submit"
                  variant="contained"
                  fullWidth
                  isLoading={isSubmitting}
                  loadingText="Sending..."
                >
                  Send Message
                </CustomButton>
              </AnimateOnScroll>
            </Grid>
          </Grid>
        </form>
      </Box>
    </AnimateOnScroll>
  );
}
