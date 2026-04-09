import React, { useState } from "react";
import { Box, Container, Typography, Collapse, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQSection({ airportConfig, sectionData }) {
  const [expandedItems, setExpandedItems] = useState({});
  const airportName = airportConfig.name;
  const faqData = sectionData?.faq || [];

  const handleToggle = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "2.3rem", sm: "3rem", md: "4rem" },
          mb: 4,
          lineHeight: 1.2,
          color: "#000000",
        }}
      >
        FAQ
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {faqData.map((item, index) => (
          <Box
            key={item.id}
            sx={{
              border: "2px solid #FFBC2F",
              borderRadius: 2,
              overflow: "hidden",
              bgcolor: "#FFFFFF",
            }}
          >
            <Box
              onClick={() => handleToggle(item.id)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: { xs: 4, sm: 5 },
                cursor: "pointer",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "1.125rem", md: "1.25rem" },
                  color: "#252654",
                  lineHeight: 1.4,
                  flex: 1,
                  pr: 2,
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    color: "#FFBC2F",
                    fontWeight: 700,
                    mr: 1,
                    fontSize: { xs: "1.125rem", md: "1.375rem" },
                  }}
                >
                  Q{index + 1}:
                </Typography>
                {item.question}
              </Typography>
              <IconButton
                sx={{
                  transform: expandedItems[item.id] ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                  color: "#0C2C67",
                  p: 0,
                }}
              >
                <ExpandMoreIcon sx={{ width: { xs: "1.25rem", md: "2.5rem" }, height: { xs: "1.25rem", md: "2.5rem" } }} />
              </IconButton>
            </Box>

            <Collapse in={expandedItems[item.id]} timeout="auto" unmountOnExit>
              <Box sx={{ p: { xs: 4, sm: 5 }, pt: 0, bgcolor: "#FFFFFF" }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "1.125rem", md: "1.25rem" },
                    lineHeight: 1.6,
                    color: "#333333",
                  }}
                >
                  {item.answer}
                </Typography>
              </Box>
            </Collapse>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

