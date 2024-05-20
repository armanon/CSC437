// scripts/json-loader.js
import { prepareTemplate } from './template.js';

export class JsonObjectElement extends HTMLElement {
  static template = prepareTemplate(`<template>
    <dl>
      <slot></slot>
    </dl>
  </template>`);

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(
      JsonObjectElement.template.content.cloneNode(true)
    );
  }

  connectedCallback() {
    const src = this.getAttribute('src');
    const open = this.hasAttribute('open');
    if (open) this.loadJSON(src);
    this.addEventListener('json-object:open', () => this.loadJSON(src));
  }

  async loadJSON(src) {
    this.shadowRoot.querySelector('dl').innerHTML = "<p>Loading...</p>";
    try {
      const response = await fetch(src);
      if (response.ok) {
        const json = await response.json();
        this.renderJSON(json);
      } else {
        throw new Error(`Status: ${response.status}`);
      }
    } catch (error) {
      this.shadowRoot.innerHTML = `<p class="error">Failed to fetch ${src}: ${error.message}</p>`;
    }
  }

  renderJSON(json) {
    const container = this.shadowRoot.querySelector('dl');
    container.innerHTML = Object.entries(json)
      .map(([key, value]) => `<dt>${key}</dt><dd>${Array.isArray(value) ? value.join(", ") : value}</dd>`)
      .join('');
  }
}

customElements.define('json-object', JsonObjectElement);
