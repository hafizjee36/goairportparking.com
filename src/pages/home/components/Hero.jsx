import { memo } from "react";
import { Box, Typography } from "@mui/material";
import BANNER_VIDEO from "../../../assets/banner-video.mp4";
import BANNER_IMAGE from "../../../assets/optimized/tnc.webp";
import BANNER_IMAGE_528 from "../../../assets/optimized/tnc-528.webp";
import BANNER_IMAGE_320 from "../../../assets/optimized/tnc-320.webp";
import theme from "../../../theme";

// ?? swap to the Framer version
import AnimateOnScroll from "../../../components/reusable/AnimateOnScroll";
import { EASE_SOFT } from "../../../components/utils/animation";

function Hero() {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "auto", md: "90vh" },
        overflow: "hidden",
        pb: { xs: 2, md: 20 }, // Increased from 16 to 20 to ensure content is visible above BookingForm
      }}
    >
      {/* Background Video */}
      <img
        src={BANNER_IMAGE_528}
        srcSet={`${BANNER_IMAGE_320} 320w, ${BANNER_IMAGE_528} 528w, ${BANNER_IMAGE} 780w`}
        sizes="(max-width: 600px) 100vw, 528px"
        alt="Background"
        fetchPriority="high"
        loading="eager"
        decoding="async"
        width="528"
        height="352"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />
      {/* <video
        autoPlay
        muted
        loop
        playsInline
        defferred
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src={BANNER_VIDEO} type="video/mp4" />
      </video> */}

      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          bgcolor: theme.palette.text.black50,
          zIndex: 1,
        }}
      />

      {/* Text Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          height: { xs: "auto", md: "100%" },
          textAlign: "center",
          px: 2,
          py: { xs: 10, sm: 12, md: 8 }, // Added padding on desktop to push content higher
        }}
      >
        <AnimateOnScroll
          type="slide-up"
          duration={1600} // was 1200
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
            sx={{ color: theme.palette.text.white100, mb: 1 }}
          >
            Find and Book Parking in Seconds.
          </Typography>
        </AnimateOnScroll>

        <AnimateOnScroll
          type="slide-up"
          duration={1800}
          delay={150} // keep a gentle cascade
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
              maxWidth: '1100px',
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
            sx={{ color: theme.palette.text.white100, maxWidth: 600 }}
          >
            Seamless Airport Parking Reservations, Your Journey Begins Here
          </Typography>
        </AnimateOnScroll>
      </Box>
    </Box>
  );
}

export default memo(Hero);
