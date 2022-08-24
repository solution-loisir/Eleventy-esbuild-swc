module.exports = (image, attributes) => {
  const [ Image, options ] = image;
  const [ src, attrs ] = attributes;

  Image(src, options);

  const metadata = Image.statsSync(src, options);
  const imageMarkup = Image.generateHTML(metadata, attrs, {
    whitespaceMode: "inline"
  });
    
  return `<figure>${imageMarkup}${attrs.title ? `<figcaption>${attrs.title}</figcaption>` : ""}</figure>`;
}