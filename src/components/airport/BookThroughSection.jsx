import React from "react";
import { Box, Container, Typography, List, ListItem } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import theme from "../../theme";

export default function BookThroughSection({ airportConfig }) {
  const section = airportConfig?.bookThroughSection;

  if (!section || !section.items?.length) return null;

  return (
    <Box sx={{ py: { xs: 5, md: 8 }, backgroundColor: "#fff" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            mb: 4,
            fontSize: { xs: "28px", md: "40px" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {section.title}
        </Typography>

        <List
          sx={{
            "& .MuiListItem-root": {
              display: "flex",
              alignItems: "flex-start",
              py: 1.25,
              px: 0,
            },
          }}
        >
          {section.items.map((item, index) => (
            <ListItem key={index}>
              <CheckCircleRoundedIcon
                fontSize="small"
                sx={{
                  color: theme.palette.primary.main,
                  mt: "4px",
                  mr: 1.5,
                  flexShrink: 0,
                }}
              />

              <Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    mb: 0.5,
                    fontSize: { xs: "16px", md: "18px" },
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.7,
                    fontSize: { xs: "14px", md: "16px" },
                  }}
                >
                  {item.description}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
}