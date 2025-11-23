# jmchilton.net Site Architecture

## Purpose

A portfolio organized around **problems worth solving**. Following Feynman's advice to keep favorite problems in mind and test new ideas against them. Timeline entries (PRs, papers, etc.) are evidence of work on these problems. Personal interests (Pittsburgh recommendations, cocktails) round out the picture.

---

## Information Architecture

**Problems-first:** The site is organized around questions, not accomplishments. Timeline entries link back to problems via shared tags.

```
Problems (the questions)
    ↓ tags connect them
Timeline (the work)
```

---

## Content Collections

### Problems (`src/content/problems/`)

Questions worth thinking about over time. Can evolve toward academic papers.

**Schema:**

```yaml
title: string # The question (must end with ?)
description: string # 1-2 sentence hook
tags: string[] # Links to timeline entries via shared tags
started: string # YYYY-MM when you started thinking about it
featured: boolean # Show on homepage (default: false)
```

**MDX Body Structure:**

- `## The Question` - Core problem statement
- `## Why It Matters` - Stakes, impact
- `## Current Thinking` - Evolving thesis (update over time)
- `## Open Subquestions` - Subsidiary questions
- `## Literature Review` - (optional) Prior art, citations
- `## Hypotheses` - (optional) Testable predictions
- `## Methodology` - (optional) Approaches being explored

**Auto-linking:** Problem pages automatically show timeline entries that share tags.

**Generation:** Via `/add-problem` command.

---

### Timeline (`src/content/timeline/`)

Professional work displayed chronologically. Each entry = one MDX file.

**Schema:**

```yaml
title: string # Descriptive title
date: string # YYYY-MM-DD
type: enum # pr | paper | poster | presentation | project
description: string # 1-2 sentence summary
link: url # Primary external resource
tags: string[] # Categorization + links to problems
featured: boolean # Highlight status (default: false)
```

**Entry Types:**
| Type | Purpose | Example |
|------|---------|---------|
| `pr` | GitHub pull requests | Galaxy Playwright framework |
| `paper` | Academic publications | Planemo Genome Research paper |
| `poster` | Conference posters | Research visualizations |
| `presentation` | Talks/slides | Google Slides presentations |
| `project` | Open source projects | Major launches/releases |

**MDX Body Structure:**

- `## The Pull Request / Paper / etc.` - What it is
- `## Technical Approach` - Implementation details
- `## Impact` - Scale, metrics, outcomes
- `## Personal Notes` - Retrospective, lessons learned

**Generation:** Via `/add-pr`, `/add-paper`, `/add-presentation`, `/add-poster`, `/add-project` commands.

---

### Awards (`src/content/awards/`)

Pittsburgh "best of" recommendations. Each award = one MDX file.

**Schema:**

```yaml
title: string # "Best X in Pittsburgh"
category: string # entertainment | food | drinks | coffee
winner: string # Business name
location: string # Address or neighborhood
year: number # Award year
tags: string[] # Categorization
featured: boolean # Highlight status (default: false)
```

**MDX Body Structure:**

- `## The Winner: [Name]` - Primary recommendation
- `## The Runner-Up: [Name]` - Alternative option (optional)
- `## Why [Winner] Wins` - Reasoning
- `## Details` - Practical info (addresses, hours, notes)

**Generation:** Via `/add-award` command.

---

## Site Map

```
/                           Homepage (featured problems)
├── /problems/              All problems list
│   └── /problems/[slug]    Individual problem + auto-linked timeline
├── /timeline/              Full chronological archive
│   └── /timeline/[slug]    Individual entry detail
├── /about                  Bio, skills, interests
├── /best-of-pittsburgh/    Awards index by category
│   └── /best-of-pittsburgh/[slug]  Individual award detail
├── /cocktails              Favorites and tips
├── /resume.pdf             Static PDF (from cv submodule)
└── /cv.pdf                 Static PDF (from cv submodule)
```

---

## Page Purposes

| Route                        | Purpose                                       | Data Source                                 |
| ---------------------------- | --------------------------------------------- | ------------------------------------------- |
| `/`                          | Landing, featured problems, navigation        | Problems collection (featured)              |
| `/problems`                  | All problems, oldest-first                    | All problems                                |
| `/problems/[slug]`           | Problem detail + auto-linked timeline entries | One problem + filtered timeline             |
| `/timeline`                  | Scrollable professional history               | All timeline entries, reverse-chronological |
| `/timeline/[slug]`           | Deep-dive on single work                      | One timeline entry MDX                      |
| `/about`                     | Personal bio, links to PDFs                   | Static content                              |
| `/best-of-pittsburgh`        | Category-grouped recommendations              | All awards, grouped by category             |
| `/best-of-pittsburgh/[slug]` | Full recommendation with details              | One award entry MDX                         |
| `/cocktails`                 | Cocktail favorites and tips                   | Static content                              |

---

## Claude Commands

Located in `.claude/commands/`. Each prompts Claude to generate MDX with correct frontmatter.

| Command             | Input                  | Output                              |
| ------------------- | ---------------------- | ----------------------------------- |
| `/add-problem`      | Question + context     | Problems entry                      |
| `/add-pr`           | GitHub PR URL          | Timeline entry (type: pr)           |
| `/add-paper`        | Paper URL/DOI          | Timeline entry (type: paper)        |
| `/add-presentation` | Slides URL + metadata  | Timeline entry (type: presentation) |
| `/add-poster`       | Poster info            | Timeline entry (type: poster)       |
| `/add-project`      | Project URL            | Timeline entry (type: project)      |
| `/add-award`        | Business/category info | Awards entry                        |

---

## Tag Strategy

Tags are the glue connecting problems to timeline entries.

**Guidelines:**

- Keep tags short: `workflows` not `workflow-management-systems`
- Reuse tags across problems and timeline entries
- Use project names: `galaxy`, `planemo`, `cwl`
- Use domains: `reproducibility`, `testing`, `usability`
- Use technologies: `python`, `containers`, `api`

**Auto-linking logic:** A problem page shows all timeline entries where `entry.tags ∩ problem.tags ≠ ∅`

---

## Design System

**Aesthetic:** Modern terminal (light theme, black on white)

**Key Elements:**

- Navigation mimics `ls` output (dirs with `/`, files without)
- Prompt style: `$ jmchilton.net %`
- Monospace (JetBrains Mono) for headers/nav/code
- Sans-serif (Inter) for body text
- Color-coded badges per entry type

**CSS Classes:** `.terminal-*` prefix for buttons, links, cards, badges, code blocks.

---

## Future Extensibility

Designed for (but not yet implemented):

- Timeline filtering by tag/type/date
- Full-text search (Fuse.js or Pagefind)
- RSS feed generation
- Resume auto-generation from timeline data
- Blog post entry type
- Photo galleries
- Problem status tracking (active/dormant/resolved)

---

## Tech Stack

- **Framework:** Astro 5 (static site generator)
- **Content:** MDX via Astro Content Collections
- **Styling:** Tailwind CSS + typography plugin
- **Validation:** Zod (built into Astro)
- **Build:** Vite
- **CV/Resume:** LaTeX submodule (`jmchilton/cv`)
- **Deployment:** Linode + nginx (planned)
- **CI:** GitHub Actions
