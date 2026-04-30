import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Search, List, Info, ChevronRight, Languages, Type, Moon, Sun, ArrowUp, WifiOff, Keyboard } from 'lucide-react';
import { cn } from '../lib/utils';
import { mockEvents } from '../data/mock';
import { isAfter, parseISO, differenceInDays } from 'date-fns';
import { useStore } from '../store/useStore';
import { Toaster, toast } from 'sonner';
import { translations } from '../data/i18n';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from './ui/button';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { selectedJurisdiction, language, setLanguage, simpleMode, toggleSimpleMode, darkMode, toggleDarkMode } = useStore();
  const t = translations[language];
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showShortcuts, setShowShortcuts] = useState(false);

  useEffect(() => {
    if (simpleMode) {
      document.documentElement.style.setProperty('--font-sans', 'system-ui, sans-serif');
      document.documentElement.style.fontSize = '18px';
    } else {
      document.documentElement.style.removeProperty('--font-sans');
      document.documentElement.style.fontSize = '16px';
    }
  }, [simpleMode]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '?' && !e.ctrlKey && !e.metaKey && e.target instanceof HTMLElement && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        setShowShortcuts(prev => !prev);
      }
      if (e.key === 'd' && !e.ctrlKey && !e.metaKey && e.target instanceof HTMLElement && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        toggleDarkMode();
      }
      if (e.key === 's' && !e.ctrlKey && !e.metaKey && e.target instanceof HTMLElement && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        toggleSimpleMode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleDarkMode, toggleSimpleMode]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      <Toaster position="top-right" richColors theme={darkMode ? 'dark' : 'light'} />
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
             <button onClick={() => {
                const updatedLanguage = language === 'en' ? 'hi' : 'en';
                setLanguage(updatedLanguage);
                if (typeof window !== 'undefined' && 'gtag' in window) {
                  (window as any).gtag('event', 'language_switch', { language: updatedLanguage });
                }
             }} className="text-[10px] uppercase font-bold flex items-center gap-1 hover:opacity-70" title="Toggle Language">
                <Languages className="w-4 h-4" /> <span className="hidden sm:inline">{t.language}</span>
             </button>
             <button onClick={toggleSimpleMode} className="text-[10px] uppercase font-bold flex items-center gap-1 hover:opacity-70" title="Toggle Simple Mode ('s')">
                <Type className="w-4 h-4" /> <span className="hidden sm:inline">{t.simpleMode}</span>
             </button>
             <button onClick={toggleDarkMode} className="text-[10px] uppercase font-bold flex items-center gap-1 hover:opacity-70" title="Toggle Dark Mode ('d')">
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
             </button>
          </div>
        </div>
      </header>

      {/* Sub-Header: Global Status & Offline */}
      <div className="flex flex-col">
        <AnimatePresence>
          {isOffline && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-yellow-100 text-yellow-800 text-xs font-bold uppercase tracking-widest px-4 py-2 flex items-center justify-center gap-2"
            >
               <WifiOff className="w-4 h-4" /> You are currently offline. Some features may be unavailable.
            </motion.div>
          )}
        </AnimatePresence>
        <div className="h-12 bg-[var(--color-editorial-bg-alt)] border-b border-[var(--color-editorial-border)] flex items-center px-4 md:px-8 overflow-hidden whitespace-nowrap">
          <div className="flex items-center space-x-2 w-full" aria-live="polite" aria-atomic="true">
            <span className="w-2 h-2 rounded-full bg-red-600 shrink-0"></span>
            <p className="text-xs font-medium uppercase tracking-tight truncate w-full">{t.status}: <span className="font-bold">{statusText}</span></p>
          </div>
        </div>
      </div>

      <main id="main-content" className="flex-1 w-full px-4 md:px-8 py-8 md:py-12 pb-24 md:pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Keyboard Shortcuts Modal */}
      <AnimatePresence>
        {showShortcuts && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowShortcuts(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--color-editorial-bg)] border border-[var(--color-editorial-border)] p-6 max-w-sm w-full rounded-lg shadow-xl"
            >
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--color-editorial-border)]">
                 <h3 className="font-serif font-bold text-xl flex items-center gap-2"><Keyboard className="w-5 h-5"/> Keyboard Shortcuts</h3>
                 <Button variant="ghost" size="icon" onClick={() => setShowShortcuts(false)}>X</Button>
              </div>
              <ul className="space-y-3">
                <li className="flex justify-between items-center text-sm">
                  <span>Toggle Shortcuts</span>
                  <kbd className="bg-[var(--color-editorial-bg-alt)] border border-[var(--color-editorial-border)] rounded px-2 py-1 text-xs font-mono font-bold">?</kbd>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span>Toggle Dark Mode</span>
                  <kbd className="bg-[var(--color-editorial-bg-alt)] border border-[var(--color-editorial-border)] rounded px-2 py-1 text-xs font-mono font-bold">d</kbd>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span>Toggle Simple Mode</span>
                  <kbd className="bg-[var(--color-editorial-bg-alt)] border border-[var(--color-editorial-border)] rounded px-2 py-1 text-xs font-mono font-bold">s</kbd>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 md:bottom-6 md:right-6 z-40 hidden sm:block"
          >
             <Button variant="outline" size="icon" onClick={scrollToTop} className="rounded-full shadow-lg h-12 w-12 bg-[var(--color-editorial-bg)] border-[var(--color-editorial-border)] hover:bg-[var(--color-editorial-bg-alt)]" aria-label="Back to top">
               <ArrowUp className="w-5 h-5 text-[var(--color-editorial-text)]" />
             </Button>
          </motion.div>
        )}
      </AnimatePresence>

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
