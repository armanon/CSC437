import { View, Message } from "@calpoly/mustang";
import { html, TemplateResult } from "lit";
import { property } from "lit/decorators.js";

export abstract class BaseViewElement<TModel extends object, TMsg extends Message.Base, TField> extends View<TModel, TMsg> {
  @property({ attribute: "id", reflect: true })
  id = "";

  constructor() {
    super("musik:model");
  }

    attributeChangedCallback(
        name: string,
        oldValue: string,
        newValue: string
    ) {
        console.log ({
            name,
            oldValue,
            newValue
        })
        if (
            name === "id" && oldValue !== newValue
        ) {
            const value = newValue && newValue !== '' ? newValue : null;
            const msg = this.getMessage(value);
            this.dispatchMessage(msg);
        }

        super.attributeChangedCallback(name, oldValue, newValue);
    }

    render() {
        return html`
<div>
   ${this.getValues().map(this.renderValue)}
</div>
`;
    }


    abstract getMessage(value: string | null): TMsg;
    abstract getValues(): Array<TField>
    abstract renderValue(value: TField): TemplateResult<1>;
}
