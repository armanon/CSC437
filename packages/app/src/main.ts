import {
  Auth,
  History,
  Store,
  Switch,
  define
} from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
import {html} from "lit";

import { ArtistViewElement } from "./views/artist-view";
import { ArtistEditElement } from "./views/artist-edit";
import { AlbumViewElement } from "./views/album-view";
import { AlbumEditElement } from "./views/album-edit";
import { GenreViewElement } from "./views/genre-view";
import { GenreEditElement } from "./views/genre-edit";
import { PlaylistViewElement } from "./views/playlist-view";
import { PlaylistEditElement } from "./views/playlist-edit";
import { TrackViewElement } from "./views/track-view";
import { TrackEditElement } from "./views/track-edit";
import { UserViewElement } from "./views/user-view";
import { UserEditElement } from "./views/user-edit";
import { HomeViewElement } from "./views/home-view";
import { ConcertViewElement } from "./views/concert-view";

const routes = [
  {
    path: "/app/artists/:id/edit",
    view: (params: Switch.Params) => html`
      <artist-edit artist-id=${params.id}></artist-edit>
    `
  },
  {
    path: "/app/artists",
    view: () => html`
      <artist-view></artist-view>
    `
  },
  {
    path: "/app/artists/:id",
    view: (params: Switch.Params) => html`
      <artist-view id=${params.id}></artist-view>
    `
  },
  {
    path: "/app/albums/:id/edit",
    view: (params: Switch.Params) => html`
      <album-edit album-id=${params.id}></album-edit>
    `
  },
  {
    path: "/app/albums",
    view: () => html`
      <album-view></album-view>
    `
  },
  {
    path: "/app/albums/:id",
    view: (params: Switch.Params) => html`
      <album-view id=${params.id}></album-view>
    `
  },
  {
    path: "/app/concerts",
    view: () => html`
      <concert-view></concert-view>`
  },
  {
    path: "/app/concerts/:id",
    view: (params: Switch.Params) => html`
      <concert-view id=${params.id}></concert-view>`
  },
  {
    path: "/app/genres/:id/edit",
    view: (params: Switch.Params) => html`
      <genre-edit genre-id=${params.id}></genre-edit>
    `
  },
  {
    path: "/app/genres/:id",
    view: (params: Switch.Params) => html`
      <genre-view id=${params.id}></genre-view>
    `
  },
  {
    path: "/app/genres",
    view: () => html`
      <genre-view></genre-view>
    `
  },
  {
    path: "/app/playlists/:id/edit",
    view: (params: Switch.Params) => html`
      <playlist-edit playlist-id=${params.id}></playlist-edit>
    `
  },
  {
    path: "/app/playlists",
    view: () => html`
      <playlist-view ></playlist-view>
    `
  },
  {
    path: "/app/playlists/:id",
    view: (params: Switch.Params) => html`
      <playlist-view id=${params.id}></playlist-view>
    `
  },
  {
    path: "/app/track/:id/edit",
    view: (params: Switch.Params) => html`
      <track-edit track-id=${params.id}></track-edit>
    `
  },
  {
    path: "/app/track/:id",
    view: (params: Switch.Params) => html`
      <track-view track-id=${params.id}></track-view>
    `
  },
  {
    path: "/app/user/:id/edit",
    view: (params: Switch.Params) => html`
      <user-edit user-id=${params.id}></user-edit>
    `
  },
  {
    path: "/app/user/:id",
    view: (params: Switch.Params) => html`
      <user-view user-id=${params.id}></user-view>
    `
  },
  {
    path: "/app",
    view: () => html`
      <home-view></home-view>
    `
  },
  {
    path: "/",
    redirect: "/app"
  }
];

define({
  "mu-history": History.Provider,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "musik:history", "musik:auth");
    }
  },
  "mu-auth": Auth.Provider,
  "mu-store": class AppStore extends Store.Provider<Model, Msg> {
    constructor() {
      super(update, init, "musik:auth");
    }
  },
  "artist-view": ArtistViewElement,
  "artist-edit": ArtistEditElement,
  "album-view": AlbumViewElement,
  "album-edit": AlbumEditElement,
  "genre-view": GenreViewElement,
  "genre-edit": GenreEditElement,
  "playlist-view": PlaylistViewElement,
  "playlist-edit": PlaylistEditElement,
  "track-view": TrackViewElement,
  "track-edit": TrackEditElement,
  "user-view": UserViewElement,
  "user-edit": UserEditElement,
  "home-view": HomeViewElement,
  "concert-view": ConcertViewElement,
});
