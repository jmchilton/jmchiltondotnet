# Add Project to Timeline

You are helping to create a timeline entry for an open source project, major feature launch, or significant software release.

## Your Task

1. **Get Project Information**: Ask the user for:
   - Project name/title
   - Launch/release date (or project start date)
   - Project URL (GitHub repo, website, documentation)
   - Brief description of what the project does
2. **Fetch Additional Data**: If it's a GitHub repository:
   - README content
   - Repository description
   - Star count, language, topics
   - License
3. **Generate Slug**: Create a URL-friendly slug from the project name
   - Example: "Galaxy Tool Shed Client" → "galaxy-tool-shed-client"
   - Keep it concise but descriptive
4. **Create MDX File**: Generate a timeline entry file at `src/content/timeline/{slug}.mdx`

## Frontmatter Schema

The frontmatter MUST match this exact schema:

```yaml
---
title: 'Project Name'
date: 'YYYY-MM-DD' # Launch date, first release, or significant milestone
type: 'project'
description: 'Brief 1-2 sentence summary of what this project does and why it exists'
link: 'https://github.com/org/repo or project website URL'
tags: ['tag1', 'tag2', 'tag3'] # Suggest 2-5 relevant tags
featured: false # Set to true for particularly significant projects
---
```

## Content Structure

After the frontmatter, create MDX content following this structure:

```markdown
## Project Overview

[What is this project? What problem does it solve? Who is it for?]

## Key Features

- Feature 1
- Feature 2
- Feature 3

## Technical Details

- **Language**: [Primary programming language(s)]
- **Framework/Stack**: [Key technologies used]
- **License**: [Open source license]
- **Status**: [Active / Maintained / Archived]

## Motivation

[Why was this project created? What gap does it fill?]

## Impact & Adoption

[Who uses this project? What's the adoption? Any notable users or success stories?]

## Development Highlights

[Interesting technical challenges solved, architectural decisions, lessons learned]

## Links

- [GitHub Repository](repo-link)
- [Documentation](docs-link)
- [Live Demo](if-applicable)
- [PyPI/npm Package](if-applicable)
```

## Tag Suggestions

Based on the project content, suggest relevant tags such as:

- Programming languages (e.g., "python", "typescript", "go")
- Technologies (e.g., "docker", "kubernetes", "react")
- Domains (e.g., "bioinformatics", "devops", "web-development")
- Project type (e.g., "cli-tool", "library", "framework", "api")
- Related projects (e.g., "galaxy", "ansible", "terraform")

## Example Output

```mdx
---
title: 'Planemo: Galaxy Tool Development Toolkit'
date: '2014-09-15'
type: 'project'
description: 'Command-line utilities to assist in developing, testing, and publishing Galaxy tools and workflows.'
link: 'https://github.com/galaxyproject/planemo'
tags: ['galaxy', 'python', 'cli-tool', 'testing', 'devops']
featured: true
---

## Project Overview

Planemo is a command-line toolkit designed to streamline Galaxy tool and workflow development. It provides utilities for linting, testing, serving, and publishing Galaxy tools, making it easier for developers to create high-quality, reproducible bioinformatics tools.

## Key Features

- **Local Galaxy server**: Instantly launch a Galaxy instance for tool testing
- **Automated testing**: Run tool tests with various Galaxy versions and configurations
- **Linting**: Validate tool XML against best practices and common pitfalls
- **Workflow testing**: Test complete workflows end-to-end
- **Continuous integration**: Integrate with GitHub Actions, Travis CI, CircleCI
- **Tool publishing**: Streamline publishing to the Galaxy Tool Shed
- **Container support**: Build and test BioContainers for tools

## Technical Details

- **Language**: Python 3.7+
- **Framework/Stack**: Click (CLI), Galaxy libraries, Docker SDK
- **License**: MIT
- **Status**: Active (major Galaxy developer tool)

## Motivation

Before Planemo, Galaxy tool development was cumbersome and error-prone. Developers had to manually install Galaxy, configure tools, and test them through the web interface. This slowed development and made it difficult to ensure tool quality.

Planemo was created to bring modern software development practices to Galaxy tool development: automated testing, continuous integration, linting, and quick iteration cycles.

## Impact & Adoption

Planemo has become the standard tool development environment for the Galaxy community:

- Used by 500+ Galaxy tool developers worldwide
- Integrated into Galaxy tool best practices documentation
- Powers CI/CD for the Galaxy Tool Shed (9,000+ tools)
- Adopted by major bioinformatics projects (UseGalaxy.\*, EOSC-Life, etc.)
- Featured in Galaxy tool development training materials

## Development Highlights

Key technical challenges included:

- Creating a lightweight, fast Galaxy server for development
- Supporting multiple Galaxy versions simultaneously
- Integrating with diverse testing frameworks and CI systems
- Designing intuitive CLI commands for complex workflows
- Managing Docker containers and BioContainers integration

The project evolved from a simple testing wrapper to a comprehensive development toolkit, driven by community feedback and real-world tool development needs.

## Links

- [GitHub Repository](https://github.com/galaxyproject/planemo)
- [Documentation](https://planemo.readthedocs.io/)
- [PyPI Package](https://pypi.org/project/planemo/)
- [Galaxy Training](https://training.galaxyproject.org/training-material/topics/dev/tutorials/tool-integration/tutorial.html)
```

## Instructions

1. Ask the user for the project name and URL
2. If it's a GitHub repository, fetch the README and metadata
3. Ask about the project's purpose, key features, and impact
4. Ask about the user's role (creator, maintainer, contributor)
5. Optionally ask about interesting technical challenges or lessons learned
6. Generate the slug and confirm it with the user
7. Create the MDX file with all required frontmatter fields
8. Populate the content with structured information
9. Confirm the file was created and show the path
10. Suggest the user add personal insights and development stories

## Notes

- The `type` field MUST be "project" (lowercase)
- The `date` should be the launch/release date or project start in YYYY-MM-DD format
- The `link` should be the GitHub repository (preferred) or project website
- Tags should be lowercase and use hyphens for multi-word tags
- Include the user's role in the project (creator, maintainer, contributor)
- Focus on impact and adoption, not just features
- Capture technical challenges and architectural decisions
- For libraries/packages, include package registry links (PyPI, npm, etc.)
- For archived projects, note the status and explain the context
