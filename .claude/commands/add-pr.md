# Add Pull Request to Timeline

You are helping to create a timeline entry for a GitHub pull request.

## Your Task

1. **Get PR Information**: Ask the user for the GitHub PR URL if not provided
2. **Fetch PR Data**: Use the GitHub API or web scraping to get:
   - PR title
   - PR description/body
   - Merge date (or creation date if not merged)
   - Repository name
   - PR number
3. **Generate Slug**: Create a URL-friendly slug from the PR title in kebab-case format
   - Example: "Add support for XYZ" → "add-support-for-xyz"
   - If the slug seems too long, suggest a shortened version
4. **Create MDX File**: Generate a timeline entry file at `src/content/timeline/{slug}.mdx`

## Frontmatter Schema

The frontmatter MUST match this exact schema:

```yaml
---
title: 'PR Title'
date: 'YYYY-MM-DD' # Use merge date or creation date
type: 'pr'
description: 'Brief 1-2 sentence summary of what this PR does'
link: 'https://github.com/org/repo/pull/123'
tags: ['tag1', 'tag2', 'tag3'] # Suggest 2-5 relevant tags
featured: false # Set to true only if this is a particularly significant PR
---
```

## Content Structure

After the frontmatter, create MDX content following this structure:

```markdown
## Overview

[Brief overview of what this PR accomplishes and why it was needed]

## Key Changes

- Change 1
- Change 2
- Change 3

## Technical Details

[Optional: More detailed explanation of implementation, architecture decisions, etc.]

## Impact

[What problem does this solve? Who benefits? What's the significance?]

## Links

- [Pull Request](actual-link-here)
- [Related Issue](if-applicable)
- [Documentation](if-applicable)
```

## Tag Suggestions

Based on the PR content, suggest relevant tags such as:

- Technology/framework names (e.g., "python", "typescript", "docker")
- Feature areas (e.g., "api", "ui", "testing", "ci-cd")
- Project names (e.g., "galaxy", "planemo")
- Problem domains (e.g., "bioinformatics", "workflows", "containers")

## Example Output

```mdx
---
title: 'Add Docker container support for tool execution'
date: '2024-03-15'
type: 'pr'
description: 'Implemented Docker container support allowing tools to run in isolated environments with dependency management.'
link: 'https://github.com/galaxyproject/galaxy/pull/12345'
tags: ['docker', 'containers', 'galaxy', 'tool-execution', 'infrastructure']
featured: true
---

## Overview

This pull request adds comprehensive Docker container support to Galaxy's tool execution framework, enabling tools to run in isolated containerized environments. This improves reproducibility, simplifies dependency management, and enhances security.

## Key Changes

- Implemented Docker container resolution and caching system
- Added support for Docker-in-Docker (DinD) execution
- Created container configuration schema for tool definitions
- Integrated with existing job runner infrastructure
- Added comprehensive test coverage

## Technical Details

The implementation uses Docker's Python SDK to manage container lifecycle. Tools can now specify container requirements in their XML definitions using the `<container>` tag. The system automatically pulls images, caches them locally, and manages volume mounts for input/output data.

## Impact

This change enables:

- Reproducible computational environments across different systems
- Simplified tool installation (no manual dependency management)
- Better isolation and security for tool execution
- Support for complex bioinformatics tools with heavy dependencies

## Links

- [Pull Request](https://github.com/galaxyproject/galaxy/pull/12345)
- [Related Issue](https://github.com/galaxyproject/galaxy/issues/11111)
- [Documentation](https://docs.galaxyproject.org/en/latest/admin/container_resolvers.html)
```

## Instructions

1. If the user provides a PR URL, fetch the data immediately
2. If not, ask for the PR URL
3. Optionally ask if they want to provide a custom summary/context (otherwise generate from PR description)
4. Generate the slug and confirm it with the user
5. Create the MDX file with all required frontmatter fields
6. Populate the content with structured information from the PR
7. Confirm the file was created and show the path
8. Suggest the user review and edit the file to add personal retrospective insights

## Notes

- The `type` field MUST be "pr" (lowercase)
- The `date` should be in YYYY-MM-DD format
- The `link` MUST be a valid URL
- Tags should be lowercase and use hyphens for multi-word tags
- Keep descriptions concise (1-2 sentences max)
- Focus on the "why" and impact, not just the "what"
