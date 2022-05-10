import { liveCodeResult } from "./custom-elements/live-code-result.js";
import { exempleEditable } from "./custom-elements/exemple-editable";
import "@zachleat/details-utils";

if(document.querySelector("live-code-result")) {
  document.addEventListener("DOMContentLoaded", () => {
    customElements.define("live-code-result", liveCodeResult);
  });
}

if(document.querySelector("exemple-editable")) {
  document.addEventListener("DOMContentLoaded", () => {
    customElements.define("exemple-editable", exempleEditable);
  });
}