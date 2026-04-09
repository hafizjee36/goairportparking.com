import { Box, Grid, Stack, Typography } from "@mui/material";
import PageWrapper from "../../../components/reusable/PageWrapper";
import theme from "../../../theme/index";
import AnimateOnScroll from "../../../components/reusable/AnimateOnScroll";

import million from "../../../assets/optimized/million.webp";
import trust from "../../../assets/optimized/trust.webp";
import ssl from "../../../assets/optimized/ssl.webp";
import parkMark from "../../../assets/optimized/park-mark.webp";
import bestPrice from "../../../assets/optimized/best-price.webp";
import expert from "../../../assets/optimized/expert.webp";

import {
  EASE_SOFT,
  ROOT_MARGIN,
  smoothStyle,
  THRESHOLD,
} from "../../../components/utils/animation";
import BookingFormAlt from "../../../components/bookingForm/BookingFormAlt";

const SERVICES = [
  {
    title: "Trusted & Recommended",
    img: trust,
    desc: "We’ve built our reputation by delivering reliable, convenient, and high-quality airport parking and lounge services, earning the trust and recommendations of thousands of happy travellers year after year.",
  },
  {
    title: "2+ Million Bookings",
    img: million,
    desc: "With over two million successful bookings, our proven track record speaks for itself, giving you the confidence that your airport parking and lounge experience is in safe, experienced hands.",
  },
  {
    title: "SSL Secure",
    img: ssl,
    desc: "Our SSL-secured website ensures all your personal and payment information is fully encrypted, providing complete peace of mind whenever you book your airport parking or lounge access online.",
  },
  {
    title: "Park Mark Certified",
    img: parkMark,
    desc: "We proudly hold the Park Mark award, recognising our commitment to maintaining the highest standards of safety, security, and care for your vehicle while you travel.",
  },
  {
    title: "Best Price Guaranteed",
    img: bestPrice,
    desc: "We constantly check our rates to ensure you always pay the lowest possible price for airport parking and lounge access, with no compromise on quality or service.",
  },
  {
    title: "Expert Support",
    img: expert,
    desc: "Our friendly, knowledgeable customer service team is here to help you every step of the way, from booking to travel day, ensuring a smooth and stress-free experience.",
  },
];

export default function Why() {
  const BASE_DELAY = 120;
  const STEP = 100;

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      <PageWrapper sx={{ position: "relative" }}>
        <Box
          sx={{
            position: "relative",
            top: { xs: -35, sm: -35, md: -60 }, // move UP (negative = up)
            left: { xs: 0, sm: 0, md: 0 },
            right: 0,
            width: "100%",
            zIndex: 2, // stay above neighbors if overlapping
          }}
        >
          <BookingFormAlt />
        </Box>
      </PageWrapper>
    </Box>
  );
}
