/**
 * motionforge Remotion kit — standard backdrop
 * © 2026 motionforge contributors, MIT
 *
 * Two looks:
 *   dark  = charcoal with a soft light from the top, static film grain, vignette
 *   light = off-white paper with a soft centre light, static grain, faint vignette
 * Colours are props so a brand kit can tint them. No grid, no purple gradient by default.
 * The grain is static on purpose: animated noise makes every frame unique and bloats the file.
 */
import React from "react";
import { AbsoluteFill } from "remotion";

const GRAIN_TILE = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='.82' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 1 0'/></filter><rect width='100%' height='100%' filter='url(%23g)'/></svg>")`;

export type BackdropColors = {
  /** flat base colour */
  base: string;
  /** colour of the soft light spot */
  light: string;
  /** colour the edges fall off to */
  edge: string;
  /** optional second light, e.g. a faint brand tint in a lower corner */
  tint?: string;
};

export const DARK_BACKDROP: BackdropColors = { base: "#0E0F11", light: "#2A2C30", edge: "#08090A" };
export const LIGHT_BACKDROP: BackdropColors = { base: "#E9EBEE", light: "#F7F8FA", edge: "#D5D8DD" };

export type BackdropProps = {
  mode?: "light" | "dark";
  /** override the colours of the chosen mode */
  colors?: Partial<BackdropColors>;
  /** grain strength, 0 = none (default 0.08 dark / 0.12 light) */
  grain?: number;
  /** vignette strength 0..1 (default 0.55 dark / 0.10 light) */
  vignette?: number;
};

export const Backdrop: React.FC<BackdropProps> = ({ mode = "dark", colors, grain, vignette }) => {
  const light = mode === "light";
  const c = { ...(light ? LIGHT_BACKDROP : DARK_BACKDROP), ...colors };
  const grainOpacity = grain ?? (light ? 0.12 : 0.08);
  const vignetteAlpha = vignette ?? (light ? 0.1 : 0.55);
  const lightSpot = light
    ? `radial-gradient(1200px 900px at 50% 30%, ${c.light} 0%, ${c.base} 55%, ${c.edge} 100%)`
    : `radial-gradient(1100px 900px at 50% 18%, ${c.light} 0%, ${c.base} 50%, ${c.edge} 100%)`;
  const tint = c.tint ? `, radial-gradient(900px 700px at 85% 100%, ${c.tint} 0%, transparent 60%)` : "";

  return (
    <AbsoluteFill style={{ background: c.base }}>
      <AbsoluteFill style={{ background: lightSpot + tint }} />
      {grainOpacity > 0 ? (
        <AbsoluteFill style={{ backgroundImage: GRAIN_TILE, opacity: grainOpacity, mixBlendMode: light ? "multiply" : "screen" }} />
      ) : null}
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(0,0,0,${vignetteAlpha}) 100%)` }} />
    </AbsoluteFill>
  );
};
