(function () {
  'use strict';

  /* ── CALCULADORAS ─────────────────────────────────────── */
  var CALCS = [
    { cat: '🚗 Autos', items: [
      { n: 'Calculadora de nafta',   u: '/nafta',            d: 'Costo del viaje por combustible' },
      { n: 'Calculadora de patente', u: '/patente',          d: 'Impuesto automotor por provincia' },
      { n: 'Calculadora de service', u: '/service',          d: '¿Cuándo te toca el próximo service?' },
    ]},
    { cat: '💰 Finanzas y economía', items: [
      { n: 'Sueldo neto',            u: '/sueldo-neto',      d: 'Descuentos ANSES, PAMI y ganancias' },
      { n: 'Aguinaldo (SAC)',         u: '/aguinaldo',        d: '1° o 2° semestre' },
      { n: 'Mercado Pago',           u: '/mercado-pago',     d: 'Intereses por días' },
      { n: 'Interés compuesto',      u: '/interes-compuesto',d: 'Crecimiento de ahorros e inversiones' },
      { n: 'Préstamo',               u: '/prestamo',         d: 'Cuota mensual e intereses totales' },
      { n: 'Inflación',              u: '/inflacion',        d: 'Actualizá precios por inflación histórica' },
    ]},
    { cat: '💪 Salud y entrenamiento', items: [
      { n: 'Calculadora de IMC',     u: '/imc',              d: 'Índice de masa corporal (OMS)' },
      { n: 'Calorías diarias (BMR)', u: '/bmr',              d: 'Metabolismo basal y TDEE' },
      { n: 'Calculadora de 1RM',     u: '/1rm',              d: 'Repetición máxima por fórmula' },
      { n: 'Hidratación diaria',     u: '/hidratacion',      d: '¿Cuánta agua necesitás por día?' },
    ]},
    { cat: '📅 Fechas y tiempo', items: [
      { n: 'Contador de días',       u: '/dias',             d: 'Días entre fechas, hábiles o corridos' },
      { n: 'Calculadora de edad',    u: '/edad',             d: 'Edad exacta en años, meses y días' },
      { n: '¿Qué día fue?',          u: '/dia-semana',       d: 'Día de la semana de cualquier fecha' },
    ]},
    { cat: '🤯 Tu vida en números', items: [
      { n: 'Tu vida en números',     u: '/vida',             d: 'Latidos, pestañeos, pasos y más en tiempo real' },
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

})();
