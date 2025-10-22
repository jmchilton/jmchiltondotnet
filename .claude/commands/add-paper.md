# Add Academic Paper to Timeline

You are helping to create a timeline entry for an academic paper or publication.

## Your Task

1. **Get Paper Information**: Ask the user for the paper URL/DOI if not provided
2. **Fetch Paper Metadata**: Extract or ask for:
   - Paper title
   - Publication date
   - Journal/Conference name
   - Authors (at least first author and your role)
   - Abstract or summary
   - DOI or publication URL
3. **Generate Slug**: Create a URL-friendly slug from the paper title in kebab-case format
   - Example: "Machine Learning for Genomic Analysis" → "machine-learning-genomic-analysis"
   - Keep it concise but descriptive
4. **Create MDX File**: Generate a timeline entry file at `src/content/timeline/{slug}.mdx`

## Frontmatter Schema

The frontmatter MUST match this exact schema:

```yaml
---
title: 'Full Paper Title'
date: 'YYYY-MM-DD' # Publication date
type: 'paper'
description: "Brief 1-2 sentence summary of the paper's contribution"
link: 'https://doi.org/10.xxxx/xxxxx or https://pmc.ncbi.nlm.nih.gov/articles/PMCxxxxxxx/'
tags: ['tag1', 'tag2', 'tag3'] # Suggest 2-5 relevant tags
featured: false # Set to true for particularly significant publications
---
```

## Content Structure

After the frontmatter, create MDX content following this structure:

```markdown
## Publication Details

- **Journal/Conference**: [Name]
- **Publication Date**: [Date]
- **Authors**: [First Author], [Second Author], ..., **John Chilton**, et al.
- **DOI**: [DOI link]

## Abstract

[Paper abstract or summary]

## Key Contributions

- Contribution 1
- Contribution 2
- Contribution 3

## Personal Role

[Describe your specific contributions to this work - what parts did you work on?]

## Significance

[Why is this work important? What problem does it solve? What's the broader impact?]

## Links

- [Read Paper](actual-link)
- [PubMed](if-applicable)
- [Supplementary Materials](if-applicable)
- [Code Repository](if-applicable)
```

## Tag Suggestions

Based on the paper content, suggest relevant tags such as:

- Research areas (e.g., "bioinformatics", "genomics", "machine-learning")
- Methods/techniques (e.g., "workflows", "data-analysis", "visualization")
- Tools/platforms (e.g., "galaxy", "nextflow", "python")
- Application domains (e.g., "cancer-research", "proteomics", "rna-seq")
- Publication type (e.g., "peer-reviewed", "conference-paper", "journal-article")

## Example Output

```mdx
---
title: 'The Galaxy platform for accessible, reproducible and collaborative biomedical analyses'
date: '2022-07-02'
type: 'paper'
description: "Comprehensive overview of the Galaxy platform's architecture, features, and impact on reproducible computational biology research."
link: 'https://doi.org/10.1093/nar/gkac247'
tags: ['galaxy', 'bioinformatics', 'reproducibility', 'workflows', 'open-source']
featured: true
---

## Publication Details

- **Journal**: Nucleic Acids Research
- **Publication Date**: July 2, 2022
- **Authors**: The Galaxy Community (including **John Chilton**)
- **DOI**: [10.1093/nar/gkac247](https://doi.org/10.1093/nar/gkac247)

## Abstract

Galaxy (https://galaxyproject.org) is a scientific workflow platform for accessible, reproducible, and collaborative computational biology and data science. Since its inception in 2005, Galaxy has grown to support over 9,000 analysis tools, extensive data integration capabilities, and a thriving global community. This paper provides a comprehensive overview of Galaxy's current state, including its architecture, features, and impact on scientific research.

## Key Contributions

- Comprehensive documentation of Galaxy's architecture and plugin ecosystem
- Analysis of Galaxy's impact on research reproducibility
- Overview of community-driven development model
- Description of Galaxy's role in training and education

## Personal Role

As a core Galaxy developer, I contributed to the platform's job execution infrastructure, container support, and workflow engine improvements. My work focused on enhancing Galaxy's scalability and support for complex computational workflows.

## Significance

This publication serves as the primary citation for the Galaxy platform, documenting over 15 years of development and its role in democratizing computational biology. Galaxy has enabled thousands of researchers worldwide to perform complex analyses without programming expertise, significantly advancing reproducible science.

## Links

- [Read Paper](https://doi.org/10.1093/nar/gkac247)
- [PubMed](https://pubmed.ncbi.nlm.nih.gov/35446963/)
- [Galaxy Project](https://galaxyproject.org)
```

## Instructions

1. If the user provides a paper URL/DOI, fetch metadata if possible
2. If not, ask for the paper URL/DOI
3. Ask about the user's specific role/contributions to the paper
4. Optionally ask if they want to provide a custom summary (otherwise use abstract)
5. Generate the slug and confirm it with the user
6. Create the MDX file with all required frontmatter fields
7. Populate the content with paper metadata and structured information
8. Confirm the file was created and show the path
9. Suggest the user review and add personal insights about their contributions

## Notes

- The `type` field MUST be "paper" (lowercase)
- The `date` should be the publication date in YYYY-MM-DD format
- The `link` should be the DOI URL (preferred) or PubMed/journal URL
- Tags should be lowercase and use hyphens for multi-word tags
- Emphasize the user's personal contributions and role
- Focus on significance and impact beyond just describing the paper
