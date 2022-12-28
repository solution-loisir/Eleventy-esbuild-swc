const Image = require("@11ty/eleventy-img");

module.exports = ({ imgOptions = {}, globalAttributes = {}, renderImage }) => {
  // Need to validate arguments.

  // `globalAttributes` as to be normalized at this point.
  return async function(attrs = {}) {
    // `attrs` as to be normalized.
    if(!attrs.alt) {
      attrs.alt = "";
    };

    const imageAttributes = { ...globalAttributes, ...attrs };

    if(!imageAttributes.src) throw new Error("Oops, the image needs a defined `src` attribute.");
    const src = imageAttributes.src;

    // Remove `src` from `imageAttributes`.

    if(renderImage) {
      const image = [ Image, imgOptions ];
      const attributes = [ src, imageAttributes ];
      return renderImage(image, attributes);
    };

    const metadata = await Image(src, imgOptions);
    const imageMarkup = Image.generateHTML(metadata, imageAttributes, {
      whitespaceMode: "inline"
    });
    
    return imageMarkup;
  };
};