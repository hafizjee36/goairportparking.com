// src/components/reusable/ContactItem.jsx
import { Box, Typography } from "@mui/material";

const ContactItem = ({ icon, text }) => {
  let isCustomerNumber = false;
  let label = "";
  let value = text;

  if (text.startsWith("Customer Service Number")) {
    isCustomerNumber = true;
    label = "Customer Service Number";
    value = text.replace(label, "").trim(); // keep number only
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: isCustomerNumber ? "flex-start" : "center",
        gap: 1.5,
        justifyContent: "left",
        textAlign: "left",
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "1px solid rgba(19, 17, 17, 0.28)",
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
        }}
      >
        <Box sx={{ p: 0.5, display: "grid", placeItems: "center" }}>{icon}</Box>
      </Box>

      {/* Text */}
      {isCustomerNumber ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
              color: "gray",
              fontWeight: 500,
              textAlign: "left",
            }}
          >
            {label}
          </Typography>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 600,
              color: "black",
              textAlign: "left",
            }}
          >
            {value}
          </Typography>
        </Box>
      ) : (
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 600,
            color: "black",
            textAlign: "left",
          }}
        >
          {text}
        </Typography>
      )}
    </Box>
  );
};

export default ContactItem;
