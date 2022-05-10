// Plugins
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// Shortcodes
const img = require("./shortcodes/img");
const test = require("./shortcodes/test");

// Markdown
const markdownIt = require('markdown-it');

// Config
const { configObject } = require("./src/_data/site");

module.exports = function(config) {
  // Passing through
  config.addPassthroughCopy("images");

  // Plugins
  config.addPlugin(EleventyRenderPlugin);
  config.addPlugin(syntaxHighlight, {
    codeAttributes: {
      contenteditable: "true"
    }
  });

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
  return configObject;
}