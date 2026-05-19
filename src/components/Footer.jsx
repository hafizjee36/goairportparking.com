import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOn from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Collapse, useMediaQuery } from "@mui/material";
import PageWrapper from "./reusable/PageWrapper";
import theme from "../theme";
import { Link } from "react-router-dom";

import visa from "../assets/optimized/visa.webp";
import amex from "../assets/optimized/amex.webp";
import discover from "../assets/optimized/discover.webp";
import logo from "../assets/optimized/logo-1.webp";
import { Grid } from "@mui/material";

const quickLinks = [
  { name: "About Us", path: "about-us" },
  { name: "Airport Parking", path: "airport-parking", hasDropdown: true },
  // { name: "Car Hire", path: "car-hire" },
  // { name: "Resend", path: "resend-confirmation" },
  // { name: "Travel", path: "compare-travel-money" },
  // { name: "Blog", path: "blog" },
  { name: "FAQ", path: "faq" },
  { name: "Contact Us", path: "contact-us" },
];

import { getAirportList } from "../data/airportConfigs";

// Airport Parking dropdown options for footer - dynamic
const airportParkingOptions = getAirportList();


const policyLinks = [
  { name: "Privacy Policy", path: "privacy-policy" },
  { name: "Terms & Condition", path: "terms-condition" },
  // { name: "Refund Policy", path: "refund-policy" },
];

const socialLinks = [
  { name: "Facebook", icon: <FacebookIcon />, url: "https://facebook.com" },
  { name: "LinkedIn", icon: <LinkedInIcon />, url: "https://linkedin.com" },
  { name: "Instagram", icon: <InstagramIcon />, url: "https://instagram.com" },
  { name: "X", icon: <XIcon />, url: "https://x.com" },
];

export default function Footer() {
  const [airportDropdownOpen, setAirportDropdownOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleAirportDropdownToggle = () => {
    setAirportDropdownOpen(!airportDropdownOpen);
  };

  const ContactItem = ({ icon, text }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        justifyContent: "left",
        textAlign: { xs: "center", md: "left" },
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.25)",
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
        }}
      >
        <Box sx={{ p: 0.5, display: "grid", placeItems: "center" }}>{icon}</Box>
      </Box>

      <Typography
        sx={{
          flex: 1,
          minWidth: 0, // ✅ allows shrinking in flex
          textAlign: "left",
          fontSize: 14,
          fontWeight: 600,
          color: theme.palette.background.paper,
          overflowWrap: "anywhere", // ✅ wrap anywhere if needed
          wordBreak: "break-word", // ✅ break long strings
          whiteSpace: "normal", // ✅ multi-line wrapping
        }}
      >
        {text}
      </Typography>
    </Box>
  );

  const CompanyItem = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        justifyContent: { xs: "center", md: "flex-start" },
        textAlign: "left",
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 600,
          color: theme.palette.background.paper,
        }}
      >
      CLOUDAINAIRE MANAGEMENT CONSULTANCY LLC
      </Typography>
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 600,
          color: theme.palette.background.paper,
        }}
      >
        Company number:&nbsp;
        <Box component="span" sx={{ color: theme.palette.primary.main }}>
         1494313
        </Box>
      </Typography>
    </Box>
  );

  return (
    <Box
      component="footer"
      sx={{ bgcolor: "secondary.main", color: theme.palette.text.white100 }}
    >
      <PageWrapper>
        <Box sx={{ py: { xs: 4, md: 6 } }}>
          <Grid container spacing={{ xs: 3, md: 5 }} alignItems="center">
            {/* Left column (logo + description) */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                sx={{
                  maxWidth: 520,
                  mx: { xs: "auto", md: 0 },
                  textAlign: "left",
                }}
              >
                <Box
                  component={Link}
                  to="/"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    textDecoration: "none",
                    mb: 2,
                  }}
                >
                  <Box
                    component="img"
                    src={logo}
                    alt="CLOUDAINAIRE MANAGEMENT CONSULTANCY LLC"
                    sx={{ height: 100, width: "auto" }}
                  />
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    lineHeight: 1.6,
                    fontSize: 14,
                    color: theme.palette.text.white80,
                  }}
                >
                  CLOUDAINAIRE MANAGEMENT CONSULTANCY LLC is an independent airport-parking comparison platform, helping travellers find and compare secure parking options across England and Europe with real-time availability, transparent pricing, and 24/7 customer support
                </Typography>
              </Box>
            </Grid>

            {/* Right column (contacts) */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Grid
                container
                spacing={3}
                justifyContent="flex-end"
                sx={{ textAlign: { xs: "center", md: "left" } }}
              >
                {/* Row 1 */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <a
                    href="mailto:support@goairportparking.com"
                    target="_blank"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ContactItem
                      icon={
                        <EmailIcon
                          sx={{
                            color: theme.palette.primary.main,
                            fontSize: 22,
                          }}
                        />
                      }
                      text="support@goairportparking.com"
                    />
                  </a>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <a
                    href="tel:442039749748"
                    target="_blank"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ContactItem
                      icon={
                        <PhoneIcon
                          sx={{
                            color: theme.palette.primary.main,
                            fontSize: 22,
                          }}
                        />
                      }
                      text="+44 2039 749748"
                    />
                  </a>
                </Grid>

                {/* Row 2 */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <a
                    href="https://share.google/wLQSwppH0CHAB0vJl"
                    target="_blank"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ContactItem
                      icon={
                        <LocationOn
                          sx={{
                            color: theme.palette.primary.main,
                            fontSize: 22,
                          }}
                        />
                      }
                      text="AL GURG BUILDING (KARAMA), Al Karama, Office M1-67, Dubai, United Arab Emirates"
                    />
                  </a>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <CompanyItem />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ bgcolor: theme.palette.text.secondary }} />

        {/* Middle: socials · policy links · credit */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr auto 1fr" },
            alignItems: "center",
            gap: 2,
            py: 2,
          }}
        >
          {/* Socials */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              color: theme.palette.text.secondary,
              justifySelf: { xs: "center", md: "start" },
              "& svg": { fontSize: 20 },
              "& a": {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#9A9BCB",
                textDecoration: "none",
                "&:hover": { color: theme.palette.primary.main },
              },
            }}
          >
            {socialLinks.map(({ name, icon, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
              >
                {icon}
              </a>
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 2, md: 3 },
              flexWrap: "wrap",
              justifyContent: "center",
              justifySelf: "center",
            }}
          >
            {policyLinks.map(({ name, path }) => (
              <Typography
                key={name}
                variant="caption"
                component={Link}
                to={path}
                sx={{
                  color: "#9A9BCB",
                  fontSize: 14,
                  fontWeight: 500,
                  lineHeight: 1,
                  textDecoration: "none",
                  opacity: 0.95,
                  "&:hover": { opacity: 1 },
                }}
              >
                {name}
              </Typography>
            ))}
          </Box>

          {/* Credit */}
          {/* <Typography
            variant="caption"
            sx={{
              display: "flex",
              alignItems: "center",
              justifySelf: { xs: "center", md: "end" },
              textAlign: { xs: "center", md: "right" },
              whiteSpace: "nowrap",
              color: "#9A9BCB",
            }}
          >
            Design & Managed by{" "}
            <a
              // href="https://redoq.com"
              href="https://www.goairportparking.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Box
                component="span"
                sx={{ color: theme.palette.primary.main, ml: 0.5 }}
              >
                
              </Box>
            </a>
          </Typography> */}
        </Box>
      </PageWrapper>

      {/* Bottom bar */}
      <Box sx={{ bgcolor: "#000", py: 1.5 }}>
        <PageWrapper>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr auto" },
              alignItems: "center",
              rowGap: { xs: 2, md: 0 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
                flexDirection: { xs: "column", md: "row" },
                flexWrap: { xs: "nowrap", md: "wrap" },
                gap: { xs: 1, md: 4 },
                textAlign: { xs: "center", md: "left" },
                alignItems: { xs: "center", md: "flex-start" },
              }}
            >
              {quickLinks.map(({ name, path, hasDropdown }) => {
                // Special handling for Airport Parking dropdown
                if (hasDropdown && name === "Airport Parking") {
                  return (
                    <Box key={name} sx={{ position: "relative" }}>
                      {/* Main Airport Parking Link */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          cursor: "pointer",
                          position: "relative",
                          "&:hover + .dropdown-menu, .dropdown-menu:hover": !isMobile ? {
                            opacity: 1,
                            visibility: "visible",
                          } : {},
                        }}
                        onClick={isMobile ? handleAirportDropdownToggle : undefined}
                        className="hover-trigger"
                      >
                        <Typography
                          component="div"
                          // Removed Link and navigation to prevent going to /airport-parking
                          sx={{
                            color: "white",
                            fontSize: 14,
                            fontWeight: 500,
                            lineHeight: 1,
                            textDecoration: "none",
                            opacity: 0.95,
                            cursor: "pointer",
                            "&:hover": { opacity: 1 },
                          }}
                        >
                          {name}
                        </Typography>
                        {isMobile && (
                          airportDropdownOpen ? (
                            <ExpandLessIcon sx={{ color: "white", fontSize: 16 }} />
                          ) : (
                            <ExpandMoreIcon sx={{ color: "white", fontSize: 16 }} />
                          )
                        )}
                      </Box>

                      {/* Desktop hover dropdown */}
                      {!isMobile && (
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: "100%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            mb: 1,
                            minWidth: 200,
                            bgcolor: "rgba(0, 0, 0, 0.95)",
                            borderRadius: 2,
                            py: 1,
                            px: 0,
                            opacity: 0,
                            visibility: "hidden",
                            transition: "all 0.2s ease",
                            zIndex: 10,
                            "&:hover": {
                              opacity: 1,
                              visibility: "visible",
                            },
                          }}
                          className="dropdown-menu"
                        >
                          {airportParkingOptions.map((airport) => (
                            <Typography
                              key={airport.title}
                              component={Link}
                              to={airport.path}
                              sx={{
                                display: "block",
                                color: "white",
                                fontSize: 13,
                                fontWeight: 500,
                                py: 1,
                                px: 2,
                                textDecoration: "none",
                                opacity: 0.9,
                                "&:hover": {
                                  opacity: 1,
                                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                                },
                              }}
                            >
                              {airport.title}
                            </Typography>
                          ))}
                        </Box>
                      )}

                      {/* Mobile collapsible dropdown */}
                      {isMobile && (
                        <Collapse in={airportDropdownOpen}>
                          <Box
                            sx={{
                              mt: 1,
                              display: "flex",
                              flexDirection: "column",
                              gap: 1,
                              alignItems: "center",
                            }}
                          >
                            {airportParkingOptions.map((airport) => (
                              <Typography
                                key={airport.title}
                                component={Link}
                                to={airport.path}
                                sx={{
                                  color: "white",
                                  fontSize: 13,
                                  fontWeight: 400,
                                  textDecoration: "none",
                                  opacity: 0.85,
                                  "&:hover": { opacity: 1 },
                                  pl: 2,
                                }}
                              >
                                {airport.title}
                              </Typography>
                            ))}
                          </Box>
                        </Collapse>
                      )}
                    </Box>
                  );
                }

                // Regular links
                return (
                  <Typography
                    key={name}
                    component={Link}
                    to={path}
                    sx={{
                      color: "white",
                      fontSize: 14,
                      fontWeight: 500,
                      lineHeight: 1,
                      textDecoration: "none",
                      opacity: 0.95,
                      "&:hover": { opacity: 1 },
                    }}
                  >
                    {name}
                  </Typography>
                );
              })}
            </Box>

            {/* Logos */}
            <Box
              sx={{
                justifySelf: { xs: "center", md: "end" },
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mt: { xs: 1, md: 0 },
                flexWrap: "wrap",
              }}
            >
              <Box component="img" src={visa} alt="Visa" sx={{ height: 22 }} />
              {/* <Box
                component="img"
                src={masterCard}
                alt="Mastercard"
                sx={{ height: 22 }}
              /> */}
              <Box
                component="img"
                src={amex}
                alt="American Express"
                sx={{ height: 22 }}
              />
              <Box
                component="img"
                src={discover}
                alt="Discover"
                sx={{ height: 22 }}
              />
            </Box>
          </Box>
        </PageWrapper>
      </Box>
    </Box>
  );
}
