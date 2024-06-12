// src/views/track-view.ts
import { TemplateResult, html } from "lit";
import { Track } from "server/models/track";
import { TrackSelectMessage } from "../messages";
import { Model } from "../model";
import { BaseViewElement } from "./base-view";

export class TrackViewElement extends BaseViewElement<Model, TrackSelectMessage, Track> {
    getMessage(value: string | null): TrackSelectMessage {
      const msg =  value ? { trackId: value } : {};
      return ["track/select", msg];
    }
    getValues(): Track[] {
      return this.model.tracks || [];
    }
    renderValue(value: Track): TemplateResult<1> {
      const { _id: id, title, duration } = value;
        return html`
        <div>
         <label for="${id}-title">Title:</label>
         <label title="${id}-title">${title}</label>
         <label for="${id}-duration">Duration:</label>
         <label duration="${id}-duration">${duration}</label>
         <a href="/app/tracks/${id}">View</a>
         <a href="/app/tracks/${id}/edit">Edit</a>
       </div>
`
    }

}
