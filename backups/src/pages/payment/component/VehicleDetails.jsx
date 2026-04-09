// components/PaymentForm/VehicleDetails.js
import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CustomInput from "../../../components/reusable/CustomInput";
import theme from "../../../theme/index";
import { useBookingForm } from "../../../hooks/useBookingForm";
import { validateLicensePlate } from "../../../utils/validateBookingForm";

// ✨ animation
import AnimateOnScroll from "../../../components/reusable/AnimateOnScroll";
import {
  EASE_SOFT,
  THRESHOLD,
  ROOT_MARGIN,
  smoothStyle,
} from "../../../components/utils/animation";

const BASE = 60;
const STEP = 90;

const VehicleDetails = () => {
  const {
    vehicleData,
    updateVehicle,
    getFieldError,
    hasFieldError
  } = useBookingForm();

  const validatePlate = (plate) => plate.trim().length >= 2;
  const validateVehicleField = (value) => value.trim().length >= 1;

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
            Vehicle details
          </Typography>
        </AnimateOnScroll>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
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
                label=" plate number"
                required
                value={vehicleData.licensePlate}
                onChange={(val) => updateVehicle("licensePlate", val.toUpperCase())}
                placeholder="Enter license plate (e.g., AB12 CDE)"
                validation={validatePlate}
                helperText={getFieldError('licensePlate')}
                externalError={hasFieldError('licensePlate')}
                adornment={<DirectionsCarIcon />}
                adornmentPosition="left"
              />
            </AnimateOnScroll>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
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
                label="Vehicle make"
                value={vehicleData.vehicleMake}
                onChange={(val) => updateVehicle("vehicleMake", val)}
                placeholder="Enter vehicle make (e.g., Toyota, Ford)"
                validation={validateVehicleField}
                helperText={getFieldError('vehicleMake')}
                externalError={hasFieldError('vehicleMake')}
              />
            </AnimateOnScroll>
          </Grid>

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
                label="Vehicle model"
                value={vehicleData.vehicleModel}
                onChange={(val) => updateVehicle("vehicleModel", val)}
                placeholder="Enter vehicle model (e.g., Corolla, Focus)"
                validation={validateVehicleField}
                helperText={getFieldError('vehicleModel')}
                externalError={hasFieldError('vehicleModel')}
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
                label="Vehicle colour"
                value={vehicleData.vehicleColor}
                onChange={(val) => updateVehicle("vehicleColor", val)}
                placeholder="Enter vehicle colour (e.g., Red, Blue)"
                validation={validateVehicleField}
                helperText={getFieldError('vehicleColor')}
                externalError={hasFieldError('vehicleColor')}
              />
            </AnimateOnScroll>
          </Grid>
        </Grid>
      </Box>
    </AnimateOnScroll>
  );
};

export default VehicleDetails;
