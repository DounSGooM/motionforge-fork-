<div align="center">

# motionforge

**Motion-Design-Videos, von deinem Coding-Agenten in Code geschrieben.**

Beschreib das Video. Dein Agent schreibt Hook und Skript, legt jedes Wort auf das Voice-over, baut 2D- und 3D-Szenen, rendert und prüft seine eigene Arbeit, bevor du sie siehst.

[English](../../README.md) · [Türkçe](README.tr.md) · [Español](README.es.md) · [Português (BR)](README.pt-BR.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [हिन्दी](README.hi.md)

![license](https://img.shields.io/badge/license-MIT-C8F53A?style=flat-square) ![agents](https://img.shields.io/badge/agents-Claude%20Code%20%C2%B7%20Codex%20%C2%B7%20Cursor-111317?style=flat-square) ![styles](https://img.shields.io/badge/styles-100-111317?style=flat-square) ![3D](https://img.shields.io/badge/3D-three.js-111317?style=flat-square) ![languages](https://img.shields.io/badge/languages-10-111317?style=flat-square)

<img src="../media/hero.gif" alt="Ein 3D-Moderator, ein Globus mit Flugbögen, ein Creator-Reel, eine Fußball-Taktiktafel und ein Produkt auf dem Drehteller, alles mit motionforge gerendert" width="900">

</div>

---

## Highlights

| | |
|---|---|
| **100 Styles in 20 Kategorien** | Creator, E-Commerce, Immobilien, Fußball, Doku, Bildung, Tech, Finanzen, Food, Fitness, Reisen, Events, News, Business, Gaming, Kinder, Mode, Automobil, Art Direction und Non-Profits. Jeder Style ist eine vollständige Spezifikation: Farbpalette, Typografie, Layout, Motion, Schnittrhythmus, Sound und typische Szenen. |
| **3D-Szenen mit three.js** | Produkte auf dem Drehteller, ein Globus mit Flugbögen, eine Stadt mit Gehzeit-Ringen, ein Haus, das sich selbst aufbaut, ein Fußball-Taktikfeld, 3D-Diagramme. Deterministisch, framegenau, offline gerendert. |
| **Sprechende Figuren und Avatare** | Ein 3D-Moderator aus Code oder dein Foto bzw. deine Illustration als sprechende Puppe. Der Mund folgt dem Voice-over. Standardmäßig kostenlos und lokal. Optional Lip-Sync-Modelle von fal.ai, Wiro oder lokal, sobald du einen Key hinterlegst. |
| **Vom Skript bis zur Auslieferung** | Hooks und Skripte mit Listen verbotener Phrasen in 10 Sprachen, Timing auf Wortebene, Untertitel, Lautheit, Kontaktbögen und ein unabhängiger Kritiker, bevor irgendetwas ausgeliefert wird. |
| **Nichts Kostenpflichtiges ohne dein Ja** | Jeder kostenpflichtige Aufruf (Stimme, Video, Lip-Sync) zeigt zuerst, was er erzeugt und was er voraussichtlich kostet, und wartet dann. Keys kommen ausschließlich aus deiner Umgebung. |

## So funktioniert's

Du schreibst zum Beispiel:

> Mach ein 45-Sekunden-Reel für meinen Immobilien-Account über diese Wohnung. Karte der Nachbarschaft, 3D-Grundriss, meine Stimme, Untertitel.

motionforge macht daraus in festen Schritten ein geprüftes MP4:

| Schritt | Was passiert |
|---|---|
| **Briefing** | Der Agent fasst deine Anfrage in einem Satz zusammen und fragt nur nach, was fehlt (Format, Länge, Sprache, Stimme). |
| **Hook & Skript** | 2–3 Hook-Optionen, ein Skript im Sprechtempo und eine Liste von Faktenaussagen, die du prüfen kannst. Keine erfundenen Statistiken, keine typischen „KI-Floskeln“. |
| **Stimme** | Deine eigene Aufnahme, ein lokales TTS-Modell oder ein kostenpflichtiges TTS mit deinem Key, nachdem du die Kosten freigegeben hast. |
| **Timing** | Zeitstempel pro Wort, damit jeder Titel, jedes Logo und jeder Untertitel genau auf dem gesprochenen Wort landet. |
| **Style & Marke** | Ein Style aus der Bibliothek plus deine `brand.json` (Farben, Schriften, Logo, Wasserzeichen, Outro). |
| **Szenen** | Deterministischer Code, der sich an jede Stelle spulen lässt: standardmäßig HyperFrames (HTML + GSAP, mit three.js für 3D), Remotion oder eine Canvas-Engine, wenn sie besser passen. |
| **QA** | Kontaktbögen, Prüfung auf Textüberlauf und Safe Areas, Lesezeit, Lautheit, Lip-Sync-Versatz und ein Kritiker mit frischem Kontext, der den Entstehungsprozess nie gesehen hat. |
| **Auslieferung** | MP4 in 9:16 / 1:1 / 16:9, ein Cover-Standbild, Untertitel und ein Beitragstext. Änderungen per Zeitstempel: „ändere den Titel bei 0:12“. |

## Style-Bibliothek

<p align="center"><img src="../media/styles-categories.gif" alt="Animierte Vorschauen von 20 motionforge-Styles" width="720"></p>

100 Looks, gruppiert nach der Art von Account, die sie nutzt. Ein paar pro Kategorie:

| Kategorie | Styles (Beispiele) |
|---|---|
| Creator & Personal Brands | `creator-reels-dark`, `talking-head-pop`, `podcast-clip-studio`, `vlog-film-diary`, `cinematic-quote` |
| E-Commerce & Produkte | `product-hero-turntable`, `flash-sale`, `unboxing-pop`, `ugc-testimonial`, `before-after-split` |
| Immobilien & Karten | `map-flyover-pins`, `floorplan-draw-on`, `neighborhood-guide`, `listing-tour-cards`, `luxury-estate` |
| Fußball & Sport | `matchday-graphics`, `tactics-board`, `player-stat-card`, `transfer-breaking`, `telestrator-replay` |
| Doku & Storytelling | `archival-newsreel`, `true-crime-board`, `history-map-campaign`, `interview-doc`, `cosmos-scale` |
| Bildung, Tech, Finanzen, News, Food, Reisen, Events, Mode … | siehe vollständiger Katalog |

Vollständiger Katalog mit einer Zeile pro Style: [skills/style-library/styles/README.md](../../skills/style-library/styles/README.md).

## 3D-Szenen

<p align="center"><img src="../media/3d.gif" alt="Sechs 3D-Templates: Produkt-Drehteller, Globus, Stadt-Pin, Hausbau, Taktikfeld, Balkendiagramm" width="600"></p>

Eine three.js-Ebene für die HyperFrames-Engine. Das 3D-Canvas liegt unter dem HTML-Text, jeder Frame wird allein aus der Zeit berechnet (keine Uhr, kein Zufall), und alles wird offline in Headless Chrome gerendert. Bring dein eigenes GLB-Modell mit oder nutze die eingebauten prozeduralen Objekte. Details: [engines/hyperframes/three](../../engines/hyperframes/three/README.md).

| Template | Einsatz |
|---|---|
| `product-turntable-3d` | Produktlaunches, Spec-Callouts auf einem beleuchteten Sockel |
| `globe-arcs-3d` | Reiserouten, globale Teams, Geschichte und News |
| `city-pin-3d` | Lage einer Immobilie, Umgebung und Gehzeiten |
| `house-build-3d` | Exposés, Renovierungen, Wohnfläche pro Raum |
| `pitch-tactics-3d` | Fußballanalyse: Laufwege, Pässe, Pressingzonen |
| `bars-3d` | Wachstum und Vergleiche, mit Quelle im Bild |

## Faceless- und UGC-Videos

<p align="center"><img src="../media/avatars.gif" alt="Eine 3D-Moderatorenfigur und ein sprechender Foto-Avatar" width="540"></p>

Für Creator, die nicht vor die Kamera wollen, und Marken, die Werbung im UGC-Stil machen. Der Skill [`faceless-ugc`](../../skills/faceless-ugc/SKILL.md) bietet vier Wege:

| Weg | Was du bekommst | Kosten |
|---|---|---|
| **Ohne Gesicht** | kinetische Untertitel, B-Roll, Bildschirmaufnahmen, Formate nur mit Händen oder nur mit Produkt | kostenlos |
| **3D-Figur** | `character-3d`: ein Moderator aus Code mit fünf Presets (Creator, Lehrkraft, Koch, Coach, Analyst), Blinzeln, Gesten und Mimik auf Stichwort | kostenlos |
| **Foto-Avatar** | `photo-avatar`: dein Foto oder deine Illustration als 2,5D-Puppe: Kiefer, Mundinnenraum, Kopfbewegung, Atmung, Blinzeln | kostenlos |
| **KI-Avatar** | Image-to-Video und Lip-Sync über fal.ai, Wiro oder ein Lip-Sync-Modell auf deiner eigenen GPU (`tools/avatar`) | kostenpflichtig, erst nach Kostenschätzung per Dry-Run und deiner Freigabe |

Die Mundbewegung wird aus dem Voice-over berechnet (`tools/mouth_curve.py`), und jeder Weg endet mit einer Prüfung des Lip-Sync-Versatzes (`tools/avatar/sync_check.py`). Avatare echter Personen brauchen deren Einwilligung, und KI-Moderatoren in Werbung werden gekennzeichnet.

## Installation

### Claude Code (Plugin)

```text
/plugin marketplace add aykutucesai/motionforge
/plugin install motionforge@motionforge
```

Dann bitte um ein Video. Der Skill `motion-director` übernimmt.

### Codex, Cursor und andere Agenten

```bash
git clone https://github.com/aykutucesai/motionforge
```

Verweise den Agenten auf [`AGENTS.md`](../../AGENTS.md). Jeder Skill ist reines Markdown mit exakten Befehlen, daher kann ihm jeder Agent folgen, der Dateien lesen und eine Shell ausführen kann.

### Voraussetzungen

- Node.js 18+ (22 empfohlen) und ffmpeg
- Python 3.10+ mit numpy
- Optional: `faster-whisper` (Wort-Timings), `rembg` (Freisteller), `fonttools` (Glyphenprüfung), `mediapipe` (Gesichtspunkte), `fal-client` (fal.ai), Playwright Chromium

Der Agent prüft das zu Beginn jedes Auftrags und sagt dir genau, was du installieren musst.

## Probier diese Prompts

```text
Mach aus diesem Voice-over (voice.mp3) ein 9:16-Reel. Kinetische Untertitel, dunkler Style, echte Logos für jedes Produkt, das ich erwähne.
```
```text
Mach ein 30-Sekunden-Produktvideo für diesen Lautsprecher mit 3D-Drehteller und drei Spec-Callouts. Nutze mein Brand-Kit.
```
```text
Erklär diesen Konter auf einem 3D-Spielfeld: drei Pässe, ein Laufweg, dann das Tor. Matchday-Style.
```
```text
Ich will mein Gesicht nicht zeigen. Bau einen 3D-Moderator mit Brille und grünem Hoodie, der dieses Skript vorliest.
```
```text
Schreib 3 Hook-Optionen und ein 70-Sekunden-Skript auf Spanisch darüber, wie man bei Software Geld spart. Noch kein Audio erzeugen.
```

## Was drin ist

```
motionforge/
├─ AGENTS.md                 Einstieg für jeden Agenten
├─ skills/
│  ├─ motion-director/       der komplette Workflow mit seinen Freigabeschritten
│  ├─ script-and-hooks/      Hooks, Skripte, Faktenliste, verbotene Phrasen (10 Sprachen)
│  ├─ voice-and-timing/      TTS nur mit Einwilligung, Wort-Timings, Untertitel, Lautheit
│  ├─ style-library/         100 Styles in 20 Kategorien, je eine STYLE.md
│  ├─ brand-kit/             brand.json: Farben, Schriften, Logos, Wasserzeichen, Outro
│  ├─ faceless-ugc/          Formate ohne Gesicht, Figuren, Avatare, Lip-Sync, UGC-Werbeformate
│  └─ qa-review/             Prüfungen + unabhängiger Kritiker
├─ engines/
│  ├─ hyperframes/           Standard-Engine (HTML + GSAP, Apache-2.0)
│  │  └─ three/              3D-Ebene: Bühne, Licht, Orbit, Labels, die 3D-Punkten folgen
│  ├─ remotion/              optionale React-Engine + Kit
│  └─ canvas/                Seiten mit frame = f(t) für handgezeichnete und prozedurale Looks
├─ templates/                16 fertige Szenen: 8 in 2D, 6 in 3D, character-3d, photo-avatar
├─ examples/styles/          die Szenen hinter den Style-Vorschauen
└─ tools/                    Wort-Timings, Mundkurve, Avatar-CLI, Sync-Check, Freisteller,
                             Lautheit, Kontaktbogen, Textprüfung, Export, Safe Area fürs Cover
```

Alle Templates animiert: [templates/README.md](../../templates/README.md).

## Prinzipien

1. **Standardmäßig kostenlos.** Die Standard-Engine HyperFrames steht unter Apache-2.0, three.js unter MIT. Remotion und kostenpflichtige APIs sind optional (siehe [Lizenzen](../LICENSING.md)).
2. **Deterministisch.** Jeder Frame ist eine Funktion der Zeit. Gleiche Eingabe, gleiches Video.
3. **Nichts Kostenpflichtiges ohne Zustimmung.** Der Agent nennt zuerst die Kosten und wartet.
4. **Ehrliche Inhalte.** Aussagen, die eine Quelle brauchen, werden für dich aufgelistet; Mock-Screens, Beispieldaten und KI-Moderatoren werden gekennzeichnet.
5. **Vor der Auslieferung geprüft.** Solange die QA einen offenen Fehler meldet, wird das Video nicht ausgeliefert.

## Sprachen

Die Skill-Anweisungen sind für Agenten auf Englisch geschrieben. Der Agent spricht mit dir in deiner Sprache und schreibt Skripte, Untertitel und Bildschirmtexte in der Sprache des Videos. Hook-Muster und Listen verbotener Phrasen gibt es muttersprachlich in:

English · Türkçe · Español · Português (Brasil) · Français · Deutsch · 简体中文 · 日本語 · 한국어 · हिन्दी

## Lizenz

motionforge steht unter der [MIT-Lizenz](../../LICENSE). Es ruft Tools von Drittanbietern auf, die ihre eigenen Lizenzen behalten; siehe [THIRD_PARTY.md](../../THIRD_PARTY.md) und den verständlich geschriebenen Leitfaden in [docs/LICENSING.md](../LICENSING.md). Kurz gesagt: HyperFrames steht unter Apache-2.0, three.js unter MIT; GSAP wird über npm unter seiner eigenen Lizenz installiert; Remotion ist für Einzelpersonen und Unternehmen mit bis zu 3 Beschäftigten kostenlos und braucht darüber eine Firmenlizenz. Kartendaten stammen von Natural Earth (gemeinfrei) und OpenStreetMap (ODbL, Namensnennung erforderlich).

## Mitmachen

Issues und Pull Requests sind willkommen: neue Styles, Templates, 3D-Szenen, Sprachlisten, Verbesserungen an den Engines. Lies vorher [CONTRIBUTING.md](../../CONTRIBUTING.md).

---

<div align="center">

Erstellt von <a href="https://www.instagram.com/aykutucesai/">Aykut Üçeş</a> · <a href="https://x.com/Aykutuces">@Aykutuces</a>

</div>
