import React, { Suspense, Component, ErrorInfo, ReactNode } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Button } from './components/ui/button';

// Lazy loaded routes
const Home = React.lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const FlowsIndex = React.lazy(() => import('./pages/FlowsIndex').then(module => ({ default: module.FlowsIndex })));
const WizardPage = React.lazy(() => import('./pages/WizardPage').then(module => ({ default: module.WizardPage })));

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[var(--color-editorial-bg)] flex items-center justify-center p-4 text-[var(--color-editorial-text)] font-sans">
          <div className="max-w-md text-center">
             <h1 className="text-4xl font-serif font-black mb-4">Something went wrong.</h1>
             <p className="text-[var(--color-editorial-muted)] mb-8">We encountered an unexpected error. Please refresh the page or try again later.</p>
             <Button onClick={() => window.location.reload()}>Refresh Page</Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function NotFound() {
  return (
    <Layout>
      <div className="text-center py-20">
        <h2 className="text-4xl font-serif font-black mb-4">404 - Page Not Found</h2>
        <p className="text-[var(--color-editorial-muted)] mb-8">The page you are looking for doesn't exist.</p>
        <Button asChild><Link to="/">Return to Timeline</Link></Button>
      </div>
    </Layout>
  );
}

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
          
          <h2 className="text-2xl font-serif font-bold text-[var(--color-editorial-text)] mt-12 mb-4 border-b border-[var(--color-editorial-border)] pb-2">Official Sources</h2>
          <ul className="list-disc pl-5 mb-12 space-y-2">
            <li><a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer" className="text-[var(--color-editorial-text)] underline underline-offset-4 font-medium hover:text-blue-600">Election Commission of India (ECI)</a></li>
            <li><a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="text-[var(--color-editorial-text)] underline underline-offset-4 font-medium hover:text-blue-600">Voters Service Portal</a></li>
            <li><a href="https://electoralsearch.eci.gov.in" target="_blank" rel="noopener noreferrer" className="text-[var(--color-editorial-text)] underline underline-offset-4 font-medium hover:text-blue-600">Electoral Search</a></li>
          </ul>

          <h2 className="text-2xl font-serif font-bold text-[var(--color-editorial-text)] mb-4 border-b border-[var(--color-editorial-border)] pb-2">Frequently Asked Questions</h2>
          <div className="space-y-6 mb-12">
            <div>
               <h3 className="font-bold text-[var(--color-editorial-text)] mb-1">Is this an official government application?</h3>
               <p>No, this is an independent, non-partisan educational tool summarizing public information.</p>
            </div>
             <div>
               <h3 className="font-bold text-[var(--color-editorial-text)] mb-1">Do you collect my voter information?</h3>
               <p>No. All progress tracking is stored locally on your device. We do not transmit or store your checklist data or personal information.</p>
            </div>
             <div>
               <h3 className="font-bold text-[var(--color-editorial-text)] mb-1">How often is the data updated?</h3>
               <p>The dates reflect the schedules published by the Election Commission. For definitive timings, always cross-reference official portals.</p>
            </div>
             <div>
               <h3 className="font-bold text-[var(--color-editorial-text)] mb-1">Environmental Impact</h3>
               <p>By completing civic processes digitally, you help reduce paper consumption across India's electoral system.</p>
            </div>
          </div>

          <div className="pt-8 border-t border-[var(--color-editorial-border)] text-[10px] uppercase tracking-widest font-bold">
            <p>Version 1.1.0 — Civic Open Source Initiative</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <HashRouter>
        <Suspense fallback={
          <div className="min-h-screen bg-[var(--color-editorial-bg)] flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flows" element={<FlowsIndex />} />
            <Route path="/flows/:flowId" element={<WizardPage />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </ErrorBoundary>
  );
}
