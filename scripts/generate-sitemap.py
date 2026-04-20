#!/usr/bin/env python3
"""
generate-sitemap.py
Lee los URLs de nav.js y genera sitemap.xml automáticamente.

Uso:  python3 scripts/generate-sitemap.py
      (correrlo desde la raíz del proyecto)

Correrlo cada vez que se agreguen calculadoras a nav.js,
antes de hacer git push.
"""

import re
import os
from datetime import date

ROOT    = os.path.join(os.path.dirname(__file__), '..')
NAV_JS  = os.path.join(ROOT, 'nav.js')
SITEMAP = os.path.join(ROOT, 'sitemap.xml')
BASE    = 'https://calculadora.live'
TODAY   = date.today().isoformat()

# ── Extraer URLs de nav.js ────────────────────────────────────────────────
with open(NAV_JS, encoding='utf-8') as f:
    nav_content = f.read()

urls = re.findall(r"u\s*:\s*['\"](/[^'\"]*)['\"]", nav_content)

if not urls:
    print('❌  No se encontraron URLs en nav.js')
    exit(1)

# ── Prioridades por sección ───────────────────────────────────────────────
HIGH = {'/sueldo-neto', '/aguinaldo', '/porcentaje', '/imc', '/proteina', '/bmr'}

def priority(u):
    if u == '/':      return '1.0'
    if u in HIGH:     return '0.9'
    return '0.8'

def changefreq(u):
    return 'weekly' if u == '/' else 'monthly'

# ── Generar XML ───────────────────────────────────────────────────────────
all_urls = ['/'] + urls

blocks = ''
for u in all_urls:
    blocks += f"""
  <url>
    <loc>{BASE}{u}</loc>
    <lastmod>{TODAY}</lastmod>
    <changefreq>{changefreq(u)}</changefreq>
    <priority>{priority(u)}</priority>
  </url>"""

xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{blocks}
</urlset>
"""

with open(SITEMAP, 'w', encoding='utf-8') as f:
    f.write(xml)

print(f'✅  sitemap.xml generado con {len(all_urls)} URLs ({TODAY})')
for u in all_urls:
    print(f'   {BASE}{u}')
