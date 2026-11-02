/*
 * motionforge HyperFrames runtime helpers (used by templates/*; optional for hand-written scenes)
 * © 2026 motionforge contributors, MIT
 *
 * Load after GSAP:
 *   <script src="assets/vendor/gsap.min.js"></script>
 *   <script src="assets/mf-runtime.js"></script>
 *
 * Exposes window.MF:
 *   MF.params()                  -> the JSON object inside <script id="params" type="application/json">
 *   MF.timeline(id, duration)    -> a paused GSAP timeline, registered as window.__timelines[id], padded to `duration`
 *   MF.local(offset)             -> L(v) = v - offset, rounded to 1/100 s (voiceover time -> scene time)
 *   MF.rng(seed)                 -> deterministic random generator: r() in [0,1), r.range(a,b), r.pick(arr)
 *   MF.fit(el, maxPx, minPx, maxHeight) -> shrink an element's font-size until it is at most maxHeight px tall
 *                                   and no word overflows its width (re-run after MF.ready(): fallback fonts measure differently)
 *   MF.ready()                   -> resolves once fonts are loaded; sets window.READY = true
 *
 * Determinism: never read Date.now(), performance.now() or Math.random() in a scene.
 * Everything visible must be a function of the timeline position, so seeking to any t
 * gives the same frame.
 */
(function () {
  "use strict";

  function params() {
    const node = document.getElementById("params");
    if (!node) return {};
    try {
      return JSON.parse(node.textContent);
    } catch (err) {
      throw new Error("motionforge: <script id=\"params\"> is not valid JSON: " + err.message);
    }
  }

  function timeline(id, duration) {
    if (typeof gsap === "undefined") {
      throw new Error("motionforge: GSAP is not loaded. Run scripts/new-scene.sh or copy gsap.min.js into assets/vendor/.");
    }
    const tl = gsap.timeline({ paused: true });
    if (duration > 0) tl.set({}, {}, duration); // pads the timeline so its length equals the composition length
    window.__timelines = window.__timelines || {};
    window.__timelines[id] = tl;
    return tl;
  }

  function local(offset) {
    return function L(v) {
      return Math.round((v - offset) * 100) / 100;
    };
  }

  // Small, fast, seedable PRNG (xorshift32 seeded through a string/number hash).
  function rng(seed) {
    let h = 2166136261 >>> 0;
    const s = String(seed);
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619) >>> 0;
    }
    let x = h || 0x9e3779b9;
    const next = function () {
      x ^= x << 13; x >>>= 0;
      x ^= x >>> 17;
      x ^= x << 5; x >>>= 0;
      return x / 4294967296;
    };
    next.range = (a, b) => a + (b - a) * next();
    next.pick = (arr) => arr[Math.floor(next() * arr.length)];
    return next;
  }

  function fit(el, maxPx, minPx, maxHeight) {
    // The element keeps overflow visible and grows with its text; it fits when it is no taller than
    // maxHeight (default: its clientHeight at the start) and no word sticks out sideways.
    // Width gets a few px of slack: italic and negative letter-spacing overhang by design.
    let size = maxPx;
    el.style.fontSize = size + "px";
    const limit = maxHeight || el.clientHeight;
    while (size > minPx && (el.scrollWidth > el.clientWidth + 6 || el.offsetHeight > limit)) {
      size -= 2;
      el.style.fontSize = size + "px";
    }
    return size;
  }

  function ready() {
    const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
    return fonts.then(function () {
      window.READY = true;
    });
  }

  window.MF = { params, timeline, local, rng, fit, ready };
})();
