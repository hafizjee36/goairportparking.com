#!/bin/bash

# Add loading="lazy" to img tags that don't already have it
# Skip Hero and critical above-the-fold components

EXCLUDE_FILES=(
  "/var/www/goairportparking.com/src/pages/home/components/Hero.jsx"
  "/var/www/goairportparking.com/src/components/Navbar.jsx"
)

find /var/www/goairportparking.com/src -type f \( -name "*.jsx" -o -name "*.tsx" \) | while read file; do
  # Skip excluded files
  skip=0
  for exclude in "${EXCLUDE_FILES[@]}"; do
    if [ "$file" = "$exclude" ]; then
      skip=1
      break
    fi
  done
  
  if [ $skip -eq 1 ]; then
    continue
  fi
  
  # Add loading="lazy" to img tags that don't have it
  # Match <img but not <img loading=
  sed -i -E 's/<img([^>]*)(src=[^>]*)([^>]*)>/<img\1\2 loading="lazy"\3>/g' "$file"
  
  # Clean up duplicate loading attributes if any
  sed -i -E 's/loading="lazy"[[:space:]]+loading="lazy"/loading="lazy"/g' "$file"
done

echo "✅ Lazy loading added to images"
