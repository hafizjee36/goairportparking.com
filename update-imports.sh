#!/bin/bash

# Find all JS/JSX/TS/TSX files and update imports
find /var/www/goairportparking.com/src -type f \( -name "*.jsx" -o -name "*.js" -o -name "*.tsx" -o -name "*.ts" \) -exec sed -i \
  -e 's|from "\.\./\.\./\.\./assets/\([^"]*\)\.png"|from "../../../assets/optimized/\1.webp"|g' \
  -e 's|from "\.\./\.\./assets/\([^"]*\)\.png"|from "../../assets/optimized/\1.webp"|g' \
  -e 's|from "\.\./assets/\([^"]*\)\.png"|from "../assets/optimized/\1.webp"|g' \
  -e 's|from "./assets/\([^"]*\)\.png"|from "./assets/optimized/\1.webp"|g' \
  -e 's|from "\.\./\.\./\.\./assets/\([^"]*\)\.jpg"|from "../../../assets/optimized/\1.webp"|g' \
  -e 's|from "\.\./\.\./assets/\([^"]*\)\.jpg"|from "../../assets/optimized/\1.webp"|g' \
  -e 's|from "\.\./assets/\([^"]*\)\.jpg"|from "../assets/optimized/\1.webp"|g' \
  -e 's|from "./assets/\([^"]*\)\.jpg"|from "./assets/optimized/\1.webp"|g' \
  -e 's|from "\.\./\.\./\.\./assets/\([^"]*\)\.jpeg"|from "../../../assets/optimized/\1.webp"|g' \
  -e 's|from "\.\./\.\./assets/\([^"]*\)\.jpeg"|from "../../assets/optimized/\1.webp"|g' \
  -e 's|from "\.\./assets/\([^"]*\)\.jpeg"|from "../assets/optimized/\1.webp"|g' \
  -e 's|from "./assets/\([^"]*\)\.jpeg"|from "./assets/optimized/\1.webp"|g' \
  {} +

echo "✅ Import statements updated to use WebP images"
