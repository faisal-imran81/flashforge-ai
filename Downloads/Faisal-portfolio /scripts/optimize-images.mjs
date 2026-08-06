import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/,'')), '..');
const kb = (n) => (n / 1024).toFixed(0).padStart(6) + ' KB';
const rows = [];

function record(label, before, after) {
  rows.push({ label, before, after });
}

// ---------------------------------------------------------------
// 1. OG image — stays 1200x630. Must be under ~300KB or WhatsApp
//    silently drops the preview image. Source alpha is fully opaque,
//    so removeAlpha() is pixel-identical, and the re-encode is lossless.
// ---------------------------------------------------------------
{
  const p = path.join(ROOT, 'public/og-image.png');
  const before = fs.statSync(p).size;
  const buf = await sharp(p).removeAlpha().png({ compressionLevel: 9, effort: 10 }).toBuffer();
  fs.writeFileSync(p, buf);
  record('og-image.png  1200x630 (lossless)', before, buf.length);
}

// ---------------------------------------------------------------
// 2. Icons — every slot was the same 512x512 master, so the browser
//    downloaded 369KB to paint a 180px icon. Render each at its
//    declared size.
// ---------------------------------------------------------------
{
  const master = fs.readFileSync(path.join(ROOT, 'public/icon-512.png'));
  for (const [rel, size] of [
    ['public/apple-touch-icon.png', 180],
    ['public/icon-192.png', 192],
    ['public/icon-32.png', 32],
    ['public/icon-512.png', 512],
  ]) {
    const p = path.join(ROOT, rel);
    const before = fs.statSync(p).size;
    let pipe = sharp(master).resize(size, size, { fit: 'cover' });
    // iOS composites apple-touch-icon alpha onto black; flatten to theme bg.
    if (rel.includes('apple-touch')) pipe = pipe.flatten({ background: '#080b12' });
    const buf = await pipe.png({ compressionLevel: 9, effort: 10 }).toBuffer();
    fs.writeFileSync(p, buf);
    record(`${path.basename(rel).padEnd(21)} ${size}x${size}`, before, buf.length);
  }
}

// ---------------------------------------------------------------
// 3. Content images -> WebP at NATIVE resolution.
//    No downscaling: pixel dimensions are unchanged, so nothing can
//    soften on retina. The saving comes purely from the codec.
// ---------------------------------------------------------------
{
  const sources = [
    ...['avatar-hero', 'avatar-desk'].map((n) => [`src/assets/${n}.png`, 86]),
    ...[1, 2, 3, 4, 5].map((i) => [`src/assets/project-${i}.jpg`, 84]),
  ];
  for (const [rel, quality] of sources) {
    const p = path.join(ROOT, rel);
    if (!fs.existsSync(p)) continue;
    const before = fs.statSync(p).size;
    const meta = await sharp(p).metadata();
    const out = p.replace(/\.(png|jpg)$/, '.webp');
    const buf = await sharp(p)
      .webp({ quality, effort: 6, alphaQuality: 100 })
      .toBuffer();
    fs.writeFileSync(out, buf);
    record(`${path.basename(out).padEnd(21)} ${meta.width}x${meta.height}`, before, buf.length);
  }
}

let tb = 0, ta = 0;
console.log('\n  ' + 'asset'.padEnd(34) + 'before'.padStart(9) + 'after'.padStart(10) + '     saved');
console.log('  ' + '-'.repeat(68));
for (const r of rows) {
  tb += r.before; ta += r.after;
  console.log('  ' + r.label.padEnd(34) + kb(r.before) + kb(r.after) + '   ' +
    ((100 - (r.after / r.before) * 100).toFixed(0) + '%').padStart(6));
}
console.log('  ' + '-'.repeat(68));
console.log('  ' + 'TOTAL'.padEnd(34) + kb(tb) + kb(ta) + '   ' +
  ((100 - (ta / tb) * 100).toFixed(0) + '%').padStart(6));
