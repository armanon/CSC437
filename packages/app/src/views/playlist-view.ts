// src/views/playlist-view.ts
import { define, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Playlist, Genre } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";

export class PlaylistViewElement extends View<Model, Msg> {
  @property({ attribute: "playlist-id", reflect: true })
  playlistid = "";

  @state()
  genreFilter: string = "all";

  @property()
  get playlists(): Playlist[] {
    return this.model.playlists || [];
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
    const filteredPlaylists = this.genreFilter === "all" ? this.playlists : this.playlists.filter(playlist => playlist.genre === this.genreFilter);
    return html`
      <div>
        <label for="genreFilter">Filter by genre:</label>
        <select id="genreFilter" @change=${this.onGenreChange}>
          <option value="all">All</option>
          ${this.model.genres.map(
            genre => html`
              <option value="${genre.name}">${genre.name}</option>
            `
          )}
        </select>
        <ul>
          ${filteredPlaylists.map(
            playlist => html`
              <li>
                ${playlist.name}
                <a href="/app/playlist/${playlist._id}/edit">Edit</a>
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

