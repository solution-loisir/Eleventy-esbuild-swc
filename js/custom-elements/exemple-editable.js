import { debounce } from "../utils/debounce";
import Prism from "../utils/prism";

window.Prism = window.Prism || {};
Prism.manual = true;

class exempleEditable extends HTMLElement {
  constructor() {
    super();

    this.iframe = this.querySelector("iframe");

    this.codeBlocks = {
      html: this.querySelector("code[class='language-html']"),
      css: this.querySelector("code[class='language-css']"),
      js: this.querySelector("code[class='language-js']")
    }

    this.isEditable = this.dataset.editable;
  }

  connectedCallback() {
    console.log("connected");

    Object.keys(this.codeBlocks).forEach(block => {
      this.codeBlocks[block].addEventListener("input", debounce((event) => this.editExempleResult.call(this, event), 2000));

      if(this.isEditable === "true") {
        this.codeBlocks[block].setAttribute("contenteditable", "true");
      }
    });
  }

  get htmlCodeString() {
    return this.codeBlocks.html.textContent;
  }

  set htmlCodeString(value) {
    this.codeBlocks.html.innerHTML = value;
  }

  get cssCodeString() {
    return this.codeBlocks.css.textContent;
  }

  set cssCodeString(value) {
    this.codeBlocks.css.innerHTML = value;
  }

  get jsCodeString() {
    return this.codeBlocks.js.textContent;
  }

  set jsCodeString(value) {
    this.codeBlocks.js.innerHTML = value
  }

  editExempleResult(event) {
    console.log("editExempleResult executed.");
    const newContentAsText = `<style>${this.cssCodeString}</style>${this.htmlCodeString}<script>${this.jsCodeString}</script>`;

    this.iframe.srcdoc = newContentAsText;

    this.reHighlightCode(event);
  }

  reHighlightCode(event) {
    switch(event.target.className) {
      case "language-html":
        this.htmlCodeString = this.codeBlocks.html.innerHTML.replace(/<br>/g, "\n");
        Prism.highlightElement(this.codeBlocks.html);
        break;
      case "language-css":
        this.cssCodeString = this.codeBlocks.css.innerHTML.replace(/<br>/g, "\n");
        Prism.highlightElement(this.codeBlocks.css);
        break;
      case "language-js":
        this.jsCodeString = this.codeBlocks.js.innerHTML.replace(/<br>/g, "\n");
        Prism.highlightElement(this.codeBlocks.js);
        break;
    }
  }
}

export {
  exempleEditable
}