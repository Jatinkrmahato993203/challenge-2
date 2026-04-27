import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockFlows } from '../data/mock';
import { useStore } from '../store/useStore';
import { Layout } from '../components/Layout';
import { CheckCircle2, ArrowRight, ArrowLeft, RotateCcw, Check, Sparkles, Copy } from 'lucide-react';
import { Button } from '../components/ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { translations } from '../data/i18n';

export function WizardPage() {
  const { flowId } = useParams();
  const flow = mockFlows[flowId || ''];
  const { flowProgress, toggleChecklistItem, resetFlowProgress, language } = useStore();
  const t = translations[language];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showNextWarning, setShowNextWarning] = useState(false);
  const [hasToastedSave, setHasToastedSave] = useState(false);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (stepHeadingRef.current && !isFinished) {
      stepHeadingRef.current.focus();
    }
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

  const handleShare = async () => {
    const title = (t.flowContent as any)?.[flow.id]?.title || flow.title;
    const summary = typeof t.shareSummary === 'function' ? t.shareSummary(totalCompleted, flow.steps.length, title) : `I completed ${totalCompleted}/${flow.steps.length} steps for '${title}' on Civic Guide.`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Civic Guide Progress',
          text: summary,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing', err);
      }
    } else {
      await navigator.clipboard.writeText(summary);
      toast.success('Porgress summary copied to clipboard!');
    }
  };

  const handleToggle = (flowId: string, itemId: string) => {
      toggleChecklistItem(flowId, itemId);
      if (!hasToastedSave) {
          toast('Progress saved to your device');
          setHasToastedSave(true);
      }
  };

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
           <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tighter text-[var(--color-editorial-text)] mb-4">
             {t.completedGuideTitle}
           </h1>
           <p className="text-[var(--color-editorial-muted)] text-lg mb-10 max-w-lg mx-auto leading-relaxed">
             {t.completedGuideText((t.flowContent as any)?.[flow.id]?.title || flow.title)}
           </p>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <Button onClick={handleShare} variant="outline" size="lg">
                <Copy className="w-4 h-4 mr-2" /> {t.copySummary}
             </Button>
             <Button asChild size="lg">
               <Link to="/flows">{t.backToActions}</Link>
             </Button>
             <Button variant="outline" size="lg" onClick={() => { resetFlowProgress(flow.id); setIsFinished(false); setCurrentStepIndex(0); }}>
               <RotateCcw className="w-4 h-4 mr-2" /> {t.startOver}
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
      toast.success("Step complete! Moving to next step.");
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
          <ArrowLeft className="w-3 h-3 mr-2" /> {t.backToActions}
        </Link>

        <div className="mb-8 flex items-baseline justify-between border-b border-[var(--color-editorial-border)] pb-8 overflow-hidden">
          <div>
            <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tighter text-[var(--color-editorial-text)]">
              Step {String(currentStepIndex + 1).padStart(2, '0')}
            </h1>
            <p className="uppercase text-xs tracking-widest font-bold text-[var(--color-editorial-muted)] mt-4">
              {(t.flowContent as any)?.[flow.id]?.title || flow.title}
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-[10px] text-[var(--color-editorial-muted)] block mb-2 uppercase tracking-widest font-bold">{t.progress}</span>
            <div className="w-32 md:w-48 h-1 bg-[var(--color-editorial-border)] overflow-hidden">
              <motion.div 
                className="h-full bg-[var(--color-editorial-text)] origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: overallProgress / 100 }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-[10px] text-[var(--color-editorial-muted)] block mt-2 font-mono">
              {Math.round(overallProgress)}% {t.progress}
            </span>
          </div>
        </div>

        <div className="bg-transparent" aria-live="polite">
          {/* Step Header */}
          <div className="mb-4">
            <h2 ref={stepHeadingRef} tabIndex={-1} className="text-3xl md:text-4xl font-serif mb-4 leading-snug focus-visible:outline-none focus:ring-2 focus:ring-[var(--color-editorial-text)] focus:ring-offset-2">{(t.flowContent as any)?.[flow.id]?.[`step${currentStepIndex + 1}`]?.title || step.title}</h2>
            <p className="text-sm md:text-base text-[var(--color-editorial-muted)] leading-relaxed max-w-2xl">{(t.flowContent as any)?.[flow.id]?.[`step${currentStepIndex + 1}`]?.desc || step.description}</p>
          </div>

          {/* Step Tracker (● ○ ○) */}
          <div className="flex items-center gap-2 mb-8 mt-2">
            {flow.steps.map((s, idx) => {
               const idxComplete = s.checklistItems.filter(i => !i.optional).every(i => progress[i.id]);
               return (
                 <div key={s.id} className="flex flex-col gap-1 items-center">
                   <div className={`w-2 h-2 rounded-full ${idx === currentStepIndex ? 'bg-[var(--color-editorial-text)] ring-2 ring-[var(--color-editorial-text)] ring-offset-2 ring-offset-[var(--color-editorial-bg)]' : idxComplete ? 'bg-green-600' : 'bg-[var(--color-editorial-border)]'}`} />
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
                    onClick={() => handleToggle(flow.id, item.id)}
                    className={`w-full flex items-start text-left p-6 border-2 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-editorial-text)] focus-visible:ring-offset-1
                      ${isChecked ? 'border-[var(--color-editorial-text)] bg-[var(--color-editorial-bg-alt)]' : 'border-[var(--color-editorial-border)] bg-transparent hover:border-[var(--color-editorial-text)]'}
                    `}
                  >
                    <div className={`w-8 h-8 md:w-10 md:h-10 border shrink-0 flex items-center justify-center mr-6 rounded-full
                        ${isChecked ? 'border-green-600 bg-green-500/10 text-green-600' : 'border-[var(--color-editorial-border)] text-transparent hover:border-[var(--color-editorial-text)]'}
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
                       <span className={`block font-bold text-lg md:text-xl leading-tight ${isChecked ? 'text-[var(--color-editorial-text)]' : 'text-[var(--color-editorial-text)]'}`}>
                        {(t.flowContent as any)?.[flow.id]?.items?.[item.id] || item.text}
                      </span>
                      {item.optional && (
                        <span className="text-[10px] text-[var(--color-editorial-muted)] uppercase tracking-widest font-bold mt-2 block">{(t as any).optional}</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-8 border-t border-dashed border-[var(--color-editorial-border)] flex flex-col sm:flex-row items-center justify-between gap-4 relative">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
              disabled={currentStepIndex === 0}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.previous}
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
                     {t.requiredTasksPending}
                   </motion.div>
                 )}
               </AnimatePresence>
              <Button 
                onClick={handleNext}
                className={`w-full sm:w-auto ${!isStepComplete && 'opacity-60 hover:opacity-80'}`}
              >
                {currentStepIndex < flow.steps.length - 1 ? (
                  <>{t.nextStep} <ArrowRight className="w-4 h-4 ml-2" /></>
                ) : (
                  <>{t.finishFlow} <CheckCircle2 className="w-4 h-4 ml-2" /></>
                )}
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center sm:text-right">
             <button onClick={() => resetFlowProgress(flow.id)} className="text-[10px] text-[var(--color-editorial-muted)] uppercase tracking-widest font-bold underline underline-offset-4 hover:text-[var(--color-editorial-text)]">
               {t.resetProgress}
             </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
