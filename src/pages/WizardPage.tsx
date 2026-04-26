import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockFlows } from '../data/mock';
import { useStore } from '../store/useStore';
import { Layout } from '../components/Layout';
import { CheckCircle2, ArrowRight, ArrowLeft, RotateCcw, Check, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

export function WizardPage() {
  const { flowId } = useParams();
  const flow = mockFlows[flowId || ''];
  const { flowProgress, toggleChecklistItem, resetFlowProgress } = useStore();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showNextWarning, setShowNextWarning] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStepIndex, isFinished]);

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

  const progress = flowProgress[flow.id] || {};
  
  const totalCompleted = flow.steps.reduce((acc, s) => {
    const sComplete = s.checklistItems.filter(i => !i.optional).every(i => progress[i.id]);
    return acc + (sComplete ? 1 : 0);
  }, 0);
  const overallProgress = (totalCompleted / flow.steps.length) * 100;

  if (isFinished) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto py-16 text-center">
           <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-green-200">
             <motion.div
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ type: 'spring', stiffness: 200, damping: 10 }}
             >
               <Sparkles className="w-10 h-10 text-green-600" />
             </motion.div>
           </div>
           <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tighter text-[#1A1A1A] mb-4">
             You've completed this guide!
           </h1>
           <p className="text-[var(--color-editorial-muted)] text-lg mb-10 max-w-lg mx-auto leading-relaxed">
             Great job. You've successfully completed all the steps for <strong>{flow.title}</strong>. Make sure you've also checked off any official forms if required.
           </p>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <Button asChild size="lg">
               <Link to="/flows">Back to Guided Actions</Link>
             </Button>
             <Button variant="outline" size="lg" onClick={() => { resetFlowProgress(flow.id); setIsFinished(false); setCurrentStepIndex(0); }}>
               <RotateCcw className="w-4 h-4 mr-2" /> Start Over
             </Button>
           </div>
        </div>
      </Layout>
    );
  }

  const step = flow.steps[currentStepIndex];
  
  const stepItems = step.checklistItems;
  const completedItems = stepItems.filter(item => progress[item.id]).length;
  const isStepComplete = stepItems.filter(i => !i.optional).every(i => progress[i.id]);

  const handleNext = () => {
    if (!isStepComplete) {
      setShowNextWarning(true);
      setTimeout(() => setShowNextWarning(false), 3000);
      return;
    }
    if (currentStepIndex < flow.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-4 md:py-8">
        {/* Breadcrumb */}
        <Link to="/flows" className="inline-flex items-center text-[10px] uppercase font-bold text-[var(--color-editorial-muted)] hover:text-black tracking-widest mb-8 transition-colors">
          <ArrowLeft className="w-3 h-3 mr-2" /> Back to Guided Actions
        </Link>

        <div className="mb-8 flex items-baseline justify-between border-b border-[var(--color-editorial-border)] pb-8 overflow-hidden">
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
          <div className="mb-4">
            <h2 className="text-3xl md:text-4xl font-serif mb-4 leading-snug">{step.title}</h2>
            <p className="text-sm md:text-base text-[var(--color-editorial-muted)] leading-relaxed max-w-2xl">{step.description}</p>
          </div>

          {/* Step Tracker (● ○ ○) */}
          <div className="flex items-center gap-2 mb-8 mt-2">
            {flow.steps.map((s, idx) => {
               const idxComplete = s.checklistItems.filter(i => !i.optional).every(i => progress[i.id]);
               return (
                 <div key={s.id} className="flex flex-col gap-1 items-center">
                   <div className={`w-2 h-2 rounded-full ${idx === currentStepIndex ? 'bg-black ring-2 ring-black ring-offset-2 ring-offset-[var(--color-editorial-bg)]' : idxComplete ? 'bg-green-600' : 'bg-[#E5E2DE]'}`} />
                 </div>
               )
            })}
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
                    className={`w-full flex items-start text-left p-6 border-2 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1
                      ${isChecked ? 'border-black bg-[#FDFCFB]' : 'border-[var(--color-editorial-border)] bg-transparent hover:border-black'}
                    `}
                  >
                    <div className={`w-8 h-8 md:w-10 md:h-10 border shrink-0 flex items-center justify-center mr-6 rounded-full
                        ${isChecked ? 'border-green-600 bg-green-50 text-green-600' : 'border-[#E5E2DE] text-transparent hover:border-black'}
                      `}
                    >
                      <motion.div
                         initial={false}
                         animate={{ scale: isChecked ? 1 : 0.5, opacity: isChecked ? 1 : 0 }}
                         transition={{ duration: 0.2 }}
                      >
                       <Check className="w-5 h-5 stroke-[3px]" />
                      </motion.div>
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

          <div className="pt-8 border-t border-dashed border-[#E5E2DE] flex flex-col sm:flex-row items-center justify-between gap-4 relative">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
              disabled={currentStepIndex === 0}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center gap-2 w-full sm:w-auto relative">
               <AnimatePresence>
                 {showNextWarning && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10 }} 
                     animate={{ opacity: 1, y: 0 }} 
                     exit={{ opacity: 0 }}
                     className="text-[10px] uppercase font-bold text-red-600 tracking-widest text-center absolute -top-8 left-0 right-0 bg-red-50 p-1"
                   >
                     * Required tasks pending
                   </motion.div>
                 )}
               </AnimatePresence>
              <Button 
                onClick={handleNext}
                className={`w-full sm:w-auto ${!isStepComplete && 'opacity-60 hover:opacity-80'}`}
              >
                {currentStepIndex < flow.steps.length - 1 ? (
                  <>Next Step <ArrowRight className="w-4 h-4 ml-2" /></>
                ) : (
                  <>Finish Flow <CheckCircle2 className="w-4 h-4 ml-2" /></>
                )}
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center sm:text-right">
             <button onClick={() => resetFlowProgress(flow.id)} className="text-[10px] text-[var(--color-editorial-muted)] uppercase tracking-widest font-bold underline underline-offset-4 hover:text-black">
               Reset Progress
             </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
