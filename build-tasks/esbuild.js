const esbuild = require("esbuild");

const entryPoints = ["assets/js/index.js"];
const outdir = "_site/js";

const isProd = process.env.ELEVENTY_ENV === "prod";

esbuild.build({
  entryPoints,
  bundle: true,
  format: "esm",
  target: "es2015",
  splitting: true,
  watch: !isProd,
  minify: isProd,
  outdir
}).catch(() => process.exit(1));

if(isProd) {
  esbuild.build({
    entryPoints,
    bundle: true,
    format: "iife"
    // Writes to stdout.
  }).catch(() => process.exit(1));
}

