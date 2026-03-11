import { Box, Typography } from "@mui/material";

export default function ParkingCard({ 
  number, 
  title, 
  titleColor = "#F59E0B", 
  description, 
  image, 
  onClick 
}) {
  const renderTitle = () => {
    if (title === "Meet & Greet") {
      return (
        <>
          <span style={{ color: "#252654" }}>Meet & </span>
          <span style={{ color: titleColor }}>Greet</span>
        </>
      );
    }
    if (title === "Terminal Parking") {
      return (
        <>
          <span style={{ color: "#252654" }}>Terminal</span>
          <span style={{ color: titleColor}}> Parking</span>
        </>
      );
    }
    if (title === "Long Stay Parking") {
      return (
        <>
          <span style={{ color: "#252654" }}>Long Stay</span>
          <span style={{ color: titleColor }}> Parking</span>
        </>
      );
    }
    if (title === "Park & Ride") {
      return (
        <>
          <span style={{ color: "#252654" }}>Park & </span>
          <span style={{ color: titleColor }}>Ride</span>
        </>
      );
    }
    // Default rendering for any other title
    return <span style={{ color: "#252654" }}>{title}</span>;
  };

  return (
    <Box
      onClick={onClick}
      sx={{
        position: "relative",
        borderRadius: 4,
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        bgcolor: "white",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
        },
      }}
    >
    {/* Image Section */}
<Box
  sx={{
    position: "relative",
    height: 200,
    overflow: "visible", 
    marginX: "5px"
  }}
>
  <Box
    component="img"
    src={image}
    alt={title}
    sx={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    }}
  />

  {/* Number Circle */}
  <Box
    sx={{
      position: "absolute",
      bottom: -18, // 👈 ab card ke bahar ayega
      right: 16,
      width: 50,
      height: 50,
      borderRadius: "50%",
      bgcolor: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      border: `3px solid #252654`,
      zIndex: 2,
    }}
  >
    <Typography
      sx={{
        fontWeight: 700,
        fontSize: "1.5rem",
        color: titleColor,
      }}
    >
      {number}
    </Typography>
  </Box>
</Box>


      {/* Content Section */}
      <Box
        sx={{
          p: "10px",
          backgroundColor: "white",
        }}
      >
        {/* Title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            fontSize: "1.5rem",
            mb: 2,
            lineHeight: 1.2,
          }}
        >
          {renderTitle()}
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            fontSize: "12px",
            lineHeight: 1.5,
            color: "#000000",
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
}
