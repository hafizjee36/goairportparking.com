import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirs = ['BirminghamImages', 'DublinImages', 'HeathrowImages', 'LeedsImages', 'ManchesterImages'];

async function convertImages() {
  for (const dir of dirs) {
    const dirPath = path.join(__dirname, 'src', 'assets', dir);
    console.log(`\nConverting ${dir}...`);
    
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const inputPath = path.join(dirPath, file);
        const fileName = path.basename(file, ext);
        const outputPath = path.join(dirPath, `${fileName}.webp`);
        
        try {
          await sharp(inputPath)
            .webp({ quality: 85, effort: 6 })
            .toFile(outputPath);
          
          const inputStats = fs.statSync(inputPath);
          const outputStats = fs.statSync(outputPath);
          const saved = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(1);
          console.log(`  ✓ ${file} → ${fileName}.webp (${saved}% smaller)`);
        } catch (error) {
          console.error(`  ✗ Error converting ${file}:`, error.message);
        }
      }
    }
  }
  console.log('\n✅ All subdirectory images converted!');
}

convertImages();
