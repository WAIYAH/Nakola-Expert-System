/* ============================================================
   Content Protection — Nakola Expert Systems
   Deters casual copying of website content.
   ============================================================ */

export function initContentProtection() {
  disableContextMenu();
  disableCopyShortcuts();
  disableDragDrop();
  disableTextSelection();
  disablePrintShortcut();
}

/** Block right-click context menu on the page */
function disableContextMenu() {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
}

/** Block common keyboard shortcuts used for copying / viewing source */
function disableCopyShortcuts() {
  document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    // Ctrl+C / Ctrl+A / Ctrl+U (view source) / Ctrl+S (save) / Ctrl+P (print)
    if (e.ctrlKey && ['c', 'a', 'u', 's', 'p'].includes(key)) {
      e.preventDefault();
    }

    // Ctrl+Shift+I (DevTools) / Ctrl+Shift+J (Console) / Ctrl+Shift+C (Inspect)
    if (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(key)) {
      e.preventDefault();
    }

    // F12 (DevTools)
    if (e.key === 'F12') {
      e.preventDefault();
    }
  });
}

/** Prevent drag-and-drop of images and links */
function disableDragDrop() {
  document.addEventListener('dragstart', (e) => {
    e.preventDefault();
  });
}

/** Apply CSS-based text selection prevention */
function disableTextSelection() {
  document.body.style.userSelect = 'none';
  document.body.style.webkitUserSelect = 'none';
  document.body.style.msUserSelect = 'none';

  // Allow selection inside form inputs and textareas so users can still type
  const style = document.createElement('style');
  style.textContent = `
    input, textarea, [contenteditable="true"] {
      -webkit-user-select: text !important;
      user-select: text !important;
    }
  `;
  document.head.appendChild(style);
}

/** Block Ctrl+P print shortcut (CSS @media print is handled in main.css) */
function disablePrintShortcut() {
  window.addEventListener('beforeprint', (e) => {
    e.preventDefault();
  });
}
