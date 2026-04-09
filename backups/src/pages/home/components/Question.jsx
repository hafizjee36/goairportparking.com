import { memo } from "react";
import BG from "../../../assets/optimized/question-bg.webp";
import HAND from "../../../assets/optimized/hand.webp";
import AnimateOnScroll from "../../../components/reusable/AnimateOnScroll";
import BGQ from "../../../assets/optimized/subscribe-image.webp";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { EASE_SOFT } from "../../../components/utils/animation";
import CustomButton from "../../../components/reusable/CustomButton";

function Question() {
  return (
    <Box sx={{ position: "relative", overflow: "visible" }}>
      {/* Background */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 200, md: 250 },
          backgroundImage: `url(${BGQ})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(0deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.45) 40%, rgba(0,0,0,.35) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* FULL WIDTH CENTERED CONTENT */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            px: 2,
          }}
        >
          <AnimateOnScroll
            type="slide-up"
            duration={1600}
            delay={0}
            distance={22}
            threshold={0.3}
            rootMargin="0px 0px -12% 0px"
            easingTransform={EASE_SOFT}
            easingOpacity={EASE_SOFT}
          >
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 900,
                lineHeight: 1.05,
                fontSize: { xs: 30, sm: 42, md: 56 },
              }}
            >
              Still, have a question?
            </Typography>
          </AnimateOnScroll>

          <AnimateOnScroll
            type="fade"
            duration={1400}
            delay={140}
            threshold={0.3}
            rootMargin="0px 0px -12% 0px"
            easingOpacity={EASE_SOFT}
          >
            <Typography
              sx={{
                color: "rgba(255,255,255,.9)",
                fontSize: { xs: 14, md: 16 },
                mb: 2,
              }}
            >
              Our Agents Will Be With You In Seconds
            </Typography>
          </AnimateOnScroll>

          <AnimateOnScroll
            type="fade"
            duration={1500}
            delay={260}
            threshold={0.3}
            rootMargin="0px 0px -12% 0px"
            easingOpacity={EASE_SOFT}
          >
            <CustomButton
              component={Link}
              to="/contact-us"
              variant="contained"
              size="large"
              sx={{
                px: 3.5,
                borderRadius: 999,
                textTransform: "none",
                fontWeight: 700,
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
              }}
            >
              Contact Us
            </CustomButton>
          </AnimateOnScroll>
        </Box>

        {/* Hand Image */}
        <AnimateOnScroll
          type="slide-right"
          duration={1800}
          delay={180}
          distance={28}
          threshold={0.25}
          rootMargin="0px 0px -10% 0px"
          easingTransform={EASE_SOFT}
          easingOpacity={EASE_SOFT}
        >
          <Box
            component="img"
            src={HAND}
            alt="Hand with phone"
            sx={{
              display: { xs: "none", sm: "block" },
              position: "absolute",
              left: 0,
              bottom: -100,
              height: { xs: 180, md: 240 },
              objectFit: "contain",
              zIndex: 2,
              pointerEvents: "none",
              userSelect: "none",
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
            }}
          />
        </AnimateOnScroll>
      </Box>
    </Box>
  );
}

export default memo(Question);
