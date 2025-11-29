#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { parse, stringify } from 'yaml';
import { resolve } from 'path';

function buildResumeVariants() {
  const mainPath = resolve('src/data/resume-main.yaml');
  const mainYaml = readFileSync(mainPath, 'utf-8');
  const main = parse(mainYaml);

  // Generate resume variant
  const resume = filterForFormat(main, 'resume');
  writeFileSync(resolve('src/data/resume.yaml'), stringify(resume), 'utf-8');
  console.log('✓ Generated src/data/resume.yaml');

  // Generate CV variant
  const cv = filterForFormat(main, 'cv');
  writeFileSync(resolve('src/data/cv.yaml'), stringify(cv), 'utf-8');
  console.log('✓ Generated src/data/cv.yaml');
}

function filterForFormat(main, format) {
  // Filter social networks by include_in
  const filteredSocialNetworks = main.cv.social_networks
    ? main.cv.social_networks
        .filter((network) => {
          const includeIn = network.include_in || 'both';
          return includeIn === 'both' || includeIn === format;
        })
        .map(({ include_in: _include_in, ...rest }) => rest)
    : [];

  const result = {
    cv: {
      name: main.cv.name,
      location: main.cv.location,
      email: main.cv.email,
      phone: main.cv.phone,
      website: main.cv.website,
      social_networks: filteredSocialNetworks,
      sections: {},
    },
    design: main.design,
    rendercv_settings: main.rendercv_settings,
  };

  for (const [sectionName, sectionData] of Object.entries(main.cv.sections)) {
    const sectionIncludeIn = sectionData.include_in || 'both';

    // Skip entire section if it doesn't match the format
    if (sectionIncludeIn !== 'both' && sectionIncludeIn !== format) {
      continue;
    }

    const limit = format === 'resume' ? sectionData.resume_limit : sectionData.cv_limit;
    let entries = sectionData.entries;

    if (Array.isArray(entries)) {
      // Filter entries by include_in
      let filteredEntries = entries
        .filter((entry) => {
          const includeIn = entry.include_in || 'both';
          return includeIn === 'both' || includeIn === format;
        })
        .map((entry) => processEntry(entry, format))
        .sort((a, b) => (a.priority || 999) - (b.priority || 999));

      // Apply limit if specified
      if (limit) {
        filteredEntries = filteredEntries.slice(0, limit);
      }

      // Remove preprocessing metadata
      filteredEntries = filteredEntries.map(
        ({
          priority: _priority,
          include_in: _include_in,
          highlights_resume: _highlights_resume,
          highlights_cv: _highlights_cv,
          ...rest
        }) => rest
      );

      result.cv.sections[sectionName] = filteredEntries;
    } else {
      // Handle non-array sections (just copy)
      result.cv.sections[sectionName] = sectionData;
    }
  }

  return result;
}

function processEntry(entry, format) {
  if (!entry) return null;
  const processed = { ...entry };

  // Replace highlights with format-specific version if available
  if (format === 'resume' && entry.highlights_resume) {
    processed.highlights = entry.highlights_resume;
  } else if (format === 'cv' && entry.highlights_cv) {
    processed.highlights = entry.highlights_cv;
  }

  return processed;
}

buildResumeVariants();
