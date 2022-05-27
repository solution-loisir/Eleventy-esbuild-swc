const { pairedShortcode } = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = ({ css, html, js }) => {
  const cssMarkup = css ? `
  <details>
    <summary>CSS</summary>
    ${pairedShortcode(css, "css")}
  </details>` 
  :
  "";

  const jsMarkup = js ? `
  <details>
    <summary>JS</summary>
    ${pairedShortcode(js, "js")}
  </details>`
  :
  "";

  return `<section class="code-example">
  <h1>CODE EXAMPLE</h1>

  <details-utils animate>
    <details open>
      <summary>HTML</summary>
      ${pairedShortcode(html, "html")}
    </details>

    ${cssMarkup}

    ${jsMarkup}
  </details-utils>
  
  <h2>RESULT</h2>

  <div class="frame-wrapper">
    <iframe srcdoc='<style>${css}</style><div class="exemple-result-html">${html}</div><script>${js}</script>' sandbox="allow-scripts" seamless></iframe>
  </div>
</section>`;
}