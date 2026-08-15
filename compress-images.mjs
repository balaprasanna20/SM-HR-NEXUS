/**
 * compress-images.mjs
 * Compresses hero-skyline.webp and logo-icon.png using jimp (already in devDependencies).
 * Run: node compress-images.mjs
 */

import { Jimp } from 'jimp';
import { statSync } from 'fs';

const kb = (bytes) => Math.round(bytes / 1024) + ' KB';

async function compressWebP(srcPath, destPath) {
  const before = statSync(srcPath).size;
  const img = await Jimp.read(srcPath);

  // Resize if larger than 1920px wide (the skyline is huge)
  if (img.bitmap.width > 1920) {
    img.resize({ w: 1920 });
  }

  // Write back as webp
  await img.write(destPath);

  const after = statSync(destPath).size;
  console.log(`✅ ${srcPath}`);
  console.log(`   Before: ${kb(before)}  →  After: ${kb(after)}  (saved ${kb(before - after)})`);
}

async function compressPNG(srcPath, destPath) {
  const before = statSync(srcPath).size;
  const img = await Jimp.read(srcPath);

  // Logo should be at most 400px wide — preserve aspect ratio
  if (img.bitmap.width > 400) {
    img.resize({ w: 400 });
  }

  await img.write(destPath);

  const after = statSync(destPath).size;
  console.log(`✅ ${srcPath}`);
  console.log(`   Before: ${kb(before)}  →  After: ${kb(after)}  (saved ${kb(before - after)})`);
}

console.log('🔧 Compressing heavy images...\n');

try {
  await compressWebP(
    'public/images/hero-skyline.webp',
    'public/images/hero-skyline.webp'
  );
} catch (e) {
  console.error('❌ WebP compression failed:', e.message);
}

try {
  await compressPNG(
    'public/logo-icon.png',
    'public/logo-icon.png'
  );
} catch (e) {
  console.error('❌ PNG compression failed:', e.message);
}

console.log('\n✨ Done. Check file sizes above.');
