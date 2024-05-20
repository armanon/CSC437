import { prepareTemplate } from '../template.js';

export class TrackViewElement extends HTMLElement {
  static styles = `
    * {
      margin: 0;
      box-sizing: border-box;
    }
    .track {
      display: grid;
      gap: 1rem;
    }
    .track header, .track section {
      padding: 1rem;
    }
    button {
      margin-top: 1rem;
    }
  `;

  static template = prepareTemplate(`
    <template>
      <article class="track">
        <header>
          <h1><slot name="title"></slot></h1>
          <button id="edit-button">Edit</button>
        </header>
        <section id="view-mode">
          <dl>
            <dt>Artist</dt>
            <dd><slot name="artist"></slot></dd>
            <dt>Album</dt>
            <dd><slot name="album"></slot></dd>
            <dt>Genre</dt>
            <dd><slot name="genre"></slot></dd>
            <dt>Release Date</dt>
            <dd><slot name="releaseDate"></slot></dd>
          </dl>
        </section>
        <section id="edit-mode" hidden>
          <restful-form src="">
            <label>
              <span>Track Title</span>
              <input name="title" type="text" />
            </label>
            <label>
              <span>Artist</span>
              <input name="artist" type="text" />
            </label>
            <label>
              <span>Album</span>
              <input name="album" type="text" />
            </label>
            <label>
              <span>Genre</span>
              <input name="genre" type="text" />
            </label>
            <label>
              <span>Release Date</span>
              <input name="releaseDate" type="date" />
            </label>
            <button type="submit">Submit</button>
            <button type="button" id="cancel-button">Cancel</button>
          </restful-form>
        </section>
      </article>
      <style>${TrackViewElement.styles}</style>
    </template>
  `);

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(
      TrackViewElement.template.cloneNode(true)
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

customElements.define('track-view', TrackViewElement);
