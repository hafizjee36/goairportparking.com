import { Box, Typography, Grid } from "@mui/material";
import theme from "../../../theme";
import PageWrapper from "../../../components/reusable/PageWrapper";
import AnimateOnScroll from "../../../components/reusable/AnimateOnScroll";
import {
  EASE_SOFT,
  THRESHOLD,
  ROOT_MARGIN,
  smoothStyle,
} from "../../../components/utils/animation";

import luton2 from "../../../assets/optimized/luton2.webp";
import stansed from "../../../assets/optimized/stansed.webp";
import birmingham2 from "../../../assets/optimized/birmingham2.webp";
import manchester2 from "../../../assets/optimized/manchester2.webp";
import bradford from "../../../assets/optimized/bradford.webp";
import liverpool from "../../../assets/optimized/liverpool.webp";
import bristol2 from "../../../assets/optimized/bristol2.webp";

const airports = [
  { name: "Luton Airport", img: luton2 },
  {
    name: "London Stansted Airport",
    img: stansed,
  },
  { name: "Birmingham Airport", img: birmingham2 },
  { name: "Manchester Airport", img: manchester2 },
  {
    name: "Leeds Bradford Airport",
    img: bradford,
  },
  { name: "Liverpool Airport", img: liverpool },
  { name: "Bristol Airport", img: bristol2 },
];

export default function AirportList() {
  const BASE_DELAY = 100;
  const STEP = 60;

  return (
    <Box sx={{ backgroundColor: theme.palette.background.paper }}>
      <PageWrapper>
        <Box sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, md: 6 } }}>
          {/* Heading */}
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
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, textAlign: "center", mb: 1 }}
            >
              Select Airport Parking
            </Typography>
          </AnimateOnScroll>

          {/* Subheading */}
          <AnimateOnScroll
            type="fade"
            duration={650}
            delay={90}
            easingTransform={EASE_SOFT}
            easingOpacity={EASE_SOFT}
            threshold={THRESHOLD}
            rootMargin={ROOT_MARGIN}
            once
            style={smoothStyle}
          >
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                maxWidth: 760,
                mx: "auto",
                color: theme.palette.text.secondary,
                mb: { xs: 4, md: 6 },
              }}
            >
              Looking for long stay, short stay car parks or a meet and
              greet/valet service? You can get a great deal and have a hassle
              free experience at the airport by pre-booking. You can pre-book
              all of these car parking options through goairportparking.com.
            </Typography>
          </AnimateOnScroll>

          {/* Grid */}
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {airports.map((a, i) => (
              <Grid key={a.name} size={{ xs: 12, sm: 6, md: 3 }}>
                <AnimateOnScroll
                  type="slide-up"
                  distance={18}
                  duration={680}
                  delay={BASE_DELAY + i * STEP}
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
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    {/* Image Circle */}
                    <Box
                      sx={{
                        position: "relative",
                        width: { xs: 150, md: 170 }, // smaller size
                        height: { xs: 150, md: 170 },
                        borderRadius: "50%",
                        overflow: "hidden",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          outline: `3px solid ${theme.palette.primary.main}`, // orange ring on hover
                          outlineOffset: "4px",
                        },
                      }}
                    >
                      <img
                        src={a.img}
                        alt={a.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </Box>

                    {/* Caption */}
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 800, textAlign: "center" }}
                    >
                      {a.name}
                    </Typography>
                  </Box>
                </AnimateOnScroll>
              </Grid>
            ))}
          </Grid>
        </Box>
      </PageWrapper>
    </Box>
  );
}
