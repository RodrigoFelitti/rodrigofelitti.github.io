// ===========================
// Configuration
// ===========================
const CONFIG = {
    projectsFile: 'data/projects.json',
    blogPostsFile: 'data/blog-posts.json',
    blogPostsDir: 'blog/'
};

// ===========================
// Navigation
// ===========================
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

// Sticky navigation
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        nav.style.background = 'rgba(10, 10, 10, 0.8)';
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle (for future implementation)
navToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// Projects Loading
// ===========================
async function loadProjects() {
    const container = document.getElementById('projectsContainer');
    if (!container) return;
    
    try {
        const response = await fetch(CONFIG.projectsFile);
        const projects = await response.json();
        
        container.innerHTML = projects.map(project => `
            <div class="project-card">
                <div class="project-header">
                    <span class="project-icon">${project.icon || '📦'}</span>
                    <div class="project-links">
                        ${project.github ? `<a href="${project.github}" target="_blank" class="project-link" title="View on GitHub">⚡</a>` : ''}
                        ${project.live ? `<a href="${project.live}" target="_blank" class="project-link" title="View Live">🔗</a>` : ''}
                    </div>
                </div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="project-tech-item">${tech}</span>`).join('')}
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading projects:', error);
        container.innerHTML = `
            <div class="project-card">
                <h3 class="project-title">Projects coming soon!</h3>
                <p class="project-description">I'm currently working on some exciting projects. Check back soon!</p>
            </div>
        `;
    }
}

// ===========================
// Blog Posts Loading
// ===========================
async function loadBlogPosts() {
    const container = document.getElementById('blogContainer');
    if (!container) return;
    
    try {
        const response = await fetch(CONFIG.blogPostsFile);
        const posts = await response.json();
        
        // Sort posts by date (newest first)
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        container.innerHTML = posts.map(post => `
            <div class="blog-card" onclick="window.location.href='blog-post.html?post=${post.slug}'">
                <div class="blog-date">${formatDate(post.date)}</div>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <div class="blog-tags">
                    ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                </div>
                <span class="blog-read-more">Read more →</span>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading blog posts:', error);
        container.innerHTML = `
            <div class="blog-card">
                <h3 class="blog-title">Blog posts coming soon!</h3>
                <p class="blog-excerpt">I'll be sharing my journey, insights, and project updates here. Stay tuned!</p>
            </div>
        `;
    }
}

// ===========================
// Individual Blog Post Loading
// ===========================
async function loadBlogPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postSlug = urlParams.get('post');
    
    if (!postSlug) {
        window.location.href = 'index.html#blog';
        return;
    }
    
    try {
        // Load post metadata
        const metaResponse = await fetch(CONFIG.blogPostsFile);
        const posts = await metaResponse.json();
        const postMeta = posts.find(p => p.slug === postSlug);
        
        if (!postMeta) {
            throw new Error('Post not found');
        }
        
        // Load markdown content
        const contentResponse = await fetch(`${CONFIG.blogPostsDir}${postSlug}.md`);
        const markdown = await contentResponse.text();
        
        // Convert markdown to HTML
        const htmlContent = marked.parse(markdown);
        
        // Update page
        document.title = `${postMeta.title} - Rodrigo Felitti`;
        
        const container = document.querySelector('.blog-post-container');
        if (container) {
            container.innerHTML = `
                <a href="index.html#blog" class="back-to-blog">← Back to Blog</a>
                <article class="blog-post">
                    <header class="blog-post-header">
                        <h1 class="blog-post-title">${postMeta.title}</h1>
                        <div class="blog-post-meta">
                            <span class="blog-date">${formatDate(postMeta.date)}</span>
                            <span>•</span>
                            <span>${postMeta.readTime || '5 min read'}</span>
                        </div>
                        <div class="blog-tags">
                            ${postMeta.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                        </div>
                    </header>
                    <div class="blog-post-content">
                        ${htmlContent}
                    </div>
                </article>
            `;
        }
    } catch (error) {
        console.error('Error loading blog post:', error);
        const container = document.querySelector('.blog-post-container');
        if (container) {
            container.innerHTML = `
                <a href="index.html#blog" class="back-to-blog">← Back to Blog</a>
                <h1>Post not found</h1>
                <p>Sorry, this blog post doesn't exist or couldn't be loaded.</p>
            `;
        }
    }
}

// ===========================
// Utility Functions
// ===========================
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// ===========================
// Intersection Observer for Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll('.section-title, .project-card, .blog-card');
    elementsToObserve.forEach(el => observer.observe(el));
});

// ===========================
// Page-specific initialization
// ===========================
if (window.location.pathname.includes('blog-post.html')) {
    // Blog post page
    document.addEventListener('DOMContentLoaded', loadBlogPost);
} else {
    // Main page
    document.addEventListener('DOMContentLoaded', () => {
        loadProjects();
        loadBlogPosts();
    });
}

// ===========================
// Scroll to top on page load
// ===========================
window.addEventListener('load', () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);
});