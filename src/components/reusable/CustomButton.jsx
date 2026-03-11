// components/ui/CustomButton.jsx
import React from "react";
import { Button, CircularProgress, Box } from "@mui/material";

const CustomButton = ({
  children,
  onClick,
  disabled = false,
  isLoading = false,
  size = "medium",
  fullWidth = false,
  startIcon = null,
  endIcon = null,
  sx = {},
  type = "button",
  href,
  target,
  rel,
  component,
  variant = "contained",
  loadingText = null,
  customVariant, // Extract customVariant to prevent it from being passed to DOM
  ...otherProps
}) => {
  const handleClick = (event) => {
    if (isLoading || disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  // Size configurations
  const sizeConfig = {
    small: { loadingSize: 16 },
    medium: { loadingSize: 20 },
    large: { loadingSize: 24 },
  };

  const currentSize = sizeConfig[size] || sizeConfig.medium;

  // Simple styling
  const buttonStyles = {
    textTransform: "none",
    fontWeight: 500,
    position: "relative",
    transition: "all 0.3s ease-in-out",
    borderRadius: "6px",
    ...(isLoading && {
      pointerEvents: "none",
    }),
    ...sx,
  };

  return (
    <Button
      variant={variant}
      size={size}
      type={type}
      onClick={handleClick}
      disabled={disabled || isLoading}
      fullWidth={fullWidth}
      href={href}
      target={target}
      rel={rel}
      color={"primary"}
      component={component}
      startIcon={!isLoading ? startIcon : null}
      endIcon={!isLoading ? endIcon : null}
      sx={{
        ...buttonStyles,
        boxShadow: "none",
        "&:hover": { boxShadow: "none" },
        "&:active": { boxShadow: "none" },
      }}
      {...otherProps}
    >
      {/* Loading Spinner */}
      {isLoading && (
        <CircularProgress
          size={currentSize.loadingSize}
          sx={{
            position: "absolute",
            color: "inherit",
          }}
        />
      )}

      {/* Button Content */}
      <Box
        sx={{
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.2s ease",
        }}
      >
        {isLoading && loadingText ? loadingText : children}
      </Box>
    </Button>
  );
};

export default CustomButton;
