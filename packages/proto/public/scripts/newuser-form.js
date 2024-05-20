// proto/public/scripts/newuser-form.js
import { prepareTemplate } from "./template.js";
import "./restful-form.js";

export class NewUserFormElement extends HTMLElement {
  static template = prepareTemplate(`
    <template>
      <restful-form new src="/auth/register">
        <slot></slot>
      </restful-form>
    </template>
  `);

  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      NewUserFormElement.template.cloneNode(true)
    );
  }
}

customElements.define("newuser-form", NewUserFormElement);
