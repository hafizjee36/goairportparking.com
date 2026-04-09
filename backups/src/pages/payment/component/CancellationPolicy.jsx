// components/PaymentForm/CancellationPolicy.js
import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import theme from "../../../theme/index";

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

const CancellationPolicy = () => {
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
          <Typography variant="h4" fontWeight={600} gutterBottom>Cancellation & amendment policy</Typography>
        </AnimateOnScroll>

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
          <Typography variant="h6" fontWeight={600} sx={{ mt: 1 }}>
            Standard policy
          </Typography>
        </AnimateOnScroll>

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
          <Typography variant="body2" sx={{ mt: 1, mb: 3 }}>
            Free changes up to 24 hours before drop-off. Cancellations over 24
            hours get full refund minus £5 fee. Within 24 hours or no-shows: no
            refund.
          </Typography>
        </AnimateOnScroll>

        <AnimateOnScroll
          type="fade"
          duration={640}
          delay={BASE + STEP * 1}
          easingTransform={EASE_SOFT}
          easingOpacity={EASE_SOFT}
          threshold={THRESHOLD}
          rootMargin={ROOT_MARGIN}
          once
          style={smoothStyle}
        >
          <Divider />
        </AnimateOnScroll>

        <AnimateOnScroll
          type="slide-up"
          distance={12}
          duration={680}
          delay={BASE + STEP * 1 + 60}
          easingTransform={EASE_SOFT}
          easingOpacity={EASE_SOFT}
          threshold={THRESHOLD}
          rootMargin={ROOT_MARGIN}
          once
          style={smoothStyle}
        >
          <Typography variant="body2" sx={{ mt: 2 }}>
            Booking fee is non-refundable
          </Typography>
        </AnimateOnScroll>
      </Box>
    </AnimateOnScroll>
  );
};

export default CancellationPolicy;
