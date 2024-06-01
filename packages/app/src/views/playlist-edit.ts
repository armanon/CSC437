import { define, Form, History, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { Playlist } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";

export class PlaylistEditElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element
  });

  @property({ attribute: "playlist-id", reflect: true })
  playlistId = "";

  @property()
  get playlist(): Playlist | undefined {
    return this.model.playlist;
  }

  render() {
    return html`
      <mu-form .init=${this.playlist} @mu-form:submit=${this._handleSubmit}>
        <label>
          <span>Title</span>
          <input name="title" .value=${this.playlist?.title || ""} />
        </label>
        <button type="submit">Save</button>
      </mu-form>
    `;
  }

  private _handleSubmit(event: Form.SubmitEvent<Playlist>) {
    this.dispatchMessage([
      "playlist/save",
      {
        playlistId: this.playlistId,
        playlist: event.detail,
        onSuccess: () =>
          History.dispatch(this, "history/navigate", {
            href: `/app/playlist/${this.playlistId}`
          }),
        onFailure: (error: Error) => console.log("ERROR:", error)
      }
    ]);
  }

  static styles = css`
    /* Add your styles here */
  `;
}

customElements.define("playlist-edit", PlaylistEditElement);
