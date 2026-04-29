document.addEventListener('DOMContentLoaded', () => {
    // Helper function to get the header height from CSS variable
    const getHeaderHeight = () => {
        const headerHeight = getComputedStyle(document.documentElement)
            .getPropertyValue('--header-height')
            .trim();
        
        // Convert the value to a number, removing 'px' if present
        return parseInt(headerHeight) || 0;
    };

    // Handle all clicks on the page
    document.addEventListener('click', (e) => {
        // Find closest anchor tag if click was on a child element
        const anchor = e.target.closest('a');
        if (!anchor) return;

        // Check if this is an anchor link (starts with # or contains current path + #)
        const href = anchor.getAttribute('href');
        if (!href) return;

        const isAnchorLink = href.startsWith('#') || 
            href.includes(window.location.pathname + '#') ||
            (href.includes('#') && anchor.origin === window.location.origin);

        if (!isAnchorLink) return;

        // Get the target element
        const targetId = href.split('#')[1];
        const targetElement = document.getElementById(targetId);

        if (!targetElement) return;

        // Prevent default scroll behavior
        e.preventDefault();

        // Calculate the offset
        const headerHeight = getHeaderHeight();
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        // Smooth scroll to the target with offset
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });

    // Handle initial load with hash in URL
    window.addEventListener('load', () => {
        if (window.location.hash) {
            const targetElement = document.getElementById(window.location.hash.substring(1));
            if (targetElement) {
                setTimeout(() => {
                    const headerHeight = getHeaderHeight();
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }, 100); // Small delay to ensure everything is loaded
            }
        }
    });
});