// restful-form.js
import { prepareTemplate } from './template.js';

class RestfulFormElement extends HTMLElement {
  static template = prepareTemplate(`
    <template>
      <form autocomplete="off">
        <slot></slot>
        <button type="submit">Submit</button>
      </form>
      <style>
        form {
          display: grid;
          gap: 1rem;
        }
      </style>
    </template>
  `);

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(
      RestfulFormElement.template.content.cloneNode(true)
    );
    this.form = this.shadowRoot.querySelector('form');
    this.state = {};
  }

  connectedCallback() {
    const src = this.getAttribute('src');
    const isNew = this.hasAttribute('new');
    if (!isNew) this.loadJSON(src);
    this.form.addEventListener('submit', (event) => this.handleSubmit(event));
    this.addEventListener('change', (event) => this.handleChange(event));
  }

  async loadJSON(src) {
    try {
      const response = await fetch(src);
      if (response.ok) {
        const json = await response.json();
        this.populateForm(json);
      } else {
        throw new Error(`Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to load JSON:', error);
    }
  }

  populateForm(json) {
    this.state = json;
    for (const [key, value] of Object.entries(json)) {
      const input = this.form.querySelector(`[name="${key}"]`);
      if (input) {
        input.value = value;
      }
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    if (name) this.state[name] = value;
  }

  async handleSubmit(event) {
    event.preventDefault();
    const method = this.hasAttribute('new') ? 'POST' : 'PUT';
    const src = this.getAttribute('src');
    try {
      const response = await fetch(src, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state),
      });
      if (response.ok) {
        const json = await response.json();
        this.populateForm(json);
      } else {
        throw new Error(`Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }
}

customElements.define('restful-form', RestfulFormElement);
