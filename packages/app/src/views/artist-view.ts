// src/views/artist-view.ts
import { define, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Artist, Genre } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";

export class ArtistViewElement extends View<Model, Msg> {
  @property({ attribute: "artist-id", reflect: true })
  artistid = "";

  @state()
  genreFilter: string = "all";

  @property()
  get artists(): Artist[] {
    return this.model.artists || [];
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
    const filteredArtists = this.genreFilter === "all" ? this.artists : this.artists.filter(artist => artist.genre === this.genreFilter);
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
          ${filteredArtists.map(
            artist => html`
              <li>
                ${artist.name}
                <a href="/app/artist/${artist._id}/edit">Edit</a>
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

define("artist-view", ArtistViewElement);
