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
        minHeight: { xs: "520px", sm: "580px", md: "90vh" },
        height: { xs: "520px", sm: "580px", md: "90vh" },
      }}
    >
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

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: theme.palette.text.black50,
          zIndex: 1,
        }}
      />

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
            minHeight: { xs: 190, sm: 210, md: 230 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >

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
                lineHeight: 1,
                maxWidth: "1100px",
                minHeight: { xs: 74, sm: 92, md: 138 },
              }}
            >
              Compare & Book Cheap Airport Parking Across the UK & Dublin Airport
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
                maxWidth: 800,
                minHeight: 24,
                minHeight: { xs: 74, sm: 92, md: 138 },
              }}
            >
              Compare the best airport parking deals across the UK and Dublin Airport in seconds. Whether you need convenient meet and greet or budget-friendly park and ride, we help you find secure, reliable parking at the lowest prices. Book with confidence, enjoy transparent pricing, and start your journey stress-free.
            </Typography>
          </AnimateOnScroll>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(Hero);