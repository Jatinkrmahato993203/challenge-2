import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { FlowsIndex } from './pages/FlowsIndex';
import { WizardPage } from './pages/WizardPage';
import { Layout } from './components/Layout';

function About() {
  return (
    <Layout>
      <div className="max-w-3xl">
        <h1 className="text-5xl font-serif font-black tracking-tighter mb-8 leading-tight">About Civic Guide</h1>
        <div className="prose prose-lg text-[var(--color-editorial-muted)] leading-relaxed">
          <p className="mb-6">
            Civic Guide is an interactive, non-partisan assistant designed to help voters navigate election processes, timelines, and actionable steps with confidence and ease.
          </p>
          <p className="mb-12">
            Our goal is to make civic participation accessible by translating complex bureaucratic deadlines into clear, step-by-step actions. All information is strictly informational and relies on official state and federal sources.
          </p>
          
          <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] mt-12 mb-4 border-b border-[#E5E2DE] pb-2">Official Sources</h2>
          <ul className="list-disc pl-5 mb-12 space-y-2">
            <li><a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer" className="text-[#1A1A1A] underline underline-offset-4 font-medium hover:text-blue-600">Election Commission of India (ECI)</a></li>
            <li><a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="text-[#1A1A1A] underline underline-offset-4 font-medium hover:text-blue-600">Voters Service Portal</a></li>
            <li><a href="https://electoralsearch.eci.gov.in" target="_blank" rel="noopener noreferrer" className="text-[#1A1A1A] underline underline-offset-4 font-medium hover:text-blue-600">Electoral Search</a></li>
          </ul>

          <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-4 border-b border-[#E5E2DE] pb-2">Frequently Asked Questions</h2>
          <div className="space-y-6 mb-12">
            <div>
               <h3 className="font-bold text-[#1A1A1A] mb-1">Is this an official government application?</h3>
               <p>No, this is an independent, non-partisan educational tool summarizing public information.</p>
            </div>
             <div>
               <h3 className="font-bold text-[#1A1A1A] mb-1">Do you collect my voter information?</h3>
               <p>No. All progress tracking is stored locally on your device. We do not transmit or store your checklist data or personal information.</p>
            </div>
             <div>
               <h3 className="font-bold text-[#1A1A1A] mb-1">How often is the data updated?</h3>
               <p>The dates reflect the schedules published by the Election Commission. For definitive timings, always cross-reference official portals.</p>
            </div>
          </div>

          <div className="pt-8 border-t border-[#E5E2DE] text-[10px] uppercase tracking-widest font-bold">
            <p>Version 1.1.0 — Civic Open Source Initiative</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flows" element={<FlowsIndex />} />
        <Route path="/flows/:flowId" element={<WizardPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </HashRouter>
  );
}
