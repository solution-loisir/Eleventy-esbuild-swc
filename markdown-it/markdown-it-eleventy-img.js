const Image = require("@11ty/eleventy-img");
const path = require("path");

const findLazyFlag = title => {

  const isLazy = title.match(/^(%lazy%)/i) ? true : false;

  let titleText = title;

  if(isLazy) {
    const titleIndex = title.lastIndexOf("%") + 1;
    titleText = title.slice(titleIndex).trim();
  }

  return {
    isLazy,
    titleText
  }
}

module.exports = function markdownItEleventyImg(md, {
  widths = [300, 600],
  urlPath = "/images/",
  output = "_site",
  baseFormat = "jpeg",
  optimalFormat = ["avif", "webp"],
  imgClass = "image md-image",
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
    const {isLazy, titleText} = findLazyFlag(title);

    const imageAttributes = {
      alt,
      sizes,
      class: imgClass,
      loading: isLazy ? "lazy" : "auto",
      decoding: "async"
    }

    if(titleText) {
      imageAttributes.title = titleText;
    }

    const eleventyImageOptions = {
      widths,
      formats: [...optimalFormat, baseFormat],
      urlPath,
      outputDir: path.join(output, urlPath)
    }

    Image(srcPath, eleventyImageOptions);

    const metadata = Image.statsSync(srcPath, eleventyImageOptions);
    const imageMarkup = Image.generateHTML(metadata, imageAttributes, {
      whitespaceMode: "inline"
    });
    
    return imageMarkup;
  }
}