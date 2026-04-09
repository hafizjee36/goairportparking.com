import { ButtonBase, Radio, Typography } from "@mui/material";

export default function RadioCard({ label, value, checked, onChange }) {
  return (
    <ButtonBase
      onClick={() => onChange(value)}
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 1,
        justifyContent: "flex-start",
        borderRadius: 2,
        border: "1px solid",
        borderColor: checked ? "primary.main" : "grey.300",
        bgcolor: "background.paper",
        px: 2,
        minHeight: 48,
        lineHeight: 1,
        transition: "background-color .15s ease, border-color .15s ease",
        "&:hover": { bgcolor: checked ? "rgba(46,125,50,0.06)" : "grey.100" },
      }}
    >
      <Radio
        checked={checked}
        value={value}
        onChange={() => onChange(value)}
        sx={{
          p: 0.25,
          mr: 0.5,
          color: checked ? "primary.main" : "text.secondary",
          "&.Mui-checked": { color: "primary.main" },
        }}
      />
      <Typography
        variant="body2"
        sx={{
          fontWeight: checked ? 700 : 500,
          color: checked ? "primary.main" : "text.primary",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </Typography>
    </ButtonBase>
  );
}