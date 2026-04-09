import React, { useState } from "react";
import { Grid, Typography, Box, Paper, Container } from "@mui/material";
import PageWrapper from "../../components/reusable/PageWrapper";
import HeroSection from "../../components/reusable/HeroSection";
import CustomInput from "../../components/reusable/CustomInput";
import CustomButton from "../../components/reusable/CustomButton";
import contactUs from "../../assets/optimized/ResendConfirmation.webp";
import ResendMan from "../../assets/optimized/ResendMan.webp";
import AnimateOnScroll from "../../components/reusable/AnimateOnScroll";

// shared animation utils
import {
  EASE_SOFT,
  THRESHOLD,
  ROOT_MARGIN,
  smoothStyle,
} from "../../components/utils/animation";
import theme from "../../theme";

const Resend = () => {
  const [formData, setFormData] = useState({
    bookingType: "",
    email: "",
    bookingRef: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  // Email validation function
  const validateEmail = (email) =>
    /^(?!.*\.\.)[A-Za-z0-9](?:[A-Za-z0-9._%+-]*[A-Za-z0-9])?@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/.test(
      email
    );

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (hasAttemptedSubmit && errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.bookingType.trim())
      newErrors.bookingType = "Booking type is required";
    if (!formData.email.trim()) newErrors.email = "Email address is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Please enter a valid email address";
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
        setFormData({ bookingType: "", email: "", bookingRef: "" });
        setErrors({});
        setHasAttemptedSubmit(false);
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Error sending message. Please try again.");
      }
    }

    setIsSubmitting(false);
  };

  // animation timing
  const BASE = 80; // initial delay
  const STEP = 90; // stagger per field

  return (
    <>
      <HeroSection
        title="Resend Confirmation"
        subtitle="Request a new booking confirmation if you haven't received one."
        image={contactUs}
      />

      <Box sx={{ backgroundColor: "#F9FBFC" }}>
        <PageWrapper>
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={4}>
              {/* Left: Form card */}
              <Grid size={{ xs: 12, md: 6 }}>
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
                    }}
                  >
                    <Typography
                      variant="h4"
                      component="h2"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      Resend Confirmation
                    </Typography>

                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={2}>
                        {/* Booking Type */}
                        <Grid size={{ xs: 12 }}>
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
                              label="Booking Type"
                              value={formData.bookingType}
                              placeholder="Enter your booking type"
                              onChange={(value) =>
                                handleInputChange("bookingType", value)
                              }
                              helperText={errors.bookingType}
                              externalError={Boolean(errors.bookingType)}
                            />
                          </AnimateOnScroll>
                        </Grid>

                        {/* Email */}
                        <Grid size={{ xs: 12 }}>
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
                              label="Email address"
                              value={formData.email}
                              placeholder="Enter your email address"
                              type="email"
                              star={true}
                              validation={validateEmail}
                              onChange={(value) =>
                                handleInputChange("email", value)
                              }
                              helperText={errors.email}
                              externalError={Boolean(errors.email)}
                            />
                          </AnimateOnScroll>
                        </Grid>

                        {/* Booking Reference (optional) */}
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
                              label="Your booking ref (optional)"
                              value={formData.bookingRef}
                              placeholder="Your booking ref"
                              onChange={(value) =>
                                handleInputChange("bookingRef", value)
                              }
                              helperText={errors.bookingRef}
                              externalError={Boolean(errors.bookingRef)}
                            />
                          </AnimateOnScroll>
                        </Grid>

                        {/* Submit Button */}
                        <Grid size={{ xs: 12 }}>
                          <AnimateOnScroll
                            type="fade"
                            duration={680}
                            delay={BASE + STEP * 3}
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
                              Resend Booking Confirmation
                            </CustomButton>
                          </AnimateOnScroll>

                          {/* Note */}
                          <AnimateOnScroll
                            type="fade"
                            duration={620}
                            delay={BASE + STEP * 3 + 80}
                            easingTransform={EASE_SOFT}
                            easingOpacity={EASE_SOFT}
                            threshold={THRESHOLD}
                            rootMargin={ROOT_MARGIN}
                            once
                            style={smoothStyle}
                          >
                            <Typography
                              variant="body2"
                              color="primary.main"
                              sx={{ mt: 1.25 }}
                            >
                              *If no booking ref is entered then your latest
                              booking details will be sent.
                            </Typography>
                          </AnimateOnScroll>
                        </Grid>
                      </Grid>
                    </form>
                  </Box>
                </AnimateOnScroll>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <AnimateOnScroll
                  type="slide-right"
                  distance={24}
                  duration={880}
                  delay={BASE + 40}
                  easingTransform={EASE_SOFT}
                  easingOpacity={EASE_SOFT}
                  threshold={THRESHOLD}
                  rootMargin={ROOT_MARGIN}
                  once
                  style={smoothStyle}
                >
                  <Box
                    sx={{
                      height: "100%",
                      minHeight: 400,
                      position: "relative",
                      padding: "5px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      component="img"
                      src={ResendMan}
                      alt="Resend confirmation illustration"
                      sx={{
                        flex: 1,
                        width: "100%",
                        height: "100%",
                        borderRadius: 2,
                        objectFit: "cover",
                        display: "block",
                        willChange: "transform",
                        transform: "translateZ(0)",
                      }}
                    />
                  </Box>
                </AnimateOnScroll>
              </Grid>
            </Grid>
          </Container>
        </PageWrapper>
      </Box>
    </>
  );
};

export default Resend;
