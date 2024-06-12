// src/views/artist-view.ts
import { TemplateResult, html } from "lit";
import { Artist } from 'server/models/artist';
import { ArtistSelectMessage } from "../messages";
import { Model } from "../model";
import { BaseViewElement } from "./base-view";

export class ArtistViewElement extends  BaseViewElement<Model, ArtistSelectMessage, Artist> {
    getMessage(value: string | null): ArtistSelectMessage {
      console.log("value", value)
      const msg = value ? { artistId: value } : {};
      return ["artist/select", msg];
    }
    getValues(): Artist[] {
      return this.model.artists || [];
    }
    renderValue(value: Artist): TemplateResult<1> {
      const { _id: id, name } = value;
      return html`
       <div>
         <label for="${id}-name">Name:</label>
         <label name="${id}-name">${name}</label>
         <a href="/app/artists/${id}">View</a>
         <a href="/app/artists/${id}/edit">Edit</a>
       </div>
`
    }
}
