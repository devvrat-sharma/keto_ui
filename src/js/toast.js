/* ==========================================================================
   Keto UI — Toast Notifications
   window.Keto.toast() API for showing dismissable notifications.
   ========================================================================== */

(function () {
  let container;

  function getContainer() {
    if (container && document.body.contains(container)) return container;
    container = document.createElement('div');
    container.id = 'k-toast-container';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-relevant', 'additions');
    document.body.appendChild(container);
    return container;
  }

  function toast(message, options = {}) {
    const {
      type = 'default',
      duration = 4000,
      persistent = false,
      position = 'top-right',
    } = options;

    const wrap = getContainer();
    wrap.dataset.position = position;

    const el = document.createElement('div');
    el.className = 'k-toast';
    el.dataset.type = type;
    el.setAttribute('role', 'alert');

    // Subtle Apple-style icons if desired (or unicode)
    const icons = {
      success: '✓',
      danger: '✕',
      warning: '⚠',
      info: 'ℹ',
      default: '',
    };

    const icon = icons[type] || '';
    el.innerHTML = `
      ${icon ? `<span class="k-toast-icon">${icon}</span>` : ''}
      <span class="k-toast-msg">${message}</span>
      <button class="k-toast-close" aria-label="Close">×</button>
    `;

    el.querySelector('.k-toast-close').addEventListener('click', () => dismiss(el));
    wrap.appendChild(el);

    requestAnimationFrame(() => el.classList.add('k-toast-show'));

    if (!persistent) {
      el._timer = setTimeout(() => dismiss(el), duration);
    }

    return el;
  }

  function dismiss(el) {
    if (el._timer) clearTimeout(el._timer);
    el.classList.remove('k-toast-show');
    el.classList.add('k-toast-hide');
    el.addEventListener('animationend', () => el.remove(), { once: true });
    setTimeout(() => { if (el.parentNode) el.remove(); }, 500);
  }

  function injectStyles() {
    if (document.getElementById('k-toast-style')) return;
    const style = document.createElement('style');
    style.id = 'k-toast-style';
    style.textContent = `
      #k-toast-container {
        position: fixed;
        z-index: var(--k-z-toast);
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        pointer-events: none;
        max-width: 24rem;
        width: 100%;
      }
      #k-toast-container[data-position="top-right"], #k-toast-container:not([data-position]) { top: 1.5rem; right: 1.5rem; }
      #k-toast-container[data-position="top-left"] { top: 1.5rem; left: 1.5rem; }
      #k-toast-container[data-position="bottom-right"] { bottom: 1.5rem; right: 1.5rem; }
      #k-toast-container[data-position="bottom-left"] { bottom: 1.5rem; left: 1.5rem; }
      #k-toast-container[data-position="top-center"] { top: 1.5rem; left: 50%; transform: translateX(-50%); }
      
      .k-toast {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.875rem 1.25rem;
        background-color: var(--k-glass-bg-heavy);
        backdrop-filter: blur(var(--k-glass-blur-heavy));
        -webkit-backdrop-filter: blur(var(--k-glass-blur-heavy));
        border: 1px solid var(--k-glass-border-heavy);
        border-radius: var(--k-rad-xl);
        box-shadow: var(--k-glass-shadow-lg), var(--k-glass-highlight);
        font-size: 0.9375rem;
        pointer-events: auto;
        opacity: 0;
        transform: translateY(-20px) scale(0.9);
        transition: opacity 0.4s var(--k-ease-spring-bouncy), transform 0.4s var(--k-ease-spring-bouncy);
      }
      .k-toast.k-toast-show { opacity: 1; transform: translateY(0) scale(1); }
      .k-toast.k-toast-hide { opacity: 0; transform: translateY(-20px) scale(0.9); transition: opacity 0.3s var(--k-ease), transform 0.3s var(--k-ease-in); }
      
      .k-toast[data-type="success"] { border-left: 3px solid var(--k-success); }
      .k-toast[data-type="danger"] { border-left: 3px solid var(--k-danger); }
      .k-toast[data-type="warning"] { border-left: 3px solid var(--k-warning); }
      .k-toast[data-type="info"] { border-left: 3px solid var(--k-info); }
      
      .k-toast-icon { font-size: 1.125rem; line-height: 1; flex-shrink: 0; }
      .k-toast[data-type="success"] .k-toast-icon { color: var(--k-success); }
      .k-toast[data-type="danger"] .k-toast-icon { color: var(--k-danger); }
      .k-toast[data-type="warning"] .k-toast-icon { color: var(--k-warning); }
      .k-toast[data-type="info"] .k-toast-icon { color: var(--k-info); }
      
      .k-toast-msg { flex: 1; color: var(--k-text); font-weight: 500; }
      .k-toast-close {
        background: none;
        border: none;
        color: var(--k-text-sec);
        cursor: pointer;
        font-size: 1.25rem;
        padding: 0;
        line-height: 1;
        flex-shrink: 0;
        transition: color 0.2s;
      }
      .k-toast-close:hover { color: var(--k-text); }
    `;
    document.head.appendChild(style);
  }

  injectStyles();

  window.Keto = window.Keto || {};
  window.Keto.toast = toast;
})();
