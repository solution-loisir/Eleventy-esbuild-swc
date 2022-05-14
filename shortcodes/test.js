const { pairedShortcode } = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = async function({ css, html, js, isEditable = "false" }) {

  return `<section class="code-example" spellcheck="false">
  <exemple-editable data-editable="${isEditable}">
  <h1>Code exemple</h1>

  <details-utils animate>
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
  </details-utils>
  
  <h2>RESULT</h2>

  <iframe srcdoc='<body><style>${css}</style><div class="exemple-result-html">${html}</div><script>${js}</script></body>' sandbox="allow-scripts" seamless></iframe>
  </exemple-editable>
</section>`;
}