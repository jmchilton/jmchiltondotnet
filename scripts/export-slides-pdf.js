#!/usr/bin/env node
// Export a reveal.js slide deck to PDF via decktape.
//
// Needs a running server (dev or preview) serving the deck. The deck's
// SlideLayout honors a `?pdf` query param: it strips on-screen chrome
// (controls, progress, slide number, Astro dev toolbar) and pre-renders every
// Mermaid diagram up front, so decktape never captures a half-drawn slide.
//
// Usage:
//   node scripts/export-slides-pdf.js [slug] [outPath]
//   SLIDES_BASE=http://localhost:4321 node scripts/export-slides-pdf.js gcc2026
//
// Defaults: slug=gcc2026, base=http://localhost:4331, out=dist-pdf/<slug>.pdf
import { mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { spawnSync } from 'child_process';

const slug = process.argv[2] || 'gcc2026';
const out = resolve(process.argv[3] || `dist-pdf/${slug}.pdf`);
const base = process.env.SLIDES_BASE || 'http://localhost:4331';
const url = `${base}/slides/${slug}?pdf=1`;

const res = await fetch(url).catch(() => null);
if (!res || !res.ok) {
  console.error(`✗ Cannot reach ${url} (status ${res?.status ?? 'no server'}).`);
  console.error('  Start the server first: `npm run dev` (or `npm run preview`).');
  process.exit(1);
}

mkdirSync(dirname(out), { recursive: true });
console.log(`Exporting ${url} -> ${out}`);

// 960x700 matches the deck's slide dimensions; --pause gives async renders
// (Mermaid) time to settle before each slide is captured.
const r = spawnSync(
  'npx',
  ['-y', 'decktape@latest', 'reveal', url, out, '--size', '960x700', '--pause', '800'],
  { stdio: 'inherit' }
);
process.exit(r.status ?? 1);
