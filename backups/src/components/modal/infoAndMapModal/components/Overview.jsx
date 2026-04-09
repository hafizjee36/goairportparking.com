import { Box, Typography, CircularProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";

/* ---------------- small atoms ---------------- */
function FeatureIcon({ icon, label }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
      {icon}
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {label}
      </Typography>
    </Box>
  );
}

export default function Overview({ productData, isLoading }) {
  const rootRef = useRef(null);
  const [visibleSteps, setVisibleSteps] = useState(1);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const n = Number(e.target.dataset.step);
            setVisibleSteps((prev) => Math.max(prev, n));
          }
        });
      },
      { root, threshold: 0.35 }
    );

    root.querySelectorAll("[data-step]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const stepSx = (n) => ({
    opacity: visibleSteps >= n ? 1 : 0,
    transform: visibleSteps >= n ? "none" : "translateY(14px)",
    transition: "opacity .35s ease, transform .35s ease",
  });

  return (
    <Box
      ref={rootRef}
      sx={{
        overflowY: "auto",
        maxHeight: "70vh",
        pr: 1,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>
        Overview
      </Typography>
      
      {/* Show loading spinner while fetching details */}
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
          <CircularProgress size={40} />
          <Typography variant="body2" sx={{ ml: 2, color: 'text.secondary' }}>
            Loading details...
          </Typography>
        </Box>
      ) : (
        <>
          {/* Display details content from API if available */}
          {productData?.details ? (
            <Box
              sx={{
                mb: 2,
                '& ul': {
                  pl: 2,
                  mb: 2,
                },
                '& li': {
                  mb: 1,
                  color: 'text.primary',
                },
                '& h3': {
                  fontWeight: 700,
                  mb: 1,
                  mt: 2,
                  color: 'text.primary',
                },
                '& p': {
                  mb: 1,
                  color: 'text.secondary',
                  lineHeight: 1.6,
                },
                '& strong': {
                  fontWeight: 600,
                  color: 'text.primary',
                },
              }}
              dangerouslySetInnerHTML={{ __html: productData.details }}
            />
          ) : (
            /* Fallback to short_description or features if details not available */
            <>
              {productData?.short_description && (
                <Box
                  sx={{
                    mb: 2,
                    '& ul': { pl: 2, mb: 2 },
                    '& li': { mb: 1, color: 'text.primary' },
                    '& strong': { fontWeight: 600, color: 'text.primary' },
                  }}
                  dangerouslySetInnerHTML={{ __html: productData.short_description }}
                />
              )}
              
              {productData?.features && (
                <Box
                  sx={{
                    mb: 2,
                    '& ul': { pl: 2, mb: 2 },
                    '& li': { mb: 1, color: 'text.primary' },
                    '& strong': { fontWeight: 600, color: 'text.primary' },
                  }}
                  dangerouslySetInnerHTML={{ __html: productData.features }}
                />
              )}
              
              {/* Show message if no overview content available */}
              {!productData?.short_description && !productData?.features && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontStyle: 'italic' }}>
                  Overview information is not available for this service.
                </Typography>
              )}
            </>
          )}
          
          {/* Show offer information if available */}
          {productData?.offer && (
            <Typography variant="body2" sx={{ mb: 2, color: "primary.main", fontWeight: 600 }}>
              ✨ {productData.offer}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
}
