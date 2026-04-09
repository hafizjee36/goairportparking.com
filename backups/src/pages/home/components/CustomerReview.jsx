import { useRef, memo } from "react";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Divider,
  Avatar,
} from "@mui/material";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import PageWrapper from "../../../components/reusable/PageWrapper";
import AnimateOnScroll from "../../../components/reusable/AnimateOnScroll";
import { EASE_SOFT } from "../../../components/utils/animation";



const CARD_W = { xs: 280, sm: 320, md: 320 }; // consistent widths
const CARD_MIN_H = { xs: 260, sm: 280, md: 280 }; // consistent heights

const REVIEWS = [
  {
    id: 1,
    name: "Smith",
    rating: 4.9,
    headline: "Highly recommended!",
    source: "Verified by Google",
    logo: "G",
  },
  {
    id: 2,
    name: "Alice",
    rating: 4.9,
    headline: "Great support",
    source: "TrustPilot",
    logo: "★",
  },
  {
    id: 3,
    name: "Johnson",
    rating: 4.9,
    headline: "This is my main review",
    source: "Verified by Google",
    logo: "G",
  },
  {
    id: 4,
    name: "Maria",
    rating: 5.0,
    headline: "Best parking service ever for my entire family trip",
    source: "TrustPilot",
    logo: "★",
  },
];

function ReviewCard({ name, rating, headline, source, logo, tone = "green" }) {
  const baseColor = (theme) =>
    tone === "yellow" ? "#fffb2bff" : theme.palette.primary.main;

  return (
    <Box
      sx={{
        width: CARD_W,
        height: CARD_MIN_H,
        flex: "0 0 auto",
        scrollSnapAlign: "start",
      }}
    >
      <Box
        sx={(theme) => ({
          height: "100%",
          p: 5,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          transition: "box-shadow 350ms ease, transform 350ms ease",
          willChange: "box-shadow",
        
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(120% 120% at 100% 0%,
              ${alpha(baseColor(theme), 0.22)} 0%,
              ${alpha(baseColor(theme), 0.12)} 40%,
              ${alpha(baseColor(theme), 0.06)} 60%,
              transparent 70%)`,
            opacity: 0,
            transition: "opacity 350ms ease",
            pointerEvents: "none",
            zIndex: 0,
          },
          "&:hover::before": { opacity: 1 },
          "& > *": { position: "relative", zIndex: 1 },
          "@media (prefers-reduced-motion: reduce)": { transition: "none" },
        })}
      >
        <Box sx={{ p: 2.5, pt: 2 }}>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
            {name} (⭐ {rating})
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              lineHeight: 1.15,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {headline}
          </Typography>
        </Box>

        <Box>
          <Divider />
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.25}
            sx={{ px: 2.5, py: 2 }}
          >
            <Avatar
              variant="rounded"
              sx={{
                width: 32,
                height: 32,
                borderRadius: "16px",
                fontWeight: 900,
                bgcolor: "background.paper",
                color: "text.primary",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              {logo}
            </Avatar>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {source}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

function CustomerReview() {
  const rowRef = useRef(null);

  const nudge = (dir) => {
    const el = rowRef.current;
    if (!el) return;
    const step = Math.min(420, el.clientWidth * 0.85);
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <Box sx={{ backgroundColor: "#F9FBFC" }}>
      <PageWrapper>
        <Box sx={{ py: { xs: 3, md: 5 } }}>
          {/* Header row */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <AnimateOnScroll
              type="slide-right"
              duration={1700}
              delay={0}
              distance={28}
              threshold={0.25}
              rootMargin="0px 0px -10% 0px"
              easingTransform={EASE_SOFT}
              easingOpacity={EASE_SOFT}
            >
              <Typography variant="h4" sx={{ fontWeight: 800 }}>
                Customer Reviews
              </Typography>
            </AnimateOnScroll>

            <Stack direction="row" spacing={1}>
              <IconButton size="small" aria-label="back" onClick={() => nudge(-1)}>
                <ArrowBackRounded />
              </IconButton>
              <IconButton size="small" aria-label="forward" onClick={() => nudge(1)}>
                <ArrowForwardRounded />
              </IconButton>
            </Stack>
          </Stack>

          {/* Row (fade/settle) */}
          <AnimateOnScroll
            type="fade"
            duration={1200}
            delay={0}
            threshold={0.2}
            rootMargin="0px 0px -8% 0px"
            easingOpacity={EASE_SOFT}
          >
            <Box
              ref={rowRef}
              sx={{
                display: "flex",
                gap: 2,
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                pb: 1,
                "&::-webkit-scrollbar": { display: "none" },
                WebkitOverflowScrolling: "touch",
                willChange: "scroll-position",
              }}
            >
              {REVIEWS.map((r, idx) => (
                <AnimateOnScroll
                  key={r.id}
                  type="slide-up"
                  duration={1600}
                  delay={idx * 120} // gentle initial cascade
                  distance={18}
                  threshold={0.35}
                  // Observe within the horizontal scroller so each card animates as it enters view
                  root={() => rowRef.current}
                  // Expand left/right bounds a bit so it starts slightly off-screen
                  rootMargin="0px 20% 0px 20%"
                  easingTransform={EASE_SOFT}
                  easingOpacity={EASE_SOFT}
                  as="div"
                  style={{ flex: "0 0 auto" }}
                >
                  <ReviewCard
                    {...r}
                    tone={idx % 2 === 0 ? "green" : "yellow"}
                  />
                </AnimateOnScroll>
              ))}
            </Box>
          </AnimateOnScroll>
        </Box>
      </PageWrapper>
    </Box>
  );
}

export default memo(CustomerReview);
