(function () {
  'use strict';

  /* ── CALCULADORAS ─────────────────────────────────────── */
  /* ── CALCS ─────────────────────────────────────────────────────────────────
     Cada ítem tiene:
       n    = nombre (sidebar y home)
       u    = URL
       d    = descripción corta (sidebar)
       hd   = descripción home (opcional; si no está se usa d)
       icon = emoji para la tarjeta del home
       badge= true → muestra "nuevo"
  ─────────────────────────────────────────────────────────────────────────── */
  var CALCS = [
    { cat: '🚗 Autos', items: [
      { n: 'Calculadora de nafta',   u: '/nafta',             icon:'⛽', d: 'Costo del viaje por combustible',           hd:'¿Cuánto cuesta el viaje en auto? Precio actualizado por tipo de combustible.' },
      { n: 'Calculadora de patente', u: '/patente',            icon:'📋', d: 'Impuesto automotor por provincia',           hd:'Calculá cuánto pagás de patente según la provincia y el valor del auto.' },
      { n: 'Calculadora de service', u: '/service',            icon:'🔧', d: '¿Cuándo te toca el próximo service?',        hd:'¿Cuándo te toca el service y cuánto cuesta aproximadamente?' },
    ]},
    { cat: '💰 Finanzas y economía', items: [
      { n: 'Calculadora de sueldo neto', u: '/sueldo-neto',   icon:'💼', badge:true, d: 'Descuentos ANSES, PAMI y ganancias',         hd:'¿Cuánto te depositan? Calculá tu sueldo neto con descuentos ANSES y PAMI.' },
      { n: 'Calculadora de aguinaldo',   u: '/aguinaldo',     icon:'🎁', badge:true, d: '1° o 2° semestre',                            hd:'Calculá tu SAC del primer o segundo semestre al instante.' },
      { n: 'Rendimiento Mercado Pago',   u: '/mercado-pago',  icon:'💳', d: 'Intereses por días',                          hd:'¿Cuánto ganás dejando plata en Mercado Pago? Calculalo por días.' },
      { n: 'Interés compuesto',          u: '/interes-compuesto', icon:'📈', d: 'Crecimiento de ahorros e inversiones',   hd:'Proyectá el crecimiento de tus ahorros con interés compuesto.' },
      { n: 'Calculadora de préstamo',    u: '/prestamo',      icon:'🏦', d: 'Cuota mensual e intereses totales',           hd:'Cuota, total a pagar e intereses de cualquier préstamo.' },
      { n: 'Calculadora de inflación',   u: '/inflacion',     icon:'📊', d: 'Actualizá precios por inflación histórica',   hd:'¿Cuánto vale hoy lo que costaba antes? Actualizá precios por inflación.' },
    ]},
    { cat: '💪 Salud y entrenamiento', items: [
      { n: 'Calculadora de IMC',          u: '/imc',          icon:'⚖️', d: 'Índice de masa corporal (OMS)',               hd:'Índice de masa corporal con interpretación y peso ideal.' },
      { n: 'Calorías diarias (BMR/TDEE)', u: '/bmr',          icon:'🔥', d: 'Metabolismo basal y TDEE',                    hd:'¿Cuántas calorías necesitás por día según tu actividad?' },
      { n: 'Calculadora de 1RM',          u: '/1rm',          icon:'🏋️', d: 'Repetición máxima por fórmula',             hd:'Estimá tu repetición máxima en cualquier ejercicio.' },
      { n: 'Hidratación diaria',          u: '/hidratacion',  icon:'💧', badge:true, d: '¿Cuánta agua necesitás por día?', hd:'¿Cuánta agua necesitás por día según tu peso y actividad?' },
      { n: 'Proteína diaria',             u: '/proteina',     icon:'🥩', badge:true, d: 'Gramos según tu peso, objetivo y actividad', hd:'¿Cuántos gramos de proteína necesitás según tu objetivo y actividad?' },
    ]},
    { cat: '📅 Fechas y tiempo', items: [
      { n: 'Contador de días',    u: '/dias',       icon:'🗓️', d: 'Días entre fechas, hábiles o corridos',    hd:'¿Cuántos días hay entre dos fechas? También días hábiles.' },
      { n: 'Calculadora de edad', u: '/edad',       icon:'🎂', d: 'Edad exacta en años, meses y días',        hd:'Calculá la edad exacta en años, meses y días.' },
      { n: '¿Qué día fue?',       u: '/dia-semana', icon:'📆', d: 'Día de la semana de cualquier fecha',      hd:'Ingresá una fecha y descubrí qué día de la semana fue o será.' },
    ]},
    { cat: '🔢 Matemática rápida', items: [
      { n: 'Calculadora de porcentajes', u: '/porcentaje',    icon:'%',  badge:true, d: 'X% de Y, variaciones, aumentos y descuentos',    hd:'X% de Y, qué % es X de Y, variación entre dos números, aumentos y descuentos.' },
      { n: 'Regla de tres',              u: '/regla-de-tres', icon:'📐', badge:true, d: 'Proporción directa e inversa al instante',        hd:'Proporción directa e inversa. Ingresá tres valores y el cuarto aparece solo.' },
      { n: 'Conversión de unidades',     u: '/conversion',    icon:'🔄', badge:true, d: 'Longitud, peso, temperatura, velocidad y más',    hd:'Longitud, peso, temperatura, velocidad, área, volumen, tiempo y digital.' },
    ]},
    { cat: '🎲 Generadores y sorteos', items: [
      { n: 'Generador aleatorio', u: '/generador',    icon:'🎰', badge:true, d: 'Números, letras o elementos de una lista',          hd:'Números, letras o elementos de tu propia lista. Con o sin repetición.' },
      { n: 'Tutti Frutti',        u: '/tutti-frutti', icon:'🍉', badge:true, d: 'Sorteo de letras para el juego clásico argentino',  hd:'Sorteo de letras para el juego clásico argentino. Con timer y categorías.' },
    ]},
    { cat: '🤯 Tu vida en números', items: [
      { n: 'Tu vida en números', u: '/vida', icon:'🤯', badge:true, d: 'Latidos, pestañeos, pasos y más en tiempo real', hd:'Latidos, pestañeos, pasos y más — algunos contadores en tiempo real.' },
    ]},
  ];

  /* ── ESTILOS ──────────────────────────────────────────── */
  var css = [
    /* Botón hamburguesa */
    '#nav-toggle{display:flex;align-items:center;justify-content:center;flex-direction:column;gap:4.5px;',
    'width:36px;height:36px;padding:0;background:none;border:none;cursor:pointer;',
    'border-radius:8px;flex-shrink:0;transition:background .15s;}',
    '#nav-toggle:hover{background:rgba(0,0,0,.06);}',
    '#nav-toggle .nb{display:block;width:18px;height:2px;background:#080A12;border-radius:1px;transition:.2s;}',

    /* Backdrop */
    '#nav-bd{display:none;position:fixed;inset:0;background:rgba(0,0,0,.38);z-index:9998;',
    'backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px);}',
    '#nav-bd.nv-open{display:block;}',

    /* Panel */
    '#nav-panel{position:fixed;top:0;left:0;bottom:0;width:min(300px,86vw);',
    'background:#fff;z-index:9999;display:flex;flex-direction:column;',
    'transform:translateX(-100%);transition:transform .28s cubic-bezier(.32,0,.15,1);',
    'box-shadow:4px 0 40px rgba(0,0,0,.18);}',
    '#nav-panel.nv-open{transform:translateX(0);}',

    /* Cabecera del panel */
    '#nav-ph{display:flex;align-items:center;justify-content:space-between;',
    'padding:0 14px 0 18px;height:58px;border-bottom:1px solid #D4D8E6;flex-shrink:0;}',
    '.nv-logo{font-family:"DM Sans",sans-serif;font-size:16px;font-weight:700;',
    'color:#080A12;letter-spacing:-.02em;text-decoration:none;}',
    '.nv-logo span{color:#1A5FE8;}',
    '#nav-x{width:30px;height:30px;border:none;background:none;cursor:pointer;font-size:16px;',
    'color:#60647A;border-radius:6px;display:flex;align-items:center;justify-content:center;',
    'transition:background .12s;}#nav-x:hover{background:#F0F2F7;color:#080A12;}',

    /* Buscador */
    '#nav-sw{padding:10px 14px;border-bottom:1px solid #D4D8E6;flex-shrink:0;',
    'display:flex;align-items:center;gap:8px;background:#F8F9FB;}',
    '#nav-sw svg{flex-shrink:0;color:#B4B8CC;}',
    '#nav-si{flex:1;border:none;background:transparent;font-family:"DM Sans",sans-serif;',
    'font-size:14px;color:#080A12;outline:none;}',
    '#nav-si::placeholder{color:#B4B8CC;}',

    /* Lista */
    '#nav-list{flex:1;overflow-y:auto;padding:6px 0 28px;}',
    '.nvc-title{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;',
    'color:#B4B8CC;padding:14px 18px 5px;}',
    '.nv-item{display:flex;flex-direction:column;gap:1px;padding:9px 18px;',
    'text-decoration:none;color:#080A12;transition:background .12s;',
    'border-left:2.5px solid transparent;}',
    '.nv-item:hover,.nv-item.nv-active{background:#EEF3FD;border-left-color:#1A5FE8;}',
    '.nv-item-n{font-size:13px;font-weight:600;line-height:1.25;}',
    '.nv-item-d{font-size:11px;color:#60647A;line-height:1.3;}',
    '#nav-empty{padding:20px 18px;font-size:13px;color:#B4B8CC;display:none;}',
    '.nv-hr{height:1px;background:#F0F2F7;margin:8px 0;}',
    '.nv-home-link{display:flex;align-items:center;gap:8px;padding:10px 18px;',
    'text-decoration:none;color:#60647A;font-size:13px;font-weight:500;',
    'border-left:2.5px solid transparent;transition:background .12s;}',
    '.nv-home-link:hover{background:#F0F2F7;color:#1A5FE8;}',

    /* Inputs con formato de miles (type cambiado de number a text por el formateador).
       Estas reglas replican el :focus y la transición que el CSS de cada página define
       para input[type="number"], pero ahora aplicado a la clase .nv-num-fmt. */
    'input.nv-num-fmt{transition:border-color .15s;}',
    'input.nv-num-fmt:focus{border-color:#1A5FE8 !important;outline:none;}',
  ].join('');

  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  /* ── BOTÓN ────────────────────────────────────────────── */
  var btn = document.createElement('button');
  btn.id = 'nav-toggle';
  btn.setAttribute('aria-label', 'Abrir menú');
  btn.innerHTML = '<span class="nb"></span><span class="nb"></span><span class="nb"></span>';

  // Inyectar en el header (#site-header tiene prioridad → página de nafta)
  var hdr = document.querySelector('#site-header') || document.querySelector('header');
  if (hdr) {
    // Reducir padding-left para que quepa el botón sin apretar
    var pl = parseInt(window.getComputedStyle(hdr).paddingLeft) || 24;
    if (pl > 12) hdr.style.paddingLeft = '12px';
    hdr.insertBefore(btn, hdr.firstChild);
  }

  /* ── PANEL ────────────────────────────────────────────── */
  var cur = window.location.pathname.replace(/\/$/, '') || '/';

  function buildList() {
    var html = '<a class="nv-home-link" href="/">🏠 Todas las calculadoras</a>';
    html += '<div class="nv-hr"></div>';
    CALCS.forEach(function (cat) {
      html += '<div class="nvc"><div class="nvc-title">' + cat.cat + '</div>';
      cat.items.forEach(function (item) {
        var slug = item.u.replace(/\/$/, '');
        var active = (cur === slug || cur === item.u) ? ' nv-active' : '';
        var search = (item.n + ' ' + item.d).toLowerCase();
        html += '<a class="nv-item' + active + '" href="' + item.u + '" data-s="' + search + '">'
          + '<span class="nv-item-n">' + item.n + '</span>'
          + '<span class="nv-item-d">' + item.d + '</span>'
          + '</a>';
      });
      html += '</div>';
    });
    html += '<div id="nav-empty">Sin resultados</div>';
    return html;
  }

  var bd = document.createElement('div');
  bd.id = 'nav-bd';

  var panel = document.createElement('div');
  panel.id = 'nav-panel';
  panel.innerHTML =
    '<div id="nav-ph">'
    + '<a class="nv-logo" href="/">Calculadora<span>.live</span></a>'
    + '<button id="nav-x" aria-label="Cerrar">✕</button>'
    + '</div>'
    + '<div id="nav-sw">'
    + '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">'
    + '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'
    + '<input id="nav-si" type="text" placeholder="Buscar calculadora…" autocomplete="off" spellcheck="false">'
    + '</div>'
    + '<div id="nav-list">' + buildList() + '</div>';

  document.body.appendChild(bd);
  document.body.appendChild(panel);

  /* ── ABRIR / CERRAR ───────────────────────────────────── */
  function open() {
    panel.classList.add('nv-open');
    bd.classList.add('nv-open');
    document.body.style.overflow = 'hidden';
    setTimeout(function () {
      var si = document.getElementById('nav-si');
      if (si) si.focus();
    }, 220);
  }

  function close() {
    panel.classList.remove('nv-open');
    bd.classList.remove('nv-open');
    document.body.style.overflow = '';
    var si = document.getElementById('nav-si');
    if (si) { si.value = ''; filterNav(''); }
  }

  btn.addEventListener('click', open);
  bd.addEventListener('click', close);
  document.getElementById('nav-x').addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  // Cerrar al navegar (misma SPA o normal)
  panel.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setTimeout(close, 80); });
  });

  /* ── BÚSQUEDA ─────────────────────────────────────────── */
  function filterNav(q) {
    var any = false;
    panel.querySelectorAll('.nvc').forEach(function (cat) {
      var catAny = false;
      cat.querySelectorAll('.nv-item').forEach(function (item) {
        var show = !q || item.dataset.s.includes(q);
        item.style.display = show ? '' : 'none';
        if (show) catAny = true;
      });
      cat.style.display = catAny ? '' : 'none';
      if (catAny) any = true;
    });
    var em = document.getElementById('nav-empty');
    if (em) em.style.display = (!q || any) ? 'none' : 'block';
  }

  document.getElementById('nav-si').addEventListener('input', function () {
    filterNav(this.value.toLowerCase().trim());
  });

  /* ── FORMATEO CON PUNTOS DE MILES EN INPUTS ($  y km) ────
     Convierte inputs type=number con prefijo $ o sufijo km
     a type=text con separador de miles (punto estilo es-AR).
     El getter .value devuelve siempre los dígitos crudos para
     que parseFloat/parseInt del código de cada página siga OK. */
  (function () {
    var proto = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');

    function fmtMiles(s) {
      var n = parseInt(s, 10);
      return isNaN(n) || s === '' ? s : (n >= 1000 ? n.toLocaleString('es-AR') : s);
    }

    function patch(inp) {
      if (inp._numFmtPatched) return;
      inp._numFmtPatched = true;

      // Guardar estilos de layout ANTES de cambiar el tipo, para que las páginas que usan
      // input[type="number"] en su CSS no pierdan padding al cambiar a type=text.
      // No guardamos border/color/background porque tienen estados hover/focus vía CSS.
      var cs = window.getComputedStyle(inp);
      var savedStyles = {
        paddingLeft:   cs.paddingLeft,
        paddingRight:  cs.paddingRight,
        paddingTop:    cs.paddingTop,
        paddingBottom: cs.paddingBottom,
        fontSize:      cs.fontSize,
        fontWeight:    cs.fontWeight,
        fontFamily:    cs.fontFamily,
        borderRadius:  cs.borderRadius,
      };

      var raw = proto.get.call(inp).replace(/[^0-9]/g, '');

      // Sobreescribir .value: getter devuelve dígitos crudos (parseFloat sigue funcionando)
      Object.defineProperty(inp, 'value', {
        get: function () { return raw; },
        set: function (v) {
          raw = String(v == null ? '' : v).replace(/[^0-9]/g, '');
          proto.set.call(this, fmtMiles(raw));
        },
        configurable: true
      });

      inp.type = 'text';
      inp.setAttribute('inputmode', 'numeric');
      inp.classList.add('nv-num-fmt');  // clase para reglas :focus inyectadas abajo

      // Restaurar estilos de layout para que el cambio de tipo no rompa CSS basado en [type="number"]
      Object.keys(savedStyles).forEach(function(prop) {
        if (savedStyles[prop] && savedStyles[prop] !== '') {
          inp.style[prop] = savedStyles[prop];
        }
      });

      // capture:true → corre ANTES del oninput="calcular()" del HTML
      inp.addEventListener('input', function () {
        var cur = this.selectionStart;
        var displayed = proto.get.call(this);
        var dotsBefore = (displayed.slice(0, cur).match(/\./g) || []).length;

        raw = displayed.replace(/\./g, '').replace(/[^0-9]/g, '');
        var formatted = fmtMiles(raw);
        proto.set.call(this, formatted);

        // Reposicionar cursor compensando puntos nuevos/eliminados
        var newDotsBefore = (formatted.slice(0, cur).match(/\./g) || []).length;
        var newCur = Math.max(0, Math.min(cur + newDotsBefore - dotsBefore, formatted.length));
        try { this.setSelectionRange(newCur, newCur); } catch (e) {}
      }, true); // capture phase

      // Formatear valor inicial si ya tiene contenido
      if (raw) proto.set.call(inp, fmtMiles(raw));
    }

    function applyAll() {
      document.querySelectorAll('input[type=number]').forEach(function (inp) {
        var wrap = inp.closest('.input-wrap');
        if (!wrap) return;
        var prefix = wrap.querySelector('.input-prefix');
        var suffix = wrap.querySelector('.input-suffix');
        var isDinero = prefix && prefix.textContent.trim() === '$';
        var isKm     = suffix && suffix.textContent.trim().toLowerCase() === 'km';
        if (!isDinero && !isKm) return;
        patch(inp);
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', applyAll);
    } else {
      setTimeout(applyAll, 0);
    }
  })();

  /* ── SCHEMA JSON-LD (SEO) ───────────────────────────────────
     Inyecta datos estructurados en <head> para cada calculadora.
     Google los usa para entender la página y generar rich results.
     Al estar en nav.js, cualquier calculadora nueva que se agregue
     a CALCS obtiene schema automáticamente sin tocar su HTML.      */
  (function(){
    var path = window.location.pathname.replace(/\/$/, '') || '/';

    // ── Home: WebSite schema ──────────────────────────────────
    if(path === '/'){
      var ws = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'Calculadora.live',
        'url': 'https://calculadora.live/',
        'description': 'Calculadoras gratuitas, simples y actualizadas.'
      };
      var s = document.createElement('script');
      s.type = 'application/ld+json';
      s.textContent = JSON.stringify(ws);
      document.head.appendChild(s);
      return;
    }

    // ── Buscar la calculadora actual en CALCS ─────────────────
    var found = null, foundCat = '';
    CALCS.forEach(function(cat){
      cat.items.forEach(function(item){
        if(item.u.replace(/\/$/, '') === path) {
          found = item;
          foundCat = cat.cat;
        }
      });
    });
    if(!found) return;

    // ── Mapear categoría a applicationCategory de schema.org ──
    var appCat = 'UtilitiesApplication';
    if(foundCat.indexOf('Auto') !== -1)     appCat = 'AutomotiveApplication';
    if(foundCat.indexOf('Finanz') !== -1)   appCat = 'FinanceApplication';
    if(foundCat.indexOf('Salud') !== -1)    appCat = 'HealthApplication';

    var schema = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': found.n,
      'url': 'https://calculadora.live' + found.u,
      'description': found.hd || found.d,
      'applicationCategory': appCat,
      'operatingSystem': 'All',
      'isAccessibleForFree': true,
      'inLanguage': 'es',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Calculadora.live',
        'url': 'https://calculadora.live/'
      }
    };

    var sc = document.createElement('script');
    sc.type = 'application/ld+json';
    sc.textContent = JSON.stringify(schema);
    document.head.appendChild(sc);
  })();

  /* ── EXPONER CALCS ─────────────────────────────────────────
     index.html tiene un <script> inline (después de este archivo)
     que genera el grid del home a partir de window.__CALCS.
     Así el grid siempre está en sync con el menú sin duplicar
     la lista, y funciona aunque haya caché parcial de nav.js.  */
  window.__CALCS = CALCS;

  /* ── NÚMERO: desactivar scroll y flechas ─────────────────
     Listener en fase de CAPTURA (capture:true) + passive:false
     → se intercepta antes de que el input llegue a procesarlo,
       sin importar si está focused o solo hovered.            */
  document.addEventListener('wheel', function(e) {
    if (e.target && e.target.type === 'number') {
      e.preventDefault();
    }
  }, { passive: false, capture: true });

  document.addEventListener('keydown', function(e) {
    if (e.target && e.target.type === 'number' &&
        (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
      e.preventDefault();
    }
  });

})();
