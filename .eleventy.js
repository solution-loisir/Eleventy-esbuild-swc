// Plugins
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// Shortcodes
const img = require("./_11ty/shortcodes/img");
const codeExample = require("./_11ty/shortcodes/code-example");

// Markdown
const markdownIt = require('markdown-it');
const markdownItEleventyImg = require("./markdown-it/markdown-it-eleventy-img")

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
    widths: [800, 500, 300],
    lazy: false
  })
  .disable("code"));

   // Configuration
  return configObject;
}