// src/views/user-view.ts
import { View } from "@calpoly/mustang";
import { html } from "lit";
import { property } from "lit/decorators.js";
import { User } from "server/models/user";
import { Msg } from "../messages";
import { Model } from "../model";

export class UserViewElement extends View<Model, Msg> {
  @property({ attribute: "user-id", reflect: true })
  userid = "";

  @property()
  get user(): User | undefined {
    return this.model.user;
  }

  @property()
  get users(): User[] {
    return this.model.user ? [this.model.user] : [];
  }

  constructor() {
    super("musik:model");
  }

  render() {
    return html`
      <div>
        <ul>
          ${this.users.map(
            user => html`
              <li>
                ${user.username}
                <a href="/app/user/${user._id}/edit">Edit</a>
              </li>
            `
          )}
        </ul>
      </div>
    `;
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    if (
      name === "user-id" &&
      oldValue !== newValue &&
      newValue
    ) {
      this.dispatchMessage([
        "user/select",
        { userId: newValue }
      ]);
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }
}


