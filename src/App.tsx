import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { FlowsIndex } from './pages/FlowsIndex';
import { WizardPage } from './pages/WizardPage';
import { Layout } from './components/Layout';

function About() {
  return (
    <Layout>
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">About Civic Guide</h1>
        <div className="prose text-slate-600">
          <p className="mb-4">
            Civic Guide is an interactive, non-partisan assistant designed to help voters understand election processes, timelines, and actionable steps.
          </p>
          <p className="mb-4">
            Our goal is to make navigating deadlines and requirements as smooth and accessible as possible. All information is strictly informational and relies on official state and federal sources where applicable.
          </p>
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
