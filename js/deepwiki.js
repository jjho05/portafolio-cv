// DeepWiki Link Generator
// Automatically converts GitHub URLs to DeepWiki URLs

function addDeepWikiLinks() {
    // Get all project and game cards
    const allCards = document.querySelectorAll('.project-card, .game-card');

    allCards.forEach(card => {
        const projectLinks = card.querySelector('.project-links');
        if (!projectLinks) return;

        // Find the GitHub link
        const githubLink = Array.from(projectLinks.querySelectorAll('a')).find(link =>
            link.href.includes('github.com')
        );

        if (!githubLink) return;

        // Check if DeepWiki button already exists
        if (projectLinks.querySelector('.deepwiki-btn')) return;

        // Convert GitHub URL to DeepWiki URL
        const deepwikiUrl = githubLink.href.replace('github.com', 'deepwiki.com');

        // Create DeepWiki button
        const deepwikiBtn = document.createElement('a');
        deepwikiBtn.href = deepwikiUrl;
        deepwikiBtn.target = '_blank';
        deepwikiBtn.className = 'btn btn-accent btn-sm deepwiki-btn';
        deepwikiBtn.innerHTML = `
            <i class="fas fa-book"></i>
            <span data-i18n="projects.viewDocs">Ver Docs</span>
        `;

        // Add tooltip
        deepwikiBtn.setAttribute('data-tooltip', 'Documentación AI con DeepWiki');
        deepwikiBtn.classList.add('tooltip');

        // Insert after GitHub button
        githubLink.parentNode.insertBefore(deepwikiBtn, githubLink.nextSibling);
    });
}

// Run when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addDeepWikiLinks);
} else {
    addDeepWikiLinks();
}

// Also run after language change
window.addEventListener('languageChanged', addDeepWikiLinks);

console.log('✨ DeepWiki links added to all projects!');
