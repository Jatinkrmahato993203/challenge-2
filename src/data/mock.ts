import { ElectionEvent, Flow, Jurisdiction } from '../types';

export const mockJurisdictions: Jurisdiction[] = [
  {
    id: 'in-nat',
    name: 'National (General Elections)',
    timezone: 'Asia/Kolkata',
    officialSources: ['https://eci.gov.in/'],
  },
  {
    id: 'in-mh',
    name: 'Maharashtra (State Assembly)',
    timezone: 'Asia/Kolkata',
    officialSources: ['https://ceo.maharashtra.gov.in/'],
  },
];

export const mockEvents: ElectionEvent[] = [
  {
    id: 'evt-1',
    title: 'Draft Electoral Roll Publication',
    description: 'Publication of the draft electoral roll for the upcoming Special Summary Revision. Citizens can check their names and file claims/objections.',
    type: 'event',
    startDate: '2026-10-27T10:00:00Z',
    jurisdiction: 'in-mh',
    actions: [
      {
        id: 'act-1',
        title: 'Check Electoral Roll',
        required: false,
        estimatedTimeMinutes: 5,
        resources: [{ type: 'link', url: 'https://electoralsearch.eci.gov.in/' }],
      },
    ],
    sources: [
      { name: 'ECI Official Portal', url: 'https://eci.gov.in', fetchedAt: new Date().toISOString() },
    ],
    tags: ['ssr', 'voter-list'],
  },
  {
    id: 'evt-2',
    title: 'Deadline for Claims and Objections (Form 6, 7, 8)',
    description: 'The last date to submit Form 6 (New Voter), Form 7 (Deletion/Objection), and Form 8 (Correction/Shifting) for the current revision cycle.',
    type: 'deadline',
    startDate: '2026-12-09T23:59:00Z',
    jurisdiction: 'in-mh',
    actions: [
      {
        id: 'act-2',
        title: 'Apply for New Voter (Form 6)',
        required: true,
        estimatedTimeMinutes: 15,
        flowId: 'flow-form-6',
        resources: [{ type: 'link', url: 'https://voters.eci.gov.in/' }],
      },
    ],
    sources: [
      { name: 'Voters Service Portal', url: 'https://voters.eci.gov.in', fetchedAt: new Date().toISOString() },
    ],
    tags: ['registration', 'deadline'],
  },
  {
    id: 'evt-3',
    title: 'Final Electoral Roll Publication',
    description: 'The final, updated list of voters is published. Only citizens on this list are eligible to vote in the upcoming elections.',
    type: 'event',
    startDate: '2027-01-05T10:00:00Z',
    jurisdiction: 'in-mh',
    actions: [
      {
        id: 'act-3',
        title: 'Verify Your Name',
        required: true,
        estimatedTimeMinutes: 5,
        flowId: 'flow-check-name',
        resources: [{ type: 'link', url: 'https://electoralsearch.eci.gov.in/' }],
      },
    ],
    sources: [
      { name: 'ECI Official Portal', url: 'https://eci.gov.in', fetchedAt: new Date().toISOString() },
    ],
    tags: ['final-roll', 'voter-list'],
  },
  {
    id: 'evt-4',
    title: 'Polling Day (Phase 1)',
    description: 'Voting day for Phase 1 constituencies. Polls are typically open from 7:00 AM to 6:00 PM. Carry your EPIC or an approved valid photo ID.',
    type: 'election-day',
    startDate: '2027-04-19T07:00:00Z',
    endDate: '2027-04-19T18:00:00Z',
    jurisdiction: 'in-nat',
    actions: [
      {
        id: 'act-4',
        title: 'Find Polling Station',
        required: true,
        estimatedTimeMinutes: 2,
        resources: [{ type: 'link', url: 'https://electoralsearch.eci.gov.in/' }],
      }
    ],
    sources: [
      { name: 'Election Commission of India', url: 'https://eci.gov.in', fetchedAt: new Date().toISOString() },
    ],
    tags: ['voting', 'lok-sabha'],
  }
];

export const mockFlows: Record<string, Flow> = {
  'flow-form-6': {
    id: 'flow-form-6',
    title: 'Apply as a New Voter (Form 6)',
    steps: [
      {
        id: 'f6-step-1',
        title: 'Check Eligibility',
        description: 'You must be an Indian citizen and 18 years of age or older on the qualifying date (typically Jan 1, Apr 1, Jul 1, or Oct 1 of the year).',
        checklistItems: [
          { id: 'f6-1', text: 'I am an Indian Citizen', optional: false },
          { id: 'f6-2', text: 'I will be 18+ on the qualifying date', optional: false },
        ],
        linkToEvents: [],
      },
      {
        id: 'f6-step-2',
        title: 'Gather Documents',
        description: 'Keep scanned copies of your recent passport-size photograph, age proof (e.g., Birth Certificate, PAN, Aadhaar), and address proof (e.g., Aadhaar, Electricity Bill) ready.',
        checklistItems: [
          { id: 'f6-3', text: 'Passport-size photograph', optional: false },
          { id: 'f6-4', text: 'Proof of Age', optional: false },
          { id: 'f6-5', text: 'Proof of Ordinary Residence', optional: false },
        ],
        linkToEvents: [],
      },
      {
        id: 'f6-step-3',
        title: 'Submit Form 6',
        description: 'Visit the Voters Service Portal or use the Voter Helpline Mobile App to fill and submit Form 6.',
        checklistItems: [
          { id: 'f6-6', text: 'Fill Form 6 on NVSP / App', optional: false },
          { id: 'f6-7', text: 'Note down Reference ID for tracking', optional: true },
        ],
        linkToEvents: ['evt-2'],
      }
    ]
  },
  'flow-check-name': {
    id: 'flow-check-name',
    title: 'Check Your Name in Voter List',
    steps: [
      {
        id: 'cn-step-1',
        title: 'Locate Your Details',
        description: 'You can search the electoral roll using your EPIC (Voter ID No.), personal details, or mobile number.',
        checklistItems: [
          { id: 'cn-1', text: 'Have EPIC number or personal details ready', optional: false },
        ],
        linkToEvents: ['evt-1', 'evt-3']
      },
      {
        id: 'cn-step-2',
        title: 'Search on Electoral Search Portal',
        description: 'Go to electoralsearch.eci.gov.in and enter your details to verify your polling station and serial number.',
        checklistItems: [
          { id: 'cn-2', text: 'Verified name and details in the list', optional: false },
          { id: 'cn-3', text: 'Downloaded Voter Information Slip', optional: true },
        ],
        linkToEvents: ['evt-4']
      }
    ]
  }
};
