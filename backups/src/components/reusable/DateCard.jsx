// components/reusable/DateCard.jsx
import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Popper,
  ClickAwayListener,
  FormHelperText,
} from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import {
  format as formatFn,
  startOfDay,
  endOfDay,
  startOfYear,
  endOfYear,
  setYear,
  isBefore,
  isAfter,
  isValid
} from "date-fns";

function formatDate(d, fmt = "dd/MM/yyyy") {
  return d && isValid(d) ? formatFn(d, fmt) : "Select date";
}

export default function DateCard({
  label,
  value,
  onChange,
  minDate = null, // Date limit (lower bound)
  maxDate = null, // Date limit (upper bound)
  open: controlledOpen,
  onOpenChange,
  minYear = null, // Year limit (lower bound, inclusive)
  maxYear = null, // Year limit (upper bound, inclusive)
  variant = "card", // 'card' | 'field'
  placeholder = "DD/MM/YYYY",
  format = "dd/MM/yyyy",
  disabled = false,
  fullWidth = true,

  // Validation (applies to 'field' variant only)
  required = false,
  validation = null, // (date) => true | false | string

  // error handling
  externalError = false, // existing prop
  error = undefined, // NEW alias; if provided, overrides externalError
  helperText = "",
}) {
  const anchorRef = useRef(null);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;

  // Normalize selected to Date
  const selected = value ? new Date(value) : null;

  // --- Build effective bounds by INTERSECTING year + date ranges ---
  // year caps
  const fromYear = Number.isInteger(minYear)
    ? startOfYear(setYear(new Date(), minYear))
    : null;
  const toYear = Number.isInteger(maxYear)
    ? endOfYear(setYear(new Date(), maxYear))
    : null;

  // day caps (normalize to day edges)
  const fromDate = minDate ? startOfDay(new Date(minDate)) : null;
  const toDate = maxDate ? endOfDay(new Date(maxDate)) : null;

  // intersection helpers: pick the tightest (latest min, earliest max)
  const pickLater = (a, b) => {
    if (!a) return b || null;
    if (!b) return a || null;
    return isAfter(a, b) ? a : b;
  };
  const pickEarlier = (a, b) => {
    if (!a) return b || null;
    if (!b) return a || null;
    return isBefore(a, b) ? a : b;
  };

  const minDT = pickLater(fromYear, fromDate);
  const maxDT = pickEarlier(toYear, toDate);

  // guard for impossible range (min > max) -> collapse to same-day to avoid MUI warnings
  const normalizedMin = minDT && maxDT && isAfter(minDT, maxDT) ? maxDT : minDT;
  const normalizedMax = minDT && maxDT && isAfter(minDT, maxDT) ? minDT : maxDT;

  const setOpen = (next) =>
    onOpenChange ? onOpenChange(next) : setUncontrolledOpen(next);
  const toggleOpen = () => !disabled && setOpen(!open);

  // --- Field-only error handling (mirrors CustomInput) ---
  const [internalError, setInternalError] = useState("");
  const [touched, setTouched] = useState(false);

  // accept either `error` or `externalError` (alias)
  const extErrBool = typeof error === "boolean" ? error : externalError;
  const displayError = extErrBool ? helperText : internalError;
  const hasError = Boolean(displayError);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Clear internal error if parent supplies external error text
  useEffect(() => {
    if (extErrBool && helperText) setInternalError("");
  }, [extErrBool, helperText]);

  const dateIsDisabled = (date) => {
    const startOf = startOfDay(date);
    const endOf = endOfDay(date);
    if (normalizedMin && isBefore(endOf, normalizedMin)) return true;
    if (normalizedMax && isAfter(startOf, normalizedMax)) return true;
    return false;
  };

  // Field-only validation (does NOT alter card behavior)
  const validate = (d) => {
    if (variant !== "field" || extErrBool) return true;

    if (required && !d) {
      setInternalError(`${label || "Field"} is required`);
      return false;
    }
    if (!d) {
      setInternalError("");
      return true;
    }
    if (normalizedMin && isBefore(endOfDay(d), normalizedMin)) {
      setInternalError(
        `Select a date on or after ${formatFn(normalizedMin, format)}`
      );
      return false;
    }
    if (normalizedMax && isAfter(startOfDay(d), normalizedMax)) {
      setInternalError(
        `Select a date on or before ${formatFn(normalizedMax, format)}`
      );
      return false;
    }
    if (typeof validation === "function") {
      const res = validation(d);
      if (res === false) {
        setInternalError(`Invalid ${label || "value"}`);
        return false;
      }
      if (typeof res === "string" && res) {
        setInternalError(res);
        return false;
      }
    }
    setInternalError("");
    return true;
  };

  const handleSelectDate = (newDate) => {
    if (!newDate) return;
    const base = startOfDay(newDate);
    onChange?.(base);
    if (variant === "field") {
      setTouched(true);
      validate(base);
    }
    setOpen(false);
  };

  // Field-only: validate when leaving the whole control
  const handleCompositeBlur = (e) => {
    if (variant !== "field") return;
    const next = e.relatedTarget;
    if (!anchorRef.current || !next || !anchorRef.current.contains(next)) {
      setTouched(true);
      validate(selected);
    }
  };

  // ---------- UI ----------
  const CardTrigger = () => (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Box
        role="button"
        tabIndex={0}
        onClick={toggleOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") toggleOpen();
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #E3E6EA",
          borderRadius: 3,
          px: 2,
          py: 3.5,
          maxHeight: 45,
          bgcolor: "#fff",
          cursor: "pointer",
          transition: "border-color .15s ease",
          "&:hover": { borderColor: "#D4D9DE" },
          "&:focus-visible": {
            outline: "2px solid rgba(25,118,210,.35)",
          },
        }}
      >
        <Box sx={{ minWidth: 0, width: "100%" }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, lineHeight: 1, mb: 0.5, fontSize: "16px" }}
          >
            {label}
          </Typography>

          <Typography
            variant="body2"
            fontSize="12px"
            color="text.secondary"
            noWrap
          >
            {formatDate(selected, format)}
          </Typography>
        </Box>

        <Box
          sx={{
            width: 24,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "text.secondary",
            ml: 1,
          }}
        >
          <CalendarTodayOutlinedIcon fontSize="small" />
        </Box>
      </Box>
    </Box>
  );

  const FieldTrigger = () => (
    <>
      {label && (
        <Typography sx={{ fontWeight: "450", fontSize: "16px", mb: 1 }}>
          {label}
          {required && (
            <Box component="span" sx={{ color: "red", ml: 0.5 }}>
              *
            </Box>
          )}
        </Typography>
      )}

      <Box
        role="button"
        tabIndex={0}
        onClick={toggleOpen}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleOpen()}
        sx={{
          display: "flex",
          alignItems: "center",
          border: `1px solid ${hasError ? "#d32f2f" : "rgba(0,0,0,0.23)"}`,
          borderRadius: 1,
          px: 2,
          height: 56,
          bgcolor: disabled ? "#f6f6f6" : "#fff",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "border-color .15s ease",
          "&:hover": {
            borderColor: hasError ? "#d32f2f" : "rgba(0,0,0,0.24)",
          },
          "&:focus-visible": {
            outline: "2px solid rgba(25,118,210,.35)",
          },
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="body1"
            noWrap
            sx={{
              color: selected ? "text.primary" : "text.disabled",
              fontWeight: 400,
            }}
          >
            {selected ? formatFn(selected, format) : placeholder}
          </Typography>
        </Box>

        <Box
          sx={{
            width: 24,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "text.secondary",
            ml: 1,
          }}
        >
          <CalendarTodayOutlinedIcon fontSize="small" />
        </Box>
      </Box>

      {hasError && (
        <FormHelperText error sx={{ mt: 0.75 }}>
          {displayError}
        </FormHelperText>
      )}
    </>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{ position: "relative", width: fullWidth ? "100%" : "auto" }}
        ref={anchorRef}
        onBlur={handleCompositeBlur} // no-op for 'card'
      >
        {variant === "field" ? <FieldTrigger /> : <CardTrigger />}

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          style={{ zIndex: 1300 }}
          modifiers={[{ name: "offset", options: { offset: [0, 8] } }]}
        >
          <ClickAwayListener
            onClickAway={(e) => {
              if (anchorRef.current && !anchorRef.current.contains(e.target)) {
                if (variant === "field") {
                  setTouched(true);
                  validate(selected);
                }
                setOpen(false);
              }
            }}
          >
            <Paper elevation={3} sx={{ borderRadius: 2, p: 1.5 }}>
              <Box sx={{ p: 0.5 }}>
                <DateCalendar
                  value={selected}
                  onChange={handleSelectDate}
                  // MUI min/max + shouldDisableDate (belt & suspenders)
                  minDate={normalizedMin || undefined}
                  maxDate={normalizedMax || undefined}
                  shouldDisableDate={dateIsDisabled}
                  sx={{
                    "& .MuiYearCalendar-root": {
                      maxHeight: 280,
                      overflowY: "auto",
                    },
                    "& .MuiMonthCalendar-root": {
                      maxHeight: 280,
                      overflowY: "auto",
                    },
                    "& .MuiPickersDay-root": { borderRadius: 1.2 },
                  }}
                />
              </Box>
            </Paper>
          </ClickAwayListener>
        </Popper>
      </Box>
    </LocalizationProvider>
  );
}
