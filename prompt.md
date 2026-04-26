# Election Assistant Code Generation Prompt

Act as a world-class Software Architect and Frontend Engineer specializing in interactive web applications and accessible UI/UX. Generate a precise, structured, and actionable complete implementation for an interactive assistant that helps users understand the election process and timelines.

## Context
- **Product goal:** Educational assistant for election processes, timelines, and actions. Non-partisan, factual, properly sourced.
- **Platform:** Responsive PWA (desktop/mobile).
- **Target Audience:** Voters, civic organizations, volunteers.
- **Key Features:**
  - Interactive timeline (vertical for mobile, horizontal/vertical for desktop).
  - Step-by-step guided flows (registration, early voting, etc.).
  - Search and filter by jurisdiction and date.
  - Smooth UI with accessible animations (framer-motion) and smooth scrolling.
  - WCAG 2.1 AA compliance (keyboard navigation, semantic HTML).
- **Tech Stack:**
  - React + TypeScript + Vite.
  - Tailwind CSS + CSS variables.
  - Zustand for state, React Router for navigation.
  - Lucide React for icons, date-fns for time formatting.

## Deliverables
1. **Scaffold:** Vite React TypeScript app with Tailwind CSS.
2. **Components:** EventCard, wizard steps, layout, accessible inputs/buttons.
3. **Data Schema:** Provide a typed mock data structure for ElectionEvent, Jurisdiction, and Flow.
4. **Pages:** Home (Timeline view), flows index, and a wizard interface for step-by-step guidance.
5. **Quality:** Ensure 100% type safety and zero UI flickering.

## Implementation Steps
### 1. File Structure Setup
Create the standard Vite file structure with `/src` containing `components/`, `pages/`, `lib/`, `store/`, and `types/`.

### 2. Base Components
Implement `src/components/ui/button.tsx` (using standard CVA variants) and `src/components/ui/input.tsx`.

### 3. Data Schema and Mock Data
Create `src/types/index.ts` with definitions for `ElectionEvent`, `Action`, `Flow`, and `Step`. Populate `src/data/mock.ts` with example data for at least two jurisdictions and a registration flow.

### 4. Interactive Timeline Module
In `src/pages/Home.tsx`, render the timeline. Include search functionality and a jurisdiction selector. Use `framer-motion` for item entrance animations. Ensure that the latest upcoming deadline is visually highlighted.

### 5. Step-by-Step Flow System
Create a `WizardPage.tsx` that reads from the mock data. Include a persistent progress bar. Each step should present requirements and an interactive checklist. State must be preserved using `Zustand`.

### 6. Polish and Accessibility
Ensure all buttons have sufficient target sizes, inputs have clear focus rings, and semantic HTML is used throughout. Implement smooth scrolling for page navigation.

Output all the code seamlessly, prioritizing a functional, beautiful result.
