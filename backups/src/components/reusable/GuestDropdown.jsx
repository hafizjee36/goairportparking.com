// components/reusable/GuestDropdown.jsx
import React, { useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Popper,
  Paper,
  ClickAwayListener,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function GuestsDropdown({
  label = "Guests",
  adults,
  children,
  onChange, // ({ adults, children }) => void
  open,
  onOpenChange, // (boolean) => void
  minWidth = 360,
  // maxHeight,
}) {
  const anchorRef = useRef(null);

  const guestsLabel = `${adults}x Adult${adults > 1 ? "s" : ""}${
    children ? `, ${children}x Child${children > 1 ? "ren" : ""}` : ""
  }`;

  const setAdults = (n) => onChange?.({ adults: n, children });
  const setChildren = (n) => onChange?.({ adults, children: n });

  const toggleOpen = () => onOpenChange?.(!open);
  const close = () => onOpenChange?.(false);

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
        aria-controls="guests-panel"
        aria-expanded={open ? "true" : "false"}
        onClick={toggleOpen}
        onKeyDown={handleKey}
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          border: "1px solid #E3E6EA",
          borderRadius: 3, // match Entry/Exit corners
          px: 2,
          py: 3.5,
          maxHeight: 45, // match Entry/Exit height
          cursor: "pointer",
          bgcolor: "#fff",
          transition: "border-color .15s ease",
          "&:hover": { borderColor: "#D4D9DE" },
          "&:focus-visible": {
            outline: "2px solid rgba(25,118,210,.35)",
            outlineOffset: "2px",
          },
        }}
      >
        <Box sx={{ minWidth: 0, width: "100%" }}>
          {/* Title: slightly larger + bold (same as Entry/Exit) */}
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, lineHeight: 1, mb: 0.5, fontSize: "16px" }}
          >
            {label}
          </Typography>

          {/* Value left — Chevron right */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body2"
              fontSize="12px"
              color="text.secondary"
              noWrap
            >
              {guestsLabel}
            </Typography>

            <IconButton
              size="small"
              aria-label="toggle guests dropdown"
              onClick={(e) => {
                e.stopPropagation(); // avoid double toggle
                toggleOpen();
              }}
              disableRipple
              sx={{
                color: "text.disabled",
                width: 18,
                height: 18,
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
            id="guests-panel"
            elevation={3}
            sx={{ width, p: 2, borderRadius: 2, minWidth: "250px" }}
          >
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Select Guests
            </Typography>

            {/* Adults */}
            <Row
              title="Adults"
              subtitle="16+ years"
              value={adults}
              onDec={() => setAdults(Math.max(1, adults - 1))}
              onInc={() => setAdults(adults + 1)}
              disableDec={adults <= 1}
            />

            {/* Children */}
            <Row
              title="Children"
              subtitle="0–15 years"
              value={children}
              onDec={() => setChildren(Math.max(0, children - 1))}
              onInc={() => setChildren(children + 1)}
              disableDec={children <= 0}
            />
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
}

function Row({ title, subtitle, value, onDec, onInc, disableDec }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        py: 1.25,
      }}
    >
      <Box>
        <Typography fontWeight={600}>{title}</Typography>
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton size="small" onClick={onDec} disabled={disableDec}>
          <RemoveIcon fontSize="small" />
        </IconButton>
        <Typography width={24} textAlign="center">
          {value}
        </Typography>
        <IconButton size="small" onClick={onInc}>
          <AddIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  );
}

/**
 * GuestsDropdown
 * A reusable dropdown for selecting guests (adults + children).
 *
 * Props:
 * - label?: string                                   // Caption (default: "Guests")
 * - adults: number                                   // Adult count (min 1 enforced)
 * - children: number                                 // Children count (min 0)
 * - onChange: ({ adults, children }) => void         // Called on any change
 * - open: boolean                                    // Controlled open state
 * - onOpenChange: (boolean) => void                  // Called when dropdown toggles
 * - minWidth?: number                                // Fallback menu width (default: 360)
 *
 * Usage:
 *   const [adults, setAdults] = useState(1);
 *   const [children, setChildren] = useState(0);
 *   const [guestsOpen, setGuestsOpen] = useState(false);
 *
 *   <GuestsDropdown
 *     adults={adults}
 *     children={children}
 *     open={guestsOpen}
 *     onOpenChange={setGuestsOpen}
 *     onChange={({ adults: a, children: c }) => {
 *       setAdults(a);
 *       setChildren(c);
 *     }}
 *   />
 *
 * Notes:
 * - Flex trigger matches the DateTime trigger layout (chevron inside, right).
 * - ESC closes; Enter/Space toggles for a11y.
 */
