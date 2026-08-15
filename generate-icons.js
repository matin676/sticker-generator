import fs from 'fs';
import sharp from 'sharp';
import path from 'path';

const svgBuffer = fs.readFileSync(path.resolve('./public/icon.svg'));

async function generate() {
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.resolve('./public/pwa-192x192.png'));
    
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.resolve('./public/pwa-512x512.png'));
    
  console.log('PNG icons generated successfully.');
}

generate();
