#!/usr/bin/env node
/**
 * generate-sitemap.js
 * Lee los URLs de nav.js y genera sitemap.xml automáticamente.
 * Uso: node scripts/generate-sitemap.js
 *
 * Correrlo cada vez que se agreguen calculadoras nuevas a nav.js,
 * antes de hacer git push.
 */

const fs   = require('fs');
const path = require('path');

const ROOT    = path.join(__dirname, '..');
const NAV_JS  = path.join(ROOT, 'nav.js');
const SITEMAP = path.join(ROOT, 'sitemap.xml');
const BASE    = 'https://calculadora.live';

// Fecha de hoy en formato YYYY-MM-DD
const today = new Date().toISOString().split('T')[0];

// ── Extraer URLs de nav.js ────────────────────────────────────────────────
// Buscamos todos los { ..., u: '/ruta', ... } en el array CALCS
const navContent = fs.readFileSync(NAV_JS, 'utf8');
const urlMatches = [...navContent.matchAll(/u\s*:\s*['"]([^'"]+)['"]/g)];
const urls = urlMatches.map(m => m[1]).filter(u => u.startsWith('/'));

if(!urls.length){
  console.error('❌  No se encontraron URLs en nav.js');
  process.exit(1);
}

// ── Prioridades por sección ───────────────────────────────────────────────
// Las calculadoras de finanzas y salud tienen alta demanda → prioridad 0.9
const HIGH_PRIORITY = ['/sueldo-neto', '/aguinaldo', '/porcentaje', '/imc', '/proteina', '/bmr'];

function priority(u){
  if(u === '/')             return '1.0';
  if(HIGH_PRIORITY.includes(u)) return '0.9';
  return '0.8';
}

function changefreq(u){
  return u === '/' ? 'weekly' : 'monthly';
}

// ── Generar XML ───────────────────────────────────────────────────────────
const urlBlocks = ['/', ...urls].map(u => `
  <url>
    <loc>${BASE}${u}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq(u)}</changefreq>
    <priority>${priority(u)}</priority>
  </url>`).join('');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlBlocks}
</urlset>
`;

fs.writeFileSync(SITEMAP, xml, 'utf8');
console.log(`✅  sitemap.xml generado con ${urls.length + 1} URLs (${today})`);
urls.forEach(u => console.log(`   ${BASE}${u}`));
