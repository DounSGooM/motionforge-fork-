/**
 * motionforge Remotion kit — font loading with the latin / latin-ext split
 * © 2026 motionforge contributors, MIT
 *
 * Fontsource ships each font as several subset files. For Latin-script languages two matter:
 *   latin      U+0000-00FF + dotless ı (U+0131) + punctuation/currency
 *   latin-ext  İ (U+0130), ş, ğ, ő, ł, č, ž ...
 * Load only the latin file and words like "İstanbul" or "Łódź" silently fall back to a system
 * font for a few letters. loadFontList() always registers both files for every face.
 *
 * Put the .woff2 files in public/fonts/ (copy them from node_modules/@fontsource/<family>/files/).
 * File names use "{subset}" as the placeholder, e.g. "inter-{subset}-700-normal.woff2".
 *
 * usage:
 *   import { fontsReady, DEFAULT_FONTS, loadFontList } from "./kit/fonts";
 *   // in Root.tsx or the composition: delayRender until fontsReady resolves
 *   const ready = loadFontList([...DEFAULT_FONTS, { family: "Sora", file: "sora-{subset}-{weight}-normal.woff2", weights: ["700"] }]);
 */
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const LATIN_RANGE = "U+0000-00FF, U+0131, U+0152-0153, U+2000-206F, U+20AC, U+20BA, U+2122, U+2190-2193, U+2212";
export const LATIN_EXT_RANGE = "U+0100-0130, U+0132-0151, U+0154-024F, U+1E00-1EFF";

export type FontSpec = {
  /** CSS font-family name used in styles */
  family: string;
  /** file name pattern inside the font folder; "{subset}" and "{weight}" are replaced */
  file: string;
  weights: string[];
  style?: "normal" | "italic";
  /** extra subsets beyond latin + latin-ext, e.g. [{ name: "cyrillic", range: "U+0400-045F" }] */
  extraSubsets?: { name: string; range: string }[];
};

/** Inter for display/body, Instrument Serif italic for the accent word, JetBrains Mono for labels. All OFL-1.1. */
export const DEFAULT_FONTS: FontSpec[] = [
  { family: "Inter", file: "inter-{subset}-{weight}-normal.woff2", weights: ["400", "500", "700", "800", "900"] },
  { family: "InstrumentSerif", file: "instrument-serif-{subset}-{weight}-italic.woff2", weights: ["400"], style: "italic" },
  { family: "InstrumentSerif", file: "instrument-serif-{subset}-{weight}-normal.woff2", weights: ["400"] },
  { family: "JetBrainsMono", file: "jetbrains-mono-{subset}-{weight}-normal.woff2", weights: ["500", "700"] },
];

/** Register every face of every font (both subsets). Resolves when all files are loaded. */
export const loadFontList = (fonts: FontSpec[], folder = "fonts") =>
  Promise.all(
    fonts.flatMap((font) =>
      font.weights.flatMap((weight) => {
        const subsets = [
          { name: "latin", range: LATIN_RANGE },
          { name: "latin-ext", range: LATIN_EXT_RANGE },
          ...(font.extraSubsets ?? []),
        ];
        return subsets.map((subset) =>
          loadFont({
            family: font.family,
            url: staticFile(`${folder}/${font.file.replace("{subset}", subset.name).replace("{weight}", weight)}`),
            weight,
            style: font.style ?? "normal",
            unicodeRange: subset.range,
          }),
        );
      }),
    ),
  );

/** The default font set, loaded once on import. */
export const fontsReady = loadFontList(DEFAULT_FONTS);
