import { mockEvents, mockJurisdictions } from '../data/mock';
import { EventCard } from '../components/EventCard';
import { useStore } from '../store/useStore';
import { Input } from '../components/ui/input';
import { Search } from 'lucide-react';
import { isAfter, parseISO } from 'date-fns';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/button';

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

  return (
    <Layout>
      <div className="mb-8">
        <h2 className="font-serif italic text-4xl md:text-5xl mb-6 leading-tight">
          Electoral<br className="hidden md:block" /> Milestones
        </h2>
        <p className="text-sm font-medium text-[var(--color-editorial-muted)] max-w-2xl mb-8 uppercase tracking-widest">
          Stay informed about important election dates and actionable steps.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <Input 
              icon={<Search className="w-4 h-4" />}
              className="rounded-none border-black focus-visible:ring-black"
              placeholder="Search events, deadlines..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="md:w-64">
            <select 
              className="flex h-10 w-full rounded-none border border-black bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black uppercase tracking-widest font-bold text-[10px]"
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
      </div>

      <div className="relative ml-2 space-y-0">
        {/* Continuous timeline line */}
        <div className="absolute top-2 bottom-0 left-[3px] w-[1px] bg-black" />
        
        {filteredEvents.map((event, index) => {
          const isUpcoming = index === upcomingDeadlineIndex;
          const isPast = !isAfter(parseISO(event.startDate), now);
          return (
            <div key={event.id} className="relative pl-6 md:pl-10 pb-8 md:pb-12">
              {/* Timeline dot */}
              <div className={`absolute top-2 -left-[2px] z-10
                ${isUpcoming ? 'w-3 h-3 rounded-full border-2 border-black bg-[var(--color-editorial-bg)] -left-[4px]' : 'w-2 h-2 rounded-full bg-black'}
                ${isPast ? 'opacity-40 bg-[var(--color-editorial-muted)]' : ''}
              `} />
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
