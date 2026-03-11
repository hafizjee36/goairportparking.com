import { Box, InputBase, Typography } from "@mui/material";
import ErrorMessage from "./ErrorMessage";



export default function DiscountCodeField({
  label = "Discount Code",
  value,
  onChange,
  placeholder = "Enter code",
  error,
  helperText,
  disabled = false,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          border: error ? "1px solid #d32f2f" : "1px solid #E3E6EA",
          borderRadius: 3,
          px: 2,
          py: 3.5,
          maxHeight: 45,
          bgcolor: disabled ? "#f5f5f5" : "#fff",
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "border-color .15s ease, opacity .15s ease",
          "&:hover": {
            borderColor: disabled ? "#E3E6EA" : error ? "#d32f2f" : "#D4D9DE",
          },
          // "&:focus-within": {
          //   borderColor: disabled ? "#E3E6EA" : error ? "#d32f2f" : "#1976d2",
          //   outline:
          //     disabled || error ? "none" : "2px solid rgba(25,118,210,.35)",
          //   outlineOffset: "2px",
          // },
        }}
        onClick={(e) => {
          if (disabled) return;
          const input = e.currentTarget.querySelector("input");
          input?.focus();
        }}
      >
        <Box sx={{ minWidth: 0, width: "100%" }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, lineHeight: 1, mb: 0.5, fontSize: "16px" }}
          >
            {label}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <InputBase
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              fullWidth
              disabled={disabled}
              inputProps={{ "aria-label": "discount code", maxLength: 10 }}
              sx={{
                fontSize: 12,
                fontWeight: 400,
                lineHeight: 1,
                color: value ? "text.primary" : "text.secondary",
                "& .MuiInputBase-input": { p: 0 },
                "& input::placeholder": {
                  color: (t) => t.palette.text.disabled,
                  opacity: 1,
                  fontWeight: 400,
                },
                "& .Mui-disabled": {
                  color: "text.disabled",
                },
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </Box>
        </Box>
      </Box>
      <ErrorMessage error={helperText} show={!!helperText} />
    </Box>
  );
}
