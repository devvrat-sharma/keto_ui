/* ==========================================================================
   Keto UI — Modal JS Helper
   Attribute-driven dialog open/close using data-modal-open & data-modal-close.
   Provides smooth out-animations by adding a "closing" class.
   ========================================================================== */

(function () {
  function injectStyles() {
    if (document.getElementById('k-modal-js-style')) return;
    const style = document.createElement('style');
    style.id = 'k-modal-js-style';
    style.textContent = `
      dialog.k-modal-closing {
        animation: k-modal-out 0.25s var(--k-ease-in) forwards;
      }
      dialog.k-modal-closing::backdrop {
        animation: k-fade-out 0.25s var(--k-ease-in) forwards;
      }
      @keyframes k-modal-out {
        from { opacity: 1; transform: scale(1) translateY(0); }
        to { opacity: 0; transform: scale(0.95) translateY(10px); }
      }
      @keyframes k-fade-out {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  function closeDialog(dialog) {
    dialog.classList.add('k-modal-closing');
    dialog.addEventListener('animationend', () => {
      dialog.classList.remove('k-modal-closing');
      dialog.close();
    }, { once: true });
  }

  function initModals() {
    injectStyles();

    document.addEventListener('click', (e) => {
      // Open
      const openBtn = e.target.closest('[data-modal-open]');
      if (openBtn) {
        const dialogId = openBtn.getAttribute('data-modal-open');
        const dialog = document.getElementById(dialogId);
        if (dialog && dialog.tagName === 'DIALOG') dialog.showModal();
        return;
      }

      // Close
      const closeBtn = e.target.closest('[data-modal-close]');
      if (closeBtn) {
        const dialog = closeBtn.closest('dialog');
        if (dialog) closeDialog(dialog);
        return;
      }
    });

    // Close on backdrop
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'DIALOG' && e.target.open) {
        const rect = e.target.getBoundingClientRect();
        if (
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom
        ) {
          closeDialog(e.target);
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModals);
  } else {
    initModals();
  }
})();
