<div align="center">

# motionforge

**Des vidéos de motion design, écrites en code par votre agent de programmation.**

Décrivez la vidéo. Votre agent écrit l'accroche et le script, cale chaque mot sur la voix off, construit des scènes 2D et 3D, fait le rendu et vérifie son propre travail avant que vous ne le voyiez.

[English](../../README.md) · [Türkçe](README.tr.md) · [Español](README.es.md) · [Português (BR)](README.pt-BR.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [हिन्दी](README.hi.md)

![license](https://img.shields.io/badge/license-MIT-C8F53A?style=flat-square) ![agents](https://img.shields.io/badge/agents-Claude%20Code%20%C2%B7%20Codex%20%C2%B7%20Cursor-111317?style=flat-square) ![styles](https://img.shields.io/badge/styles-100-111317?style=flat-square) ![3D](https://img.shields.io/badge/3D-three.js-111317?style=flat-square) ![languages](https://img.shields.io/badge/languages-10-111317?style=flat-square)

<img src="../media/hero.gif" alt="Un présentateur 3D, un globe avec des arcs de vol, un reel de créateur, un tableau tactique de football et un produit sur plateau tournant, le tout rendu par motionforge" width="900">

</div>

---

## Points forts

| | |
|---|---|
| **100 styles en 20 catégories** | Créateurs, e-commerce, immobilier, football, documentaire, éducation, tech, finance, cuisine, fitness, voyage, événementiel, actualité, entreprise, jeu vidéo, enfants, mode, automobile, direction artistique et associations. Chaque style est une spécification complète : palette, typographie, mise en page, animation, rythme de montage, son et scènes signatures. |
| **Scènes 3D avec three.js** | Produits sur plateau tournant, globe avec arcs de vol, ville avec cercles de distance à pied, maison qui se construit d'elle-même, terrain tactique de football, graphiques 3D. Déterministes, précises à l'image près, rendues hors ligne. |
| **Personnages et avatars parlants** | Un présentateur 3D construit en code, ou votre photo ou illustration transformée en marionnette parlante. La bouche suit la voix off. Gratuit et local par défaut. En option, des modèles de synchronisation labiale fal.ai, Wiro ou locaux si vous connectez une clé. |
| **Du script à la livraison** | Accroches et scripts avec listes d'expressions interdites en 10 langues, timing au mot près, sous-titres, loudness, planches contact et un critique indépendant avant toute livraison. |
| **Rien de payant sans votre accord** | Chaque appel payant (voix, vidéo, synchronisation labiale) indique d'abord ce qu'il va générer et son coût estimé, puis attend. Les clés proviennent uniquement de votre environnement. |

## Comment ça marche

Vous tapez quelque chose comme :

> Fais un reel de 45 secondes pour mon compte immobilier sur cet appartement. Carte du quartier, plan 3D, ma voix, sous-titres.

motionforge en fait un MP4 vérifié en passant par des étapes fixes :

| Étape | Ce qui se passe |
|---|---|
| **Brief** | L'agent reformule votre demande en une phrase et ne demande que ce qui manque (format, durée, langue, voix). |
| **Accroche et script** | 2–3 accroches au choix, un script rythmé pour l'oral et une liste d'affirmations factuelles à vérifier. Pas de statistiques inventées, pas de « formules d'IA » toutes faites. |
| **Voix** | Votre propre enregistrement, un modèle TTS local ou un TTS payant avec votre clé, une fois le coût validé. |
| **Timing** | Horodatage au mot près, pour que chaque titre, logo et sous-titre tombe sur le mot prononcé. |
| **Style et marque** | Un style de la bibliothèque, plus votre `brand.json` (couleurs, polices, logo, filigrane, outro). |
| **Scènes** | Du code déterministe, accessible à n'importe quelle image : HyperFrames (HTML + GSAP, avec three.js pour la 3D) par défaut, Remotion ou un moteur canvas quand ils conviennent mieux. |
| **QA** | Planches contact, contrôle des débordements de texte et des zones de sécurité, temps de lecture, loudness, décalage de la synchronisation labiale et un critique au contexte vierge qui n'a jamais vu la fabrication. |
| **Livraison** | MP4 en 9:16 / 1:1 / 16:9, une image de couverture, des sous-titres et une description de post. Retouches par horodatage : « change le titre à 0:12 ». |

## Bibliothèque de styles

<p align="center"><img src="../media/styles-categories.gif" alt="Aperçus animés de 20 styles motionforge" width="720"></p>

100 looks, regroupés selon le type de compte qui les utilise. Quelques exemples par catégorie :

| Catégorie | Styles (exemples) |
|---|---|
| Créateurs et marques personnelles | `creator-reels-dark`, `talking-head-pop`, `podcast-clip-studio`, `vlog-film-diary`, `cinematic-quote` |
| E-commerce et produits | `product-hero-turntable`, `flash-sale`, `unboxing-pop`, `ugc-testimonial`, `before-after-split` |
| Immobilier et cartes | `map-flyover-pins`, `floorplan-draw-on`, `neighborhood-guide`, `listing-tour-cards`, `luxury-estate` |
| Football et sport | `matchday-graphics`, `tactics-board`, `player-stat-card`, `transfer-breaking`, `telestrator-replay` |
| Documentaire et récit | `archival-newsreel`, `true-crime-board`, `history-map-campaign`, `interview-doc`, `cosmos-scale` |
| Éducation, tech, finance, actualité, cuisine, voyage, événementiel, mode… | voir le catalogue complet |

Catalogue complet, une ligne par style : [skills/style-library/styles/README.md](../../skills/style-library/styles/README.md).

## Scènes 3D

<p align="center"><img src="../media/3d.gif" alt="Six modèles 3D : produit sur plateau tournant, globe, repère en ville, maison en construction, terrain tactique, graphique en barres" width="600"></p>

Une couche three.js pour le moteur HyperFrames. Le canvas 3D se place sous le texte HTML, chaque image est calculée uniquement à partir du temps (ni horloge, ni aléatoire) et tout est rendu hors ligne dans Chrome headless. Apportez votre propre modèle GLB ou utilisez les objets procéduraux intégrés. Détails : [engines/hyperframes/three](../../engines/hyperframes/three/README.md).

| Modèle | À utiliser pour |
|---|---|
| `product-turntable-3d` | lancements de produit, caractéristiques mises en avant sur un socle éclairé |
| `globe-arcs-3d` | itinéraires de voyage, équipes internationales, histoire et actualité |
| `city-pin-3d` | emplacement d'un bien, commerces et services à proximité, temps de marche |
| `house-build-3d` | annonces, rénovations, surfaces pièce par pièce |
| `pitch-tactics-3d` | analyse de football : appels, passes, zones de pressing |
| `bars-3d` | croissance et comparaisons, avec la source à l'écran |

## Vidéos sans visage et UGC

<p align="center"><img src="../media/avatars.gif" alt="Un personnage présentateur en 3D et un avatar parlant créé à partir d'une photo" width="540"></p>

Pour les créateurs qui ne veulent pas apparaître à l'écran et les marques qui produisent des publicités au format UGC. Le skill [`faceless-ugc`](../../skills/faceless-ugc/SKILL.md) propose quatre options :

| Option | Ce que vous obtenez | Coût |
|---|---|---|
| **Sans visage** | sous-titres animés, b-roll, enregistrements d'écran, formats mains seules ou produit seul | gratuit |
| **Personnage 3D** | `character-3d` : un présentateur construit en code avec cinq préréglages (créateur, enseignant, chef, coach, analyste), clignements, gestes et expressions déclenchés sur des repères | gratuit |
| **Avatar photo** | `photo-avatar` : votre photo ou illustration en marionnette 2.5D : mâchoire, intérieur de la bouche, balancement de la tête, respiration, clignements | gratuit |
| **Avatar IA** | image vers vidéo et synchronisation labiale via fal.ai, Wiro ou un modèle de lip-sync sur votre propre GPU (`tools/avatar`) | payant, après une estimation à blanc (dry-run) et votre accord |

Le mouvement de la bouche est calculé à partir de la voix off (`tools/mouth_curve.py`), et chaque option se termine par un contrôle du décalage de synchronisation labiale (`tools/avatar/sync_check.py`). Les avatars de personnes réelles nécessitent leur consentement, et les présentateurs IA dans les publicités sont signalés comme tels.

## Installation

### Claude Code (plugin)

```text
/plugin marketplace add aykutucesai/motionforge
/plugin install motionforge@motionforge
```

Ensuite, demandez une vidéo. Le skill `motion-director` prend le relais.

### Codex, Cursor et autres agents

```bash
git clone https://github.com/aykutucesai/motionforge
```

Indiquez [`AGENTS.md`](../../AGENTS.md) à l'agent. Chaque skill est un simple fichier Markdown avec des commandes exactes : tout agent capable de lire des fichiers et d'exécuter un shell peut le suivre.

### Prérequis

- Node.js 18+ (22 recommandé) et ffmpeg
- Python 3.10+ avec numpy
- Optionnel : `faster-whisper` (timing des mots), `rembg` (détourage), `fonttools` (vérification des glyphes), `mediapipe` (repères du visage), `fal-client` (fal.ai), Playwright Chromium

L'agent les vérifie au début de chaque projet et vous indique précisément quoi installer.

## Essayez ces prompts

```text
Transforme cette voix off (voice.mp3) en reel 9:16. Sous-titres animés, style sombre, vrais logos pour chaque produit que je cite.
```
```text
Fais une vidéo produit de 30 secondes pour cette enceinte, avec un plateau tournant 3D et trois caractéristiques mises en avant. Utilise mon kit de marque.
```
```text
Explique cette contre-attaque sur un terrain 3D : trois passes, un appel, puis le but. Style jour de match.
```
```text
Je ne veux pas montrer mon visage. Crée un présentateur 3D avec des lunettes et un sweat à capuche vert qui lit ce script.
```
```text
Écris 3 accroches et un script de 70 secondes en espagnol sur les économies à faire sur les logiciels. Ne génère pas encore l'audio.
```

## Contenu du dépôt

```
motionforge/
├─ AGENTS.md                 point d'entrée pour tout agent
├─ skills/
│  ├─ motion-director/       le workflow complet et ses étapes de validation
│  ├─ script-and-hooks/      accroches, scripts, liste d'affirmations, expressions interdites (10 langues)
│  ├─ voice-and-timing/      TTS soumis à consentement, timing des mots, sous-titres, loudness
│  ├─ style-library/         100 styles en 20 catégories, un STYLE.md chacun
│  ├─ brand-kit/             brand.json : couleurs, polices, logos, filigrane, outro
│  ├─ faceless-ugc/          formats sans visage, personnages, avatars, lip-sync, formats pub UGC
│  └─ qa-review/             contrôles + critique indépendant
├─ engines/
│  ├─ hyperframes/           moteur par défaut (HTML + GSAP, Apache-2.0)
│  │  └─ three/              couche 3D : scène, lumières, orbite, étiquettes qui suivent des points 3D
│  ├─ remotion/              moteur React optionnel + kit
│  └─ canvas/                pages image = f(t) pour les rendus dessinés à la main et procéduraux
├─ templates/                16 scènes prêtes : 8 en 2D, 6 en 3D, character-3d, photo-avatar
├─ examples/styles/          les scènes derrière les aperçus de styles
└─ tools/                    timing des mots, courbe de bouche, CLI avatar, contrôle de synchro, détourage,
                             loudness, planche contact, contrôle du texte, export, zone de sécurité de couverture
```

Tous les modèles en animation : [templates/README.md](../../templates/README.md).

## Principes

1. **Gratuit par défaut.** Le moteur par défaut, HyperFrames, est sous Apache-2.0 ; three.js est sous MIT. Remotion et les API payantes sont optionnels (voir [Licences](../LICENSING.md)).
2. **Déterministe.** Chaque image est une fonction du temps. Même entrée, même vidéo.
3. **Rien de payant sans consentement.** L'agent annonce d'abord le coût et attend.
4. **Contenu honnête.** Les affirmations qui demandent une source sont listées pour vous ; écrans fictifs, données d'exemple et présentateurs IA sont signalés.
5. **Vérifié avant livraison.** Tant que la QA signale un échec non résolu, la vidéo n'est pas livrée.

## Langues

Les instructions des skills sont rédigées en anglais, pour les agents. L'agent vous parle dans votre langue et écrit scripts, sous-titres et textes à l'écran dans la langue de la vidéo. Les modèles d'accroche et les listes d'expressions interdites sont rédigés nativement en :

English · Türkçe · Español · Português (Brasil) · Français · Deutsch · 简体中文 · 日本語 · 한국어 · हिन्दी

## Licences

motionforge est publié sous [licence MIT](../../LICENSE). Il fait appel à des outils tiers qui conservent leurs propres licences ; voir [THIRD_PARTY.md](../../THIRD_PARTY.md) et le guide en langage clair [docs/LICENSING.md](../LICENSING.md). En bref : HyperFrames est sous Apache-2.0 ; three.js sous MIT ; GSAP s'installe depuis npm sous sa propre licence ; Remotion est gratuit pour les particuliers et les entreprises jusqu'à 3 salariés, et nécessite une licence entreprise au-delà. Les données cartographiques viennent de Natural Earth (domaine public) et d'OpenStreetMap (ODbL, attribution obligatoire).

## Contribuer

Les issues et pull requests sont les bienvenues : nouveaux styles, modèles, scènes 3D, listes de langues, améliorations des moteurs. Lisez d'abord [CONTRIBUTING.md](../../CONTRIBUTING.md).

---

<div align="center">

Créé par <a href="https://www.instagram.com/aykutucesai/">Aykut Üçeş</a> · <a href="https://x.com/Aykutuces">@Aykutuces</a>

</div>
