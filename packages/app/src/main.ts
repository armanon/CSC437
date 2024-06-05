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

const routes = [
  {
    path: "/app/artist/:id/edit",
    view: (params: Switch.Params) => html`
      <artist-edit artist-id=${params.id}></artist-edit>
    `
  },
  {
    path: "/app/artist/:id",
    view: (params: Switch.Params) => html`
      <artist-view artist-id=${params.id}></artist-view>
    `
  },
  {
    path: "/app/album/:id/edit",
    view: (params: Switch.Params) => html`
      <album-edit album-id=${params.id}></album-edit>
    `
  },
  {
    path: "/app/album/:id",
    view: (params: Switch.Params) => html`
      <album-view album-id=${params.id}></album-view>
    `
  },
  {
    path: "/app/genre/:id/edit",
    view: (params: Switch.Params) => html`
      <genre-edit genre-id=${params.id}></genre-edit>
    `
  },
  {
    path: "/app/genre/:id",
    view: (params: Switch.Params) => html`
      <genre-view genre-id=${params.id}></genre-view>
    `
  },
  {
    path: "/app/playlist/:id/edit",
    view: (params: Switch.Params) => html`
      <playlist-edit playlist-id=${params.id}></playlist-edit>
    `
  },
  {
    path: "/app/playlist/:id",
    view: (params: Switch.Params) => html`
      <playlist-view playlist-id=${params.id}></playlist-view>
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
  "home-view": HomeViewElement
});
