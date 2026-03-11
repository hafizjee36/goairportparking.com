// components/reusable/TimeCard.jsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Popper,
  ClickAwayListener,
  FormHelperText,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import {
  format as formatFn,
  set,
  startOfDay,
  isBefore,
  isAfter,
  isValid,
  getHours,
  getMinutes
} from "date-fns";

function formatTime(d, fmt = "HH:mm") {
  return d && isValid(d) ? formatFn(d, fmt) : "Select time";
}

export default function TimeCard({
  label,
  value,
  onChange,
  minTime = null,
  maxTime = null,
  timeStep = 30,
  open: controlledOpen,
  onOpenChange,

  // NEW (same idea as DateCard / CustomInput)
  variant = "card", // 'card' | 'field'
  placeholder = "HH:mm",
  format = "HH:mm",
  disabled = false,
  fullWidth = true,

  // validation like CustomInput (applies to 'field' variant)
  required = false,
  validation = null, // (dateTime) => true | false | string
  externalError = false,
  helperText = "",
}) {
  const anchorRef = useRef(null);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;

  // Normalize to Date
  const selected = value ? new Date(value) : null;
  const minT = minTime ? new Date(minTime) : null;
  const maxT = maxTime ? new Date(maxTime) : null;

  const setOpen = (next) =>
    onOpenChange ? onOpenChange(next) : setUncontrolledOpen(next);
  const toggleOpen = () => !disabled && setOpen(!open);

  // --- Field-only error handling (matches CustomInput pattern)
  const [internalError, setInternalError] = useState("");
  const [touched, setTouched] = useState(false);
  const displayError = externalError ? helperText : internalError;
  const hasError = Boolean(displayError);

  // Close on ESC (unchanged)
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // keep internal error clear if parent supplies external error
  useEffect(() => {
    if (externalError && helperText) setInternalError("");
  }, [externalError, helperText]);

  // time options
  const times = useMemo(() => {
    const out = [];
    for (let m = 0; m < 24 * 60; m += timeStep) {
      const h = Math.floor(m / 60);
      const mm = m % 60;
      out.push({ h, m: mm });
    }
    return out;
  }, [timeStep]);

  const timeIsDisabled = (h, m) => {
    const baseDate = selected ? new Date(selected) : new Date();
    const candidate = set(baseDate, { hours: h, minutes: m, seconds: 0, milliseconds: 0 });
    if (minT && isBefore(candidate, minT)) return true;
    if (maxT && isAfter(candidate, maxT)) return true;
    return false;
  };

  // validation (field variant only)
  const validate = (d) => {
    if (variant !== "field" || externalError) return true;

    if (required && !d) {
      setInternalError(`${label || "Field"} is required`);
      return false;
    }
    if (!d) {
      setInternalError("");
      return true;
    }
    if (minT && isBefore(d, minT)) {
      setInternalError(`Select a time on/after ${formatFn(minT, format)}`);
      return false;
    }
    if (maxT && isAfter(d, maxT)) {
      setInternalError(`Select a time on/before ${formatFn(maxT, format)}`);
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

  const handleSelectTime = (h, m) => {
    const baseDate = selected ? new Date(selected) : new Date();
    const next = set(baseDate, { hours: h, minutes: m, seconds: 0, milliseconds: 0 });
    onChange?.(next);
    if (variant === "field") {
      setTouched(true);
      validate(next);
    }
    setOpen(false);
  };

  // validate when leaving whole control (field only)
  const handleCompositeBlur = (e) => {
    if (variant !== "field") return;
    const next = e.relatedTarget;
    if (!anchorRef.current || !next || !anchorRef.current.contains(next)) {
      setTouched(true);
      validate(selected);
    }
  };

  // ---------- UI ----------
  // === CARD TRIGGER (UNCHANGED) ===
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
            outlineOffset: "2px",
          },
        }}
      >
        <Box sx={{ minWidth: 0, width: "100%" }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 500,
              lineHeight: 1,
              mb: 0.5,
              fontSize: "16px",
            }}
          >
            {label}
          </Typography>

          <Typography
            variant="body2"
            fontSize="12px"
            color="text.secondary"
            noWrap
          >
            {formatTime(selected, format)}
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
          <AccessTimeOutlinedIcon fontSize="small" />
        </Box>
      </Box>
    </Box>
  );

  // === FIELD TRIGGER (NEW; matches DateCard/CustomInput field UI) ===
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
          height: 56,
          borderRadius: 1,
          px: 2,
          border: `1px solid ${hasError ? "#d32f2f" : "rgba(0,0,0,0.23)"}`,
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
          <AccessTimeOutlinedIcon fontSize="small" />
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
        ref={anchorRef}
        onBlur={handleCompositeBlur} // field-only validation on blur
        sx={{ position: "relative", width: fullWidth ? "100%" : "auto" }}
      >
        {variant === "field" ? <FieldTrigger /> : <CardTrigger />}

        {/* Popper panel */}
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
            <Paper
              elevation={3}
              sx={{ borderRadius: 2, p: 1.5, maxWidth: 200 }}
            >
              {/* Time list */}
              <Box
                sx={{
                  maxHeight: 340,
                  overflowY: "auto",
                  pr: 1,
                  scrollbarWidth: "thin",
                }}
              >
                <Box
                  component="ul"
                  sx={{ listStyle: "none", m: 0, p: 0, width: "100%" }}
                >
                  {times.map(({ h, m }) => {
                    const disabledOpt = timeIsDisabled(h, m);
                    const isSelected =
                      !!selected &&
                      getHours(selected) === h &&
                      getMinutes(selected) === m;
                    const labelTxt = formatFn(
                      set(new Date(), { hours: h, minutes: m }),
                      format
                    );

                    return (
                      <Box key={`${h}-${m}`} component="li" sx={{ m: 0 }}>
                        <Box
                          role="button"
                          tabIndex={disabledOpt ? -1 : 0}
                          aria-disabled={disabledOpt ? "true" : "false"}
                          onClick={() => !disabledOpt && handleSelectTime(h, m)}
                          onKeyDown={(e) => {
                            if (
                              !disabledOpt &&
                              (e.key === "Enter" || e.key === " ")
                            ) {
                              e.preventDefault();
                              handleSelectTime(h, m);
                            }
                          }}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            px: 2,
                            py: 1,
                            my: 0.25,
                            borderRadius: 1,
                            cursor: disabledOpt ? "not-allowed" : "pointer",
                            opacity: disabledOpt ? 0.5 : 1,
                            bgcolor: isSelected
                              ? "action.selected"
                              : "transparent",
                            "&:hover": !disabledOpt
                              ? { bgcolor: "action.hover" }
                              : undefined,
                            outline: "none",
                            "&:focus-visible": {
                              outline: "2px solid rgba(25,118,210,.35)",
                              outlineOffset: 2,
                            },
                          }}
                        >
                          <Typography variant="body2" noWrap>
                            {labelTxt}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Paper>
          </ClickAwayListener>
        </Popper>
      </Box>
    </LocalizationProvider>
  );
}
