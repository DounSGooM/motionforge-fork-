/*
 * motionforge canvas lib — deterministic helpers for frame = f(t) pages
 * © 2026 motionforge contributors, MIT
 *
 * ES module. Import from a canvas page:
 *   import { rng, ease, spring, keys, clamp, lerp, span } from "./lib.js";
 *
 * Nothing in here reads the clock. Every function is pure: same input, same output.
 *
 * Contents
 *   math      clamp, lerp, invLerp, span, remap, TAU
 *   random    seedOf(...parts), rng(...parts) -> { next, float, int, pick, sign, gauss }, noise1(x, seed)
 *   easing    ease.linear / inQuad / outQuad / inOutQuad / inCubic / outCubic / inOutCubic /
 *             outQuart / inOutSine / outExpo / outBack(s) / outElastic / steps(n)
 *   spring    spring(t, { stiffness, damping, mass }) closed-form 0 -> 1 ; SPRINGS presets
 *   keys      keys(t, [[t0, v0, easing?], [t1, v1, easing?], ...]) piecewise keyframes (numbers or arrays)
 *   envelope  pulse(t, start, end, fadeIn, fadeOut) 0 -> 1 -> 0
 */

/* ------------------------------------------------------------------ math */

export const TAU = Math.PI * 2;
export const clamp = (x, lo = 0, hi = 1) => (x < lo ? lo : x > hi ? hi : x);
export const lerp = (a, b, u) => a + (b - a) * u;
export const invLerp = (a, b, x) => (a === b ? 0 : (x - a) / (b - a));
/** progress 0 -> 1 of t through the window [start, end], clamped */
export const span = (t, start, end) => clamp(invLerp(start, end, t));
/** map x from [a0, a1] to [b0, b1], clamped */
export const remap = (x, a0, a1, b0, b1) => lerp(b0, b1, span(x, a0, a1));

/* ------------------------------------------------------------------ random */

/** 32-bit seed from any mix of strings and numbers (FNV-1a over their text form). */
export function seedOf(...parts) {
  let h = 0x811c9dc5;
  for (const part of parts) {
    const text = String(part) + "␟"; // separator so ("ab","c") != ("a","bc")
    for (let i = 0; i < text.length; i++) {
      h ^= text.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
  }
  return h >>> 0;
}

/**
 * Seeded generator (SplitMix32 step). Seed it with what the value belongs to, e.g.
 * rng("star", i) — then adding a new star never changes the old ones.
 */
export function rng(...parts) {
  let state = seedOf(...parts);
  const next = () => {
    state = (state + 0x9e3779b9) >>> 0;
    let z = state;
    z = Math.imul(z ^ (z >>> 16), 0x21f0aaad) >>> 0;
    z = Math.imul(z ^ (z >>> 15), 0x735a2d97) >>> 0;
    z = (z ^ (z >>> 15)) >>> 0;
    return z / 4294967296;
  };
  return {
    next,
    float: (lo = 0, hi = 1) => lo + (hi - lo) * next(),
    int: (lo, hi) => lo + Math.floor(next() * (hi - lo + 1)),
    pick: (list) => list[Math.floor(next() * list.length)],
    sign: () => (next() < 0.5 ? -1 : 1),
    gauss: (mean = 0, sd = 1) => {
      const u = Math.max(next(), 1e-12);
      const v = next();
      return mean + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v);
    },
  };
}

/** Smooth 1D value noise in [0, 1]. Same x and seed, same value. */
export function noise1(x, seed = 0) {
  const i = Math.floor(x);
  const f = x - i;
  const a = rng(seed, i).next();
  const b = rng(seed, i + 1).next();
  const u = f * f * (3 - 2 * f);
  return lerp(a, b, u);
}

/* ------------------------------------------------------------------ easing (input clamped to 0..1) */

const c = (u) => clamp(u);
export const ease = {
  linear: (u) => c(u),
  inQuad: (u) => c(u) ** 2,
  outQuad: (u) => 1 - (1 - c(u)) ** 2,
  inOutQuad: (u) => ((u = c(u)) < 0.5 ? 2 * u * u : 1 - (-2 * u + 2) ** 2 / 2),
  inCubic: (u) => c(u) ** 3,
  outCubic: (u) => 1 - (1 - c(u)) ** 3,
  inOutCubic: (u) => ((u = c(u)) < 0.5 ? 4 * u ** 3 : 1 - (-2 * u + 2) ** 3 / 2),
  outQuart: (u) => 1 - (1 - c(u)) ** 4,
  inOutSine: (u) => -(Math.cos(Math.PI * c(u)) - 1) / 2,
  outExpo: (u) => ((u = c(u)) === 1 ? 1 : 1 - 2 ** (-10 * u)),
  /** overshoots by about 10 % with the default strength */
  outBack: (u, strength = 1.70158) => {
    u = c(u) - 1;
    return 1 + (strength + 1) * u ** 3 + strength * u ** 2;
  },
  outElastic: (u) => {
    u = c(u);
    if (u === 0 || u === 1) return u;
    return 2 ** (-10 * u) * Math.sin((u * 10 - 0.75) * (TAU / 3)) + 1;
  },
  /** hold-frame look ("on twos", stop-motion): quantise progress into n steps */
  steps: (n) => (u) => Math.floor(c(u) * n) / n,
};

/* ------------------------------------------------------------------ spring */

/** Presets in the same units as most UI spring APIs (mass 1). */
export const SPRINGS = {
  ui: { stiffness: 340, damping: 30 }, // buttons, toggles: quick, barely overshoots
  card: { stiffness: 180, damping: 24 }, // panels, cards, camera moves
  heavy: { stiffness: 95, damping: 18 }, // big type, logos
  bouncy: { stiffness: 260, damping: 12 }, // stickers, playful pops
};

/**
 * Closed-form damped spring from 0 to 1, t in seconds since the move started.
 * No state: any frame can be computed on its own, in any order.
 */
export function spring(t, { stiffness = 180, damping = 24, mass = 1 } = {}) {
  if (t <= 0) return 0;
  const omega = Math.sqrt(stiffness / mass); // natural frequency
  const zeta = damping / (2 * Math.sqrt(stiffness * mass)); // damping ratio
  if (zeta < 1) {
    const wd = omega * Math.sqrt(1 - zeta * zeta);
    const decay = Math.exp(-zeta * omega * t);
    return 1 - decay * (Math.cos(wd * t) + ((zeta * omega) / wd) * Math.sin(wd * t));
  }
  if (zeta === 1) return 1 - Math.exp(-omega * t) * (1 + omega * t);
  // over-damped
  const r1 = -omega * (zeta - Math.sqrt(zeta * zeta - 1));
  const r2 = -omega * (zeta + Math.sqrt(zeta * zeta - 1));
  const k2 = r1 / (r1 - r2);
  const k1 = 1 - k2;
  return 1 - (k1 * Math.exp(r1 * t) + k2 * Math.exp(r2 * t));
}

/** A value that springs to a new target at each [time, value] change; changes add up, so it stays continuous. */
export function springTo(t, changes, preset = SPRINGS.card) {
  let v = changes[0][1];
  for (let i = 1; i < changes.length; i++) {
    v += (changes[i][1] - changes[i - 1][1]) * spring(t - changes[i][0], preset);
  }
  return v;
}

/* ------------------------------------------------------------------ keyframes */

/**
 * Piecewise keyframes. list = [[time, value, easing?], ...] sorted by time.
 * The easing on a key shapes the segment that ENDS at that key (default inOutCubic).
 * Values may be numbers or equal-length arrays (positions, colours).
 *   const x = keys(t, [[0, -200], [0.6, 0, ease.outBack], [3, 0], [3.4, 1300, ease.inCubic]]);
 */
export function keys(t, list) {
  if (t <= list[0][0]) return list[0][1];
  const last = list[list.length - 1];
  if (t >= last[0]) return last[1];
  let i = 1;
  while (t > list[i][0]) i++;
  const [t0, v0] = list[i - 1];
  const [t1, v1, shape = ease.inOutCubic] = list[i];
  const u = shape((t - t0) / (t1 - t0));
  return Array.isArray(v0) ? v0.map((a, j) => lerp(a, v1[j], u)) : lerp(v0, v1, u);
}

/* ------------------------------------------------------------------ envelope */

/** 0 -> 1 -> 0 over [start, end] with linear fades of the given lengths. */
export const pulse = (t, start, end, fadeIn = 0.3, fadeOut = 0.3) =>
  Math.min(span(t, start, start + fadeIn), 1 - span(t, end - fadeOut, end));
