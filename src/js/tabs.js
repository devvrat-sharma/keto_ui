/* ==========================================================================
   Keto UI — Tabs Web Component
   <k-tabs> with ARIA roles and keyboard navigation.
   ========================================================================== */

class KetoTabs extends HTMLElement {
  connectedCallback() {
    this._tabs = Array.from(this.querySelectorAll('[slot="tab"]'));
    this._panels = Array.from(this.querySelectorAll('[slot="panel"]'));

    this.setAttribute('role', 'tablist');
    this._tabs.forEach((tab, i) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('tabindex', i === 0 ? '0' : '-1');
      tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      
      const panelId = tab.dataset.panel;
      tab.setAttribute('aria-controls', panelId);
      tab.id = tab.id || `k-tab-${panelId}`;

      tab.addEventListener('click', () => this._select(tab));
      tab.addEventListener('keydown', (e) => this._onKeyDown(e, i));
    });

    this._panels.forEach((panel, i) => {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('tabindex', '0');
      const tab = this._tabs[i];
      panel.setAttribute('aria-labelledby', tab ? tab.id : '');
      panel.hidden = i !== 0;
    });

    if (this._tabs.length) this._tabs[0].classList.add('active');
    this._injectStyles();
  }

  _select(selectedTab) {
    this._tabs.forEach(tab => {
      const isSelected = tab === selectedTab;
      tab.setAttribute('aria-selected', String(isSelected));
      tab.setAttribute('tabindex', isSelected ? '0' : '-1');
      tab.classList.toggle('active', isSelected);
    });
    this._panels.forEach(panel => {
      panel.hidden = panel.id !== selectedTab.dataset.panel;
    });
    selectedTab.focus();
  }

  _onKeyDown(e, index) {
    let newIndex;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      newIndex = (index + 1) % this._tabs.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      newIndex = (index - 1 + this._tabs.length) % this._tabs.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      newIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      newIndex = this._tabs.length - 1;
    }

    if (newIndex !== undefined) this._select(this._tabs[newIndex]);
  }

  _injectStyles() {
    if (document.getElementById('k-tabs-style')) return;
    const style = document.createElement('style');
    style.id = 'k-tabs-style';
    style.textContent = `
      k-tabs { display: block; }
      k-tabs [slot="tab"] {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        font-size: 0.9375rem;
        font-weight: 500;
        color: var(--k-text-sec);
        background: none;
        border: none;
        border-bottom: 2px solid transparent;
        cursor: pointer;
        transition: color var(--k-trans), border-color var(--k-trans);
        margin-bottom: -1px;
      }
      k-tabs [slot="tab"]:hover { color: var(--k-text); }
      k-tabs [slot="tab"].active,
      k-tabs [slot="tab"][aria-selected="true"] {
        color: var(--k-primary);
        border-bottom-color: var(--k-primary);
      }
      k-tabs [slot="panel"] { padding: var(--k-sp-4) 0; }
      k-tabs::after {
        content: "";
        display: block;
        border-bottom: 1px solid var(--k-border);
      }
    `;
    document.head.appendChild(style);
  }
}

if (!customElements.get('k-tabs')) customElements.define('k-tabs', KetoTabs);
