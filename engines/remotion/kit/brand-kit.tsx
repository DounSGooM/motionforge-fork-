/**
 * motionforge Remotion kit — brand kit components
 * © 2026 motionforge contributors, MIT
 *
 * Every brand value (colours, fonts, logo files, handle, site, CTA wording) comes from a
 * BrandTheme passed through <BrandProvider>. Nothing here is tied to a real brand.
 *
 *   <BrandProvider theme={myTheme}>
 *     <Backdrop mode="dark" colors={{ tint: myTheme.colors.accent + "22" }} />
 *     <Watermark />
 *     <Title t={t} at={0.2} top={300}>Save <GradientText>this</GradientText></Title>
 *     <Captions t={t} chunks={buildChunks(segments, words)} />
 *     <Outro t={t} at={52} end={55} total={58} />
 *     <SfxTrack list={[sfx("whoosh", 0.2)]} fps={30} />
 *   </BrandProvider>
 *
 * Exports: BrandTheme, EXAMPLE_THEME, BrandProvider, useBrand, wordTimer, buildChunks, Captions,
 * Watermark, Eyebrow, Title, Wd, GradientText, Card, LogoTile, Browser, Phone,
 * SaveIcon, SendIcon, HeartIcon, Outro, sfx, SfxTrack.
 */
import React, { createContext, useContext } from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { enter, pop, ramp } from "./anim";

/* ------------------------------------------------------------------ theme */

export type BrandTheme = {
  name: string;
  colors: {
    bg: string; // main dark background
    surface: string; // cards
    line: string; // card borders
    text: string; // main text on bg
    muted: string; // secondary text on bg
    accent: string; // the accent colour (active caption word, highlights)
    accent2?: string; // optional gradient end
    captionBg: string; // pill behind captions
  };
  fonts: { display: string; body: string; mono: string };
  /** files under public/ (paths for staticFile) */
  logo?: {
    mark?: string; // square icon, used by Watermark and the outro site line
    full?: string; // full logo for the outro
    social?: string; // social network icon shown next to the handle
  };
  handle?: string; // "@example"
  site?: string; // "example.com"
  tagline?: string;
  cta?: { title: React.ReactNode; save: string; send: string; sendHint?: string };
  /** language of the copy, used for case-insensitive word matching (e.g. "tr", "en", "de") */
  locale?: string;
};

/** A fictional brand for examples and tests. Replace with your own brand.json values. */
export const EXAMPLE_THEME: BrandTheme = {
  name: "Example Studio",
  colors: {
    bg: "#0B0F14",
    surface: "rgba(20,26,34,.92)",
    line: "#243041",
    text: "#FFFFFF",
    muted: "#9AA6B8",
    accent: "#3BD6C6",
    accent2: "#2F7BFF",
    captionBg: "rgba(8,11,16,.74)",
  },
  fonts: { display: "Inter, sans-serif", body: "Inter, sans-serif", mono: "JetBrainsMono, monospace" },
  handle: "@examplestudio",
  site: "example.com",
  tagline: "MAKING HARD THINGS CLEAR",
  cta: { title: "Save this", save: "Save", send: "Send", sendHint: "Send it to someone who needs it." },
  locale: "en",
};

const BrandContext = createContext<BrandTheme>(EXAMPLE_THEME);
export const BrandProvider: React.FC<{ theme: BrandTheme; children: React.ReactNode }> = ({ theme, children }) => (
  <BrandContext.Provider value={theme}>{children}</BrandContext.Provider>
);
export const useBrand = () => useContext(BrandContext);

const abs: React.CSSProperties = { position: "absolute" };
const centerRow: React.CSSProperties = { ...abs, left: 0, right: 0, display: "flex", justifyContent: "center" };
const gradientOf = (b: BrandTheme) => `linear-gradient(135deg, ${b.colors.accent} 0%, ${b.colors.accent2 ?? b.colors.accent} 100%)`;

/* ------------------------------------------------------------------ word timing */

export type Word = { w: string; s: number; e: number };
export type Segment = { start: number; end: number; text: string };

/**
 * Normalise a word for matching: strip leading quotes/brackets, lowercase with the copy's
 * locale, then fold dotted/dotless i so "AVIF" (-> "avıf" under Turkish rules) still matches "avif".
 */
export const normalizeWord = (word: string, locale = "en") =>
  word
    .replace(/^["“”'‘’(«]+/, "")
    .toLocaleLowerCase(locale)
    .replace(/ı/g, "i")
    .replace(/i\u0307/g, "i"); // "İ".toLowerCase() outside Turkish gives i + combining dot (U+0307)

/**
 * Returns at(prefix, after?) -> start second of the first word at/after `after` that starts
 * with `prefix`. Throws when nothing matches, so a changed voiceover fails loudly instead of
 * silently drifting.
 */
export const wordTimer = (words: Word[], locale = "en") => (prefix: string, after = 0) => {
  const want = normalizeWord(prefix, locale);
  const hit = words.find((x) => x.s >= after - 0.01 && normalizeWord(x.w, locale).startsWith(want));
  if (!hit) throw new Error(`wordTimer: no word starting with "${prefix}" after ${after}s`);
  return hit.s;
};

/* ------------------------------------------------------------------ captions */

export type CaptionChunk = { s: number; e: number; words: Word[] };

/**
 * Group words into short caption chunks (default ≤ 4 words) that never cross a segment
 * (sentence/pause) boundary. Each chunk stays up until the next starts, but at most `hold` s.
 */
export const buildChunks = (segments: Segment[], words: Word[], maxWords = 4, hold = 0.5): CaptionChunk[] => {
  const out: CaptionChunk[] = [];
  for (const seg of segments) {
    const inside = words.filter((x) => x.s >= seg.start - 0.01 && x.s < seg.end);
    for (let i = 0; i < inside.length; i += maxWords) {
      const part = inside.slice(i, i + maxWords);
      out.push({ s: part[0].s, e: part[part.length - 1].e, words: part });
    }
  }
  return out.map((c, i) => ({ ...c, e: Math.min(out[i + 1]?.s ?? c.e + hold, c.e + hold) }));
};

/** Bottom captions; the word being spoken is in the accent colour, upcoming words are dimmed. */
export const Captions: React.FC<{ t: number; chunks: CaptionChunk[]; until?: number; top?: number; size?: number }> = ({
  t,
  chunks,
  until = Infinity,
  top = 1590,
  size = 50,
}) => {
  const b = useBrand();
  if (t >= until) return null;
  const chunk = chunks.find((x) => t >= x.s && t < x.e);
  if (!chunk) return null;
  const current = chunk.words.filter((y) => t >= y.s).length - 1;
  const p = pop(t, chunk.s, 320, 20);
  return (
    <div style={{ ...abs, top, left: 60, right: 60, textAlign: "center", transform: `scale(${0.9 + 0.1 * p})`, opacity: Math.min(1, p * 2) }}>
      <span style={{ display: "inline-block", padding: "12px 26px", borderRadius: 22, background: b.colors.captionBg }}>
        {chunk.words.map((x, i) => (
          <span
            key={i}
            style={{
              fontFamily: b.fonts.display,
              fontWeight: 700,
              fontSize: size,
              letterSpacing: "-0.02em",
              color: i === current ? b.colors.accent : t >= x.s ? b.colors.text : "rgba(255,255,255,.45)",
              marginRight: i < chunk.words.length - 1 ? 14 : 0,
            }}
          >
            {x.w.replace(/["“”]/g, "")}
          </span>
        ))}
      </span>
    </div>
  );
};

/* ------------------------------------------------------------------ type + surfaces */

/** Semi-transparent brand mark in the top-right corner for the whole video. */
export const Watermark: React.FC<{ size?: number; opacity?: number }> = ({ size = 64, opacity = 0.42 }) => {
  const b = useBrand();
  if (!b.logo?.mark) return null;
  return <Img src={staticFile(b.logo.mark)} style={{ ...abs, top: 70, right: 56, width: size, height: size, objectFit: "contain", opacity }} />;
};

/** Text filled with the accent gradient. */
export const GradientText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const b = useBrand();
  return (
    <span style={{ background: gradientOf(b), WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", WebkitTextFillColor: "transparent", paddingRight: 4 }}>
      {children}
    </span>
  );
};

/** Small mono uppercase label above a title. */
export const Eyebrow: React.FC<{ t: number; at: number; top: number; out?: number; color?: string; children: React.ReactNode }> = ({ t, at, top, out, color, children }) => {
  const b = useBrand();
  if (t < at) return null;
  return (
    <div
      style={{
        ...abs, top, left: 0, right: 0, textAlign: "center", fontFamily: b.fonts.mono, fontWeight: 500, fontSize: 30,
        letterSpacing: "0.18em", textTransform: "uppercase", color: color ?? b.colors.accent, ...enter(t, at, { y: 20, out }),
      }}
    >
      {children}
    </div>
  );
};

/** Big display heading. */
export const Title: React.FC<{ t: number; at: number; top: number; out?: number; size?: number; color?: string; children: React.ReactNode }> = ({
  t, at, top, out, size = 92, color, children,
}) => {
  const b = useBrand();
  if (t < at) return null;
  return (
    <div
      style={{
        ...abs, top, left: 60, right: 60, textAlign: "center", fontFamily: b.fonts.display, fontWeight: 800, fontSize: size,
        lineHeight: 1.08, letterSpacing: "-0.035em", color: color ?? b.colors.text, ...enter(t, at, { y: 50, out }),
      }}
    >
      {children}
    </div>
  );
};

/** Inline word that pops in at `at` (use inside Title for word-by-word reveals). */
export const Wd: React.FC<{ t: number; at: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ t, at, style, children }) => (
  <span style={{ display: "inline-block", ...enter(t, at, { y: 40 }), ...style }}>{children}</span>
);

/** Glass card in the brand surface colour. */
export const Card: React.FC<{ style?: React.CSSProperties; children: React.ReactNode }> = ({ style, children }) => {
  const b = useBrand();
  return (
    <div style={{ borderRadius: 34, background: b.colors.surface, border: `2px solid ${b.colors.line}`, boxShadow: "0 30px 80px rgba(0,0,0,.4)", ...style }}>
      {children}
    </div>
  );
};

/** A real logo file on a rounded app tile, with an optional label. */
export const LogoTile: React.FC<{ src: string; size?: number; pad?: number; bg?: string; label?: string; style?: React.CSSProperties }> = ({
  src, size = 170, pad = 0.2, bg = "#fff", label, style,
}) => {
  const b = useBrand();
  const inner = size * (1 - pad * 2);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, ...style }}>
      <div style={{ width: size, height: size, borderRadius: size * 0.24, background: bg, boxShadow: "0 20px 50px rgba(0,0,0,.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile(src)} style={{ width: inner, height: inner, objectFit: "contain" }} />
      </div>
      {label ? <div style={{ fontFamily: b.fonts.display, fontWeight: 700, fontSize: size * 0.17, color: b.colors.text, letterSpacing: "-0.02em" }}>{label}</div> : null}
    </div>
  );
};

/* ------------------------------------------------------------------ device frames */

/**
 * Browser window: traffic lights, optional browser icon (pass a real logo file you are allowed
 * to use), URL bar. Put a real screenshot inside as children.
 */
export const Browser: React.FC<{ url: React.ReactNode; width: number; icon?: string; dark?: boolean; style?: React.CSSProperties; children: React.ReactNode }> = ({
  url, width, icon, dark, style, children,
}) => {
  const b = useBrand();
  return (
    <div style={{ width, borderRadius: 28, overflow: "hidden", background: dark ? "#1E1F22" : "#fff", boxShadow: "0 40px 100px rgba(0,0,0,.5)", border: `2px solid ${dark ? "#2C2E33" : "#DADCE0"}`, ...style }}>
      <div style={{ height: 92, display: "flex", alignItems: "center", gap: 16, padding: "0 24px", background: dark ? "#2A2B2F" : "#F1F3F4" }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <div key={c} style={{ width: 18, height: 18, borderRadius: 9, background: c }} />
        ))}
        {icon ? <Img src={staticFile(icon)} style={{ width: 36, height: 36, marginLeft: 8 }} /> : null}
        <div
          style={{
            flex: 1, height: 54, borderRadius: 27, background: dark ? "#3A3B40" : "#fff", border: `2px solid ${dark ? "#4A4B50" : "#E3E5E8"}`,
            display: "flex", alignItems: "center", gap: 12, padding: "0 24px", fontFamily: b.fonts.body, fontWeight: 500, fontSize: 28,
            color: dark ? "#E8EAED" : "#202124", whiteSpace: "nowrap", overflow: "hidden",
          }}
        >
          <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke={dark ? "#9AA0A6" : "#5F6368"} strokeWidth={2.4}>
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          {url}
        </div>
      </div>
      {children}
    </div>
  );
};

/** Generic modern phone frame with a pill-shaped camera cut-out. */
export const Phone: React.FC<{ width: number; height: number; bg?: string; style?: React.CSSProperties; children: React.ReactNode }> = ({ width, height, bg = "#fff", style, children }) => (
  <div style={{ width, height, borderRadius: 72, background: "#0B0B0D", padding: 14, boxShadow: "0 50px 120px rgba(0,0,0,.6), inset 0 0 0 2px #2A2C33", ...style }}>
    <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 60, overflow: "hidden", background: bg }}>
      <div style={{ ...abs, top: 16, left: "50%", width: 150, height: 40, marginLeft: -75, borderRadius: 20, background: "#0B0B0D", zIndex: 20 }} />
      {children}
    </div>
  </div>
);

/* ------------------------------------------------------------------ icons (drawn, no third-party marks) */

export const SaveIcon: React.FC<{ size: number; filled?: boolean; color?: string }> = ({ size, filled, color = "#fff" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" fill={filled ? color : "none"} stroke={color} strokeWidth={2} strokeLinejoin="round" />
  </svg>
);
export const SendIcon: React.FC<{ size: number; color?: string }> = ({ size, color = "#fff" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round">
    <path d="M22 3L9.2 10.1M22 3l-6.5 18-3.3-7.7L4 10.5z" />
  </svg>
);
export const HeartIcon: React.FC<{ size: number; filled?: boolean; color?: string }> = ({ size, filled, color = "#fff" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path
      d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.2 5.3 3.1 1.7-1.9 3.2-3.1 5.3-3.1 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"
      fill={filled ? color : "none"} stroke={color} strokeWidth={2} strokeLinejoin="round"
    />
  </svg>
);

/* ------------------------------------------------------------------ outro */

/**
 * From `at`: CTA card (save + send, with the save icon filling in). From `end` (the end of the
 * voiceover): logo end card with tagline, handle and site. Fades out over the last 0.3 s of `total`.
 * Render your own Backdrop underneath (or pass `backdrop`).
 */
export const Outro: React.FC<{ t: number; at: number; end: number; total: number; backdrop?: React.ReactNode }> = ({ t, at, end, total, backdrop }) => {
  const b = useBrand();
  if (t < at) return null;
  const endCard = t >= end;
  const fade = 1 - ramp(t, total - 0.3, 0.3);
  const saved = t >= at + 0.6;
  const cta = b.cta ?? EXAMPLE_THEME.cta!;
  const label: React.CSSProperties = { fontFamily: b.fonts.display, fontWeight: 700, fontSize: 44, color: b.colors.text };
  const line: React.CSSProperties = { fontFamily: b.fonts.display, fontWeight: 700, fontSize: 54, color: b.colors.text };

  return (
    <AbsoluteFill style={{ opacity: fade, background: backdrop ? undefined : b.colors.bg }}>
      {backdrop}
      {!endCard ? (
        <>
          <Title t={t} at={at} top={330} size={96}>
            {cta.title}
          </Title>
          <div style={{ ...centerRow, top: 560, gap: 90, alignItems: "flex-end" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, ...enter(t, at + 0.1, { y: 60 }) }}>
              <div style={{ transform: `scale(${saved ? 0.8 + 0.2 * pop(t, at + 0.6, 280, 11) : 1})` }}>
                <SaveIcon size={210} filled={saved} color={b.colors.text} />
              </div>
              <div style={label}>{cta.save}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, ...enter(t, at + 1.2, { y: 60 }) }}>
              <div style={{ transform: `translate(${ramp(t, at + 1.8, 0.5) * 30}px, ${-ramp(t, at + 1.8, 0.5) * 30}px)` }}>
                <SendIcon size={210} color={b.colors.text} />
              </div>
              <div style={label}>{cta.send}</div>
            </div>
          </div>
          {cta.sendHint ? (
            <div style={{ ...abs, top: 960, left: 80, right: 80, textAlign: "center", fontFamily: b.fonts.display, fontWeight: 600, fontSize: 52, lineHeight: 1.3, color: b.colors.muted, ...enter(t, at + 1.4, { y: 30 }) }}>
              {cta.sendHint}
            </div>
          ) : null}
        </>
      ) : (
        <>
          {b.logo?.full ? (
            <div style={{ ...centerRow, top: 640, ...enter(t, end, { y: 40, scale: 0.8 }) }}>
              <Img src={staticFile(b.logo.full)} style={{ width: 640, maxHeight: 220, objectFit: "contain" }} />
            </div>
          ) : (
            <div style={{ ...abs, top: 660, left: 0, right: 0, textAlign: "center", fontFamily: b.fonts.display, fontWeight: 800, fontSize: 110, letterSpacing: "-0.04em", color: b.colors.text, ...enter(t, end, { y: 40, scale: 0.8 }) }}>
              {b.name}
            </div>
          )}
          {b.tagline ? (
            <div style={{ ...abs, top: 900, left: 0, right: 0, textAlign: "center", fontFamily: b.fonts.mono, fontSize: 30, letterSpacing: "0.18em", color: b.colors.muted, ...enter(t, end + 0.3, { y: 20 }) }}>
              {b.tagline}
            </div>
          ) : null}
          {b.handle ? (
            <div style={{ ...centerRow, top: 1030, gap: 26, alignItems: "center", ...enter(t, end + 0.5, { y: 30 }) }}>
              {b.logo?.social ? <Img src={staticFile(b.logo.social)} style={{ width: 70, height: 70 }} /> : null}
              <div style={line}>{b.handle}</div>
            </div>
          ) : null}
          {b.site ? (
            <div style={{ ...centerRow, top: 1140, gap: 22, alignItems: "center", ...enter(t, end + 0.7, { y: 30 }) }}>
              {b.logo?.mark ? <Img src={staticFile(b.logo.mark)} style={{ width: 54, height: 54, objectFit: "contain" }} /> : null}
              <div style={line}>{b.site}</div>
            </div>
          ) : null}
        </>
      )}
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ sound effects */

export type SfxCue = { name: string; at: number; volume: number };

/** A sound effect at absolute second `at`, kept well under the voiceover (default volume 0.16). */
export const sfx = (name: string, at: number, volume = 0.16): SfxCue => ({ name, at, volume });

/**
 * Places every cue on the timeline. `resolve` maps a cue name to a public/ path
 * (default "audio/sfx/<name>.wav"). Use only sounds you have the rights to.
 */
export const SfxTrack: React.FC<{ list: SfxCue[]; fps: number; resolve?: (name: string) => string; maxSeconds?: number }> = ({
  list, fps, resolve = (name) => `audio/sfx/${name}.wav`, maxSeconds = 2,
}) => (
  <>
    {list.map((cue, i) => (
      <Sequence key={i} from={Math.round(cue.at * fps)} durationInFrames={Math.round(maxSeconds * fps)}>
        <Audio src={staticFile(resolve(cue.name))} volume={cue.volume} />
      </Sequence>
    ))}
  </>
);
