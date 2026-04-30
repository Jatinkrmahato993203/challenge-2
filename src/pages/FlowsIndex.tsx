import { mockFlows } from '../data/mock';
import { Layout } from '../components/Layout';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { translations } from '../data/i18n';
import { motion } from 'motion/react';

export function FlowsIndex() {
  const { flowProgress, language } = useStore();
  const t = translations[language];

  return (
    <Layout>
      <div className="mb-8">
        <h2 className="font-serif italic text-4xl md:text-5xl mb-6 leading-tight">
          Guided Actions
        </h2>
        <p className="text-sm font-medium text-[var(--color-editorial-muted)] max-w-2xl mb-8 uppercase tracking-widest">
          Step-by-step wizards to help you complete necessary election actions smoothly and correctly.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {Object.values(mockFlows).map((flow, index) => {
          const progress = flowProgress[flow.id] || {};
          const totalCompleted = flow.steps.reduce((acc, s) => {
            const sComplete = s.checklistItems.filter(i => !i.optional).every(i => progress[i.id]);
            return acc + (sComplete ? 1 : 0);
          }, 0);
          const percent = Math.round((totalCompleted / flow.steps.length) * 100);
          const isComplete = percent === 100;

          return (
            <motion.div
              key={flow.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                to={`/flows/${flow.id}`}
                className="group border border-[var(--color-editorial-border)] p-6 hover:border-[var(--color-editorial-text)] cursor-pointer transition-all duration-300 flex flex-col bg-transparent relative overflow-hidden h-full hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-10 h-10 border border-[var(--color-editorial-border)] group-hover:border-[var(--color-editorial-text)] flex items-center justify-center mb-6 transition-colors">
                   <span className="font-serif italic text-lg text-[var(--color-editorial-muted)] group-hover:text-[var(--color-editorial-text)]">{flow.title.charAt(0)}</span>
                </div>
                
                <div className="flex items-start justify-between absolute top-6 right-6">
                  {isComplete && (
                    <span className="text-[10px] uppercase font-bold tracking-tighter bg-green-100 text-green-800 px-2 py-1">
                      Complete
                    </span>
                  )}
                </div>
                
                <h3 className="font-bold text-xl mb-2 text-[var(--color-editorial-text)]">
                  {(t.flowContent as any)?.[flow.id]?.title || flow.title}
                </h3>
                <p className="text-xs text-[var(--color-editorial-muted)] mb-6 flex-1 leading-relaxed">
                  {totalCompleted} / {flow.steps.length} steps completed.
                </p>

                <div className="mt-auto border-t border-[var(--color-editorial-border)] pt-4 transition-colors group-hover:border-[var(--color-editorial-text)]">
                  <div className="flex justify-between text-[10px] font-bold text-[var(--color-editorial-muted)] uppercase tracking-widest mb-2 group-hover:text-[var(--color-editorial-text)]">
                    <span>Progress</span>
                    <span>{percent}%</span>
                  </div>
                  <div className="h-1 w-full bg-[var(--color-editorial-border)] overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ease-out ${isComplete ? 'bg-green-600' : 'bg-[var(--color-editorial-text)]'}`} 
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </Layout>
  );
}
