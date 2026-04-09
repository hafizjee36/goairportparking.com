import { Box, Grid, Typography, IconButton, Tooltip } from "@mui/material";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import PageWrapper from "../../../components/reusable/PageWrapper";
// import gif from "../../../assets/gif-1.gif";
import BG from "../../../assets/optimized/subscribe-image.webp";
// ⬇️ swap to the Framer version
import AnimateOnScroll from "../../../components/reusable/AnimateOnScroll";
import { EASE_SOFT } from "../../../components/utils/animation";
import { useState, memo } from "react";
import theme from "../../../theme";

function Subscribe() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const emailRegex =
    /^(?!.*\.\.)[A-Za-z0-9](?:[A-Za-z0-9._%+-]*[A-Za-z0-9])?@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    console.log("Valid email submitted:", email);
    // 👉 Call API here
  };

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        backgroundImage: `url(${BG})`,
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
            "linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.10) 100%)",
        }}
      />

      <PageWrapper>
        <Grid
          container
          alignItems="center"
          spacing={3}
          sx={{
            position: "relative",
            zIndex: 1,
            py: { xs: 4, md: 6 },
          }}
        >
          {/* Left content */}
          <Grid size={{ xs: 12, md: 6 }}>
            <AnimateOnScroll
              type="slide-up"
              duration={1700}
              delay={0}
              distance={24}
              threshold={0.3}
              rootMargin="0px 0px -12% 0px"
              easingTransform={EASE_SOFT}
              easingOpacity={EASE_SOFT}
            >
              <Typography
                variant="h3"
                sx={{
                  color: "#fff",
                  fontWeight: 800,
                  lineHeight: 1.05,
                  mb: 1.5,
                  fontSize: { xs: 32, sm: 38, md: 44 },
                }}
              >
                Subscribe & Get
                <br /> Special Discount!
              </Typography>
            </AnimateOnScroll>

            <AnimateOnScroll
              type="fade"
              duration={1500}
              delay={140}
              threshold={0.3}
              rootMargin="0px 0px -12% 0px"
              easingOpacity={EASE_SOFT}
            >
              <Typography
                variant="body1"
                sx={{ color: "rgba(255,255,255,0.9)" }}
              >
                Subscribe today and secure your spot with our parking booking
                system. Get a special discount waiting just for you!
              </Typography>
            </AnimateOnScroll>
          </Grid>

          {/* Right form */}
          <Grid size={{ xs: 12, md: 6 }}>
            <AnimateOnScroll
              type="slide-left"
              duration={1850}
              delay={220}
              distance={26}
              threshold={0.3}
              rootMargin="0px 0px -12% 0px"
              easingTransform={EASE_SOFT}
              easingOpacity={EASE_SOFT}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Tooltip
                  title={error || ""}
                  placement="top"
                  arrow
                  open={!!error}
                  disableHoverListener
                  disableFocusListener
                  disableTouchListener
                  slotProps={{
                    popper: {
                      sx: {
                        "& .MuiTooltip-tooltip": {
                          fontSize: "14px", // increase text size
                          padding: "10px 14px", // more padding
                          maxWidth: 280, // wider box
                        },
                        "& .MuiTooltip-arrow": {
                          fontSize: "1.2rem", // bigger arrow
                        },
                      },
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      bgcolor: "#fff",
                      borderRadius: 999,
                      px: 2,
                      py: 1,
                      boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                      willChange: "transform, opacity",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <Box
                      component="input"
                      type="text" // ⬅️ change from "email" to "text"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      sx={{
                        flex: 1,
                        border: "none",
                        outline: "none",
                        fontSize: { xs: 14, md: 16 },
                        px: 1,
                        py: 1.2,
                        fontFamily: "inherit",
                        backgroundColor: "transparent",
                        minWidth: 0,
                      }}
                    />
                    <IconButton
                      type="submit"
                      sx={{
                        ml: 1,
                        bgcolor: "primary.main",
                        color: "#fff",
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        "&:hover": { bgcolor: theme.palette.primaryLight.main },
                      }}
                      aria-label="Subscribe"
                    >
                      <NorthEastRoundedIcon />
                    </IconButton>
                  </Box>
                </Tooltip>
              </Box>
            </AnimateOnScroll>
          </Grid>
        </Grid>
      </PageWrapper>
    </Box>
  );
}

export default memo(Subscribe);
