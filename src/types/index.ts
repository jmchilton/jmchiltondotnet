/**
 * Timeline entry types and utility type definitions
 */

export type EntryType = 'pr' | 'paper' | 'poster' | 'presentation' | 'project';

export interface EntryTypeConfig {
  label: string;
  color: 'blue' | 'green' | 'purple' | 'red' | 'yellow';
  icon?: string;
}

export const ENTRY_TYPE_CONFIG: Record<EntryType, EntryTypeConfig> = {
  pr: {
    label: 'Pull Request',
    color: 'purple',
  },
  paper: {
    label: 'Paper',
    color: 'blue',
  },
  poster: {
    label: 'Poster',
    color: 'green',
  },
  presentation: {
    label: 'Presentation',
    color: 'yellow',
  },
  project: {
    label: 'Project',
    color: 'red',
  },
};

export type TimelineFilter = {
  tags?: string[];
  types?: EntryType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
};

export type SortOrder = 'asc' | 'desc';
