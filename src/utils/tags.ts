import yaml from 'js-yaml';
import fs from 'node:fs';
import path from 'node:path';

interface TagDefinition {
  description: string;
}

type TagsConfig = Record<string, TagDefinition>;

let tagsCache: TagsConfig | null = null;

function loadTags(): TagsConfig {
  if (tagsCache) return tagsCache;

  const tagsPath = path.join(process.cwd(), 'src/data/tags.yaml');
  const fileContents = fs.readFileSync(tagsPath, 'utf8');
  tagsCache = yaml.load(fileContents) as TagsConfig;
  return tagsCache;
}

export function getAllowedTags(): string[] {
  return Object.keys(loadTags());
}

export function getTagDescription(tag: string): string {
  const tags = loadTags();
  return tags[tag]?.description ?? `Unknown tag: ${tag}`;
}

export function validateTags(tags: string[]): { valid: boolean; invalidTags: string[] } {
  const allowedTags = new Set(getAllowedTags());
  const invalidTags = tags.filter((tag) => !allowedTags.has(tag));
  return {
    valid: invalidTags.length === 0,
    invalidTags,
  };
}

export function assertValidTags(tags: string[], context?: string): void {
  const { valid, invalidTags } = validateTags(tags);
  if (!valid) {
    const contextStr = context ? ` in ${context}` : '';
    throw new Error(
      `Invalid tags${contextStr}: ${invalidTags.join(', ')}. ` +
        `Add them to src/data/tags.yaml or fix the typo.`
    );
  }
}
