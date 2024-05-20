import { prepareTemplate } from '../template.js';

export class AlbumViewElement extends HTMLElement {
  static styles = `
    * {
      margin: 0;
      box-sizing: border-box;
    }
    .album {
      display: grid;
      gap: 1rem;
    }
    .album header, .album section {
      padding: 1rem;
    }
    button {
      margin-top: 1rem;
    }
  `;

  static template = prepareTemplate(`
    <template>
      <article class="album">
        <header>
          <h1><slot name="title"></slot></h1>
          <button id="edit-button">Edit</button>
        </header>
        <section id="view-mode">
          <img slot="coverUrl" />
          <dl>
            <dt>Artist</dt>
            <dd><slot name="artistId"></slot></dd>
            <dt>Release Date</dt>
            <dd><slot name="releaseDate"></slot></dd>
            <dt>Genres</dt>
            <dd><slot name="genres"></slot></dd>
          </dl>
        </section>
        <section id="edit-mode" hidden>
          <restful-form src="">
            <label>
              <span>Album Title</span>
              <input name="title" />
            </label>
            <label>
              <span>Artist ID</span>
              <input name="artistId" />
            </label>
            <label>
              <span>Release Date</span>
              <input type="date" name="releaseDate" />
            </label>
            <label>
              <span>Genres</span>
              <input name="genres" />
            </label>
            <label>
              <span>Cover URL</span>
              <input name="coverUrl" />
            </label>
            <button type="submit">Submit</button>
            <button type="button" id="cancel-button">Cancel</button>
          </restful-form>
        </section>
      </article>
      <style>${AlbumViewElement.styles}</style>
    </template>
  `);

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(
      AlbumViewElement.template.cloneNode(true)
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

customElements.define('album-view', AlbumViewElement);
