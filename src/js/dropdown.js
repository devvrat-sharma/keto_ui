/* ==========================================================================
   Keto UI — Dropdown Web Component
   <k-dropdown> with toggle, outside click, and keyboard nav.
   ========================================================================== */

class KetoDropdown extends HTMLElement {
  constructor() {
    super();
    this._open = false;
  }

  connectedCallback() {
    this._trigger = this.querySelector('[slot="trigger"]');
    this._menu = this.querySelector('[slot="menu"]');

    if (!this._trigger || !this._menu) return;

    this._trigger.setAttribute('aria-haspopup', 'true');
    this._trigger.setAttribute('aria-expanded', 'false');
    this._menu.setAttribute('role', 'menu');
    this._menu.hidden = true;

    this._items = Array.from(this._menu.querySelectorAll('a, button, [role="menuitem"]'));
    this._items.forEach(item => {
      item.setAttribute('role', 'menuitem');
      item.setAttribute('tabindex', '-1');
    });

    this._trigger.addEventListener('click', () => this._toggle());
    this._onOutsideClick = (e) => {
      if (!this.contains(e.target)) this._close();
    };
    this.addEventListener('keydown', (e) => this._onKeyDown(e));

    this._injectStyles();
  }

  disconnectedCallback() {
    document.removeEventListener('click', this._onOutsideClick);
  }

  _toggle() {
    this._open ? this._close() : this._openMenu();
  }

  _openMenu() {
    this._open = true;
    this._menu.hidden = false;
    this._trigger.setAttribute('aria-expanded', 'true');
    this.classList.add('open');

    requestAnimationFrame(() => {
      const rect = this._menu.getBoundingClientRect();
      if (rect.bottom > window.innerHeight) this._menu.classList.add('k-flip');
    });

    document.addEventListener('click', this._onOutsideClick);
    if (this._items.length) this._items[0].focus();
  }

  _close() {
    this._open = false;
    this._menu.hidden = true;
    this._trigger.setAttribute('aria-expanded', 'false');
    this.classList.remove('open');
    this._menu.classList.remove('k-flip');
    document.removeEventListener('click', this._onOutsideClick);
  }

  _onKeyDown(e) {
    if (!this._open && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
      if (e.target === this._trigger) {
        e.preventDefault();
        this._openMenu();
        return;
      }
    }

    if (!this._open) return;

    const currentIndex = this._items.indexOf(document.activeElement);

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        this._close();
        this._trigger.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (currentIndex < this._items.length - 1) this._items[currentIndex + 1].focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (currentIndex > 0) this._items[currentIndex - 1].focus();
        break;
      case 'Home':
        e.preventDefault();
        this._items[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        this._items[this._items.length - 1]?.focus();
        break;
      case 'Tab':
        this._close();
        break;
    }
  }

  _injectStyles() {
    if (document.getElementById('k-dropdown-style')) return;
    const style = document.createElement('style');
    style.id = 'k-dropdown-style';
    style.textContent = `
      k-dropdown { position: relative; display: inline-block; }
      k-dropdown [slot="menu"] {
        position: absolute;
        top: calc(100% + 6px);
        left: 0;
        min-width: 14rem;
        background-color: var(--k-glass-bg-heavy);
        backdrop-filter: blur(var(--k-glass-blur-heavy));
        -webkit-backdrop-filter: blur(var(--k-glass-blur-heavy));
        border: 1px solid var(--k-glass-border-heavy);
        border-radius: var(--k-rad-xl);
        box-shadow: var(--k-glass-shadow-lg), var(--k-glass-highlight);
        padding: var(--k-sp-2) 0;
        z-index: var(--k-z-drop);
        animation: k-drop-in 0.4s var(--k-ease-spring-bouncy);
        transform-origin: top left;
      }
      k-dropdown [slot="menu"].k-flip {
        top: auto;
        bottom: calc(100% + 6px);
        transform-origin: bottom left;
      }
      k-dropdown [slot="menu"] a,
      k-dropdown [slot="menu"] button,
      k-dropdown [slot="menu"] [role="menuitem"] {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: calc(100% - 1rem);
        margin: 0 0.5rem;
        padding: 0.5rem 0.75rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--k-text);
        text-decoration: none;
        background: none;
        border: none;
        border-radius: var(--k-rad-sm);
        cursor: pointer;
        transition: background-color 0.1s var(--k-ease), transform 0.1s var(--k-ease-spring);
        text-align: left;
      }
      k-dropdown [slot="menu"] a:hover,
      k-dropdown [slot="menu"] button:hover,
      k-dropdown [slot="menu"] [role="menuitem"]:hover,
      k-dropdown [slot="menu"] a:focus,
      k-dropdown [slot="menu"] button:focus {
        background-color: var(--k-primary-light);
        color: var(--k-primary);
        outline: none;
      }
      k-dropdown [slot="menu"] a:active,
      k-dropdown [slot="menu"] button:active,
      k-dropdown [slot="menu"] [role="menuitem"]:active {
        transform: scale(0.97);
        background-color: var(--k-surface-alt);
      }
      k-dropdown [slot="menu"] hr {
        margin: var(--k-sp-1) 0;
        border-top: 1px solid var(--k-glass-border-thin);
      }
      @keyframes k-drop-in {
        from { opacity: 0; transform: scale(0.9) translateY(-10px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }
}

if (!customElements.get('k-dropdown')) customElements.define('k-dropdown', KetoDropdown);
