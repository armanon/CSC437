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
  get album(): Album[] {
    return this.model.album || [];
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

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    if (
      name === "album-id" &&
      oldValue !== newValue &&
      newValue
    ) {
      this.dispatchMessage([
        "album/select",
        { albumId: newValue }
      ]);
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  render() {
    return html`
      <div>
                        ${this.album.title}
                <a href="/app/album/${this.album._id}/edit">Edit</a>
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


