# Add Problem

You are helping to create a new "problem" entry - a question worth thinking about over time.

## Your Task

1. **Gather Information**: Ask the user for:
   - The question/problem (should be phrased as a question)
   - Brief description (1-2 sentences)
   - When they started thinking about it (YYYY-MM format)
   - Relevant tags (for linking to timeline entries)
2. **Generate Slug**: Create a URL-friendly slug from the question in kebab-case
   - Example: "How can we make workflows reproducible?" → "workflow-reproducibility"
3. **Create MDX File**: Generate at `src/content/problems/{slug}.mdx`

## Frontmatter Schema

```yaml
---
title: 'The question, phrased as a question?'
description: '1-2 sentence hook explaining the problem space'
tags: ['tag1', 'tag2'] # Short tags that link to timeline entries
started: 'YYYY-MM' # When you started thinking about this
featured: false # Set true to show on homepage
---
```

## Content Structure

```markdown
## The Question

[Expand on the core problem - what exactly are we trying to solve?]

## Why It Matters

[Stakes, impact, who cares about this problem]

## Current Thinking

[Your evolving thesis - this section gets updated over time as thinking develops]

## Open Subquestions

- Subquestion 1?
- Subquestion 2?
- Subquestion 3?

<!-- Optional sections for academic evolution -->

## Literature Review

_Key papers and prior art. Update as you discover relevant work._

## Hypotheses

_Testable predictions derived from your current thinking._

## Methodology

_Approaches being explored to investigate this problem._
```

## Tag Guidelines

Tags connect problems to timeline entries. Use short, reusable tags:

- Technology areas: `workflows`, `containers`, `testing`, `api`
- Projects: `galaxy`, `planemo`, `cwl`
- Domains: `reproducibility`, `usability`, `performance`

Avoid long or overly specific tags - they won't match timeline entries.

## Example

```mdx
---
title: 'How can we make scientific workflows truly reproducible?'
description: 'Exploring containerization, dependency management, and workflow languages to ensure computational research can be reliably replicated.'
tags: ['reproducibility', 'workflows', 'containers', 'galaxy']
started: '2015-03'
featured: true
---

## The Question

Scientific papers describe methods, but computational details are often lost. How do we capture everything needed to re-run an analysis identically, years later, on different hardware?

## Why It Matters

Reproducibility is foundational to science. As biology becomes computational, the inability to replicate analyses undermines trust in results.

## Current Thinking

The solution likely involves multiple layers:

1. **Workflow languages** that declare dependencies explicitly
2. **Containers** that freeze execution environments
3. **Provenance tracking** that records what ran

## Open Subquestions

- How do we handle licensed software in reproducible workflows?
- What's the right containerization granularity?
- How do we balance reproducibility with method updates?

## Literature Review

_To be expanded._

## Hypotheses

- Reproducibility adoption correlates with tooling ease-of-use
- Reference data versioning is an underappreciated bottleneck
```

## Instructions

1. If the user provides the question, use it. Otherwise ask.
2. Help refine the question to be specific and answerable over time.
3. Suggest tags based on the problem domain (keep them short).
4. Generate the slug and confirm.
5. Create the MDX file with frontmatter and initial content.
6. Remind user to update "Current Thinking" as ideas evolve.
7. Note that related timeline entries will auto-link via shared tags.

## Notes

- Title MUST be a question (end with ?)
- `started` uses YYYY-MM format (no day)
- Tags should be short and match existing timeline entry tags where possible
- The body is meant to evolve - initial version can be sparse
- Optional academic sections (Literature Review, Hypotheses, Methodology) support evolution toward papers
