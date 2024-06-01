// src/views/album-view.ts
import { define, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Album, Genre } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";

export class AlbumViewElement extends View<Model, Msg> {
  @property({ attribute: "album-id", reflect: true })
  albumid = "";

  @state()
  genreFilter: string = "all";

  @property()
  get albums(): Album[] {
    return this.model.albums || [];
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
    const filteredAlbums = this.genreFilter === "all" ? this.albums : this.albums.filter(album => album.genre === this.genreFilter);
    return html`
      <div>
        <label for="genreFilter">Filter by genre:</label>
        <select id="genreFilter" @change=${this.onGenreChange}>
          <option value="all">All</option>
          ${this.model.genres.map(
            (genre: Genre) => html`
              <option value="${genre.name}">${genre.name}</option>
            `
          )}
        </select>
        <ul>
          ${filteredAlbums.map(
            album => html`
              <li>
                ${album.title}
                <a href="/app/album/${album._id}/edit">Edit</a>
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

define("album-view", AlbumViewElement);
