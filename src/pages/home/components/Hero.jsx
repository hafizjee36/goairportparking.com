import { memo } from "react";
import { Box, Typography } from "@mui/material";
import BANNER_IMAGE from "../../../assets/optimized/tnc.webp";
import BANNER_IMAGE_528 from "../../../assets/optimized/tnc-528.webp";
import BANNER_IMAGE_320 from "../../../assets/optimized/tnc-320.webp";
import theme from "../../../theme";
import AnimateOnScroll from "../../../components/reusable/AnimateOnScroll";
import { EASE_SOFT } from "../../../components/utils/animation";

function Hero() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        minHeight: { xs: 520, sm: 580, md: "90vh" },
        height: { xs: 520, sm: 580, md: "90vh" },
      }}
    >
      {/* Background Image */}
      <Box
        component="img"
        src={BANNER_IMAGE_528}
        srcSet={`${BANNER_IMAGE_320} 320w, ${BANNER_IMAGE_528} 528w, ${BANNER_IMAGE} 780w`}
        sizes="100vw"
        alt="Airport parking background"
        fetchPriority="high"
        loading="eager"
        decoding="async"
        width="780"
        height="520"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "cover",
          objectPosition: "center",
          zIndex: 0,
        }}
      />

      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: theme.palette.text.black50,
          zIndex: 1,
        }}
      />

      {/* Text Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: { xs: "center", md: "flex-end" },
          alignItems: "center",
          textAlign: "center",
          px: 2,
          pt: { xs: 10, sm: 12, md: 8 },
          pb: { xs: 8, sm: 10, md: 16 },
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 1100,
            minHeight: { xs: 180, sm: 200, md: 220 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <AnimateOnScroll
            type="slide-up"
            duration={1600}
            delay={0}
            distance={24}
            threshold={0.25}
            rootMargin="0px 0px -12% 0px"
            easingTransform={EASE_SOFT}
            easingOpacity={EASE_SOFT}
          >
            <Typography
              variant="overline"
              fontSize={14}
              sx={{
                color: theme.palette.text.white100,
                mb: 1,
                display: "block",
              }}
            >
              Find and Book Parking in Seconds.
            </Typography>
          </AnimateOnScroll>

          <AnimateOnScroll
            type="slide-up"
            duration={1800}
            delay={150}
            distance={26}
            threshold={0.25}
            rootMargin="0px 0px -12% 0px"
            easingTransform={EASE_SOFT}
            easingOpacity={EASE_SOFT}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: theme.palette.text.white100,
                mb: 2,
                fontSize: { xs: "2rem", md: "3rem", lg: "3.5rem" },
                lineHeight: 1.15,
                maxWidth: "1100px",
              }}
            >
              Compare, Save And Park.
            </Typography>
          </AnimateOnScroll>

          <AnimateOnScroll
            type="slide-up"
            duration={2000}
            delay={300}
            distance={28}
            threshold={0.25}
            rootMargin="0px 0px -12% 0px"
            easingTransform={EASE_SOFT}
            easingOpacity={EASE_SOFT}
          >
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.white100,
                maxWidth: 600,
                minHeight: 24,
              }}
            >
              Seamless Airport Parking Reservations, Your Journey Begins Here
            </Typography>
          </AnimateOnScroll>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(Hero);