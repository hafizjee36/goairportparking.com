import { Box } from "@mui/material";

export default function PageWrapper({ children }) {
  return (
    <Box sx={{ width: {xs:"95%" ,md:"90%"}, maxWidth: "1200px", mx: "auto", px: 2 }}>
      {children}
    </Box>
  );
}
