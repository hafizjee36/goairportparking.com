import { useNavigate } from "react-router-dom";
import { Modal, Box, Typography, Grid, Button, Divider } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CustomButton from "../../reusable/CustomButton";
import theme from "../../../theme";

const packages = [
  {
    id: 1,
    name: "Official Long Stay - Onsite",
    sub: "Parking Only",
    price: "£72.10",
    selectedName: "Official Long Stay - Onsite",
    entry: "Entry: 09 August, 2025 - 04:00pm",
    exit: "Exit: 09 August, 2025 - 04:00pm",
  },
  {
    id: 2,
    name: "Official Long Stay - Onsite",
    sub: "Parking Only",
    price: "£72.10",
    selectedName: "Official Long Stay - Onsite",
    entry: "Entry: 09 August, 2025 - 04:00pm",
    exit: "Exit: 09 August, 2025 - 04:00pm",
  },
  {
    id: 3,
    name: "Official Long Stay - Onsite",
    sub: "Parking Only",
    price: "£72.10",
    selectedName: "Official Long Stay - Onsite",
    entry: "Entry: 09 August, 2025 - 04:00pm",
    exit: "Exit: 09 August, 2025 - 04:00pm",
  },
];

export default function SelectYourPackage({ open, onClose }) {
  const navigate = useNavigate();

  const handleSelectPackage = (packageData) => {
    // Close the modal first
    onClose();

    // Navigate to the desired page
    // You can pass package data as state if needed
    navigate("/extra", {
      state: {
        selectedPackage: packageData,
      },
    });
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: { xs: "100%", sm: "90%", md: "70vh" },
          width: { xs: "100%", sm: "90%", md: 1280 },
          bgcolor: "background.default",
          borderRadius: 3,
          boxShadow: 24,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: theme.palette.background.paper,
            gap: 2,
            px: { xs: 2, md: 4 },
            pt: { xs: 2.5, md: 4 },
            pb: { xs: 2, md: 3 },
            flexShrink: 0, // don't let it shrink
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
            }}
          >
            Select Your Package
          </Typography>

          <Button
            onClick={onClose}
            startIcon={<ArrowBackIosNewIcon sx={{ width: 15, height: 15 }} />}
            sx={{
              color: "text.secondary",
              fontWeight: 500,
              textTransform: "none",
              bgcolor: "transparent",
              "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
              borderRadius: 2,
            }}
          >
            Back
          </Button>
        </Box>

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            bgcolor: theme.palette.background.default,
          }}
        >
          <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 2, md: 4 } }}>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {packages.map((p) => (
                <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Box
                    sx={{
                      bgcolor: "#fff",
                      borderRadius: 3,
                      p: { xs: 2, md: 3 },
                      border: "1px solid",
                      borderColor: theme.palette.background.default,
                      boxShadow:
                        "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 2,
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 800, lineHeight: 1.2 }}
                        >
                          {p.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          {p.sub}
                        </Typography>
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 800, whiteSpace: "nowrap" }}
                      >
                        {p.price}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckCircleIcon
                        sx={{ color: theme.palette.primary.main }}
                        fontSize="small"
                      />
                      <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                        {p.selectedName}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "grid", gap: 1.25 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <AccessTimeIcon color="action" fontSize="small" />
                        <Typography variant="body2" color="text.secondary">
                          {p.entry}
                        </Typography>
                      </Box>
                      <Box sx={{ ml: 1.1 }}>
                        <Box
                          sx={{
                            borderLeft: "2px dashed",
                            borderColor: "divider",
                            height: 20,
                          }}
                        />
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <AccessTimeIcon color="action" fontSize="small" />
                        <Typography variant="body2" color="text.secondary">
                          {p.exit}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 1 }} />

                    <Box sx={{ mt: "auto" }}>
                      <CustomButton
                        onClick={() => handleSelectPackage(p)}
                        fullWidth
                        variant="contained"
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: 16, md: 18 },
                          py: 1.5,
                        }}
                      >
                        Select
                      </CustomButton>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
