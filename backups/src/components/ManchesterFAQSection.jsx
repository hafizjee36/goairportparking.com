import React, { useState } from "react";
import { Box, Container, Typography, Collapse, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ManchesterFAQSection() {
  const [expandedItems, setExpandedItems] = useState({});

  const faqData = [
    {
      id: "q1",
      question: "What is Manchester Airport Meet & Greet?",
      answer: "Meet & Greet parking means you drive to the airport terminal, hand over your car to a trained attendant, and go straight to check-in. When you return, your car will be waiting for you at the same terminal. It's the most convenient option."
    },
    {
      id: "q2", 
      question: "How far in advance should I book to get best prices?",
      answer: "Booking as early as possible can save up to 50-70% compared to on-the-day or last-minute rates. Availability also tends to drop and prices increase close to travel dates."
    },
    {
      id: "q3",
      question: "What does \"long stay\" mean at Manchester Airport?",
      answer: "Long stay refers to car parks designed for multi-day stays (often 3 days or more). These may be slightly further from terminals, but usually offer free or frequent shuttle bus/ride services."
    },
    {
      id: "q4",
      question: "Are the parking options safe and secure?",
      answer: "Yes. Many are accredited (Park Mark), have CCTV, secure entry/exit, well-lit areas, and are monitored. We highlight these credentials in our comparisons so you can pick a parking option you trust."
    },
    {
      id: "q5",
      question: "Can I cancel or change my booking?",
      answer: "Most official and comparison providers allow cancellation or amendments up to a certain period (often 24-72 hours prior). Always check the terms of your chosen provider before booking."
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
