<div align="center">

# motionforge

**Videos de motion design escritos en código por tu agente de programación.**

Describe el video. Tu agente escribe el gancho y el guion, sincroniza cada palabra con la locución, construye las escenas, renderiza y revisa su propio trabajo antes de que tú lo veas.

[English](../../README.md) · [Türkçe](README.tr.md) · [Español](README.es.md) · [Português (BR)](README.pt-BR.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [हिन्दी](README.hi.md)

![license](https://img.shields.io/badge/license-MIT-C8F53A?style=flat-square) ![agents](https://img.shields.io/badge/agents-Claude%20Code%20%C2%B7%20Codex%20%C2%B7%20Cursor-111317?style=flat-square) ![engine](https://img.shields.io/badge/default%20engine-HyperFrames-111317?style=flat-square) ![languages](https://img.shields.io/badge/languages-10-111317?style=flat-square)

</div>

---

## Qué hace

Escribes algo como:

> Haz un reel vertical de 60 segundos sobre las 5 herramientas gratuitas que uso todos los días. Estilo oscuro, mi voz, subtítulos.

motionforge lo convierte en un MP4 revisado pasando por una serie fija de etapas:

| Etapa | Qué pasa |
|---|---|
| **Brief** | El agente resume tu petición en una frase y solo pregunta lo que falta (formato, duración, idioma, voz). |
| **Gancho y guion** | 2–3 opciones de gancho, un guion con ritmo pensado para decirse en voz alta y una lista de afirmaciones que conviene que verifiques. Sin estadísticas inventadas. Sin las típicas "frases de IA" (listas de frases prohibidas en 10 idiomas). |
| **Voz** | Usa tu propia clave de TTS (ElevenLabs, OpenAI) o un modelo local. El agente te dice cuánto cuesta y espera tu "sí" antes de cualquier llamada de pago. |
| **Sincronización** | Marcas de tiempo por palabra sacadas de la locución, para que cada título, logo y subtítulo aparezca justo cuando se pronuncia esa palabra. |
| **Estilo y marca** | Elige un look de la biblioteca de estilos y aplica tu `brand.json` (colores, fuentes, logo, marca de agua, cierre). |
| **Escenas** | Se construyen como código determinista en el que se puede saltar a cualquier instante: HyperFrames (HTML + GSAP) por defecto, y Remotion o un motor canvas cuando encajan mejor. |
| **QA** | Hojas de contactos, comprobación de texto desbordado y zonas seguras, tiempo de lectura en pantalla, sonoridad y un revisor crítico con contexto limpio que no escribió las escenas. |
| **Entrega** | MP4 en 9:16 / 1:1 / 16:9, una imagen de portada, subtítulos y el texto para la publicación. Los cambios se piden por marca de tiempo: "cambia el título en 0:12". |

## Instalación

### Claude Code (plugin)

```text
/plugin marketplace add aykutucesai/motionforge
/plugin install motionforge@motionforge
```

Después, solo pide un video. La skill `motion-director` se encarga del resto.

### Codex, Cursor y otros agentes

```bash
git clone https://github.com/aykutucesai/motionforge
```

Abre la carpeta (o añádela a tu proyecto) y dile al agente que siga [`AGENTS.md`](../../AGENTS.md). Cada skill es Markdown plano con los comandos exactos, así que cualquier agente que pueda leer archivos y ejecutar comandos en una shell puede seguirla.

### Requisitos

- Node.js 18+ (se recomienda 22) y ffmpeg
- Python 3.10+
- Opcional: `faster-whisper` (tiempos por palabra), `rembg` (recorte de la persona que habla a cámara), `fonttools` (comprobación de glifos), Playwright Chromium

El agente los comprueba al empezar cada trabajo y te dice exactamente qué tienes que instalar.

## Prueba estos prompts

```text
Convierte esta locución (voice.mp3) en un reel 9:16. Subtítulos cinéticos, estilo oscuro y logos reales de cada producto que mencione.
```
```text
Haz un clip de lanzamiento de 30 segundos para mi app a partir de estas 4 capturas de pantalla. Usa mi kit de marca.
```
```text
Escribe 3 opciones de gancho y un guion de 70 segundos en español sobre cómo ahorrar dinero en software. Todavía no generes el audio.
```
```text
Aquí tienes un clip de 10 segundos en el que salgo en mi escritorio. Usa los primeros 5 segundos como intro y los últimos 5 como cierre, con gráficos en medio.
```

## Qué incluye

```
motionforge/
├─ AGENTS.md                 punto de entrada para cualquier agente
├─ skills/
│  ├─ motion-director/       el flujo completo y sus puntos de aprobación
│  ├─ script-and-hooks/      ganchos, guiones, lista de afirmaciones, frases prohibidas (10 idiomas)
│  ├─ voice-and-timing/      TTS solo con tu consentimiento, tiempos por palabra, subtítulos, sonoridad
│  ├─ style-library/         20 looks, un STYLE.md para cada uno
│  ├─ brand-kit/             brand.json: colores, fuentes, logos, marca de agua, cierre
│  └─ qa-review/             comprobaciones + revisor crítico independiente
├─ engines/
│  ├─ hyperframes/           motor por defecto (HTML + GSAP, Apache-2.0)
│  ├─ remotion/              motor React opcional + kit
│  └─ canvas/                páginas frame = f(t) para looks dibujados a mano y procedurales
├─ templates/                escenas listas: título cinético, subtítulos, contador, navegador, móvil, chat, checklist, portada
└─ tools/                    tiempos por palabra, recorte, sonoridad, hoja de contactos, revisión de texto, exportación, zona segura de portada
```

## Principios

1. **Gratis para todos por defecto.** El motor por defecto, HyperFrames, tiene licencia Apache-2.0. Remotion es opcional (consulta [Licencias](../LICENSING.md)).
2. **Determinista.** Cada fotograma es una función del tiempo. Misma entrada, mismo video.
3. **Nada de pago sin tu consentimiento.** El agente te dice primero cuánto cuesta.
4. **Contenido honesto.** Las afirmaciones que necesitan una fuente se te muestran en una lista; las pantallas simuladas se indican como tales.
5. **Revisado antes de entregarse.** Si QA tiene un fallo sin resolver, el video no se entrega.

## Idiomas

Las instrucciones de las skills están escritas en inglés para los agentes. El agente te habla en tu idioma y escribe guiones, subtítulos y textos en pantalla en el idioma del video. Los patrones de ganchos y las listas de frases prohibidas están escritos directamente en cada uno de estos idiomas:

English · Türkçe · Español · Português (Brasil) · Français · Deutsch · 简体中文 · 日本語 · 한국어 · हिन्दी

## Licencias

motionforge se publica bajo la [licencia MIT](../../LICENSE). Usa herramientas de terceros que mantienen sus propias licencias; consulta [THIRD_PARTY.md](../../THIRD_PARTY.md) y la guía en lenguaje sencillo de [docs/LICENSING.md](../LICENSING.md). En resumen: HyperFrames es Apache-2.0; GSAP se instala desde npm con su propia licencia; Remotion es gratis para particulares y empresas de hasta 3 empleados, y por encima de eso necesita una licencia de empresa.

## Cómo contribuir

Los issues y pull requests son bienvenidos: nuevos estilos, plantillas, listas de idiomas, mejoras de los motores. Lee primero [CONTRIBUTING.md](../../CONTRIBUTING.md).

---

<div align="center">

Made by <a href="https://www.instagram.com/aykutucesai/">Aykut Üçeş</a> · <a href="https://x.com/Aykutuces">@Aykutuces</a>

</div>
