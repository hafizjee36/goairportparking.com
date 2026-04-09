import React, { useState } from "react";
import { Box, Container, Typography, Collapse, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function DubaiFAQSection() {
  const [expandedItems, setExpandedItems] = useState({});

  const faqData = [ 
    {
      id: "q1",
      question: "What is Dubai Airport Meet & Greet parking?",
      answer: "It’s a premium service where you drive directly to the terminal, hand your keys to a valet, and head straight to check-in. When you return, your car is ready for pickup at the terminal. Fast and hassle-free."
    },
    {
      id: "q2", 
      question: "When should I book my parking for Dubai Airport?",
      answer: "For the best deals, book as early as possible. Prices typically increase closer to your travel date, especially during peak times."
    },
    {
      id: "q3",
      question: "What’s the difference between Park & Ride and Long Stay?",
      answer: "Long Stay is often run by the airport itself, while Park & Ride services may be operated off-site by third-party providers. Both include shuttle transfers, but Park & Ride is usually more budget-friendly."
    },
    {
      id: "q4",
      question: "Are the parking areas secure?",
      answer: "Yes. We list only secure, reputable providers with 24/7 CCTV, secure entry/exit, lighting, and often security patrols. Accreditation such as Park Mark or local equivalents is highlighted."
    },
    {
      id: "q5",
      question: "Can I cancel or change my booking later?",
      answer: "Most providers allow cancellations or changes up to 24–72 hours before your booking. Always read the provider’s terms before confirming your reservation."
    }
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
