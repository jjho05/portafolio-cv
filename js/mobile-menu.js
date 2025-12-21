// SIMPLE MOBILE MENU - Direct and clean
console.log('🔧 Loading mobile menu...');

// Wait for DOM
window.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    console.log('navToggle:', navToggle);
    console.log('navMenu:', navMenu);

    if (!navToggle || !navMenu) {
        console.error('❌ Menu elements not found!');
        return;
    }

    console.log('✅ Menu elements found!');

    // Toggle menu
    navToggle.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();

        const isActive = navMenu.classList.toggle('active');
        console.log('Menu toggled:', isActive);

        // Change icon
        const icon = navToggle.querySelector('i');
        if (icon) {
            icon.className = isActive ? 'fas fa-times' : 'fas fa-bars';
        }
    };

    // Close on link click
    const links = navMenu.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.onclick = function () {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        };
    });

    console.log('✅ Mobile menu initialized!');
});
