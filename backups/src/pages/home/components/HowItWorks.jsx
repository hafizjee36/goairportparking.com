import { memo } from "react";
import { Box, Typography, Stack } from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import parking from "../../../assets/optimized/1b0840776b21f3f8908b3685fad031c1ee8cb856.webp";
import calender from "../../../assets/optimized/da31a5c7369c107b818c4fd5df95be211a61a6c3.webp";
import car from "../../../assets/optimized/c12e6095040749304b2a63f1ee26408bc620485e.webp";
import PageWrapper from "../../../components/reusable/PageWrapper";
import theme from "../../../theme";

function HowItWorks() {
  const IMAGE = { w: 90, h: 90 };

  const Step = ({ img, title, subtitle }) => (
    <Stack
      spacing={1.25}
      alignItems="center"
      textAlign="center"
      sx={{
        py: 4,
        cursor: "pointer",
        "&:hover img": {
          animation: "wobble-horizontal 1s ease-in-out 1",
        },
        "@keyframes wobble-horizontal": {
          "0%": { transform: "translateX(0)" },
          "16.65%": { transform: "translateX(8px)" },
          "33.3%": { transform: "translateX(-6px)" },
          "49.95%": { transform: "translateX(4px)" },
          "66.6%": { transform: "translateX(-2px)" },
          "83.25%": { transform: "translateX(1px)" },
          "100%": { transform: "translateX(0)" },
        },
      }}
    >
      <Box
        component="img"
        src={img}
        alt={title}
        loading="lazy"
        sx={{
          width: IMAGE.w,
          height: IMAGE.h,
          objectFit: "contain",
          transition: "transform 0.3s ease, filter 0.3s ease",
          transformOrigin: "right end",
        }}
      />
      <Typography variant="subtitle1" fontWeight={700}>
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: theme.palette.text.secondary,
          maxWidth: 220,
          lineHeight: 1.5,
        }}
      >
        {subtitle}
      </Typography>
    </Stack>
  );

  const Connector = () => (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        flex: "0 0 160px", // fixed length between steps
        position: "relative",
        height: IMAGE.h,
      }}
    >
      {/* dashed line */}
      <Box sx={{ flex: 1, borderBottom: "2px dashed rgba(0,0,0,0.25)" }} />
      {/* circle with plane */}
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: `2px solid ${theme.palette.primary.main}`,
          backgroundColor: theme.palette.background.default,
          display: "grid",
          placeItems: "center",
          boxShadow: "0 1px 0 rgba(0,0,0,0.08)",
        }}
      >
        <FlightIcon
          sx={{
            fontSize: 16,
            color: theme.palette.text.disabled,
            transform: "rotate(90deg)",
          }}
        />
      </Box>
    </Box>
  );

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      <PageWrapper>
        <Box
          sx={{
            // px: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Step
            img={calender}
            title="Select Dates"
            subtitle="Start In A Blink Of An Eye"
          />
          <Connector />
          <Step
            img={parking}
            title="Choose Parking Product"
            subtitle="Choose Parking Product That Suits Your Need & Budget"
          />
          <Connector />
          <Step
            img={car}
            title="Easy to Book"
            subtitle="Just Confirm Details & Pay With An Easy & Fast Booking Process"
          />
        </Box>
      </PageWrapper>
    </Box>
  );
}

export default memo(HowItWorks);
