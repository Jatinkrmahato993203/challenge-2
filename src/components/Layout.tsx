import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Search, List, Info, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const navItems = [
    { name: 'Timeline', path: '/', icon: Calendar },
    { name: 'Wizards', path: '/flows', icon: List },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-editorial-bg)] flex flex-col font-sans text-editorial-text border-x-8 border-[var(--color-editorial-bg)] max-w-[1200px] mx-auto shadow-sm relative overflow-hidden">
      <header className="h-16 border-b border-[var(--color-editorial-border)] px-4 md:px-8 flex items-center justify-between bg-[var(--color-editorial-bg)] sticky top-0 z-30">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#1A1A1A] flex items-center justify-center shrink-0">
            <span className="text-white font-serif text-xl italic leading-none pt-1">v</span>
          </div>
          <h1 className="uppercase tracking-[0.2em] font-bold text-xs hidden sm:block">The Civic Compass <span className="font-normal opacity-50">/ 2026</span></h1>
        </Link>
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
      </header>

      {/* Sub-Header: Global Status */}
      <div className="h-12 bg-[#F1EDE9] border-b border-[var(--color-editorial-border)] flex items-center px-4 md:px-8">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-red-600 shrink-0"></span>
          <p className="text-xs font-medium uppercase tracking-tight truncate">Status: <span className="font-bold">Next Deadline in 14 Days</span></p>
        </div>
      </div>

      <main className="flex-1 w-full px-4 md:px-8 py-8 md:py-12">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#FDFCFB] border-t border-[var(--color-editorial-border)] z-30 pb-safe">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
               <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full text-[10px] uppercase tracking-wider font-bold gap-1",
                  isActive ? "text-[#1A1A1A] underline underline-offset-4" : "text-[var(--color-editorial-muted)] hover:text-[#1A1A1A]"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "stroke-[2px]" : "stroke-2")} />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
