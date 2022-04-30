module.exports = {
  genericTitle: "Eleventy-esbuild-swc",
  description: "An example of integration of esbuild and swc with Eleventy, the static site generator.",
  eleventyEnv: process.env.ELEVENTY_ENV,
  canonical: "#",
  configObject: {
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