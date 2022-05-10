import { debounce } from "../utils/debounce";

class exempleEditable extends HTMLElement {
  constructor() {
    super();

    this.iframe = this.querySelector("iframe");

    this.codeBlocks = {
      html: this.querySelector("code[class='language-html']"),
      css: this.querySelector("code[class='language-css']"),
      js: this.querySelector("code[class='language-js']")
    }
  }

  connectedCallback() {
    console.log("connected");

    Object.keys(this.codeBlocks).forEach(block => {
      this.codeBlocks[block].addEventListener("input", () => debounce(this.editExempleResult.call(this)));
    });
  }

  get htmlCodeString() {
    return this.codeBlocks.html.textContent;
  }

  get cssCodeString() {
    return this.codeBlocks.css.textContent;
  }

  get jsCodeString() {
    return this.codeBlocks.js.textContent;
  }

  editExempleResult() {
    const newContentAsText = `<style>${this.cssCodeString}</style>${this.htmlCodeString}<script>${this.jsCodeString}</script>`;

    this.iframe.srcdoc = newContentAsText;
  }
}

export {
  exempleEditable
}