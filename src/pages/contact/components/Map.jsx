// src/pages/Contact/Map.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import AnimateOnScroll from "../../../components/reusable/AnimateOnScroll";
import theme from "../../../theme";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

// shared animation utils
import {
  EASE_SOFT,
  THRESHOLD,
  ROOT_MARGIN,
  smoothStyle,
} from "../../../components/utils/animation";

const BASE = 80;

export default function Map({ mapQuery = "Dublin Airport", mapZoom = 12 }) {
  return (
    <Box
      sx={{
        height: "100%",
        minHeight: 400,
        position: "relative",
        padding: "5px",
        display: "flex",
        flexDirection: "column",
      }}
    >

      {/* Map Section */}
      <Box
        sx={{
          flex: 1,
          width: "100%",
          borderRadius: 2,
          position: "relative",
          overflow: "hidden",
          willChange: "transform, opacity",
          transform: "translateZ(0)",
        }}
      >
        <iframe
          title="Location Map"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            mapQuery
          )}&z=${mapZoom}&output=embed`}
        />
      </Box>
    </Box>
  );
}
