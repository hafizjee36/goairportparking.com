const fs = require('fs');
const path = require('path');

// List of files to optimize with React.memo()
const filesToOptimize = [
  'src/pages/Home/components/HowItWorks.jsx',
  'src/pages/Home/components/GlobalServices.jsx',
  'src/pages/Home/components/Welcome.jsx',
  'src/pages/Home/components/OurServices.jsx',
  'src/pages/Home/components/Customers.jsx',
  'src/pages/Home/components/CustomerReview.jsx',
  'src/pages/Home/components/Subscribe.jsx',
  'src/pages/Home/components/Frequently.jsx',
  'src/pages/Home/components/Question.jsx',
  'src/pages/Home/components/Hero.jsx',
  'src/components/Footer.jsx',
  'src/components/Navbar.jsx',
];

function addReactMemo(filePath) {
  const fullPath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`❌ File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(fullPath, 'utf8');

  // Check if already has memo
  if (content.includes('memo(') || content.includes('React.memo(')) {
    console.log(`⏭️  Already optimized: ${filePath}`);
    return false;
  }

  // Check if memo is already imported
  const hasReactImport = /import\s+(?:React,?\s*)?{[^}]*}\s+from\s+['"]react['"]/.test(content);
  const hasMemoImport = content.includes('memo');

  // Add memo import if needed
  if (!hasMemoImport) {
    if (hasReactImport) {
      // Add memo to existing React import
      content = content.replace(
        /import\s+{([^}]*)}\s+from\s+['"]react['"]/,
        (match, imports) => {
          const trimmedImports = imports.trim();
          return `import { memo, ${trimmedImports} } from "react"`;
        }
      );
    } else {
      // Add new import at the top
      const firstImport = content.indexOf('import');
      if (firstImport !== -1) {
        content = content.slice(0, firstImport) +
                  'import { memo } from "react";\n' +
                  content.slice(firstImport);
      }
    }
  }

  // Find the component export
  const exportDefaultMatch = content.match(/export\s+default\s+function\s+(\w+)/);

  if (!exportDefaultMatch) {
    console.log(`⚠️  No 'export default function' found in: ${filePath}`);
    return false;
  }

  const componentName = exportDefaultMatch[1];

  // Replace 'export default function ComponentName' with 'function ComponentName'
  content = content.replace(
    /export\s+default\s+function\s+(\w+)/,
    'function $1'
  );

  // Add memo export at the end
  const lastBraceIndex = content.lastIndexOf('}');
  if (lastBraceIndex !== -1) {
    content = content.slice(0, lastBraceIndex + 1) +
              `\n\nexport default memo(${componentName});\n`;
  }

  // Write the modified content back
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✅ Optimized: ${filePath}`);
  return true;
}

// Main execution
console.log('🚀 Adding React.memo() to components...\n');

let successCount = 0;
let skippedCount = 0;
let errorCount = 0;

filesToOptimize.forEach(file => {
  try {
    const result = addReactMemo(file);
    if (result) successCount++;
    else skippedCount++;
  } catch (error) {
    console.log(`❌ Error processing ${file}:`, error.message);
    errorCount++;
  }
});

console.log('\n📊 Summary:');
console.log(`✅ Optimized: ${successCount} files`);
console.log(`⏭️  Skipped: ${skippedCount} files`);
console.log(`❌ Errors: ${errorCount} files`);
console.log('\n✨ Done!');
