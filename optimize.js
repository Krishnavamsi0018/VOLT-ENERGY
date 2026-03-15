const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const FLAVORS = ['plasma', 'ultraviolet', 'arctic', 'inferno'];
const IMAGES_DIR = path.join(__dirname, 'public', 'images');

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function processFlavor(flavor) {
  console.log(`\n⚡ Processing ${flavor}...`);
  const flavorDir = path.join(IMAGES_DIR, flavor);
  const desktopDir = path.join(flavorDir, 'desktop');
  const mobileDir = path.join(flavorDir, 'mobile');

  await ensureDir(desktopDir);
  await ensureDir(mobileDir);

  for (let i = 1; i <= 96; i++) {
    const srcPath = path.join(flavorDir, `${i}.png`);
    if (!fs.existsSync(srcPath)) {
      console.warn(`Missing: ${srcPath}`);
      continue;
    }

    const desktopDest = path.join(desktopDir, `${i}.webp`);
    const mobileDest = path.join(mobileDir, `${i}.webp`);

    try {
      // 1. Desktop WebP (full size, 80% quality)
      await sharp(srcPath)
        .webp({ quality: 80, effort: 4 })
        .toFile(desktopDest);

      // 2. Mobile WebP (640px height max to maintain ratio, 70% quality)
      // Since it's a vertical bottle, resizing height or width matters.
      // E.g., original is ~ 1080x1920
      await sharp(srcPath)
        .resize({ width: 640, withoutEnlargement: true })
        .webp({ quality: 70, effort: 4 })
        .toFile(mobileDest);

      if (i % 24 === 0) {
        console.log(`   Processed ${i}/96 frames for ${flavor}`);
      }
    } catch (err) {
      console.error(`Error processing ${srcPath}:`, err);
    }
  }
  console.log(`✅ Finished ${flavor}.`);
}

async function run() {
  console.log('Starting VOLT Energy image optimization...');
  for (const f of FLAVORS) {
    await processFlavor(f);
  }
  console.log('\n🚀 All flavors optimized to WebP!');
}

run();
