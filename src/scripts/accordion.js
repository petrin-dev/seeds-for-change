// ─── ACCORDION ───────────────────────────────────────────────────────────────
// Manages .accordion__trigger / .accordion__body pairs.
// First accordion is open by default (aria-expanded="true" in HTML);
// this script sets its max-height on load and handles subsequent toggles.

document.addEventListener('DOMContentLoaded', () => {
  const triggers = document.querySelectorAll('.accordion__trigger');

  // Initialise open state from HTML aria-expanded attribute
  // NOTE: button is wrapped in h3.accordion__heading, so we walk up to
  // .accordion and find the body from there — not via nextElementSibling.
  triggers.forEach(trigger => {
    const body = trigger.closest('.accordion').querySelector('.accordion__body');
    if (!body) return;

    if (trigger.getAttribute('aria-expanded') === 'true') {
      body.style.maxHeight = body.scrollHeight + 'px';
    }

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        // Close
        trigger.setAttribute('aria-expanded', 'false');
        body.style.maxHeight = '0';
      } else {
        // Close all others first
        triggers.forEach(other => {
          if (other !== trigger) {
            other.setAttribute('aria-expanded', 'false');
            const otherBody = other.closest('.accordion').querySelector('.accordion__body');
            if (otherBody) otherBody.style.maxHeight = '0';
          }
        });
        // Open this one
        trigger.setAttribute('aria-expanded', 'true');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
});
