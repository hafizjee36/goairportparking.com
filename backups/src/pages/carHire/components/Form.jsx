import {
  Box,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  Typography,
  FormControl,
} from "@mui/material";
import PageWrapper from "../../../components/reusable/PageWrapper";
import { useState, useMemo } from "react";
import CustomButton from "../../../components/reusable/CustomButton";
import AnimateOnScroll from "../../../components/reusable/AnimateOnScroll";
import {
  EASE_SOFT,
  THRESHOLD,
  ROOT_MARGIN,
  smoothStyle,
} from "../../../components/utils/animation";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  isBefore,
  isSameDay,
  startOfDay,
  isValid,
  format
} from "date-fns";
import DateCard from "../../../components/reusable/DateCard";
import TimeCard from "../../../components/reusable/TimeCard";

export default function Form() {
  const [formData, setFormData] = useState({
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: null, // Date | null
    pickupTime: null, // Date | null
    dropOffDate: null, // Date | null
    dropOffTime: null, // Date | null
    differentLocation: false,
  });

  const [errors, setErrors] = useState({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const locations = [
    "London Heathrow Airport",
    "London Gatwick Airport",
    "Manchester Airport",
    "Birmingham Airport",
    "Edinburgh Airport",
  ];

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (hasAttemptedSubmit && errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const isMissing = (v) => !v || !(v instanceof Date) || !isValid(v);

  const validateForm = () => {
    const {
      pickupLocation,
      dropoffLocation,
      pickupDate,
      pickupTime,
      dropOffDate,
      dropOffTime,
      differentLocation,
    } = formData;

    const newErrors = {};

    if (!pickupLocation)
      newErrors.pickupLocation = "Pick-up location is required";
    if (differentLocation && !dropoffLocation)
      newErrors.dropoffLocation = "Drop-off location is required";

    if (isMissing(pickupDate))
      newErrors.pickupDate = "Pick-up date is required";
    if (isMissing(pickupTime))
      newErrors.pickupTime = "Pick-up time is required";
    if (isMissing(dropOffDate))
      newErrors.dropOffDate = "Drop-off date is required";
    if (isMissing(dropOffTime))
      newErrors.dropOffTime = "Drop-off time is required";

    // date order: drop-off date >= pick-up date
    if (!isMissing(pickupDate) && !isMissing(dropOffDate)) {
      if (isBefore(startOfDay(dropOffDate), startOfDay(pickupDate))) {
        newErrors.dropOffDate = "Drop-off date cannot be before pick-up date";
      }
    }

    // time order on same day: drop-off time > pick-up time
    if (
      !isMissing(pickupDate) &&
      !isMissing(dropOffDate) &&
      isSameDay(pickupDate, dropOffDate) &&
      !isMissing(pickupTime) &&
      !isMissing(dropOffTime)
    ) {
      if (isBefore(dropOffTime, pickupTime)) {
        newErrors.dropOffTime = "Drop-off time must be after pick-up time";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);
    if (validateForm()) {
      console.log("Form Data:", formData);
      alert("Search submitted successfully!");
    }
  };

  const BASE = 80;
  const STEP = 80;

  // ----- dynamic constraints for pickers -----
  const today = startOfDay(new Date());

  // Pick-up time must not be in the past if pick-up date is today
  const pickupMinTime = useMemo(() => {
    if (
      !isMissing(formData.pickupDate) &&
      isSameDay(formData.pickupDate, today)
    ) {
      return new Date(); // now
    }
    return null;
  }, [formData.pickupDate, today]);

  // Drop-off date can't be before pick-up date (fallback to today if none)
  const dropMinDate = useMemo(() => {
    return !isMissing(formData.pickupDate)
      ? startOfDay(formData.pickupDate)
      : today;
  }, [formData.pickupDate, today]);

  // If same day, drop-off time must be after pick-up time
  const dropMinTime = useMemo(() => {
    if (
      !isMissing(formData.pickupDate) &&
      !isMissing(formData.dropOffDate) &&
      isSameDay(formData.dropOffDate, formData.pickupDate) &&
      !isMissing(formData.pickupTime)
    ) {
      return formData.pickupTime;
    }
    return null;
  }, [formData.pickupDate, formData.dropOffDate, formData.pickupTime]);

  return (
    <Box sx={{ backgroundColor: "#F9FBFC", py: 5 }}>
      <PageWrapper>
        <AnimateOnScroll
          type="zoom-in"
          duration={700}
          delay={0}
          easingTransform={EASE_SOFT}
          easingOpacity={EASE_SOFT}
          threshold={THRESHOLD}
          rootMargin={ROOT_MARGIN}
          once
          style={smoothStyle}
        >
          <Box
            sx={{
              borderRadius: 2,
              p: 3,
              backgroundColor: "white",
              mx: "auto",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <form onSubmit={handleSubmit}>
                {/* Different Location Checkbox */}
                <AnimateOnScroll
                  type="fade"
                  duration={600}
                  delay={BASE}
                  easingTransform={EASE_SOFT}
                  easingOpacity={EASE_SOFT}
                  threshold={THRESHOLD}
                  rootMargin={ROOT_MARGIN}
                  once
                  style={smoothStyle}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.differentLocation}
                        onChange={(e) =>
                          handleInputChange(
                            "differentLocation",
                            e.target.checked
                          )
                        }
                        sx={{ color: "#016FD0" }}
                      />
                    }
                    label="Drop off at a different location"
                    sx={{ mb: 2 }}
                  />
                </AnimateOnScroll>

                <Grid container spacing={2}>
                  {/* Pick-up Location */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <AnimateOnScroll
                      type="slide-up"
                      distance={16}
                      duration={680}
                      delay={BASE + STEP}
                      easingTransform={EASE_SOFT}
                      easingOpacity={EASE_SOFT}
                      threshold={THRESHOLD}
                      rootMargin={ROOT_MARGIN}
                      once
                      style={smoothStyle}
                    >
                      <Typography
                        sx={{ fontWeight: "450", fontSize: "16px", mb: 1 }}
                      >
                        Pick-up Location
                      </Typography>
                      <FormControl fullWidth error={!!errors.pickupLocation}>
                        <Select
                          value={formData.pickupLocation}
                          onChange={(e) =>
                            handleInputChange("pickupLocation", e.target.value)
                          }
                          displayEmpty
                          sx={{
                            backgroundColor: "white",
                            "& .MuiSelect-select": {
                              color: formData.pickupLocation ? "black" : "#999",
                            },
                          }}
                        >
                          <MenuItem value="" disabled sx={{ color: "#999" }}>
                            Enter Pick-up location
                          </MenuItem>
                          {locations.map((location) => (
                            <MenuItem key={location} value={location}>
                              {location}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.pickupLocation && (
                          <FormHelperText>
                            {errors.pickupLocation}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </AnimateOnScroll>
                  </Grid>

                  {/* Drop-off Location */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <AnimateOnScroll
                      type="slide-up"
                      distance={16}
                      duration={680}
                      delay={BASE + STEP * 2}
                      easingTransform={EASE_SOFT}
                      easingOpacity={EASE_SOFT}
                      threshold={THRESHOLD}
                      rootMargin={ROOT_MARGIN}
                      once
                      style={smoothStyle}
                    >
                      <Typography
                        sx={{ fontWeight: "450", fontSize: "16px", mb: 1 }}
                      >
                        Drop-off Location
                      </Typography>
                      <FormControl fullWidth error={!!errors.dropoffLocation}>
                        <Select
                          value={formData.dropoffLocation}
                          onChange={(e) =>
                            handleInputChange("dropoffLocation", e.target.value)
                          }
                          displayEmpty
                          disabled={!formData.differentLocation}
                          sx={{
                            backgroundColor: formData.differentLocation
                              ? "white"
                              : "#f5f5f5",
                            "& .MuiSelect-select": {
                              color: formData.dropoffLocation
                                ? "black"
                                : "#999",
                            },
                          }}
                        >
                          <MenuItem value="" disabled sx={{ color: "#999" }}>
                            Enter Drop-off location
                          </MenuItem>
                          {locations.map((location) => (
                            <MenuItem key={location} value={location}>
                              {location}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.dropoffLocation && (
                          <FormHelperText>
                            {errors.dropoffLocation}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </AnimateOnScroll>
                  </Grid>

                  {/* Pick-up Date (field variant) */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <AnimateOnScroll
                      type="slide-up"
                      distance={16}
                      duration={680}
                      delay={BASE + STEP * 3}
                      easingTransform={EASE_SOFT}
                      easingOpacity={EASE_SOFT}
                      threshold={THRESHOLD}
                      rootMargin={ROOT_MARGIN}
                      once
                      style={smoothStyle}
                    >
                      <DateCard
                        variant="field"
                        label="Pick-up Date"
                        placeholder="MM/DD/YYYY"
                        value={formData.pickupDate}
                        onChange={(v) => handleInputChange("pickupDate", v)}
                        required
                        minDate={today}
                        externalError={Boolean(errors.pickupDate)}
                        helperText={errors.pickupDate}
                      />
                    </AnimateOnScroll>
                  </Grid>

                  {/* Pick-up Time (field variant) */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <AnimateOnScroll
                      type="slide-up"
                      distance={16}
                      duration={680}
                      delay={BASE + STEP * 4}
                      easingTransform={EASE_SOFT}
                      easingOpacity={EASE_SOFT}
                      threshold={THRESHOLD}
                      rootMargin={ROOT_MARGIN}
                      once
                      style={smoothStyle}
                    >
                      <TimeCard
                        variant="field"
                        label="Pick-up Time"
                        placeholder="hh:mm AM/PM"
                        value={formData.pickupTime}
                        onChange={(v) => handleInputChange("pickupTime", v)}
                        required
                        timeStep={5}
                        minTime={pickupMinTime}
                        externalError={Boolean(errors.pickupTime)}
                        helperText={errors.pickupTime}
                      />
                    </AnimateOnScroll>
                  </Grid>

                  {/* Drop-Off Date (field variant) */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <AnimateOnScroll
                      type="slide-up"
                      distance={16}
                      duration={680}
                      delay={BASE + STEP * 5}
                      easingTransform={EASE_SOFT}
                      easingOpacity={EASE_SOFT}
                      threshold={THRESHOLD}
                      rootMargin={ROOT_MARGIN}
                      once
                      style={smoothStyle}
                    >
                      <DateCard
                        variant="field"
                        label="Drop-Off Date"
                        placeholder="MM/DD/YYYY"
                        value={formData.dropOffDate}
                        onChange={(v) => handleInputChange("dropOffDate", v)}
                        required
                        minDate={dropMinDate}
                        externalError={Boolean(errors.dropOffDate)}
                        helperText={errors.dropOffDate}
                      />
                    </AnimateOnScroll>
                  </Grid>

                  {/* Drop-Off Time (field variant) */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <AnimateOnScroll
                      type="slide-up"
                      distance={16}
                      duration={680}
                      delay={BASE + STEP * 6}
                      easingTransform={EASE_SOFT}
                      easingOpacity={EASE_SOFT}
                      threshold={THRESHOLD}
                      rootMargin={ROOT_MARGIN}
                      once
                      style={smoothStyle}
                    >
                      <TimeCard
                        variant="field"
                        label="Drop-Off Time"
                        placeholder="hh:mm AM/PM"
                        value={formData.dropOffTime}
                        onChange={(v) => handleInputChange("dropOffTime", v)}
                        required
                        timeStep={5}
                        minTime={dropMinTime}
                        externalError={Boolean(errors.dropOffTime)}
                        helperText={errors.dropOffTime}
                      />
                    </AnimateOnScroll>
                  </Grid>

                  {/* Search Button */}
                  <Grid size={{ xs: 12 }}>
                    <AnimateOnScroll
                      type="fade"
                      duration={600}
                      delay={BASE + STEP * 7}
                      easingTransform={EASE_SOFT}
                      easingOpacity={EASE_SOFT}
                      threshold={THRESHOLD}
                      rootMargin={ROOT_MARGIN}
                      once
                      style={smoothStyle}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          mt: 2,
                          alignItems: "center",
                        }}
                      >
                        <CustomButton
                          size="large"
                          type="submit"
                          variant="contained"
                        >
                          Search
                        </CustomButton>
                      </Box>
                    </AnimateOnScroll>
                  </Grid>
                </Grid>
              </form>
            </LocalizationProvider>
          </Box>
        </AnimateOnScroll>
      </PageWrapper>
    </Box>
  );
}
