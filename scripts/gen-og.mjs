import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b1120"/>
      <stop offset="100%" stop-color="#111c34"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#818cf8"/>
      <stop offset="100%" stop-color="#c084fc"/>
    </linearGradient>
    <radialGradient id="glow" cx="20%" cy="20%" r="60%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="0" y="0" width="1200" height="8" fill="url(#accent)"/>
  <text x="90" y="232" font-family="Helvetica, Arial, sans-serif" font-size="92" font-weight="700" fill="#f8fafc">Akimasa Sugai</text>
  <text x="94" y="302" font-family="Helvetica, Arial, sans-serif" font-size="38" font-weight="600" fill="url(#accent)">AI-Driven Development Engineer</text>
  <text x="94" y="386" font-family="Helvetica, Arial, sans-serif" font-size="29" font-weight="400" fill="#cbd5e1">Making AI-driven development run reliably —</text>
  <text x="94" y="426" font-family="Helvetica, Arial, sans-serif" font-size="29" font-weight="400" fill="#cbd5e1">UI/UX to infrastructure, full-stack.</text>
  <text x="94" y="560" font-family="Helvetica, Arial, sans-serif" font-size="28" font-weight="500" fill="#64748b">saedgewell.com</text>
</svg>`;

const png = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync('public/images/og-default.png', png);
console.log('OG png bytes:', png.length);
