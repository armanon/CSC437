import { define, Form, History, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { Genre } from "server/models/genre";
import { Msg } from "../messages";
import { Model } from "../model";

export class GenreEditElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element
  });

  @property({ attribute: "genre-id", reflect: true })
  genreId = "";

  @property()
  get genre(): Genre | undefined {
    return this.model.genres[0];
  }

  render() {
    return html`
      <mu-form .init=${this.genre} @mu-form:submit=${this._handleSubmit}>
        <label>
          <span>Genre</span>
          <input name="name" .value=${this.genre?.name || ""} />
        </label>
        <button type="submit">Save</button>
      </mu-form>
    `;
  }

  private _handleSubmit(event: Form.SubmitEvent<Genre>) {
    this.dispatchMessage([
      "genre/save",
      {
        genreId: this.genreId,
        genre: event.detail,
        onSuccess: () =>
          History.dispatch(this, "history/navigate", {
            href: `/app/genre/${this.genreId}`
          }),
        onFailure: (error: Error) => console.log("ERROR:", error)
      }
    ]);
  }

  static styles = css`
    /* Add your styles here */
  `;
}

customElements.define("genre-edit", GenreEditElement);
