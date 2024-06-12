// src/components/musik-header.ts
import { LitElement, css, html } from "lit";
import { Dropdown, define } from "@calpoly/mustang";

export class MusikHeaderElement extends LitElement {
  static uses = define({
    "drop-down": Dropdown.Element,
  });

  static styles = css`
    :host {
      display: block;
      background: var(--background-color);
      color: var(--text-color);
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
    }
    drop-down {
      margin-right: 1rem;
    }
    label {
      display: flex;
      align-items: center;
    }
    input[type="checkbox"] {
      margin-right: 0.5rem;
    }
  `;

  render() {
    return html`
      <header>
        <h1>Welcome to the Music Library</h1>
        <drop-down>
          <button slot="button">Menu</button>
          <div slot="content">
            <a href="#">Option 1</a>
            <a href="#">Option 2</a>
            <a href="#">Option 3</a>
          </div>
        </drop-down>
        <label>
          <input type="checkbox" id="darkModeToggle" autocomplete="off"> Dark mode
        </label>
      </header>
    `;
  }
}

customElements.define("musik-header", MusikHeaderElement);
