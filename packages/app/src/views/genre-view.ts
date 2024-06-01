// src/views/genre-view.ts
import { define, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Genre } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";

export class GenreViewElement extends View<Model, Msg> {
  @property({ attribute: "genre-id", reflect: true })
  genreid = "";

  @state()
  genreFilter: string = "all";

  @property()
  get genres(): Genre[] {
    return this.model.genres || [];
  }

  constructor() {
    super("musik:model");
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("genre-filter-change", (event: CustomEvent) => {
      this.genreFilter = event.detail.genre;
    });
  }

  render() {
    const filteredGenres = this.genreFilter === "all" ? this.genres : this.genres.filter(genre => genre.name === this.genreFilter);
    return html`
      <div>
        <label for="genreFilter">Filter by genre:</label>
        <select id="genreFilter" @change=${this.onGenreChange}>
          <option value="all">All</option>
          ${this.genres.map(
            genre => html`
              <option value="${genre.name}">${genre.name}</option>
            `
          )}
        </select>
        <ul>
          ${filteredGenres.map(
            genre => html`
              <li>
                ${genre.name}
                <a href="/app/genre/${genre._id}/edit">Edit</a>
              </li>
            `
          )}
        </ul>
      </div>
    `;
  }

  onGenreChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.dispatchEvent(new CustomEvent("genre-filter-change", {
      detail: { genre: select.value },
      bubbles: true,
      composed: true
    }));
  }
}

define("genre-view", GenreViewElement);
