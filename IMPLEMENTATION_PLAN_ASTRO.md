# jmchilton.net Implementation Plan (Astro.js)

## Project Overview

A retrospective timeline portfolio website showcasing professional developer work, academic contributions, and personal interests. Built with Astro.js + MDX, featuring a retro Linux terminal-inspired aesthetic, deployed to Linode with GitHub version control.

**Repository**: `jmchilton/jmchiltondotnet-astro`
**Domain**: jmchilton.net
**Tech Stack**: Astro 5, MDX, TypeScript, Tailwind CSS

---

## Why Astro.js?

**Migration Rationale**: After encountering severe dependency issues with Next.js 15 (and even 14) around MDX, static export, and webpack bundling, Astro.js provides:

- **First-class MDX support**: Built-in, no complex plugins needed
- **Content Collections**: Type-safe content management out of the box
- **Zero-config static output**: Designed for static sites from day one
- **No webpack issues**: Uses Vite for blazing-fast builds
- **Simpler dependencies**: Remark/rehype plugins work seamlessly
- **Better DX**: Less configuration, more productivity

---

## Progress Summary

**Current Status**: Phase 4 Complete ✅
**Last Updated**: 2025-10-22

### Completed Phases

- ✅ **Phase 1**: Project Foundation & Setup (Complete)
- ✅ **Phase 2**: Core Design System (Complete)
- ✅ **Phase 3**: Timeline Entry System (Complete)
- ✅ **Phase 4**: Claude Content Generation Commands (Complete)
- ⏳ **Phase 5**: Additional Pages & Content (Next)

### Lessons from Next.js Attempt

- ❌ Next.js 15: Webpack bundling bugs with MDX
- ❌ Next.js 14: Rehype/remark plugins incompatible with static export
- ❌ Zod validation: Incompatible with Next.js static export
- ❌ Complex MDX setup: Required workarounds and downgrades

### Astro.js Success Story

- ✅ Content Collections: Built-in type-safe schema validation working perfectly
- ✅ MDX integration: Zero issues with `@astrojs/mdx`
- ✅ Static export: 3 pages building flawlessly
- ✅ Remark/rehype: All plugins (gfm, slug, autolink-headings) working
- ✅ TypeScript: 15 files, 0 errors, automatic type generation
- ✅ Vite builds: Fast, stable, no webpack issues

---

## Phase 1: Project Foundation & Setup ✅

### 1.1 Astro Project Initialization ✓

- [x] Create new Astro project: `npm create astro@latest jmchiltondotnet-astro`
  - Choose: Empty template
  - Enable: TypeScript (strict)
  - Install dependencies: Yes
- [x] Create GitHub repository `jmchilton/jmchiltondotnet-astro`
- [x] Initialize git and push initial commit
- [x] Install core dependencies:
  ```bash
  npm install @astrojs/mdx @astrojs/tailwind tailwindcss
  npm install -D @tailwindcss/typography
  npm install remark-gfm rehype-slug rehype-autolink-headings
  ```

### 1.2 Directory Structure

Create the following structure:

```
/
├── .claude/
│   └── commands/        # Claude commands for content generation
├── src/
│   ├── content/
│   │   ├── config.ts    # Content collection schemas
│   │   └── timeline/    # MDX timeline entries
│   ├── components/      # Astro/React components
│   │   ├── TerminalNav.astro
│   │   ├── TimelineEntry.astro
│   │   └── MDXComponents.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── TimelineLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── timeline/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── about.astro
│   │   ├── best-of-pittsburgh/
│   │   └── cocktails.astro
│   ├── styles/
│   │   └── global.css
│   └── types/
│       └── index.ts
├── public/
│   ├── resume.pdf
│   └── cv.pdf
├── astro.config.mjs
├── tailwind.config.mjs
└── tsconfig.json
```

### 1.3 Astro Configuration ✓

- [x] Configure `astro.config.mjs`:

  ```javascript
  import { defineConfig } from 'astro/config';
  import mdx from '@astrojs/mdx';
  import tailwind from '@astrojs/tailwind';

  export default defineConfig({
    site: 'https://jmchilton.net',
    integrations: [
      mdx({
        remarkPlugins: [],
        rehypePlugins: [],
        syntaxHighlight: 'shiki',
        shikiConfig: { theme: 'github-light' },
      }),
      tailwind({ applyBaseStyles: false }),
    ],
    markdown: {
      shikiConfig: { theme: 'github-light' },
    },
  });
  ```

- [x] Configure Tailwind (`tailwind.config.mjs`)
- [x] Set up TypeScript (`tsconfig.json` with strict mode)

### 1.4 Content Collections Setup ✓

- [x] Create `src/content/config.ts` with timeline schema:

  ```typescript
  import { defineCollection, z } from 'astro:content';

  const timelineCollection = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      date: z.string(),
      type: z.enum(['pr', 'paper', 'poster', 'presentation', 'project']),
      description: z.string(),
      link: z.string().url(),
      tags: z.array(z.string()),
      featured: z.boolean().default(false),
    }),
  });

  export const collections = {
    timeline: timelineCollection,
  };
  ```

- [x] Create sample entry: `src/content/timeline/sample-entry.mdx`

### 1.5 Development Environment ✓

- [x] Configure ESLint for Astro (use `eslint-plugin-astro`)
- [x] Configure Prettier with Astro plugin
- [x] Set up Git hooks (Husky) for pre-commit linting
- [x] Configure lint-staged
- [x] Create `.gitignore` (node_modules, .astro, dist/, etc.)
- [x] Add development scripts to package.json:
  ```json
  {
    "scripts": {
      "dev": "astro dev",
      "build": "astro build",
      "preview": "astro preview",
      "format": "prettier --write .",
      "format:check": "prettier --check .",
      "lint": "eslint .",
      "typecheck": "astro check"
    }
  }
  ```
- [x] Create Makefile as primary entry point
- [x] Add GitHub Actions workflow for CI

---

## Phase 2: Core Design System ✅

### 2.1 Terminal-Inspired Theme ✓

- [x] Design color palette (modern terminal: black on white with accent colors)
  - Background: White (#ffffff), alt (#f8f9fa), hover (#f1f3f5)
  - Primary text: Deep black (#1a1a1a), secondary (#495057), muted (#868e96)
  - Accent colors: Blue, green, purple, red, yellow (with light variants)
  - Borders: Standard (#dee2e6) and dark (#adb5bd)

- [x] Typography system:
  - Monospace: JetBrains Mono for headers, navigation, code blocks
  - Sans-serif: Inter for body text and readability
  - Terminal-specific font sizes: terminal-sm, terminal, terminal-lg

- [x] Create Tailwind theme extension in `tailwind.config.mjs`
- [x] Design component primitives in `src/styles/global.css`:
  - `.terminal-*` classes for buttons, links, cards, badges, code blocks
  - Import `@tailwindcss/typography` for MDX prose styling

### 2.2 Terminal Navigation Component ✓

- [x] Build `<TerminalNav>` Astro component
  - Two-line design on desktop:
    ```
    $ jmchilton.net %
    timeline/  about/  resume.pdf  cv.pdf  best-of-pittsburgh/  cocktails/
    ```
  - Flexbox layout for responsive spacing
  - ls-style output: directories with `/`, files without
  - Color-coded: directories in blue, files in default text

- [x] Implement navigation logic
  - Use Astro's `<a>` tags for routing (no special router needed)
  - Hover states and interactive feedback
  - Mobile-responsive hamburger menu with terminal aesthetic

### 2.3 Layout Components ✓

- [x] Create `<BaseLayout>` Astro component
  - Include TerminalNav in header
  - Define HTML structure, metadata, styles
  - SEO meta tags and Open Graph tags

- [x] Create `<TerminalPrompt>` component (reusable command prompt UI)
  - Accepts `command` and `output` slots
  - Styled with terminal aesthetic

- [x] Create `<TimelineLayout>` extending BaseLayout
  - Specific layout for timeline entry pages
  - Back navigation to timeline

- [x] Update homepage (`src/pages/index.astro`)
  - Hero section with terminal aesthetic
  - Recent timeline entries showcase
  - Navigation to main sections

---

## Phase 3: Timeline Entry System ✅

### 3.1 Content Collection Schema ✓

- [x] Timeline collection configured in `src/content/config.ts`
- [x] Zod schema for validation (built into Astro)
- [x] TypeScript types auto-generated by Astro

### 3.2 MDX Configuration & Plugins ✓

- [x] Install remark/rehype plugins:

  ```bash
  npm install remark-gfm rehype-slug rehype-autolink-headings
  ```

- [x] Update `astro.config.mjs` with plugins:

  ```javascript
  import remarkGfm from 'remark-gfm';
  import rehypeSlug from 'rehype-slug';
  import rehypeAutolinkHeadings from 'rehype-autolink-headings';

  mdx({
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    syntaxHighlight: 'shiki',
    shikiConfig: { theme: 'github-light' },
  });
  ```

- [x] Create custom MDX components (`src/components/MDXComponents.astro`)
  - Style all MDX elements (links, headings, lists, code, tables)
  - Apply terminal-themed styling
  - Use Tailwind typography plugin as base

### 3.3 Timeline Pages ✓

- [x] Build `/timeline` route (`src/pages/timeline/index.astro`):

  ```typescript
  import { getCollection } from 'astro:content';
  const entries = await getCollection('timeline');
  const sortedEntries = entries.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
  ```

  - Single scrollable page
  - Render entry cards with `<TimelineEntry>` component

- [x] Create `<TimelineEntry>` component (`src/components/TimelineEntry.astro`):
  - Date + type badge (color-coded)
  - Title linked to full entry
  - Description excerpt
  - External resource link with icon
  - Tags displayed
  - Terminal-inspired card styling

- [x] Build individual entry pages (`src/pages/timeline/[slug].astro`):

  ```typescript
  import { getCollection } from 'astro:content';
  export async function getStaticPaths() {
    const entries = await getCollection('timeline');
    return entries.map((entry) => ({
      params: { slug: entry.slug },
      props: { entry },
    }));
  }
  const { entry } = Astro.props;
  const { Content } = await entry.render();
  ```

  - Render full MDX content with `<Content />`
  - Navigation back to timeline
  - Metadata generation for SEO

### 3.4 Timeline Extensibility Groundwork

- [ ] Structure code to support future features:
  - Tag filtering (UI hidden but data structure ready)
  - Type filtering (filter by PR, paper, etc.)
  - Date range filtering
  - Reverse order toggle
- [ ] Add placeholder for filter UI (commented out or feature-flagged)

---

## Phase 4: Claude Content Generation Commands ✅

### 4.1 Command Structure ✓

Create Claude commands in `.claude/commands/`:

- [x] `/add-pr.md` - Generate timeline entry from GitHub PR
- [x] `/add-paper.md` - Generate entry from academic paper
- [x] `/add-presentation.md` - Generate entry from talk/presentation
- [x] `/add-poster.md` - Generate entry from poster
- [x] `/add-project.md` - Generate entry from open source project

### 4.2 Command Specifications ✓

All commands have been created with comprehensive prompts including:

#### `/add-pr` Command ✓

- [x] Fetch PR data via GitHub API
- [x] Generate structured MDX with frontmatter
- [x] Include tag suggestions and content templates

All other commands (`/add-paper`, `/add-presentation`, `/add-poster`, `/add-project`) follow similar patterns with type-specific templates and examples.

### 4.3 Command Implementation ✓

- [x] Write detailed prompt templates for each command
- [x] Include instructions for:
  - Fetching external data (GitHub API, web scraping if needed)
  - Generating appropriate slugs (kebab-case, unique)
  - Creating well-structured MDX with frontmatter matching schema
  - Suggesting relevant tags based on content
  - Leaving placeholders for manual curation where needed
- [x] Test commands (ready to use)

---

## Phase 5: Additional Pages & Content

### 5.1 Homepage Enhancement ✓

- [x] Design landing page with terminal aesthetic (`src/pages/index.astro`)
  - Brief introduction ("Software developer, researcher, cocktail enthusiast...")
  - Terminal prompt leading to main navigation
  - Feature recent timeline entries (3 most recent)
  - Links to main sections

### 5.2 About Page

- [ ] Create `src/pages/about.astro`
- [ ] Content: Bio, skills, interests
- [ ] Terminal-styled content presentation
- [ ] Links to resume/CV PDFs

### 5.3 Resume & CV

- [ ] Create placeholder PDFs in `/public/`
- [ ] Ensure navigation links to `/resume.pdf` and `/cv.pdf`
- [ ] Style links with file icons (terminal aesthetic)
- [ ] Plan for future: Generate from timeline data (Phase 7+)

### 5.4 Best of Pittsburgh Awards System

Create a second Content Collection for Pittsburgh recommendations:

- [ ] Create `src/content/config.ts` awards collection schema:

  ```typescript
  const awardsCollection = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(), // e.g., "Best Mini-Golf in Pittsburgh"
      category: z.string(), // e.g., "entertainment", "food", "drinks", "coffee"
      winner: z.string(), // Business name
      location: z.string(), // Address or neighborhood
      year: z.number(), // Year of award
      tags: z.array(z.string()),
      featured: z.boolean().default(false),
    }),
  });
  ```

- [ ] Create `/add-award` Claude command
  - Prompt for category (e.g., "Best Dumplings in Pittsburgh")
  - Prompt for winner name, location, year
  - Generate slug from category
  - Create structured MDX with review/reasoning

- [ ] Build `/best-of-pittsburgh` page (`src/pages/best-of-pittsburgh/index.astro`)
  - List all awards grouped by category or year
  - Terminal-styled display (simulated `cat awards.txt`)
  - Filter by category

- [ ] Build individual award pages (`src/pages/best-of-pittsburgh/[slug].astro`)
  - Full review with MDX content
  - Map/location info if desired
  - Photos or additional context

### 5.5 Cocktails Page

- [ ] Create `src/pages/cocktails.astro`
  - Static content or simple gallery
  - Cocktail menus, recipes, or photos
  - Terminal-styled presentation

- [ ] Ensure navigation accommodates non-professional content gracefully

---

## Phase 6: Initial Content Population

### 6.1 Bootstrap Sample Entries

Using the Claude commands, create entries for:

- [ ] PR: https://github.com/galaxyproject/galaxy/pull/21102
- [ ] PR: https://github.com/galaxyproject/galaxy/pull/19305
- [ ] Presentation: https://docs.google.com/presentation/d/16GdNtnwh8St4C2AefvNY4g6RHnyhK__rl5W3Z5FZPUk/edit
- [ ] Presentation: https://docs.google.com/presentation/d/1XimzgRg9pdqnat-DG12cibYGGgkMrDxRz6lxCypaYHk/edit
- [ ] Paper: https://pmc.ncbi.nlm.nih.gov/articles/PMC10069471/

### 6.2 Manual Curation

- [ ] Review and edit generated entries
- [ ] Add personal context and retrospective insights
- [ ] Ensure tags are meaningful
- [ ] Verify all links work

### 6.3 Test Content Rendering

- [ ] Verify timeline page displays all entries correctly
- [ ] Check individual entry pages render MDX properly
- [ ] Test responsive design on mobile/tablet
- [ ] Validate syntax highlighting and MDX components

---

## Phase 7: Build & Deployment Preparation

### 7.1 Static Build

- [ ] Run `npm run build` (Astro builds to `dist/` by default)
- [ ] Verify output in `/dist` directory
- [ ] Test static site locally: `npm run preview`
- [ ] Verify all routes are pre-rendered

### 7.2 Optimization

- [ ] Optimize images (Astro's `<Image>` component or manual compression)
- [ ] Add metadata for SEO (already in BaseLayout)
- [ ] Create `public/robots.txt`
- [ ] Generate `sitemap.xml` (install `@astrojs/sitemap`)
- [ ] Add favicon and app icons (terminal-themed)

### 7.3 Linode Server Setup Documentation

Create `DEPLOYMENT.md` with instructions:

- [ ] Linode server provisioning:
  - Ubuntu/Debian server setup
  - Update system packages
  - Install nginx
- [ ] Nginx configuration:
  - Server block for jmchilton.net
  - Point document root to deployment directory
  - Configure SSL/TLS (Let's Encrypt via certbot)
- [ ] DNS configuration:
  - Point jmchilton.net A record to Linode IP
  - Configure www subdomain if desired
- [ ] File transfer methods:
  - SCP/RSYNC for manual deployment
  - Or automated deployment (next phase)

### 7.4 Manual Deployment Test

- [ ] Follow `DEPLOYMENT.md` instructions
- [ ] Deploy to Linode manually (`rsync -avz dist/ user@server:/var/www/jmchilton.net`)
- [ ] Test site live at jmchilton.net
- [ ] Verify all pages, links, and resources load correctly
- [ ] Test on multiple devices/browsers

---

## Phase 8: Automated Deployment (CI/CD)

### 8.1 GitHub Actions Workflow

- [ ] Create `.github/workflows/deploy.yml`
- [ ] Configure workflow to:
  - Trigger on push to `main` branch
  - Run `npm install` and `npm run build`
  - Generate static site in `/dist`
  - Deploy to Linode server via RSYNC

### 8.2 SSH Key Setup

- [ ] Generate SSH key pair for GitHub Actions
- [ ] Add public key to Linode server (`~/.ssh/authorized_keys`)
- [ ] Add private key to GitHub Secrets (`LINODE_SSH_KEY`)
- [ ] Store Linode server IP in GitHub Secrets (`LINODE_HOST`)
- [ ] Store deployment path in Secrets (`DEPLOY_PATH`)

### 8.3 Deployment Script

- [ ] Create deployment script in `.github/workflows/deploy.yml`:
  ```yaml
  - name: Deploy to Linode
    run: |
      rsync -avz --delete dist/ ${{ secrets.DEPLOY_USER }}@${{ secrets.LINODE_HOST }}:${{ secrets.DEPLOY_PATH }}
  ```
- [ ] Test automated deployment
- [ ] Verify changes propagate on push to GitHub

### 8.4 Rollback Plan

- [ ] Document rollback procedure in `DEPLOYMENT.md`
- [ ] Consider versioned deployments (timestamped directories)
- [ ] Add manual rollback instructions

---

## Phase 9: Polish & Launch

### 9.1 Final Design Pass

- [ ] Review all pages for design consistency
- [ ] Fine-tune terminal aesthetic (spacing, colors, animations)
- [ ] Ensure accessibility (keyboard navigation, color contrast, ARIA labels)
- [ ] Test all interactive elements (links, navigation, transitions)

### 9.2 Content Review

- [ ] Proofread all timeline entries
- [ ] Verify all external links are correct
- [ ] Ensure dates and metadata are accurate
- [ ] Add any missing tags for future filtering

### 9.3 Performance & SEO

- [ ] Run Lighthouse audit (performance, accessibility, SEO)
- [ ] Optimize based on audit results
- [ ] Test page load times
- [ ] Verify SEO metadata on all pages
- [ ] Add Open Graph and Twitter Card metadata

### 9.4 Launch Checklist

- [ ] Final deployment to Linode
- [ ] DNS propagation check
- [ ] SSL certificate verification
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing
- [ ] Share site with friends for feedback

---

## Phase 10: Future Enhancements (Post-Launch)

### 10.1 Timeline Filtering & Sorting

- [ ] Implement tag filtering UI (client-side or View Transitions API)
- [ ] Add entry type filter (PR, paper, project, etc.)
- [ ] Add date range filter
- [ ] Implement chronological vs reverse toggle
- [ ] Persist filter state in URL params

### 10.2 Search Functionality

- [ ] Add full-text search across timeline entries
- [ ] Client-side search with Fuse.js or Pagefind
- [ ] Search UI with terminal aesthetic

### 10.3 RSS Feed

- [ ] Generate RSS feed from timeline entries
- [ ] Use `@astrojs/rss` package
- [ ] Auto-update on new entries
- [ ] Add subscription link

### 10.4 Analytics

- [ ] Add privacy-respecting analytics (Plausible, Fathom, or self-hosted)
- [ ] Track page views and popular content
- [ ] Respect Do Not Track settings

### 10.5 Content Expansion

- [ ] Add blog post entry type (longer-form writing)
- [ ] Expand Best of Pittsburgh awards with more categories and entries
- [ ] Add cocktail recipes and reviews
- [ ] Consider photo galleries (terminal-styled)
- [ ] Add "Now" page (what you're currently working on)

### 10.6 Resume/CV Generation

- [ ] Build resume generator from timeline data
- [ ] Create printable PDF from structured content
- [ ] Auto-update resume when timeline entries added

### 10.7 Interactive Features

- [ ] Terminal emulator easter egg (hidden command-line interface)
- [ ] Konami code or other nerdy interactions
- [ ] ASCII art generation or animations

---

## Technical Specifications Summary

### Tech Stack

- **Framework**: Astro 5 (Static Site Generator)
- **Content**: MDX with Content Collections
- **Styling**: Tailwind CSS + @tailwindcss/typography
- **Hosting**: Linode (nginx)
- **Version Control**: GitHub
- **CI/CD**: GitHub Actions
- **Domain**: jmchilton.net

### Astro Advantages Over Next.js

| Feature            | Next.js (Previous)       | Astro.js (New)         |
| ------------------ | ------------------------ | ---------------------- |
| MDX Support        | Complex, buggy           | Built-in, seamless     |
| Static Export      | Requires config, issues  | Default behavior       |
| Content Validation | Zod incompatible         | Built-in Zod schemas   |
| Remark/Rehype      | Incompatible with static | Full support           |
| Build Tool         | Webpack (issues)         | Vite (fast, stable)    |
| Learning Curve     | Moderate                 | Simple                 |
| DX                 | Configuration-heavy      | Convention over config |

### File Structure

```
jmchiltondotnet-astro/
├── .claude/
│   └── commands/
│       ├── add-pr.md
│       ├── add-paper.md
│       ├── add-presentation.md
│       ├── add-poster.md
│       └── add-project.md
├── .github/
│   └── workflows/
│       └── deploy.yml
├── src/
│   ├── content/
│   │   ├── config.ts
│   │   └── timeline/
│   │       ├── galaxy-pr-21102.mdx
│   │       ├── galaxy-pr-19305.mdx
│   │       └── ...
│   ├── components/
│   │   ├── TerminalNav.astro
│   │   ├── TimelineEntry.astro
│   │   └── MDXComponents.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── TimelineLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── timeline/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── about.astro
│   │   ├── best-of-pittsburgh/
│   │   └── cocktails.astro
│   ├── styles/
│   │   └── global.css
│   └── types/
│       └── index.ts
├── public/
│   ├── resume.pdf
│   ├── cv.pdf
│   └── favicon.ico
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

### Entry Type Definitions

- **pr**: Pull request contribution
- **paper**: Academic paper/publication
- **poster**: Conference poster/presentation
- **presentation**: Talk/conference presentation
- **project**: Open source project or major launch

---

## Implementation Timeline Estimate

- **Phase 1** (Foundation & Setup): 1 day
- **Phase 2** (Design System): 1-2 days
- **Phase 3** (Timeline System): 1-2 days
- **Phase 4** (Claude Commands): 1-2 days
- **Phase 5** (Additional Pages): 1 day
- **Phase 6** (Content Population): 1 day
- **Phase 7** (Deployment Prep): 1 day
- **Phase 8** (CI/CD): 1 day
- **Phase 9** (Polish & Launch): 1-2 days

**Total Estimated Time**: 9-13 days

**Note**: Significantly faster than Next.js due to less dependency wrestling and simpler configuration.

---

## Success Criteria

- [ ] Static site builds without errors or warnings
- [ ] Terminal-inspired design is cohesive and professional
- [ ] Timeline displays all entry types correctly
- [ ] Claude commands successfully generate MDX entries
- [ ] Navigation simulates terminal `ls` output
- [ ] Site is responsive on mobile/tablet/desktop
- [ ] Automated deployment works on git push
- [ ] All external links and PDFs are accessible
- [ ] Code is well-documented and maintainable
- [ ] Site passes Lighthouse accessibility/performance audits (90+ scores)

---

## Notes & Considerations

- **Content First**: Prioritize getting the timeline working over perfect design initially
- **Iterative Approach**: Launch with core features, enhance over time
- **Accessibility**: Ensure terminal aesthetic doesn't compromise usability
- **Performance**: Astro's zero-JS default should yield excellent performance
- **Extensibility**: Code structure should accommodate future filtering/search features
- **Personal Touch**: Balance professional showcase with personality (Best of Pittsburgh awards, cocktails)
- **Curation**: Claude generates drafts, but manual editing is key to quality

---

## Migration from Next.js

### What We're Keeping

- ✅ Terminal-inspired design system (colors, typography)
- ✅ Content structure (timeline entries, frontmatter schema)
- ✅ File organization philosophy
- ✅ Claude command approach for content generation
- ✅ Deployment strategy (Linode + GitHub Actions)

### What We're Changing

- ❌ Next.js → ✅ Astro.js
- ❌ Manual MDX parsing → ✅ Content Collections
- ❌ next-mdx-remote → ✅ @astrojs/mdx
- ❌ Webpack → ✅ Vite
- ❌ React components for everything → ✅ Astro components (with React optional)
- ❌ Complex configuration → ✅ Convention-based simplicity

---

_End of Implementation Plan (Astro.js Version)_
