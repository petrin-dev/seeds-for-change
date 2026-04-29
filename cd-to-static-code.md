# cd-to-static-code: Implementation Recipe

When starting a new static site build, check for `cd-static-handoff.md`. That file is the source of truth for all configuration. This document is the recipe for turning it into a working Astro + Decap CMS site.

Work through sections in this order — foundation first, then content, then edge cases.

---

## Before You Start

1. Read `cd-static-handoff.md` completely before touching any files
2. Note the **Content Collections** section — this drives the CMS config, content schema, and template structure
3. Note the **Notes to Developer** section — there may be decisions that affect approach before writing a line of code

---

## 1. Project Structure

Scaffold with `npm create astro@latest` (choose "Empty" template) then set up this structure:

```
my-site/
├── public/
│   ├── admin/
│   │   ├── index.html          ← Decap CMS entry point
│   │   └── config.yml          ← CMS configuration
│   ├── fonts/                  ← self-hosted fonts
│   ├── images/
│   │   └── uploads/            ← Decap CMS media uploads (git-stored)
│   ├── icons/                  ← SVG icons
│   ├── robots.txt
│   └── _redirects              ← Netlify redirect rules
├── src/
│   ├── assets/
│   │   ├── images/             ← theme images for Astro optimization
│   │   └── scss/
│   │       ├── main.scss
│   │       ├── core/
│   │       │   ├── _functions.scss   ← copy from Blox theme
│   │       │   ├── _normalize.scss   ← copy from Blox theme
│   │       │   ├── _a11y.scss        ← copy from Blox theme
│   │       │   └── _animations.scss  ← copy from Blox theme (strip WP classes)
│   │       └── theme/
│   │           ├── _variables.scss
│   │           ├── _typography.scss
│   │           ├── _buttons.scss
│   │           ├── _forms.scss
│   │           ├── _nav.scss
│   │           ├── _globals.scss
│   │           ├── _modals.scss      ← copy from Blox if site uses modals/popups
│   │           └── _components.scss
│   ├── components/
│   │   └── SEO.astro           ← global SEO head component
│   ├── content/
│   │   ├── config.ts           ← Zod schemas for all collections
│   │   ├── posts/              ← one .md file per blog post
│   │   └── [collection]/       ← one folder per entries collection
│   ├── data/
│   │   ├── settings.yaml       ← global site settings (Decap-managed)
│   │   ├── navigation.yaml     ← nav links (Decap-managed)
│   │   └── [collection].yaml   ← one file per data collection
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro         ← homepage
│   │   ├── [page].astro        ← singleton pages (about, contact, etc.)
│   │   └── [collection]/
│   │       ├── index.astro     ← list/archive page
│   │       └── [slug].astro    ← individual item page
│   └── scripts/
│       ├── main.js             ← JS entry point
│       ├── navigation.js       ← mobile menu, scroll detection
│       ├── anchors.js          ← copy from Blox: smooth scroll
│       ├── details.js          ← copy from Blox: accordion animation
│       ├── videos.js           ← copy from Blox: lightbox (if needed)
│       └── color-match.js      ← copy from Blox: SVG filter matching (if needed)
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

**Media:** `public/images/uploads/` is committed to git. This is the default and works for small–medium sites. For video: always YouTube/Vimeo embeds — never commit video to the repo.

---

## 2. Build Setup

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build && pagefind --site dist",
    "preview": "astro preview"
  },
  "devDependencies": {
    "astro": "^4.0.0",
    "@astrojs/sitemap": "^3.0.0",
    "sass": "^1.70.0",
    "pagefind": "^1.0.0"
  }
}
```

Astro uses Vite internally. SCSS and JS are processed automatically — no separate watch scripts, no Browserify, no npm-run-all. Install `sass` and Astro handles the rest.

---

## 3. Astro Configuration

**`astro.config.mjs`:**

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://yourclientdomain.com', // required for sitemap and canonical URLs
  integrations: [sitemap()],
  // Optional — manage redirects here instead of _redirects file:
  // redirects: { '/old-path/': '/new-path/' },
});
```

**`tsconfig.json`** — comes with Astro, no changes needed for basic setup.

---

## 4. SCSS Utilities (Copy from Blox Theme)

Copy these files directly — they are framework-agnostic:

| Source (Blox) | Destination | Notes |
|---|---|---|
| `styles/core/_functions.scss` | `src/assets/scss/core/_functions.scss` | Contains `fluid-property()` AND `draw-in-underline()` — copy both |
| `styles/core/_normalize.scss` | `src/assets/scss/core/_normalize.scss` | No changes |
| `styles/core/_a11y.scss` | `src/assets/scss/core/_a11y.scss` | Replace `.wp-skip-link` with `.skip-link` |
| `styles/core/_animations.scss` | `src/assets/scss/core/_animations.scss` | Remove the `body.front-end .gutenberghub-tab-content` block at the bottom |
| `styles/core/_modals.scss` | `src/assets/scss/theme/_modals.scss` | Only if the site uses modals/popups; no changes needed |

**`draw-in-underline()` mixin** — this is in `_functions.scss` alongside `fluid-property()`. It's a useful hover effect for navigation links and text links that draws in an underline on hover. Reference it in `_nav.scss` or anywhere links need an animated underline treatment.

**`src/assets/scss/main.scss`** — import order:

```scss
@use 'core/functions';   // fluid-property(), draw-in-underline()
@use 'core/normalize';
@use 'core/a11y';
@use 'theme/variables';  // CSS custom properties — all tokens
@use 'theme/typography';
@use 'theme/globals';
@use 'theme/nav';
@use 'theme/forms';
@use 'theme/buttons';
@use 'theme/components';
@use 'core/animations';  // last — depends on everything above
// @use 'theme/modals';  // uncomment if site uses modals
```

Import in `BaseLayout.astro`:
```astro
---
import '../assets/scss/main.scss';
---
```

Vite processes the SCSS automatically. No separate build step.

---

## 5. Design Tokens

**File:** `src/assets/scss/theme/_variables.scss`

All design tokens live here as CSS custom properties. No hardcoded values anywhere else.

### Colors

```scss
:root {
  // Palette — most-used to least-used (order matters for readability)
  --color-[slug]: [hex];
  --color-[slug]: [hex];

  // Semantic aliases — use these everywhere else in SCSS
  --color-text:       var(--color-[darkest-slug]);
  --color-background: var(--color-[lightest-slug]);
  --color-accent:     var(--color-[primary-brand-slug]);
}
```

**Rule:** only reference `--color-[slug]` palette variables inside `_variables.scss` where aliases are defined. All component SCSS uses the three semantic aliases. This keeps components portable between projects.

### Font Sizes

```scss
:root {
  --size-h1:     #{fluid-property(32px, 56px)};
  --size-h2:     #{fluid-property(26px, 44px)};
  --size-h3:     #{fluid-property(22px, 34px)};
  --size-h4:     #{fluid-property(18px, 26px)};
  --size-accent: #{fluid-property(13px, 16px)};  // eyebrow/accent slot
  --size-body:   #{fluid-property(16px, 18px)};
  // Paragraph variants (if any):
  --size-sm: 0.875rem;
}
```

Range is always 360px–1600px. Where `[range]` = max − min:
```
clamp([min]px, [min]px + [range] * (100vw - 360px) / 1240, [max]px)
```

Or use `fluid-property()` directly (same formula).

### Spacing

```scss
:root {
  --space-xxs: #{fluid-property(4px, 8px)};
  --space-xs:  #{fluid-property(8px, 14px)};
  --space-s:   #{fluid-property(14px, 22px)};
  --space-m:   #{fluid-property(24px, 40px)};
  --space-l:   #{fluid-property(40px, 64px)};
  --space-xl:  #{fluid-property(64px, 96px)};
  --space-xxl: #{fluid-property(80px, 140px)};
  --radius:    [value from handoff]; // 0px, 4px, 8px, or 999px for pill
}
```

### Font Families

```scss
:root {
  --font-body:    '[Font Name]', [fallback];
  --font-heading: '[Font Name]', [fallback]; // only if a second family is used
}
```

---

## 6. Fonts

For each font family in the handoff:

- **Google Font / variable font:** Download `.woff2` files, place in `public/fonts/`. Declare `@font-face` in `_variables.scss` above the `:root` block, with `font-display: swap`. Register only weights actually used.
- **System font stack:** Just define the `--font-*` variable. No `@font-face` needed.

---

## 7. Typography, Buttons, Sections

These are identical to the Eleventy recipe — all CSS, no Astro-specific logic.

**`_typography.scss`:** Apply `--size-*` and `--font-*` variables to heading elements, set `body` defaults, add paragraph variant classes (`.text-sm`, `.text-eyebrow`).

**`_buttons.scss`:** BEM modifier classes: `.btn`, `.btn--fill`, `.btn--outline`, `.btn--text`, `.btn--arrow`. No `!important` needed on hover (no Gutenberg inline styles to fight).

**`_globals.scss`:** Section color theme classes: `.section--dark`, `.section--brand`, etc.

**`_forms.scss`:** Apply `--radius` to `input`, `textarea`, `select`. Style per handoff spec.

For **link styles**: set on `a` in `_typography.scss` or `_globals.scss`. If links should inherit surrounding text color, omit the `color` declaration entirely.

---

## 8. Content Schema

**File:** `src/content/config.ts`

Define a Zod schema for every `posts` and `entries` collection from the handoff. This gives you type-safe content and build-time validation.

```typescript
import { defineCollection, z } from 'astro:content';

// Reusable SEO fields — added to every collection that has its own page
const seo = z.object({
  seo_title:       z.string().optional(),
  seo_description: z.string().optional(),
  og_image:        z.string().optional(),
});

const posts = defineCollection({
  type: 'content',
  schema: seo.extend({
    title:    z.string(),
    date:     z.coerce.date(),
    draft:    z.boolean().default(false),
    image:    z.string().optional(),
    excerpt:  z.string().optional(),
    tags:     z.array(z.string()).optional(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: seo.extend({
    title:  z.string(),
    image:  z.string(),
    tags:   z.array(z.string()).optional(),
  }),
});

// Add one defineCollection() per collection from the handoff
export const collections = { posts, projects };
```

Data collections (testimonials, FAQs, team snapshots) are plain YAML files in `src/data/` — no schema needed.

---

## 9. Decap CMS Configuration

**`public/admin/index.html`:**

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager</title>
</head>
<body>
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</body>
</html>
```

**`public/admin/config.yml`:**

```yaml
backend:
  name: git-gateway
  branch: main

media_folder: public/images/uploads
public_folder: /images/uploads

collections:

  # GLOBAL SETTINGS
  - name: settings
    label: Site Settings
    files:
      - name: global
        label: Global Settings
        file: src/data/settings.yaml
        fields:
          - {label: Site Name, name: site_name, widget: string}
          - {label: Default Meta Description, name: default_description, widget: text}
          - {label: Default OG Image, name: default_og_image, widget: image, required: false}
          - {label: Email, name: email, widget: string}
          # ... remaining fields from handoff
      - name: navigation
        label: Navigation
        file: src/data/navigation.yaml
        fields:
          - label: Main Nav
            name: main
            widget: list
            fields:
              - {label: Label, name: label, widget: string}
              - {label: URL, name: url, widget: string}

  # SINGLETON PAGES
  - name: pages
    label: Pages
    files:
      - name: homepage
        label: Homepage
        file: src/data/homepage.yaml
        fields:
          - {label: SEO Title, name: seo_title, widget: string, required: false}
          - {label: Meta Description, name: seo_description, widget: text, required: false}
          - {label: OG Image, name: og_image, widget: image, required: false}
          - {label: Hero Heading, name: hero_heading, widget: string}
          - {label: Hero Body, name: hero_body, widget: text}
          - {label: Hero Image, name: hero_image, widget: image}
          # ... remaining fields from handoff
      # Add one entry per singleton page

  # POSTS (time-ordered, own pages)
  - name: posts
    label: Blog Posts
    folder: src/content/posts
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - {label: SEO Title, name: seo_title, widget: string, required: false}
      - {label: Meta Description, name: seo_description, widget: text, required: false}
      - {label: OG Image, name: og_image, widget: image, required: false}
      - {label: Title, name: title, widget: string}
      - {label: Date, name: date, widget: datetime}
      - {label: Draft, name: draft, widget: boolean, default: false}
      - {label: Featured Image, name: image, widget: image, required: false}
      - {label: Excerpt, name: excerpt, widget: text, required: false}
      - {label: Body, name: body, widget: markdown}

  # ENTRIES (non-dated, own pages) — one block per collection from handoff
  - name: projects
    label: Projects
    folder: src/content/projects
    create: true
    fields:
      - {label: SEO Title, name: seo_title, widget: string, required: false}
      - {label: Meta Description, name: seo_description, widget: text, required: false}
      - {label: OG Image, name: og_image, widget: image, required: false}
      - {label: Title, name: title, widget: string}
      - {label: Cover Image, name: image, widget: image}
      - {label: Body, name: body, widget: markdown}

  # DATA COLLECTIONS (no own pages)
  - name: data_collections
    label: Data
    files:
      - name: testimonials
        label: Testimonials
        file: src/data/testimonials.yaml
        fields:
          - label: Testimonials
            name: items
            widget: list
            fields:
              - {label: Quote, name: quote, widget: text}
              - {label: Name, name: name, widget: string}
              - {label: Title, name: title, widget: string}
              - {label: Photo, name: photo, widget: image, required: false}
```

---

## 10. Astro Templates

### Base Layout (`src/layouts/BaseLayout.astro`)

```astro
---
import SEO from '../components/SEO.astro';
import settings from '../data/settings.yaml';
import navigation from '../data/navigation.yaml';
import '../assets/scss/main.scss';

const {
  title,
  seo_description,
  og_image
} = Astro.props;
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <SEO
    title={title}
    description={seo_description || settings.default_description}
    image={og_image || settings.default_og_image}
    siteTitle={settings.site_name}
  />
</head>
<body>
  <header class="site-header">
    <nav>
      {navigation.main.map(item => (
        <a href={item.url}>{item.label}</a>
      ))}
    </nav>
  </header>
  <main id="main-content" data-pagefind-body>
    <slot />
  </main>
  <footer class="site-footer">
    <!-- footer content -->
  </footer>
  <script>
    import '../scripts/main.js';
  </script>
</body>
</html>
```

### Singleton Page (`src/pages/index.astro`)

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import homepage from '../data/homepage.yaml';
---
<BaseLayout
  title={homepage.seo_title || homepage.hero_heading}
  seo_description={homepage.seo_description}
  og_image={homepage.og_image}
>
  <section class="hero">
    <h1>{homepage.hero_heading}</h1>
    <p>{homepage.hero_body}</p>
    <a href={homepage.cta_url} class="btn btn--fill">{homepage.cta_text}</a>
  </section>
</BaseLayout>
```

### Collection List Page (`src/pages/blog/index.astro`)

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

const posts = (await getCollection('posts'))
  .filter(p => !p.data.draft)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---
<BaseLayout title="Blog">
  {posts.map(post => (
    <article>
      <h2><a href={`/blog/${post.slug}/`}>{post.data.title}</a></h2>
      {post.data.excerpt && <p>{post.data.excerpt}</p>}
    </article>
  ))}
</BaseLayout>
```

### Dynamic Single Page (`src/pages/blog/[slug].astro`)

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('posts', p => !p.data.draft);
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---
<BaseLayout
  title={post.data.seo_title || post.data.title}
  seo_description={post.data.seo_description}
  og_image={post.data.og_image || post.data.image}
>
  <article>
    <h1>{post.data.title}</h1>
    <Content />
  </article>
</BaseLayout>
```

### Data Collections in Templates

```astro
---
import testimonials from '../data/testimonials.yaml';
---
{testimonials.items.map(item => (
  <blockquote>
    <p>{item.quote}</p>
    <cite>{item.name}, {item.title}</cite>
  </blockquote>
))}
```

---

## 11. SEO Component

**File:** `src/components/SEO.astro`

```astro
---
const {
  title,
  description,
  image,
  siteTitle,
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site).href;
const fullTitle    = title ? `${title} | ${siteTitle}` : siteTitle;
---

<title>{fullTitle}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonicalURL} />

<meta property="og:type"        content="website" />
<meta property="og:title"       content={fullTitle} />
<meta property="og:description" content={description} />
<meta property="og:url"         content={canonicalURL} />
{image && <meta property="og:image" content={image} />}

<meta name="twitter:card"        content="summary_large_image" />
<meta name="twitter:title"       content={fullTitle} />
<meta name="twitter:description" content={description} />
{image && <meta name="twitter:image" content={image} />}
```

Note: `Astro.site` requires `site` to be set in `astro.config.mjs`. Do this before deploying.

---

## 12. Sitemap and robots.txt

**Sitemap** is handled by the `@astrojs/sitemap` integration registered in `astro.config.mjs`. It auto-generates `sitemap-index.xml` and `sitemap-0.xml` at build time. Pages with `robots` meta set to `noindex` are excluded automatically.

**`public/robots.txt`:**

```
User-agent: *
Allow: /

Sitemap: https://yourclientdomain.com/sitemap-index.xml
```

Update the `Sitemap:` URL to match the `site` value in `astro.config.mjs`.

---

## 13. 301 Redirects

**File:** `public/_redirects`

Netlify reads this file from the publish directory and applies redirects at the CDN edge — faster and more reliable than plugin-based WordPress redirects.

```
/old-slug/        /new-slug/        301
/services/old/    /services/        301
/team/            /about/#team      301
```

This file is committed to git and not editable through Decap CMS. For clients who need to self-manage redirects, note that they'll need to edit this file directly or you'll need to make the change for them.

Alternatively, define simple redirects in `astro.config.mjs`:

```js
export default defineConfig({
  redirects: {
    '/old-slug/': '/new-slug/',
  }
});
```

---

## 14. Images

Astro provides a native `<Image />` component that optimizes images, converts to WebP, and generates responsive `srcset` attributes.

**For theme images** (logo, decorative backgrounds, any image that's part of the template) — place in `src/assets/images/` and use the `<Image />` component:

```astro
---
import { Image } from 'astro:assets';
import logo from '../assets/images/logo.svg';
---
<Image src={logo} alt="Company Name" />
```

**For CMS-uploaded images** (from `public/images/uploads/`) — these bypass Astro's optimization pipeline. Use a standard `<img>` tag with `loading="lazy"`:

```astro
{post.data.image && (
  <img
    src={post.data.image}
    alt={post.data.title}
    loading="lazy"
    decoding="async"
  />
)}
```

**For Cloudinary** (if the repo starts growing heavy from media uploads): add the `@astrojs/cloudinary` integration. Uploaded images would go to Cloudinary instead of the repo, with automatic transformation and CDN delivery. Free tier: 25GB storage, 25GB/month bandwidth.

---

## 15. Navigation

**`src/data/navigation.yaml`** — managed through Decap CMS global settings:

```yaml
main:
  - label: About
    url: /about/
  - label: Services
    url: /services/
  - label: Contact
    url: /contact/
```

Import and iterate in `BaseLayout.astro` or `header.astro` partial.

**Mobile menu JavaScript** — in `src/scripts/navigation.js`:

```js
const toggle = document.querySelector('.nav-toggle');
const menu   = document.querySelector('.nav-mobile');

toggle?.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen);
});

window.addEventListener('scroll', () => {
  document.querySelector('.site-header')
    ?.classList.toggle('is-scrolled', window.scrollY > 50);
}, { passive: true });
```

---

## 16. Forms

Add `netlify` attribute and honeypot field to any `<form>`:

```html
<form name="contact" method="POST" netlify netlify-honeypot="bot-field">
  <input type="hidden" name="bot-field">
  <!-- fields -->
  <button type="submit" class="btn btn--fill">Send Message</button>
</form>
```

Netlify detects this at deploy and wires up form handling. No JS required. Submissions appear in the Netlify dashboard; configure email notifications or Zapier/Slack webhooks there.

**Free tier limit: 100 submissions/month.** For higher volume, the Netlify Forms add-on is ~$19/month, or switch to an embedded HubSpot form (has its own submission storage and CRM sync).

---

## 17. JavaScript

Copy these scripts from the Blox theme — all are framework-agnostic. Place in `src/scripts/`:

| Script | Notes |
|--------|-------|
| `scripts/anchors.js` | Smooth scroll with header offset — copy as-is |
| `scripts/details.js` | Accordion animation — copy as-is |
| `scripts/videos.js` | Lightbox/play button — copy as-is (if site uses video) |
| `scripts/color-match.js` | SVG filter matching — copy as-is (if site uses SVG icons that need to match text color) |

**`src/scripts/main.js`:**

```js
import './navigation.js';
import './anchors.js';
import './details.js';
// import './videos.js';
// import './color-match.js';
```

Import in `BaseLayout.astro` with a bundled `<script>` tag:

```astro
<script>
  import '../scripts/main.js';
</script>
```

Astro/Vite bundles and minifies this automatically for production.

**Details/accordion close animation note:** `details.js` supports two close mechanisms — use the right one for your CSS approach:
- `animationend` where `animationName === 'close'` — for keyframe-based accordions (defines a `@keyframes close` in SCSS)
- `transitionend` where `propertyName === 'opacity'` — for transition-based accordions (uses `max-height` + `opacity` with a `.closing` class)

---

## 18. Scroll-Triggered Animations

The animation system from the Blox theme carries over unchanged. Same keyframes in `_animations.scss`, same class names, same `prefers-reduced-motion` override.

Add IntersectionObserver to `src/scripts/navigation.js` (or a dedicated `animations.js`):

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('has-been-revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.has-animation, .has-image-animation')
  .forEach(el => observer.observe(el));
```

Apply in templates:

```astro
<div class="has-animation">
  <h2 class="fade-in-up">Our Services</h2>
</div>
```

Available animation classes (from `_animations.scss`):
- `fade-in-left`, `fade-in-right`, `fade-in-up`, `fade-in-down`
- `reveal-in`
- `animated-line` (horizontal draw-in)
- `zoom` (image scale)

Delay utilities: `.animation-delay-500ms`, `.animation-delay-1s`, `.animation-delay-1p5s`

---

## 19. Search with Pagefind

Pagefind generates a static search index after the build and adds a complete search UI with no server required.

**Setup:**
1. `npm install -D pagefind` (already in the package.json above)
2. Build script already runs `pagefind --site dist` after `astro build`
3. Add `data-pagefind-body` attribute to the `<main>` element in `BaseLayout.astro` (already shown above)

**Add the search UI** wherever a search input should appear:

```astro
<!-- In a search page or header -->
<link href="/pagefind/pagefind-ui.css" rel="stylesheet" />
<div id="search"></div>
<script is:inline>
  window.addEventListener('DOMContentLoaded', () => {
    new PagefindUI({ element: '#search', showImages: false });
  });
</script>
<script src="/pagefind/pagefind-ui.js" is:inline></script>
```

Pagefind indexes all pages with `data-pagefind-body` at build time. Results are served from static files in `dist/pagefind/` — no external service, no ongoing cost.

---

## 20. Deployment (Netlify)

1. Push the project to a GitHub repository
2. Netlify → Add new site → Import from Git
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy

**Decap CMS authentication:**
1. Site settings → Identity → Enable Identity
2. Registration: Invite only
3. Identity → Services → Enable Git Gateway
4. Invite the client's email address
5. CMS accessible at `yoursite.com/admin/`

---

## 21. Final Checks

- [ ] All colors reference `var(--color-*)` — no hardcoded hex in SCSS
- [ ] All spacing uses `var(--space-*)` or `fluid-property()` — no hardcoded px
- [ ] All font sizes use `var(--size-*)` — no hardcoded rem/px
- [ ] Semantic aliases (`--color-text`, `--color-background`, `--color-accent`) used in all component SCSS
- [ ] `site` set in `astro.config.mjs` to the production URL
- [ ] Sitemap generates at `/sitemap-index.xml`
- [ ] `public/robots.txt` Sitemap URL matches production URL
- [ ] SEO component renders correct `<title>` and `<meta>` on all page types
- [ ] Canonical URLs are correct (no trailing slash inconsistencies)
- [ ] `public/_redirects` includes any needed redirects
- [ ] All Decap CMS collections match handoff fields, with `src/` paths
- [ ] Content schema (`config.ts`) has one `defineCollection()` per posts/entries collection
- [ ] Templates render correctly with test content in each collection
- [ ] Decap CMS admin accessible at `/admin/`; all collections editable
- [ ] Netlify Forms test submission appears in the dashboard
- [ ] Image `alt` attributes present on all meaningful images
- [ ] `loading="lazy"` on CMS-uploaded images
- [ ] IntersectionObserver animations fire on scroll; suppressed with `prefers-reduced-motion`
- [ ] Pagefind search returns relevant results on the built site
- [ ] Color contrast passes WCAG AA (4.5:1 body text, 3:1 large text and UI)
- [ ] `npm run build` completes without errors
- [ ] Site deploys to Netlify without errors

---

## 22. Known Limitations

**Draft previews:** Decap CMS's editorial workflow (draft → review → publish) requires a paid Netlify plan. On free, every save goes directly to main and triggers a build. The workaround is a `draft: true` boolean field that templates filter out — but the client can't preview drafts before they're live. Set expectations upfront.

**Build time on publish:** Each Decap CMS save triggers a git commit and a Netlify build (~1–2 minutes). Clients expecting WordPress's instant "Update" will notice this. Not a blocker, just a mindset adjustment.

**Media repo growth:** Images are committed to git. For a typical small business site this isn't a concern for years. If it becomes one, Cloudinary free tier (25GB) is the migration path.

**Search:** Pagefind indexes only what's on the built site. Drafts are excluded. Works for all content types automatically via `data-pagefind-body`.

**Not suitable for:** user accounts, e-commerce beyond a simple embed, booking systems, complex form logic, anything requiring a server. These sites belong on WordPress.

---

## 23. Hugo / Eleventy Alternative

If a project requires Hugo or Eleventy instead of Astro:

**Hugo:** Fastest builds for large sites. Go template syntax. Hugo Pipes replaces the npm CSS/JS build. Content in `content/`, data in `data/`. Decap CMS paths change accordingly (no `src/` prefix).

**Eleventy:** JS-based, more flexible template systems (Nunjucks, Liquid, etc.). Replace Astro's build with separate `sass --watch` and `esbuild --watch` npm scripts via `npm-run-all`. Content in `src/`, data in `src/_data/`. No native image optimization — add `@11ty/eleventy-img`. Decap CMS is identical.

In both cases: SCSS utilities, JS scripts, design tokens, animation system, Decap CMS widget types, and Netlify deployment are identical to this recipe.
