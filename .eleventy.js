const path = require("path");

// Plugins
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// Shortcodes
const img = require("./_11ty/shortcodes/img");
const codeExample = require("./_11ty/shortcodes/code-example");

// Markdown
const markdownIt = require('markdown-it');
const markdownItEleventyImg = require("./markdown-it/markdown-it-eleventy-img");

// Config
const configObject = require("./src/_data/config-11ty");

module.exports = function(config) {
  // Passing through
  config.addPassthroughCopy({ "assets/images": "images" });

  // Plugins
  config.addPlugin(EleventyRenderPlugin);
  config.addPlugin(syntaxHighlight);

  // Shortcodes
  config.addAsyncShortcode("img", img);
  config.addShortcode("codeExample", codeExample);

  // Libraries
  config.setLibrary('md', markdownIt ({
    html: true,
    breaks: true,
    linkify: true
  })
  .use(markdownItEleventyImg, {
    options: {
      widths: [800, 500, 300],
      urlPath: "/images/",
      outputDir: path.join("_site", "images"),
      formats: ["avif", "webp", "jpeg"]
    },
    attributes: {
      class: "image markdown-image",
      decoding: "async",
      sizes: "100vw"
    }
  })
  .disable("code"));

   // Configuration
  return configObject;
}