import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Search, List, Info, ChevronRight, Languages, Type } from 'lucide-react';
import { cn } from '../lib/utils';
import { mockEvents } from '../data/mock';
import { isAfter, parseISO, differenceInDays } from 'date-fns';
import { useStore } from '../store/useStore';
import { Toaster } from 'sonner';
import { translations } from '../data/i18n';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { selectedJurisdiction, language, setLanguage, simpleMode, toggleSimpleMode } = useStore();
  const t = translations[language];

  useEffect(() => {
    if (simpleMode) {
      document.documentElement.style.setProperty('--font-sans', 'system-ui, sans-serif');
      document.documentElement.style.fontSize = '18px';
    } else {
      document.documentElement.style.removeProperty('--font-sans');
      document.documentElement.style.fontSize = '16px';
    }
  }, [simpleMode]);

  const navItems = [
    { name: t.timeline, path: '/', icon: Calendar },
    { name: t.guidedActions, path: '/flows', icon: List },
    { name: t.about, path: '/about', icon: Info },
  ];

  const now = new Date();
  const upcomingDeadline = mockEvents
    .filter(e => selectedJurisdiction === 'all' || e.jurisdiction === selectedJurisdiction || e.jurisdiction === 'in-nat')
    .filter(e => (e.type === 'deadline' || e.type === 'registration') && isAfter(parseISO(e.startDate), now))
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())[0];
  
  let statusText = t.noUpcoming;
  if (upcomingDeadline) {
    const days = differenceInDays(parseISO(upcomingDeadline.startDate), now);
    statusText = `${upcomingDeadline.title} — ${days === 0 ? t.today : days === 1 ? t.tomorrow : t.inDays(days)}`;
  }

  return (
    <div className={cn("min-h-screen bg-[var(--color-editorial-bg)] flex flex-col font-sans text-editorial-text border-x-8 border-[var(--color-editorial-bg)] max-w-[1200px] mx-auto shadow-sm relative overflow-hidden", simpleMode && "text-lg")}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-[var(--color-editorial-bg)] focus:text-[var(--color-editorial-text)] border-2 border-[var(--color-editorial-text)]">Skip to content</a>
      <Toaster position="top-right" richColors />
      <header className="h-16 border-b border-[var(--color-editorial-border)] px-4 md:px-8 flex items-center justify-between bg-[var(--color-editorial-bg)] sticky top-0 z-30">
        <Link to="/" className="flex items-center space-x-3">
           <div className="w-8 h-8 bg-[var(--color-editorial-text)] flex items-center justify-center shrink-0">
             <span className="text-[var(--color-editorial-bg)] font-serif text-xl italic leading-none pt-1">v</span>
           </div>
           <h1 className="uppercase tracking-[0.2em] font-bold text-xs hidden sm:block">{t.title} <span className="font-normal opacity-50">/ 2026</span></h1>
        </Link>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-6 text-[10px] uppercase tracking-wider font-semibold">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "hover:text-blue-600 transition-colors",
                    isActive ? "underline underline-offset-4" : "text-[var(--color-editorial-text)]"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-4 border-l pl-6 border-[var(--color-editorial-border)]">
             <button onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')} className="text-[10px] uppercase font-bold flex items-center gap-1 hover:opacity-70" title="Toggle Language">
                <Languages className="w-4 h-4" /> <span className="hidden sm:inline">{t.language}</span>
             </button>
             <button onClick={toggleSimpleMode} className="text-[10px] uppercase font-bold flex items-center gap-1 hover:opacity-70" title="Toggle Simple Mode">
                <Type className="w-4 h-4" /> <span className="hidden sm:inline">{t.simpleMode}</span>
             </button>
          </div>
        </div>
      </header>

      {/* Sub-Header: Global Status */}
      <div className="h-12 bg-[var(--color-editorial-bg-alt)] border-b border-[var(--color-editorial-border)] flex items-center px-4 md:px-8 overflow-hidden whitespace-nowrap">
        <div className="flex items-center space-x-2 w-full" aria-live="polite" aria-atomic="true">
          <span className="w-2 h-2 rounded-full bg-red-600 shrink-0"></span>
          <p className="text-xs font-medium uppercase tracking-tight truncate w-full">{t.status}: <span className="font-bold">{statusText}</span></p>
        </div>
      </div>

      <main id="main-content" className="flex-1 w-full px-4 md:px-8 py-8 md:py-12 pb-24 md:pb-12">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-editorial-bg)] border-t border-[var(--color-editorial-border)] z-30 pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
               <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full text-[10px] uppercase tracking-wider font-bold gap-1 transition-colors rounded-lg mx-1",
                  isActive ? "text-[var(--color-editorial-text)] bg-[var(--color-editorial-bg-alt)]" : "text-[var(--color-editorial-muted)] hover:text-[var(--color-editorial-text)] hover:bg-[var(--color-editorial-bg-alt)]"
                )}
              >
                <div className="relative">
                  <Icon className={cn("w-4 h-4", isActive ? "stroke-[2.5px]" : "stroke-2")} />
                  {isActive && <span className="absolute -top-1 -right-1.5 w-1.5 h-1.5 bg-[var(--color-editorial-text)] rounded-full" />}
                </div>
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
