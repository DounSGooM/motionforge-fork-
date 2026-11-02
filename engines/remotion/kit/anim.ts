/**
 * motionforge Remotion kit — animation helpers
 * © 2026 motionforge contributors, MIT
 *
 * All helpers take absolute seconds `t` (frame / fps), so scenes can be written against
 * voiceover word times directly. Call setAnimFps(fps) once if your composition is not 30 fps.
 *
 *   pop(t, at)            spring progress 0 -> 1 (may overshoot) starting at second `at`
 *   ramp(t, at, dur)      eased 0 -> 1 over `dur` seconds
 *   enter(t, at, opts)    style: fade + rise + blur-in (fake motion blur), optional exit at `out`
 *   flyIn(t, at, dx, dy)  style: logo fly-in with directional stretch + blur while moving
 *   within(t, a, b)       is t inside [a, b)?
 */
import { Easing, interpolate, spring } from "remotion";

let FPS = 30;

/** Set the frame rate the spring helpers use (default 30). */
export const setAnimFps = (fps: number) => {
  FPS = fps;
};

/** Spring progress (0 -> 1, may overshoot) starting at absolute second `at`. */
export const pop = (t: number, at: number, stiffness = 190, damping = 15, mass = 0.9) =>
  t < at ? 0 : spring({ frame: (t - at) * FPS, fps: FPS, config: { stiffness, damping, mass } });

/** Eased progress 0 -> 1 over `dur` seconds starting at `at`. */
export const ramp = (t: number, at: number, dur = 0.3, easing: (x: number) => number = Easing.out(Easing.cubic)) =>
  interpolate(t, [at, at + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });

export type EnterOptions = {
  /** start offset in px, moved to 0 by the spring */
  y?: number;
  x?: number;
  /** blur in px at the first frame (fake motion blur) */
  blur?: number;
  /** start scale */
  scale?: number;
  /** absolute second where a quick exit fade starts */
  out?: number;
};

/** Entrance style: fade + rise + blur-in, with an optional exit. Spread into `style`. */
export const enter = (t: number, at: number, opts: EnterOptions = {}) => {
  const { y = 40, x = 0, blur = 14, scale = 0.86, out } = opts;
  const p = pop(t, at);
  const lin = ramp(t, at, 0.22);
  const exit = out !== undefined ? 1 - ramp(t, out, 0.18) : 1;
  return {
    opacity: Math.min(1, lin) * exit,
    transform: `translate(${(1 - p) * x}px, ${(1 - p) * y}px) scale(${scale + (1 - scale) * p})`,
    filter: `blur(${Math.max(0, (1 - lin) * blur)}px)`,
  } as const;
};

/** Logo fly-in from (fromX, fromY) px with a horizontal stretch + blur while it moves. */
export const flyIn = (t: number, at: number, fromX: number, fromY: number) => {
  const p = pop(t, at, 220, 17);
  const speed = Math.max(0, 1 - ramp(t, at, 0.28, Easing.out(Easing.quad)));
  return {
    opacity: ramp(t, at, 0.12),
    transform: `translate(${(1 - p) * fromX}px, ${(1 - p) * fromY}px) scale(${0.6 + 0.4 * p}) scaleX(${1 + speed * 0.35})`,
    filter: `blur(${speed * 16}px)`,
  } as const;
};

/** Is absolute second t inside [a, b)? */
export const within = (t: number, a: number, b: number) => t >= a && t < b;

/** Smooth number counter from `from` to `to` between seconds a and b. */
export const count = (t: number, a: number, b: number, from: number, to: number) =>
  interpolate(t, [a, b], [from, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
