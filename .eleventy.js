// Plugins
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// Shortcodes
const img = require("./shortcodes/img");
const test = require("./shortcodes/test");

// Markdown
const markdownIt = require('markdown-it');

module.exports = function(config) {
  // Passing through
  config.addPassthroughCopy("images");

  // Plugins
  config.addPlugin(EleventyRenderPlugin);
  config.addPlugin(syntaxHighlight);

  // Shortcodes
  config.addAsyncShortcode("img", img);
  config.addAsyncShortcode("test", test);

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
    templateFormats: ["njk", "md", "html"]
  }
}