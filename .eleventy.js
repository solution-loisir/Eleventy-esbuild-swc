// Plugins
const { EleventyRenderPlugin } = require("@11ty/eleventy");
// Shortcodes
const img = require("./shortcodes/img");
// Markdown
const markdownIt = require('markdown-it');

module.exports = function(config) {
  // Plugins
  config.addPlugin(EleventyRenderPlugin);

  // Shortcodes
  config.addAsyncShortcode("img", img);

  // Libraries
  config.setLibrary('md', markdownIt ({
    html: true,
    breaks: true,
    linkify: true
  }).disable("code"));

   // Configuration
  return {
    dir: {
        input: "src",
        output: "_site"
    },
    pathPrefix: "/",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["njk", "md"]
  }
}