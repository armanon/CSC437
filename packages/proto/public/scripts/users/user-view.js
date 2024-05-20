// proto/public/scripts/users/user-view.js
import { prepareTemplate } from '../template.js';
import { loadJSON } from '../load-json.js';
import { Auth, Observer } from "@calpoly/mustang";

export class UserViewElement extends HTMLElement {
  static styles = `
    * {
      margin: 0;
      box-sizing: border-box;
    }
    .user {
      display: grid;
      gap: 1rem;
    }
    .user header, .user section {
      padding: 1rem;
    }
    button {
      margin-top: 1rem;
    }
  `;

  static template = prepareTemplate(`
    <template>
      <article class="user">
        <header>
          <h1><slot name="username"></slot></h1>
          <button id="edit-button">Edit</button>
        </header>
        <section id="view-mode">
          <dl>
            <dt>Email</dt>
            <dd><slot name="email"></slot></dd>
            <dt>First Name</dt>
            <dd><slot name="firstName"></slot></dd>
            <dt>Last Name</dt>
            <dd><slot name="lastName"></slot></dd>
          </dl>
        </section>
        <section id="edit-mode" hidden>
          <restful-form src="">
            <label>
              <span>Username</span>
              <input name="username" type="text" />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" />
            </label>
            <label>
              <span>First Name</span>
              <input name="firstName" type="text" />
            </label>
            <label>
              <span>Last Name</span>
              <input name="lastName" type="text" />
            </label>
            <button type="submit">Submit</button>
            <button type="button" id="cancel-button">Cancel</button>
          </restful-form>
        </section>
      </article>
      <style>${UserViewElement.styles}</style>
    </template>
  `);

  _authObserver = new Observer(this, "blazing:auth");

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(
      UserViewElement.template.cloneNode(true)
    );
    this.editMode = false;
  }

  get src() {
    return this.getAttribute('src');
  }

  get authorization() {
    console.log("Authorization for user, ", this._user);
    return (
      this._user?.authenticated && {
        Authorization: `Bearer ${this._user.token}`
      }
    );
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#edit-button').addEventListener('click', () => this.toggleEditMode(true));
    this.shadowRoot.querySelector('#cancel-button').addEventListener('click', () => this.toggleEditMode(false));

    this._authObserver.observe(({ user }) => {
      this._user = user;

      if (this.src) {
        loadJSON(this.src, this, this.renderSlots.bind(this), this.authorization);
        this.shadowRoot.querySelector('restful-form').setAttribute('src', this.src);
      }
    });
  }

  async loadJSON(src) {
    try {
      const response = await fetch(src, { headers: this.authorization });
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

customElements.define('user-view', UserViewElement);
