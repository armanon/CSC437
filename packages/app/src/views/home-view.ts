// src/views/home-view.ts
import { View } from "@calpoly/mustang";
import { html } from "lit";
import { Model } from "../model";
import { Msg } from "../messages";

export class HomeViewElement extends View<Model, Msg> {
  constructor() {
    super("musik:model");
  }

  render() {
    return html`
      <div>
        <h1>Welcome to the Music Library</h1>
        <p>Your one-stop destination for all your musical needs.</p>
        <p>Explore albums, artists, tracks, genres, playlists, concerts, and more!</p>
      </div>
    `;
  }
}


