# Portfolio Website Template

A clean, modern, responsive portfolio website template with a pink/purple theme. Built with vanilla HTML, CSS, and JavaScript — no frameworks required.

## ✨ Features

- **Modern Design** — Clean, elegant aesthetic with pink/purple gradient theme
- **Fully Responsive** — Works beautifully on mobile, tablet, and desktop
- **Dark Mode Support** — Automatically adapts to system preference
- **Smooth Animations** — Subtle scroll animations and hover effects
- **Accessible** — Semantic HTML, ARIA labels, focus states, reduced motion support
- **Performance Optimized** — Minimal dependencies, lazy loading ready
- **Easy to Customize** — Well-organized CSS variables for theming

## 🚀 Quick Start

```bash
# Navigate to the portfolio directory
cd portfolio-website

# Open in browser (or use a local server)
# Option 1: Double-click index.html
# Option 2: Use a local server (recommended)
npx serve .
# or
python -m http.server 8000
```

## 🎨 Customization Guide

### 1. Personal Information

Edit `index.html` and replace all placeholder content:

```html
<!-- Hero Section -->
<h1 class="hero-name">Your Actual Name</h1>
<p class="hero-title">Your Title — e.g., Full Stack Developer</p>

<!-- About Section -->
<p>I'm a [your role] based in [your location] with [X] years of experience...</p>

<!-- Stats -->
<span class="stat-number">50+</span>
<span class="stat-label">Projects Completed</span>

<!-- Social Links -->
<a href="https://github.com/your-username" target="_blank" rel="noopener" aria-label="GitHub">
<a href="https://linkedin.com/in/your-username" target="_blank" rel="noopener" aria-label="LinkedIn">
<a href="https://twitter.com/your-username" target="_blank" rel="noopener" aria-label="Twitter">
<a href="mailto:your@email.com" aria-label="Email">

<!-- Contact Form -->
<!-- Update form action or integrate with Formspree/Netlify -->
```

### 2. Projects

Replace the three project cards in the Projects section:

```html
<article class="project-card">
    <div class="project-image">
        <!-- Add real screenshot or keep placeholder -->
        <img src="images/project1.jpg" alt="Project Name screenshot" loading="lazy">
    </div>
    <div class="project-content">
        <h3 class="project-title">Real Project Name</h3>
        <p class="project-description">Actual description of your project...</p>
        <div class="project-tech">
            <span class="tech-tag">React</span>
            <span class="tech-tag">TypeScript</span>
            <span class="tech-tag">Tailwind</span>
        </div>
        <div class="project-links">
            <a href="https://your-project-demo.com" class="project-link" target="_blank" rel="noopener">Live Demo</a>
            <a href="https://github.com/your-username/project" class="project-link" target="_blank" rel="noopener">Source Code</a>
        </div>
    </div>
</article>
```

### 3. Skills

Update the skills in each category to match your expertise:

```html
<div class="skill-category">
    <h3>Frontend</h3>
    <ul class="skill-list">
        <li>React / Next.js</li>
        <li>TypeScript</li>
        <li>Tailwind CSS</li>
        <!-- Add your skills -->
    </ul>
</div>
```

### 4. Theme Colors (CSS Variables)

Edit `styles.css` — all colors are defined in `:root`:

```css
:root {
    /* Primary: Hot Pink */
    --color-primary: #d63384;
    --color-primary-light: #f06292;
    --color-primary-dark: #c2185b;

    /* Secondary: Violet */
    --color-secondary: #7c3aed;
    --color-secondary-light: #a78bfa;
    --color-secondary-dark: #5b21b6;

    /* Accent */
    --color-accent: #ec4899;
}
```

**Quick color schemes:**
- **Pink/Purple (default):** `#d63384` + `#7c3aed`
- **Blue/Purple:** `#3b82f6` + `#8b5cf6`
- **Teal/Purple:** `#14b8a6` + `#a855f7`
- **Orange/Pink:** `#f97316` + `#ec4899`

### 5. Fonts

The template uses **Inter** from Google Fonts. To change:

```html
<!-- In index.html <head> -->
<link href="https://fonts.googleapis.com/css2?family=Your+Font:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

```css
/* In styles.css */
:root {
    --font-family: 'Your Font', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

### 6. Add Your Photo

Replace the placeholder in the About section:

```html
<div class="about-image">
    <img src="images/your-photo.jpg" alt="Your Name" class="profile-photo">
</div>
```

Add to `styles.css`:
```css
.profile-photo {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: var(--radius-xl);
}
```

## 📁 Project Structure

```
portfolio-website/
├── index.html      # Main HTML file
├── styles.css      # All styles (CSS variables, components, responsive)
├── script.js       # Interactions (nav, forms, animations)
├── README.md       # This file
└── images/         # Add your images here (create this folder)
    ├── project1.jpg
    ├── project2.jpg
    ├── project3.jpg
    └── your-photo.jpg
```

## 🌐 Deployment

### Netlify (Recommended - Free)
1. Push to GitHub
2. Connect repository at [netlify.com](https://netlify.com)
3. Build command: (none) | Publish directory: `.` (root)
4. Add custom domain in Netlify settings

### Vercel (Free)
1. Push to GitHub
2. Import at [vercel.com](https://vercel.com)
3. Framework: Other | Output: `.`
4. Add custom domain

### GitHub Pages (Free)
1. Push to GitHub
2. Settings → Pages → Source: Deploy from branch (main)
3. Your site at `https://username.github.io/repo-name`
4. For custom domain: add `CNAME` file with your domain

### Cloudflare Pages (Free)
1. Connect GitHub at [pages.cloudflare.com](https://pages.cloudflare.com)
2. Build: (none) | Output: `/`
3. Add custom domain

### Any Static Host
Upload the folder contents to any static host (AWS S3, Firebase Hosting, Surge.sh, etc.)

## 📝 Form Integration

The contact form works out of the box with a simulation. For real submissions:

### Formspree (Easiest)
```html
<form action="https://formspree.io/f/your-form-id" method="POST" class="contact-form">
```

### Netlify Forms
```html
<form name="contact" netlify class="contact-form">
```

### Custom Backend
Update `script.js` → `simulateFormSubmission()` function to call your API.

## ♿ Accessibility Checklist

- [ ] All images have descriptive `alt` text
- [ ] Color contrast meets WCAG AA (current theme passes)
- [ ] Focus states visible on all interactive elements
- [ ] Semantic HTML structure (header, nav, main, section, footer)
- [ ] ARIA labels on icon-only buttons/links
- [ ] Reduced motion respected
- [ ] Form labels associated with inputs

## 🔧 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

MIT License — feel free to use for personal or commercial projects.

## 🙏 Credits

- Font: [Inter](https://fonts.google.com/specimen/Inter) by Rasmus Andersson
- Icons: Inline SVGs (no external dependencies)
- Inspiration: Modern portfolio design trends

---

**Built with ❤️ for developers who want a beautiful portfolio without the bloat.**

*Happy coding! 🚀*