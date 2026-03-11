import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputAdornment,
} from "@mui/material";
import ReactCountryFlag from "react-country-flag";

// --- constants & helpers (same as yours) ---
const COUNTRIES = [
  { iso2: "GB", name: "United Kingdom", dial: "44", min: 9, max: 10 },
  { iso2: "US", name: "United States", dial: "1", min: 10, max: 10 },
  { iso2: "CA", name: "Canada", dial: "1", min: 10, max: 10 },
  { iso2: "IN", name: "India", dial: "91", min: 10, max: 10 },
  { iso2: "AU", name: "Australia", dial: "61", min: 9, max: 9 },
  { iso2: "NZ", name: "New Zealand", dial: "64", min: 8, max: 9 },
  { iso2: "DE", name: "Germany", dial: "49", min: 10, max: 11 },
  { iso2: "FR", name: "France", dial: "33", min: 9, max: 9 },
  { iso2: "ES", name: "Spain", dial: "34", min: 9, max: 9 },
  { iso2: "IT", name: "Italy", dial: "39", min: 9, max: 10 },
  { iso2: "NL", name: "Netherlands", dial: "31", min: 9, max: 9 },
  { iso2: "IE", name: "Ireland", dial: "353", min: 9, max: 9 },
  { iso2: "SG", name: "Singapore", dial: "65", min: 8, max: 8 },
  { iso2: "AE", name: "UAE", dial: "971", min: 9, max: 9 },
];
const E164_MAX = 15;
const digitsOnly = (s = "") => s.replace(/\D/g, "");
const guessCountry = (value, list, fallbackIso2) => {
  const v = String(value || "");
  const digits = digitsOnly(v.startsWith("+") ? v.slice(1) : v);
  let best = null;
  for (const c of list) {
    if (
      digits.startsWith(c.dial) &&
      (!best || c.dial.length > best.dial.length)
    )
      best = c;
  }
  return best || list.find((c) => c.iso2 === (fallbackIso2 || "GB")) || list[0];
};
const composeE164 = (dial, nsn) => {
  const cc = String(dial || "");
  const d = digitsOnly(String(nsn || ""));
  const room = Math.max(E164_MAX - cc.length, 0);
  return `+${cc}${d.slice(0, room)}`;
};
const FlagCircle = ({ iso2, size = 20, title }) => (
  <Box
    sx={{
      width: size,
      height: size,
      borderRadius: "50%",
      overflow: "hidden",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
      flexShrink: 0,
    }}
    aria-label={title || `${iso2} flag`}
  >
    <ReactCountryFlag
      countryCode={iso2}
      svg
      style={{ width: "100%", height: "100%" }}
    />
  </Box>
);

// --- component ---
export default function CustomPhoneInput({
  value = "", // expects E.164 like "+44..."
  onChange = () => {},
  label = "Phone number",
  required = false,
  defaultCountry = "GB",
  onlyCountries,
  clampToMax = true,
  externalError = false, // mirror CustomInput
  helperText = "", // mirror CustomInput
  fullWidth = true,
  placeholder = "1234567890",
  disableBrowserValidation = true, // mirror CustomInput
  trimOnBlur = true, // mirror CustomInput
}) {
  const rootRef = useRef(null);
  const inputRef = useRef(null); // inner input (for browser validation suppression)
  const [internalError, setInternalError] = useState("");
  const [touched, setTouched] = useState(false); // show validation post-blur like CustomInput

  // external overrides internal
  const displayError = externalError ? helperText : internalError;
  const hasError = Boolean(displayError);

  // countries list (allow-list if provided)
  const countryList = useMemo(() => {
    if (!onlyCountries?.length) return COUNTRIES;
    const allow = new Set(onlyCountries.map((c) => c.toUpperCase()));
    return COUNTRIES.filter((c) => allow.has(c.iso2));
  }, [onlyCountries]);

  // derive country from value or fallback
  const selectedCountry = useMemo(
    () => guessCountry(value, countryList, defaultCountry),
    [value, countryList, defaultCountry]
  );

  // derive nsn from E.164
  const allDigits = digitsOnly(value.startsWith("+") ? value.slice(1) : value);
  const nsn = allDigits.slice(selectedCountry.dial.length);
  const nsnLen = nsn.length;

  // keep internal error clear when parent supplies external error
  useEffect(() => {
    if (externalError && helperText) setInternalError("");
  }, [externalError, helperText]);

  // prevent browser validation (like CustomInput)
  useEffect(() => {
    if (!disableBrowserValidation || !inputRef.current) return;
    const native = inputRef.current.querySelector("input");
    if (!native) return;

    const preventValidation = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const clearValidity = (e) => e.target.setCustomValidity("");

    native.addEventListener("invalid", preventValidation);
    native.addEventListener("blur", clearValidity);

    return () => {
      native.removeEventListener("invalid", preventValidation);
      native.removeEventListener("blur", clearValidity);
    };
  }, [disableBrowserValidation]);

  // validation logic (same philosophy as CustomInput)
  const handleValidation = (valNsn, ctry) => {
    if (externalError) return true; // parent owns error state
    const len = (valNsn || "").length;
    if (required && len === 0) {
      setInternalError(`${label || "Field"} is required`);
      return false;
    }
    // validate length for the selected country
    const ok = len === 0 || (len >= ctry.min && len <= ctry.max);
    if (!ok) {
      setInternalError(
        `Must be ${ctry.min}${
          ctry.min !== ctry.max ? `–${ctry.max}` : ""
        } digits for ${ctry.name}`
      );
      return false;
    }
    setInternalError("");
    return true;
  };

  // composite blur: validate only when leaving the whole control
  const handleCompositeBlur = (e) => {
    const next = e.relatedTarget;
    if (!rootRef.current || !next || !rootRef.current.contains(next)) {
      const trimmed = trimOnBlur ? nsn.trim() : nsn;
      // if we trimmed, push value back (preserve country code)
      if (trimOnBlur && trimmed !== nsn) {
        const nextVal = composeE164(selectedCountry.dial, trimmed);
        if (nextVal !== value) onChange(nextVal);
      }
      setTouched(true);
      handleValidation(trimmed, selectedCountry);
      // clear browser validation state
      if (disableBrowserValidation) {
        const native = inputRef.current?.querySelector("input");
        native?.setCustomValidity("");
      }
    }
  };

  const handleCountryChange = (e) => {
    const iso2 = e.target.value;
    const next = countryList.find((c) => c.iso2 === iso2) || selectedCountry;
    const nextNsn = clampToMax ? nsn.slice(0, next.max) : nsn;
    const nextVal = composeE164(next.dial, nextNsn);
    if (nextVal !== value) onChange(nextVal);

    // if user already blurred (touched), re-validate under new country rules
    if (touched && !externalError) {
      handleValidation(nextNsn, next);
    }
  };

  const handleNsnChange = (e) => {
    const raw = digitsOnly(e.target.value);
    const capped = clampToMax ? raw.slice(0, selectedCountry.max) : raw;
    const nextVal = composeE164(selectedCountry.dial, capped);
    if (nextVal !== value) onChange(nextVal);

    // like CustomInput: clear/update internal error on change (if already shown)
    if (!externalError && (touched || internalError)) {
      handleValidation(capped, selectedCountry);
    }
    // clear browser validity
    if (disableBrowserValidation) {
      e.target.setCustomValidity("");
    }
  };

  return (
    <Box
      ref={rootRef}
      onBlur={handleCompositeBlur}
      sx={{ width: fullWidth ? "100%" : "auto" }}
    >
      {/* label (matches CustomInput styling) */}
      <Typography sx={{ fontWeight: "450", fontSize: "16px", mb: 1 }}>
        {label}
        {required && (
          <Box component="span" sx={{ color: "red", ml: 0.5 }}>
            *
          </Box>
        )}
      </Typography>

      <TextField
        ref={inputRef}
        value={nsn}
        onChange={handleNsnChange}
        placeholder={placeholder}
        error={hasError}
        helperText={displayError}
        fullWidth={fullWidth}
        // MUI v6: use slotProps instead of deprecated InputProps
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Box
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                  sx={{
                    width: "80px",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Select
                    value={selectedCountry.iso2}
                    onChange={handleCountryChange}
                    IconComponent={() => null}
                    renderValue={(iso2) => <FlagCircle iso2={iso2} size={20} />}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                      "& .MuiSelect-select": {
                        py: 0,
                        px: 0,
                        display: "flex",
                        alignItems: "center",
                      },
                      minWidth: 20,
                    }}
                    MenuProps={{ disablePortal: false }}
                  >
                    {countryList.map((c) => (
                      <MenuItem key={c.iso2} value={c.iso2}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.25,
                          }}
                        >
                          <FlagCircle iso2={c.iso2} size={18} title={c.name} />
                          <Typography variant="body1">
                            {c.name} (+{c.dial})
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>

                  <Box sx={{ color: "text.secondary", fontWeight: 400 }}>
                    +{selectedCountry.dial}
                  </Box>

                  <Box
                    aria-hidden
                    sx={{
                      width: 1,
                      height: 36,
                      bgcolor: "divider",
                      transform: "scaleX(0.05)",
                      transformOrigin: "left",
                    }}
                  />
                </Box>
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
}
