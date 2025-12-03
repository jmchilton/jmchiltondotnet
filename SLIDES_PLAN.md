# Reveal.js Slides Integration Plan

## Overview

Integrate Reveal.js with this Astro site to support slide presentations, following existing site patterns (content collections, dynamic routing, terminal aesthetic).

## User Requirements

- Lab Talk presentation about Claude needed for tomorrow
- Match current site's theme (github-light Shiki theme, terminal aesthetic)
- Don't worry about speaker notes yet
- Don't worry about PDF export

## Site Context

**Current Theme/Styling:**

- Colors: Terminal theme with white bg (#ffffff), dark text (#1a1a1a), blue links (#0066cc)
- Fonts: JetBrains Mono (headings/mono), Inter (body)
- Code theme: `github-light` (Shiki)
- Tailwind utility classes with custom terminal-\* prefixes

**Current Patterns:**

- Content collections with Zod schemas (timeline, problems, cocktail-menus, awards)
- Dynamic routes via `[slug].astro` with `getStaticPaths()`
- Index pages listing all entries with TerminalPrompt wrapper
- MDX for rich content with Shiki code highlighting

## Implementation Steps

### 1. Install Dependencies

**File:** `package.json`

```bash
npm install reveal.js
```

**Packages needed:**

- `reveal.js` (v5.1.0) - Core presentation framework
- No additional packages needed - Astro's MDX handles markdown, Shiki handles code

---

### 2. Add Slides Content Collection

**File:** `src/content/config.ts`

Add new collection schema after existing collections:

```typescript
const slidesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(), // YYYY-MM-DD
    event: z.string().optional(), // "Lab Talk", "Conference", etc.
    tags: tagsSchema, // Reuse existing tags
    featured: z.boolean().default(false),
    transition: z.enum(['slide', 'fade', 'zoom', 'convex', 'concave']).default('slide'),
    showControls: z.boolean().default(true),
    showProgress: z.boolean().default(true),
  }),
});

export const collections = {
  timeline: timelineCollection,
  awards: awardsCollection,
  problems: problemsCollection,
  'cocktail-menus': cocktailMenusCollection,
  slides: slidesCollection, // NEW
};
```

**Design decisions:**

- Removed custom `theme` field - will use single terminal theme matching site
- Keep `transition`, `showControls`, `showProgress` for presentation control
- Reuse existing `tagsSchema` for consistency
- `event` field optional (Lab Talk, Conference, etc.)

---

### 3. Create Slides Content Directory

**Directory:** `src/content/slides/`

Create directory and initial presentations:

```bash
mkdir -p src/content/slides
```

---

### 4. Create SlideLayout Component

**File:** `src/layouts/SlideLayout.astro`

Standalone layout (not using BaseLayout) for full-screen presentations:

```astro
---
import '../styles/global.css';
import 'reveal.js/dist/reveal.css';

interface Props {
  title?: string;
  description?: string;
  transition?: string;
  showControls?: boolean;
  showProgress?: boolean;
}

const {
  title = 'Presentation',
  description = 'Slide presentation',
  transition = 'slide',
  showControls = true,
  showProgress = true,
} = Astro.props;

const fullTitle = `${title} | jmchilton.net`;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{fullTitle}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalURL} />

    {/* Fonts - match site */}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />

    {/* Terminal theme matching site aesthetic */}
    <style is:inline>
      :root {
        /* Match tailwind.config.mjs colors */
        --r-background-color: #ffffff;
        --r-main-font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        --r-heading-font: 'JetBrains Mono', 'Courier New', monospace;
        --r-main-color: #1a1a1a;
        --r-heading-color: #1a1a1a;
        --r-link-color: #0066cc;
        --r-link-color-hover: #0052a3;
        --r-selection-background-color: #e6f2ff;
        --r-selection-color: #1a1a1a;
        --r-code-font: 'JetBrains Mono', 'Courier New', monospace;
      }

      .reveal {
        font-size: 36px;
        font-family: var(--r-main-font);
      }

      .reveal h1,
      .reveal h2,
      .reveal h3,
      .reveal h4,
      .reveal h5,
      .reveal h6 {
        font-weight: 600;
        text-transform: none;
        font-family: var(--r-heading-font);
        color: var(--r-heading-color);
        margin: 0 0 1rem 0;
      }

      .reveal h1 {
        font-size: 2.5em;
      }
      .reveal h2 {
        font-size: 1.8em;
      }
      .reveal h3 {
        font-size: 1.4em;
      }

      /* Code blocks - match github-light theme style */
      .reveal pre {
        font-size: 0.55em;
        line-height: 1.4;
        border: 1px solid #dee2e6;
        box-shadow: none;
        margin: 1em 0;
      }

      .reveal code {
        font-family: var(--r-code-font);
        background: #f8f9fa;
        padding: 0.1em 0.3em;
        border-radius: 3px;
      }

      .reveal pre code {
        padding: 1rem;
        background: #f8f9fa;
        display: block;
        overflow-x: auto;
      }

      /* Lists */
      .reveal ul,
      .reveal ol {
        margin: 1em 0;
        text-align: left;
      }

      .reveal li {
        margin: 0.5em 0;
      }

      /* Controls and progress - match terminal blue */
      .reveal .controls {
        color: var(--r-link-color);
      }

      .reveal .progress {
        background: rgba(0, 0, 0, 0.1);
        color: var(--r-link-color);
      }

      /* Slide number */
      .reveal .slide-number {
        color: #868e96;
        font-family: var(--r-code-font);
        font-size: 0.6em;
      }

      /* Utility classes for slides */
      .text-sm {
        font-size: 0.8em;
      }

      .opacity-70 {
        opacity: 0.7;
      }

      .grid-2col {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        align-items: start;
      }
    </style>
  </head>
  <body>
    <div class="reveal">
      <div class="slides">
        <slot />
      </div>
    </div>

    <script>
      import Reveal from 'reveal.js';
      import RevealHighlight from 'reveal.js/plugin/highlight/highlight.esm.js';
      import RevealMarkdown from 'reveal.js/plugin/markdown/markdown.esm.js';

      const showControls = { showControls };
      const showProgress = { showProgress };
      const transition = '{transition}';

      Reveal.initialize({
        hash: true,
        controls: showControls,
        progress: showProgress,
        center: true,
        transition: transition,
        slideNumber: 'c/t',
        plugins: [RevealHighlight, RevealMarkdown],
      });
    </script>
  </body>
</html>
```

**Key design decisions:**

- CSS custom properties match `tailwind.config.mjs` colors exactly
- Code blocks styled to match github-light aesthetic (light bg, subtle border)
- JetBrains Mono for headings/code, Inter for body
- Terminal blue (#0066cc) for controls/progress
- No separate theme file - all inline for maintainability
- Utility classes for common layouts (grid-2col, text-sm)

---

### 5. Create Dynamic Slide Route

**File:** `src/pages/slides/[slug].astro`

Pattern matches existing `problems/[slug].astro` and `cocktails/menus/[slug].astro`:

```astro
---
import { getCollection } from 'astro:content';
import SlideLayout from '../../layouts/SlideLayout.astro';

export async function getStaticPaths() {
  const slides = await getCollection('slides');
  return slides.map((slide) => ({
    params: { slug: slide.slug },
    props: { slide },
  }));
}

const { slide } = Astro.props;
const { Content } = await slide.render();
const { title, description, transition, showControls, showProgress } = slide.data;
---

<SlideLayout
  title={title}
  description={description}
  transition={transition}
  showControls={showControls}
  showProgress={showProgress}
>
  <Content />
</SlideLayout>
```

**Pattern consistency:**

- Identical structure to existing dynamic routes
- Static generation via `getStaticPaths()`
- Renders MDX via `Content` component

---

### 6. Create Slides Index Page

**File:** `src/pages/slides/index.astro`

List all presentations, matching `problems/index.astro` pattern:

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import TerminalPrompt from '../../components/TerminalPrompt.astro';
import TagBadge from '../../components/TagBadge.astro';

const allSlides = await getCollection('slides');
const sortedSlides = allSlides.sort(
  (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
);
---

<BaseLayout title="Slides" description="Presentation slides and talks">
  <TerminalPrompt command="ls -l slides/">
    <div class="mb-6">
      <h1 class="mb-3 font-mono text-3xl font-bold text-terminal-text">Presentations</h1>
      <p class="text-lg text-terminal-text-secondary">
        Slide decks from talks, presentations, and lectures.
      </p>
    </div>

    {
      sortedSlides.length === 0 ? (
        <p class="text-terminal-text-secondary">No presentations yet.</p>
      ) : (
        <div class="space-y-6">
          {sortedSlides.map((slide) => (
            <article class="terminal-card">
              <div class="mb-2 flex items-center gap-3">
                <span class="font-mono text-terminal-sm text-terminal-text-muted">
                  {slide.data.date}
                </span>
                {slide.data.event && (
                  <span class="terminal-badge-blue text-xs">{slide.data.event}</span>
                )}
              </div>

              <h2 class="mb-2 font-mono text-xl font-semibold">
                <a href={`/slides/${slide.slug}`} class="terminal-link">
                  {slide.data.title}
                </a>
              </h2>

              <p class="mb-3 text-terminal-text-secondary">{slide.data.description}</p>

              <div class="flex flex-wrap gap-2">
                {slide.data.tags.map((tag) => (
                  <TagBadge tag={tag} />
                ))}
              </div>
            </article>
          ))}
        </div>
      )
    }
  </TerminalPrompt>
</BaseLayout>
```

**Consistency:**

- Uses TerminalPrompt wrapper
- terminal-card styling
- TagBadge components
- Sorts by date (newest first)

---

### 7. Create Claude Lab Talk Presentation

**File:** `src/content/slides/claude-lab-talk.mdx`

Sample content with best practices:

````mdx
---
title: 'Claude: AI Assistant for Software Development'
description: "Lab talk on Claude's capabilities, architecture, and applications in research"
date: '2025-12-04'
event: 'Lab Talk'
tags: ['ai', 'developer-tools']
transition: 'slide'
showControls: true
showProgress: true
---

<section>

# Claude

AI Assistant for Software Development

<div class="text-sm opacity-70">Lab Talk - December 2025</div>

</section>

---

<section>

## What is Claude?

- Large language model by Anthropic
- Specialized for reasoning and coding tasks
- Focus on safety and helpfulness
- Context windows up to 200K tokens

</section>

---

<section>

## Key Capabilities

<div class="grid-2col">

<div>

### Code Generation

- Multi-language support
- Full context awareness
- Best practices

</div>

<div>

### Analysis

- Code review
- Bug detection
- Refactoring

</div>

</div>

</section>

---

<section>

## Code Example

```python
def analyze_sequence(dna: str) -> dict:
    """Analyze DNA sequence composition"""
    counts = {'A': 0, 'T': 0, 'G': 0, 'C': 0}

    for base in dna.upper():
        if base in counts:
            counts[base] += 1

    return counts

# Usage
result = analyze_sequence("ATCGATCG")
```
````

</section>

---

<section>

## Applications in Research

1. **Literature Review**
   - Summarize papers
   - Extract key findings
   - Identify gaps

2. **Data Analysis**
   - Write analysis scripts
   - Generate visualizations
   - Statistical modeling

3. **Documentation**
   - Method descriptions
   - Protocol generation
   - Paper writing

</section>

---

<section>

## Integration Patterns

```typescript
// Claude API example
const response = await anthropic.messages.create({
  model: 'claude-sonnet-4-5-20250929',
  max_tokens: 1024,
  messages: [
    {
      role: 'user',
      content: 'Analyze this dataset...',
    },
  ],
});
```

</section>

---

<section>

## Questions?

**Contact:** jmchilton@gmail.com

**Resources:**

- https://jmchilton.net
- https://github.com/jmchilton

</section>
```

**Slide authoring patterns:**

- Use `<section>` tags for each slide
- Horizontal slides: `---` separator
- Vertical slides: Nested `<section>` tags
- Code blocks: Standard MDX fenced code blocks
- Utility classes: `text-sm`, `opacity-70`, `grid-2col`
- Data attributes: `data-auto-animate`, `data-background-color` (optional)

---

### 8. Update Navigation

**File:** `src/components/TerminalNav.astro`

Add slides to navigation:

```typescript
const navItems: NavItem[] = [
  { label: 'problems', href: '/problems', isDirectory: true },
  { label: 'timeline', href: '/timeline', isDirectory: true },
  { label: 'slides', href: '/slides', isDirectory: true }, // ADD THIS
  { label: 'about', href: '/about', isDirectory: true },
  { label: 'resume', href: '/resume', isDirectory: true },
  { label: 'cv', href: '/cv', isDirectory: true },
  { label: 'best-of-pittsburgh', href: '/best-of-pittsburgh', isDirectory: true },
  { label: 'cocktails', href: '/cocktails', isDirectory: true },
];
```

---

### 9. Update Homepage

**File:** `src/pages/index.astro`

Add slides card to navigation section (around line 78, after timeline card):

```astro
<a href="/slides" class="terminal-card block">
  <h3 class="mb-2 font-mono text-lg font-semibold text-terminal-blue">slides/</h3>
  <p class="text-terminal-sm text-terminal-text-secondary">Presentations and talks</p>
</a>
```

---

### 10. Add Tags (if needed)

**File:** `src/data/tags.yaml`

Ensure presentation-relevant tags exist (check first, may already exist):

```yaml
ai:
  description: 'Artificial Intelligence and Machine Learning'
developer-tools:
  description: 'Developer tools and workflows'
```

---

## Testing Checklist

### Development

1. Run `npm install` to add reveal.js
2. Run `npm run dev`
3. Navigate to `http://localhost:4321/slides`
   - [ ] Index page shows claude-lab-talk
   - [ ] Styling matches terminal theme
4. Navigate to `http://localhost:4321/slides/claude-lab-talk`
   - [ ] Slides render correctly
   - [ ] Code highlighting matches github-light theme
   - [ ] Arrow keys navigate slides
   - [ ] Controls visible (if showControls: true)
   - [ ] Progress bar visible (if showProgress: true)
   - [ ] Slide counter shows (e.g., "1/7")

### Build

1. Run `npm run build`
   - [ ] No errors
   - [ ] Slides statically generated
2. Run `npm run preview`
   - [ ] Slides work in production build

### Navigation

- [ ] Homepage has slides card
- [ ] TerminalNav includes slides link
- [ ] Tags link to other content properly

---

## File Summary

**New Files:**

- `src/layouts/SlideLayout.astro` - Reveal.js layout with terminal theme
- `src/pages/slides/[slug].astro` - Dynamic slide route
- `src/pages/slides/index.astro` - Slides listing page
- `src/content/slides/claude-lab-talk.mdx` - Lab Talk presentation

**Modified Files:**

- `package.json` - Add reveal.js dependency
- `src/content/config.ts` - Add slides collection schema
- `src/components/TerminalNav.astro` - Add slides nav link
- `src/pages/index.astro` - Add slides card
- `src/data/tags.yaml` - Add ai/developer-tools tags (if needed)

**New Directories:**

- `src/content/slides/` - Presentation content

---

## Usage Guide

### Creating New Presentations

1. **Create MDX file** in `src/content/slides/my-talk.mdx`

2. **Add frontmatter:**

   ```yaml
   ---
   title: 'Talk Title'
   description: 'Brief description'
   date: '2025-12-04'
   event: 'Conference/Lab Talk'
   tags: ['relevant', 'tags']
   transition: 'slide'
   ---
   ```

3. **Write slides:**

   ```mdx
   <section># First Slide Content here</section>

   ---

   <section>## Second Slide - Point 1 - Point 2</section>
   ```

4. **View at** `/slides/my-talk`

### Advanced Features

**Fragments (incremental reveals):**

```html
<p class="fragment">Appears first</p>
<p class="fragment">Appears second</p>
```

**Background colors:**

```html
<section data-background-color="#e6f2ff"></section>
```

**Auto-animate:**

```html
<section data-auto-animate>
  <h2>Before</h2>
</section>

<section data-auto-animate>
  <h2>After</h2>
</section>
```

**Two-column layout:**

```html
<div class="grid-2col">
  <div>Left content</div>
  <div>Right content</div>
</div>
```

---

## Design Decisions

### Why No Custom Themes?

- Simpler to maintain one terminal theme matching site
- All styling inline in SlideLayout.astro
- Easy to tweak colors in one place
- Consistent experience across all presentations

### Why MDX with HTML Sections?

- Reveal.js requires `<section>` boundaries
- Markdown works inside sections
- Allows Reveal.js data attributes
- More explicit than pure markdown

### Why Content Collection?

- Consistent with site patterns
- Frontmatter validation
- Type-safe props
- Easy to query/filter presentations

### Code Highlighting Approach

- Use Reveal.js Highlight plugin (not Shiki in slides)
- Shiki runs at build time, Reveal runs client-side
- Styled CSS to match github-light aesthetic
- Can adjust highlighting theme via Reveal plugin config

---

## Future Enhancements

Consider later:

- PDF export functionality
- Embedded video/demo support
- Speaker notes view (press 's')
- Vertical slides for detailed content
- Custom fragments/animations
- Dark mode toggle
- Slide search
- Remote control (multiplexing)

---

## Implementation Order

1. Install reveal.js (`npm install`)
2. Add slides collection schema
3. Create SlideLayout.astro
4. Create dynamic route and index page
5. Create claude-lab-talk.mdx
6. Update navigation (TerminalNav + homepage)
7. Add tags if needed
8. Test in dev server
9. Test build
10. Commit and push
