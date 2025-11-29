#!/usr/bin/env node
import { watch } from 'fs';
import { execSync } from 'child_process';

console.log('👀 Watching src/data/resume-main.yaml for changes...');

watch('src/data/resume-main.yaml', (eventType) => {
  if (eventType === 'change') {
    console.log('\n📝 File changed, regenerating variants...');
    try {
      execSync('node scripts/build-resume-variants.js', { stdio: 'inherit' });
      console.log('✓ Variants regenerated\n');
    } catch (error) {
      console.error('❌ Error regenerating variants:', error.message);
    }
  }
});

// Keep process running
console.log('Press Ctrl+C to stop watching\n');
