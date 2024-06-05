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
    return this.model.artist || [];
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
      name === "artist-id" &&
      oldValue !== newValue &&
      newValue
    ) {
      this.dispatchMessage([
        "artist/select",
        { artistId: newValue }
      ]);
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  render() {

    return html`
      <div>
                
                ${this.artists.map(this.renderartist)}
                </div>
          
    `;
  }

  renderartist(artist: Artist){
    debugger
    return html`
      <div>
                ${artist.name}
                <a href="/app/artist/${artist._id}/edit">Edit</a>
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


