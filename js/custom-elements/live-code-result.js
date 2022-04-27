class liveCodeResult extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});

    this.userTemplateContent = this.cloneContentFrom(this.userTemplate);

    this.shadowRoot.appendChild(this.userTemplateContent);
  }

  get userTemplate() {
    return this.querySelector("template");
  }

  cloneContentFrom(template) {
    return template.content.cloneNode(true);
  }
}

export {
  liveCodeResult
}