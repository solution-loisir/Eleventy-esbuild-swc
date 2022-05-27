// Plugins
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// Shortcodes
const img = require("./_11ty/shortcodes/img");
const codeExample = require("./_11ty/shortcodes/code-example");

// Markdown
const markdownIt = require('markdown-it');

// Config
const configObject = require("./src/_data/config-11ty");

module.exports = function(config) {
  // Passing through
  config.addPassthroughCopy("images");

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
  }).disable("code"));

   // Configuration
  return configObject;
}