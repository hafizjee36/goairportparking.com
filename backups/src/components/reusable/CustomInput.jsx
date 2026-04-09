import React, { useState, useEffect, useRef } from "react";
import { TextField, InputAdornment, Box, Typography } from "@mui/material";

const CustomInput = ({
  label = "",
  value = "",
  placeholder = "",
  required = false,
  adornment = null,
  adornmentPosition = "left",
  validation = null,
  onChange = () => {},
  type = "text",
  helperText = "", // External error from parent
  externalError = false, // New prop to indicate external error state
  fullWidth = true,
  disabled = false,
  trimOnBlur = true,
  multiline = false,
  rows = 1,
  disableBrowserValidation = true, // New prop to control browser validation
}) => {
  const [internalError, setInternalError] = useState("");
  const inputRef = useRef(null);

  // Use external error if provided, otherwise use internal error
  const displayError = externalError ? helperText : internalError;
  const hasError = Boolean(displayError);

  // Clear internal error when external error is provided
  useEffect(() => {
    if (externalError && helperText) {
      setInternalError("");
    }
  }, [externalError, helperText]);

  // Prevent browser validation
  useEffect(() => {
    if (disableBrowserValidation && inputRef.current) {
      const inputElement = inputRef.current.querySelector("input");
      if (inputElement) {
        const preventValidation = (e) => {
          e.preventDefault();
          e.stopPropagation();
        };

        inputElement.addEventListener("invalid", preventValidation);

        // Also prevent form submission validation
        inputElement.addEventListener("blur", (e) => {
          e.target.setCustomValidity("");
        });

        return () => {
          inputElement.removeEventListener("invalid", preventValidation);
        };
      }
    }
  }, [disableBrowserValidation]);

  const handleValidation = (val) => {
    // Don't validate if external error is being handled
    if (externalError) return true;

    if (required && !val.trim()) {
      setInternalError(`${label || "Field"} is required`);
      return false;
    }
    if (validation) {
      if (typeof validation === "function" && !validation(val)) {
        setInternalError(`Invalid ${label || "value"}`);
        return false;
      }
      if (validation instanceof RegExp && !validation.test(val)) {
        setInternalError(`Invalid ${label || "value"}`);
        return false;
      }
    }
    setInternalError("");
    return true;
  };

  const handleBlur = (e) => {
    let val = e.target.value;
    if (trimOnBlur) {
      val = val.trim();
      onChange(val);
    }
    if (!externalError) {
      handleValidation(val);
    }

    // Clear any browser validation state
    if (disableBrowserValidation) {
      e.target.setCustomValidity("");
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    onChange(val);
    // Clear internal error on change if not using external error
    if (!externalError && internalError) {
      handleValidation(val);
    }

    // Clear browser validation state on change
    if (disableBrowserValidation) {
      e.target.setCustomValidity("");
    }
  };

  return (
    <Box>
      <Typography
        sx={{
          fontWeight: "450",
          fontSize: "16px",
          mb: 1,
        }}
      >
        {label || undefined}
        {label && required && (
          <Box component="span" sx={{ color: "red", ml: 0.5 }}>
            *
          </Box>
        )}
      </Typography>
      <TextField
        ref={inputRef}
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth={fullWidth}
        disabled={disabled}
        multiline={multiline}
        rows={multiline ? rows : 1}
        error={hasError}
        helperText={displayError}
        inputProps={{
          // Disable HTML5 validation attributes
          ...(disableBrowserValidation && {
            "aria-invalid": hasError,
            "data-no-validate": true,
          }),
        }}
        InputProps={{
          startAdornment:
            adornment && adornmentPosition === "left" ? (
              <InputAdornment position="start">{adornment}</InputAdornment>
            ) : undefined,
          endAdornment:
            adornment && adornmentPosition === "right" ? (
              <InputAdornment position="end">{adornment}</InputAdornment>
            ) : undefined,
        }}
      />
    </Box>
  );
};

export default CustomInput;
