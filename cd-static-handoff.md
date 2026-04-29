# cd-static-handoff.md

## Project
- **Name:** Seeds for Change — Counseling and Consulting Services, LLC
- **Source:** designed-from-scratch (reference: existing Google Sites page + client-supplied imagery and brand colors)
- **Stack:** astro-decap
- **Notes:** Single-page scrolling site with four anchor sections (Home, About, Services, Contact). Logo is hand-drawn by the clients' children and should be preserved exactly. Site is a placeholder pending a planned repositioning — the Services section in particular may be restructured. All imagery is client-supplied. No blog, no e-commerce, no search. Contact form is currently phone/email only (no form handler needed at launch); a Netlify Form may be added in a future pass.

---

## Colors

### Palette
| Slug | Name | Hex | Primary Usage |
|------|------|-----|---------------|
| sage-green | Sage Green | #4F694D | Nav accent, section headings, accordion headers, CTA banners, icon color |
| near-black | Near Black | #212121 | Body text, nav text (scrolled), footer background |
| warm-gray | Warm Gray | #5E5E5E | Body copy, secondary text, bio paragraphs |
| warm-gold | Warm Gold | #C4973A | CTA buttons, decorative rules, bio photo borders, bullet dots |
| warm-cream | Warm Cream | #F7F5F0 | Primary body/section background |
| light-sage | Light Sage | #EEF1ED | Alternate section background (About, Contact) |

### Colors Excluded
Pure white (#FFFFFF) is used as card/panel backgrounds — incidental, not a brand color. Not included in palette.

### Gradients
| Slug | Name | CSS Value | Usage |
|------|------|-----------|-------|
| hero-overlay | Hero Overlay | linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(33,33,33,0.48) 100%) | Layered over hero background image for text legibility |

---

## Section Color Themes
| BG Color Slug | Heading Color Slug | Body Text Color Slug | Accent/Link Color Slug |
|---------------|-------------------|----------------------|------------------------|
| warm-cream | near-black | warm-gray | sage-green |
| light-sage | near-black | warm-gray | sage-green |
| near-black | warm-cream | warm-gray | warm-gold |

---

## Typography

### Font Families
| Family | Weights Used | Style | Source |
|--------|-------------|-------|--------|
| Lato | 300, 400, 700, 900 | normal, italic | google |

### Font Sizes
| Name | Slug | Min (px) | Max (px) | Fixed? | Slot | Usage |
|------|------|----------|----------|--------|------|-------|
| Display | display | 38 | 64 | no | heading | Hero H1 |
| Heading 2 | h2 | 29 | 40 | no | heading | Section titles (About, Services, Contact) |
| Heading 3 | h3 | 22 | 28 | no | heading | Card and sub-section headings |
| Heading 4 | h4 | 18 | 20 | no | heading | Hours card titles, accordion headers |
| Accent | accent | 18 | 20 | no | heading | Bio name, story box heading |
| Body | body | 15 | 17 | no | body | All standard paragraph copy |
| Eyebrow | eyebrow | 12 | 13 | yes | paragraph-variant | Uppercase section sub-labels ("What We Do", "Seeds for Change Partners") |
| Small | small | 13 | 14 | yes | paragraph-variant | Footer copy, legal, insurance note |
| Tagline | tagline | 16 | 20 | no | paragraph-variant | Hero italic tagline / sub-headline |

### Base Paragraph Size
- **Min:** 15px
- **Max:** 17px

---

## Spacing (max 7 steps)
| Step | Semantic Use | Min (px) | Max (px) |
|------|-------------|----------|----------|
| xxs | Icon padding, dot/rule spacing | 4 | 6 |
| xs | Button padding (vertical), inline gap | 8 | 12 |
| s | Card internal padding, list item gap | 14 | 18 |
| m | Card padding, stacked element gap | 24 | 32 |
| l | Bio/story box padding, section content gap | 40 | 56 |
| xl | Section vertical padding | 64 | 96 |
| xxl | Hero vertical padding / full-section breathing room | 80 | 120 |

---

## Buttons
| Slug | Label | Visual Description | BG Color | Text Color | Border Color | Hover Description |
|------|-------|--------------------|----------|------------|--------------|-------------------|
| fill-gold | Gold Fill | Solid fill, pill-shaped, uppercase tracking | warm-gold | #FFFFFF | none | Background lightens ~15% (opacity 0.85) |
| fill-green | Green Fill | Solid fill, pill-shaped | sage-green | #FFFFFF | none | Background lightens ~15% (opacity 0.85) |
| outline-white | White Outline | Transparent fill, pill-shaped, white border | transparent | #FFFFFF | rgba(255,255,255,0.7) | Background becomes rgba(255,255,255,0.15), border fully opaque white |
| outline-green | Green Outline | Transparent fill, pill-shaped, green border | transparent | sage-green | sage-green | Background fills to sage-green, text becomes white |
| ghost-dark | Ghost Dark | Transparent, no border, text-only nav item with bottom-border underline on hover | transparent | near-black | none | 2px bottom border appears in warm-gold |
| ghost-light | Ghost Light | Transparent, no border, text-only nav item on hero (light context) | transparent | #FFFFFF | none | 2px bottom border appears in warm-gold |

---

## Border Radius
- **Global default:** pill (999px) for buttons; 12px for cards and panels
- **Button override:** pill (999px)
- **Input / form field override:** 8px (if/when a form is added)

---

## Forms
- **Form handler:** none (launch is phone/email contact only; Netlify Forms to be considered in a future phase)
- **Input treatment:** n/a at launch
- **Label treatment:** n/a at launch
- **Select / dropdown:** n/a at launch
- **Checkboxes / radios:** n/a at launch
- **Validation errors:** n/a at launch
- **Submit button mirrors:** fill-green (for future implementation)

---

## Paragraph Variants (max 4)
| Slug | Label | What Makes It Different |
|------|-------|------------------------|
| eyebrow | Eyebrow | Uppercase, 0.12em letter-spacing, 700 weight, warm-gray color, ~12–13px fixed |
| tagline | Tagline | Italic, 300 weight, slightly larger than body (16–20px fluid), used for hero subtitle and CTA banner phrase |
| small | Small | 13–14px fixed, opacity ~0.65, used for footer copy, insurance note, legal-adjacent text |
| credentials | Credentials | Italic, 700 weight, sage-green color, ~13–15px, used for bio credential lines |

---

## Heading Treatments
- All section H2s use `text-transform: uppercase` and `letter-spacing: 0.05em`. Every H2 is preceded by a short 40px × 3px warm-gold decorative rule (horizontal bar), centered, implemented as a `<span>` or `::before` pseudo-element.
- H1 (hero) uses `text-transform: uppercase`, `letter-spacing: 0.03em`, weight 900, white color with text-shadow.
- H3s in the story/origin box and hours cards are not uppercase — standard case, weight 700, sage-green color.
- No gradient text. No animated headings.

---

## Link Styles
- **Default color:** inherits from surrounding text
- **Underline:** never (for nav and button-style links); decorative bottom-border on hover for nav items
- **Hover:** nav ghost links gain a 2px warm-gold bottom border; footer links lighten to full white from 75% opacity white

---

## List Variants
| Slug | Label | Bullet/Icon Treatment |
|------|-------|-----------------------|
| dot-gold | Gold Dot List | 6×6px warm-gold filled circle (inline `<span>`), used for service accordion items |

---

## Details / Accordion
| Slug | Label | Summary Treatment |
|------|-------|-------------------|
| services-accordion | Services Accordion | Header: 700 weight, ~17px, white text on sage-green fill when open; near-black on white when closed. Chevron icon (SVG) rotates 180° open/closed. Body: white background, dot-gold list items with 1px light-sage dividers between items. Transition: max-height animation 0.35s ease. |

---

## Special Visual Effects

### Shadows
- **Text shadow:** Hero H1 and nav text over hero image: `0 2px 16px rgba(0,0,0,0.4)`. Hero body text: `0 1px 4px rgba(0,0,0,0.3)`.
- **Box shadow:** Cards and panels: `0 4px 20px rgba(0,0,0,0.07)`. Bio photo circles: `0 8px 24px rgba(0,0,0,0.12)`. Gold CTA button on hero: `0 4px 16px rgba(0,0,0,0.25)`, lifts to `0 8px 24px rgba(0,0,0,0.3)` on hover. Image cards in intro strip: `0 4px 20px rgba(0,0,0,0.10)`, lifts on hover.
- **Image/SVG drop shadow:** Logo in hero: `drop-shadow(0 4px 12px rgba(0,0,0,0.3))`.

### Blend Modes
| Element | Mode | Context |
|---------|------|---------|
| Hero background image | brightness(0.68) saturate(0.9) via CSS filter | Not a blend-mode per se — CSS filter on absolutely positioned background div beneath overlay gradient |

---

## Decorative Elements

### Inline SVG / Accents
| Description | Where It Appears | Implementation Hint |
|-------------|-----------------|---------------------|
| 40px × 3px warm-gold horizontal rule | Above every H2 section title, centered | `<span>` with explicit width/height/background, display:inline-block, border-radius:2px |
| 1px × 40px vertical white fade line | Hero bottom scroll indicator | `<div>` with linear-gradient from rgba(255,255,255,0.6) to transparent |
| 6×6px warm-gold filled circle | Bullet point in accordion service lists | Inline `<span>` with border-radius:50% and background:warm-gold |

### Background Patterns / Textures
The hero section uses a full-bleed client-supplied photograph (`background.jpg` — a kaleidoscopic botanical/nature image) as a `background-size: cover` background image, with a CSS `filter: brightness(0.68) saturate(0.9)` applied and a dark gradient overlay layered on top. No tiled patterns or noise textures elsewhere.

---

## Animations
| Element | Type | Trigger | Notes |
|---------|------|---------|-------|
| Nav bar background | fade + blur-in | scroll | Transparent on hero; transitions to rgba(247,245,240,0.97) with backdrop-filter:blur(8px) and 1px bottom border after 40px scroll. CSS transition: all 0.3s ease. |
| Intro image cards | slide-up (translateY -4px) | hover | Not scroll-triggered. Box-shadow also lifts. |
| Hero gold CTA button | slide-up (translateY -2px) | hover | Box-shadow lifts. |
| Accordion panel | max-height expand | click | max-height animates from 0 to 600px over 0.35s ease. |
| Accordion chevron | rotate 180° | click | CSS transform transition 0.25s on SVG icon. |

No scroll-triggered entry animations are currently in the design. Consider adding subtle fade-in/slide-up on section entry as a low-risk enhancement during build.

---

## Navigation
- **Top-level items:** About (→ #about), Services (→ #services), Contact (→ #contact)
- **Sub-navigation:** None
- **Nav extras:** Clicking the logo (left side of nav bar) scrolls to top / #home. No phone number or CTA button in nav bar.
- **Mobile menu type:** Slide-down inline drawer (expands below the nav bar, not full-screen). Background: warm-cream (#F7F5F0). Top border: 3px solid sage-green.
- **Mobile menu extras:** None — links only, same three items.
- **Mobile menu animation:** Slide-down (the drawer appears below the fixed nav bar). No overlay.

---

## Content Collections

### Global Settings
- **File:** `data/settings.yaml`
- **Fields:**
  - site_name (string)
  - tagline (string)
  - phone (string)
  - email (string)
  - address_line1 (string)
  - address_line2 (string)
  - address_suite (string)
  - address_location_name (string)
  - address_note (text)
  - footer_entity_name (string)
  - logo (image)

---

### Singleton Pages
| Page | Content File | Structured Fields |
|------|-------------|-------------------|
| Homepage | content/_index.md | hero_headline (string), hero_tagline (string), hero_description (text), hero_cta_primary_label (string), hero_cta_secondary_label (string), intro_section_heading (string), intro_section_body (text) |
| About | content/about/_index.md | section_heading (string), section_subheading (string), story_heading (string), story_body (markdown) |
| Contact | content/contact/_index.md | section_heading (string), section_subheading (string), cta_phrase (string), location_note (text), office_photo (image) |

---

### Posts (time-ordered, own pages)
None at launch.

---

### Entries (non-dated, own pages)

| Slug | Label | Fields | Taxonomy |
|------|-------|--------|----------|
| team | Team Members | name (string), credentials (string), role_description (text), photo (image), display_order (string) | none |

---

### Data Collections (no own pages)

| Slug | Label | Fields per Item |
|------|-------|-----------------|
| services | Services | title (string), items (list\<string\>), footnote (string) |
| counseling_hours | Counseling & Coaching Hours | day_label (string), hours (string) |
| consulting_hours | Consultation Hours | day_label (string), hours (string) |
| intro_cards | Intro Section Cards | label (string), image (image), link_to_section (string) |

---

## Notes to Developer

1. **Single-page vs. multi-page:** The current design is a single scrolling page with anchor links. For Astro, this can be implemented as a single `index.astro` with named anchor IDs, pulling content from the singletons and data collections. No separate page routes needed at launch beyond the homepage.

2. **Repositioning flag:** The client plans to narrow the site's focus at a future date. The Services section is the most likely candidate for restructuring. The `services` data collection should be easy to edit in Decap — keep it flat and don't over-nest it.

3. **Logo:** The logo is a hand-drawn illustration created by the clients' children. Preserve it exactly — do not re-draw, re-trace, or substitute. Use the supplied PNG (`uploads/logo.png`) which has a transparent background. Apply `drop-shadow` filter in CSS for the hero context.

4. **Hero background image:** The hero uses a full-bleed botanical kaleidoscope photo (`uploads/background.jpg`). It is client-supplied and intentional. Recommend making this a singleton field (`hero_background_image`) so the client can swap it without a deploy.

5. **Nav scroll behavior:** The nav bar starts fully transparent (over the hero image) and transitions to a frosted warm-cream background on scroll. This requires a small JS scroll listener — straightforward in Astro with a `<script>` in the layout.

6. **Dr. Slambert credential line:** Scott Lambert's credential line reads "aka Dr. Slambert, Ed.D." — this is intentional and should be preserved verbatim. It is a known nickname used professionally.

7. **Accordion interactivity:** The services accordion requires JS. Astro handles this cleanly with `<script>` or a lightweight island. No framework needed — vanilla JS toggle is sufficient.

8. **Contact form:** No form at launch. If added later, Netlify Forms is the recommended path. A hidden `netlify` attribute on a standard HTML form is all that's needed.

9. **Hours data:** Hours are listed in two separate groups (Counseling & Coaching vs. Consultation). These are currently static but realistically will need updating, so they're broken into two data collections. Decap's list widget handles them well.

10. **Print version:** A separate `index-print.html` was produced for PDF export purposes. This is not needed in the Astro build — the main site's print stylesheet should be sufficient for any print use.
