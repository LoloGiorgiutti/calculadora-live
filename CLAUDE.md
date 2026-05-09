# calculadora.live — Contexto del proyecto

## Qué es esto
Sitio web de calculadoras y herramientas financieras/prácticas para el mercado hispanohablante,
con foco en Argentina. URL pública: https://calculadora.live

## Stack
- HTML/CSS/JS puro, sin frameworks ni bundlers
- Archivos estáticos servidos desde **GitHub Pages**
- Repo: `git@github.com:LoloGiorgiutti/calculadora-live.git` (rama `main`)
- Deploy: automático al hacer `git push origin main` (GitHub Pages sirve directamente desde `main`)
- **Siempre hacer `git push origin main` después de cada commit** para que los cambios lleguen al sitio

## Estructura general
```
/                        ← Homepage con grid de categorías
/nav.js                  ← Header compartido, menú hamburguesa, toggle dark/light mode
/patente/                ← Referencia de diseño: header correcto, dark/light mode
/countdowns/             ← Sección de cuentas regresivas (ver más abajo)
/countdowns-data.json    ← Datos de eventos con fecha variable (editado vía admin)
/rankings/               ← Rankings de popularidad de calculadoras (GA4)
/rankings-data.json      ← Datos de rankings actualizados diariamente por GitHub Actions
/mundial/                ← Página especial del Mundial 2026
/scripts/                ← Scripts de mantenimiento (Python, actualización de rankings)
/sitemap.xml
/robots.txt
```

## nav.js — Sistema de navegación global
- Se incluye con `<script src="/nav.js"></script>` al final del body de cada página
- Inyecta: menú hamburguesa (izquierda del header), toggle dark/light mode (derecha del header)
- **Requiere** que exista un `<header>` en el HTML de la página
- Aplica dark mode vía atributo `html[data-theme="dark"]`
- Contiene dark mode overrides para todos los componentes del sitio

## Header — patrón correcto (basado en /patente/)
Cada página debe tener este HTML + CSS para que nav.js funcione:

```html
<header>
  <a class="logo" href="/">Calculadora<span>.live</span></a>
</header>
```

```css
:root {
  --bg:#F7F8FA; --surface:#FFF; --ink:#080A12; --ink-light:#60647A;
  --ink-faint:#B4B8CC; --hi:#1A5FE8; --hi-soft:#EEF3FD;
  --border:#D4D8E6; --radius:16px; --radius-sm:10px;
}
* { box-sizing:border-box; margin:0; padding:0; }
body { font-family:'DM Sans',sans-serif; background:var(--bg); color:var(--ink); min-height:100vh; }
header { background:var(--surface); border-bottom:1px solid var(--border); padding:0 24px;
  height:58px; display:flex; align-items:center; position:sticky; top:0; z-index:100; }
.logo { font-size:18px; font-weight:700; color:var(--ink); text-decoration:none;
  letter-spacing:-0.02em; flex:1; }
.logo span { color:var(--hi); }
```

nav.js luego sobreescribe `background` y `border-bottom-color` del header para light/dark mode.

## Sección /countdowns/
Sistema de cuentas regresivas para eventos. Archivos clave:
- `/countdowns/countdown-engine.js` — engine compartido, toda la lógica
- `/countdowns/countdown.css` — estilos compartidos (incluye header base, hero, cards, FAQ)
- `/countdowns/index.html` — hub con todos los contadores agrupados por sección
- `/countdowns/[slug]/index.html` — página individual por evento
- `/countdowns/admin/index.html` — admin protegido por contraseña, actualiza el JSON vía GitHub API
- `/countdowns-data.json` — fechas de eventos "variable" y notas

### Tipos de evento en el engine
- `auto` → fecha calculada en JS (Navidad, Año Nuevo, próximo feriado, etc.)
- `variable` → fecha leída desde countdowns-data.json (GTA VI, iPhone, F1, etc.)
- `one-time` → muestra "ya ocurrió" cuando la fecha pasó

### Colores por categoría
- Lanzamientos: violeta `#8B5CF6`
- Tiempo: celeste `#0EA5E9`
- Eventos: rosa `#F43F5E`
- Argentina: azul `#60A5FA`
- Descuentos: verde `#10B981`
- Días festivos: ámbar `#F59E0B`

### SEO content en páginas individuales
El engine soporta campos `content` (párrafo) y `faqs` (array de {q,a}) en el config.
GTA VI e iPhone ya tienen estos campos completos como referencia.

## Fechas importantes en countdowns-data.json
- GTA VI: 19 de noviembre de 2026 (PS5/Xbox Series X|S, sin fecha de PC)
- iPhone: 9 de septiembre de 2026 (estimado)
- F1 próxima carrera: GP Mónaco, 24 mayo 2026
- Final Champions: 30 mayo 2026, Budapest
- Eclipse solar: 12 agosto 2026

## Rankings (/rankings/)
- Datos actualizados diariamente por GitHub Actions (`.github/workflows/`)
- Script Python: `/scripts/update_rankings.py` usa Google Analytics 4 API
- Datos en `/rankings-data.json`

## Mundial 2026
- Página especial en `/mundial/` (no es un countdown estándar)
- El countdown del Mundial en el hub usa `type:'_ext'` con fecha hardcodeada: 11 jun 2026

## Proyectos relacionados (repos separados)
- **countdowns-live** (`~/Desktop/countdowns-live/`) — futuro sitio dedicado de countdowns en inglés, con diseño propio
- **rankings-live** — futuro sitio dedicado de rankings (pendiente de crear)

## Convenciones de código
- Sin frameworks — HTML/CSS/JS vanilla puro
- CSS variables en `:root` para theming
- Fuente: DM Sans (Google Fonts)
- Commits en español, descriptivos
- Siempre `git push origin main` después de commitear

## Cosas a NO hacer
- No usar bundlers (webpack, vite, etc.)
- No agregar dependencias npm
- No romper el header — siempre verificar que nav.js pueda inyectarse
- No olvidar el `git push` al terminar
