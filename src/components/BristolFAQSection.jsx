import React, { useState } from "react";
import { Box, Container, Typography, Collapse, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function BristolFAQSection() {
  const [expandedItems, setExpandedItems] = useState({});

const faqData = [
  {
    id: "q1",
    question: "What is Bristol Airport Meet & Greet parking?",
    answer:
      "This premium valet service lets you drive to the terminal, hand your keys to a professional driver, and head straight to departures. On return, your car will be waiting for you.",
  },
  {
    id: "q2",
    question: "When should I book parking at Bristol Airport?",
    answer:
      "For the lowest prices, book as early as possible. Prices increase closer to your travel date, especially during peak travel times.",
  },
  {
    id: "q3",
    question: "What’s the difference between Park & Ride and Long Stay?",
    answer:
      "Long Stay is usually operated by the airport, while Park & Ride is often managed off-site by third parties. Both provide shuttle transfers, but Park & Ride is generally cheaper.",
  },
  {
    id: "q4",
    question: "Are the car parks at Bristol Airport secure?",
    answer:
      "Yes. All listed providers use 24/7 CCTV, lighting, barrier controls, and many are Park Mark accredited.",
  },
  {
    id: "q5",
    question: "Can I cancel or change my booking?",
    answer:
      "Most providers allow cancellations or amendments up to 24–72 hours before travel. Always review provider terms before booking.",
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
