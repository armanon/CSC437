import { define, Form, History, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { User } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";

export class UserEditElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element
  });

  @property({ attribute: "user-id", reflect: true })
  userId = "";

  @property()
  get user(): User | undefined {
    return this.model.user;
  }

  render() {
    return html`
      <mu-form .init=${this.user} @mu-form:submit=${this._handleSubmit}>
        <label>
          <span>Name</span>
          <input name="name" .value=${this.user?.name || ""} />
        </label>
        <button type="submit">Save</button>
      </mu-form>
    `;
  }

  private _handleSubmit(event: Form.SubmitEvent<User>) {
    this.dispatchMessage([
      "user/save",
      {
        userId: this.userId,
        user: event.detail,
        onSuccess: () =>
          History.dispatch(this, "history/navigate", {
            href: `/app/user/${this.userId}`
          }),
        onFailure: (error: Error) => console.log("ERROR:", error)
      }
    ]);
  }

  static styles = css`
    /* Add your styles here */
  `;
}

customElements.define("user-edit", UserEditElement);
