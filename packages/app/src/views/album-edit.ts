import { define, Form, History, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { Album } from "server/models/album";
import { Msg } from "../messages";
import { Model } from "../model";

export class AlbumEditElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element
  });

  @property({ attribute: "album-id", reflect: true })
  albumId = "";

  @property()
  get album(): Album | undefined {
    return this.model.albums[0];
  }

  render() {
    return html`
      <mu-form .init=${this.album} @mu-form:submit=${this._handleSubmit}>
        <label>
          <span>Title</span>
          <input name="title" .value=${this.album?.title || ""} />
        </label>
        <button type="submit">Save</button>
      </mu-form>
    `;
  }

  private _handleSubmit(event: Form.SubmitEvent<Album>) {
    this.dispatchMessage([
      "album/save",
      {
        albumId: this.albumId,
        album: event.detail,
        onSuccess: () =>
          History.dispatch(this, "history/navigate", {
            href: `/app/album/${this.albumId}`
          }),
        onFailure: (error: Error) => console.log("ERROR:", error)
      }
    ]);
  }

  static styles = css`
    /* Add your styles here */
  `;
}

customElements.define("album-edit", AlbumEditElement);
