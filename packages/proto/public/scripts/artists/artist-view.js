import { prepareTemplate } from '../template.js';

export class ArtistViewElement extends HTMLElement {
  static styles = `
    * {
      margin: 0;
      box-sizing: border-box;
    }
    .artist {
      display: grid;
      gap: 1rem;
    }
    .artist header, .artist section {
      padding: 1rem;
    }
    button {
      margin-top: 1rem;
    }
  `;

  static template = prepareTemplate(`
    <template>
      <article class="artist">
        <header>
          <h1><slot name="name"></slot></h1>
          <button id="edit-button">Edit</button>
        </header>
        <section id="view-mode">
          <img slot="photo" />
          <dl>
            <dt>Biography</dt>
            <dd><slot name="bio"></slot></dd>
          </dl>
        </section>
        <section id="edit-mode" hidden>
          <restful-form src="">
            <label>
              <span>Artist Name</span>
              <input name="name" />
            </label>
            <label>
              <span>Biography</span>
              <textarea name="bio"></textarea>
            </label>
            <button type="submit">Submit</button>
            <button type="button" id="cancel-button">Cancel</button>
          </restful-form>
        </section>
      </article>
      <style>${ArtistViewElement.styles}</style>
    </template>
  `);

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(
      ArtistViewElement.template.cloneNode(true)
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

customElements.define('artist-view', ArtistViewElement);
