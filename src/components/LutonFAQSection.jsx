import React, { useState } from "react";
import { Box, Container, Typography, Collapse, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function LutonFAQSection() {
  const [expandedItems, setExpandedItems] = useState({});

const faqData = [
  {
    id: "q1",
    question: "What is Luton Airport Meet & Greet parking?",
    answer:
      "This premium option lets you drive directly to the terminal, hand your keys to a valet, and head straight to departures. On return, your car is brought back to the terminal.",
  },
  {
    id: "q2",
    question: "When should I book parking at Luton Airport?",
    answer:
      "As early as possible. Prices rise closer to the travel date, especially during school holidays and peak travel times.",
  },
  {
    id: "q3",
    question: "What’s the difference between Park & Ride and Long Stay?",
    answer:
      "Long Stay is usually operated by the airport itself, while Park & Ride is often off-site with third-party providers. Both include shuttle buses, but Park & Ride is generally cheaper.",
  },
  {
    id: "q4",
    question: "Is Luton Airport parking secure?",
    answer:
      "Yes. All listed providers feature 24/7 CCTV, secure access, lighting, and many are Park Mark accredited.",
  },
  {
    id: "q5",
    question: "Can I cancel my parking booking?",
    answer:
      "Most providers allow free or low-cost cancellations up to 24–72 hours before arrival. Always check the terms before confirming.",
  },
];




  const handleToggle = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      {/* FAQ Title */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "28px", sm: "36px", md: "48px" },
          mb: 4,
          lineHeight: 1.2,
          color: "#000000",
        }}
      >
        FAQ
      </Typography>

      {/* FAQ Items */}
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
            {/* Question Header */}
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
                  fontSize: { xs: "16px", md: "18px" },
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
                    fontSize: { xs: "16px", md: "22px" },
                  }}
                >
                  Q{index + 1}:
                </Typography>
                {item.question}
              </Typography>

              {/* Expand/Collapse Arrow */}
              <IconButton
                sx={{
                  transform: expandedItems[item.id] ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                  color: "#0C2C67",
                  padding: 0,
                }}
              >
                <ExpandMoreIcon 
                sx={{
    width: { xs: "20px", sm: "20px", md: "40px" },
    height: { xs: "20px", sm: "20px", md: "40px" },
  }}
                />
              </IconButton>
            </Box>

            {/* Answer Content */}
            <Collapse in={expandedItems[item.id]} timeout="auto" unmountOnExit>
              <Box
                sx={{
                  p: { xs: 4, sm: 5 },
                  pt: 0,
                  bgcolor: "#FFFFFF",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "1.2rem", md: "1.3rem" },
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
