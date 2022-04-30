const { pairedShortcode } = require("@11ty/eleventy-plugin-syntaxhighlight");
const fs = require("fs");
const path = require("path");
const { input } = require("../src/_data/site").configObject.dir;
const { JSDOM } = require("jsdom");

module.exports = async function(exemplePath) {
  const htmlString = fs.readFileSync(path.join(input, exemplePath)).toString();
  const dom = new JSDOM(htmlString).window.document;
    

  const html = dom.querySelector("#code-exemple-html").innerHTML;
  const css = dom.querySelector("style").innerHTML;
  const js = dom.querySelector("script").innerHTML;

  return `<section class="code-example">
  <h1>Code exemple</h1>

  <details>
  <summary>HTML</summary>
  ${pairedShortcode(html, "html")}
  </details>
  
  <div><h2>CSS</h2>
  ${pairedShortcode(css, "css")}
  </div>

  <div><h2>JS</h2>
  ${pairedShortcode(js, "js")}
  </div>
  
  <h2>RESULT</h2>
  <live-code-result>
    <template>

      <style>
        ${css}
      </style>
  
      ${html}

      <script>
        domument.addEventListener("DOMContentLoaded", () => {
          ${js}
        });
      </script>

    </template>
  </live-code-result>

  <iframe src="${path.join(path.dirname(exemplePath), path.basename(exemplePath, path.extname(exemplePath)))}"></iframe>
</section>`;
}