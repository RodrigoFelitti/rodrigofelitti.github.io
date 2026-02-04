# Developer Portfolio Website

A minimal, dark-themed portfolio website with smooth animations, built for showcasing your software development journey, projects, and blog posts.

## Features

- ✨ **Smooth Animations** - Engaging scroll animations and micro-interactions
- 🎨 **Dark Minimal Design** - Professional aesthetic with a modern color palette
- 📱 **Fully Responsive** - Works seamlessly on all devices
- 📝 **Markdown Blog** - Write blog posts in Markdown, rendered dynamically
- 🚀 **Easy to Update** - Simple JSON configuration for projects and posts
- 🔗 **GitHub Pages Ready** - Optimized for free hosting

## Project Structure

```
portfolio/
├── index.html              # Main homepage
├── blog-post.html          # Individual blog post page
├── styles.css              # All styling with animations
├── script.js               # Dynamic content loading
├── data/
│   ├── projects.json       # Your projects data
│   └── blog-posts.json     # Blog posts metadata
└── blog/
    ├── post-slug-1.md      # Blog post content
    ├── post-slug-2.md
    └── post-slug-3.md
```

## Quick Start

### 1. Customize Your Information

Edit `index.html` and replace:
- `Your Name` with your actual name
- `your.email@example.com` with your email
- Social media links (GitHub, LinkedIn, Twitter)
- About section text
- Tech stack items

### 2. Add Your Projects

Edit `data/projects.json`:

```json
{
  "title": "Your Project Name",
  "description": "What your project does",
  "icon": "🚀",
  "github": "https://github.com/username/repo",
  "live": "https://demo-url.com",
  "technologies": ["React", "Node.js", "MongoDB"]
}
```

### 3. Create Blog Posts

#### Step 1: Add metadata to `data/blog-posts.json`

```json
{
  "slug": "my-post-slug",
  "title": "My Post Title",
  "date": "2024-02-01",
  "excerpt": "A brief summary...",
  "tags": ["tag1", "tag2"],
  "readTime": "5 min read"
}
```

#### Step 2: Create the markdown file in `blog/`

Create `blog/my-post-slug.md`:

```markdown
# My Post Title

Your content here in Markdown format...

## Subheading

- List item 1
- List item 2

Code blocks:
\`\`\`javascript
const hello = "world";
\`\`\`
```

**Important**: The `slug` in the JSON must match the markdown filename!

## Markdown Features Supported

- Headers (h1-h6)
- Bold and italic text
- Links
- Lists (ordered and unordered)
- Code blocks with syntax highlighting
- Inline code
- Blockquotes
- Images (use relative paths)

## GitHub Pages Deployment

### Option 1: Deploy with GitHub Pages (Recommended)

1. **Create a new GitHub repository**
   ```bash
   # Initialize git if you haven't already
   git init
   git add .
   git commit -m "Initial commit: Portfolio website"
   ```

2. **Push to GitHub**
   ```bash
   # Replace 'username' with your GitHub username
   git remote add origin https://github.com/username/username.github.io.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click `Settings` → `Pages`
   - Under "Source", select `main` branch
   - Click `Save`
   - Your site will be live at: `https://username.github.io`

### Option 2: Deploy to a Project Repository

If you want `https://username.github.io/portfolio`:

1. Create a repository named `portfolio` (or any name)
2. Push your code
3. In Settings → Pages, select the `main` branch
4. Your site will be at: `https://username.github.io/portfolio`

**Note**: If using a project repository, update all your links to include the base path:
```html
<link rel="stylesheet" href="/portfolio/styles.css">
<script src="/portfolio/script.js"></script>
```

## Local Development

To test your website locally:

1. **Using Python** (built-in):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Then visit: http://localhost:8000
   ```

2. **Using Node.js**:
   ```bash
   npx serve
   # or
   npm install -g live-server
   live-server
   ```

3. **Using VS Code**:
   - Install the "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

## Customization Guide

### Change Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --bg-primary: #0a0a0a;        /* Main background */
    --accent-primary: #00ff88;     /* Primary accent color */
    --accent-secondary: #00ccff;   /* Secondary accent color */
}
```

### Modify Fonts

The site uses:
- **Syne** for headings (display font)
- **JetBrains Mono** for body text (monospace)

To change fonts, update the Google Fonts link in `index.html` and the CSS variables.

### Add More Sections

To add a new section:

1. Add HTML to `index.html`:
```html
<section id="new-section" class="new-section">
    <div class="container">
        <h2 class="section-title">
            <span class="title-number">05.</span>
            <span>New Section</span>
        </h2>
        <!-- Your content -->
    </div>
</section>
```

2. Add styles in `styles.css`
3. Add navigation link

### Animations

Animations are CSS-based for performance. To modify:
- Adjust `--transition-*` variables for speed
- Edit `@keyframes` definitions
- Change `animation-delay` values for staggered effects

## Content Management

### Adding a New Project

1. Open `data/projects.json`
2. Add a new object to the array:
```json
{
  "title": "New Project",
  "description": "Description here",
  "icon": "🎯",
  "github": "https://github.com/...",
  "live": "https://...",
  "technologies": ["Tech1", "Tech2"]
}
```
3. Save and refresh - it appears automatically!

### Adding a New Blog Post

1. Create `blog/your-post-slug.md` with your content
2. Add metadata to `data/blog-posts.json`:
```json
{
  "slug": "your-post-slug",
  "title": "Your Post Title",
  "date": "2024-02-04",
  "excerpt": "Summary...",
  "tags": ["tag1"],
  "readTime": "5 min read"
}
```
3. Done! The post appears in your blog section

### Blog Post Writing Tips

- Use descriptive titles
- Write clear excerpts (2-3 sentences)
- Choose relevant tags
- Include code examples with syntax highlighting
- Add images to your blog folder and reference them relatively

## Troubleshooting

### Blog posts not loading?
- Check that the `slug` matches the filename exactly
- Ensure `blog-posts.json` is valid JSON
- Check browser console for errors

### Projects not showing?
- Validate your `projects.json` syntax
- Ensure the file is in the `data/` folder
- Check for typos in field names

### CSS not loading on GitHub Pages?
- Ensure all paths are correct (use relative paths)
- Clear browser cache
- Check GitHub Actions for build errors

### Animations not smooth?
- Reduce `animation-delay` values
- Simplify complex animations
- Check browser performance

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Performance

- Lightweight (~50KB total)
- No external dependencies except Google Fonts and Marked.js
- Optimized images recommended (compress before uploading)
- Lazy loading for blog posts

## SEO Tips

1. Add meta descriptions to each HTML page
2. Use semantic HTML (already implemented)
3. Add alt text to images
4. Submit your sitemap to Google Search Console
5. Update page titles for each section

## Credits

- **Fonts**: Google Fonts (Syne, JetBrains Mono)
- **Markdown Parser**: Marked.js
- **Design**: Custom minimal dark theme

## License

Feel free to use this template for your own portfolio! No attribution required.

## Support

Having issues? Here's how to get help:

1. Check this README thoroughly
2. Review the code comments
3. Search GitHub Issues
4. Reach out via GitHub Discussions

## Next Steps

1. ✅ Customize your information
2. ✅ Add your projects
3. ✅ Write your first blog post
4. ✅ Deploy to GitHub Pages
5. ✅ Share with recruiters!

Good luck with your developer journey! 🚀
