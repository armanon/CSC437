// src/views/concert-view.ts
import { TemplateResult, html } from "lit";
import { ConcertSelectMessage } from "../messages";
import { Model } from "../model";
import { BaseViewElement } from "./base-view";
import { Concert } from "server/models/concert";

export class ConcertViewElement extends  BaseViewElement<Model, ConcertSelectMessage, Concert> {
    getMessage(value: string | null): ConcertSelectMessage {
      console.log("value", value)
      const msg = value ? { concertId: value } : {};
      return ["concert/select", msg];
    }
    getValues(): Concert[] {
      return this.model.concerts || [];
    }
    renderValue(value: Concert): TemplateResult<1> {
      const { _id: id, title, artists } = value;
      return html`
       <div>
         <label for="${id}-title">Title:</label>
         <label name="${id}-title">${title}</label>

         <label for="${id}-artist">Artists:</label>
         <label name="${id}-artist">${artists}</label>

         <a href="/app/concerts/${id}">View</a>
       </div>
`
    }
}
