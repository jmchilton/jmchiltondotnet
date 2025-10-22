# Add Presentation/Talk to Timeline

You are helping to create a timeline entry for a conference presentation, talk, or speaking engagement.

## Your Task

1. **Get Presentation Information**: Ask the user for:
   - Presentation title
   - Date of presentation
   - Conference/event name
   - Location (city, country or "Virtual")
   - Presentation URL (Google Slides, PDF, video recording, etc.)
2. **Generate Slug**: Create a URL-friendly slug from the presentation title
   - Example: "Galaxy Workflow Best Practices" → "galaxy-workflow-best-practices"
   - Keep it concise but descriptive
3. **Create MDX File**: Generate a timeline entry file at `src/content/timeline/{slug}.mdx`

## Frontmatter Schema

The frontmatter MUST match this exact schema:

```yaml
---
title: 'Presentation Title'
date: 'YYYY-MM-DD' # Date of presentation
type: 'presentation'
description: 'Brief 1-2 sentence summary of what the talk covered'
link: 'URL to slides, video, or event page'
tags: ['tag1', 'tag2', 'tag3'] # Suggest 2-5 relevant tags
featured: false # Set to true for keynotes or particularly significant talks
---
```

## Content Structure

After the frontmatter, create MDX content following this structure:

```markdown
## Event Details

- **Conference/Event**: [Name]
- **Date**: [Full date]
- **Location**: [City, Country or "Virtual"]
- **Presentation Type**: [Keynote / Talk / Workshop / Tutorial / Lightning Talk]

## Overview

[What was this presentation about? What topics did you cover?]

## Key Topics

- Topic 1
- Topic 2
- Topic 3

## Audience & Context

[Who was the target audience? Why was this presentation given? What was the conference/event about?]

## Highlights

[What were the main points or takeaways? Any interesting discussions or questions from the audience?]

## Resources

- [Slides](link-to-slides)
- [Video Recording](if-available)
- [Conference Website](event-page)
- [Related Materials](if-applicable)
```

## Tag Suggestions

Based on the presentation content, suggest relevant tags such as:

- Topic areas (e.g., "workflows", "containers", "cloud-computing")
- Technologies (e.g., "galaxy", "docker", "kubernetes")
- Conference type (e.g., "gcc", "bosc", "bioinformatics")
- Presentation format (e.g., "keynote", "tutorial", "workshop")
- Audience (e.g., "developers", "researchers", "educators")

## Example Output

```mdx
---
title: 'Scaling Galaxy for Cloud and HPC Environments'
date: '2023-06-15'
type: 'presentation'
description: "Technical deep-dive on Galaxy's job execution architecture and strategies for scaling to cloud and HPC infrastructure."
link: 'https://docs.google.com/presentation/d/xxxxx/edit'
tags: ['galaxy', 'cloud-computing', 'hpc', 'infrastructure', 'scalability']
featured: true
---

## Event Details

- **Conference/Event**: Galaxy Community Conference (GCC) 2023
- **Date**: June 15, 2023
- **Location**: Brisbane, Australia
- **Presentation Type**: Technical Talk

## Overview

This presentation explored Galaxy's job execution infrastructure and best practices for deploying Galaxy at scale on cloud platforms (AWS, GCP, Azure) and high-performance computing (HPC) clusters. The talk covered architectural patterns, common pitfalls, and real-world deployment examples from large Galaxy instances.

## Key Topics

- Galaxy's pluggable job runner architecture
- Kubernetes-native Galaxy deployments
- Integrating with HPC schedulers (Slurm, PBS, HTCondor)
- Auto-scaling strategies and resource management
- Performance optimization and monitoring

## Audience & Context

The presentation was aimed at Galaxy administrators and infrastructure engineers managing large-scale deployments. GCC is the annual gathering of the Galaxy community, bringing together developers, researchers, and administrators from around the world.

## Highlights

- Live demonstration of Kubernetes-based Galaxy deployment
- Discussion of lessons learned from galaxyproject.org infrastructure
- Interactive Q&A about specific deployment scenarios
- Announced new Pulsar network node features for distributed computing

The audience was particularly interested in cost optimization strategies for cloud deployments and the trade-offs between different auto-scaling approaches.

## Resources

- [Slides](https://docs.google.com/presentation/d/xxxxx/edit)
- [Video Recording](https://youtu.be/xxxxx)
- [GCC 2023 Website](https://galaxyproject.org/events/gcc2023/)
- [Related Documentation](https://docs.galaxyproject.org/en/latest/admin/scaling.html)
```

## Instructions

1. Ask the user for the presentation title, date, and event name
2. Ask for the presentation URL (slides, video, etc.)
3. Ask about the context: type of talk, audience, location
4. Optionally ask for key topics covered and any memorable moments
5. Generate the slug and confirm it with the user
6. Create the MDX file with all required frontmatter fields
7. Populate the content with structured information
8. Confirm the file was created and show the path
9. Suggest the user add personal reflections and details they remember

## Notes

- The `type` field MUST be "presentation" (lowercase)
- The `date` should be the presentation date in YYYY-MM-DD format
- The `link` can be slides, video recording, or event page (prefer slides if available)
- Tags should be lowercase and use hyphens for multi-word tags
- Include context about why the presentation was given and its significance
- Capture interesting discussions, questions, or outcomes when possible
- For virtual events, specify "Virtual" as the location
