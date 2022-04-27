import { liveCodeResult } from "./custom-elements/live-code-result.js";

if(document.querySelector("live-code-result")) {
  document.addEventListener("DOMContentLoaded", () => {
    customElements.define("live-code-result", liveCodeResult);
  });
}