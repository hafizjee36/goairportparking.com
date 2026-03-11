import { memo } from "react";
import { Box, Typography, Grid } from "@mui/material";
import PageWrapper from "../../../components/reusable/PageWrapper";
import cloudsflare from "../../../assets/optimized/cloudsflare.webp";
import trustpilot from "../../../assets/optimized/trustpilot.webp";
import googlepartner from "../../../assets/optimized/google-partner.webp";
import parkmark from "../../../assets/optimized/parkmark.webp";
import wizz from "../../../assets/optimized/wiz.webp";
import holiday from "../../../assets/optimized/holiday.webp";
import stripe from "../../../assets/optimized/stripe.webp";
import theme from "../../../theme";

const LOGOS = [
  { alt: "Cloudflare", src: cloudsflare, url: "https://www.cloudflare.com/" },
  { alt: "Trustpilot", src: trustpilot, url: "https://www.trustpilot.com/" },
  { alt: "ParkMark", src: parkmark, url: "https://parkmark.co.uk/" },
  { alt: "Google Partner", src: googlepartner, url: "https://partners.cloud.google.com/" },
  { alt: "Wizz", src: wizz, url: "https://www.wizzair.com/" },
  { alt: "Holiday Extras", src: holiday, url: "https://www.holidayextras.com/" },
  { alt: "Stripe", src: stripe, url: "https://stripe.com/" },
];

function LogoBadge({ src, alt }) {
  return (
    <Box
      sx={{
        width: { xs: 100, sm: 120, md: 140 },
        height: { xs: 100, sm: 120, md: 140 },
        borderRadius: "50%",
        border: `1px solid ${theme.palette.text.black30}`,
        display: "grid",
        placeItems: "center",
        backgroundColor: "background.paper",
        mx: "auto",
        transition: "transform .2s ease",
        "&:hover": { transform: "translateY(-2px)" },
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          maxWidth: "60%",
          maxHeight: "60%",
          objectFit: "contain",
          display: "block",
        }}
      />
    </Box>
  );
}

function Customers() {
  return (
    <Box sx={{ backgroundColor: theme.palette.background.paper }}>
      <PageWrapper>
        <Box sx={{ py: { xs: 4, md: 6 } }}>
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: 800, mb: { xs: 3, md: 5 }, lineHeight: 1.15 }}
          >
            Customers Love Us
          </Typography>

          <Grid container spacing={1}>
            {LOGOS.map((l) => (
              <Grid
                key={l.alt}
                size={{ xs: 6, sm: 4, md: 4, lg: "auto" }}
                sx={{ mx: "auto" }}
                display="flex"
                justifyContent="center"
              >
                <a 
        href={l.url} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
                <LogoBadge src={l.src} alt={l.alt} />
              </a>
              </Grid>
            ))}
          </Grid>
        </Box>
      </PageWrapper>
    </Box>
  );
}

export default memo(Customers);
