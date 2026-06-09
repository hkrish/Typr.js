// ESM entry for the vendored Typr.js fork.
//
// Typr ships as classic scripts that declare a global `var Typr`. Importing them
// as ES modules would scope that binding to the module and export nothing, so the
// three sources are concatenated inside one function body (a shared scope) and
// the resulting `Typr` object is returned as a proper default export. `window` is
// passed in because Typr.U references browser globals — DOMParser (for SVG-table
// glyphs) and window["UPNG"] (only inside the unused pathToContext renderer; the
// fork drops the UPNG gate on the glyphToPath bitmap path) — both reached only
// at call time, so a non-browser host can still parse fonts and extract outlines.
//
// The `?raw` / `?url` import suffixes are resolved by the bundler (Vite, which
// scenery uses for builds, demos, and vitest): the sources are inlined and
// hb.wasm becomes a served asset URL. The fork's initHB() loads that URL by
// default, so a caller does `Typr.U.initHB(callback)` with no argument.

import typrSrc from "./src/Typr.js?raw";
import typrUSrc from "./src/Typr.U.js?raw";
import typrSvgSrc from "./src/Typr.U.SVG.js?raw";
import hbUrl from "./src/hb.wasm?url";

const factory = new Function("window", `${typrSrc}\n${typrUSrc}\n${typrSvgSrc}\nreturn Typr;`);
const Typr = factory(globalThis);
Typr.U.hbUrl = hbUrl;

export default Typr;
