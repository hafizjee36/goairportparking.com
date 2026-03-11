// components/reusable/AirportDropdown.jsx
import React, { useRef } from "react";
import {
  Box,
  Typography,
  Popper,
  Paper,
  ClickAwayListener,
  IconButton,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AirportDropdown({
  label = "Airport",
  value,
  options = [], // [{ level: "Aberdeen", value: "ABZ" }, ...]
  open,
  onOpenChange, // (boolean) => void
  onChange, // (newValue: string) => void
  minWidth = 320,
  // maxHeight = 72,
  error = false,
  placeholder = "Select Airport",
}) {
  const anchorRef = useRef(null);
  const [searchTerm, setSearchTerm] = React.useState("");

  const toggleOpen = () => onOpenChange?.(!open);
  const close = () => {
    onOpenChange?.(false);
    setSearchTerm(""); // Clear search when closing
  };

  // Get display text for selected value
  const getDisplayText = () => {
    if (!value) return placeholder;
    if (!options || options.length === 0) return placeholder;
    const selectedAirport = options.find((airport) => airport?.value === value);
    return selectedAirport && selectedAirport.level && selectedAirport.value
      ? `${selectedAirport.level} (${selectedAirport.value})`
      : value;
  };

  // Filter options based on search with safety checks
  const filteredOptions = React.useMemo(() => {
    if (!options || options.length === 0) return [];
    if (!searchTerm) return options;
    
    return options.filter((airport) => {
      if (!airport || !airport.level || !airport.value) return false;
      const searchLower = searchTerm.toLowerCase();
      return (
        airport.level.toLowerCase().includes(searchLower) ||
        airport.value.toLowerCase().includes(searchLower)
      );
    });
  }, [options, searchTerm]);

  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === " ") toggleOpen();
    if (e.key === "Escape") close();
  };

  const width =
    anchorRef.current?.offsetWidth != null
      ? anchorRef.current.offsetWidth
      : minWidth;

  return (
    <Box sx={{ position: "relative" }} ref={anchorRef}>
      {/* Trigger — flex layout, chevron inside on the right */}
      <Box
        role="button"
        tabIndex={0}
        aria-haspopup="menu"
        aria-controls="airport-listbox"
        aria-expanded={open ? "true" : "false"}
        onClick={toggleOpen}
        onKeyDown={handleKey}
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          border: error ? "1px solid #d32f2f" : "1px solid #E3E6EA",
          borderRadius: 3, // match Entry/Exit rounding
          px: 2,
          py: 3.5,
          maxHeight: 45, // match Entry/Exit height
          cursor: "pointer",
          bgcolor: "#fff",
          transition: "border-color .15s ease",
          "&:hover": { borderColor: error ? "#d32f2f" : "#D4D9DE" },
          "&:focus-visible": {
            outline: error ? "none" : "2px solid rgba(25,118,210,.35)",
            outlineOffset: "2px",
          },
        }}
      >
        <Box sx={{ minWidth: 0, width: "100%" }}>
          {/* Title: larger + bold like Entry/Exit */}
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, lineHeight: 1, mb: 0.5, fontSize: "16px" }}
          >
            {label} {error && "*"}
          </Typography>

          {/* Value left — Chevron right */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Typography
              variant="body2"
              fontSize="12px"
              color={value ? "text.primary" : "text.secondary"}
              noWrap
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {getDisplayText()}
            </Typography>

            <IconButton
              size="small"
              aria-label="toggle airport dropdown"
              onClick={(e) => {
                e.stopPropagation(); // avoid double toggle
                toggleOpen();
              }}
              disableRipple
              sx={{
                color: "text.disabled",
                width: 18,
                height: 18,
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <ExpandMoreIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Popper */}
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
              close();
            }
          }}
        >
          <Paper
            id="airport-listbox"
            role="listbox"
            elevation={3}
            sx={{
              width,
              maxHeight: 300,
              borderRadius: 2,
              p: 1,
              minWidth: "250px",
              /* Slim, light-green scrollbar */
              // scrollbarWidth: "thin",
              // scrollbarColor: (t) => `${t.palette.primary.main} transparent`,
              // "&::-webkit-scrollbar": { width: 6 },
              // "&::-webkit-scrollbar-track": { background: "transparent" },
              // "&::-webkit-scrollbar-thumb": {
              //   backgroundColor: (t) => t.palette.success.light,
              //   borderRadius: 8,
              //   border: "2px solid transparent",
              //   backgroundClip: "content-box",
              //   minHeight: 24,
              // },
              // "&::-webkit-scrollbar-thumb:hover": {
              //   backgroundColor: (t) => t.palette.success.main,
              // },
            }}
          >
            {/* Search field */}
            <TextField
              size="small"
              placeholder="Search airports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()} // Prevent closing dropdown when clicking search
              sx={{
                width: "100%",
                mb: 1,
                "& .MuiOutlinedInput-root": {
                  fontSize: "14px",
                },
              }}
            />

            {/* Options list */}
            <Box sx={{ maxHeight: 200, overflowY: "auto" }}>
              {filteredOptions.length === 0 ? (
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    color: "text.secondary",
                    fontStyle: "italic",
                  }}
                >
                  No airports found
                </Box>
              ) : (
                filteredOptions.map((airport) => {
                  const selected = airport.value === value;
                  return (
                    <Box
                      key={airport.value}
                      role="option"
                      aria-selected={selected}
                      onClick={() => {
                        onChange?.(airport.value);
                        close();
                      }}
                      sx={{
                        px: 2,
                        py: 1,
                        borderRadius: 1,
                        fontWeight: selected ? 600 : 400,
                        bgcolor: selected ? "primary.main" : "transparent",
                        color: selected
                          ? "primary.contrastText"
                          : "text.primary",
                        "&:hover": {
                          bgcolor: selected ? "primary.dark" : "action.hover",
                        },
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        mb: 0.5,
                        fontSize: "14px",
                      }}
                    >
                      {`${airport.level} (${airport.value})`}
                    </Box>
                  );
                })
              )}
            </Box>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
}
