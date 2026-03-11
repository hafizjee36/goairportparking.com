import { memo } from "react";
import { Box, Typography, Grid, Chip } from "@mui/material";
import PageWrapper from "../../../components/reusable/PageWrapper";
import birmingham from "../../../assets/optimized/birmingham.webp";
import bristol from "../../../assets/optimized/bristol.webp";
import dublin from "../../../assets/optimized/dublin.webp";
import luton from "../../../assets/optimized/luton.webp";
import manchester from "../../../assets/optimized/manchester.webp";
import southampton from "../../../assets/optimized/southampton.webp";
// ⬇️ use the Framer wrapper we’ve been using
import AnimateOnScroll from "../../../components/reusable/AnimateOnScroll";
import { EASE_SOFT } from "../../../components/utils/animation";
import theme from "../../../theme";

const cities = [
  { name: "Luton", img: luton, url: "/luton-airport-parking" },
  { name: "Dublin", img: dublin, url: "/dublin-airport-parking" },
  { name: "Birmingham", img: birmingham, url: "/birmingham-airport-parking" },
  { name: "Manchester", img: manchester, url: "/manchester-airport-parking" },
  { name: "Bristol", img: bristol, url: "/bristol-airport-parking" },
  { name: "Southampton", img: southampton, url: "/southampton-port-parking" },
];

const BASE_REVEAL = {
  duration: 1600,
  threshold: 0.28,
  rootMargin: "0px 0px -12% 0px",
  easingTransform: EASE_SOFT,
  easingOpacity: EASE_SOFT,
};
const stagger = (i, step = 90, start = 60) => start + i * step;

function Reveal({ children, ...props }) {
  return (
    <AnimateOnScroll {...BASE_REVEAL} {...props}>
      {children}
    </AnimateOnScroll>
  );
}

function CityCard({ name, img, badge }) {
  return (
    <Box sx={{ width: "100%", textAlign: "left" }}>
      <Box
        sx={{
          position: "relative",
          borderRadius: 3,
          overflow: "hidden",
          aspectRatio: "1 / 1",
          width: {
            xs: "110px",
            sm: "140px",
            md: "180px",
            lg: "160px",
          },
          mx: { xs: "auto", sm: 0 },
          boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
          "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: "scale(1)",
            transition:
              "transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1), filter 260ms cubic-bezier(0.2, 0.8, 0.2, 1)",
            transformOrigin: "center",
            willChange: "transform",
          },
          "&:hover img": { transform: "scale(1.08)" }, // subtle, buttery
          "@media (prefers-reduced-motion: reduce)": {
            "& img": { transition: "none" },
          },
        }}
      >
        <Box component="img" src={img} alt={name} loading="lazy" />
        {badge && (
          <Chip
            label={badge}
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "rgba(255,255,255,0.9)",
              backdropFilter: "saturate(120%) blur(4px)",
              fontWeight: 500,
            }}
          />
        )}
      </Box>

      <Typography
        variant="caption"
        sx={{
          display: "block",
          mt: 1,
          color: "text.secondary",
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        {name}
      </Typography>
    </Box>
  );
}

function GlobalServices() {
  return (
    <Box sx={{ backgroundColor: theme.palette.background.paper }}>
      <PageWrapper>
        <Box sx={{ py: { xs: 3, md: 5 } }}>
          <Reveal type="slide-up" distance={20} delay={0}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                mb: { xs: 2, md: 3 },
              }}
            >
              Explore Some Of Our Most Popular Locations
            </Typography>
          </Reveal>

          {/* Responsive grid: 2 per row on phones, up to 6 on large screens */}
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {cities.map((c, i) => (
              <Grid key={c.name} size={{ xs: 6, sm: 4, lg: 2 }}>
                <a 
                  href={c.url} 
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Reveal
                    type="slide-up"
                    distance={18}
                    delay={stagger(i)}
                    // slight variety: last row items can also fade if you prefer
                  >
                    <CityCard {...c} />
                  </Reveal>
                </a>
              </Grid>
            ))}
          </Grid>
        </Box>
      </PageWrapper>
    </Box>
  );
}

export default memo(GlobalServices);
