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

      this.codeBlocks[block].setAttribute("contenteditable", "true");
    });
  }

  get htmlCodeString() {
    return this.codeBlocks.html.innerHTML;
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

    this.reHighlightCode.call(this, event);
  }

  reHighlightCode(event) {
    switch(event.target.className) {
      case "language-html":
        this.htmlCodeString = this.codeBlocks.html.innerHTML.replace(/<br>/g, "\n");
        this.insertBefore(this.range);
        this.reHighlightHtml.bind(this);
        const htmlCodeElement = this.querySelector("code[class='language-html']");
        this.resetCaret(htmlCodeElement);
        this.removeReferenceNode(htmlCodeElement);
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

  get range() {
    const selection = document.getSelection();
    return selection.getRangeAt(0);
  }

  insertBefore(range) {
    const beforeCaretFlag = document.createElement("span");
    beforeCaretFlag.classList.add("before-caret");
    range.insertNode(beforeCaretFlag);
  }

  resetCaret(commonAncestor) {
    const newRange = document.createRange();
    const referenceNode = commonAncestor.getElementsByClassName("before-caret").item(0);
    
    newRange.setStartAfter(referenceNode);
    newRange.collapse(true);

    const newSelection = document.getSelection();
    newSelection.removeAllRanges();
    newSelection.addRange(newRange);
  }

  removeReferenceNode(parent) {
    const referenceNode = parent.querySelector("span[class='before-caret']");
    referenceNode.parentNode.removeChild(referenceNode);
  }

  reHighlightHtml() {
    Prism.highlightElement(this.codeBlocks.html);
    /*
    this.htmlCodeString = this.codeBlocks.html.innerHTML.replace(/<br>/g, "\n");
    const highlightedCode = Prism.highlight(this.codeBlocks.html.innerHTML, Prism.languages.html, "html");

    const parser = new DOMParser();
    const parserDoc = parser.parseFromString(highlightedCode, "text/html");

    const pre = this.querySelector("pre[class='language-html']");

    const code = document.createElement("code");
    code.classList.add("language-html");
    code.setAttribute("contenteditable", "true");
    [...parserDoc.body.childNodes].forEach(node => code.appendChild(node));

    this.codeBlocks.html = code.textContent;
    */
  }
}

export {
  exempleEditable
}