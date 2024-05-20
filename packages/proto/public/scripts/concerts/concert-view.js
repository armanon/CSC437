import { prepareTemplate } from '../template.js';

export class ConcertViewElement extends HTMLElement {
  static styles = `
    * {
      margin: 0;
      box-sizing: border-box;
    }
    .concert {
      display: grid;
      gap: 1rem;
    }
    .concert header, .concert section {
      padding: 1rem;
    }
    button {
      margin-top: 1rem;
    }
  `;

  static template = prepareTemplate(`
    <template>
      <article class="concert">
        <header>
          <h1><slot name="title"></slot></h1>
          <button id="edit-button">Edit</button>
        </header>
        <section id="view-mode">
          <img slot="poster" />
          <dl>
            <dt>Date and Time</dt>
            <dd><slot name="dateAndTime"></slot></dd>
            <dt>Location</dt>
            <dd><slot name="location"></slot></dd>
            <dt>Artists Performing</dt>
            <dd><slot name="artists"></slot></dd>
          </dl>
        </section>
        <section id="edit-mode" hidden>
          <restful-form src="">
            <label>
              <span>Date and Time</span>
              <input name="dateAndTime" type="datetime-local" />
            </label>
            <label>
              <span>Location</span>
              <input name="location" type="text" />
            </label>
            <label>
              <span>Artists Performing</span>
              <input name="artists" type="text" />
            </label>
            <button type="submit">Submit</button>
            <button type="button" id="cancel-button">Cancel</button>
          </restful-form>
        </section>
      </article>
      <style>${ConcertViewElement.styles}</style>
    </template>
  `);

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(
      ConcertViewElement.template.cloneNode(true)
    );
    this.editMode = false;
  }

  get src() {
    return this.getAttribute('src');
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#edit-button').addEventListener('click', () => this.toggleEditMode(true));
    this.shadowRoot.querySelector('#cancel-button').addEventListener('click', () => this.toggleEditMode(false));

    if (this.src) {
      this.loadJSON(this.src);
    }
  }

  async loadJSON(src) {
    try {
      const response = await fetch(src);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${src}: ${response.statusText}`);
      }
      const json = await response.json();
      this.renderSlots(json);
      this.shadowRoot.querySelector('restful-form').setAttribute('src', this.src);
    } catch (error) {
      console.error(error);
      this.shadowRoot.innerHTML = `<p class="error">Failed to fetch ${src}: ${error.message}</p>`;
    }
  }

  renderSlots(json) {
    const container = this.shadowRoot;
    for (const [key, value] of Object.entries(json)) {
      const slot = container.querySelector(`[slot="${key}"]`);
      if (slot) {
        slot.textContent = value;
      }
    }
  }

  toggleEditMode(editMode) {
    this.editMode = editMode;
    this.shadowRoot.querySelector('#view-mode').hidden = this.editMode;
    this.shadowRoot.querySelector('#edit-mode').hidden = !this.editMode;
  }
}

customElements.define('concert-view', ConcertViewElement);
