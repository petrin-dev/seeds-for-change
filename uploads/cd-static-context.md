# Claude Design → Static Site: Handoff Context

Drop this file into every Claude Design project that will be built as a static site. It tells Claude Design what to extract from the design and how to format the output so it can be directly implemented as an Astro site with Decap CMS, deployed to Netlify.

> **Stack note:** Astro + Decap CMS is the default target. Astro is preferred over Eleventy for its native image optimization, type-safe content collections, and simpler build setup. If you have a specific reason to prefer Hugo or Eleventy, note it in the handoff. The design token and content collection sections of this document apply equally to all three.

---

## Your Role

You are producing design specifications, not finished deliverables. The output of this project will be handed to a developer who will implement everything as a statically generated Astro site with Decap CMS for content editing. Your job is to:

1. **Extract** all design attributes needed to configure the site's visual layer
2. **Map** the site's content into collections and fields for the CMS
3. **Flag** anything requiring custom interactive components or non-static features
4. **Pare down** wherever a constraint is specified

When working from a Figma file:
- Extract colors visually by usage frequency, not by Figma variable names
- Confirm with the client which colors are brand colors vs. incidental (artboard backgrounds, placeholder text)
- **Do not map Figma variable names to HTML heading levels.** A designer naming a style "H5" because it is fifth in their scale does not mean it maps to `<h5>`. Determine semantic heading level from context: what content it labels, its position in the page hierarchy, how it relates to surrounding content. Flag ambiguous cases in the Notes to Developer section.

When designing from scratch:
- Make all the same decisions you would normally, then produce this output alongside the designs

---

## What to Produce

At the end of the project, produce a document following the template at the bottom of this file. Save it as `cd-static-handoff.md`. This document is the primary input for the developer — treat it as the source of truth for all configuration decisions.

---

## Extraction Guidelines

### Colors
- List every distinct brand color by a **descriptive name** — not a role name. Use names like `navy-blue`, `warm-white`, `forest-green`, not `primary`, `text`, or `background`.
- Order by frequency of use across the design (most used first).
- Include hex values.
- Note the primary usage context for each.
- **Cap the palette at 12 colors.** Consolidate near-duplicates; confirm with client which are genuine brand colors vs. incidental choices.
- **Do not include** pure white (#FFFFFF) or pure black (#000000) unless they are intentional brand accent choices. Flag them separately if present.
- **Gradients and duotones are separate from the color palette count.** List each gradient with a CSS-ready value and descriptive name. Does not count toward the 12-color cap.

### Section Color Themes
Many sites use a small set of recurring section background treatments — a light default, a dark branded section, and perhaps a neutral mid-tone. For each recurring pattern:
- **Background color** — which palette color fills the section
- **Heading color** — what color headings use on that background
- **Body text color** — what color body copy uses on that background
- **Accent / link color** on that background (if different from the site default)

Three section themes is typical. More than four is unusual and should be flagged for consolidation.

### Typography
- List every distinct font family with the exact weights present in the design.
- **If multiple font families are used**, specify exactly which elements each applies to. Be explicit rather than leaving it implied.
- For font sizes: extract all distinct sizes, then allocate as follows:
  - **5 named heading/accent sizes** — four must be clearly larger than body text and usable as real page headings (H1–H4). The fifth is an "accent" size — either the next step below H4, or a distinctive one-off used for a specific purpose (oversized pull quote, eyebrow label, etc.).
  - **1 base body size** — identified separately.
  - **Up to 4 paragraph variant sizes** — for fine print, callout labels, legal text, eyebrow text. Note separately.
  - **Maximum 10 font sizes total.** Flag any sizes beyond this for consolidation.
- Provide both a minimum size (mobile) and maximum size (desktop) for each in px. If a size is truly fixed, note the single value.
- The site uses fluid typography (sizes scale from 360px to 1600px viewport width).

### Spacing
- Identify up to **7 distinct spacing values** representing the major structural rhythm.
- These become named steps: xxs → xxl.
- Provide min px (mobile) and max px (desktop) for each — spacing is also fluid.
- Think: icon padding, button padding, text stack gap, card padding, gutter, section gap, hero gap.
- **Scale distribution matters.** Steps should ascend proportionally — roughly doubling at each step. `4 → 8 → 16 → 32 → 56 → 80 → 120` is useful. `8 → 10 → 12 → 14 → 16 → 18 → 120` is not.

### Buttons
- Aim for **up to 6 button styles**. Include a mix of: filled (solid background), outline (transparent fill with border), text-only, and text-with-accent (text link with a unicode arrow: →, ›, ↗).
- **No size duplicates** — font size is set per-element in code, not per style. One `fill` style covers all sizes.
- For each variant: slug (kebab-case), label (human-readable), visual treatment, background/text/border colors, hover state.
- **Always describe the hover state explicitly** — "background changes from navy-blue to forest-green" is useful. "Slightly different on hover" is not.

### Forms
Describe the visual treatment for all form elements when the project includes a theme-designed form (not a third-party embed like HubSpot). Include:
- **Input fields** — border style, radius, padding, background/text color
- **Textarea** — same as above plus minimum height
- **Select / dropdown** — same as above
- **Checkboxes and radio buttons** — browser default or custom-styled
- **Labels** — font weight, text-transform, letter-spacing
- **Validation error states** — border color, error message color
- **Submit button** — which button style it mirrors exactly

Note whether the project will use **Netlify Forms** (native, free, no JS) or an embedded third-party form (HubSpot, Typeform, etc.). If a third-party form is embedded, do not specify input styling — the embed carries its own styles.

### Border Radius
Note the border-radius treatment for buttons and form fields only. Group/card radius is set per-element in templates.
- **Global default** — a single value applied to buttons and form inputs
- **Element overrides** — only if buttons and inputs intentionally differ
- Flag pill-shaped buttons explicitly (they use `border-radius: 999px`)

### Paragraph Variants
- List **text style variants beyond standard body copy** — callout labels, legal text, emphasis paragraphs, eyebrow text, pull quotes.
- Keep to **4 or fewer.** Consolidate to the most structurally distinct ones.
- Describe what makes each different: size change, weight, color, decoration.

### Heading Treatments
- Note any **special heading treatments beyond size** — eyebrow text, decorative rules, gradient fills, animated text.
- **Flag any heading level that consistently uses letter-spacing or text-transform** (e.g., "all H3s appear uppercase with 0.1em tracking"). These are applied globally as CSS rules on heading selectors.

### Link Styles
- **Default color** — which palette color, or "inherits from surrounding text"
- **Underline** — always / on hover only / never / decorative
- **Hover state** — color change, underline change, other

### List Styles
- Only include if the design uses visually distinct list treatments (custom bullets, checkmarks, icon bullets).
- Standard bulleted and numbered lists need not be noted.

### Details / Accordion
- If the design uses expand/collapse UI, describe the visual treatment: font size, weight, color, expand/collapse indicator.
- Note any variation between instances (compact FAQ vs. large section accordion).

### Special Visual Effects

**Shadows:**
- Text shadow, box shadow, image/SVG drop shadow — describe each with color, blur, offset, affected elements.

**Blend Modes:**
- List any elements using CSS blend-mode, the mode used, and the context.

### Decorative Elements
- Flag any **inline SVG accents** — decorative shapes, dividers, background flourishes. Describe what each looks like, where it appears, and how it's likely implemented (inline SVG, pseudo-element, background-image).
- Note any background patterns, textures, or noise overlays.

### Animations
- Only list **scroll-triggered or page-load animations** — not hover states.
- For each: what element animates, motion type (fade-in, slide-up/left/right, zoom, parallax), trigger (scroll | load), any timing or stagger.
- Less is more. Flag only clearly intentional animations.

---

### Navigation
Describe the site navigation structure:
- **Top-level items** — list of main nav links (label and approximate destination)
- **Sub-navigation** — does any top-level item have a dropdown? If so, describe the visual treatment
- **Nav extras** — CTA button, phone number, language switcher, or other non-link elements in the nav bar
- **Mobile menu treatment** — full-screen overlay or side drawer, background color, link style/scale, any extras (CTA, social icons), open/close animation

Be explicit about what lives in the nav — it becomes a navigation data file and a layout partial.

---

### Content Collections

This section is the static-site equivalent of "Custom Block Candidates" in a WordPress project. Instead of flagging content that needs a custom block, flag content that needs a **CMS collection** — a set of structured fields that an editor will fill in.

Think through every section of every page and ask: *Is this content that an editor will update, and if so, what structure does it have?*

Classify each piece of editable content into one of five types:

| Type | Description | Example |
|------|-------------|---------|
| **global** | Site-wide settings that appear everywhere | Site name, contact info, social links, footer text |
| **singleton** | A single unique page with structured fields | Homepage hero, About page intro, Contact page |
| **posts** | Time-ordered items that each have their own page | Blog posts, news articles, case studies |
| **entries** | Non-dated items that each have their own page | Portfolio projects, team bios, service detail pages |
| **data** | Repeating structured items with NO own page | Testimonials, FAQs, stats, client logos, feature cards |

For **global** settings, list the individual fields an editor might update.

For **singleton** pages, list each page and the structured fields it needs beyond standard body content. Standard body content (headings, paragraphs, images in a post) doesn't need to be listed — list only named, structured fields that become front matter (hero headline, featured image, CTA button text, etc.).

For **posts, entries, and data**, list:
- The **collection slug** (kebab-case, plural)
- A **human label**
- The **fields** per item, each with a data type:
  - `string` — short single-line text
  - `text` — multi-line plain text
  - `markdown` — rich text body
  - `image` — uploaded image
  - `url` — external link
  - `boolean` — on/off toggle
  - `select: [opt1, opt2]` — dropdown with fixed options
  - `date` — date picker
  - `list<string>` — repeating text items (tags, bullet points)
  - `list<object: field, field>` — repeating structured items (e.g., a stat with label + number)
- Any **taxonomy** (tags, categories, or a custom grouping)

**SEO fields:** Every singleton page and every posts/entries collection automatically gets three SEO fields — `seo_title`, `seo_description`, and `og_image`. Do not list these in the handoff; they are added to every collection by default during implementation. Only note if a collection should *not* have SEO fields (e.g., a data collection with no own page).

**Do not over-engineer.** If a section is genuinely static — marketing copy that never changes, a simple text block — it does not need to be a collection. Only create collections for content that editors will realistically update.

---

## Output Template

Produce the following document as `cd-static-handoff.md`. Fill every section. Write `none` for sections that don't apply.

---

```markdown
# cd-static-handoff.md

## Project
- **Name:** [project name]
- **Source:** [figma | designed-from-scratch]
- **Stack:** [astro-decap | eleventy-decap | hugo-decap | other]
- **Notes:** [brief note on design file quality, anything the developer should know upfront]

---

## Colors

### Palette
<!-- Order by frequency of use, most used first -->
| Slug | Name | Hex | Primary Usage |
|------|------|-----|---------------|
| [kebab-case] | [Human Name] | #000000 | [where it appears most] |

### Colors Excluded
[Colors present in the design that are NOT brand colors, or "none"]

### Gradients
| Slug | Name | CSS Value | Usage |
|------|------|-----------|-------|
| [kebab-case] | [Human Name] | linear-gradient(...) | [where used] |

---

## Section Color Themes
<!-- 3 is typical; "none" if only the default light bg is used -->
| BG Color Slug | Heading Color Slug | Body Text Color Slug | Accent/Link Color Slug |
|---------------|-------------------|----------------------|------------------------|
| [slug] | [slug] | [slug] | [slug or "default"] |

---

## Typography

### Font Families
| Family | Weights Used | Style | Source |
|--------|-------------|-------|--------|
| [Font Name] | 400, 700 | normal | google \| adobe \| local \| system |

### Font Sizes
<!-- 5 heading/accent sizes, 1 base body, up to 4 paragraph variants. Max 10 total. -->
| Name | Slug | Min (px) | Max (px) | Fixed? | Slot | Usage |
|------|------|----------|----------|--------|------|-------|
| [e.g. Display] | [e.g. display] | 40 | 72 | no | heading | Hero headings |
| [e.g. Eyebrow] | [e.g. eyebrow] | 11 | 13 | yes | paragraph-variant | Label above headings |

### Base Paragraph Size
- **Min:** [px]
- **Max:** [px]

---

## Spacing (max 7 steps)
| Step | Semantic Use | Min (px) | Max (px) |
|------|-------------|----------|----------|
| xxs | [e.g. icon padding] | 8 | 12 |
| xs | | | |
| s | | | |
| m | | | |
| l | | | |
| xl | | | |
| xxl | | | |

---

## Buttons
<!-- Up to 6 styles. No size duplicates. -->
| Slug | Label | Visual Description | BG Color | Text Color | Border Color | Hover Description |
|------|-------|--------------------|----------|------------|--------------|-------------------|
| [kebab] | [Label] | [fill / outline / text-only / text-with-arrow →] | [color slug or "transparent"] | [color slug] | [color slug or "none"] | [what changes and to which color] |

---

## Border Radius
- **Global default:** [e.g., 0px | 4px | 8px | pill (999px)]
- **Button override:** [if different, or "same as global"]
- **Input / form field override:** [if different, or "same as global"]

---

## Forms
- **Form handler:** [netlify-forms | hubspot | typeform | none]
- **Input treatment:** [border style, radius, padding, bg/text color]
- **Label treatment:** [weight, text-transform, letter-spacing]
- **Select / dropdown:** [same as inputs or note differences]
- **Checkboxes / radios:** [browser default | custom-styled — describe]
- **Validation errors:** [border color, message color]
- **Submit button mirrors:** [which button variant slug]

---

## Paragraph Variants (max 4)
| Slug | Label | What Makes It Different |
|------|-------|------------------------|
| [kebab] | [Label] | [size / weight / color / decoration change] |

---

## Heading Treatments
[Free text. Special treatments beyond size — eyebrow labels, decorative rules, gradient text. Include heading levels with letter-spacing or text-transform. Write "none" if standard.]

---

## Link Styles
- **Default color:** [palette slug, or "inherits from text"]
- **Underline:** [always | on hover only | never | decorative]
- **Hover:** [color changes to slug | underline appears/disappears | other]

---

## List Variants
| Slug | Label | Bullet/Icon Treatment |
|------|-------|-----------------------|
| [kebab] | [Label] | [description] |

---

## Details / Accordion
| Slug | Label | Summary Treatment |
|------|-------|-------------------|
| [kebab] | [Label] | [font size, weight, icon/symbol used] |

---

## Special Visual Effects

### Shadows
- **Text shadow:** [description or "none"]
- **Box shadow:** [which elements, color, blur, offset — or "none"]
- **Image/SVG drop shadow:** [description or "none"]

### Blend Modes
| Element | Mode | Context |
|---------|------|---------|
| [what] | [multiply \| screen \| overlay] | [where] |

---

## Decorative Elements

### Inline SVG / Accents
| Description | Where It Appears | Implementation Hint |
|-------------|-----------------|---------------------|
| [what it looks like] | [section divider / bg flourish] | [inline SVG \| pseudo-element \| background-image] |

### Background Patterns / Textures
[Description or "none"]

---

## Animations
| Element | Type | Trigger | Notes |
|---------|------|---------|-------|
| [what animates] | [fade-in \| slide-up \| slide-left \| zoom \| parallax] | [scroll \| load] | [timing, stagger] |

---

## Navigation
- **Top-level items:** [list nav labels and destinations]
- **Sub-navigation:** [which items have dropdowns, and describe the dropdown treatment]
- **Nav extras:** [CTA button, phone number, or other non-link elements]
- **Mobile menu type:** [full-screen overlay \| side drawer — with background color]
- **Mobile menu extras:** [CTA, social icons, tagline, secondary nav — with placement]
- **Mobile menu animation:** [fade \| slide-left \| slide-right \| slide-down \| none]

---

## Content Collections

### Global Settings
- **File:** `data/settings.yaml`
- **Fields:** [list each: field_name (type), e.g. — site_name (string), email (string), phone (string), address (text), social_instagram (url), footer_tagline (string)]

---

### Singleton Pages
<!-- One row per page that has structured front matter beyond standard body content -->
| Page | Content File | Structured Fields |
|------|-------------|-------------------|
| Homepage | content/_index.md | [field (type), field (type)...] |
| About | content/about/_index.md | [field (type)...] |
| Contact | content/contact/_index.md | [field (type)...] |

---

### Posts (time-ordered, own pages)
<!-- Leave blank if the site has no blog/news -->
| Slug | Label | Fields | Taxonomy |
|------|-------|--------|----------|
| posts | Blog Posts | title (string), date (date), featured_image (image), excerpt (text), body (markdown) | tags (list<string>) |

---

### Entries (non-dated, own pages)
<!-- Portfolio projects, team bios, product pages, service detail pages -->
| Slug | Label | Fields | Taxonomy |
|------|-------|--------|----------|
| [plural-slug] | [Label] | [field (type), field (type)...] | [none \| tags \| category] |

---

### Data Collections (no own pages)
<!-- Testimonials, FAQs, stats, client logos, feature cards, team snapshots -->
| Slug | Label | Fields per Item |
|------|-------|-----------------|
| [plural-slug] | [Label] | [field (type), field (type)...] |

---

## Notes to Developer
[Anything else — edge cases, decisions that deviate from the norm, questions for the developer, anything flagged during design that needs a decision.]
```

---

*This context file lives in `static-pipeline/cd-static-context.md` within the Blox theme. Drop it into every Claude Design project alongside any brand inputs. The developer will receive `cd-static-handoff.md` as the primary configuration input and will implement using Astro + Decap CMS by default.*
