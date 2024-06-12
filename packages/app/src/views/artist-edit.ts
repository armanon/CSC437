import { define, Form, History, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { Artist } from "server/models/artist";
import { Msg } from "../messages";
import { Model } from "../model";

export class ArtistEditElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element
  });

  @property({ attribute: "artist-id", reflect: true })
  artistId = "";

  @property()
  get artist(): Artist | undefined {
    return this.model.artists[0];
  }

  render() {
    return html`
      <mu-form .init=${this.artist} @mu-form:submit=${this._handleSubmit}>
        <label>
          <span>Name</span>
          <input name="name" .value=${this.artist?.name || ""} />
        </label>
        <button type="submit">Save</button>
      </mu-form>
    `;
  }

  private _handleSubmit(event: Form.SubmitEvent<Artist>) {
    this.dispatchMessage([
      "artist/save",
      {
        artistId: this.artistId,
        artist: event.detail,
        onSuccess: () =>
          History.dispatch(this, "history/navigate", {
            href: `/app/artist/${this.artistId}`
          }),
        onFailure: (error: Error) => console.log("ERROR:", error)
      }
    ]);
  }

  static styles = css`
    /* Add your styles here */
  `;
}

customElements.define("artist-edit", ArtistEditElement);
