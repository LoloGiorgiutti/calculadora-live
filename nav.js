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
    { cat: '🚗 Autos', slug: 'autos', label: 'Autos', desc: 'Calculadoras gratuitas para todo lo relacionado con tu auto.', items: [
      { n: 'Calculadora de nafta',   u: '/nafta/',             icon:'⛽', d: 'Costo del viaje por combustible',           hd:'¿Cuánto cuesta el viaje en auto? Precio actualizado por tipo de combustible.' },
      { n: 'Calculadora de patente', u: '/patente/',            icon:'📋', d: 'Impuesto automotor por provincia',           hd:'Calculá cuánto pagás de patente según la provincia y el valor del auto.' },
      { n: 'Calculadora de service', u: '/service/',            icon:'🔧', d: '¿Cuándo te toca el próximo service?',        hd:'¿Cuándo te toca el service y cuánto cuesta aproximadamente?' },
    ]},
    { cat: '🛒 Ecommerce', slug: 'ecommerce', label: 'Ecommerce', desc: 'Herramientas para vendedores online: envíos desde China, KPIs, márgenes y proyecciones.', items: [
      { n: 'Envío desde China',      u: '/ecommerce/envio-china/', icon:'📦', badge:true, d: 'Aéreo y marítimo — peso volumétrico y m³',          hd:'Calculá el costo de importar desde China. Peso volumétrico para aéreo, contenedores para marítimo.' },
      { n: 'KPIs de Ecommerce',      u: '/ecommerce/kpis/',        icon:'📊', badge:true, d: 'ROAS, BE ROAS, CAC, LTV, conversión y más',          hd:'Ingresá tus datos y obtené todos los KPIs clave: ROAS real, BE ROAS, CAC, LTV y margen neto.' },
      { n: 'Margen de Ecommerce',    u: '/ecommerce/margen/',      icon:'💰', badge:true, d: 'Con comisiones, envío, pasarela y ads',               hd:'Calculá tu margen real descontando comisiones de plataforma, envío, pasarela e inversión publicitaria.' },
      { n: 'Proyección de negocio',  u: '/ecommerce/proyeccion/',  icon:'📈', badge:true, d: 'Escenarios optimista, neutro y pesimista',            hd:'Proyectá facturación y ganancias a 6, 12 o 24 meses con tres escenarios y gráfico mes a mes.' },
    ]},
    { cat: '🏠 Hogar y propiedades', slug: 'hogar', label: 'Hogar', desc: 'Reforma, hipoteca, alquiler y expensas. Todo lo que necesitás para tu propiedad.', items: [
      { n: 'Calculadora de reforma',    u: '/reforma/',    icon:'🔨', badge:true, d: 'Presupuesto ítem por ítem: pisos, pintura, electricidad', hd:'Armá el presupuesto de tu reforma ítem por ítem: pintura, pisos, electricidad, plomería y más.' },
      { n: 'Hipoteca y crédito UVA',    u: '/hipoteca/',   icon:'🏦', badge:true, d: 'Cuota UVA, plazo y costo total del crédito',              hd:'Calculá la cuota de tu crédito hipotecario UVA o tasa fija. Simulá distintos plazos y montos.' },
      { n: 'División de expensas',      u: '/expensas/',   icon:'🏢', badge:true, d: 'División por coeficiente entre unidades del edificio',    hd:'Distribuí el monto de expensas entre las unidades del edificio según su coeficiente.' },
      { n: 'Calculadora de alquiler',   u: '/alquiler/',   icon:'🏠', badge:true, d: 'Ajuste ICL, IPC y CER — cuánto sube tu alquiler',        hd:'Calculá el nuevo valor de tu alquiler según los índices ICL, IPC o CER del BCRA/INDEC.' },
    ]},
    { cat: '⚖️ Legal y laboral', slug: 'legal', label: 'Legal y laboral', desc: 'Liquidaciones, indemnizaciones, monotributo y retenciones.', items: [
      { n: 'Liquidación de haberes',    u: '/liquidacion/',   icon:'📋', badge:true, d: 'Sueldo neto con antigüedad, horas extra y SAC',         hd:'Calculá la liquidación completa: básico, antigüedad, horas extra, SAC proporcional y descuentos.' },
      { n: 'Indemnización laboral',     u: '/indemnizacion/', icon:'⚖️', badge:true, d: 'Despido, preaviso y liquidación completa',              hd:'Calculá tu indemnización por despido sin causa, preaviso, vacaciones y SAC proporcional.' },
      { n: 'Categoría de monotributo',  u: '/monotributo/',   icon:'📋', badge:true, d: '¿En qué categoría caés? Cuota mensual actualizada',    hd:'Ingresá tu facturación y conocé tu categoría, cuota mensual y límites actualizados.' },
      { n: 'Retenciones AFIP/ARCA',     u: '/retenciones/',   icon:'🧾', badge:true, d: 'IIBB, percepciones y retenciones por operación',       hd:'Calculá las retenciones e impuestos sobre una operación: AFIP, ingresos brutos y percepciones.' },
    ]},
    { cat: '₿ Crypto', slug: 'crypto', label: 'Crypto', desc: 'P&L de operaciones y DCA para Bitcoin, Ethereum y más.', items: [
      { n: 'P&L de operaciones crypto', u: '/crypto-pl/',  icon:'📊', badge:true, d: 'Ganancia o pérdida en pesos y dólares',                  hd:'Calculá tu ganancia o pérdida en una operación crypto. Incluye comisiones y comparativa.' },
      { n: 'DCA crypto',                u: '/crypto-dca/', icon:'📈', badge:true, d: 'Precio promedio y retorno de tu estrategia DCA',         hd:'Calculá el precio promedio de compra con DCA y tu rendimiento total en cualquier crypto.' },
    ]},
    { cat: '💰 Finanzas y economía', slug: 'finanzas', label: 'Finanzas', desc: 'Sueldo neto, préstamos, inflación, inversiones y más.', items: [
      { n: 'Convertidor de divisas',      u: '/divisas/',           icon:'💱', badge:true, d: 'Dólar blue, MEP, CCL, todas las monedas',          hd:'Convertí pesos a dólares (blue, MEP, CCL, oficial) o cualquier moneda del mundo. Con historial por mes y año.' },
      { n: 'Cuotas con tarjeta',          u: '/cuotas/',            icon:'💳', badge:true, d: 'Cuota, intereses totales y CFT',                   hd:'Calculá cuánto pagás en cuotas con o sin interés. Incluye CFT, TEA y comparativa de planes.' },
      { n: 'Simulador de plazo fijo',     u: '/plazo-fijo/',        icon:'🏦', badge:true, d: 'TNA, TEA, ganancia neta y comparativa',            hd:'Simulá tu plazo fijo: ganancia neta, TEA y comparativa de rendimiento en distintos plazos.' },
      { n: 'Poder adquisitivo',           u: '/poder-adquisitivo/', icon:'📉', badge:true, d: '¿Cuánto valía tu plata antes? Actualizá por IPC',  hd:'Calculá cuánto poder adquisitivo perdió o ganó tu dinero entre dos fechas, ajustado por inflación.' },
      { n: 'Convertidor de sueldo',      u: '/sueldo-hora/',  icon:'💼', badge:true, d: 'Hora, día, semana, mes y año — convertí al instante', hd:'Convertí tu sueldo entre cualquier período. Ingresá uno y los demás se calculan solos.' },
      { n: 'Calculadora de ahorros',    u: '/ahorros/',       icon:'💰', badge:true, d: '¿Cuándo llegás a tu meta de ahorro?',    hd:'Calculá en cuánto tiempo llegás a tu objetivo con aportes mensuales e intereses.' },
      { n: 'Margen de ganancia',        u: '/margen/',        icon:'📊', badge:true, d: 'Precio de venta, margen y markup',       hd:'Calculá el margen de ganancia, el markup y el precio de venta de tus productos.' },
      { n: 'Calculadora de sueldo neto', u: '/sueldo-neto/',   icon:'💼', badge:true, d: 'Descuentos ANSES, PAMI y ganancias',         hd:'¿Cuánto te depositan? Calculá tu sueldo neto con descuentos ANSES y PAMI.' },
      { n: 'Calculadora de aguinaldo',   u: '/aguinaldo/',     icon:'🎁', badge:true, d: '1° o 2° semestre',                            hd:'Calculá tu SAC del primer o segundo semestre al instante.' },
      { n: 'Rendimiento Mercado Pago',   u: '/mercado-pago/',  icon:'💳', d: 'Intereses por días',                          hd:'¿Cuánto ganás dejando plata en Mercado Pago? Calculalo por días.' },
      { n: 'Interés compuesto',          u: '/interes-compuesto/', icon:'📈', d: 'Crecimiento de ahorros e inversiones',   hd:'Proyectá el crecimiento de tus ahorros con interés compuesto.' },
      { n: 'Calculadora de préstamo',    u: '/prestamo/',      icon:'🏦', d: 'Cuota mensual e intereses totales',           hd:'Cuota, total a pagar e intereses de cualquier préstamo.' },
      { n: 'Calculadora de inflación',   u: '/inflacion/',     icon:'📊', d: 'Actualizá precios por inflación histórica',   hd:'¿Cuánto vale hoy lo que costaba antes? Actualizá precios por inflación.' },
    ]},
    { cat: '💪 Salud y entrenamiento', slug: 'salud', label: 'Salud', desc: 'IMC, calorías, proteína, hidratación y más.', items: [
      { n: 'Calculadora de pérdida de peso', u: '/perdida-peso/', icon:'⚖️', badge:true, d: '¿Cuánto tiempo para llegar a tu peso ideal?', hd:'Calculá el tiempo estimado para bajar de peso según tu metabolismo y nivel de actividad.' },
      { n: 'Calculadora de IMC',          u: '/imc/',          icon:'⚖️', d: 'Índice de masa corporal (OMS)',               hd:'Índice de masa corporal con interpretación y peso ideal.' },
      { n: 'Calorías diarias (BMR/TDEE)', u: '/bmr/',          icon:'🔥', d: 'Metabolismo basal y TDEE',                    hd:'¿Cuántas calorías necesitás por día según tu actividad?' },
      { n: 'Calculadora de 1RM',          u: '/1rm/',          icon:'🏋️', d: 'Repetición máxima por fórmula',             hd:'Estimá tu repetición máxima en cualquier ejercicio.' },
      { n: 'Hidratación diaria',          u: '/hidratacion/',  icon:'💧', badge:true, d: '¿Cuánta agua necesitás por día?', hd:'¿Cuánta agua necesitás por día según tu peso y actividad?' },
      { n: 'Proteína diaria',             u: '/proteina/',     icon:'🥩', badge:true, d: 'Gramos según tu peso, objetivo y actividad', hd:'¿Cuántos gramos de proteína necesitás según tu objetivo y actividad?' },
    ]},
    { cat: '📅 Fechas y tiempo', slug: 'fechas', label: 'Fechas', desc: 'Edad exacta, días entre fechas, reloj en vivo, calendario y más.', items: [
      { n: 'Reloj en tiempo real', u: '/reloj/',     icon:'🕐', d: 'Hora exacta ahora, con pantalla completa', hd:'Reloj digital en tiempo real con fecha, zona horaria y modo pantalla completa.' },
      { n: 'Calendario',           u: '/calendario/',icon:'📅', d: 'Calendario mensual navegable',             hd:'Visualizá el mes actual, navegá entre meses y conocé datos de cada día.' },
      { n: 'Un día como hoy',      u: '/hoy/',       icon:'📰', d: 'Efemérides e historia de esta fecha',      hd:'Eventos históricos, nacimientos y fallecimientos que ocurrieron en esta fecha.' },
      { n: '¿Cuál es mi signo?',   u: '/zodiaco/',   icon:'♈', d: 'Tu signo del zodiaco completo',            hd:'Ingresá tu fecha de nacimiento y descubrí tu signo zodiacal con descripción completa.' },
      { n: 'Contador de días',     u: '/dias/',      icon:'🗓️', d: 'Días entre fechas, hábiles o corridos',   hd:'¿Cuántos días hay entre dos fechas? También días hábiles.' },
      { n: 'Calculadora de edad',  u: '/edad/',      icon:'🎂', d: 'Edad exacta en años, meses y días',       hd:'Calculá la edad exacta en años, meses y días.' },
      { n: '¿Qué día fue?',        u: '/dia-semana/',icon:'📆', d: 'Día de la semana de cualquier fecha',     hd:'Ingresá una fecha y descubrí qué día de la semana fue o será.' },
    ]},
    { cat: '🔢 Matemática rápida', slug: 'matematica', label: 'Matemática', desc: 'Porcentajes, regla de tres, conversión de unidades y más.', items: [
      { n: 'Calculadora de porcentajes', u: '/porcentaje/',    icon:'%',  badge:true, d: 'X% de Y, variaciones, aumentos y descuentos',    hd:'X% de Y, qué % es X de Y, variación entre dos números, aumentos y descuentos.' },
      { n: 'Regla de tres',              u: '/regla-de-tres/', icon:'📐', badge:true, d: 'Proporción directa e inversa al instante',        hd:'Proporción directa e inversa. Ingresá tres valores y el cuarto aparece solo.' },
      { n: 'Conversión de unidades',     u: '/conversion/',    icon:'🔄', badge:true, d: 'Longitud, peso, temperatura, velocidad y más',    hd:'Longitud, peso, temperatura, velocidad, área, volumen, tiempo y digital.' },
    ]},
    { cat: '🎲 Generadores y sorteos', slug: 'generadores', label: 'Generadores', desc: 'Números aleatorios, Tutti Frutti y sorteos.', items: [
      { n: 'Generador aleatorio', u: '/generador/',    icon:'🎰', badge:true, d: 'Números, letras o elementos de una lista',          hd:'Números, letras o elementos de tu propia lista. Con o sin repetición.' },
      { n: 'Tutti Frutti',        u: '/tutti-frutti/', icon:'🍉', badge:true, d: 'Sorteo de letras para el juego clásico argentino',  hd:'Sorteo de letras para el juego clásico argentino. Con timer y categorías.' },
    ]},
    { cat: '🤯 Tu vida en números', slug: 'vida-numeros', label: 'Vida en números', desc: 'Curiosidades sobre tu vida expresadas en números en tiempo real.', items: [
      { n: 'Tu vida en números',         u: '/vida/',        icon:'🤯', badge:true, d: 'Latidos, pestañeos, pasos y más en tiempo real', hd:'Latidos, pestañeos, pasos y más — algunos contadores en tiempo real.' },
      { n: '¿Cuánto gana por segundo?',  u: '/cuanto-gana/', icon:'💸', badge:true, d: 'Messi, Taylor Swift, Elon Musk en tiempo real', hd:'Mirá cuánto ganan por segundo los famosos más ricos del mundo. Con contador en vivo y comparativa.' },
    ]},
    { cat: '⚽ Mundial 2026', slug: 'mundial-2026', label: 'Mundial 2026', desc: 'Cuenta regresiva y herramientas sobre la Copa del Mundo 2026.', items: [
      { n: '¿Cuánto falta para el Mundial?', u: '/mundial/', icon:'🏆', badge:true, d: 'Cuenta regresiva en tiempo real', hd:'Cuenta regresiva en tiempo real hasta el partido inaugural del Mundial 2026 en México.' },
    ]},
    { cat: '🎮 Tests y juegos', slug: 'tests', label: 'Tests y juegos', desc: 'Ponete a prueba: velocidad de reacción, CPS test, prueba de teclado y más.', items: [
      { n: 'Test de velocidad de reacción', u: '/reaccion/',  icon:'⚡', badge:true, d: '¿Cuánto tardás en reaccionar?',           hd:'Medí tu tiempo de reacción en milisegundos. ¿Tenés reflejos de gato?' },
      { n: 'CPS Test',                      u: '/cps/',       icon:'🖱️', badge:true, d: 'Clicks por segundo en 5, 10 o 30 seg',    hd:'¿Cuántos clicks por segundo podés hacer? Elegí el tiempo y descubrilo.' },
      { n: 'Prueba de teclado',             u: '/teclado/',   icon:'⌨️', badge:true, d: 'Verificá que todas las teclas funcionen', hd:'Presioná cada tecla y comprobá que tu teclado responde correctamente.' },
    ]},
  ];

  /* ── FAQS ────────────────────────────────────────────────────────────────────
     Preguntas frecuentes por calculadora. La clave es la pathname sin trailing
     slash (igual que item.u). El bloque de inyección al final del archivo las
     inserta automáticamente en cada página, a menos que ya exista .faq-section.
  ─────────────────────────────────────────────────────────────────────────── */
  var FAQS = {
    '/divisas': [
      { q: '¿Qué es el dólar blue?', a: 'El dólar blue es el tipo de cambio del mercado paralelo informal en Argentina. Su cotización surge de la oferta y demanda fuera del sistema bancario oficial. No está regulado por el BCRA y suele cotizar por encima del dólar oficial.' },
      { q: '¿Qué diferencia hay entre el dólar MEP y el CCL?', a: 'El dólar MEP (o dólar bolsa) se obtiene comprando bonos en pesos y vendiéndolos en dólares dentro del mercado local. El CCL (contado con liquidación) es similar pero los bonos se transfieren al exterior. El CCL suele ser levemente más alto que el MEP.' },
      { q: '¿Por qué los datos históricos solo muestran el tipo oficial?', a: 'Los tipos de cambio alternativos (blue, MEP, CCL) no cuentan con bases de datos históricas gratuitas y accesibles por API. El tipo oficial es el único con registros históricos disponibles públicamente.' },
      { q: '¿Con qué frecuencia se actualizan los tipos de cambio?', a: 'Los tipos de cambio actuales se actualizan varias veces al día desde dolarapi.com. Las cotizaciones históricas provienen de currency-api (open.er-api) y se actualizan una vez por día.' },
      { q: '¿Qué significa convertir entre dos fechas distintas?', a: 'Si elegís fechas distintas para origen y destino, la calculadora convierte el monto usando el tipo de cambio del período de origen, y luego convierte el resultado usando el tipo del período de destino. Es útil para comparar el valor real de una suma a lo largo del tiempo.' },
    ],
    '/nafta': [
      { q: '¿Cómo calculo el costo de un viaje en auto?', a: 'Dividí la distancia del viaje (km) por el consumo de tu auto (km/l) y multiplicá el resultado por el precio del combustible. Por ejemplo, 300 km ÷ 12 km/l × $1.200 = $30.000.' },
      { q: '¿Cuál es el consumo promedio de un auto?', a: 'Un auto a nafta promedio consume entre 8 y 12 litros cada 100 km en ciudad, y entre 6 y 9 litros en ruta. Los autos más modernos y los diésel suelen ser más eficientes.' },
      { q: '¿Qué diferencia hay entre nafta súper y premium?', a: 'La nafta súper tiene un octanaje de 95, mientras que la premium llega a 97 o más. Un octanaje mayor reduce el riesgo de detonación y puede mejorar el rendimiento en motores de alta compresión, aunque la diferencia es mínima en autos comunes.' },
      { q: '¿Cómo puedo mejorar el consumo de combustible de mi auto?', a: 'Mantené las cubiertas infladas al nivel correcto, evitá aceleraciones bruscas, usá el aire acondicionado con moderación, realizá el service en tiempo y forma, y reducí el peso innecesario en el auto.' },
      { q: '¿Vale la pena cargar premium si mi auto pide súper?', a: 'En la mayoría de los casos no. Si el fabricante especifica nafta súper, cargar premium no produce una mejora significativa ni cuida más el motor. Seguí la recomendación del manual.' },
    ],
    '/patente': [
      { q: '¿Cómo se calcula la patente del auto en Argentina?', a: 'La patente (impuesto automotor) se calcula aplicando una alícuota sobre la valuación fiscal del vehículo, que varía según la provincia, el año, la marca y el modelo. Cada provincia tiene su propia tabla de valuaciones y porcentajes.' },
      { q: '¿Cuándo vence el pago de la patente?', a: 'Las fechas de vencimiento varían por provincia y suelen distribuirse según la terminación de la patente del vehículo (el último número o letra). Consultá el calendario de tu municipio o provincia para conocer los vencimientos exactos.' },
      { q: '¿La patente varía según la provincia?', a: 'Sí. Cada provincia establece su propia escala de valuaciones y alícuotas. Un mismo vehículo puede pagar más del doble de patente en una provincia que en otra.' },
      { q: '¿Qué pasa si no pago la patente a tiempo?', a: 'Se generan intereses punitorios y recargos sobre el monto adeudado. Además, podés quedar inhabilitado para renovar la licencia de conducir o transferir el vehículo.' },
      { q: '¿Los autos nuevos pagan más patente?', a: 'En general sí, ya que la valuación fiscal es mayor en vehículos de año reciente. La valuación disminuye con los años, por lo que la patente de un auto viejo suele ser significativamente menor.' },
    ],
    '/service': [
      { q: '¿Cada cuántos kilómetros se hace el service?', a: 'La mayoría de los fabricantes recomiendan un service básico (cambio de aceite y filtros) cada 10.000 km o una vez al año, lo que ocurra primero. Revisá siempre el manual de tu vehículo para el intervalo exacto.' },
      { q: '¿Qué incluye un service básico?', a: 'Un service básico incluye cambio de aceite de motor, filtro de aceite, filtro de aire, revisión de niveles (refrigerante, frenos, dirección), revisión de frenos y neumáticos, y verificación de correas.' },
      { q: '¿Cuánto cuesta un service en Argentina?', a: 'El costo varía mucho según el auto, la marca, el tipo de aceite y el taller. Un service básico en taller de confianza puede ir desde $30.000 hasta más de $150.000 dependiendo del vehículo.' },
      { q: '¿Qué pasa si no hago el service?', a: 'Omitir el service puede derivar en desgaste prematuro del motor, mayor consumo de combustible, fallas mecánicas inesperadas y pérdida de garantía del fabricante si el auto es nuevo.' },
      { q: '¿Con qué frecuencia se cambia la correa de distribución?', a: 'La correa de distribución suele cambiarse cada 60.000 a 100.000 km, dependiendo del modelo. Es uno de los recambios más importantes: si se rompe puede provocar daños graves en el motor.' },
    ],
    '/sueldo-neto': [
      { q: '¿Qué descuentos tiene el sueldo bruto en Argentina?', a: 'Los descuentos de ley son: jubilación (11%), obra social (3%), PAMI (3%) y, si corresponde, impuesto a las ganancias (4ª categoría). En total, sin ganancias, los descuentos son del 17% del sueldo bruto.' },
      { q: '¿Cómo se calcula el sueldo neto?', a: 'Sueldo neto = sueldo bruto − descuentos. Los descuentos obligatorios son el 17% del bruto (11% jubilación + 3% obra social + 3% PAMI). Si aplicás ganancias, el porcentaje adicional depende de tu escala.' },
      { q: '¿Todos los trabajadores pagan ganancias?', a: 'No. El impuesto a las Ganancias de 4ª categoría aplica a quienes superan el mínimo no imponible (MNI), que el Estado actualiza periódicamente. Podés verificar si te corresponde en la calculadora.' },
      { q: '¿Qué es el aguinaldo y cómo afecta al sueldo?', a: 'El aguinaldo (SAC) es la doceava parte del mejor sueldo bruto del semestre, y se paga en junio y diciembre. No reduce el sueldo mensual, sino que es un pago adicional equivalente a un mes de sueldo al año.' },
      { q: '¿El salario en negro tiene los mismos descuentos?', a: 'No. El trabajo en negro (no registrado) no realiza aportes al sistema previsional ni a la obra social. Esto perjudica al trabajador, que no acumula aportes jubilatorios ni cobertura médica.' },
    ],
    '/aguinaldo': [
      { q: '¿Cómo se calcula el aguinaldo en Argentina?', a: 'El SAC es igual a la mitad del mayor sueldo bruto mensual devengado durante el semestre. Fórmula: SAC = mejor sueldo bruto del semestre ÷ 2.' },
      { q: '¿Cuándo se paga el aguinaldo?', a: 'El aguinaldo se paga en dos cuotas: la primera antes del 30 de junio (correspondiente al 1° semestre) y la segunda antes del 31 de diciembre (correspondiente al 2° semestre).' },
      { q: '¿El aguinaldo tiene descuentos?', a: 'Sí. Al aguinaldo se le aplican los mismos descuentos que al sueldo mensual: jubilación (11%), obra social (3%) y PAMI (3%). Si corresponde, también se descuenta impuesto a las ganancias.' },
      { q: '¿Qué pasa si trabajo solo parte del semestre?', a: 'Si trabajaste menos de los 6 meses del semestre, el aguinaldo es proporcional. Se calcula según los días trabajados en ese período.' },
      { q: '¿El aguinaldo se calcula sobre el sueldo bruto o neto?', a: 'Sobre el sueldo bruto. Luego se aplican los descuentos de ley para obtener el aguinaldo neto a cobrar.' },
    ],
    '/mercado-pago': [
      { q: '¿Cuánto rinde el dinero en Mercado Pago?', a: 'La tasa de rendimiento de la cuenta de Mercado Pago varía constantemente. Podés consultarla directamente en la app, en la sección "Cuenta". Históricamente acompaña la tasa de política monetaria del BCRA.' },
      { q: '¿Cuándo se acreditan los intereses en Mercado Pago?', a: 'Los intereses se acreditan diariamente, los días hábiles bancarios. El rendimiento es automático y no requiere ninguna acción de tu parte.' },
      { q: '¿Es seguro dejar plata en la cuenta de Mercado Pago?', a: 'El saldo en la cuenta de Mercado Pago está invertido en fondos comunes de dinero regulados por la CNV. No tiene garantía del Fondo de Garantía de Depósitos (FGD) como los bancos, pero está regulado.' },
      { q: '¿Tiene comisiones guardar plata en Mercado Pago?', a: 'No. Mercado Pago no cobra comisiones por mantener el saldo en la cuenta ni por el rendimiento generado. Los intereses se acreditan sin descuentos.' },
      { q: '¿Conviene más Mercado Pago o un plazo fijo?', a: 'Depende del momento. El plazo fijo suele ofrecer tasas mayores pero el dinero queda inmovilizado por el período pactado. La cuenta de Mercado Pago ofrece liquidez inmediata a cambio de una tasa algo menor.' },
    ],
    '/interes-compuesto': [
      { q: '¿Qué es el interés compuesto?', a: 'El interés compuesto es el interés que se calcula sobre el capital inicial más los intereses ya generados en períodos anteriores. Esto produce un efecto de "bola de nieve" que acelera el crecimiento de una inversión con el tiempo.' },
      { q: '¿Cuál es la diferencia entre interés simple y compuesto?', a: 'Con el interés simple, los intereses siempre se calculan sobre el capital original. Con el compuesto, los intereses se suman al capital y generan nuevos intereses. A largo plazo, la diferencia es enorme.' },
      { q: '¿Cómo se calcula el interés compuesto?', a: 'La fórmula es: Capital final = Capital inicial × (1 + tasa)^n, donde n es el número de períodos de capitalización. Nuestra calculadora hace este cálculo automáticamente.' },
      { q: '¿Qué significa la capitalización mensual vs. anual?', a: 'La capitalización mensual suma los intereses al capital cada mes; la anual, una vez al año. Cuanto más frecuente la capitalización, mayor es el rendimiento total, porque los intereses empiezan a generar intereses antes.' },
      { q: '¿Cuánto tiempo tarda en duplicarse el capital?', a: 'Podés estimarlo con la Regla del 72: dividí 72 por la tasa de interés anual. Por ejemplo, al 12% anual tu capital se duplica en aproximadamente 6 años (72 ÷ 12 = 6).' },
    ],
    '/prestamo': [
      { q: '¿Cómo se calcula la cuota de un préstamo?', a: 'La cuota mensual en el sistema francés (el más común) se calcula con la fórmula: cuota = capital × [tasa / (1 − (1 + tasa)^−n)], donde tasa es la tasa mensual y n el número de cuotas.' },
      { q: '¿Qué es el CFT de un préstamo?', a: 'El Costo Financiero Total (CFT) incluye la tasa de interés más todos los gastos adicionales: seguros, comisiones y gastos administrativos. Es el indicador más completo para comparar préstamos.' },
      { q: '¿Conviene cancelar el préstamo anticipadamente?', a: 'En general sí, porque reducís el capital adeudado y pagás menos intereses. Sin embargo, algunos contratos incluyen penalidades por cancelación anticipada. Revisá las condiciones antes de pagar.' },
      { q: '¿Qué es el sistema francés de amortización?', a: 'En el sistema francés las cuotas son fijas durante todo el préstamo. Al inicio pagás más interés y menos capital; al final, más capital y menos interés. Es el sistema más usado en créditos personales e hipotecarios.' },
      { q: '¿Cuánto es el máximo que puedo pedir prestado?', a: 'La mayoría de los bancos limitan la cuota mensual al 25–35% del ingreso neto demostrable. Si ganás $300.000 netos, la cuota no debería superar $75.000–$105.000 aproximadamente.' },
    ],
    '/inflacion': [
      { q: '¿Cómo actualizo un precio por inflación?', a: 'Multiplicá el precio original por el índice de inflación acumulada del período. Por ejemplo, si la inflación fue del 150%, un producto que costaba $1.000 cuesta hoy $2.500 ($1.000 × 2,5).' },
      { q: '¿Dónde se publica el IPC en Argentina?', a: 'El Índice de Precios al Consumidor (IPC) lo publica el INDEC (Instituto Nacional de Estadística y Censos) todos los meses en su sitio oficial: indec.gob.ar.' },
      { q: '¿Qué es la inflación acumulada?', a: 'Es el porcentaje total de aumento de precios durante un período (mes, año, varios años). Se calcula multiplicando los índices mensuales, no sumándolos.' },
      { q: '¿Cuál es la diferencia entre inflación mensual y anual?', a: 'La inflación mensual mide la variación de precios en un solo mes. La anual mide el acumulado de los últimos 12 meses. Para comparar períodos largos siempre usá la inflación acumulada.' },
      { q: '¿Cómo afecta la inflación al poder adquisitivo?', a: 'Si los precios suben más rápido que los salarios, el poder adquisitivo cae: con el mismo dinero comprás menos. Por eso es importante que los aumentos salariales superen la inflación.' },
    ],
    '/imc': [
      { q: '¿Qué es el IMC y cómo se calcula?', a: 'El Índice de Masa Corporal (IMC) es una medida que relaciona el peso con la altura. Se calcula dividiendo el peso en kilos por la altura en metros al cuadrado: IMC = kg / m².' },
      { q: '¿Cuáles son los rangos normales de IMC según la OMS?', a: 'Bajo peso: menos de 18,5 — Peso normal: 18,5 a 24,9 — Sobrepeso: 25 a 29,9 — Obesidad: 30 o más. Estos rangos aplican a adultos.' },
      { q: '¿El IMC es suficiente para saber si estoy sano?', a: 'No completamente. El IMC no distingue músculo de grasa ni considera la distribución de la grasa corporal. Es un indicador útil a nivel poblacional, pero debe complementarse con otros análisis clínicos.' },
      { q: '¿El IMC aplica para niños?', a: 'No de la misma forma. En niños y adolescentes se usan percentiles según edad y sexo. Esta calculadora está diseñada para adultos mayores de 18 años.' },
      { q: '¿Cuál es el IMC ideal?', a: 'Según la OMS, el rango saludable es entre 18,5 y 24,9. Sin embargo, el peso ideal también depende de la complexión corporal, la masa muscular y otros factores individuales.' },
    ],
    '/bmr': [
      { q: '¿Qué es el BMR o metabolismo basal?', a: 'El BMR (Basal Metabolic Rate) es la cantidad de calorías que tu cuerpo quema en reposo total para mantener funciones vitales como respirar, circular sangre y regular la temperatura.' },
      { q: '¿Qué es el TDEE y cómo difiere del BMR?', a: 'El TDEE (Total Daily Energy Expenditure) es el total de calorías que quemás en un día, incluyendo actividad física. Se calcula multiplicando el BMR por un factor de actividad (sedentario, moderado, activo, etc.).' },
      { q: '¿Cuántas calorías necesito para bajar de peso?', a: 'Para bajar de peso necesitás un déficit calórico: consumir menos calorías de las que gastás. Un déficit de 300–500 kcal/día genera una pérdida gradual y sostenible de 0,3 a 0,5 kg por semana.' },
      { q: '¿Qué fórmula usa la calculadora?', a: 'Usamos la ecuación de Mifflin-St Jeor, que actualmente es la más precisa para estimar el metabolismo basal en adultos, según la evidencia científica disponible.' },
      { q: '¿Puedo ganar músculo comiendo en déficit calórico?', a: 'Es difícil. Para ganar músculo de forma eficiente se necesita un superávit calórico moderado. En personas sedentarias o con exceso de grasa es posible una pequeña recomposición corporal, pero el progreso es más lento.' },
    ],
    '/1rm': [
      { q: '¿Qué es el 1RM en el entrenamiento?', a: 'El 1RM (una repetición máxima) es el peso máximo que podés levantar una sola vez con buena técnica en un ejercicio. Es el estándar de referencia para medir la fuerza máxima.' },
      { q: '¿Cómo se estima el 1RM sin intentarlo directamente?', a: 'Usás un peso submáximo y hacés el máximo de repeticiones posibles con buena forma. Luego, fórmulas como la de Brzycki o Epley estiman tu 1RM a partir de ese esfuerzo.' },
      { q: '¿Para qué sirve saber mi 1RM?', a: 'Conocer tu 1RM te permite planificar el entrenamiento usando porcentajes: trabajar al 70–80% para hipertrofia, al 85–95% para fuerza máxima, y al 50–65% para resistencia muscular.' },
      { q: '¿Cuáles son las fórmulas más usadas?', a: 'Las más populares son Brzycki (1RM = peso × 36 / (37 − reps)), Epley (1RM = peso × (1 + reps/30)) y Lombardi (1RM = peso × reps^0.10). Nuestra calculadora usa varias y muestra el promedio.' },
      { q: '¿Con cuántas repeticiones es más precisa la estimación?', a: 'La estimación es más precisa con pocas repeticiones (1 a 6). A medida que aumentan las reps, la fórmula puede subestimar el 1RM real porque la resistencia muscular influye más que la fuerza pura.' },
    ],
    '/hidratacion': [
      { q: '¿Cuánta agua necesito tomar por día?', a: 'La recomendación general es de 35 ml por kilo de peso corporal. Una persona de 70 kg debería beber alrededor de 2,5 litros diarios, pero esto varía según la actividad física, el clima y el estado de salud.' },
      { q: '¿Aumenta la hidratación necesaria con el ejercicio?', a: 'Sí. Durante el ejercicio perdés agua por el sudor y la respiración. Se recomienda beber 500 ml extras por cada hora de actividad moderada, y más si el entrenamiento es intenso o hace calor.' },
      { q: '¿Cuentan el café, el té y las infusiones como hidratación?', a: 'Parcialmente. Las infusiones sin azúcar aportan agua, pero la cafeína tiene un leve efecto diurético. El agua pura es la mejor fuente de hidratación. Las bebidas azucaradas y el alcohol deshidratan.' },
      { q: '¿Cómo sé si estoy bien hidratado?', a: 'El indicador más simple es el color de la orina: amarillo claro o casi transparente indica buena hidratación. Amarillo oscuro o naranja indica que debés tomar más agua.' },
      { q: '¿Se puede tomar demasiada agua?', a: 'Sí, aunque es raro. La hiperhidratación (hiponatremia) ocurre cuando se bebe agua en exceso sin reponer electrolitos, y puede ser peligrosa. En personas sanas, los riñones regulan el exceso normalmente.' },
    ],
    '/proteina': [
      { q: '¿Cuántos gramos de proteína necesito por día?', a: 'Depende de tu objetivo. Para mantenimiento: 1,2–1,6 g/kg. Para ganar músculo: 1,6–2,2 g/kg. Para perder grasa preservando músculo: 2,0–2,4 g/kg de peso corporal.' },
      { q: '¿Qué alimentos tienen más proteína?', a: 'Las mejores fuentes son: pollo, pavo, carne vacuna, huevos, pescado (atún, salmón), lácteos (queso, yogur griego) y legumbres (lentejas, garbanzos). El suplemento whey también es una opción práctica.' },
      { q: '¿Es malo consumir demasiada proteína?', a: 'En personas sanas con riñones normales, una ingesta alta de proteínas (hasta 3 g/kg) no está asociada a daño renal según la evidencia actual. Sin embargo, superar estas cantidades no aporta beneficios adicionales.' },
      { q: '¿Importa en qué momento del día consumir proteína?', a: 'Distribuir la ingesta en varias comidas (30–40 g por comida) maximiza la síntesis proteica muscular. La proteína post-entrenamiento es importante, pero no es la única ingesta relevante del día.' },
      { q: '¿Los vegetarianos pueden alcanzar sus requerimientos de proteína?', a: 'Sí. Combinando legumbres, cereales, lácteos, huevos, tofu, tempeh y frutos secos es posible cubrir los requerimientos. Los veganos pueden suplementar con proteína de guisante o arroz si es necesario.' },
    ],
    '/dias': [
      { q: '¿Cómo cuento los días entre dos fechas?', a: 'Restá la fecha inicial de la fecha final. Nuestra calculadora lo hace automáticamente y te muestra el total de días corridos y también los días hábiles si los necesitás.' },
      { q: '¿Qué son los días hábiles?', a: 'Son los días de trabajo efectivo: de lunes a viernes, excluyendo fines de semana y feriados nacionales. Los sábados son hábiles en algunos ámbitos (comercio, por ejemplo), pero en general no se cuentan.' },
      { q: '¿Se cuentan los feriados como días hábiles?', a: 'No. Los feriados nacionales no son días hábiles. La calculadora descuenta automáticamente los feriados fijos de Argentina al contar días hábiles.' },
      { q: '¿Puedo calcular cuántos días faltan para una fecha?', a: 'Sí. Ingresá la fecha de hoy como fecha de inicio y la fecha futura como fecha de fin. El resultado muestra exactamente cuántos días faltan.' },
      { q: '¿Cómo sumo días a una fecha para saber qué fecha cae?', a: 'En nuestra calculadora podés ingresar una fecha de inicio y calcular a qué fecha corresponde sumando una cantidad de días, incluyendo la opción de contar solo días hábiles.' },
    ],
    '/edad': [
      { q: '¿Cómo calculo mi edad exacta en años, meses y días?', a: 'Ingresá tu fecha de nacimiento y la calculadora muestra tu edad exacta en años, meses y días. También podés ver cuántas horas, días totales y semanas de vida llevás.' },
      { q: '¿Cuántos días tengo de vida?', a: 'La calculadora muestra el total de días vividos desde tu fecha de nacimiento hasta hoy. También podés ver este dato expresado en semanas, meses o incluso horas si añadís tu hora de nacimiento.' },
      { q: '¿Cuándo es mi próximo cumpleaños?', a: 'La calculadora indica cuántos días faltan para tu próximo cumpleaños, para que puedas planificarlo con anticipación.' },
      { q: '¿Puedo calcular la edad de otra persona o una fecha en particular?', a: 'Sí. Podés ingresar cualquier fecha de nacimiento y cualquier fecha de referencia para calcular la edad en ese momento específico, ideal para trámites o verificaciones.' },
      { q: '¿Por qué hay diferencia entre mi edad y la que calcula otra app?', a: 'Algunas apps cuentan el año en curso aunque no hayas cumplido años todavía, o tienen errores de zona horaria. Nuestra calculadora usa la fecha local correctamente para evitar esos errores.' },
    ],
    '/dia-semana': [
      { q: '¿Cómo sé qué día de la semana fue una fecha pasada?', a: 'Ingresá la fecha en la calculadora y obtenés al instante el día de la semana correspondiente. Funciona para cualquier fecha pasada o futura.' },
      { q: '¿Qué día de la semana fue el 25 de mayo de 1810?', a: 'El 25 de mayo de 1810, cuando se formó la Primera Junta de Gobierno en Argentina, fue un viernes.' },
      { q: '¿Funciona para fechas futuras?', a: 'Sí. Podés ingresar cualquier fecha futura para saber de antemano en qué día de la semana cae, útil para planificar eventos, reuniones o viajes.' },
      { q: '¿Qué algoritmo se usa para determinar el día de la semana?', a: 'Se usa el objeto Date de JavaScript, que aplica el calendario gregoriano para todas las fechas. Para fechas anteriores a 1582 el resultado puede no coincidir con el calendario histórico real.' },
      { q: '¿Por qué importa saber el día de la semana de una fecha?', a: 'Es útil para verificar vencimientos, planificar eventos, revisar contratos o simplemente satisfacer curiosidad histórica. También sirve para calcular si un día es hábil o no.' },
    ],
    '/porcentaje': [
      { q: '¿Cómo calculo el porcentaje de un número?', a: 'Para calcular el X% de un número Y: multiplicá Y × X ÷ 100. Por ejemplo, el 15% de 200 = 200 × 15 ÷ 100 = 30.' },
      { q: '¿Cómo calculo qué porcentaje es un número de otro?', a: 'Dividí el número parcial por el total y multiplicá por 100. Por ejemplo, ¿qué porcentaje es 30 de 200? 30 ÷ 200 × 100 = 15%.' },
      { q: '¿Cómo calculo un aumento de porcentaje?', a: 'Multiplicá el valor original por (1 + porcentaje/100). Por ejemplo, aumentar $1.000 un 20%: $1.000 × 1,20 = $1.200.' },
      { q: '¿Cómo calculo un descuento de porcentaje?', a: 'Multiplicá el valor original por (1 − porcentaje/100). Por ejemplo, un descuento del 30% sobre $1.000: $1.000 × 0,70 = $700.' },
      { q: '¿Cómo calculo la variación porcentual entre dos números?', a: 'Restá el valor nuevo menos el viejo, dividí por el valor viejo, y multiplicá por 100. Fórmula: ((nuevo − viejo) ÷ viejo) × 100.' },
    ],
    '/regla-de-tres': [
      { q: '¿Qué es la regla de tres?', a: 'La regla de tres es un método para encontrar un valor desconocido cuando tenés tres valores conocidos que guardan proporción entre sí. Es uno de los cálculos más usados en la vida cotidiana.' },
      { q: '¿Cuándo uso regla de tres directa o inversa?', a: 'Directa: cuando al aumentar una magnitud la otra también aumenta (más km → más combustible). Inversa: cuando al aumentar una magnitud la otra disminuye (más trabajadores → menos días de trabajo).' },
      { q: '¿Cuál es la fórmula de la regla de tres directa?', a: 'Si A es a B como C es a X, entonces X = (B × C) ÷ A. Por ejemplo: si 5 kg cuestan $2.000, ¿cuánto cuestan 8 kg? X = (2.000 × 8) ÷ 5 = $3.200.' },
      { q: '¿Para qué se usa en la vida cotidiana?', a: 'Para calcular precios proporcionales, escalas en mapas, recetas de cocina (ajustar porciones), conversiones de unidades, tasas de cambio, y cualquier situación con proporciones.' },
      { q: '¿Puede ser el resultado un número con decimales?', a: 'Sí. La regla de tres puede dar resultados con decimales. Nuestra calculadora muestra el resultado exacto con los decimales necesarios.' },
    ],
    '/conversion': [
      { q: '¿Cómo convierto kilómetros a millas?', a: '1 kilómetro equivale a 0,621371 millas. Para convertir, multiplicá los km por 0,621371. Por ejemplo, 100 km = 62,14 millas.' },
      { q: '¿Cuántos gramos tiene una libra?', a: 'Una libra (lb) equivale a 453,592 gramos. Para convertir libras a kilos, dividí por 2,2046.' },
      { q: '¿Cómo se convierte Celsius a Fahrenheit?', a: 'Fórmula: °F = (°C × 9/5) + 32. Por ejemplo, 25°C = (25 × 1,8) + 32 = 77°F. Para convertir al revés: °C = (°F − 32) × 5/9.' },
      { q: '¿Cuántos bytes tiene un megabyte?', a: '1 megabyte (MB) = 1.048.576 bytes (usando el sistema binario). En el sistema decimal (como usan los fabricantes de discos) 1 MB = 1.000.000 bytes.' },
      { q: '¿Qué tipos de conversión tiene la calculadora?', a: 'Nuestra calculadora cubre longitud (km, m, cm, pulgadas, pies, millas), peso (kg, g, lb, oz), temperatura (°C, °F, K), velocidad (km/h, m/s, mph), área, volumen, tiempo y unidades digitales.' },
    ],
    '/generador': [
      { q: '¿Cómo genero un número aleatorio entre dos valores?', a: 'Ingresá el valor mínimo y máximo y la calculadora genera un número al azar dentro de ese rango. Podés generar varios a la vez eligiendo la cantidad.' },
      { q: '¿Puedo generar elementos de una lista personalizada?', a: 'Sí. Podés ingresar tu propia lista de palabras o nombres (separados por comas o saltos de línea) y el generador elige elementos al azar, ideal para sorteos o decisiones.' },
      { q: '¿Qué es la generación sin repetición?', a: 'En modo sin repetición, cada número o elemento generado no puede volver a aparecer en la misma sesión. Es ideal para sorteos donde cada participante puede ganar una sola vez.' },
      { q: '¿Para qué se usa un generador de números aleatorios?', a: 'Para sorteos, juegos, tomar decisiones al azar, seleccionar muestras, generar contraseñas, asignar grupos, elegir un número de turno, o simplemente cuando necesitás dejar algo al azar.' },
      { q: '¿Los números generados son verdaderamente aleatorios?', a: 'Son pseudoaleatorios, generados por el algoritmo Math.random() de JavaScript. Son suficientemente aleatorios para sorteos y decisiones cotidianas, aunque no para criptografía.' },
    ],
    '/tutti-frutti': [
      { q: '¿Cómo se juega al Tutti Frutti?', a: 'Se sortea una letra al azar y cada jugador tiene que completar palabras en distintas categorías que comiencen con esa letra. Cuando alguien termina, se dice "¡Stop!" y se corta el tiempo para todos.' },
      { q: '¿Qué categorías tiene el Tutti Frutti?', a: 'Las categorías clásicas son: nombre, apellido, animal, color, cosa, comida, ciudad y país. Pero podés personalizar las categorías según el grupo.' },
      { q: '¿Cómo funciona la puntuación?', a: 'Si sos el único con esa respuesta válida sumás 10 puntos; si coincidís con otro, 5 puntos; si no tenés respuesta o es inválida, 0 puntos. Gana quien acumule más puntos en la cantidad de rondas acordada.' },
      { q: '¿Se puede jugar Tutti Frutti online?', a: 'Sí. Nuestra calculadora sortea la letra al azar con un timer, para que puedan jugar en persona todos con su propia hoja o en una videollamada.' },
      { q: '¿Cuántas letras puede salir en el sorteo?', a: 'El sorteo incluye todas las letras del abecedario español. Podés excluir letras difíciles (como X, W, Y) según el acuerdo del grupo antes de empezar.' },
    ],
    '/vida': [
      { q: '¿Cuántos latidos tiene el corazón por día?', a: 'El corazón late entre 60 y 100 veces por minuto en reposo. Eso equivale a entre 86.400 y 144.000 latidos por día. En promedio, unos 100.000 latidos diarios.' },
      { q: '¿Cuántas veces parpadeamos por día?', a: 'En promedio parpadeamos entre 15 y 20 veces por minuto, lo que suma entre 21.600 y 28.800 veces al día. Frente a pantallas, ese número se reduce considerablemente.' },
      { q: '¿Cuántos pasos da una persona por día en promedio?', a: 'La OMS recomienda 10.000 pasos diarios, aunque el promedio real de la mayoría de las personas es de entre 4.000 y 7.000. Cada paso recorre aproximadamente 75 cm.' },
      { q: '¿Cuántas respiraciones damos por día?', a: 'Respiramos entre 12 y 20 veces por minuto en reposo, lo que suma entre 17.280 y 28.800 respiraciones por día. Con el ejercicio esa cifra puede aumentar mucho.' },
      { q: '¿Cuántas horas dormimos en toda la vida?', a: 'Si dormimos 8 horas diarias durante 80 años, eso equivale a unos 233.600 horas o aproximadamente 26 años durmiendo. Nuestra calculadora personaliza este número según tu edad.' },
    ],
    '/cuanto-gana': [
      { q: '¿Cuánto gana Messi por segundo?', a: 'Según estimaciones de Forbes, Lionel Messi genera alrededor de 135 millones de dólares por año entre salario en Inter Miami, sponsor con Adidas, Pepsi, Apple y otras marcas. Eso equivale a aproximadamente US$ 4,28 por segundo.' },
      { q: '¿Cuánto gana Cristiano Ronaldo por día?', a: 'Cristiano Ronaldo genera alrededor de US$ 200 millones anuales sumando su contrato con Al-Nassr y su marca CR7. Eso equivale aproximadamente a US$ 547.000 por día o US$ 6,34 por segundo.' },
      { q: '¿Cuánto gana Taylor Swift por hora?', a: 'En 2023-2024, con la Eras Tour, Taylor Swift generó aproximadamente 1.000 millones de dólares, lo que equivale a unos US$ 31 por segundo o más de US$ 110.000 por hora.' },
      { q: '¿Cuánto gana Elon Musk por segundo?', a: 'Elon Musk no tiene un salario convencional alto, pero su patrimonio neto creció más de 100.000 millones de dólares en algunos años según Bloomberg Billionaires Index, lo que equivale a miles de dólares por segundo en ganancias patrimoniales.' },
      { q: '¿Son exactas estas cifras?', a: 'No exactamente. Las cifras son estimaciones basadas en reportes de Forbes, Bloomberg y medios especializados. Los ingresos reales varían según las inversiones, contratos y performance de cada año. La herramienta es de carácter informativo y educativo.' },
    ],
    '/sueldo-hora': [
      { q: '¿Cuánto es mi sueldo por hora si gano $500.000 por mes?', a: 'Con 8 horas diarias y 5 días a la semana, hay aproximadamente 173 horas laborales por mes. $500.000 ÷ 173 = $2.890 por hora aproximadamente. Nuestra calculadora hace esta conversión automáticamente.' },
      { q: '¿Cuántas horas laborales tiene el año?', a: 'Con 8 horas diarias y 5 días a la semana, el año laboral tiene aproximadamente 2.080 horas (52 semanas × 40 horas). Podés ajustar esta configuración en la calculadora según tu jornada real.' },
      { q: '¿Cómo convierto sueldo mensual a sueldo anual?', a: 'Multiplicá el sueldo mensual por 12. Si además querés incluir el aguinaldo (SAC), sumá 1 mes más: sueldo mensual × 13. Para el cálculo de sueldo anual sin aguinaldo, simplemente × 12.' },
      { q: '¿Cuánto es el sueldo mínimo por hora en Argentina?', a: 'El Salario Mínimo Vital y Móvil (SMVM) se actualiza periódicamente. Para calcular el valor por hora, dividí el SMVM mensual por las horas mensuales según tu jornada. Consultá el valor actualizado en el sitio del Ministerio de Trabajo.' },
      { q: '¿Para qué sirve convertir el sueldo a distintos períodos?', a: 'Es útil para comparar propuestas laborales (una oferta en dólares por hora vs. un sueldo mensual en pesos), negociar aumentos, calcular el costo real de un freelancer, o entender cuánto ganás realmente por cada hora trabajada.' },
    ],
    '/reaccion': [
      { q: '¿Cuál es el tiempo de reacción humano promedio?', a: 'El tiempo de reacción visual promedio en adultos es de entre 200 y 300 milisegundos. Los deportistas entrenados pueden estar por debajo de los 200 ms. Resultados menores a 150 ms son prácticamente imposibles de forma natural.' },
      { q: '¿Qué factores afectan el tiempo de reacción?', a: 'La fatiga, el alcohol, la edad, el estrés y la distracción aumentan el tiempo de reacción. El entrenamiento físico, la concentración y el buen descanso lo mejoran. Los estímulos auditivos se procesan ligeramente más rápido que los visuales.' },
      { q: '¿Cómo mejorar la velocidad de reacción?', a: 'Practicando regularmente. El deporte, los videojuegos de acción, los ejercicios de coordinación y el entrenamiento de reflejos reducen el tiempo de reacción con el tiempo. También mejora al estar descansado y concentrado.' },
      { q: '¿Por qué sale un tiempo muy bajo (menos de 150 ms)?', a: 'Si el resultado es menor a 150 ms, probablemente ocurrió un clic anticipado o accidental. El sistema nervioso humano necesita al menos ese tiempo mínimo para procesar una señal visual y producir una respuesta motora.' },
      { q: '¿Es útil el test para deportes?', a: 'Sí. El tiempo de reacción es clave en deportes como el tenis, el fútbol, las artes marciales y los eSports. Sin embargo, este test mide solo la reacción a estímulos visuales simples y no reemplaza pruebas especializadas.' },
    ],
    '/cps': [
      { q: '¿Qué es el CPS y cómo se mide?', a: 'CPS significa Clicks Por Segundo (Clicks Per Second en inglés). Se mide contando cuántos clicks hacés durante un período de tiempo fijo (por ejemplo 5 segundos) y dividiendo por ese tiempo.' },
      { q: '¿Cuántos CPS es un buen resultado?', a: 'Para un usuario promedio, entre 5 y 7 CPS es un buen resultado. Los gamers competitivos suelen superar los 8-9 CPS. Resultados por encima de 10 CPS son excepcionales y requieren técnicas especiales.' },
      { q: '¿Qué es el butterfly clicking?', a: 'Es una técnica donde se usan dos dedos alternados sobre el mismo botón del mouse para duplicar la velocidad de clicks. Puede generar más de 15 CPS pero está prohibida en muchos servidores de videojuegos.' },
      { q: '¿En qué juegos importa el CPS?', a: 'El CPS es relevante en juegos PvP como Minecraft (modo combate), algunos títulos de battle royale y cualquier juego donde la velocidad de ataque está ligada a la velocidad de clicks.' },
      { q: '¿Puede dañar el mouse hacer el test muchas veces?', a: 'Un uso excesivo puede acelerar el desgaste del switch del mouse. Lo mismo aplica para la muñeca: hacer el test de forma repetida e intensa puede causar molestias. Tomá descansos regularmente.' },
    ],
    '/teclado': [
      { q: '¿Para qué sirve la prueba de teclado?', a: 'Sirve para verificar que todas las teclas de tu teclado funcionan correctamente. Es útil cuando sospechás que una tecla no responde, cuando comprás un teclado usado, o después de limpiar el teclado.' },
      { q: '¿Qué hacer si una tecla no responde?', a: 'Primero limpiá debajo de la tecla con aire comprimido. Si sigue sin responder, puede ser un problema físico del switch (en teclados mecánicos es reemplazable) o un problema de software. Actualizá los drivers del teclado y probá en otro dispositivo.' },
      { q: '¿Por qué algunas teclas no aparecen en la prueba?', a: 'La prueba detecta las teclas por su código estándar. Algunas teclas específicas de fabricante o combinaciones especiales pueden no registrarse en el estándar del navegador.' },
      { q: '¿Funciona con teclados en español?', a: 'Sí, aunque la distribución visual mostrada es QWERTY estándar. Las teclas se detectan por código de posición, por lo que funciona independientemente del idioma configurado en el sistema.' },
      { q: '¿Puedo hacer la prueba en el celular?', a: 'En celulares la prueba es limitada porque los teclados virtuales no generan los mismos eventos de teclado físico. La herramienta está diseñada para teclados físicos conectados a PC o notebook.' },
    ],
    '/ahorros': [
      { q: '¿Cómo calculo cuánto tiempo tarda en llegar a mi meta de ahorro?', a: 'Necesitás saber: el monto objetivo, cuánto tenés ahorrado hoy, cuánto podés aportar por mes, y si tenés algún rendimiento sobre el dinero. Con esos datos la calculadora estima los meses necesarios.' },
      { q: '¿Qué tasa de interés mensual pongo?', a: 'Depende de dónde estés invirtiendo. Una caja de ahorro tradicional rinde poco. Cuentas remuneradas como Mercado Pago, Naranja X o plazos fijos pueden rendir entre 2% y 4% mensual según el contexto. Si guardás en efectivo, ponés 0.' },
      { q: '¿Conviene ahorrar aunque sea poco por mes?', a: 'Absolutamente. El efecto del interés compuesto hace que incluso aportes pequeños generen diferencias grandes con el tiempo. Un aporte mensual constante de poco dinero siempre supera a un ahorro esporádico mayor.' },
      { q: '¿Qué pasa si aumento el aporte mensual?', a: 'El tiempo para llegar a tu meta se reduce significativamente. Por ejemplo, duplicar el aporte mensual puede reducir el tiempo casi a la mitad, dependiendo de la tasa de interés.' },
      { q: '¿La calculadora tiene en cuenta la inflación?', a: 'No directamente. Para compensar la inflación, ingresá una tasa de interés real (tasa nominal menos inflación mensual estimada). Si la inflación supera tu tasa de rendimiento, en términos reales estarías perdiendo poder adquisitivo.' },
    ],
    '/margen': [
      { q: '¿Cuál es la diferencia entre margen de ganancia y markup?', a: 'El margen se calcula sobre el precio de venta: (precio − costo) ÷ precio × 100. El markup se calcula sobre el costo: (precio − costo) ÷ costo × 100. El markup siempre es mayor que el margen para el mismo producto.' },
      { q: '¿Qué margen de ganancia es bueno?', a: 'Depende del sector. En retail, márgenes del 20–40% son comunes. En servicios puede ser mayor al 50%. En tecnología o supermercados puede ser menor al 10%. Lo importante es que cubra costos fijos, impuestos y deje ganancia neta.' },
      { q: '¿Cómo calculo el precio de venta si quiero un margen del 30%?', a: 'Fórmula: precio = costo ÷ (1 − 0,30). Si comprás a $1.000 y querés 30% de margen, el precio de venta es $1.000 ÷ 0,70 = $1.428,57. Nuestra calculadora hace esto automáticamente en el modo "Costo + Margen".' },
      { q: '¿El margen de ganancia incluye los costos fijos?', a: 'El margen bruto (que calcula esta herramienta) solo considera el costo directo del producto. El margen neto requiere descontar también alquiler, sueldos, impuestos y otros gastos operativos.' },
      { q: '¿Por qué no debo confundir markup con margen?', a: 'Porque llevan a errores de precio. Si querés un margen del 50% y aplicás un markup del 50%, en realidad tu margen es solo del 33%. El margen del 50% requiere un markup del 100% (duplicar el costo).' },
    ],
    '/perdida-peso': [
      { q: '¿Cuánto peso se puede bajar por semana de forma segura?', a: 'La recomendación médica general es perder entre 0,5 y 1 kg por semana. Pérdidas mayores suelen implicar pérdida de músculo y agua, son difíciles de mantener y pueden generar deficiencias nutricionales.' },
      { q: '¿Qué es el déficit calórico?', a: 'Es la diferencia entre las calorías que consumís y las que quemás. Si quemás 2.000 kcal y comés 1.500 kcal, tenés un déficit de 500 kcal. Aproximadamente 7.700 kcal de déficit acumulado equivalen a 1 kg de grasa perdida.' },
      { q: '¿Qué es el TDEE?', a: 'El TDEE (Total Daily Energy Expenditure) es el total de calorías que quemás por día incluyendo tu actividad física. Se calcula multiplicando el metabolismo basal (BMR) por un factor de actividad.' },
      { q: '¿Cuántas calorías menos debo comer para bajar de peso?', a: 'Un déficit de 500 kcal por día genera una pérdida de aproximadamente 0,5 kg por semana, considerado el punto óptimo entre efectividad y sostenibilidad. No se recomienda bajar de 1.200 kcal/día sin supervisión médica.' },
      { q: '¿Puedo bajar de peso sin hacer ejercicio?', a: 'Sí. La pérdida de peso depende principalmente del balance calórico (lo que comés vs. lo que quemás). Sin embargo, el ejercicio ayuda a preservar la masa muscular, mejora la salud metabólica y facilita mantener el déficit calórico.' },
    ],
    '/mundial': [
      { q: '¿Cuándo empieza el Mundial 2026?', a: 'El partido inaugural del Mundial 2026 es el 11 de junio de 2026 en el Estadio Azteca de Ciudad de México. Es el mismo estadio donde se jugó la final de México 1986.' },
      { q: '¿Dónde se juega el Mundial 2026?', a: 'El Mundial 2026 se organiza en tres países: México (Ciudad de México, Guadalajara, Monterrey), Estados Unidos (11 ciudades incluyendo New York, Los Ángeles y Miami) y Canadá (Toronto y Vancouver).' },
      { q: '¿Cuántos equipos participan en el Mundial 2026?', a: 'Por primera vez en la historia participan 48 selecciones, frente a los 32 de Qatar 2022. Esto genera 104 partidos en total, casi el doble que en ediciones anteriores.' },
      { q: '¿Dónde se juega la final del Mundial 2026?', a: 'La final está programada para el 19 de julio de 2026 en el MetLife Stadium de East Rutherford, Nueva Jersey (área metropolitana de New York), con capacidad para más de 82.000 personas.' },
      { q: '¿Argentina es el campeón defensor?', a: 'Sí. Argentina ganó el Mundial de Qatar 2022 en la final ante Francia (3-3 en tiempo reglamentario, 4-2 en penales). Es el tercer título mundial albiceleste, tras 1978 y 1986.' },
    ],
    '/cuotas': [
      { q: '¿Cómo se calculan las cuotas de una tarjeta de crédito?', a: 'En las cuotas con interés se aplica el sistema francés de amortización: la entidad calcula una cuota fija usando la TNA mensualizada. En cuotas sin interés, el precio se divide en partes iguales sin recargo, aunque el costo puede estar incorporado al precio.' },
      { q: '¿Qué es el CFT (Costo Financiero Total)?', a: 'El CFT es el costo real de un financiamiento expresado como tasa anual. Incluye la tasa de interés (TNA), los seguros y los gastos administrativos. Es el indicador más completo para comparar distintas opciones de financiamiento.' },
      { q: '¿Qué diferencia hay entre TNA y TEA?', a: 'La TNA (Tasa Nominal Anual) es la tasa pactada sin considerar la capitalización. La TEA (Tasa Efectiva Anual) incluye el efecto del interés compuesto mensual. Para cuotas mensuales, la TEA siempre es mayor que la TNA.' },
      { q: '¿Las cuotas "sin interés" realmente no tienen costo?', a: 'En la mayoría de los casos el costo está incorporado en el precio de lista o en el recargo que el comercio paga al banco. Al pagar de contado podés negociar un descuento. Las cuotas sin interés tienen sentido cuando el comercio absorbe el costo como estrategia comercial.' },
      { q: '¿Conviene pagar en cuotas o al contado en Argentina?', a: 'Depende de la inflación y la tasa. Si la TNA de las cuotas es menor a la inflación mensual esperada, financiarse puede resultar conveniente porque pagás con pesos que valen menos. Sin embargo, si el precio de lista ya incluye el recargo financiero, el contado es mejor.' },
    ],
    '/plazo-fijo': [
      { q: '¿Cómo funciona un plazo fijo en Argentina?', a: 'Un plazo fijo es un depósito bancario a un plazo determinado (mínimo 30 días) a una tasa de interés pactada de antemano. Al vencimiento recibís el capital inicial más los intereses generados. Está garantizado por el Fondo de Garantía de los Depósitos (FGD) hasta cierto monto.' },
      { q: '¿Qué es la TNA y la TEA en un plazo fijo?', a: 'La TNA (Tasa Nominal Anual) es la tasa base que publican los bancos. La TEA (Tasa Efectiva Anual) refleja el rendimiento real si reinvertís los intereses durante todo el año. Para comparar distintos plazos fijos o inversiones, la TEA es el indicador más justo.' },
      { q: '¿El plazo fijo le gana a la inflación en Argentina?', a: 'Históricamente, los plazos fijos tradicionales suelen quedar por debajo de la inflación en Argentina. Para cubrirse, existe el Plazo Fijo UVA, que ajusta por el índice CER (ligado a la inflación) más una tasa adicional. El rendimiento real depende de la inflación efectiva del período.' },
      { q: '¿Qué es el Plazo Fijo UVA?', a: 'El Plazo Fijo UVA ajusta el capital por el índice CER (que sigue al IPC) más una tasa adicional del 1% anual aproximadamente. El plazo mínimo es de 90 días. Es ideal para proteger el poder adquisitivo, pero tiene menor liquidez que el plazo fijo tradicional.' },
      { q: '¿Cuál es el plazo mínimo de un plazo fijo?', a: 'El plazo fijo tradicional tiene un mínimo de 30 días. El Plazo Fijo UVA requiere un mínimo de 90 días. Algunos bancos ofrecen plazos desde 1 día para montos altos (call money), pero están reservados principalmente para empresas.' },
    ],
    '/monotributo': [
      { q: '¿Cada cuánto tiempo debo recategorizarme en el monotributo?', a: 'Debés recategorizarte dos veces al año: en enero y en julio. En esos períodos analizás la facturación, la superficie afectada y el consumo eléctrico acumulados en los últimos 12 meses y ajustás tu categoría si corresponde.' },
      { q: '¿Qué incluye la cuota mensual del monotributo?', a: 'La cuota tiene tres componentes: el impuesto integrado (que reemplaza a Ganancias e IVA), el aporte jubilatorio (11% del haber mínimo) y el aporte a la obra social. El importe varía según la categoría y si prestás servicios o vendés bienes.' },
      { q: '¿Cuál es la diferencia entre monotributo de servicios y de bienes?', a: 'Los límites de facturación para la categoría de bienes son más altos que para servicios en las categorías bajas. Esto se debe a que la venta de productos tiene mayor volumen de dinero con menor valor agregado que los servicios.' },
      { q: '¿Qué pasa si supero el tope de facturación del monotributo?', a: 'Si superás el tope de la categoría máxima (K), debés inscribirte en el régimen general (autónomo + IVA) dentro de los 30 días corridos de haber superado el límite. También podés estar excluido si acumulás más de tres compras en el exterior o usás más superficie de la permitida.' },
      { q: '¿Puedo ser monotributista y empleado en relación de dependencia?', a: 'Sí. Podés combinar el monotributo con un trabajo en relación de dependencia. En ese caso, el aporte al sistema previsional del monotributo puede quedar reducido si ya aportás como empleado. Consultá con tu contador para optimizar los aportes.' },
    ],
    '/alquiler': [
      { q: '¿Qué es el índice ICL del BCRA?', a: 'El ICL (Índice para Contratos de Locación) es publicado diariamente por el Banco Central de la República Argentina. Se calcula como el promedio entre la variación de la inflación (IPC del INDEC) y la variación de los salarios (índice RIPTE). Se usa para actualizar contratos de alquiler.' },
      { q: '¿Cada cuánto se actualiza el alquiler según la ley?', a: 'Según la normativa vigente, las partes pueden acordar el período de actualización. Los más comunes son cada 3 meses (trimestral), cada 6 meses (semestral) o cada 12 meses (anual), usando el índice pactado en el contrato (ICL, IPC, CER u otro acordado).' },
      { q: '¿Qué diferencia hay entre ICL, IPC y CER?', a: 'El IPC mide la inflación general (canasta de bienes y servicios). El ICL es un promedio entre inflación y salarios, más suave que el IPC puro. El CER (Coeficiente de Estabilización de Referencia) sigue de cerca al IPC y se usa también en deudas y préstamos del sistema financiero.' },
      { q: '¿El propietario puede imponer el índice de actualización?', a: 'No unilateralmente. El índice de actualización debe estar pactado en el contrato. La ley prevé el ICL como referencia, pero las partes pueden acordar otro índice por escrito. Lo importante es que el índice sea claro y verificable para ambas partes.' },
      { q: '¿Cómo calculo cuánto va a subir mi alquiler?', a: 'Multiplicá el alquiler actual por la variación acumulada del índice elegido en el período acordado. Por ejemplo, si el ICL subió un 12% en el trimestre, tu nuevo alquiler será el actual × 1,12. Esta calculadora hace ese cálculo automáticamente según el índice y el período.' },
    ],
    '/indemnizacion': [
      { q: '¿Cómo se calcula la indemnización por despido sin causa en Argentina?', a: 'Según el Art. 245 de la LCT, la indemnización es igual a 1 mes de la mejor remuneración mensual normal y habitual del último año por cada año de antigüedad (o fracción mayor a 3 meses). El mínimo es 2 meses de sueldo.' },
      { q: '¿Qué es el preaviso y cuánto dura?', a: 'El preaviso es el aviso anticipado que debe darse antes de despedir o renunciar. Si el empleado tiene hasta 5 años de antigüedad, el preaviso es de 1 mes. Con más de 5 años, son 2 meses. Si no se otorga, se paga una indemnización sustitutiva equivalente al período.' },
      { q: '¿Qué se incluye en la liquidación final?', a: 'La liquidación final incluye: los días trabajados del último mes, el SAC proporcional del semestre, las vacaciones proporcionales no gozadas, la indemnización por despido (Art. 245) y la indemnización sustitutiva de preaviso. En algunos casos también aplica integración del mes de despido.' },
      { q: '¿Cuándo corresponde doble indemnización?', a: 'La doble indemnización puede corresponder por decreto presidencial en períodos de emergencia económica (como ocurrió entre 2019 y 2022). También aplica si el empleador no registró correctamente la relación laboral. Actualmente no está vigente la doble indemnización por decreto general.' },
      { q: '¿Cuánto tiempo tiene el empleador para pagar la liquidación?', a: 'El empleador tiene 4 días hábiles desde la extinción del vínculo laboral para pagar la liquidación final. Si no lo hace en ese plazo, el empleado puede intimar por telegrama y, ante la falta de pago, se generan intereses y puede iniciar acciones legales.' },
    ],
    '/retenciones': [
      { q: '¿Qué son los ingresos brutos (IIBB)?', a: 'Ingresos Brutos es un impuesto provincial que grava el ejercicio habitual de actividades económicas en cada jurisdicción. Cada provincia establece su propia alícuota según la actividad. Las retenciones de IIBB son anticipos del impuesto que te descuentan tus clientes o intermediarios en cada operación.' },
      { q: '¿Cuándo corresponde retención de ganancias en 4ª categoría?', a: 'La retención de ganancias se aplica a empleados en relación de dependencia cuyos ingresos brutos anuales superen el mínimo no imponible establecido por AFIP/ARCA. El empleador actúa como agente de retención y descuenta mensualmente el impuesto estimado del sueldo.' },
      { q: '¿Qué es una percepción de AFIP?', a: 'Las percepciones son cobros anticipados de impuestos que hacen los vendedores sobre sus compradores en nombre del fisco. A diferencia de las retenciones (que hace el comprador al vendedor), las percepciones las realiza quien factura. Ambas se computan como crédito fiscal.' },
      { q: '¿Cómo recupero las retenciones que me hacen?', a: 'Las retenciones de IIBB se computan como pago a cuenta en tu declaración jurada mensual del impuesto. Las retenciones de ganancias las declara tu empleador y se descuentan del impuesto anual. Si las retenciones superan el impuesto determinado, podés solicitar la devolución del saldo.' },
      { q: '¿Los monotributistas pagan ingresos brutos?', a: 'Sí. El monotributo nacional no reemplaza al IIBB provincial. Sin embargo, muchas provincias tienen regímenes simplificados para monotributistas con alícuotas reducidas o cuota fija. Cada provincia tiene sus propias reglas; consultá la normativa de tu jurisdicción.' },
    ],
    '/poder-adquisitivo': [
      { q: '¿Qué es el poder adquisitivo?', a: 'El poder adquisitivo es la cantidad de bienes y servicios que se pueden comprar con una suma de dinero determinada. Cuando los precios suben más rápido que los ingresos, el poder adquisitivo cae: con la misma plata comprás menos cosas. Argentina es uno de los países donde más cayó el poder adquisitivo en las últimas décadas.' },
      { q: '¿Cómo se calcula la pérdida de poder adquisitivo?', a: 'Se compara el valor de una suma de dinero en una fecha con su equivalente en otra fecha, ajustado por el IPC (Índice de Precios al Consumidor). Si $100 en 2020 equivalen a $3.500 hoy según el IPC, $100 de hoy tienen apenas el poder adquisitivo de $2,86 en 2020.' },
      { q: '¿Por qué los salarios no siempre le ganan a la inflación?', a: 'Los salarios se negocian periódicamente (generalmente una vez por año mediante paritarias) y pueden quedar rezagados si la inflación acelera entre negociaciones. Además, distintos sectores tienen diferente capacidad de negociación, lo que genera asimetrías en el poder adquisitivo real.' },
      { q: '¿Qué es el IPC y quién lo publica en Argentina?', a: 'El IPC (Índice de Precios al Consumidor) es publicado mensualmente por el INDEC (Instituto Nacional de Estadística y Censos). Mide la variación de precios de una canasta representativa de bienes y servicios. Desde 2017 se usa el IPC Nacional con base 2016=100.' },
      { q: '¿Son confiables los datos del INDEC?', a: 'Entre 2007 y 2015 el INDEC publicó datos cuestionados por economistas y organismos internacionales. Desde la intervención de 2016 y la nueva metodología del IPC Nacional lanzada en 2017, los datos son ampliamente aceptados por el mercado y organismos como el FMI.' },
    ],
    '/ecommerce/envio-china': [
      { q: '¿Cómo se calcula el peso volumétrico en envíos aéreos?', a: 'El peso volumétrico se obtiene multiplicando largo × ancho × alto (en cm) y dividiendo por 5.000. El resultado está en kilogramos. Las aerolíneas cobran por el mayor entre el peso real y el volumétrico, por lo que productos livianos pero voluminosos pueden resultar costosos de enviar por avión.' },
      { q: '¿Cuánto tarda un envío desde China a Argentina?', a: 'Por vía aérea, los envíos demoran entre 7 y 20 días hábiles dependiendo del courier y el servicio elegido. Por vía marítima, el tiempo de tránsito es de 30 a 45 días desde el puerto de origen, más trámites de despacho aduanero en destino.' },
      { q: '¿Qué conviene más para importar: aéreo o marítimo?', a: 'Para muestras o productos urgentes, el aéreo es más rápido pero significativamente más caro. El marítimo conviene para volúmenes grandes (un contenedor completo o una carga consolidada LCL). El punto de quiebre suele estar entre 100 y 300 kg según las tarifas vigentes.' },
      { q: '¿Qué derechos de importación se aplican a mercadería de China?', a: 'En Argentina los derechos de importación varían según la posición arancelaria del producto (entre 0% y 35% de arancel externo). A esto se suman el IVA (21%), el IVA adicional (10,5%), el impuesto a las ganancias (3% o 6%) y estadística (3%). El total puede superar el 70% del valor CIF.' },
      { q: '¿Qué diferencia hay entre un contenedor LCL y FCL?', a: 'FCL (Full Container Load) implica que alquilás el contenedor entero. LCL (Less than Container Load) es carga consolidada: compartís el contenedor con otras empresas y pagás solo por el espacio que ocupás. LCL conviene para volúmenes menores a 15-20 m³; para más, generalmente conviene FCL.' },
    ],
    '/ecommerce/kpis': [
      { q: '¿Qué es el ROAS y cómo se calcula?', a: 'El ROAS (Return On Ad Spend) mide cuánto facturás por cada peso invertido en publicidad. Se calcula dividiendo los ingresos por ventas generadas por ads entre el gasto en publicidad. Un ROAS de 4 significa que por cada $1 en ads generás $4 en ventas.' },
      { q: '¿Qué es el BE ROAS (Break-even ROAS)?', a: 'El BE ROAS es el ROAS mínimo necesario para no perder dinero con la publicidad. Se calcula como 1 dividido el margen bruto. Si tenés un margen del 30%, tu BE ROAS es 3,33. Un ROAS mayor al BE ROAS indica que la campaña es rentable.' },
      { q: '¿Qué es el CAC (Costo de Adquisición de Cliente)?', a: 'El CAC es cuánto te cuesta conseguir un nuevo cliente. Se calcula dividiendo el total invertido en marketing y ventas entre la cantidad de nuevos clientes obtenidos en el mismo período. Un CAC bajo con un LTV alto es la combinación ideal para un negocio escalable.' },
      { q: '¿Qué es el LTV (Lifetime Value)?', a: 'El LTV es el valor total que un cliente genera para tu negocio durante toda su relación con vos. Se calcula multiplicando el ticket promedio por la frecuencia de compra anual y los años de retención esperada. La relación LTV/CAC debería ser mayor a 3 para un negocio sostenible.' },
      { q: '¿Qué diferencia hay entre ROAS y MER?', a: 'El ROAS mide el retorno de una campaña específica. El MER (Marketing Efficiency Ratio) mide la eficiencia global del canal de marketing dividiendo la facturación total entre el gasto total en marketing. El MER da una visión más holística, ya que considera el efecto de las campañas en todo el negocio.' },
    ],
    '/ecommerce/margen': [
      { q: '¿Cuál es la diferencia entre margen y markup?', a: 'El margen es la ganancia expresada como porcentaje del precio de venta. El markup es la ganancia expresada como porcentaje del costo. Si comprás a $100 y vendés a $150, el markup es 50% pero el margen es 33,3%. En ecommerce siempre conviene trabajar con margen, no con markup.' },
      { q: '¿Cuánto cobra Mercado Libre de comisión?', a: 'Las comisiones de Mercado Libre varían según el tipo de publicación y el plan del vendedor. En publicaciones Clásicas ronda el 13-16% según la categoría. En publicaciones Premium (con envío gratis) puede llegar al 19-20%. A eso se suma la comisión de Mercado Pago por el cobro.' },
      { q: '¿Cómo afecta el costo de envío al margen real?', a: 'El costo de envío puede representar entre el 5% y el 15% del precio de venta en Argentina. Si ofrecés envío gratis, ese costo lo absorbés vos. Es fundamental incluirlo en el cálculo del margen real para no subestimar los costos y terminar vendiendo con pérdida.' },
      { q: '¿Qué costos debo incluir al calcular el margen de ecommerce?', a: 'Además del costo del producto, debés incluir: comisión de la plataforma, costo de envío, comisión de la pasarela de pago, inversión en publicidad (ads), devoluciones estimadas, packaging y costos de almacén. El margen que no considera todos estos factores es engañoso.' },
      { q: '¿Cuál debería ser el margen mínimo en ecommerce?', a: 'No hay un mínimo universal, pero en general se recomienda apuntar a un margen neto de al menos 15-20% sobre el precio de venta para que el negocio sea sostenible una vez cubiertos todos los costos operativos y de marketing.' },
    ],
    '/ecommerce/proyeccion': [
      { q: '¿Qué es una proyección de negocio y para qué sirve?', a: 'Una proyección de negocio estima los resultados futuros de una empresa en base a supuestos de crecimiento, márgenes y costos. Sirve para planificar la inversión en stock e inventario, anticipar necesidades de financiamiento y establecer metas concretas de ventas y rentabilidad.' },
      { q: '¿Qué diferencia hay entre escenario optimista, neutro y pesimista?', a: 'El escenario neutro usa las tasas de crecimiento más probables basadas en el historial y el mercado. El optimista aplica tasas más altas (buen contexto, campañas exitosas, estacionalidad favorable). El pesimista considera menor crecimiento o caídas por competencia, crisis o errores operativos.' },
      { q: '¿Cuál es una tasa de crecimiento mensual realista para un ecommerce?', a: 'Para ecommerce en etapa inicial, tasas del 10-20% mensual son alcanzables con buena inversión en marketing. En etapas de crecimiento estable, un 5-10% mensual ya es un muy buen desempeño. Los ecommerce maduros crecen a tasas similares al mercado, entre 15-30% anual.' },
      { q: '¿Cada cuánto tiempo debo actualizar la proyección de mi negocio?', a: 'Como mínimo, revisá y actualizá tu proyección mensualmente comparando los resultados reales con los proyectados. Si los desvíos son significativos (más de 20%), revisá los supuestos base. También actualizá frente a cambios importantes: nueva competencia, crisis económica o lanzamiento de nuevas líneas.' },
      { q: '¿Qué métricas son las más importantes para proyectar un ecommerce?', a: 'Las métricas clave son: número de pedidos, ticket promedio, tasa de conversión, ROAS de las campañas y tasa de recompra. Proyectar estas variables de forma conservadora y coherente entre sí es más valioso que una hoja de cálculo complicada con supuestos irreales.' },
    ],
    '/reforma': [
      { q: '¿Cuánto cuesta renovar un baño en Argentina?', a: 'Una renovación completa de baño (revestimientos, sanitarios, grifería y mano de obra) puede costar entre $500.000 y $3.000.000 o más, dependiendo de los materiales elegidos y la ciudad. Un baño pequeño con materiales de entrada de gama puede hacerse desde $400.000, mientras que uno con porcellanato premium y grifería de diseño puede superar los $2.000.000.' },
      { q: '¿Cuánto cuesta el pulido y plastificado de pisos?', a: 'El pulido y plastificado de parquet o madera cuesta aproximadamente entre $15.000 y $35.000 por metro cuadrado en Argentina, incluyendo mano de obra y materiales. El precio varía según el estado del piso, el tipo de madera y la cantidad de capas de plastificado aplicadas.' },
      { q: '¿Cuánto sale pintar un departamento o una habitación?', a: 'La pintura interior con látex de buena calidad y mano de obra cuesta entre $8.000 y $20.000 por m² de pared. Una habitación de 12 m² con paredes de 2,40 m de alto puede costar entre $70.000 y $200.000 dependiendo de la cantidad de manos y la calidad del material.' },
      { q: '¿Qué es mejor: contratar por metro cuadrado o por jornada?', a: 'Para obras pequeñas y bien definidas (pintura, revestimiento), contratar por m² da más previsibilidad de costos. Para tareas variables o de ajuste (plomería, electricidad), la jornada puede ser más conveniente. Siempre pedí presupuesto cerrado con materiales especificados para evitar sorpresas.' },
      { q: '¿Necesito permiso para reformar mi departamento?', a: 'Las obras que no modifican la estructura del edificio (pintura, cambio de revestimientos, renovación de baños sin mover paredes) generalmente no requieren permiso municipal. Las que implican demolición de muros, ampliación de superficie o modificación de fachada sí requieren habilitación ante el organismo de obras del municipio.' },
    ],
    '/hipoteca': [
      { q: '¿Qué es un crédito hipotecario UVA en Argentina?', a: 'El crédito UVA es un préstamo hipotecario cuya deuda se expresa en Unidades de Valor Adquisitivo (UVAs). El capital adeudado se actualiza diariamente según el CER (Coeficiente de Estabilización de Referencia), que sigue a la inflación. La cuota en UVAs es fija, pero su equivalente en pesos sube con la inflación.' },
      { q: '¿Cómo se calcula la cuota de un crédito hipotecario?', a: 'El sistema más usado es el francés (amortización): la cuota mensual es fija durante todo el crédito. Se calcula como: Capital × [r × (1+r)^n] / [(1+r)^n - 1], donde r es la tasa mensual (TNA/12) y n son los meses del crédito. Al principio la cuota tiene más interés y menos capital; al final, más capital.' },
      { q: '¿Cuánto debo ganar para acceder a un crédito hipotecario?', a: 'Los bancos generalmente exigen que la cuota no supere el 25-30% de los ingresos netos comprobables. Para un crédito de $20.000.000 a 20 años al 8.5% UVA, la cuota inicial es de aproximadamente $175.000, por lo que necesitarías ingresos de al menos $600.000-$700.000 mensuales.' },
      { q: '¿Qué porcentaje del valor de la propiedad financia el banco?', a: 'Los bancos suelen financiar entre el 70% y el 80% del valor de compra o tasación (el menor de ambos). El 20-30% restante más los gastos de escritura (entre 3% y 7% del valor) deben aportarse como capital propio.' },
      { q: '¿Conviene un crédito UVA o uno a tasa fija?', a: 'El crédito UVA tiene tasa más baja (8-10% TNA) y cuota inicial menor, pero el capital crece con la inflación. El de tasa fija en pesos tiene cuota predecible en pesos nominales, pero la tasa es mucho más alta (35-50% TNA). En contextos de alta inflación, el UVA puede resultar más costoso a largo plazo.' },
    ],
    '/expensas': [
      { q: '¿Cómo se calculan las expensas de un edificio?', a: 'El administrador del consorcio suma todos los gastos del período (sueldos del personal, servicios del edificio, mantenimiento, seguros, fondo de reserva) y distribuye el total entre los propietarios según el coeficiente de participación de cada unidad funcional, establecido en el reglamento de copropiedad.' },
      { q: '¿Qué es el coeficiente de participación en las expensas?', a: 'El coeficiente de participación es el porcentaje que corresponde a cada unidad funcional (departamento, local, cochera) en los gastos comunes del edificio. Se establece en el reglamento de copropiedad según la superficie de cada unidad y la suma de todos los coeficientes da 100%.' },
      { q: '¿Qué incluyen las expensas de un edificio?', a: 'Las expensas ordinarias incluyen: sueldos del portero o encargado, servicios comunes (luz, agua, gas de áreas comunes), mantenimiento de ascensores y equipos, seguros del edificio, honorarios del administrador y limpieza. Las expensas extraordinarias cubren obras o mejoras puntuales.' },
      { q: '¿Quién decide el monto de las expensas?', a: 'El administrador prepara el presupuesto de gastos y lo somete a aprobación en asamblea de propietarios. Los propietarios pueden votar cambios al presupuesto. Las expensas ordinarias no requieren aprobación previa de asamblea, pero los gastos extraordinarios importantes sí.' },
      { q: '¿Puedo no pagar expensas si no uso el edificio?', a: 'No. Las expensas son obligatorias para todos los propietarios independientemente del uso que hagan de las áreas comunes y de si habitan o no la unidad. El reglamento de copropiedad y la Ley de Propiedad Horizontal (17.801 y su modificación 26.994) establecen esta obligación.' },
    ],
    '/liquidacion': [
      { q: '¿Qué es una liquidación de haberes?', a: 'Es el comprobante detallado de todos los conceptos que componen el salario de un empleado en un período determinado: haberes (sueldo básico, antigüedad, horas extra, presentismo) y descuentos (jubilación, PAMI, obra social). Es lo que se conoce comúnmente como recibo de sueldo.' },
      { q: '¿Cómo se calcula la antigüedad en el sueldo?', a: 'La antigüedad es un adicional del 1% del sueldo básico por cada año completo de servicio. Un empleado con 10 años de antigüedad cobra un 10% adicional sobre su básico. Este porcentaje varía en algunos convenios colectivos que pueden establecer mayor porcentaje o bases diferentes.' },
      { q: '¿Qué es el presentismo y cuánto vale?', a: 'El presentismo es un adicional que cobra el empleado que no registró ausencias injustificadas en el mes. Su valor es generalmente el 8,33% del sueldo básico (equivalente a medio aguinaldo mensual). Si el empleado falta sin justificación, pierde este beneficio.' },
      { q: '¿Cómo se calculan las horas extra?', a: 'Las horas trabajadas fuera del horario normal se pagan con recargo. Las horas extra en días hábiles tienen un recargo del 50% sobre el valor hora normal (hora al 50%). Las trabajadas en sábados después de las 13hs, domingos y feriados tienen recargo del 100% (hora al 100%).' },
      { q: '¿Cuánto descuenta la jubilación del sueldo bruto?', a: 'Los descuentos de ley son: Jubilación (11%), PAMI (3%) y Obra Social (3%), sumando un total del 17% del sueldo bruto. El empleador también realiza aportes patronales adicionales sobre el sueldo bruto, pero estos no se descuentan del salario del empleado.' },
    ],
    '/crypto-pl': [
      { q: '¿Qué es el P&L en trading de criptomonedas?', a: 'P&L significa Profit and Loss (Ganancia y Pérdida). Es el resultado neto de una operación: la diferencia entre el valor de venta y el costo de compra, descontadas las comisiones. Un P&L positivo indica ganancia; uno negativo, pérdida.' },
      { q: '¿Cómo se calculan las comisiones en un exchange de crypto?', a: 'La mayoría de los exchanges cobran una comisión tanto en la compra como en la venta, generalmente entre el 0,1% y el 1% del monto operado. Esta calculadora te permite ingresar porcentajes distintos para compra y venta, ya que algunos exchanges tienen tarifas diferenciadas para makers y takers.' },
      { q: '¿Qué es el precio de break-even en una operación?', a: 'El break-even es el precio mínimo al que tenés que vender para recuperar exactamente lo invertido (capital + comisiones). Si compraste 0,1 BTC a $90.000 con 0,5% de comisión, tu break-even es levemente superior a $90.000 porque tenés que cubrir también la comisión de venta.' },
      { q: '¿Las ganancias de crypto pagan impuestos en Argentina?', a: 'Sí. Las ganancias de operaciones con criptomonedas están sujetas al Impuesto a las Ganancias en Argentina. Para personas físicas, tributan en la cuarta categoría. También pueden estar alcanzadas por Bienes Personales si el tenedor de crypto es residente. Consultá con un contador especializado.' },
      { q: '¿Qué diferencia hay entre ganancia bruta y ganancia neta en crypto?', a: 'La ganancia bruta es la diferencia entre el precio de venta y el precio de compra sin considerar comisiones. La ganancia neta descuenta todas las comisiones de compra y venta. La neta es el número real que importa: es lo que efectivamente llegó a tu billetera.' },
    ],
    '/crypto-dca': [
      { q: '¿Qué es el DCA (Dollar Cost Averaging) en crypto?', a: 'El DCA es una estrategia de inversión que consiste en invertir una cantidad fija de dinero de forma periódica (semanal, mensual) independientemente del precio del activo. Al comprar en distintos momentos, promediás el precio de entrada y reducís el impacto de comprar en un pico del mercado.' },
      { q: '¿El DCA funciona bien con Bitcoin y otras criptomonedas?', a: 'El DCA es especialmente popular en activos volátiles como Bitcoin. Históricamente, quien aplicó DCA en BTC durante varios años obtuvo rendimientos positivos a pesar de los ciclos bajistas (bear markets). No garantiza ganancias, pero reduce el riesgo de una mala entrada en el peor momento.' },
      { q: '¿Cómo se calcula el precio promedio de compra?', a: 'El precio promedio ponderado se calcula dividiendo el total invertido (en dólares) entre la cantidad total de crypto acumulada. Por ejemplo: si invertiste USD 100 a $30.000 y USD 100 a $60.000, compraste 0,00333 + 0,00167 = 0,005 BTC con USD 200 → precio promedio = $40.000.' },
      { q: '¿Cuánto debería invertir por mes con DCA?', a: 'No hay un monto mínimo ni máximo establecido. La clave del DCA es la consistencia: es mejor invertir montos pequeños de forma regular que grandes sumas de forma irregular. Invertí solo lo que podés permitirte perder completamente, ya que las criptomonedas son activos de alto riesgo.' },
      { q: '¿El DCA es mejor que invertir todo de una vez (lump sum)?', a: 'Estadísticamente, en mercados con tendencia alcista de largo plazo, el lump sum suele dar mejores retornos porque el activo tiende a subir con el tiempo. Sin embargo, el DCA reduce el riesgo psicológico y el impacto de la volatilidad. Para la mayoría de los inversores no profesionales, el DCA es más fácil de sostener.' },
    ],
    '/calendario': [
      { q: '¿Qué feriados tiene Argentina en 2026?', a: 'Argentina tiene feriados nacionales fijos (como el 25 de mayo, 9 de julio, 12 de octubre) y feriados puente que se mueven según la conveniencia del calendario. En 2026 hay alrededor de 19 feriados nacionales. El calendario muestra todos los feriados actualizados por el Poder Ejecutivo Nacional.' },
      { q: '¿Qué es el número de semana ISO?', a: 'La norma ISO 8601 define una semana que empieza el lunes. La semana 1 del año es la que contiene el primer jueves de enero. Por eso, las últimas fechas de diciembre pueden pertenecer a la semana 1 del año siguiente, y los primeros días de enero a veces son semana 52 o 53 del año anterior.' },
      { q: '¿Cómo sé cuántos días hábiles hay en un mes?', a: 'Los días hábiles son los días de lunes a viernes que no son feriados. El calendario los marca visualmente para que puedas contarlos. Para calcular días hábiles entre dos fechas, usá la calculadora de días hábiles del sitio.' },
      { q: '¿Cuándo son los feriados puente en Argentina?', a: 'Los feriados puente son declarados por el Poder Ejecutivo Nacional y suelen anunciarse a principios del año para facilitar el turismo interno. Generalmente ocurren cuando un feriado cae martes o jueves, convirtiendo el lunes o viernes en feriado "puente".' },
    ],
    '/hoy': [
      { q: '¿Qué son las efemérides?', a: 'Las efemérides son registros de eventos históricos organizados por fecha. El término viene del griego "ephemeros" (de un día). Consultarlas en la fecha actual permite conocer qué ocurrió un día como hoy a lo largo de la historia, desde nacimientos de personalidades hasta eventos políticos, científicos y culturales.' },
      { q: '¿Cómo se calcula cuántos días pasaron desde una fecha histórica?', a: 'Se calcula la diferencia entre la fecha actual y la fecha histórica en días, meses y años. Por ejemplo, si un evento ocurrió el 25 de mayo de 1810, hoy han pasado más de 215 años. La calculadora de días del sitio puede darte esta cifra exacta.' },
      { q: '¿Cada cuánto se actualizan los datos históricos?', a: 'Los datos históricos de efemérides son estáticos: los eventos históricos no cambian. Lo que sí se actualiza automáticamente es la fecha de "hoy" que se muestra, para que siempre corresponda al día actual.' },
      { q: '¿Por qué algunas fechas tienen más eventos que otras?', a: 'La cantidad de eventos históricos documentados varía por la relevancia de cada fecha y por el acceso a fuentes históricas. Algunas fechas tienen decenas de efemérides registradas; otras, pocas. Esto refleja la distribución natural de los eventos a lo largo de la historia.' },
    ],
    '/reloj': [
      { q: '¿Para qué sirve un reloj en pantalla completa?', a: 'Un reloj digital en pantalla completa es útil para presentaciones, clases virtuales, reuniones donde se necesita ver la hora claramente, o simplemente como reloj de escritorio para tu monitor. Se puede usar en cualquier dispositivo con navegador web.' },
      { q: '¿El reloj es exacto?', a: 'Sí. El reloj usa el sistema de hora del dispositivo que estás usando (PC, celular, tablet). Si tu dispositivo está sincronizado con un servidor NTP (lo que ocurre automáticamente en la mayoría de sistemas operativos modernos), la precisión es de fracciones de segundo.' },
      { q: '¿Qué zona horaria muestra el reloj?', a: 'El reloj muestra la hora de la zona horaria configurada en tu dispositivo. Si tu PC está en Argentina (UTC-3), verás la hora de Argentina. Si cambiás la zona horaria del sistema, el reloj se actualiza automáticamente.' },
      { q: '¿Puedo usar el reloj como cronómetro?', a: 'El reloj digital muestra la hora actual en tiempo real, pero no tiene función de cronómetro. Para medir tiempos, podés usar el cronómetro nativo de tu sistema operativo o celular.' },
    ],
    '/zodiaco': [
      { q: '¿Cómo se determinan los signos del zodiaco?', a: 'Los signos del zodiaco se determinan según la posición del Sol al momento de tu nacimiento. El año se divide en 12 períodos de aproximadamente 30 días, cada uno asociado a una constelación. Aunque la astronomía moderna reconoce 13 constelaciones en esa franja, la astrología occidental mantiene el sistema de 12 signos.' },
      { q: '¿Cuál es la diferencia entre el zodiaco occidental y el chino?', a: 'El zodiaco occidental se basa en la posición del Sol al nacer y cambia mes a mes. El zodiaco chino se basa en el año de nacimiento y tiene un ciclo de 12 años, cada uno representado por un animal (rata, buey, tigre, conejo, dragón, serpiente, caballo, cabra, mono, gallo, perro, cerdo).' },
      { q: '¿Qué es la carta natal?', a: 'La carta natal (o carta astral) es un mapa del cielo en el momento exacto de tu nacimiento, que incluye la posición del Sol, la Luna y los planetas en los signos y casas astrológicas. A diferencia del signo solar (el más conocido), la carta natal ofrece una imagen completa de todos los factores astrológicos.' },
      { q: '¿Los signos del zodiaco tienen base científica?', a: 'No. La astrología no tiene respaldo científico; los estudios controlados no han encontrado correlación entre los signos zodiacales y la personalidad, el comportamiento o los eventos de vida de las personas. Es una tradición cultural con miles de años de historia, pero no es una ciencia.' },
      { q: '¿Cuáles son las fechas exactas de cada signo?', a: 'Las fechas aproximadas son: Aries (21/3–19/4), Tauro (20/4–20/5), Géminis (21/5–20/6), Cáncer (21/6–22/7), Leo (23/7–22/8), Virgo (23/8–22/9), Libra (23/9–22/10), Escorpio (23/10–21/11), Sagitario (22/11–21/12), Capricornio (22/12–19/1), Acuario (20/1–18/2), Piscis (19/2–20/3).' },
    ],
  };

  /* ── ESTILOS ──────────────────────────────────────────── */
  var css = [
    /* Botón hamburguesa */
    '#nav-toggle{display:flex;align-items:center;justify-content:center;flex-direction:column;gap:4.5px;',
    'width:36px;height:36px;padding:0;background:none;border:none;cursor:pointer;',
    'border-radius:8px;flex-shrink:0;transition:background .15s;}',
    '#nav-toggle:hover{background:rgba(0,0,0,.06);}',
    '#nav-toggle .nb{display:block;width:18px;height:2px;background:#080A12;border-radius:1px;transition:.2s;}',
    'html[data-theme="dark"] #nav-toggle .nb{background:#E2E4F0 !important;}',
    'html[data-theme="dark"] #nav-toggle:hover{background:rgba(255,255,255,.08) !important;}',

    /* Backdrop */
    '#nav-bd{display:none;position:fixed;inset:0;background:rgba(0,0,0,.38);z-index:9998;',
    'backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px);}',
    '#nav-bd.nv-open{display:block;}',

    /* Panel */
    '#nav-panel{position:fixed;top:0;left:0;bottom:0;width:min(300px,86vw);',
    'background:#0A0E1A;z-index:9999;display:flex;flex-direction:column;',
    'transform:translateX(-100%);transition:transform .28s cubic-bezier(.32,0,.15,1);',
    'box-shadow:4px 0 40px rgba(0,0,0,.18);}',
    '#nav-panel.nv-open{transform:translateX(0);}',

    /* Cabecera del panel */
    '#nav-ph{display:flex;align-items:center;justify-content:space-between;',
    'padding:0 14px 0 18px;height:58px;border-bottom:1px solid #1F2438;flex-shrink:0;}',
    '.nv-logo{font-family:"Inter",sans-serif;font-size:16px;font-weight:700;',
    'color:#fff;letter-spacing:-.03em;text-decoration:none;}',
    '.nv-logo span{color:#4F6BFF;}',
    '#nav-x{width:30px;height:30px;border:none;background:none;cursor:pointer;font-size:16px;',
    'color:rgba(255,255,255,.5);border-radius:6px;display:flex;align-items:center;justify-content:center;',
    'transition:background .12s;}#nav-x:hover{background:rgba(255,255,255,.08);color:#fff;}',

    /* Buscador */
    '#nav-sw{padding:10px 14px;border-bottom:1px solid #1F2438;flex-shrink:0;',
    'display:flex;align-items:center;gap:8px;background:#141929;}',
    '#nav-sw svg{flex-shrink:0;color:rgba(255,255,255,.3);}',
    '#nav-si{flex:1;border:none;background:transparent;font-family:"Inter",sans-serif;',
    'font-size:14px;color:#fff;outline:none;}',
    '#nav-si::placeholder{color:rgba(255,255,255,.3);}',

    /* Lista */
    '#nav-list{flex:1;overflow-y:auto;padding:8px 0 28px;}',
    '.nvc-title-link{display:block;font-size:10px;font-weight:700;letter-spacing:.1em;',
    'text-transform:uppercase;color:rgba(255,255,255,.35);padding:14px 18px 5px;',
    'text-decoration:none;transition:color .12s;}',
    '.nvc-title-link:hover,.nvc-title-link.nv-cat-active{color:#4F6BFF;}',
    '.nv-item{display:flex;flex-direction:column;gap:1px;padding:9px 18px;',
    'text-decoration:none;color:rgba(255,255,255,.75);transition:background .12s;',
    'border-left:2.5px solid transparent;}',
    '.nv-item:hover,.nv-item.nv-active{background:rgba(79,107,255,.12);border-left-color:#4F6BFF;}',
    '.nv-item-n{font-size:13px;font-weight:600;line-height:1.25;color:rgba(255,255,255,.9);}',
    '.nv-item-d{font-size:11px;color:rgba(255,255,255,.4);line-height:1.3;}',
    '#nav-empty{padding:20px 18px;font-size:13px;color:rgba(255,255,255,.3);display:none;}',
    '.nv-hr{height:1px;background:#1F2438;margin:8px 0;}',

    /* Inputs con formato de miles (type cambiado de number a text por el formateador).
       Estas reglas replican el :focus y la transición que el CSS de cada página define
       para input[type="number"], pero ahora aplicado a la clase .nv-num-fmt. */
    'input.nv-num-fmt{transition:border-color .15s;}',
    'input.nv-num-fmt:focus{border-color:#1A5FE8 !important;outline:none;}',

  /* ── RESPONSIVE GLOBAL ────────────────────────────────────────────────────
     Aplica a todas las páginas del sitio. Cubre los problemas de overflow
     en móvil sin tener que editar cada HTML individualmente.               */

  /* result-main: "Miércoles" a 52px fijo desborda en iPhone (<390px).
     clamp garantiza que nunca supere el ancho disponible.                  */
  '.result-main{font-size:clamp(22px,8vw,52px)}',

  /* Valores numéricos largos (latidos, pasos, etc.): evitar overflow       */
  '.stat-val{min-width:0;overflow-wrap:break-word}',

  /* Nombres de categorías (tutti-frutti): evitar que salgan de la caja     */
  '.cat-name{overflow-wrap:break-word;word-break:break-word}',

  /* Tutti-frutti: cats-grid en 1 columna en móvil para que el nombre
     tenga suficiente espacio sin recortarse                                */
  '@media(max-width:480px){.cats-grid{grid-template-columns:1fr}}',

  /* Pantallas muy estrechas (<400px): grids de stats en 1 columna          */
  '@media(max-width:400px){.result-rows,.stats-grid{grid-template-columns:1fr}}',

  /* Edad — ref-row (fecha + "ó en" + años): apilar verticalmente en móvil  */
  '@media(max-width:480px){',
  '.ref-row{flex-direction:column;align-items:stretch;gap:10px}',
  '.ref-sep{display:none}',
  '.ref-anios-wrap{flex-direction:row;align-items:center}',
  '.ref-anios-wrap input{width:90px}',
  '}',

  /* Vida en números — input card (fecha + hora): apilar en móvil.
     Usa !important porque el HTML tiene display:grid como inline style.    */
  '@media(max-width:480px){',
  '.card>[style]{grid-template-columns:1fr !important}',
  '}',

  /* ── FAQ ──────────────────────────────────────────────────────────────────
     Sección de preguntas frecuentes inyectada automáticamente en cada
     calculadora por el bloque FAQS de este archivo.                        */
  '.faq-section{max-width:520px;margin:0 auto;padding:0 20px 48px}',
  '.faq-heading{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;',
  'color:var(--ink-faint);margin-bottom:12px;display:flex;align-items:center;gap:8px}',
  '.faq-heading::after{content:"";flex:1;height:1px;background:var(--border)}',
  '.faq-item{background:var(--surface);border:1px solid var(--border);',
  'border-radius:var(--radius-sm);margin-bottom:8px;overflow:hidden}',
  '.faq-item summary{padding:14px 16px;font-size:14px;font-weight:600;cursor:pointer;',
  'list-style:none;display:flex;justify-content:space-between;align-items:center;',
  'gap:12px;transition:color .15s}',
  '.faq-item summary::-webkit-details-marker{display:none}',
  '.faq-item summary::after{content:"+";font-size:20px;font-weight:300;',
  'color:var(--ink-faint);flex-shrink:0;transition:transform .2s;line-height:1}',
  '.faq-item[open]>summary{color:var(--hi)}',
  '.faq-item[open]>summary::after{transform:rotate(45deg)}',
  '.faq-a{padding:0 16px 14px;font-size:13px;color:var(--ink-light);line-height:1.65}',

  /* ── CALCULADORAS RELACIONADAS ────────────────────────────────────────────── */
  '.related-section{max-width:520px;margin:0 auto;padding:0 20px 32px}',
  '.related-heading{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;',
  'color:var(--ink-faint);margin-bottom:12px;display:flex;align-items:center;gap:8px}',
  '.related-heading::after{content:"";flex:1;height:1px;background:var(--border)}',
  '.related-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px}',
  '.related-card{display:flex;flex-direction:column;align-items:center;gap:6px;padding:14px 12px;',
  'background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius-sm);',
  'text-decoration:none;color:var(--ink);transition:border-color .15s,transform .15s;text-align:center}',
  '.related-card:hover{border-color:var(--hi);transform:translateY(-2px)}',
  '.related-icon{font-size:24px;line-height:1}',
  '.related-name{font-size:12px;font-weight:600;line-height:1.3;color:var(--ink)}',

  /* ── BOTÓN COMPARTIR ─────────────────────────────────────────────────────── */
  '.share-btn{display:flex;align-items:center;justify-content:center;gap:8px;',
  'padding:11px 16px;background:var(--surface);border:1.5px solid var(--border);',
  'border-radius:var(--radius-sm);font-family:"DM Sans",sans-serif;font-size:13px;',
  'font-weight:600;color:var(--ink-light);cursor:pointer;transition:all .15s;',
  'width:100%;margin-bottom:0}',
  '.share-btn:hover{border-color:var(--hi);color:var(--hi);background:var(--hi-soft)}',
  '.share-btn.nv-copied{border-color:#16a34a !important;color:#16a34a !important}',
  '.share-wrap{max-width:520px;margin:0 auto;padding:0 20px 24px}',

  /* ── THEME TOGGLE ─────────────────────────────────────────────────────────── */
  '#theme-toggle{width:34px;height:34px;border:none;background:none;cursor:pointer;',
  'border-radius:8px;display:flex;align-items:center;justify-content:center;',
  'flex-shrink:0;margin-left:8px;transition:background .15s;padding:0;color:#080A12;}',
  '#theme-toggle:hover{background:rgba(0,0,0,.06);}',
  /* Dark-header pages (homepage, categorías): icono blanco en modo claro */
  '#theme-toggle.on-dark{color:rgba(255,255,255,.75);}',
  '#theme-toggle.on-dark:hover{background:rgba(255,255,255,.1);}',

  /* ── LIGHT MODE: HERO SECTIONS ───────────────────────────────────────────── */
  /* En modo claro, todos los hero/banner (que por defecto son negros)         */
  /* se vuelven claros: fondo lavanda muy suave, textos oscuros.               */
  /* Espejo del modo oscuro: oscuro con toque violeta ↔ claro con toque violeta */
  'html:not([data-theme="dark"]) .hero,',
  'html:not([data-theme="dark"]) .hero-wrap,',
  'html:not([data-theme="dark"]) .cat-hero{',
  'background:transparent !important;',
  'color:#0A0E1A !important;}',
  /* calc-result: gradiente muy sutil (panel lateral embebido) */
  'html:not([data-theme="dark"]) .calc-result{',
  'background:linear-gradient(135deg,#EEF1FF 0%,#F7F8FA 100%) !important;',
  'color:#0A0E1A !important;}',

  /* h1 dentro del hero: era blanco, ahora oscuro */
  'html:not([data-theme="dark"]) .hero h1,',
  'html:not([data-theme="dark"]) .hero-wrap h1,',
  'html:not([data-theme="dark"]) .cat-hero h1{color:#0A0E1A !important;}',

  /* Subtítulo del hero */
  'html:not([data-theme="dark"]) .hero .hero-sub,',
  'html:not([data-theme="dark"]) .hero-wrap .hero-sub,',
  'html:not([data-theme="dark"]) .cat-hero .hero-sub{color:#5A607A !important;}',

  /* Breadcrumb: era rgba(255,255,255,.4), ahora gris oscuro suave */
  'html:not([data-theme="dark"]) .hero .breadcrumb,',
  'html:not([data-theme="dark"]) .hero-wrap .breadcrumb,',
  'html:not([data-theme="dark"]) .cat-hero .breadcrumb{color:rgba(10,14,26,.45) !important;}',
  'html:not([data-theme="dark"]) .hero .breadcrumb a,',
  'html:not([data-theme="dark"]) .hero-wrap .breadcrumb a,',
  'html:not([data-theme="dark"]) .cat-hero .breadcrumb a{color:rgba(10,14,26,.45) !important;}',
  'html:not([data-theme="dark"]) .hero .breadcrumb a:hover,',
  'html:not([data-theme="dark"]) .hero-wrap .breadcrumb a:hover,',
  'html:not([data-theme="dark"]) .cat-hero .breadcrumb a:hover{color:#0A0E1A !important;}',

  /* hero-date y textos accent dentro del hero se quedan azules (ya están bien) */

  /* Normalizar body background en páginas viejas (usaban --bg:#F0F2F7 grisázul) */
  'html:not([data-theme="dark"]) body{background:#F7F8FA !important;}',

  /* Nafta hero (usa <header class="nf-hero"> con background:#0A0E1A hardcodeado) */
  'html:not([data-theme="dark"]) .nf-hero{background:transparent !important;color:#0A0E1A !important;}',
  'html:not([data-theme="dark"]) .nf-hero h1{color:#0A0E1A !important;}',
  'html:not([data-theme="dark"]) .nf-hero .subtitle{color:#363B4F !important;}',
  'html:not([data-theme="dark"]) .nf-hero .nf-breadcrumb,html:not([data-theme="dark"]) .nf-hero .nf-breadcrumb a{color:rgba(10,14,26,.45) !important;}',
  'html:not([data-theme="dark"]) .nf-hero .logo-text{color:#4F6BFF !important;}',
  'html:not([data-theme="dark"]) .nf-hero .logo-dot{background:#4F6BFF !important;}',

  /* Reloj: clock-card oscura → claro */
  'html:not([data-theme="dark"]) .clock-card{background:linear-gradient(135deg,#EEF1FF 0%,#F5F7FF 100%) !important;}',
  'html:not([data-theme="dark"]) .time-display{color:#0A0E1A !important;}',
  'html:not([data-theme="dark"]) .time-seconds{color:rgba(10,14,26,.35) !important;}',
  'html:not([data-theme="dark"]) .date-display{color:rgba(10,14,26,.75) !important;}',
  'html:not([data-theme="dark"]) .tz-display{color:rgba(10,14,26,.35) !important;}',
  'html:not([data-theme="dark"]) .btn-fs{background:rgba(79,107,255,.08) !important;border-color:rgba(79,107,255,.2) !important;color:rgba(10,14,26,.6) !important;}',

  /* Conversión: cat-chip.active no debe ser pisado por la regla base */
  'html:not([data-theme="dark"]) .cat-chip.active{background:#4F6BFF !important;border-color:#4F6BFF !important;color:#fff !important;}',

  /* Contenido del calc-result embebido en homepage (porcentaje preview) */
  'html:not([data-theme="dark"]) .res-lbl{color:rgba(10,14,26,.45) !important;}',
  'html:not([data-theme="dark"]) .res-eyebrow{color:rgba(10,14,26,.5) !important;}',
  /* res-big: de gradiente blanco → gradiente accent azul/violeta */
  'html:not([data-theme="dark"]) .res-big{background:linear-gradient(135deg,#4F6BFF 20%,#7C5CFF 100%) !important;-webkit-background-clip:text !important;background-clip:text !important;color:transparent !important;}',
  'html:not([data-theme="dark"]) .res-detail{color:rgba(10,14,26,.55) !important;}',
  'html:not([data-theme="dark"]) .res-detail strong{color:#0A0E1A !important;}',
  'html:not([data-theme="dark"]) .res-breakdown{border-top-color:rgba(79,107,255,.15) !important;}',
  'html:not([data-theme="dark"]) .br-row{color:rgba(10,14,26,.6) !important;border-top-color:rgba(79,107,255,.12) !important;}',
  'html:not([data-theme="dark"]) .br-row b{color:#0A0E1A !important;}',

  /* Cat-chips dentro del hero-card (fondo/borde/texto eran blancos sobre oscuro) */
  'html:not([data-theme="dark"]) .cat-chip{background:rgba(79,107,255,.06) !important;border-color:rgba(79,107,255,.15) !important;}',
  'html:not([data-theme="dark"]) .cat-chip:hover{background:rgba(79,107,255,.12) !important;border-color:rgba(79,107,255,.35) !important;}',
  'html:not([data-theme="dark"]) .cat-chip-name{color:#0A0E1A !important;}',
  'html:not([data-theme="dark"]) .cat-chip-n{color:rgba(10,14,26,.45) !important;}',

  /* Result cards de calculadoras viejas (background:#0C1528 o similar hardcodeado) */
  'html:not([data-theme="dark"]) .result-card{background:linear-gradient(135deg,#F0F4FF 0%,#E8EEFF 100%) !important;border-color:rgba(79,107,255,.2) !important;}',
  'html:not([data-theme="dark"]) .result-eyebrow{color:rgba(10,14,26,.45) !important;}',
  'html:not([data-theme="dark"]) .result-main{color:#0A0E1A !important;}',
  'html:not([data-theme="dark"]) .result-sub{color:#363B4F !important;}',
  'html:not([data-theme="dark"]) .empty-state{color:rgba(10,14,26,.3) !important;}',
  'html:not([data-theme="dark"]) .result-rows{border-top-color:rgba(79,107,255,.15) !important;}',
  'html:not([data-theme="dark"]) .result-row-lbl{color:rgba(10,14,26,.5) !important;}',
  'html:not([data-theme="dark"]) .result-row-val{color:#0A0E1A !important;}',

  /* Nafta: result-card tiene texto blanco hardcodeado → oscurecer en modo claro */
  'html:not([data-theme="dark"]) .result-amount{color:#0A0E1A !important;}',
  'html:not([data-theme="dark"]) .result-currency{color:#0A0E1A !important;}',
  'html:not([data-theme="dark"]) .result-detail-val{color:#0A0E1A !important;}',
  'html:not([data-theme="dark"]) .result-detail-lbl{color:rgba(10,14,26,.5) !important;}',
  'html:not([data-theme="dark"]) .result-empty{color:rgba(10,14,26,.4) !important;}',
  /* Tank indicator: inline styles rgba(255,255,255,...) → override con !important */
  'html:not([data-theme="dark"]) #tank-indicator{border-top-color:rgba(10,14,26,.1) !important;}',
  'html:not([data-theme="dark"]) #tank-indicator span{color:rgba(10,14,26,.6) !important;}',
  'html:not([data-theme="dark"]) #tank-sub{color:rgba(10,14,26,.45) !important;}',
  'html:not([data-theme="dark"]) #tank-indicator>div:nth-child(2){background:rgba(10,14,26,.08) !important;}',
  /* Peajes breakdown: inline styles rgba(255,255,255,...) → override */
  'html:not([data-theme="dark"]) #peajes-breakdown>div{color:rgba(10,14,26,.55) !important;border-top-color:rgba(10,14,26,.1) !important;}',

  /* Elementos específicos del hero homepage (escritos con colores blancos explícitos) */
  'html:not([data-theme="dark"]) .hero h1 .acc{color:#0A0E1A !important;}',
  'html:not([data-theme="dark"]) .hero h1 .muted{background:linear-gradient(135deg,rgba(10,14,26,.7) 0%,rgba(79,107,255,.5) 100%) !important;-webkit-background-clip:text !important;background-clip:text !important;color:transparent !important;}',
  'html:not([data-theme="dark"]) .hero-lead{color:#363B4F !important;}',
  'html:not([data-theme="dark"]) .hero-eyebrow{background:rgba(79,107,255,.08) !important;border-color:rgba(79,107,255,.2) !important;color:#363B4F !important;}',
  'html:not([data-theme="dark"]) .btn-ghost{color:#363B4F !important;}',
  'html:not([data-theme="dark"]) .btn-ghost:hover{color:#0A0E1A !important;}',
  'html:not([data-theme="dark"]) .hero-card{background:rgba(255,255,255,.7) !important;border-color:rgba(79,107,255,.15) !important;}',
  'html:not([data-theme="dark"]) .hc-lbl{color:rgba(10,14,26,.45) !important;}',

  /* Elementos de páginas de categorías (cat-hero) con colores blancos explícitos */
  'html:not([data-theme="dark"]) .cat-hero h1{color:#0A0E1A !important;}',
  'html:not([data-theme="dark"]) .cat-hero-desc{color:#363B4F !important;}',
  'html:not([data-theme="dark"]) .cat-stat-n{color:#0A0E1A !important;}',
  'html:not([data-theme="dark"]) .cat-stat-lbl{color:rgba(10,14,26,.45) !important;}',

  /* ── DARK MODE ────────────────────────────────────────────────────────────── */
  /* Transición suave al cambiar tema */
  'body,header,input,select,textarea,.card,.config-card,.periods-card,',
  '.summary-card,.cal-wrap,.section,.cat-block,.result-card,footer{',
  'transition:background-color .2s,border-color .2s,color .2s;}',

  /* Variables — cubre ambas convenciones de nombres usadas en el sitio */
  'html[data-theme="dark"]{',
  '--bg:#0E1525;--surface:#141929;--surface-2:#1A2038;',
  '--ink:#E2E4F0;--ink-2:#9BA0B8;--ink-light:#8A8FA8;--ink-3:#606580;--ink-faint:#404565;',
  '--line:#1F2438;--line-2:#1A2035;--border:#1F2438;',
  '--accent-soft:rgba(79,107,255,.15);--hi-soft:rgba(79,107,255,.12);',
  '--hi:#4F6BFF;',
  '}',

  /* Body */
  'html[data-theme="dark"] body{background:#0E1525;color:#E2E4F0;}',

  /* ── LOGO LIGHT MODE: "Calculadora" negro, ".live" azul accent ── */
  /* Sin esto, el <a> hereda el color de link del browser (azul/violeta) */
  'html:not([data-theme="dark"]) .logo{color:#0A0E1A !important;}',
  'html:not([data-theme="dark"]) .logo span{color:#4F6BFF !important;}',
  /* #site-header style nafta — link sin clase .logo */
  'html:not([data-theme="dark"]) #site-header a{color:#0A0E1A !important;}',
  'html:not([data-theme="dark"]) #site-header a span{color:#4F6BFF !important;}',
  /* header genérico con link sin clase .logo (páginas viejas) */
  'html:not([data-theme="dark"]) header a{color:#0A0E1A !important;}',
  'html:not([data-theme="dark"]) header a span.live{color:#4F6BFF !important;}',

  /* Headers claros (calculadoras) → se vuelven oscuros */
  'html[data-theme="dark"] header{background:#0A0E1A !important;border-bottom-color:#1F2438 !important;}',
  /* Nafta usa #site-header (div) en lugar de header */
  'html[data-theme="dark"] #site-header{background:#0A0E1A !important;border-bottom-color:#1F2438 !important;}',
  'html[data-theme="dark"] #site-header a{color:rgba(255,255,255,.75) !important;}',
  'html[data-theme="dark"] #site-header a span{color:#4F6BFF !important;}',
  'html[data-theme="dark"] .logo{color:#E2E4F0 !important;}',
  /* Logo genérico: un solo <span> con ".live" → azul accent */
  'html[data-theme="dark"] .logo span{color:#4F6BFF !important;}',
  /* dark mode: header <a> sin clase .logo también claro */
  'html[data-theme="dark"] header a{color:#E2E4F0 !important;}',
  'html[data-theme="dark"] header a span{color:#4F6BFF !important;}',
  /* Homepage usa .name y .dot — .name debe quedar blanco, no azul */
  'html[data-theme="dark"] .logo .name{color:#fff !important;}',
  'html[data-theme="dark"] .logo .dot{color:#4F6BFF !important;}',

  /* Theme toggle en modo oscuro → siempre claro */
  'html[data-theme="dark"] #theme-toggle{color:rgba(255,255,255,.75);}',
  'html[data-theme="dark"] #theme-toggle:hover{background:rgba(255,255,255,.1);}',

  /* Inputs y selects */
  'html[data-theme="dark"] input:not([type="range"]),',
  'html[data-theme="dark"] select,',
  'html[data-theme="dark"] textarea{',
  'background:#0E1525 !important;color:#E2E4F0 !important;border-color:#1F2438 !important;}',
  'html[data-theme="dark"] input::placeholder,',
  'html[data-theme="dark"] textarea::placeholder{color:#404565 !important;}',
  'html[data-theme="dark"] input:focus,html[data-theme="dark"] select:focus{',
  'border-color:#4F6BFF !important;box-shadow:0 0 0 3px rgba(79,107,255,.15) !important;}',

  /* Footer */
  'footer.site-footer{border-top:1px solid #E4E7EE;background:#F7F8FA;padding:22px 24px;margin-top:0;font-family:Inter,sans-serif;}',
  '.sf-inner{max-width:900px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;}',
  '.sf-logo{font-size:14px;font-weight:700;letter-spacing:-.03em;color:#858AA0;text-decoration:none;}',
  '.sf-live{color:#4F6BFF;}',
  '.sf-links{display:flex;gap:16px;align-items:center;}',
  '.sf-links a{font-size:12px;color:#858AA0;text-decoration:none;transition:color .15s;}',
  '.sf-links a:hover{color:#4F6BFF;}',
  '.sf-sep{font-size:12px;color:#C8CDD8;}',
  '.sf-copy{font-size:12px;color:#B0B6C8;}',
  'html[data-theme="dark"] footer.site-footer{background:#080A12 !important;border-top-color:#1F2438 !important;}',
  'html[data-theme="dark"] .sf-logo{color:#404565 !important;}',
  'html[data-theme="dark"] .sf-links a{color:#404565 !important;}',
  'html[data-theme="dark"] .sf-links a:hover{color:#4F6BFF !important;}',
  'html[data-theme="dark"] .sf-sep{color:#252A3D !important;}',
  'html[data-theme="dark"] .sf-copy{color:#2E3348 !important;}',
  'html[data-theme="dark"] footer{background:#0A0E1A !important;',
  'border-top-color:#1F2438 !important;color:#404565 !important;}',

  /* Superficies genéricas que usan background:#fff o var(--surface) */
  'html[data-theme="dark"] .hero-sub-content,',
  'html[data-theme="dark"] .main-card,',
  'html[data-theme="dark"] .card,',
  'html[data-theme="dark"] .config-card,',
  'html[data-theme="dark"] .periods-card,',
  'html[data-theme="dark"] .summary-card,',
  'html[data-theme="dark"] .summary-item,',
  'html[data-theme="dark"] .cal-wrap,',
  'html[data-theme="dark"] .section,',
  'html[data-theme="dark"] .cat-block,',
  'html[data-theme="dark"] .result-card,',
  'html[data-theme="dark"] .day-info,',
  'html[data-theme="dark"] .tz-card,',
  'html[data-theme="dark"] .clock-card:not(.fs-mode .clock-card),',
  'html[data-theme="dark"] .stat,',
  'html[data-theme="dark"] .sign-header,',
  'html[data-theme="dark"] .faq-item,',
  'html[data-theme="dark"] .related-card{',
  'background:#141929 !important;border-color:#1F2438 !important;}',

  /* Backgrounds de fila/ítem */
  'html[data-theme="dark"] .period-row,',
  'html[data-theme="dark"] .config-field,',
  'html[data-theme="dark"] .attr,',
  'html[data-theme="dark"] .di-item{background:#0E1525 !important;border-color:#1F2438 !important;}',

  /* Texto secundario */
  'html[data-theme="dark"] .period-name,html[data-theme="dark"] .period-sub,',
  'html[data-theme="dark"] .config-label,html[data-theme="dark"] .cur-sym,',
  'html[data-theme="dark"] .attr-value,html[data-theme="dark"] .di-val,',
  'html[data-theme="dark"] .stat-val,html[data-theme="dark"] .sign-name{color:#E2E4F0 !important;}',
  'html[data-theme="dark"] .period-sub,html[data-theme="dark"] .attr-label,',
  'html[data-theme="dark"] .di-label,html[data-theme="dark"] .stat-lbl{color:#606580 !important;}',

  /* Calendario */
  'html[data-theme="dark"] .cal-head,html[data-theme="dark"] .cal-day{',
  'border-color:#1F2438 !important;}',
  'html[data-theme="dark"] .cal-day{background:#141929;}',
  'html[data-theme="dark"] .cal-day.other-month{background:#0E1525;}',
  'html[data-theme="dark"] .cal-day:hover{background:rgba(79,107,255,.12) !important;}',
  'html[data-theme="dark"] .cal-day .day-num{color:#E2E4F0 !important;}',
  'html[data-theme="dark"] .cal-day.other-month .day-num{color:#1F2438 !important;}',

  /* Homepage: main content (fondo blanco que se vuelve oscuro) */
  'html[data-theme="dark"] main{background:transparent;}',
  'html[data-theme="dark"] .cat-block{background:#141929 !important;}',
  'html[data-theme="dark"] .cat-title{color:#E2E4F0 !important;}',
  'html[data-theme="dark"] .cards .card{background:#1A2038 !important;border-color:#1F2438 !important;}',
  'html[data-theme="dark"] .cards .card:hover{background:#202840 !important;}',
  'html[data-theme="dark"] .card-title{color:#E2E4F0 !important;}',
  'html[data-theme="dark"] .card-desc{color:#9BA0B8 !important;}',
  'html[data-theme="dark"] .search-pill{background:#141929 !important;border-color:#1F2438 !important;}',

  /* Calc preview homepage */
  'html[data-theme="dark"] .calc-preview{background:#141929 !important;border-color:#1F2438 !important;}',
  'html[data-theme="dark"] .calc-inputs{border-color:#1F2438 !important;}',
  'html[data-theme="dark"] .calc-head{border-color:#1F2438 !important;}',
  'html[data-theme="dark"] .calc-h2{color:#E2E4F0 !important;}',
  'html[data-theme="dark"] .calc-sub{color:#9BA0B8 !important;}',
  'html[data-theme="dark"] .mode-tab{background:#0E1525 !important;border-color:#1F2438 !important;color:#9BA0B8 !important;}',
  'html[data-theme="dark"] .field input:not([type="range"]){background:#0E1525 !important;color:#E2E4F0 !important;}',

  /* Nafta: road slider en modo oscuro — labels, porcentajes y track legibles */
  'html[data-theme="dark"] .road-slider-bg{background:rgba(79,107,255,.3) !important;}',
  'html[data-theme="dark"] .road-label{color:rgba(226,228,240,.45) !important;}',
  'html[data-theme="dark"] .road-label.active-lbl{color:#4F6BFF !important;}',
  'html[data-theme="dark"] .road-pct{color:rgba(226,228,240,.4) !important;}',
  'html[data-theme="dark"] .road-pct.dominant{color:#E2E4F0 !important;}',
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

  /* ── THEME TOGGLE ─────────────────────────────────────────── */
  var MOON_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  var SUN_SVG  = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

  var themeBtn = document.createElement('button');
  themeBtn.id = 'theme-toggle';
  themeBtn.setAttribute('aria-label', 'Cambiar tema');

  // Páginas con header oscuro: homepage/categorías tienen .header-inner,
  // nafta usa #site-header con fondo oscuro.
  var hasDarkHeader = !!document.querySelector('.header-inner') || !!document.querySelector('#site-header');
  if (hasDarkHeader) themeBtn.classList.add('on-dark');

  function applyTheme(theme, save) {
    document.documentElement.setAttribute('data-theme', theme);
    themeBtn.innerHTML = theme === 'dark' ? SUN_SVG : MOON_SVG;
    themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    if (save) localStorage.setItem('clv-theme', theme);
  }

  themeBtn.addEventListener('click', function () {
    var current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark', true);
  });

  // Leer preferencia guardada o del sistema
  var saved = localStorage.getItem('clv-theme');
  var sysDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (sysDark ? 'dark' : 'light'), false);

  // Inyectar al final del header (queda a la derecha)
  if (hdr) hdr.appendChild(themeBtn);

  /* ── PANEL ────────────────────────────────────────────── */
  var cur = window.location.pathname.replace(/\/$/, '') || '/';

  function buildList() {
    var html = '';
    CALCS.forEach(function (cat) {
      var catPath = '/' + cat.slug + '/';
      var catActive = (cur === '/' + cat.slug || cur === '/' + cat.slug + '/') ? ' nv-cat-active' : '';
      html += '<div class="nvc">';
      html += '<a class="nvc-title-link' + catActive + '" href="' + catPath + '">' + cat.label + '</a>';
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
     Detecta si la página ya tiene un schema del mismo tipo para
     no duplicarlo (páginas como nafta tienen schema propio).     */

  // Utilidad: devuelve true si ya existe un script ld+json con ese @type
  function pageHasSchema(type) {
    var scripts = document.querySelectorAll('script[type="application/ld+json"]');
    for(var i = 0; i < scripts.length; i++) {
      try {
        var d = JSON.parse(scripts[i].textContent);
        if(d['@type'] === type) return true;
        if(d['@graph']) {
          for(var j = 0; j < d['@graph'].length; j++) {
            if(d['@graph'][j]['@type'] === type) return true;
          }
        }
      } catch(e) {}
    }
    return false;
  }

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
    var found = null, foundCat = '', foundCatSlug = '', foundCatLabel = '';
    CALCS.forEach(function(cat){
      cat.items.forEach(function(item){
        if(item.u.replace(/\/$/, '') === path) {
          found = item;
          foundCat = cat.cat;
          foundCatSlug = cat.slug;
          foundCatLabel = cat.label;
        }
      });
    });
    if(!found) return;
    // Si la página ya tiene su propio WebApplication, no duplicar
    if(pageHasSchema('WebApplication')) return;

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

    // ── BreadcrumbList schema ─────────────────────────────────
    // Aparece en Google como: Calculadora.live › Categoría › Nombre
    var bc = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Calculadora.live', 'item': 'https://calculadora.live/' },
        { '@type': 'ListItem', 'position': 2, 'name': foundCatLabel, 'item': 'https://calculadora.live/' + foundCatSlug + '/' },
        { '@type': 'ListItem', 'position': 3, 'name': found.n, 'item': 'https://calculadora.live' + found.u }
      ]
    };
    var bc_sc = document.createElement('script');
    bc_sc.type = 'application/ld+json';
    bc_sc.textContent = JSON.stringify(bc);
    document.head.appendChild(bc_sc);
  })();

  /* ── FOOTER ────────────────────────────────────────────────
     Inyecta el footer en todas las páginas. Si ya existe un
     <footer>, lo rellena. Si no existe, lo crea al final del body. */
  (function(){
    var footerHTML = '<footer class="site-footer">'
      + '<div class="sf-inner">'
      + '<a href="/" class="sf-logo">Calculadora<span class="sf-live">.live</span></a>'
      + '<div class="sf-links">'
      + '<a href="/privacidad/">Privacidad</a>'
      + '<span class="sf-sep">·</span>'
      + '<a href="/terminos/">Términos</a>'
      + '</div>'
      + '<span class="sf-copy">© 2026 Calculadora.live</span>'
      + '</div>'
      + '</footer>';
    var existing = document.querySelector('footer');
    if (existing) {
      // Replace content (keep the element as anchor for related/FAQ injection)
      existing.className = 'site-footer';
      existing.innerHTML = '<div class="sf-inner">'
        + '<a href="/" class="sf-logo">Calculadora<span class="sf-live">.live</span></a>'
        + '<div class="sf-links">'
        + '<a href="/privacidad/">Privacidad</a>'
        + '<span class="sf-sep">·</span>'
        + '<a href="/terminos/">Términos</a>'
        + '</div>'
        + '<span class="sf-copy">© 2026 Calculadora.live</span>'
        + '</div>';
    } else {
      document.body.insertAdjacentHTML('beforeend', footerHTML);
    }
  })();

  /* ── CALCULADORAS RELACIONADAS ──────────────────────────────
     Muestra 3 calculadoras aleatorias de la misma categoría.
     Se actualiza automáticamente al agregar ítems a CALCS.    */
  (function(){
    var path = window.location.pathname.replace(/\/$/, '') || '/';
    var curCat = null;
    CALCS.forEach(function(cat){
      cat.items.forEach(function(item){
        if(item.u.replace(/\/$/, '') === path) curCat = cat;
      });
    });
    if(!curCat || curCat.items.length < 2) return;

    // Otras calculadoras de la misma categoría (excluye la actual)
    var others = curCat.items.filter(function(i){ return i.u.replace(/\/$/, '') !== path; });
    // Mezclar aleatoriamente y tomar hasta 3
    others = others.slice().sort(function(){ return Math.random() - 0.5; }).slice(0, 3);

    var html = '<div class="related-section"><div class="related-heading">Calculadoras relacionadas</div>'
             + '<div class="related-grid">';
    others.forEach(function(item){
      html += '<a class="related-card" href="' + item.u + '">'
            + '<span class="related-icon">' + (item.icon || '🔢') + '</span>'
            + '<span class="related-name">' + item.n + '</span>'
            + '</a>';
    });
    html += '</div></div>';

    // Insertar antes del footer si existe, si no al final del body
    var footerEl = document.querySelector('footer');
    if(footerEl){ footerEl.insertAdjacentHTML('beforebegin', html); }
    else { document.body.insertAdjacentHTML('beforeend', html); }
  })();

  /* ── INYECCIÓN DE FAQs ─────────────────────────────────────
     Inserta la sección de preguntas frecuentes al final del body.
     Se omite si la página ya tiene .faq-section (páginas con FAQs
     codificadas directamente en su HTML).                        */
  (function(){
    if(document.querySelector('.faq-section')) return;
    if(pageHasSchema('FAQPage')) return; // página ya tiene su propio schema FAQ
    var path = window.location.pathname.replace(/\/$/, '') || '/';
    var faqs = FAQS[path];
    if(!faqs || !faqs.length) return;

    // Schema FAQPage para Google rich results
    var schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map(function(f){
        return {
          '@type': 'Question',
          'name': f.q,
          'acceptedAnswer': { '@type': 'Answer', 'text': f.a }
        };
      })
    };
    var sc = document.createElement('script');
    sc.type = 'application/ld+json';
    sc.textContent = JSON.stringify(schema);
    document.head.appendChild(sc);

    // HTML acordeón — open por defecto para que Google vea el contenido
    // (contenido oculto/colapsado no califica para rich results de FAQ)
    var html = '<div class="faq-section"><div class="faq-heading">Preguntas frecuentes</div>';
    faqs.forEach(function(f){
      if(!f.q || !f.a) return; // guard: saltar items incompletos
      html += '<details class="faq-item" open><summary>' + f.q + '</summary>'
            + '<div class="faq-a">' + f.a + '</div></details>';
    });
    html += '</div>';

    // Insertar antes del footer si existe, si no al final del body
    var footer = document.querySelector('footer');
    if(footer) {
      footer.insertAdjacentHTML('beforebegin', html);
    } else {
      document.body.insertAdjacentHTML('beforeend', html);
    }
  })();

  /* ── PÁGINAS DE CATEGORÍA ──────────────────────────────────
     Detecta si estamos en /autos/, /finanzas/, etc. y renderiza
     el grid de esa categoría en #cat-grid-root.               */
  (function(){
    var path = window.location.pathname.replace(/\/$/, '') || '/';
    var catMatch = null;
    CALCS.forEach(function(cat){
      if('/' + cat.slug === path) catMatch = cat;
    });
    if(!catMatch) return;
    var root = document.getElementById('cat-grid-root');
    if(!root) return;
    var html = '<div class="grid">';
    catMatch.items.forEach(function(item){
      var badge = item.badge ? '<span class="badge-new">nuevo</span>' : '';
      var desc = item.hd || item.d;
      html += '<a class="calc-card" href="' + item.u + '">'
            + '<div class="calc-icon">' + (item.icon || '🔢') + '</div>'
            + '<div class="calc-info">'
            + '<div class="calc-name">' + item.n + badge + '</div>'
            + '<div class="calc-desc">' + desc + '</div>'
            + '</div></a>';
    });
    html += '</div>';
    root.innerHTML = html;
  })();

  /* ── SEPARADOR DE MILES EN TIEMPO REAL ──────────────────────
     Convierte input[type="number"] a type="text" con formateo
     en tiempo real (dots cada 3 dígitos mientras el usuario tipea).
     Usa Object.defineProperty para que .value siga devolviendo el
     número crudo → todo el código JS existente sigue funcionando
     sin cambios (parseFloat, comparaciones, asignaciones, etc.)   */
  (function() {
    /* Descriptor nativo guardado ANTES de cualquier override */
    var _proto = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');

    /* "100000.5" → "100.000,5" */
    function toDisplay(raw) {
      var parts = String(raw).split('.');
      var intFmt = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return parts.length > 1 ? intFmt + ',' + parts[1] : intFmt;
    }

    /* "100.000,5" → "100000.5" (JS decimal) */
    function toRaw(display) {
      return display.replace(/\./g, '').replace(',', '.');
    }

    function initFmt(inp) {
      var skip = ['hidden','range','checkbox','radio','file','submit','button','reset','image','color','date','month','week','time','datetime-local'];
      if (inp.dataset.nfDone || skip.indexOf(inp.type) !== -1) return;
      inp.dataset.nfDone = '1';

      /* Cambiar a text con teclado numérico */
      inp.type = 'text';
      if (!inp.getAttribute('inputmode')) inp.setAttribute('inputmode', 'decimal');

      /* Override .value en la instancia (no en el prototipo).
         proto.get/set acceden al slot interno nativo, sin recursar. */
      Object.defineProperty(inp, 'value', {
        get: function() {
          return toRaw(_proto.get.call(inp));
        },
        set: function(v) {
          var s = (v === null || v === undefined) ? '' : String(v);
          var n = parseFloat(toRaw(s));
          if (s === '' || s === '-') {
            _proto.set.call(inp, s);
          } else if (!isNaN(n)) {
            _proto.set.call(inp, toDisplay(s.replace(/\./g, '').replace(',', '.')));
          } else {
            _proto.set.call(inp, s);
          }
        },
        configurable: true
      });

      /* Formatear valor inicial */
      var initRaw = toRaw(_proto.get.call(inp));
      var initN = parseFloat(initRaw);
      if (!isNaN(initN) && initRaw !== '') {
        _proto.set.call(inp, toDisplay(initRaw));
      }

      /* Formateo en tiempo real con corrección de cursor */
      inp.addEventListener('input', function() {
        var cur = _proto.get.call(inp);
        var pos = inp.selectionStart || 0;

        /* Contar dígitos antes del cursor (ignora puntos de formato) */
        var digBefore = cur.substring(0, pos).replace(/[^\d]/g, '').length;

        /* Limpiar: solo dígitos y coma decimal */
        var cleaned = cur.replace(/[^\d,]/g, '');
        var parts   = cleaned.split(',');
        var intPart = parts[0].substring(0, 15);
        var decPart = parts.length > 1 ? ',' + parts[1].substring(0, 6) : '';
        var fmt     = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + decPart;

        _proto.set.call(inp, fmt);

        /* Restaurar cursor: encontrar posición tras los mismos dígitos */
        var newPos = fmt.length, dCnt = 0;
        for (var i = 0; i < fmt.length; i++) {
          if (/\d/.test(fmt[i])) {
            dCnt++;
            if (dCnt === digBefore) { newPos = i + 1; break; }
          }
        }
        try { inp.setSelectionRange(newPos, newPos); } catch (e) {}
      });
    }

    document.querySelectorAll('input[type="number"]').forEach(initFmt);
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

  /* ── COMPARTIR ─────────────────────────────────────────────────────────────
     Función global accesible desde cualquier página.
     En móvil usa el Web Share API nativo (WhatsApp, Telegram, etc.)
     En desktop copia la URL al portapapeles.                                 */
  window.compartir = function() {
    var url = window.location.href.split('?')[0];
    var title = document.title;
    if (navigator.share) {
      navigator.share({ title: title, url: url }).catch(function(){});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(function() {
        var btns = document.querySelectorAll('.share-btn');
        btns.forEach(function(btn) {
          var orig = btn.innerHTML;
          btn.classList.add('nv-copied');
          btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> ¡Enlace copiado!';
          setTimeout(function() { btn.classList.remove('nv-copied'); btn.innerHTML = orig; }, 2000);
        });
      });
    }
  };

  /* ── AUTO-INJECT BOTÓN COMPARTIR ───────────────────────────────────────────
     Se inyecta automáticamente en todas las calculadoras (no en home,
     páginas de categoría ni páginas legales).                                */
  (function() {
    var path = window.location.pathname.replace(/\/$/, '') || '/';
    var skip = ['/', '/autos', '/finanzas', '/salud', '/fechas', '/matematica',
                '/generadores', '/vida-numeros', '/mundial-2026', '/tests',
                '/privacidad', '/terminos'];
    if (skip.indexOf(path) !== -1) return;

    var svgShare = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="flex-shrink:0"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>';
    var wrap = document.createElement('div');
    wrap.className = 'share-wrap';
    wrap.innerHTML = '<button class="share-btn" onclick="compartir()">' + svgShare + ' Compartir</button>';

    // Insertar antes de las calculadoras relacionadas (o antes del footer como fallback)
    var related = document.querySelector('.related-section');
    var footer = document.querySelector('footer');
    if (related) {
      related.parentNode.insertBefore(wrap, related);
    } else if (footer) {
      footer.parentNode.insertBefore(wrap, footer);
    } else {
      document.body.appendChild(wrap);
    }
  })();

  /* ── WIDGET DE FEEDBACK ─────────────────────────────────────
     Inyecta una sección de sugerencias al final de cada
     calculadora. Se omite en home, categorías y páginas legales.
     Para recibir los mensajes, cambiá FEEDBACK_EMAIL por tu
     dirección de correo real.                                  */
  (function () {
    var FEEDBACK_EMAIL = 'hola@calculadora.live'; // ← cambiá por tu email
    var path = window.location.pathname.replace(/\/+$/, '') || '/';
    var skipPaths = [
      '/', '/hogar', '/legal', '/crypto', '/ecommerce',
      '/autos', '/finanzas', '/salud', '/fechas', '/matematica',
      '/generadores', '/vida-numeros', '/mundial-2026', '/tests',
      '/privacidad', '/terminos'
    ];
    if (skipPaths.indexOf(path) !== -1) return;
    if (document.querySelector('.fb-section')) return;

    function inject() {
      if (document.querySelector('.fb-section')) return;

      var s = document.createElement('style');
      s.textContent = [
        '.fb-section{font-family:Inter,sans-serif;max-width:860px;margin:0 auto;padding:0 24px 24px;}',
        '.fb-box{background:var(--surface,#fff);border:1.5px solid var(--line,#E4E7EE);border-radius:16px;padding:22px 24px;}',
        'html[data-theme="dark"] .fb-box{background:var(--surface,#0F1220) !important;border-color:var(--line,#1F2438) !important;}',
        '.fb-title{font-size:14px;font-weight:700;color:var(--ink,#0A0E1A);margin-bottom:3px;letter-spacing:-0.01em;}',
        'html[data-theme="dark"] .fb-title{color:var(--ink,#E2E4F0);}',
        '.fb-sub{font-size:13px;color:var(--ink-3,#858AA0);margin-bottom:14px;line-height:1.5;}',
        '.fb-reactions{display:flex;gap:8px;flex-wrap:wrap;}',
        '.fb-r{border:1.5px solid var(--line,#E4E7EE);background:transparent;border-radius:99px;padding:7px 14px;font-size:13px;font-weight:500;cursor:pointer;color:var(--ink-2,#363B4F);transition:all .15s;font-family:inherit;line-height:1;}',
        'html[data-theme="dark"] .fb-r{border-color:var(--line,#1F2438);color:var(--ink-2,#9CA3C0);}',
        '.fb-r:hover{border-color:rgba(79,107,255,.6);color:#4F6BFF;}',
        '.fb-r.fbactive{border-color:#4F6BFF;background:#EEF1FF;color:#4F6BFF;font-weight:600;}',
        'html[data-theme="dark"] .fb-r.fbactive{background:rgba(79,107,255,.15);}',
        '.fb-ta-wrap{margin-top:12px;}',
        '.fb-ta{width:100%;padding:11px 14px;border:1.5px solid var(--line,#E4E7EE);border-radius:10px;font-family:inherit;font-size:14px;color:var(--ink,#0A0E1A);background:var(--surface,#fff);resize:vertical;min-height:76px;outline:none;transition:border-color .15s;box-sizing:border-box;}',
        'html[data-theme="dark"] .fb-ta{background:var(--dark-2,#141929) !important;border-color:var(--dark-line,#1F2438) !important;color:var(--ink,#E2E4F0) !important;}',
        '.fb-ta:focus{border-color:#4F6BFF;}',
        '.fb-actions{display:flex;justify-content:flex-end;margin-top:10px;}',
        '.fb-send{background:#4F6BFF;color:#fff;border:none;border-radius:10px;padding:9px 20px;font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;transition:opacity .15s;line-height:1;}',
        '.fb-send:hover{opacity:.85;}',
        '.fb-ok{font-size:13px;color:var(--ink-3,#858AA0);margin-top:12px;display:flex;align-items:center;gap:6px;}',
      ].join('');
      document.head.appendChild(s);

      var sec = document.createElement('section');
      sec.className = 'fb-section';
      sec.setAttribute('aria-label', 'Sugerencias');
      sec.innerHTML =
        '<div class="fb-box">' +
          '<div class="fb-title">💡 ¿Algo para mejorar?</div>' +
          '<div class="fb-sub">¿Le falta algo a esta calculadora? ¿Tenés una idea? Cada sugerencia nos ayuda a mejorar.</div>' +
          '<div class="fb-reactions" id="fb-reactions">' +
            '<button class="fb-r" onclick="fbPick(this)">🤩 Me encanta</button>' +
            '<button class="fb-r" onclick="fbPick(this)">💡 Le agregaría algo</button>' +
            '<button class="fb-r" onclick="fbPick(this)">🐛 Algo no funciona</button>' +
            '<button class="fb-r" onclick="fbPick(this)">❓ Tengo una pregunta</button>' +
          '</div>' +
          '<div class="fb-ta-wrap" id="fb-ta-wrap" style="display:none">' +
            '<textarea class="fb-ta" id="fb-ta" placeholder="Contanos qué le agregarías o qué no funciona. ¡Cada sugerencia cuenta!" rows="3"></textarea>' +
            '<div class="fb-actions"><button class="fb-send" onclick="fbSend()">Enviar sugerencia →</button></div>' +
          '</div>' +
          '<div id="fb-ok" style="display:none" class="fb-ok">✅ ¡Gracias! Tu sugerencia nos ayuda a mejorar.</div>' +
        '</div>';

      // Siempre ir antes del footer (el FAQ ya fue inyectado antes, así queda: FAQ → feedback → footer)
      var footer = document.querySelector('footer');
      if (footer) { footer.parentNode.insertBefore(sec, footer); }
      else { document.body.appendChild(sec); }

      window.fbPick = function (btn) {
        document.querySelectorAll('.fb-r').forEach(function (b) { b.classList.remove('fbactive'); });
        btn.classList.add('fbactive');
        document.getElementById('fb-ta-wrap').style.display = '';
        document.getElementById('fb-ta').focus();
      };
      window.fbSend = function () {
        var reaction = (document.querySelector('.fb-r.fbactive') || {}).textContent || '';
        var msg = (document.getElementById('fb-ta').value || '').trim();
        var subj = 'Sugerencia: ' + document.title;
        var body = 'Tipo: ' + reaction + '\n\n' + (msg || '(sin mensaje)') + '\n\nPágina: ' + window.location.href;
        window.location.href = 'mailto:' + FEEDBACK_EMAIL +
          '?subject=' + encodeURIComponent(subj) +
          '&body=' + encodeURIComponent(body);
        document.getElementById('fb-ta-wrap').style.display = 'none';
        document.getElementById('fb-ok').style.display = '';
      };
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', inject);
    } else { inject(); }
  })();

  /* ── AUTO OG / TWITTER TAGS ──────────────────────────────────────────────────
     Inyecta automáticamente las etiquetas Open Graph y Twitter Card faltantes
     en páginas que no las tienen hardcodeadas. Googlebot renderiza JS,
     por lo que las ve correctamente. ──────────────────────────────────────── */
  (function () {
    function addMeta(attrs) {
      var m = document.createElement('meta');
      Object.keys(attrs).forEach(function (k) { m.setAttribute(k, attrs[k]); });
      document.head.appendChild(m);
    }
    function run() {
      var title   = document.title || '';
      var descEl  = document.querySelector('meta[name="description"]');
      var desc    = descEl ? (descEl.getAttribute('content') || '') : '';
      var canonEl = document.querySelector('link[rel="canonical"]');
      var url     = canonEl ? (canonEl.getAttribute('href') || window.location.href) : window.location.href;

      if (!document.querySelector('meta[property="og:title"]'))
        addMeta({ property: 'og:title', content: title });
      if (!document.querySelector('meta[property="og:description"]'))
        addMeta({ property: 'og:description', content: desc });
      if (!document.querySelector('meta[property="og:url"]'))
        addMeta({ property: 'og:url', content: url });
      if (!document.querySelector('meta[property="og:type"]'))
        addMeta({ property: 'og:type', content: 'website' });
      if (!document.querySelector('meta[property="og:site_name"]'))
        addMeta({ property: 'og:site_name', content: 'Calculadora.live' });
      if (!document.querySelector('meta[name="twitter:card"]'))
        addMeta({ name: 'twitter:card', content: 'summary_large_image' });
      if (!document.querySelector('meta[name="twitter:title"]'))
        addMeta({ name: 'twitter:title', content: title });
      if (!document.querySelector('meta[name="twitter:description"]'))
        addMeta({ name: 'twitter:description', content: desc });
      if (!document.querySelector('meta[name="twitter:site"]'))
        addMeta({ name: 'twitter:site', content: '@calculadoralive' });
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run);
    } else { run(); }
  })();

})();
