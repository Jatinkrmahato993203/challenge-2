import React, { Suspense, useState, useEffect } from 'react';
import { mockEvents, mockJurisdictions } from '../data/mock';
import { EventCard } from '../components/EventCard';
import { useStore } from '../store/useStore';
import { Input } from '../components/ui/input';
import { Search, MapPin, CheckCircle, Users, FileText, Printer } from 'lucide-react';
import { isAfter, parseISO, formatDistanceToNow } from 'date-fns';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/button';
import { motion, AnimatePresence } from 'motion/react';
import CountUp from 'react-countup';

const PollingStationMap = React.lazy(() => import('../components/PollingStationMap').then(m => ({ default: m.PollingStationMap })));

const TypewriterText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDone, setIsDone] = useState(false);
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
        setIsDone(true);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayText}{!isDone && <span className="animate-pulse">|</span>}</span>;
};

export function Home() {
  const { searchQuery, setSearchQuery, selectedJurisdiction, setSelectedJurisdiction } = useStore();

  const filteredEvents = mockEvents
    .filter(e => selectedJurisdiction === 'all' || e.jurisdiction === selectedJurisdiction || e.jurisdiction === 'in-nat')
    .filter(e => 
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      e.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  const now = new Date();
  
  // Find next upcoming deadline
  const upcomingDeadlineIndex = filteredEvents.findIndex(
    e => (e.type === 'deadline' || e.type === 'registration') && isAfter(parseISO(e.startDate), now)
  );

  const upcomingEventsTicker = mockEvents
    .filter(e => isAfter(parseISO(e.startDate), now))
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 5);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Layout>
      {/* Marquee Ticker */}
      {upcomingEventsTicker.length > 0 && (
        <div className="w-full bg-[var(--color-editorial-text)] text-[var(--color-editorial-bg)] overflow-hidden mb-8 -mx-4 md:-mx-8 px-4 md:px-8 flex items-center print:hidden">
          <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite] py-2 items-center text-xs font-bold uppercase tracking-widest gap-8">
            {upcomingEventsTicker.map((event, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span>{event.title}</span>
                <span className="opacity-50">—</span>
                <span className="opacity-75">{formatDistanceToNow(parseISO(event.startDate), { addSuffix: true })}</span>
              </span>
            ))}
             {upcomingEventsTicker.map((event, i) => (
              <span key={`dup-${i}`} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span>{event.title}</span>
                <span className="opacity-50">—</span>
                <span className="opacity-75">{formatDistanceToNow(parseISO(event.startDate), { addSuffix: true })}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="flex justify-between items-start mb-6">
          <h2 className="font-serif italic text-4xl md:text-5xl leading-tight min-h-[120px] md:min-h-[100px]">
            <TypewriterText text="Electoral Milestones" />
          </h2>
          <Button variant="outline" size="sm" onClick={handlePrint} className="hidden md:flex gap-2 print:hidden">
            <Printer className="w-4 h-4" /> Print Timeline
          </Button>
        </div>
        <p className="text-sm font-medium text-[var(--color-editorial-muted)] max-w-2xl mb-8 uppercase tracking-widest">
          Stay informed about important election dates and actionable steps.
        </p>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 border-y border-[var(--color-editorial-border)] py-8 print:hidden">
          <div className="text-center">
            <Users className="w-5 h-5 mx-auto mb-2 text-[var(--color-editorial-muted)]" />
            <div className="text-3xl font-serif font-bold text-[var(--color-editorial-text)]">
              <CountUp end={96} duration={2.5} suffix="Cr+" enableScrollSpy scrollSpyOnce />
            </div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-editorial-muted)] mt-1">Eligible Voters</div>
          </div>
          <div className="text-center">
            <MapPin className="w-5 h-5 mx-auto mb-2 text-[var(--color-editorial-muted)]" />
            <div className="text-3xl font-serif font-bold text-[var(--color-editorial-text)]">
              <CountUp end={10.5} decimals={1} duration={2.5} suffix="L+" enableScrollSpy scrollSpyOnce />
            </div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-editorial-muted)] mt-1">Polling Stations</div>
          </div>
          <div className="text-center">
             <FileText className="w-5 h-5 mx-auto mb-2 text-[var(--color-editorial-muted)]" />
             <div className="text-3xl font-serif font-bold text-[var(--color-editorial-text)]">
              <CountUp end={543} duration={2.5} enableScrollSpy scrollSpyOnce />
             </div>
             <div className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-editorial-muted)] mt-1">Constituencies</div>
          </div>
          <div className="text-center">
             <CheckCircle className="w-5 h-5 mx-auto mb-2 text-[var(--color-editorial-muted)]" />
             <div className="text-3xl font-serif font-bold text-[var(--color-editorial-text)]">
              <CountUp end={100} duration={2.5} suffix="%" enableScrollSpy scrollSpyOnce />
             </div>
             <div className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-editorial-muted)] mt-1">Verified EVMs</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4 print:hidden">
          <div className="flex-1">
            <Input 
              icon={<Search className="w-4 h-4" />}
              className="rounded-none border-[var(--color-editorial-border)] focus-visible:ring-[var(--color-editorial-text)]"
              placeholder="Search events, deadlines..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="md:w-64">
            <select 
              className="flex h-10 w-full rounded-none border border-[var(--color-editorial-border)] bg-[var(--color-editorial-bg)] text-[var(--color-editorial-text)] px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-editorial-text)] uppercase tracking-widest font-bold text-[10px]"
              value={selectedJurisdiction}
              onChange={(e) => setSelectedJurisdiction(e.target.value)}
              aria-label="Filter by Jurisdiction"
            >
              <option value="all">ALL JURISDICTIONS</option>
              {mockJurisdictions.map(j => (
                <option key={j.id} value={j.id}>{j.name.toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-12 print:hidden">
          <h3 className="font-serif text-2xl font-bold mb-4 text-[var(--color-editorial-text)] flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Find Your Polling Station
          </h3>
          <Suspense fallback={<div className="w-full h-[400px] bg-[var(--color-editorial-bg-alt)] border border-[var(--color-editorial-border)] animate-pulse rounded-lg" />}>
            <PollingStationMap jurisdiction={selectedJurisdiction} jurisdictionName={mockJurisdictions.find(j => j.id === selectedJurisdiction)?.name} />
          </Suspense>
        </div>
      </div>

      <div className="relative ml-2 space-y-0">
        {/* Continuous timeline line */}
        <div className="absolute top-2 bottom-0 left-[3px] w-[1px] bg-[var(--color-editorial-border)]" />
        
        {filteredEvents.map((event, index) => {
          const isUpcoming = index === upcomingDeadlineIndex;
          const isPast = !isAfter(parseISO(event.startDate), now);
          
          let dotColorClass = 'bg-blue-500';
          if (event.type === 'deadline') dotColorClass = 'bg-red-500';
          if (event.type === 'election-day') dotColorClass = 'bg-green-500';
          
          return (
            <div key={event.id} className="relative pl-6 md:pl-10 pb-8 md:pb-12 group event-card">
              {/* Timeline dot */}
              <div className={`absolute top-2 -left-[2px] z-10 transition-transform duration-300 group-hover:scale-150 print:hidden
                ${isUpcoming ? `w-3 h-3 rounded-full border-2 border-current ${dotColorClass} -left-[4px]` : `w-2 h-2 rounded-full ${dotColorClass}`}
                ${isPast ? 'opacity-40 saturate-0' : 'shadow-sm'}
              `} />
              <div className="hidden print:block absolute top-2 -left-[2px] z-10 w-2 h-2 rounded-full bg-black" />
              <EventCard event={event} isUpcoming={isUpcoming} isPast={isPast} />
            </div>
          );
        })}
        {filteredEvents.length === 0 && (
          <div className="text-center py-16 text-[var(--color-editorial-muted)] border-2 border-dashed border-[var(--color-editorial-border)] p-8 mt-4 bg-[var(--color-editorial-bg-alt)] relative z-20 mx-4 md:ml-10">
            <div className="mx-auto w-12 h-12 border border-[var(--color-editorial-border)] rounded-full flex items-center justify-center mb-4">
              <Search className="w-5 h-5 text-[var(--color-editorial-muted)]" />
            </div>
            <p className="text-lg font-serif mb-2 text-[var(--color-editorial-text)]">No events found matching your criteria.</p>
            <p className="text-xs mb-6 max-w-sm mx-auto leading-relaxed">Try adjusting your filters or clearing your search to see all upcoming deadlines and events.</p>
            <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedJurisdiction('all'); }}>Clear Search</Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
