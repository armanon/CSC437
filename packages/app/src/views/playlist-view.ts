// src/views/playlist-view.ts
import { TemplateResult, html } from "lit";
import { Playlist } from 'server/models/playlist';
import { Msg } from "../messages";
import { Model } from "../model";
import { BaseViewElement } from "./base-view";

export class PlaylistViewElement extends  BaseViewElement<Model, Msg, Playlist> {
    getMessage(value: string | null) {
      console.log("value", value)
      const msg = value ? { playListId: value } : {};
      return ["playlist/select", msg];
    }
    getValues(): Playlist[] {
      return this.model.playlists || [];
    }
    renderValue(value: Playlist): TemplateResult<1> {
      const { _id: id, title } = value;
      return html`
       <div>
         <label for="${id}-title">Title:</label>
         <label name="${id}-title">${title}</label>
         <a href="/app/playlists/${id}">View</a>
         <a href="/app/playlists/${id}/edit">Edit</a>
       </div>
`
    }
}
