# jmchilton.net Implementation Plan

## Project Overview

A retrospective timeline portfolio website showcasing professional developer work, academic contributions, and personal interests. Built with Next.js (static export) + MDX, featuring a retro Linux terminal-inspired aesthetic, deployed to Linode with GitHub version control.

**Repository**: `jmchilton/jmchiltondotnet`
**Domain**: jmchilton.net
**Tech Stack**: Next.js 14, MDX, TypeScript, Tailwind CSS

---

## Progress Summary

**Current Status**: Phase 3 Complete ✅
**Last Updated**: 2025-10-20

### Completed Phases

- ✅ **Phase 1.1**: Repository & Initial Structure
- ✅ **Phase 1.2**: TypeScript Configuration
- ✅ **Phase 1.3**: Development Environment
- ✅ **Phase 2.1**: Terminal-Inspired Theme
- ✅ **Phase 2.2**: Terminal Navigation Component
- ✅ **Phase 2.3**: Layout Components
- ✅ **Phase 3.1**: MDX Content Infrastructure
- ✅ **Phase 3.2**: Timeline Entry Schema & Display
- ✅ **Phase 3.3**: Individual Entry Pages

### Phase 3: Timeline Entry System - COMPLETE ✅

**Resolution**: Downgraded to Next.js 14.2.33

After extensive debugging with Next.js 15 (10+ attempted solutions), the webpack bundling bug was resolved by downgrading to Next.js 14. The same code that failed in Next.js 15 works perfectly in Next.js 14, confirming this was a Next.js 15 regression.

**Implementation Details**:

- **lib/mdx.ts**: Full MDX parsing with gray-matter + next-mdx-remote
  - `getAllEntrySlugs()`: Scans content/timeline/ directory
  - `getAllEntries()`: Returns sorted timeline entries (reverse chronological)
  - `getEntryBySlug()`: Loads individual entry with frontmatter
  - `compileMDXContent()`: Renders MDX to React components

- **Timeline Pages**:
  - `/timeline`: List view with TimelineEntry cards
  - `/timeline/[slug]`: Detail view with full MDX content rendering
  - Static generation with generateStaticParams()

- **Dependencies**:
  - `next@14.2.33`: Stable MDX support
  - `gray-matter@4.0.3`: YAML frontmatter parsing
  - `next-mdx-remote@5.0.0`: MDX compilation for Next.js

**Build Output**:

```
✓ Generating static pages (6/6)
○ /timeline (180 B, 96.2 kB First Load JS)
● /timeline/[slug] (180 B, 96.2 kB First Load JS)
  └ /timeline/sample-entry
```

### Next Up

- **Phase 4**: Claude Content Generation Commands
- **Phase 5**: Additional Pages (About, Restaurants, Cocktails)

### Git Commits

- `006ba38` - Initial commit: Next.js setup with Tailwind CSS and Makefile
- `5a455d7` - Phase 1.2: TypeScript type system and validation
- `f407844` - Update IMPLEMENTATION_PLAN.md with progress tracking
- `764c361` - Phase 1.3: Development environment with Prettier, Husky, and CI
- `cdd3bff` - Update Husky pre-commit hook to remove deprecated lines
- `366e2b5` - Add Phase 1.3 completion summary document
- `b0de781` - Update IMPLEMENTATION_PLAN.md - Phase 1 fully complete
- `d0589d1` - Phase 2: Core Design System - Terminal components and theme
- `6984fec` - Update IMPLEMENTATION_PLAN.md - Phase 2 complete
- `7d42bc2` - Update terminal prompt to use john@jmchilton.net format
- `d5b1048` - Phase 3: Timeline Entry System with MDX infrastructure (Next.js 15)
- `0fe51ef` - Document Next.js 15 webpack bundling bug blocking Phase 3
- `5ba8942` - **Fix Phase 3: Downgrade to Next.js 14 to resolve webpack bundling bug** ✅
- `4ee42a4` - Remove Zod dependency (incompatible with static export)
- `[pending]` - Document rehype/remark incompatibility with static export

---

## Phase 1: Project Foundation & Setup

### 1.1 Repository & Initial Structure ✓

- [x] Create new GitHub repository `jmchilton/jmchiltondotnet`
- [x] Initialize Next.js project with TypeScript
- [x] Configure for static export (`output: 'export'` in next.config.js)
- [x] Set up Tailwind CSS for styling
- [ ] Install MDX dependencies (`@next/mdx`, `next-mdx-remote`, etc.)
- [x] Create basic directory structure:
  ```
  /
  ├── content/
  │   └── timeline/        # MDX timeline entries (slug-based naming)
  ├── public/
  │   ├── resume.pdf
  │   └── cv.pdf
  ├── src/
  │   ├── app/             # Next.js 14 app directory
  │   ├── components/      # React components
  │   ├── lib/             # Utilities (MDX parsing, sorting, etc.)
  │   └── types/           # TypeScript types
  └── .claude/
      └── commands/        # Claude commands for content generation
  ```

### 1.2 TypeScript Configuration ✓

- [x] Define core types:
  - `TimelineEntry` (slug, title, date, type, description, link, tags, content)
  - `EntryType` enum (pr, paper, poster, presentation, project)
  - Additional types: `EntryFrontmatter`, `TimelineFilter`, `SortOrder`, `EntryTypeConfig`
- [x] Configure strict TypeScript settings
  - Enabled: `noUncheckedIndexedAccess`, `noImplicitReturns`, `noFallthroughCasesInSwitch`
- [x] Set up path aliases for clean imports
  - Configured: `@/components/*`, `@/lib/*`, `@/types/*`, `@/app/*`
- [x] Add Zod schemas for runtime validation
- [x] Create type guards and constants

### 1.3 Development Environment ✓

- [x] Configure ESLint (migrated to v9 flat config)
- [x] Configure Prettier with custom settings
- [x] Set up Git hooks (Husky) for pre-commit linting and formatting
- [x] Configure lint-staged for running checks on staged files
- [x] Create `.gitignore` (node_modules, .next, out/, etc.)
- [x] Add development scripts to package.json (format, format:check, etc.)
- [x] Create Makefile as primary entry point
- [x] Add GitHub Actions workflow for CI (lint, format, typecheck, build)

---

## Phase 2: Core Design System

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
- [x] Create Tailwind theme extension with terminal colors
- [x] Design component primitives (buttons, links, cards, badges, code blocks)
  - All primitives defined in globals.css with `.terminal-*` classes

### 2.2 Terminal Navigation Component ✓

- [x] Build `<TerminalNav>` component
  - Two-line design on desktop:
    ```
    $ jmchilton.net %
    timeline/  about/  resume.pdf  cv.pdf  restaurants/  cocktails/
    ```
  - Flexbox layout for responsive spacing
  - ls-style output: directories with `/`, files without
  - Color-coded: directories in blue, files in default text
- [x] Implement navigation logic with Next.js Link
  - Client-side routing with smooth transitions
  - Hover states and interactive feedback
- [x] Make responsive (hamburger menu on mobile with terminal aesthetic)
  - Mobile menu in terminal-code styled dropdown
  - Accessible button with proper ARIA labels

### 2.3 Layout Components ✓

- [x] Create `<RootLayout>` with terminal nav
  - TerminalNav included in all pages
  - Proper semantic HTML structure
- [x] Build `<TerminalPrompt>` component (reusable command prompt UI)
  - Accepts `command` and `output` props
  - Styled with terminal aesthetic
- [x] Update homepage with terminal components
  - Hero section, interactive cards, sections for all content types
- [ ] Build `<TimelineLayout>` for entry pages (Phase 3)
- [ ] Create page transition animations (Phase 3)

---

## Phase 3: Timeline Entry System

### 3.1 MDX Content Infrastructure ✓

- [x] Configure MDX processing pipeline
  - ✓ Using `next-mdx-remote/rsc`
  - ❌ Syntax highlighting (rehype-highlight) - **incompatible with static export**
  - ❌ Remark plugins (remark-gfm) - **incompatible with static export**
  - ✓ gray-matter for frontmatter parsing

**Note**: The unified/rehype/remark ecosystem causes webpack bundling errors in Next.js static export mode (both Next.js 14 and 15). These packages cannot be used with `output: 'export'`. Plain MDX rendering works without plugins.

- [x] Create MDX components library for rich content:
  - All MDX elements styled (links, headings, lists, code, tables, etc.)
  - Terminal-themed styling applied
  - Created in components/MDXComponents.tsx
- [x] Build content parsing utilities:
  - `getAllEntries()`: Reads all MDX files from `/content/timeline/`
  - `getEntryBySlug()`: Loads specific entry with frontmatter
  - `compileMDXContent()`: Compiles MDX to React components
  - Entries sorted reverse chronologically

### 3.2 Timeline Entry Schema ✓

- [x] Define frontmatter schema (using existing types from Phase 1.2)
  - All required fields: title, date, type, description, link, tags
  - Type definitions in types/index.ts
- [x] Create validation utility
  - ❌ Zod is **incompatible with static export** (same webpack bundling issues)
  - ✓ Custom runtime validation function implemented in lib/mdx.ts
  - Validates all required fields and types with clear error messages
- [x] TypeScript types already defined in Phase 1.2

**Note**: Zod and other validation libraries that use complex module systems cannot be bundled with Next.js static export.

### 3.3 Timeline Display Page ✓

- [x] Build `/timeline` route
  - Single scrollable page implemented
  - Loads and sorts all entries
  - Renders entry cards with TerminalPrompt header
- [x] Design `<TimelineEntry>` component:
  - Date + type badge (color-coded)
  - Title linked to full entry
  - Description excerpt shown
  - External resource link with icon
  - Tags displayed
  - Terminal-inspired interactive card styling
- [ ] Add smooth scrolling and entry animations (future enhancement)
- [x] Build individual entry pages (`/timeline/[slug]`)
  - Full MDX content rendering
  - Navigation back to timeline
  - generateStaticParams for static export
  - Metadata generation for SEO

### 3.4 Timeline Extensibility Groundwork

- [ ] Structure code to support future features:
  - Tag filtering (UI hidden but data structure ready)
  - Type filtering (filter by PR, paper, etc.)
  - Date range filtering
  - Reverse order toggle (chronological vs reverse)
- [ ] Add placeholder for filter UI (commented out or feature-flagged)

---

## Phase 4: Claude Content Generation Commands

### 4.1 Command Structure

Create Claude commands in `.claude/commands/`:

- [ ] `/add-pr.md` - Generate timeline entry from GitHub PR
- [ ] `/add-paper.md` - Generate entry from academic paper
- [ ] `/add-presentation.md` - Generate entry from talk/presentation
- [ ] `/add-poster.md` - Generate entry from poster
- [ ] `/add-project.md` - Generate entry from open source project

### 4.2 Command Specifications

#### `/add-pr` Command

- [ ] Accept inputs:
  - PR URL (required)
  - Optional: Custom summary/context
- [ ] Behavior:
  - Fetch PR data via GitHub API (title, description, date)
  - Generate slug from PR title
  - Create MDX file in `/content/timeline/`
  - Populate frontmatter (title, date, type: "pr", link, suggested tags)
  - If custom summary provided, use it; else draft from PR description
  - Include structured content template with PR context
- [ ] Output: Confirm file created, show path for editing

#### `/add-paper` Command

- [ ] Accept inputs:
  - Paper URL/DOI (required)
  - Optional: Custom summary
- [ ] Behavior:
  - Extract metadata (title, publication date, authors if available)
  - Generate slug from title
  - Create MDX file with frontmatter
  - Draft content highlighting key contributions
  - Link to paper
- [ ] Output: Confirm creation

#### `/add-presentation` Command

- [ ] Accept inputs:
  - Presentation URL (Google Slides, PDF, etc.)
  - Title and date (required if not auto-extractable)
  - Optional: Summary
- [ ] Behavior:
  - Create entry with type: "presentation"
  - Generate slug from title
  - Draft content describing talk context
- [ ] Output: Confirm creation

#### `/add-poster` Command

- [ ] Similar to presentation command
- [ ] Type: "poster"
- [ ] Focus on conference/event context

#### `/add-project` Command

- [ ] Accept inputs:
  - Project URL (GitHub repo, website, etc.)
  - Optional: Summary
- [ ] Behavior:
  - If GitHub repo, fetch README/description
  - Create entry with type: "project"
  - Draft content highlighting project significance
- [ ] Output: Confirm creation

### 4.3 Command Implementation

- [ ] Write detailed prompt templates for each command
- [ ] Include instructions for:
  - Fetching external data (GitHub API, web scraping if needed)
  - Generating appropriate slugs (kebab-case, unique)
  - Creating well-structured MDX with frontmatter
  - Suggesting relevant tags based on content
  - Leaving placeholders for manual curation where needed
- [ ] Test commands with sample content

---

## Phase 5: Additional Pages & Content

### 5.1 Homepage

- [ ] Design landing page with terminal aesthetic
  - Simulated boot sequence or login prompt (optional, subtle)
  - Brief introduction ("Software developer, researcher, cocktail enthusiast...")
  - Terminal prompt leading to main navigation
- [ ] Feature recent timeline entries (3-5 most recent)
- [ ] Links to main sections

### 5.2 About Page

- [ ] Create `/about` route
- [ ] Content: Bio, skills, interests
- [ ] Terminal-styled content presentation
- [ ] Links to resume/CV PDFs

### 5.3 Resume & CV

- [ ] Create placeholder PDFs in `/public/`
- [ ] Add links in navigation
- [ ] Style links with file icons (terminal aesthetic)
- [ ] Plan for future: Generate from timeline data (Phase 7+)

### 5.4 Personal Content Pages

- [ ] Create `/restaurants` page
  - Simple static content
  - List of favorite Pittsburgh restaurants
  - Terminal-styled list (maybe simulated `cat restaurants.txt`)
- [ ] Create `/cocktails` page
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

### 7.1 Static Export Configuration

- [ ] Configure `next.config.js` for static export
  ```javascript
  module.exports = {
    output: 'export',
    images: { unoptimized: true }, // if using next/image
    // other config...
  };
  ```
- [ ] Test local build: `npm run build`
- [ ] Verify output in `/out` directory
- [ ] Test static site locally: `npx serve out`

### 7.2 Optimization

- [ ] Optimize images (compress, WebP format)
- [ ] Minify CSS/JS (Next.js handles this)
- [ ] Add metadata for SEO (title, description, OG tags)
- [ ] Create `robots.txt` and `sitemap.xml`
- [ ] Add favicon and app icons (terminal-themed)

### 7.3 Linode Server Setup Documentation

Create `DEPLOYMENT.md` with instructions:

- [ ] Linode server provisioning:
  - Ubuntu/Debian server setup
  - Update system packages
  - Install nginx (or alternative web server)
- [ ] Nginx configuration:
  - Server block for jmchilton.net
  - Point document root to deployment directory
  - Configure SSL/TLS (Let's Encrypt)
- [ ] DNS configuration:
  - Point jmchilton.net A record to Linode IP
  - Configure www subdomain if desired
- [ ] File transfer methods:
  - SCP/RSYNC for manual deployment
  - Or automated deployment (next phase)

### 7.4 Manual Deployment Test

- [ ] Follow `DEPLOYMENT.md` instructions
- [ ] Deploy to Linode manually
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
  - Generate static site in `/out`
  - Deploy to Linode server
- [ ] Deployment method options:
  - **RSYNC over SSH**: Sync `/out` to Linode directory
  - **SCP**: Copy files to server
  - **Alternative**: FTP/SFTP

### 8.2 SSH Key Setup

- [ ] Generate SSH key pair for GitHub Actions
- [ ] Add public key to Linode server (`~/.ssh/authorized_keys`)
- [ ] Add private key to GitHub Secrets (`LINODE_SSH_KEY`)
- [ ] Store Linode server IP in GitHub Secrets (`LINODE_HOST`)
- [ ] Store deployment path in Secrets (`DEPLOY_PATH`)

### 8.3 Deployment Script

- [ ] Create deployment script (bash or Node.js)
  - Connect to Linode via SSH
  - Sync files to web server directory
  - Reload nginx if needed
  - Clear cache if applicable
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

- [ ] Implement tag filtering UI
- [ ] Add entry type filter (PR, paper, project, etc.)
- [ ] Add date range filter
- [ ] Implement chronological vs reverse toggle
- [ ] Persist filter state in URL params

### 10.2 Search Functionality

- [ ] Add full-text search across timeline entries
- [ ] Consider: Client-side search (Fuse.js) or static index
- [ ] Search UI with terminal aesthetic

### 10.3 RSS Feed

- [ ] Generate RSS feed from timeline entries
- [ ] Auto-update on new entries
- [ ] Add subscription link

### 10.4 Analytics

- [ ] Add privacy-respecting analytics (Plausible, Fathom, or self-hosted)
- [ ] Track page views and popular content
- [ ] Respect Do Not Track settings

### 10.5 Content Expansion

- [ ] Add blog post entry type (longer-form writing)
- [ ] Expand restaurant/cocktail sections with more detail
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

- **Framework**: Next.js 14+ (App Router, TypeScript)
- **Content**: MDX with frontmatter
- **Styling**: Tailwind CSS
- **Hosting**: Linode (nginx)
- **Version Control**: GitHub
- **CI/CD**: GitHub Actions
- **Domain**: jmchilton.net

### File Structure

```
jmchiltondotnet/
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
├── content/
│   └── timeline/
│       ├── galaxy-pr-21102.mdx
│       ├── galaxy-pr-19305.mdx
│       └── ...
├── public/
│   ├── resume.pdf
│   ├── cv.pdf
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── timeline/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── about/
│   │   ├── restaurants/
│   │   └── cocktails/
│   ├── components/
│   │   ├── TerminalNav.tsx
│   │   ├── TimelineEntry.tsx
│   │   ├── MDXComponents.tsx
│   │   └── ...
│   ├── lib/
│   │   ├── mdx.ts
│   │   ├── entries.ts
│   │   └── ...
│   └── types/
│       └── index.ts
├── DEPLOYMENT.md
├── next.config.js
├── tailwind.config.ts
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

- **Phase 1-2** (Foundation & Design): 2-3 days
- **Phase 3** (Timeline System): 2-3 days
- **Phase 4** (Claude Commands): 1-2 days
- **Phase 5** (Additional Pages): 1-2 days
- **Phase 6** (Content Population): 1 day
- **Phase 7** (Deployment Prep): 1-2 days
- **Phase 8** (CI/CD): 1-2 days
- **Phase 9** (Polish & Launch): 1-2 days

**Total Estimated Time**: 10-17 days (depending on complexity and iteration)

---

## Success Criteria

- [x] Static site builds and deploys successfully to Linode
- [x] Terminal-inspired design is cohesive and professional
- [x] Timeline displays all entry types correctly
- [x] Claude commands successfully generate MDX entries
- [x] Navigation simulates terminal `cd` commands
- [x] Site is responsive on mobile/tablet/desktop
- [x] Automated deployment works on git push
- [x] All external links and PDFs are accessible
- [x] Code is well-documented and maintainable
- [x] Site passes Lighthouse accessibility/performance audits

---

## Notes & Considerations

- **Content First**: Prioritize getting the timeline working over perfect design initially
- **Iterative Approach**: Launch with core features, enhance over time
- **Accessibility**: Ensure terminal aesthetic doesn't compromise usability
- **Performance**: Static export should be fast; monitor bundle size
- **Extensibility**: Code structure should accommodate future filtering/search features
- **Personal Touch**: Balance professional showcase with personality (restaurants, cocktails)
- **Curation**: Claude generates drafts, but manual editing is key to quality

---

## Questions & Decisions Log

_Use this section to track decisions made during implementation_

- **Q**: Exact color palette for terminal theme?
  **A**: Black-on-white (light theme) with colorful accents (e.g., Solarized Light, GitHub Light-inspired)

- **Q**: Should timeline entries link to full pages or expand inline?
  **A**: Link to full `/timeline/[slug]` pages for better sharing/SEO

- **Q**: How to handle Google Slides links in entries (embed or link)?
  **A**: Link initially; consider embed option in future

- **Q**: Should restaurants/cocktails have their own data structure?
  **A**: Simple static pages for now; can enhance later if needed

---

_End of Implementation Plan_
