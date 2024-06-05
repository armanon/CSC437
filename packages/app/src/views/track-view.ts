// src/views/track-view.ts
import { define, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Track, Genre } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";

export class TrackViewElement extends View<Model, Msg> {
  @property({ attribute: "track-id", reflect: true })
  trackid = "";

  @state()
  genreFilter: string = "all";

  @property()
  get tracks(): Track[] {
    return this.model.tracks || [];
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
    const filteredTracks = this.genreFilter === "all" ? this.tracks : this.tracks.filter(track => track.genre === this.genreFilter);
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
          ${filteredTracks.map(
            track => html`
              <li>
                ${track.title}
                <a href="/app/track/${track._id}/edit">Edit</a>
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


