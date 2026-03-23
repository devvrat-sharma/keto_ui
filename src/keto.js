/* ==========================================================================
   Keto UI — JS Entry
   Loads all Web Components and interactive helpers.
   
   Usage: <script src="src/keto.js" defer></script>
   
   Or load individual components:
   <script src="src/js/tabs.js" defer></script>
   ========================================================================== */

(function () {
  const scripts = [
    'js/tabs.js',
    'js/dropdown.js',
    'js/modal.js',
    'js/accordion.js',
    'js/toast.js',
  ];

  const currentScript = document.currentScript;
  const basePath = currentScript ? currentScript.src.replace(/keto\.js$/, '') : './src/';

  scripts.forEach(src => {
    const script = document.createElement('script');
    script.src = basePath + src;
    script.defer = true;
    document.head.appendChild(script);
  });

  window.Keto = window.Keto || {};
  window.Keto.version = '0.1.2';
})();
