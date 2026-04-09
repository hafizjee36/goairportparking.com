import { FormControl, FormLabel, RadioGroup } from "@mui/material";
import RadioCard from "./RadioCard";

export default function RadioCardGroup({
  label,
  name,
  value,
  onChange,
  options,
  columns = { xs: 1, sm: 3 },
}) {
  const colsToTemplate = (n) =>
    typeof n === "number" ? `repeat(${n}, 1fr)` : n;
  const gridCols = Object.fromEntries(
    Object.entries(columns).map(([bp, n]) => [bp, colsToTemplate(n)])
  );

  return (
    <FormControl fullWidth>
      <FormLabel sx={{ mb: 0.75, color: "text.primary", fontWeight: 600 }}>
        {label}
      </FormLabel>
      <RadioGroup
        name={name}
        value={value}
        onChange={(_, v) => onChange(v)}
        sx={{
          display: "grid",
          gridTemplateColumns: gridCols,
          gap: 1,
        }}
      >
        {options.map((opt) => (
          <RadioCard
            key={opt.value}
            label={opt.label}
            value={opt.value}
            checked={value === opt.value}
            onChange={onChange}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
