import { prepareTemplate } from '../template.js';

export class PlaylistViewElement extends HTMLElement {
  static styles = `
    * {
      margin: 0;
      box-sizing: border-box;
    }
    .playlist {
      display: grid;
      gap: 1rem;
    }
    .playlist header, .playlist section {
      padding: 1rem;
    }
    button {
      margin-top: 1rem;
    }
  `;

  static template = prepareTemplate(`
    <template>
      <article class="playlist">
        <header>
          <h1><slot name="title"></slot></h1>
          <button id="edit-button">Edit</button>
        </header>
        <section id="view-mode">
          <dl>
            <dt>Description</dt>
            <dd><slot name="description"></slot></dd>
            <dt>Tracks</dt>
            <dd><slot name="tracks"></slot></dd>
          </dl>
        </section>
        <section id="edit-mode" hidden>
          <restful-form src="">
            <label>
              <span>Playlist Title</span>
              <input name="title" type="text" />
            </label>
            <label>
              <span>Description</span>
              <textarea name="description"></textarea>
            </label>
            <label>
              <span>Tracks</span>
              <input-array name="tracks"></input-array>
            </label>
            <button type="submit">Submit</button>
            <button type="button" id="cancel-button">Cancel</button>
          </restful-form>
        </section>
      </article>
      <style>${PlaylistViewElement.styles}</style>
    </template>
  `);

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(
      PlaylistViewElement.template.cloneNode(true)
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

customElements.define('playlist-view', PlaylistViewElement);
