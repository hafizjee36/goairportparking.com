import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, 'src', 'assets');
const optimizedDir = path.join(assetsDir, 'optimized');

// Create optimized directory if it doesn't exist
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);
    
    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const savedPercent = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(1);
    
    console.log(`✓ ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
    console.log(`  Size: ${(inputStats.size / 1024).toFixed(0)}KB → ${(outputStats.size / 1024).toFixed(0)}KB (${savedPercent}% smaller)\n`);
  } catch (error) {
    console.error(`✗ Error converting ${inputPath}:`, error.message);
  }
}

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && file !== 'optimized') {
      await processDirectory(filePath);
    } else if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const fileName = path.basename(file, ext);
        const outputPath = path.join(optimizedDir, `${fileName}.webp`);
        
        // Skip if webp already exists and is newer
        if (fs.existsSync(outputPath)) {
          const outputStat = fs.statSync(outputPath);
          if (outputStat.mtime > stat.mtime) {
            console.log(`⊘ Skipping ${file} (WebP already exists and is newer)`);
            continue;
          }
        }
        
        await convertToWebP(filePath, outputPath);
      }
    }
  }
}

console.log('🔄 Converting images to WebP...\n');
processDirectory(assetsDir).then(() => {
  console.log('✅ All images converted!');
}).catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
