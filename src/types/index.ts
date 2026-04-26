export type EventType = 
  | 'registration' 
  | 'early-voting' 
  | 'mail-ballot' 
  | 'drop-off' 
  | 'election-day' 
  | 'deadline' 
  | 'event';

export interface Action {
  id: string;
  title: string;
  required: boolean;
  resources: { type: string; url: string }[];
  estimatedTimeMinutes?: number;
  flowId?: string; // Link to a step wizard flow
}

export interface Source {
  name: string;
  url: string;
  fetchedAt: string;
}

export interface ElectionEvent {
  id: string;
  title: string;
  description: string;
  type: EventType;
  startDate: string;
  endDate?: string;
  jurisdiction: string;
  actions: Action[];
  sources: Source[];
  location?: {
    name: string;
    address?: string;
    coordinates?: { lat: number; lng: number };
  };
  urlSlug?: string;
  tags?: string[];
}

export interface Jurisdiction {
  id: string;
  name: string;
  timezone: string;
  officialSources: string[];
}

export interface Step {
  id: string;
  title: string;
  description: string;
  checklistItems: { id: string; text: string; optional: boolean }[];
  linkToEvents: string[];
}

export interface Flow {
  id: string;
  title: string;
  steps: Step[];
}
