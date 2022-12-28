const path = require("path");

// Plugins
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginWebc = require("@11ty/eleventy-plugin-webc");

// Shortcodes
const img = require("./_11ty/shortcodes/img");
const codeExample = require("./_11ty/shortcodes/code-example");
const customImageRender = require("./build-tasks/markdown-render-img");
const testImg = require("./_11ty/shortcodes/test-img")({ 
  imgOptions: {
    widths: [800, 500, 300],
    urlPath: "/images/",
    outputDir: path.join("_site", "images"),
    formats: ["avif", "webp", "jpeg"]
  }, 
  globalAttributes: {
    decoding: "async",
    sizes: "100vw"
  },
  renderImage: customImageRender 
});

// Markdown
const markdownIt = require('markdown-it');
const markdownItEleventyImg = require("markdown-it-eleventy-img");
const markdownItAttrs = require("markdown-it-attrs");

// Config
const configObject = require("./src/_data/config-11ty");

module.exports = function(config) {
  // Passing through
  config.addPassthroughCopy({ "assets/images": "images" });

  // Plugins
  config.addPlugin(EleventyRenderPlugin);
  config.addPlugin(syntaxHighlight);
  config.addPlugin(pluginWebc, {
    components: "src/_includes/components/**/*.webc"
  });

  // Shortcodes
  config.addAsyncShortcode("img", img);
  config.addNunjucksAsyncShortcode("testImg", testImg);
  config.addJavaScriptFunction("jsImg", testImg);
  config.addShortcode("liquidImg", testImg);
  config.addShortcode("codeExample", codeExample);

  // Libraries
  config.setLibrary('md', markdownIt ({
    html: true,
    breaks: true,
    linkify: true
  })
  .use(markdownItAttrs)
  .use(markdownItEleventyImg, {
    imgOptions: {
      widths: [800, 500, 300],
      urlPath: "/images/",
      outputDir: path.join("_site", "images"),
      formats: ["avif", "webp", "jpeg"]
    },
    globalAttributes: {
      class: "image markdown-image",
      decoding: "async",
      sizes: "100vw",
      loading: "auto"
    },
    renderImage: customImageRender
  })
  .disable("code"));

   // Configuration
  return configObject;
}