#!/usr/bin/env python3
"""
update_rankings.py — Genera rankings-data.json consultando GA4.

Requiere:
  env GA4_PROPERTY_ID  → ID numérico de tu propiedad GA4 (ej: "123456789")
  env GA4_CREDENTIALS  → JSON completo de la service account key (como string)

Instalación de dependencias:
  pip install google-analytics-data

Ejecución local (para probar):
  export GA4_PROPERTY_ID="123456789"
  export GA4_CREDENTIALS='{"type":"service_account",...}'
  python scripts/update_rankings.py
"""

import json
import os
import sys
from datetime import date

# ---------------------------------------------------------------------------
# Mapa de URL → metadatos de cada calculadora
# ---------------------------------------------------------------------------
CALC_META = {
    "/divisas/":           {"name": "Convertidor de Divisas",       "cat": "Finanzas",   "desc": "Dólar blue, MEP, CCL y oficial en tiempo real. La más consultada de Argentina."},
    "/inflacion/":         {"name": "Calculadora de Inflación",     "cat": "Finanzas",   "desc": "Actualizá cualquier precio desde 1992 por IPC, dólar blue o UVA."},
    "/sueldo-neto/":       {"name": "Calculadora de Sueldo Neto",   "cat": "Finanzas",   "desc": "Cuánto te depositan: descuentos ANSES, PAMI y retención de ganancias."},
    "/imc/":               {"name": "Calculadora de IMC",           "cat": "Salud",      "desc": "Índice de masa corporal con interpretación y peso ideal según la OMS."},
    "/nafta/":             {"name": "Calculadora de Nafta",         "cat": "Autos",      "desc": "¿Cuánto cuesta el viaje? Regular, premium, diesel y GNC actualizados."},
    "/porcentaje/":        {"name": "Calculadora de Porcentajes",   "cat": "Matemática", "desc": "X% de Y, variaciones, aumentos y descuentos. La más simple y completa."},
    "/aguinaldo/":         {"name": "Calculadora de Aguinaldo",     "cat": "Finanzas",   "desc": "Calculá tu SAC del 1° o 2° semestre al instante, con o sin extras."},
    "/plazo-fijo/":        {"name": "Simulador de Plazo Fijo",      "cat": "Finanzas",   "desc": "Ganancia neta, TEA y comparativa de rendimiento entre distintos plazos."},
    "/indemnizacion/":     {"name": "Calculadora de Indemnización", "cat": "Legal",      "desc": "Despido sin causa, preaviso, vacaciones proporcionales y SAC."},
    "/bmr/":               {"name": "Calorías Diarias (BMR/TDEE)",  "cat": "Salud",      "desc": "Metabolismo basal y gasto total según tu peso, altura y actividad."},
    "/prestamo/":          {"name": "Calculadora de Préstamo",      "cat": "Finanzas",   "desc": "Cuota mensual e intereses totales de cualquier préstamo."},
    "/interes-compuesto/": {"name": "Interés Compuesto",            "cat": "Finanzas",   "desc": "Proyectá el crecimiento de tus ahorros con interés compuesto."},
    "/cuotas/":            {"name": "Cuotas con Tarjeta",           "cat": "Finanzas",   "desc": "Cuota, intereses totales y CFT de tu compra en cuotas."},
    "/mercado-pago/":      {"name": "Rendimiento Mercado Pago",     "cat": "Finanzas",   "desc": "¿Cuánto ganás dejando plata en Mercado Pago? Por días."},
    "/ahorros/":           {"name": "Calculadora de Ahorros",       "cat": "Finanzas",   "desc": "¿Cuándo llegás a tu meta de ahorro con aportes mensuales?"},
    "/poder-adquisitivo/": {"name": "Poder Adquisitivo",            "cat": "Finanzas",   "desc": "¿Cuánto valía tu plata antes? Ajustá por inflación histórica."},
    "/sueldo-hora/":       {"name": "Convertidor de Sueldo",        "cat": "Finanzas",   "desc": "Hora, día, semana, mes y año — convertí tu sueldo al instante."},
    "/margen/":            {"name": "Margen de Ganancia",           "cat": "Finanzas",   "desc": "Precio de venta, margen neto y markup."},
    "/liquidacion/":       {"name": "Liquidación de Haberes",       "cat": "Legal",      "desc": "Sueldo neto con antigüedad, horas extra y SAC proporcional."},
    "/monotributo/":       {"name": "Categoría de Monotributo",     "cat": "Legal",      "desc": "¿En qué categoría caés? Cuota mensual actualizada."},
    "/retenciones/":       {"name": "Retenciones AFIP/ARCA",        "cat": "Legal",      "desc": "IIBB, percepciones y retenciones por operación."},
    "/proteina/":          {"name": "Proteína Diaria",              "cat": "Salud",      "desc": "Gramos de proteína según tu peso, objetivo y actividad."},
    "/hidratacion/":       {"name": "Hidratación Diaria",           "cat": "Salud",      "desc": "¿Cuánta agua necesitás por día según tu actividad?"},
    "/perdida-peso/":      {"name": "Calculadora de Pérdida de Peso","cat": "Salud",     "desc": "¿Cuánto tiempo para llegar a tu peso ideal?"},
    "/1rm/":               {"name": "Repetición Máxima (1RM)",      "cat": "Salud",      "desc": "Estimación del 1RM por fórmula a partir de tus series."},
    "/patente/":           {"name": "Calculadora de Patente",       "cat": "Autos",      "desc": "Impuesto automotor por provincia y modelo."},
    "/service/":           {"name": "Calculadora de Service",       "cat": "Autos",      "desc": "¿Cuándo te toca el próximo service y cuánto cuesta?"},
    "/reforma/":           {"name": "Calculadora de Reforma",       "cat": "Hogar",      "desc": "Presupuestá tu reforma ítem por ítem."},
    "/hipoteca/":          {"name": "Hipoteca y Crédito UVA",       "cat": "Hogar",      "desc": "Cuota UVA, plazo y costo total del crédito."},
    "/expensas/":          {"name": "División de Expensas",         "cat": "Hogar",      "desc": "Por coeficiente entre unidades del edificio."},
    "/alquiler/":          {"name": "Calculadora de Alquiler",      "cat": "Hogar",      "desc": "Ajuste ICL, IPC y CER — cuánto sube tu alquiler."},
    "/edad/":              {"name": "Calculadora de Edad",          "cat": "Fechas",     "desc": "Edad exacta en años, meses y días."},
    "/dias/":              {"name": "Contador de Días",             "cat": "Fechas",     "desc": "Días entre fechas, hábiles o corridos."},
    "/dia-semana/":        {"name": "¿Qué Día Fue?",               "cat": "Fechas",     "desc": "Día de la semana de cualquier fecha."},
    "/calendario/":        {"name": "Calendario 2026",             "cat": "Fechas",     "desc": "Con feriados argentinos."},
    "/reloj/":             {"name": "Reloj en Tiempo Real",         "cat": "Fechas",     "desc": "Hora exacta con modo pantalla completa."},
    "/zodiaco/":           {"name": "¿Cuál es mi Signo?",          "cat": "Fechas",     "desc": "Tu signo zodiacal con descripción completa."},
    "/hoy/":               {"name": "Un Día Como Hoy",             "cat": "Fechas",     "desc": "Efemérides e historia de esta fecha."},
    "/porcentaje/":        {"name": "Calculadora de Porcentajes",   "cat": "Matemática", "desc": "X% de Y, variaciones, aumentos y descuentos."},
    "/regla-de-tres/":     {"name": "Regla de Tres",               "cat": "Matemática", "desc": "Proporción directa e inversa al instante."},
    "/conversion/":        {"name": "Conversión de Unidades",       "cat": "Matemática", "desc": "Longitud, peso, temperatura, velocidad y más."},
    "/crypto-pl/":         {"name": "P&L Crypto",                  "cat": "Crypto",     "desc": "Ganancia o pérdida en pesos y dólares."},
    "/crypto-dca/":        {"name": "DCA Crypto",                  "cat": "Crypto",     "desc": "Precio promedio y retorno de tu estrategia DCA."},
    "/mundial/":           {"name": "¿Cuánto Falta para el Mundial?","cat": "Especial",  "desc": "Cuenta regresiva en tiempo real hasta el Mundial 2026."},
    "/countdowns/":              {"name": "Cuentas Regresivas (hub)",      "cat": "Contadores", "desc": "Todos los contadores en un lugar."},
    "/countdowns/navidad/":      {"name": "¿Cuánto Falta para Navidad?",  "cat": "Contadores", "desc": "Cuenta regresiva hasta el 25 de diciembre."},
    "/countdowns/ano-nuevo/":    {"name": "Año Nuevo",                    "cat": "Contadores", "desc": "Cuenta regresiva hasta el 1° de enero."},
    "/countdowns/feriado/":      {"name": "Próximo Feriado",              "cat": "Contadores", "desc": "Próximo feriado nacional en Argentina."},
    "/countdowns/fin-de-semana/":{"name": "Fin de Semana",               "cat": "Contadores", "desc": "¿Cuánto falta para el sábado?"},
    "/countdowns/black-friday/": {"name": "Black Friday",                 "cat": "Contadores", "desc": "4to viernes de noviembre."},
    "/countdowns/hot-sale/":     {"name": "Hot Sale Argentina",           "cat": "Contadores", "desc": "Evento de e-commerce más grande de Argentina."},
    "/countdowns/halloween/":    {"name": "Halloween",                    "cat": "Contadores", "desc": "31 de octubre."},
    "/countdowns/san-valentin/": {"name": "San Valentín",                "cat": "Contadores", "desc": "14 de febrero."},
    "/countdowns/f1/":           {"name": "Próxima Carrera F1",          "cat": "Contadores", "desc": "Fórmula 1."},
    "/countdowns/final-champions/":{"name":"Final Champions League",      "cat": "Contadores", "desc": "Final UEFA Champions."},
    "/countdowns/gta6/":         {"name": "GTA VI",                       "cat": "Contadores", "desc": "El juego más esperado."},
    "/countdowns/olimpicos/":    {"name": "Juegos Olímpicos LA 2028",    "cat": "Contadores", "desc": "Los Ángeles 2028."},
    "/ecommerce/kpis/":    {"name": "KPIs de Ecommerce",           "cat": "Ecommerce",  "desc": "ROAS, CAC, LTV, margen neto y más."},
    "/ecommerce/margen/":  {"name": "Margen de Ecommerce",         "cat": "Ecommerce",  "desc": "Con comisiones, envío, pasarela e inversión publicitaria."},
    "/ecommerce/proyeccion/":{"name": "Proyección de Negocio",     "cat": "Ecommerce",  "desc": "Escenarios y gráfico mes a mes."},
    "/ecommerce/envio-china/":{"name": "Envío desde China",        "cat": "Ecommerce",  "desc": "Aéreo y marítimo — peso volumétrico y m³."},
    "/vida/":              {"name": "Tu Vida en Números",          "cat": "Especial",   "desc": "Latidos, pestañeos, pasos en tiempo real."},
    "/cuanto-gana/":       {"name": "¿Cuánto Gana por Segundo?",   "cat": "Especial",   "desc": "Messi, Taylor Swift, Elon Musk en tiempo real."},
    "/generador/":         {"name": "Generador Aleatorio",         "cat": "Herramientas","desc": "Números, letras o elementos de una lista."},
    "/tutti-frutti/":      {"name": "Tutti Frutti Online",         "cat": "Herramientas","desc": "Sorteo de letras para el juego clásico argentino."},
    "/reaccion/":          {"name": "Test de Reacción",            "cat": "Herramientas","desc": "¿Cuánto tardás en reaccionar?"},
    "/cps/":               {"name": "CPS Test",                   "cat": "Herramientas","desc": "Clicks por segundo en 5, 10 o 30 segundos."},
    "/teclado/":           {"name": "Prueba de Teclado",           "cat": "Herramientas","desc": "Verificá que todas las teclas funcionen."},
}

# Orden de categorías para la sección "Mejores por categoría"
CATEGORY_ORDER = ["Finanzas", "Salud", "Legal", "Autos", "Fechas", "Matemática"]


def fetch_ga4_rankings(property_id: str, creds_dict: dict) -> list[dict]:
    """Consulta GA4 y devuelve lista de {url, views} ordenada por views desc."""
    try:
        from google.analytics.data_v1beta import BetaAnalyticsDataClient
        from google.analytics.data_v1beta.types import (
            RunReportRequest, Dimension, Metric, DateRange, OrderBy
        )
    except ImportError:
        print("ERROR: pip install google-analytics-data", file=sys.stderr)
        sys.exit(1)

    client = BetaAnalyticsDataClient.from_service_account_info(creds_dict)

    request = RunReportRequest(
        property=f"properties/{property_id}",
        dimensions=[Dimension(name="pagePath")],
        metrics=[Metric(name="screenPageViews")],
        date_ranges=[DateRange(start_date="30daysAgo", end_date="today")],
        order_bys=[
            OrderBy(
                metric=OrderBy.MetricOrderBy(metric_name="screenPageViews"),
                desc=True
            )
        ],
        limit=80,
    )

    response = client.run_report(request)

    results = []
    for row in response.rows:
        path = row.dimension_values[0].value
        views = int(row.metric_values[0].value)
        # Normalizar path: asegurarse de que termine en /
        if not path.endswith("/"):
            path = path + "/"
        if path in CALC_META:
            results.append({"url": path, "views": views})

    return results


def build_top10(ranked: list[dict]) -> list[dict]:
    top = []
    for i, item in enumerate(ranked[:10]):
        meta = CALC_META[item["url"]]
        top.append({
            "url": item["url"],
            "name": meta["name"],
            "cat": meta["cat"],
            "desc": meta["desc"],
            "views_30d": item["views"],
        })
    return top


def build_by_category(ranked: list[dict]) -> list[dict]:
    # Agrupar por categoría, en el orden que aparecen en el ranking
    cat_items: dict[str, list] = {}
    for item in ranked:
        meta = CALC_META[item["url"]]
        cat = meta["cat"]
        if cat not in cat_items:
            cat_items[cat] = []
        cat_items[cat].append({"url": item["url"], "name": meta["name"]})

    result = []
    # Primero las categorías en el orden definido
    for cat in CATEGORY_ORDER:
        if cat in cat_items:
            result.append({"label": cat, "items": cat_items[cat][:6]})

    # Luego las categorías restantes (no en CATEGORY_ORDER)
    for cat, items in cat_items.items():
        if cat not in CATEGORY_ORDER:
            result.append({"label": cat, "items": items[:6]})

    return result


def main():
    property_id = os.environ.get("GA4_PROPERTY_ID", "").strip()
    creds_raw = os.environ.get("GA4_CREDENTIALS", "").strip()

    if not property_id or not creds_raw:
        print("WARN: GA4_PROPERTY_ID o GA4_CREDENTIALS no configurados. Manteniendo rankings-data.json actual.", file=sys.stderr)
        sys.exit(0)

    try:
        creds_dict = json.loads(creds_raw)
    except json.JSONDecodeError as e:
        print(f"ERROR: GA4_CREDENTIALS no es JSON válido: {e}", file=sys.stderr)
        sys.exit(1)

    print(f"Consultando GA4 property {property_id}…")
    ranked = fetch_ga4_rankings(property_id, creds_dict)
    print(f"  → {len(ranked)} calculadoras encontradas en GA4")

    if len(ranked) < 5:
        print("WARN: Muy pocos resultados en GA4. Abortando para no dañar el archivo actual.", file=sys.stderr)
        sys.exit(0)

    top10 = build_top10(ranked)
    by_category = build_by_category(ranked)

    output = {
        "updated": date.today().isoformat(),
        "source": "ga4",
        "period": "últimos 30 días",
        "top10": top10,
        "byCategory": by_category,
    }

    out_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "rankings-data.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"✓ rankings-data.json actualizado — Top 1: {top10[0]['name']} ({top10[0].get('views_30d', '?')} vistas)")


if __name__ == "__main__":
    main()
