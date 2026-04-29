document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('details[class*="is-style-"]').forEach(details => {
        const summary = details.querySelector('summary');

        summary.addEventListener('click', (e) => {
            if (details.hasAttribute('open')) {
                e.preventDefault();
                details.classList.add('closing');
            }
        });

        // Keyframe-based close (plus-minus, lg-plus-minus)
        details.addEventListener('animationend', (e) => {
            if (e.animationName === 'close') {
                details.removeAttribute('open');
                details.classList.remove('closing');
            }
        });

        // Transition-based close (faq, submenu)
        details.addEventListener('transitionend', (e) => {
            if (e.propertyName === 'opacity' && details.classList.contains('closing')) {
                details.removeAttribute('open');
                details.classList.remove('closing');
            }
        });

        // Prevent clicks within details content from triggering close
        details.addEventListener('click', (e) => {
            if (e.target !== summary && !summary.contains(e.target)) {
                e.stopPropagation();
            }
        });
    });
});
