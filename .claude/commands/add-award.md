# Add Best of Pittsburgh Award

You are helping to create a "Best of Pittsburgh" award entry for a favorite place, experience, or thing in Pittsburgh.

## Your Task

1. **Get Award Information**: Ask the user for:
   - Category (e.g., "Best Mini-Golf", "Best Dumplings", "Best Coffee Shop")
   - Winner name (business or place name)
   - Location (address or neighborhood)
   - Year of award
   - Optional: Brief reasoning or story
2. **Generate Slug**: Create a URL-friendly slug from the category
   - Example: "Best Mini-Golf in Pittsburgh" → "best-mini-golf-pittsburgh"
   - Keep it concise and descriptive
3. **Create MDX File**: Generate an award entry file at `src/content/awards/{slug}.mdx`

## Frontmatter Schema

The frontmatter MUST match this exact schema:

```yaml
---
title: 'Best [Category] in Pittsburgh'
category: 'food' # or 'drinks', 'coffee', 'entertainment', 'outdoors', 'culture', 'shopping', etc.
winner: 'Business/Place Name'
location: 'Address or Neighborhood'
year: 2024
tags: ['tag1', 'tag2'] # Relevant tags
featured: false # Set to true for all-time favorites
---
```

## Content Structure

After the frontmatter, create MDX content following this structure:

```markdown
## The Winner

[Business name and what they do/offer]

## Why They Win

[Detailed reasoning for why this place/thing is the best in its category]

## What to Try

- Specific recommendations
- Menu items, experiences, or highlights
- Tips for first-time visitors

## Details

- **Address**: [Full address]
- **Hours**: [If known]
- **Price Range**: [If applicable: $, $$, $$$]
- **Website**: [If available]
- **Best Time to Visit**: [Optional tips]

## The Story

[Personal anecdotes, memorable experiences, or why this place is special to you]
```

## Category Suggestions

Choose from these categories (or create a new one):

- **Food**: restaurants, specific cuisines, dishes
- **Drinks**: bars, breweries, cocktail lounges
- **Coffee**: coffee shops, cafes
- **Entertainment**: mini-golf, bowling, arcades, music venues
- **Outdoors**: parks, trails, outdoor activities
- **Culture**: museums, theaters, bookstores
- **Shopping**: boutiques, markets, specialty stores
- **Services**: barber shops, salons, etc.

## Tag Suggestions

Based on the award, suggest relevant tags:

- Cuisine types (e.g., "chinese", "italian", "burgers")
- Neighborhoods (e.g., "shadyside", "lawrenceville", "strip-district")
- Attributes (e.g., "outdoor-seating", "dog-friendly", "late-night")
- Experience (e.g., "date-night", "family-friendly", "group-activity")

## Example Output

```mdx
---
title: 'Best Mini-Golf in Pittsburgh'
category: 'entertainment'
winner: 'Cool Springs Golf'
location: 'Bethel Park'
year: 2024
tags: ['mini-golf', 'family-friendly', 'outdoor', 'bethel-park']
featured: true
---

## The Winner

Cool Springs Golf is a classic Pittsburgh mini-golf course that's been delighting families and competitive putters since the 1950s. This outdoor course features challenging holes with water features, creative obstacles, and beautiful landscaping.

## Why They Win

What sets Cool Springs apart is the perfect balance of challenge and fun. The course has:

- 18 well-maintained holes with unique layouts
- Nostalgic 1950s charm with modern upkeep
- Friendly staff who genuinely care about your experience
- Reasonable prices that make it accessible for families
- A concession stand with soft serve ice cream (crucial!)

Unlike newer, flashier mini-golf places, Cool Springs has that authentic Pittsburgh feel - it's been here forever, everyone has memories there, and it just _works_.

## What to Try

- Play the full 18 holes (don't skip any!)
- Get a soft serve cone after your round
- Try the "windmill hole" - it's iconic and surprisingly tricky
- Go on a weekday evening to avoid crowds
- Bring cash (they accept cards but cash is easier)

## Details

- **Address**: 5100 Baptist Rd, Bethel Park, PA 15102
- **Hours**: Seasonal (April-October), typically 11am-10pm
- **Price Range**: $ (very affordable)
- **Website**: coolspringsgolf.com
- **Best Time to Visit**: Weekday evenings or Sunday mornings

## The Story

I've been going to Cool Springs since I was a kid, and it hasn't changed much - which is exactly why it's the best. There's something magical about playing the same course your parents played, navigating the same tricky water hazards, and getting the same soft serve cone at the end.

The place has a laid-back, unpretentious vibe that's quintessentially Pittsburgh. No fancy theming, no arcade upsells, just pure mini-golf the way it should be. Plus, the staff remembers regulars and makes everyone feel welcome.

Last summer, a group of us played there every Thursday evening. It became our favorite weekly tradition - competitive putting, terrible jokes, and ice cream. That's what Cool Springs does best: it creates those simple, perfect Pittsburgh moments.
```

## Instructions

1. Ask the user for the category and winner
2. Ask for location, year, and any specific details they want to include
3. Optionally ask if they want to provide a personal story or specific reasoning
4. Generate the slug and confirm it with the user
5. Create the MDX file with all required frontmatter fields
6. Populate the content with structured information
7. Confirm the file was created and show the path
8. Suggest the user review and add more personal details

## Notes

- The `category` field should be lowercase and singular (e.g., "food" not "Food" or "Foods")
- The `title` should always be "Best [X] in Pittsburgh" format for consistency
- The `year` is a number, not a string
- Tags should be lowercase and use hyphens for multi-word tags
- Featured awards should be reserved for all-time favorites
- Encourage personal stories and specific details - that's what makes these special!
- If the user doesn't know all details (hours, website), that's okay - focus on why it's the best
