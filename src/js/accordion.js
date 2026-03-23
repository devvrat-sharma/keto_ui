/* ==========================================================================
   Keto UI — Accordion Web Component
   <k-accordion> with exclusive open via <details>/<summary>.
   ========================================================================== */

class KetoAccordion extends HTMLElement {
  connectedCallback() {
    this._exclusive = this.hasAttribute('data-exclusive');
    this._details = Array.from(this.querySelectorAll('details'));

    if (this._exclusive) {
      this._details.forEach(detail => {
        detail.addEventListener('toggle', () => {
          if (detail.open) {
            this._details.forEach(d => {
              if (d !== detail && d.open) d.removeAttribute('open');
            });
          }
        });
      });
    }

    this._injectStyles();
  }

  _injectStyles() {
    if (document.getElementById('k-accordion-style')) return;
    const style = document.createElement('style');
    style.id = 'k-accordion-style';
    style.textContent = `
      k-accordion {
        display: block;
        border: 1px solid var(--k-border);
        border-radius: var(--k-rad);
        overflow: hidden;
        background-color: var(--k-surface);
      }
      k-accordion details {
        margin-bottom: 0;
        border-bottom: 1px solid var(--k-border);
      }
      k-accordion details:last-child {
        border-bottom: none;
      }
      k-accordion summary {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--k-sp-3) var(--k-sp-4);
        cursor: pointer;
        font-weight: 500;
        font-size: 0.9375rem;
        transition: background-color var(--k-trans);
        list-style: none;
      }
      k-accordion summary::-webkit-details-marker {
        display: none;
      }
      k-accordion summary::after {
        content: "";
        width: 0.4rem;
        height: 0.4rem;
        border-right: 2px solid var(--k-text-sec);
        border-bottom: 2px solid var(--k-text-sec);
        transform: rotate(-45deg);
        transition: transform var(--k-trans);
      }
      k-accordion details[open] summary::after {
        transform: rotate(45deg);
      }
      k-accordion summary:hover {
        background-color: var(--k-surface-alt);
      }
      k-accordion details > :not(summary) {
        padding: 0 var(--k-sp-4) var(--k-sp-4);
        color: var(--k-text-sec);
        font-size: 0.875rem;
        line-height: 1.6;
      }
    `;
    document.head.appendChild(style);
  }
}

if (!customElements.get('k-accordion')) customElements.define('k-accordion', KetoAccordion);
