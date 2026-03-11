// components/reusable/DateTimeDropdown.jsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Popper,
  ClickAwayListener,
  Divider,
} from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  format,
  isValid,
  startOfDay,
  endOfDay,
  set,
  isAfter,
  isBefore,
  isSameDay,
  getYear,
  setYear,
  getHours,
  getMinutes
} from "date-fns";

function formatDate(d) {
  return d && isValid(d) ? format(d, "dd/MM/yyyy") : "Select date";
}
function formatTime(d) {
  return d && isValid(d) ? format(d, "HH:mm") : "Select time";
}

export default function DateTimeCard({
  label,
  value,
  onChange,
  minDateTime = null, // lower bound (native Date)
  maxDateTime = null, // upper bound (native Date)
  minYear = null, // lower year cap (inclusive)
  maxYear = null, // upper year cap (inclusive)
  timeStep = 30,
  open: controlledOpen,
  onOpenChange,
}) {
  const anchorRef = useRef(null);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;

  // MUI DateCalendar with AdapterDateFns works with native Date objects
  const selected = value instanceof Date ? value : (value ? new Date(value) : null);

  // --- Build effective bounds by INTERSECTING year caps with datetime caps ---
  const fromYear = Number.isInteger(minYear)
    ? startOfDay(setYear(new Date(), minYear))
    : null;
  const toYear = Number.isInteger(maxYear)
    ? endOfDay(setYear(new Date(), maxYear))
    : null;

  const minDT = useMemo(() => {
    let best = minDateTime ? (minDateTime instanceof Date ? minDateTime : new Date(minDateTime)) : null;
    if (fromYear) {
      if (!best || isAfter(fromYear, best)) best = fromYear;
    }
    return best;
  }, [minDateTime, fromYear]);

  const maxDT = useMemo(() => {
    let best = maxDateTime ? (maxDateTime instanceof Date ? maxDateTime : new Date(maxDateTime)) : null;
    if (toYear) {
      if (!best || isBefore(toYear, best)) best = toYear;
    }
    return best;
  }, [maxDateTime, toYear]);

  // Guard impossible range
  const normalizedMin = minDT && maxDT && isAfter(minDT, maxDT) ? maxDT : minDT;
  const normalizedMax = minDT && maxDT && isAfter(minDT, maxDT) ? minDT : maxDT;

  // Calendar needs date-only bounds
  const calMin = normalizedMin ? startOfDay(normalizedMin) : undefined;
  const calMax = normalizedMax ? endOfDay(normalizedMax) : undefined;

  const setOpen = (next) =>
    onOpenChange ? onOpenChange(next) : setUncontrolledOpen(next);
  const toggleOpen = () => setOpen(!open);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const times = useMemo(() => {
    const out = [];
    for (let m = 0; m < 24 * 60; m += timeStep) {
      const h = Math.floor(m / 60);
      const mm = m % 60;
      out.push({ h, m: mm });
    }
    return out;
  }, [timeStep]);

  const dateIsDisabled = (date) => {
    // disable the whole day if it's entirely out of range
    const startOfD = startOfDay(date);
    const endOfD = endOfDay(date);
    if (normalizedMin && isBefore(endOfD, normalizedMin)) return true;
    if (normalizedMax && isAfter(startOfD, normalizedMax)) return true;
    return false;
  };

  const timeIsDisabled = (h, m) => {
    if (!selected || !isValid(selected)) return false; // allow picking a date first
    const candidate = set(selected, { hours: h, minutes: m, seconds: 0, milliseconds: 0 });
    if (normalizedMin && isBefore(candidate, normalizedMin)) return true;
    if (normalizedMax && isAfter(candidate, normalizedMax)) return true;
    return false;
  };

  const clampToRange = (dt) => {
    if (normalizedMin && isBefore(dt, normalizedMin)) return normalizedMin;
    if (normalizedMax && isAfter(dt, normalizedMax)) return normalizedMax;
    return dt;
  };

  const handleSelectDate = (newDate) => {
    if (!newDate || !isValid(newDate)) return;

    let next;
    if (selected && isValid(selected)) {
      next = set(newDate, {
        hours: getHours(selected),
        minutes: getMinutes(selected),
        seconds: 0,
        milliseconds: 0
      });
    } else {
      next = set(newDate, { hours: 12, minutes: 0, seconds: 0, milliseconds: 0 }); // default noon
    }

    onChange?.(clampToRange(next));
  };

  const handleSelectTime = (h, m) => {
    // if no date yet, use today's date (clamped later)
    const datePart = (selected && isValid(selected))
      ? startOfDay(selected)
      : startOfDay(new Date());

    const next = set(datePart, { hours: h, minutes: m, seconds: 0, milliseconds: 0 });
    onChange?.(clampToRange(next));
    setOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ position: "relative", width: "100%" }} ref={anchorRef}>
        {/* Trigger */}
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
              px: { xs: 1, sm: 2 }, // mobile mein kam padding
              py: { xs: 2, sm: 3.5 }, // mobile mein kam padding
              maxHeight: { xs: 50, sm: 45 }, // mobile mein thoda zyada height
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
            <Box sx={{ minWidth: 0, width: "100%", overflow: "hidden" }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  lineHeight: 1,
                  mb: 0.5,
                  fontSize: { xs: "14px", sm: "16px" }, // mobile mein chota font
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: { xs: 0.5, sm: 2 }, // mobile mein kam gap
                  flexWrap: { xs: "wrap", sm: "nowrap" }, // mobile mein wrap allow
                  minWidth: 0, // prevent overflow
                }}
              >
                <Typography
                  variant="body2"
                  fontSize={{ xs: "10px", sm: "12px" }} // mobile mein chota font
                  color="text.secondary"
                  sx={{
                    minWidth: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: { xs: "60px", sm: "none" }, // mobile mein max width
                  }}
                >
                  {formatDate(selected)}
                </Typography>
                <Typography
                  variant="body2"
                  fontSize={{ xs: "10px", sm: "12px" }} // mobile mein chota font
                  color="text.secondary"
                  sx={{
                    minWidth: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: { xs: "40px", sm: "none" }, // mobile mein max width
                  }}
                >
                  {formatTime(selected)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

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
                setOpen(false);
              }
            }}
          >
            <Paper
              elevation={3}
              sx={{
                borderRadius: 2,
                p: 0,
                display: "flex",
                flexDirection: { xs: "row", sm: "row" },
                gridTemplateRows: { xs: "auto 1px auto", sm: "auto" },
                alignItems: "start",
                gap: 0,
                width: { xs: "92vw", sm: "auto" },
                maxWidth: { xs: 420, sm: "none" },
              }}
            >
              {/* Calendar */}
              <Box sx={{ p: 0.5 }}>
                <DateCalendar
                  value={selected}
                  onChange={handleSelectDate}
                  minDate={calMin}
                  maxDate={calMax}
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

              {/* Divider (desktop vertical) */}
              <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", sm: "block" } }} />
              {/* Divider (mobile horizontal) */}
              <Divider orientation="horizontal" flexItem sx={{ display: { xs: "block", sm: "none" }, my: 1 }} />

              {/* Time list */}
              <Box
                sx={{
                  maxHeight: { xs: 260, sm: 340 }, // mobile par vertical scroll
                  overflowY: 'auto',
                  pr: { xs: 1, sm: 3 },
                  pl: { xs: 1, sm: 0 },
                  scrollbarWidth: "thin",
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                <Box
                  component="ul"
                  sx={{
                    listStyle: "none",
                    m: 0,
                    p: 0,
                    width: "max-content",
                  }}
                >
                  {times.map(({ h, m }) => {
                    const disabled = timeIsDisabled(h, m) || !selected || !isValid(selected); // need a date first
                    const isSelected =
                      !!selected &&
                      isValid(selected) &&
                      getHours(selected) === h &&
                      getMinutes(selected) === m;

                    const timeLabel = format(set(new Date(), { hours: h, minutes: m }), "HH:mm");

                    return (
                      <Box key={`${h}-${m}`} component="li" sx={{ m: 0 }}>
                        <Box
                          role="button"
                          tabIndex={disabled ? -1 : 0}
                          aria-disabled={disabled ? "true" : "false"}
                          onClick={() => !disabled && handleSelectTime(h, m)}
                          onKeyDown={(e) => {
                            if (
                              !disabled &&
                              (e.key === "Enter" || e.key === " ")
                            ) {
                              e.preventDefault();
                              handleSelectTime(h, m);
                            }
                          }}
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "auto",
                            px: 1,
                            py: 0.5,
                            my: 0.25,
                            borderRadius: 1,
                            cursor: disabled ? "not-allowed" : "pointer",
                            opacity: disabled ? 0.5 : 1,
                            bgcolor: isSelected
                              ? "action.selected"
                              : "transparent",
                            "&:hover": !disabled
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
                            {timeLabel}
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
