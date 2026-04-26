import { format, parseISO } from 'date-fns';
import { ElectionEvent } from '../types';
import { CalendarDays, AlertCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

function HighlightedText({ text, highlight }: { text: string; highlight: string }) {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${highlight})`, 'i');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) => 
        part.toLowerCase() === highlight.toLowerCase() ? <mark key={i} className="bg-yellow-200 text-black px-0.5 rounded-sm">{part}</mark> : <span key={i}>{part}</span>
      )}
    </span>
  );
}

export function EventCard({ event, isUpcoming, isPast }: { event: ElectionEvent; isUpcoming?: boolean; isPast?: boolean }) {
  const isDeadline = event.type === 'deadline' || event.type === 'registration';
  const start = parseISO(event.startDate);
  const { searchQuery } = useStore();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative bg-transparent p-0 transition-opacity duration-300
        ${isPast ? 'opacity-50 hover:opacity-75' : 'opacity-100'}
      `}
    >
      <div className="flex flex-col gap-1">
        {isPast ? (
           <p className="text-[10px] uppercase font-bold text-gray-500 mb-0.5 tracking-wider">Passed</p>
        ) : isUpcoming ? (
           <p className="text-[10px] uppercase font-bold text-red-600 mb-0.5 tracking-wider">Active / Upcoming</p>
        ) : null}
        
        <h3 className="font-bold text-lg md:text-xl leading-tight mb-1 text-[var(--color-editorial-text)]">
          <HighlightedText text={event.title} highlight={searchQuery} />
        </h3>
        <p className="text-xs md:text-sm text-[var(--color-editorial-muted)] max-w-xl leading-relaxed mb-1">
          <HighlightedText text={event.description} highlight={searchQuery} />
        </p>
        <p className="text-[10px] md:text-xs mt-1 font-mono text-[var(--color-editorial-muted)] uppercase">
          {format(start, 'MMM dd, yyyy')} {event.endDate && `— ${format(parseISO(event.endDate), 'MMM dd, yyyy')}`}
        </p>

        {(event.actions.length > 0 || event.sources.length > 0) && (
          <div className="pt-4 mt-2 flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <div className="flex gap-2 flex-wrap">
              {event.actions.map(action => (
                action.flowId ? (
                  <Button key={action.id} asChild variant={action.required ? "default" : "outline"} size="sm">
                    <Link to={`/flows/${action.flowId}`}>
                      {action.title}
                    </Link>
                  </Button>
                ) : action.resources.length > 0 ? (
                  <Button key={action.id} asChild variant={action.required ? "default" : "outline"} size="sm" title="Opens in new tab" aria-label={`Opens ${action.title} in new tab`}>
                    <a href={action.resources[0]?.url} target="_blank" rel="noopener noreferrer">
                      {action.title}
                      <ExternalLink className="w-3 h-3 ml-2" />
                    </a>
                  </Button>
                ) : null
              ))}
            </div>

            {event.sources.length > 0 && (
              <div className="text-[10px] text-[var(--color-editorial-muted)] italic font-serif flex items-center gap-1">
                Source: <a href={event.sources[0].url} className="font-bold text-[#1A1A1A] border-b border-dotted border-black hover:text-black" target="_blank" rel="noreferrer" title="Opens in new tab" aria-label={`Source: ${event.sources[0].name}, opens in new tab`}>{event.sources[0].name}</a>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
