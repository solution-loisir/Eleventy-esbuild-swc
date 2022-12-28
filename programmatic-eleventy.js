const path = require("path");
const Eleventy = require("@11ty/eleventy");
const md = require('markdown-it')();
const markdownItEleventyImg = require("markdown-it-eleventy-img");

(async () => {
  const elev = new Eleventy("src", "dist", {
    config(config) {
      config.setLibrary("md", md.use(markdownItEleventyImg, {
        imgOptions: {
          widths: [800, 500, 300],
          urlPath: "/images/",
          outputDir: path.join("dist", "images"),
          formats: ["avif", "webp", "jpeg"]
        },
        globalAttributes: {
          class: "image markdown-image",
          decoding: "async",
          sizes: "100vw",
          loading: "auto"
        }
      }));
    }
  });

  await elev.write();
})();