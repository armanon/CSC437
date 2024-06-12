// src/views/genre-view.ts
import { TemplateResult, html } from "lit";
import { Genre } from 'server/models/genre';
import { GenreSelectMessage } from "../messages";
import { Model } from "../model";
import { BaseViewElement } from "./base-view";

export class GenreViewElement extends  BaseViewElement<Model, GenreSelectMessage, Genre> {
    getMessage(value: string | null): GenreSelectMessage {
      console.log("value", value)
      const msg = value ? { genreId: value } : {};
      return ["genre/select", msg];
    }
    getValues(): Genre[] {
      return this.model.genres || [];
    }
    renderValue(value: Genre): TemplateResult<1> {
      const { _id: id, name } = value;
      return html`
       <div>
         <label for="${id}-name">Name:</label>
         <label name="${id}-name">${name}</label>
         <a href="/app/genres/${id}">View</a>
         <a href="/app/genres/${id}/edit">Edit</a>
       </div>
`
    }
}
