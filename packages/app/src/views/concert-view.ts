// src/views/concert-view.ts
import { define, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Concert } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";

export class ConcertViewElement extends View<Model, Msg> {
  @property({ attribute: "concert-id", reflect: true })
  concertid = "";

  @state()
  locationFilter: string = "all";

  @property()
  get concerts(): Concert[] {
    return this.model.concerts || [];
  }

  constructor() {
    super("musik:model");
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("location-filter-change", (event: CustomEvent) => {
      this.locationFilter = event.detail.location;
    });
  }

  render() {
    const filteredConcerts = this.locationFilter === "all" ? this.concerts : this.concerts.filter(concert => concert.location === this.locationFilter);
    return html`
      <div>
        <label for="locationFilter">Filter by location:</label>
        <select id="locationFilter" @change=${this.onLocationChange}>
          <option value="all">All</option>
          ${this.concerts.map(
            concert => html`
              <option value="${concert.location}">${concert.location}</option>
            `
          )}
        </select>
        <ul>
          ${filteredConcerts.map(
            concert => html`
              <li>
                ${concert.name}
                <a href="/app/concert/${concert._id}/edit">Edit</a>
              </li>
            `
          )}
        </ul>
      </div>
    `;
  }

  onLocationChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.dispatchEvent(new CustomEvent("location-filter-change", {
      detail: { location: select.value },
      bubbles: true,
      composed: true
    }));
  }
}

