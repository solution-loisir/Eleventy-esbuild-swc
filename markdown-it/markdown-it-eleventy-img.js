const Image = require("@11ty/eleventy-img");
const path = require("path");

const findLazyFlag = title => {

  let titleText = title.trim();

  const isLazy = titleText.match(/^(%lazy%)/i) ? true : false;

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
  options = {},
  attributes = {}
} = {}) {

  md.renderer.rules.image  = (tokens, index, rendererOptions, env, renderer) => {

    const token = tokens[index];

    const src = token.attrGet("src");
    const srcPath = path.join("assets", src);

    const title = token.attrGet("title") || "";
    const { isLazy, titleText } = findLazyFlag(title);

    const defaultAttributes = {
      alt: token.content,
      sizes: "100vw"
    }
    if(titleText) {
      defaultAttributes.title = titleText;
    }
    if(isLazy) {
      defaultAttributes.loading = "lazy";
    }

    const imageAttributes = { ...defaultAttributes, ...attributes }
    
    Image(srcPath, options);

    const metadata = Image.statsSync(srcPath, options);
    const imageMarkup = Image.generateHTML(metadata, imageAttributes, {
      whitespaceMode: "inline"
    });
    
    return imageMarkup;
  }
}