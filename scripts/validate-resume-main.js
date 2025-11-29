#!/usr/bin/env node
import { readFileSync } from 'fs';
import { parse } from 'yaml';

function validateMain() {
  try {
    const main = parse(readFileSync('src/data/resume-main.yaml', 'utf-8'));
    let errors = [];

    if (!main.cv || !main.cv.sections) {
      errors.push('Missing cv.sections structure');
      console.error('❌ Validation errors:');
      errors.forEach((err) => console.error(`  - ${err}`));
      process.exit(1);
    }

    for (const [sectionName, sectionData] of Object.entries(main.cv.sections)) {
      // Check section-level include_in
      if (sectionData.include_in && !['both', 'resume', 'cv'].includes(sectionData.include_in)) {
        errors.push(
          `${sectionName}: Invalid section-level include_in value: ${sectionData.include_in}`
        );
      }

      let entries = Array.isArray(sectionData) ? sectionData : sectionData.entries || [];

      entries.forEach((entry, idx) => {
        if (entry.include_in && !['both', 'resume', 'cv'].includes(entry.include_in)) {
          errors.push(`${sectionName}[${idx}]: Invalid include_in value: ${entry.include_in}`);
        }
        if (entry.priority && typeof entry.priority !== 'number') {
          errors.push(`${sectionName}[${idx}]: priority must be a number`);
        }
      });

      // Validate resume_limit and cv_limit
      if (sectionData.resume_limit && typeof sectionData.resume_limit !== 'number') {
        errors.push(`${sectionName}: resume_limit must be a number`);
      }
      if (sectionData.cv_limit && typeof sectionData.cv_limit !== 'number') {
        errors.push(`${sectionName}: cv_limit must be a number`);
      }
    }

    if (errors.length > 0) {
      console.error('❌ Validation errors:');
      errors.forEach((err) => console.error(`  - ${err}`));
      process.exit(1);
    }

    console.log('✓ resume-main.yaml is valid');
  } catch (error) {
    console.error('❌ Failed to parse YAML:', error.message);
    process.exit(1);
  }
}

validateMain();
