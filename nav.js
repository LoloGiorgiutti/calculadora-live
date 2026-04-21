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

  /* ── FAQS ────────────────────────────────────────────────────────────────────
     Preguntas frecuentes por calculadora. La clave es la pathname sin trailing
     slash (igual que item.u). El bloque de inyección al final del archivo las
     inserta automáticamente en cada página, a menos que ya exista .faq-section.
  ─────────────────────────────────────────────────────────────────────────── */
  var FAQS = {
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
  };

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

  /* ── INYECCIÓN DE FAQs ─────────────────────────────────────
     Inserta la sección de preguntas frecuentes al final del body.
     Se omite si la página ya tiene .faq-section (páginas con FAQs
     codificadas directamente en su HTML).                        */
  (function(){
    if(document.querySelector('.faq-section')) return;
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

    // HTML acordeón
    var html = '<div class="faq-section"><div class="faq-heading">Preguntas frecuentes</div>';
    faqs.forEach(function(f){
      html += '<details class="faq-item"><summary>' + f.q + '</summary>'
            + '<div class="faq-a">' + f.a + '</div></details>';
    });
    html += '</div>';

    // Insertar al final del body, o después del footer si existe
    var footer = document.querySelector('footer');
    if(footer) {
      footer.insertAdjacentHTML('afterend', html);
    } else {
      document.body.insertAdjacentHTML('beforeend', html);
    }
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
