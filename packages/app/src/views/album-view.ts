// src/views/album-view.ts
import { TemplateResult, html } from "lit";
import { AlbumSelectMessage } from "../messages";
import { Model } from "../model";
import { BaseViewElement } from "./base-view";
import { Album } from "server/models/album";

export class AlbumViewElement extends  BaseViewElement<Model, AlbumSelectMessage, Album> {
    getMessage(value: string | null): AlbumSelectMessage {
      const msg = value ? { albumId: value } : {};
      return ["album/select", msg];
    }
    getValues(): Album[] {
      return this.model.albums || [];
    }
    renderValue(value: Album): TemplateResult<1> {
      const { _id: id, title, artist } = value;
      return html`
       <div>
         <label for="${id}-title">Title:</label>
         <label name="${id}-title">${title}</label>
         <label for="${id}-artist">Artist:</label>
         <label name="${id}-artist">${artist}</label>
         <a href="/app/albums/${id}">View</a>
         <a href="/app/albums/${id}/edit">Edit</a>
       </div>
`
    }
}
