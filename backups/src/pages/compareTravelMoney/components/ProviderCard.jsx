import { Box, Button, Grid, Typography } from "@mui/material";
import CustomButton from "../../../components/reusable/CustomButton"; // Import CustomButton

export default function ProviderCard({ item }) {
  return (
    <Box
      sx={{
        borderRadius: 2,
        p: 2,
        border: "1px solid",
        borderColor: "grey.200",
        bgcolor: "background.paper",
        position: "relative",
      }}
    >
      {/* More info pill */}
      <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          borderRadius: 999,
          px: 1,
          py: 0.5,
          fontSize: 11,
          bgcolor: "primary.main",
          color: "#fff",
          lineHeight: 1,
        }}
      >
        More info
      </Box>

      {/* Logo */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 56,
          mb: 1.5,
        }}
      >
        {item.logo ? (
          <Box
            component="img"
            src={item.logo}
            alt={item.name}
            sx={{ maxHeight: 45, maxWidth: "100%" }}
          />
        ) : (
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {item.name}
          </Typography>
        )}
      </Box>

      {/* Metrics */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 4 }}>
          <Typography variant="caption" color="text.secondary" display="block">
            You receive
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            {item.youReceive}
          </Typography>
        </Grid>
        <Grid size={{ xs: 4 }}>
          <Typography variant="caption" color="text.secondary" display="block">
            Exchange rate
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            {item.rate}
          </Typography>
        </Grid>
        <Grid size={{ xs: 4 }}>
          <Typography variant="caption" color="text.secondary" display="block">
            Insured delivery
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            {item.insuredDelivery}
          </Typography>
        </Grid>
      </Grid>

      {/* CTA */}
      <CustomButton
        fullWidth
        variant="contained"
        disableElevation
        sx={{
          textTransform: "none",
          fontWeight: 700,
        }}
      >
        Buy Now
      </CustomButton>
    </Box>
  );
}
