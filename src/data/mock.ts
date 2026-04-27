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
  {
    id: 'in-dl',
    name: 'Delhi (State Assembly)',
    timezone: 'Asia/Kolkata',
    officialSources: ['https://ceodelhi.gov.in/'],
  },
  {
    id: 'in-ka',
    name: 'Karnataka (State Assembly)',
    timezone: 'Asia/Kolkata',
    officialSources: ['https://ceo.karnataka.gov.in/'],
  },
  {
    id: 'in-up',
    name: 'Uttar Pradesh (State Assembly)',
    timezone: 'Asia/Kolkata',
    officialSources: ['https://ceouttarpradesh.nic.in/'],
  },
  {
    id: 'in-tn',
    name: 'Tamil Nadu (State Assembly)',
    timezone: 'Asia/Kolkata',
    officialSources: ['https://www.elections.tn.gov.in/'],
  },
  {
    id: 'in-wb',
    name: 'West Bengal (State Assembly)',
    timezone: 'Asia/Kolkata',
    officialSources: ['https://ceowestbengal.nic.in/'],
  },
  {
    id: 'in-gj',
    name: 'Gujarat (State Assembly)',
    timezone: 'Asia/Kolkata',
    officialSources: ['https://ceo.gujarat.gov.in/'],
  },
  {
    id: 'in-as',
    name: 'Assam (State Assembly)',
    timezone: 'Asia/Kolkata',
    officialSources: ['https://ceoassam.nic.in/'],
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
  },
  {
    id: 'evt-5',
    title: 'Candidate Filing Deadline',
    description: 'Last day for individuals to submit their nomination papers to run as a candidate in the local elections.',
    type: 'deadline',
    startDate: '2026-08-15T15:00:00Z',
    jurisdiction: 'in-dl',
    actions: [],
    sources: [
      { name: 'CEO Delhi Portal', url: 'https://ceodelhi.gov.in/', fetchedAt: new Date().toISOString() },
    ],
    tags: ['candidate', 'deadline'],
  },
  {
    id: 'evt-6',
    title: 'Voter Information Slip Distribution Starts',
    description: 'Official Voter Information Slips will begin to be distributed to registered residences to inform voters of their polling station.',
    type: 'event',
    startDate: '2027-03-10T09:00:00Z',
    jurisdiction: 'in-nat',
    actions: [],
    sources: [
      { name: 'ECI Info Center', url: 'https://eci.gov.in', fetchedAt: new Date().toISOString() },
    ],
    tags: ['info-slip', 'preparation'],
  },
  {
    id: 'evt-7',
    title: 'Absentee Ballot Request Deadline for Seniors/PWDs',
    description: 'The deadline for Senior Citizens (85+) and Persons with Disabilities (PwDs) to request an absentee ballot (Form 12D) to vote from home.',
    type: 'deadline',
    startDate: '2027-03-25T17:00:00Z',
    jurisdiction: 'in-nat',
    actions: [
        {
        id: 'act-7',
        title: 'Apply for Postal Ballot',
        required: false,
        estimatedTimeMinutes: 10,
        resources: [{ type: 'link', url: 'https://voters.eci.gov.in/' }],
      }
    ],
    sources: [
      { name: 'Postal Ballot Guidelines', url: 'https://eci.gov.in', fetchedAt: new Date().toISOString() },
    ],
    tags: ['absentee', 'postal-ballot'],
  },
  {
    id: 'evt-8',
    title: 'Counting Day / Results Declaration',
    description: 'Votes will be counted and the final election results will be declared across constituencies.',
    type: 'event',
    startDate: '2027-06-04T08:00:00Z',
    jurisdiction: 'in-nat',
    actions: [
        {
        id: 'act-8',
        title: 'Check Live Results',
        required: false,
        estimatedTimeMinutes: 2,
        resources: [{ type: 'link', url: 'https://results.eci.gov.in/' }],
      }
    ],
    sources: [
      { name: 'ECI Results Portal', url: 'https://results.eci.gov.in/', fetchedAt: new Date().toISOString() },
    ],
    tags: ['results', 'counting'],
  },
  {
     id: 'evt-9',
     title: 'Delhi Assembly Term Ends',
     description: 'The expiration date of the current term for the Delhi State Legislative Assembly.',
     type: 'event',
     startDate: '2026-02-15T23:59:00Z',
     jurisdiction: 'in-dl',
     actions: [],
     sources: [
       { name: 'State Assembly Tracker', url: 'https://ceodelhi.gov.in/', fetchedAt: new Date().toISOString() },
     ],
     tags: ['term-end', 'delhi'],
  },
  {
     id: 'evt-10',
     title: 'Karnataka Draft Electoral Roll',
     description: 'Publication of the draft electoral roll for Karnataka for citizens to verify details before local body elections.',
     type: 'event',
     startDate: '2026-11-10T10:00:00Z',
     jurisdiction: 'in-ka',
     actions: [
        {
        id: 'act-10',
        title: 'Karnataka Voter Search',
        required: false,
        estimatedTimeMinutes: 5,
        resources: [{ type: 'link', url: 'https://ceo.karnataka.gov.in/' }],
      }
     ],
     sources: [
       { name: 'CEO Karnataka', url: 'https://ceo.karnataka.gov.in/', fetchedAt: new Date().toISOString() },
     ],
     tags: ['draft-roll', 'karnataka'],
  },
  {
      id: 'evt-11',
      title: 'Request Replacement Voter ID (Form 8) Deadline',
      description: 'Last date to submit Form 8 if you have lost your Voter ID card and need a replacement before the general election.',
      type: 'deadline',
      startDate: '2027-02-28T23:59:00Z',
      jurisdiction: 'in-nat',
      actions: [
          {
          id: 'act-11',
          title: 'Submit Form 8 for Replacement',
          required: false,
          estimatedTimeMinutes: 10,
          flowId: 'flow-replace-id',
          resources: [{ type: 'link', url: 'https://voters.eci.gov.in/' }],
        }
      ],
      sources: [
        { name: 'Form 8 Guidelines', url: 'https://voters.eci.gov.in', fetchedAt: new Date().toISOString() },
      ],
      tags: ['replacement', 'form-8'],
  },
  {
      id: 'evt-12',
      title: 'End of Election Campaign Period',
      description: 'Public campaigning must cease 48 hours before the end of the polling period to allow voters a silent period.',
      type: 'event',
      startDate: '2027-04-17T18:00:00Z',
      jurisdiction: 'in-nat',
      actions: [],
      sources: [
        { name: 'Model Code of Conduct', url: 'https://eci.gov.in/', fetchedAt: new Date().toISOString() },
      ],
      tags: ['campaign', 'silent-period'],
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
  },
  'flow-replace-id': {
    id: 'flow-replace-id',
    title: 'Request Replacement Voter ID (Form 8)',
    steps: [
        {
        id: 'ri-step-1',
        title: 'Reason for Replacement',
        description: 'Determine the reason you need a replacement (lost, destroyed, or mutilated). If lost, you may need a copy of the FIR.',
        checklistItems: [
          { id: 'ri-1', text: 'Know my existing EPIC number', optional: false },
          { id: 'ri-2', text: 'Have a copy of FIR (if lost)', optional: true },
        ],
        linkToEvents: []
      },
      {
        id: 'ri-step-2',
        title: 'Submit Form 8',
        description: 'Select the "Issue of Replacement EPIC without correction" option on Form 8 via the portal.',
        checklistItems: [
          { id: 'ri-3', text: 'Submit Form 8 on Voters Portal', optional: false },
          { id: 'ri-4', text: 'Pay any applicable fee (if requested)', optional: true },
        ],
        linkToEvents: ['evt-11']
      }
    ]
  },
  'flow-poll-prep': {
      id: 'flow-poll-prep',
      title: 'Prepare for Polling Station',
      steps: [
          {
          id: 'pp-step-1',
          title: 'Know Your Polling Location',
          description: 'Identify exactly where you need to go and what time the polls are open.',
          checklistItems: [
            { id: 'pp-1', text: 'Check exact address of polling booth', optional: false },
            { id: 'pp-2', text: 'Confirm polling hours (e.g., 7 AM to 6 PM)', optional: false },
          ],
          linkToEvents: ['evt-4']
        },
        {
          id: 'pp-step-2',
          title: 'Gather Required Items',
          description: 'Make sure you have an acceptable proof of identity to vote.',
          checklistItems: [
            { id: 'pp-3', text: 'Carry original EPIC (Voter ID)', optional: false },
            { id: 'pp-4', text: 'Or carry approved alternate ID (Aadhaar, Passport, PAN)', optional: true },
            { id: 'pp-5', text: 'Carry Voter Information Slip (optional but recommended)', optional: true },
          ],
          linkToEvents: ['evt-4']
        }
      ]
  },
  'flow-nri': {
    id: 'flow-nri',
    title: 'Register as an Overseas (NRI) Voter — Form 6A',
    steps: [
      {
        id: 'nri-step-1',
        title: 'Check Eligibility',
        description: 'You must be a citizen of India, absent from your place of ordinary residence in India, and not acquired citizenship of any other country.',
        checklistItems: [
          { id: 'nri-1', text: 'Confirm Indian citizenship', optional: false },
          { id: 'nri-2', text: 'Hold a valid Indian Passport', optional: false },
        ],
        linkToEvents: []
      },
      {
        id: 'nri-step-2',
        title: 'Gather Documents',
        description: 'Prepare the necessary documents to upload.',
        checklistItems: [
          { id: 'nri-3', text: 'Passport size photograph', optional: false },
          { id: 'nri-4', text: 'Copy of Passport (pages with photo, address in India, passport details)', optional: false },
          { id: 'nri-5', text: 'Copy of valid visa/residence permit', optional: false },
        ],
        linkToEvents: []
      },
      {
        id: 'nri-step-3',
        title: 'Submit Form 6A',
        description: 'Fill out Form 6A online on the Voters Service Portal or overseasvoter.eci.gov.in.',
        checklistItems: [
          { id: 'nri-6', text: 'Submit Form 6A online', optional: false },
        ],
        linkToEvents: []
      }
    ]
  },
  'flow-pwd': {
    id: 'flow-pwd',
    title: 'Voting as a Person with a Disability',
    steps: [
      {
        id: 'pwd-step-1',
        title: 'Register as PwD Voter',
        description: 'Mark yourself as a Person with Disability to avail special facilities at the polling booth or opt for home voting.',
        checklistItems: [
          { id: 'pwd-1', text: 'Register via Saksham App or NVSP (Form 8)', optional: false },
          { id: 'pwd-2', text: 'Receive PwD marked Voter ID', optional: true },
        ],
        linkToEvents: []
      },
      {
        id: 'pwd-step-2',
        title: 'Request Accommodations',
        description: 'You can request a wheelchair, volunteer assistance, or a postal ballot (Form 12D) if eligible.',
        checklistItems: [
          { id: 'pwd-3', text: 'Request pick-up/drop facility (if available in your district)', optional: true },
          { id: 'pwd-4', text: 'Submit Form 12D for Home Voting (if eligible & required)', optional: true },
        ],
        linkToEvents: ['evt-7']
      }
    ]
  }
};
