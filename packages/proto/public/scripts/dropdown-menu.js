// file: dropdown-menu.js
class DropdownMenu extends HTMLElement {
    constructor() {
        super(); // always call super() first in the constructor.
        this.attachShadow({ mode: 'open' }); // Attach a shadow root to the element.
        this.shadowRoot.innerHTML = `
            <style>
                #panel {
                    display: none;
                    position: absolute;
                    background-color: white;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    border: 1px solid #ddd;
                    padding: 10px;
                    z-index: 1000;
                }
                :host([open]) #panel {
                    display: block;
                }
            </style>
            <slot name="button">Dropdown</slot>
            <div id="panel">
                <slot name="content"></slot>
            </div>
        `;
    }

    connectedCallback() {
        this._toggle = this.shadowRoot.querySelector('slot[name="button"]').assignedNodes()[0];
        this._toggle.addEventListener('click', () => {
            this.toggle();
        });
    }

    toggle() {
        this.hasAttribute('open') ? this.removeAttribute('open') : this.setAttribute('open', '');
    }

    static get observedAttributes() {
        return ['open'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'open' && this.shadowRoot) {
            const panel = this.shadowRoot.querySelector('#panel');
            if (newValue !== null) {
                panel.style.display = 'block';
            } else {
                panel.style.display = 'none';
            }
        }
    }
}

customElements.define('dropdown-menu', DropdownMenu);
