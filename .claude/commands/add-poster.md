# Add Conference Poster to Timeline

You are helping to create a timeline entry for a conference poster presentation.

## Your Task

1. **Get Poster Information**: Ask the user for:
   - Poster title
   - Date of presentation
   - Conference/event name
   - Location (city, country or "Virtual")
   - Poster URL (PDF, image, or conference abstract)
2. **Generate Slug**: Create a URL-friendly slug from the poster title
   - Example: "Interactive Workflow Visualization in Galaxy" → "interactive-workflow-visualization-galaxy"
   - Keep it concise but descriptive
3. **Create MDX File**: Generate a timeline entry file at `src/content/timeline/{slug}.mdx`

## Frontmatter Schema

The frontmatter MUST match this exact schema:

```yaml
---
title: 'Poster Title'
date: 'YYYY-MM-DD' # Date of presentation/conference
type: 'poster'
description: "Brief 1-2 sentence summary of the poster's focus"
link: 'URL to poster PDF, abstract, or conference page'
tags: ['tag1', 'tag2', 'tag3'] # Suggest 2-5 relevant tags
featured: false # Set to true for award-winning or particularly significant posters
---
```

## Content Structure

After the frontmatter, create MDX content following this structure:

```markdown
## Event Details

- **Conference/Event**: [Name]
- **Date**: [Full date]
- **Location**: [City, Country or "Virtual"]
- **Authors**: [Author list, with user's name in bold]
- **Award**: [If applicable, e.g., "Best Poster Award"]

## Overview

[What was this poster about? What question or problem did it address?]

## Research Focus

[Main research question or hypothesis]

## Methods & Approach

- Method/approach 1
- Method/approach 2
- Method/approach 3

## Key Findings

- Finding 1
- Finding 2
- Finding 3

## Impact & Discussion

[What was the significance of this work? What discussions did it spark? Any feedback from attendees?]

## Resources

- [Poster PDF](link-to-pdf)
- [Conference Abstract](if-available)
- [Conference Website](event-page)
- [Related Publication](if-applicable)
```

## Tag Suggestions

Based on the poster content, suggest relevant tags such as:

- Research areas (e.g., "proteomics", "genomics", "visualization")
- Methods (e.g., "machine-learning", "data-analysis", "workflows")
- Technologies (e.g., "galaxy", "python", "web-visualization")
- Conference type (e.g., "ismb", "ashg", "bioinformatics")
- Achievements (e.g., "best-poster", "award-winning")

## Example Output

```mdx
---
title: 'Containerized Tool Execution in Galaxy: Improving Reproducibility and Portability'
date: '2019-07-21'
type: 'poster'
description: 'Presented novel approaches to container-based tool execution in Galaxy, demonstrating improved reproducibility and cross-platform compatibility.'
link: 'https://f1000research.com/posters/8-1234'
tags: ['galaxy', 'containers', 'docker', 'reproducibility', 'ismb']
featured: true
---

## Event Details

- **Conference/Event**: Intelligent Systems for Molecular Biology (ISMB) 2019
- **Date**: July 21-25, 2019
- **Location**: Basel, Switzerland
- **Authors**: **John Chilton**, Marius van den Beek, Björn Grüning, James Taylor
- **Award**: Best Technology Poster

## Overview

This poster presented our work on integrating container technologies (Docker, Singularity) into Galaxy's tool execution framework. The research addressed the long-standing challenge of reproducible bioinformatics analyses by ensuring tools run in consistent, isolated environments across different computing platforms.

## Research Focus

How can we leverage container technologies to guarantee reproducible computational analyses in Galaxy while maintaining ease of use and performance?

## Methods & Approach

- Designed a flexible container resolver system supporting multiple container technologies
- Implemented automatic container discovery from registries (Docker Hub, Quay.io, BioContainers)
- Created transparent integration with Galaxy's job execution infrastructure
- Developed caching mechanisms to optimize performance
- Benchmarked performance across different container runtimes

## Key Findings

- Container-based execution achieved 99.8% reproducibility across different compute environments
- Performance overhead was minimal (<5%) compared to native execution
- Automatic container resolution reduced tool installation burden by 90%
- BioContainers integration provided containerized versions of 8,000+ bioinformatics tools

## Impact & Discussion

This work became a foundational component of Galaxy's tool ecosystem, enabling truly reproducible research workflows. The poster session generated extensive discussion about container security, versioning strategies, and integration with HPC systems.

The project received the Best Technology Poster award and led to collaborations with the BioContainers project and adoption by major Galaxy instances worldwide.

## Resources

- [Poster PDF](https://f1000research.com/posters/8-1234)
- [ISMB 2019 Program](https://www.iscb.org/ismb2019)
- [BioContainers Project](https://biocontainers.pro)
- [Follow-up Publication](https://doi.org/10.xxxx/xxxxx)
```

## Instructions

1. Ask the user for the poster title, date, and conference name
2. Ask for the poster URL (PDF, abstract, conference page)
3. Ask about co-authors and any awards received
4. Ask about the main research focus and key findings
5. Optionally ask about memorable discussions or feedback received
6. Generate the slug and confirm it with the user
7. Create the MDX file with all required frontmatter fields
8. Populate the content with structured information
9. Confirm the file was created and show the path
10. Suggest the user add details about the research and discussions

## Notes

- The `type` field MUST be "poster" (lowercase)
- The `date` should be the conference/presentation date in YYYY-MM-DD format
- The `link` should be the poster PDF (preferred) or conference abstract page
- Tags should be lowercase and use hyphens for multi-word tags
- Include author list with the user's name in bold
- Mention any awards or recognition received
- Capture the research context and significance
- For virtual conferences, specify "Virtual" as the location
- Include feedback and discussions from the poster session when possible
