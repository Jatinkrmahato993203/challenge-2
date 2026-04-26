import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockFlows } from '../data/mock';
import { useStore } from '../store/useStore';
import { Layout } from '../components/Layout';
import { CheckCircle2, Circle, ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

export function WizardPage() {
  const { flowId } = useParams();
  const flow = mockFlows[flowId || ''];
  const { flowProgress, toggleChecklistItem } = useStore();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!flow) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Flow not found</h2>
          <Button asChild><Link to="/">Return Home</Link></Button>
        </div>
      </Layout>
    );
  }

  const step = flow.steps[currentStepIndex];
  const progress = flowProgress[flow.id] || {};
  
  const stepItems = step.checklistItems;
  const completedItems = stepItems.filter(item => progress[item.id]).length;
  const isStepComplete = completedItems >= stepItems.filter(i => !i.optional).length;
  
  const totalCompleted = flow.steps.reduce((acc, s) => {
    const sComplete = s.checklistItems.filter(i => !i.optional).every(i => progress[i.id]);
    return acc + (sComplete ? 1 : 0);
  }, 0);
  const overallProgress = (totalCompleted / flow.steps.length) * 100;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-8">
        <div className="mb-12 flex items-baseline justify-between border-b border-[var(--color-editorial-border)] pb-8 overflow-hidden">
          <div>
            <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tighter text-[var(--color-editorial-text)]">
              Step {String(currentStepIndex + 1).padStart(2, '0')}
            </h1>
            <p className="uppercase text-xs tracking-widest font-bold text-[var(--color-editorial-muted)] mt-4">
              {flow.title}
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-[10px] text-[var(--color-editorial-muted)] block mb-2 uppercase tracking-widest font-bold">Progress</span>
            <div className="w-32 md:w-48 h-1 bg-[#E5E2DE] overflow-hidden">
              <motion.div 
                className="h-full bg-black origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: overallProgress / 100 }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-[10px] text-[var(--color-editorial-muted)] block mt-2 font-mono">
              {Math.round(overallProgress)}% Complete
            </span>
          </div>
        </div>

        <div className="bg-transparent">
          {/* Step Header */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-serif mb-4 leading-snug">{step.title}</h2>
            <p className="text-sm md:text-base text-[var(--color-editorial-muted)] leading-relaxed max-w-2xl">{step.description}</p>
          </div>

          {/* Step Content */}
          <div className="mb-12">
            <div className="grid gap-4">
              {step.checklistItems.map(item => {
                const isChecked = !!progress[item.id];
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleChecklistItem(flow.id, item.id)}
                    className={`w-full flex items-start text-left p-6 border-2 transition-all duration-200 cursor-pointer
                      ${isChecked ? 'border-black bg-[#FDFCFB]' : 'border-[var(--color-editorial-border)] bg-transparent hover:border-black'}
                    `}
                  >
                    <div className={`w-8 h-8 md:w-10 md:h-10 border shrink-0 flex items-center justify-center mr-6 rounded-none
                        ${isChecked ? 'border-black text-black' : 'border-[#E5E2DE] text-transparent hover:border-black'}
                      `}
                    >
                      <span className="font-bold font-serif italic text-lg leading-none">x</span>
                    </div>
                    <div className="flex-1 mt-1 md:mt-2">
                       <span className={`block font-bold text-lg md:text-xl leading-tight ${isChecked ? 'text-black' : 'text-[var(--color-editorial-text)]'}`}>
                        {item.text}
                      </span>
                      {item.optional && (
                        <span className="text-[10px] text-[var(--color-editorial-muted)] uppercase tracking-widest font-bold mt-2 block">Optional</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-8 border-t border-dashed border-[#E5E2DE] flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
              disabled={currentStepIndex === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStepIndex < flow.steps.length - 1 ? (
              <Button 
                onClick={() => setCurrentStepIndex(currentStepIndex + 1)}
                disabled={!isStepComplete}
              >
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={() => alert("Flow complete!")}
                disabled={!isStepComplete}
              >
                Finish Flow
                <CheckCircle2 className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
