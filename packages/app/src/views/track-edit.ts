import { define, Form, History, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { Track } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";

export class TrackEditElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element
  });

  @property({ attribute: "track-id", reflect: true })
  trackId = "";

  @property()
  get track(): Track | undefined {
    return this.model.track;
  }

  render() {
    return html`
      <mu-form .init=${this.track} @mu-form:submit=${this._handleSubmit}>
        <label>
          <span>Title</span>
          <input name="title" .value=${this.track?.title || ""} />
        </label>
        <button type="submit">Save</button>
      </mu-form>
    `;
  }

  private _handleSubmit(event: Form.SubmitEvent<Track>) {
    this.dispatchMessage([
      "track/save",
      {
        trackId: this.trackId,
        track: event.detail,
        onSuccess: () =>
          History.dispatch(this, "history/navigate", {
            href: `/app/track/${this.trackId}`
          }),
        onFailure: (error: Error) => console.log("ERROR:", error)
      }
    ]);
  }

  static styles = css`
    /* Add your styles here */
  `;
}

customElements.define("track-edit", TrackEditElement);
