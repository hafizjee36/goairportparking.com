#!/bin/bash

# Performance Optimization Verification Script
# Run this to check which optimizations have been applied

echo "🔍 Checking Performance Optimizations..."
echo "=========================================="
echo ""

# Check Home components for React.memo()
echo "📦 Checking Home Page Components for React.memo():"
echo ""

components=(
  "src/pages/Home/components/HowItWorks.jsx"
  "src/pages/Home/components/GlobalServices.jsx"
  "src/pages/Home/components/Welcome.jsx"
  "src/pages/Home/components/OurServices.jsx"
  "src/pages/Home/components/Customers.jsx"
  "src/pages/Home/components/CustomerReview.jsx"
  "src/pages/Home/components/Subscribe.jsx"
  "src/pages/Home/components/Frequently.jsx"
  "src/pages/Home/components/Question.jsx"
  "src/pages/Home/components/Hero.jsx"
)

optimized=0
not_optimized=0

for component in "${components[@]}"; do
  if [ -f "$component" ]; then
    if grep -q "memo(" "$component" && grep -q "import.*memo" "$component"; then
      echo "✅ $(basename $component) - Optimized"
      ((optimized++))
    else
      echo "❌ $(basename $component) - NOT optimized"
      ((not_optimized++))
    fi
  else
    echo "⚠️  $(basename $component) - File not found"
  fi
done

echo ""
echo "---"
echo ""

# Check Footer
echo "🦶 Checking Footer Component:"
if [ -f "src/components/Footer.jsx" ]; then
  if grep -q "memo(" "src/components/Footer.jsx" && grep -q "import.*memo" "src/components/Footer.jsx"; then
    echo "✅ Footer.jsx - Optimized"
    ((optimized++))
  else
    echo "❌ Footer.jsx - NOT optimized"
    ((not_optimized++))
  fi
else
  echo "⚠️  Footer.jsx - File not found"
fi

echo ""

# Check Navbar
echo "🧭 Checking Navbar Component:"
if [ -f "src/components/Navbar.jsx" ]; then
  if grep -q "memo(" "src/components/Navbar.jsx" && grep -q "import.*memo" "src/components/Navbar.jsx"; then
    echo "✅ Navbar.jsx - Optimized"
    ((optimized++))
  else
    echo "❌ Navbar.jsx - NOT optimized"
    ((not_optimized++))
  fi
else
  echo "⚠️  Navbar.jsx - File not found"
fi

echo ""
echo "---"
echo ""

# Check Booking parseHtmlFeatures
echo "📄 Checking Booking Component for useMemo:"
booking_files=$(find src -name "Booking.jsx" 2>/dev/null)
if [ -n "$booking_files" ]; then
  for file in $booking_files; do
    if grep -q "useMemo" "$file"; then
      echo "✅ Booking.jsx - Has useMemo optimization"
    else
      echo "❌ Booking.jsx - Missing useMemo optimization"
    fi
  done
else
  echo "⚠️  Booking.jsx - File not found"
fi

echo ""
echo "---"
echo ""

# Check font optimization
echo "🔤 Checking Font Optimization:"
if [ -f "index.html" ]; then
  if grep -q "preconnect.*fonts.googleapis.com" "index.html"; then
    echo "✅ index.html - Font preconnect added"
  else
    echo "❌ index.html - Missing font preconnect"
  fi
else
  echo "⚠️  index.html - File not found"
fi

echo ""
echo "=========================================="
echo "📊 SUMMARY"
echo "=========================================="
echo "✅ Optimized: $optimized"
echo "❌ Not Optimized: $not_optimized"
echo ""

if [ $not_optimized -eq 0 ]; then
  echo "🎉 All optimizations applied! Great job!"
  echo ""
  echo "Next steps:"
  echo "1. Run: npm run build"
  echo "2. Test the site: npm run preview"
  echo "3. Check Phase 2 optimizations in PERFORMANCE_OPTIMIZATION_GUIDE.md"
else
  echo "⚠️  Some optimizations are missing."
  echo "Refer to QUICK_WINS_IMPLEMENTATION.md for instructions"
fi

echo ""
