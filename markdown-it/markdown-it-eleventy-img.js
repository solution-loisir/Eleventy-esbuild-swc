const Image = require("@11ty/eleventy-img");
const path = require("path");

module.exports = function markdownItEleventyImg(md, {
  widths = [300, 600],
  baseFormat = "jpeg",
  optimalFormat = ["avif", "webp"],
  lazy = true,
  baseClass = "image md-image",
  addClass = "",
  sizes = "100vw"
} = {}) {

  md.renderer.rules.image  = (tokens, index, options, env, renderer) => {
    // This function will be passed to a rendering loop, 
    // it as to be written as an implicit loop.
    const token = tokens[index];
    const src = token.attrGet("src");
    const srcPath = path.join("assets", src);
    // Oddly, `alt` value is in the `content` property 
    // and can't be retrieved with the `attrGet` method 
    // like the other attributes.
    const alt = token.content;
    const title = token.attrGet("title") || "";


    const eleventyImageOptions = {
      widths,
      formats: [...optimalFormat, baseFormat],
      urlPath: "/images/",
      outputDir: path.join("_site", "images")
    }

    Image(srcPath, eleventyImageOptions);

    const imageAttributes = {
      alt,
      title,
      sizes,
      class: addClass ? `${baseClass} ${addClass}` : baseClass,
      loading: lazy ? "lazy" : "auto",
      decoding: "async"
    }

    const metadata = Image.statsSync(srcPath, eleventyImageOptions);
    const imageMarkup = Image.generateHTML(metadata, imageAttributes, {
      whitespaceMode: "inline"
    });
    
    return imageMarkup;
  }
}