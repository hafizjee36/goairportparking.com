// ExtraCard.jsx
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CustomButton from "../../../components/reusable/CustomButton";

export default function ExtraCard({ item, onAdd }) {
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        p: 2,
        width: "100%",
      }}
    >
      {/* Top Row: Image and Content Side by Side */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "stretch",
        }}
      >
        {/* Left: Image */}
        <Box
          sx={{
            position: "relative",
            width: { xs: "100%", sm: 240 },
            minHeight: 180,
            maxHeight: 180,
            backgroundImage: `url(${item.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 2,
            border: "1px solid #ccc",
            flexShrink: 0,
          }}
        >
          <Chip
            label="More info"
            size="small"
            icon={<InfoOutlinedIcon />}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              bgcolor: "rgba(0,0,0,0.7)",
              color: "#fff",
              "& .MuiChip-icon": { color: "#fff" },
            }}
          />
        </Box>

        {/* Right: Content */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <CardContent
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: { xs: 2, sm: 3 },
              pb: 0,
            }}
          >
            <Typography variant="subtitle1" fontWeight={700} mb={1}>
              {item.title}
            </Typography>

            <Stack spacing={0.5} mb={2}>
              {item.bullets.map((b, i) => (
                <Stack key={i} direction="row" spacing={1} alignItems="center">
                  <CheckCircleIcon fontSize="small" color="primary" />
                  <Typography variant="body2" color="text.secondary">
                    {b}
                  </Typography>
                </Stack>
              ))}
            </Stack>

            <Box mb={2}>
              <Typography variant="h5" fontWeight="bold">
                £{item.price}
                <Typography variant="caption" color="text.secondary">
                  / for 1 Adult
                </Typography>
              </Typography>
            </Box>
          </CardContent>
        </Box>
      </Box>

      {/* Bottom Section: Full Width */}
      <Box sx={{ px: { xs: 2, sm: 3 }, pb: 2, pt: 1 }}>
        <Divider sx={{ mb: 1.5 }} />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <Typography variant="caption" color="text.secondary" component="div">
            <Box display="flex" alignItems="center">
              <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
              Entry: {item.entry}
            </Box>
          </Typography>

          <CustomButton
            variant="outlined"
            color="primary"
            sx={{ textTransform: "none", px: 3 }}
            onClick={() =>
              onAdd?.({ id: item.id, title: item.title, price: item.price })
            }
          >
            Add to Basket
          </CustomButton>
        </Stack>
      </Box>
    </Card>
  );
}
