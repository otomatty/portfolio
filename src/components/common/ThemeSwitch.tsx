import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark';

const getPreferredTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const preferred = getPreferredTheme();
    setTheme(preferred);
    document.documentElement.classList.toggle('dark', preferred === 'dark');
    document.documentElement.classList.toggle('light', preferred === 'light');
    setMounted(true);
  }, []);

  const handleToggle = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    document.documentElement.classList.toggle('light', nextTheme === 'light');
  };

  const isDark = theme === 'dark';

  if (!mounted) {
    return (
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-muted-foreground">テーマを切り替える</p>
        <button
          type="button"
          className={cn(
            'relative w-24 h-12 rounded-full p-1 border-2',
            'transition-colors duration-300',
            'bg-amber-50 border-amber-200'
          )}
        >
          <span className="sr-only">テーマを切り替える</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm text-muted-foreground">テーマを切り替える</p>
      <button
        type="button"
        className={cn(
          'relative w-24 h-12 rounded-full p-1 border-2',
          'transition-colors duration-300',
          isDark ? 'bg-neutral-900 border-neutral-700' : 'bg-amber-50 border-amber-200'
        )}
        onClick={handleToggle}
      >
        <span className="sr-only">テーマを切り替える</span>

        {/* Track decoration */}
        <div
          className={cn(
            'absolute inset-0 rounded-full transition-colors duration-300',
            isDark
              ? 'bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000000_100%)]'
              : 'bg-[radial-gradient(circle_at_center,#fef3c7_0%,#fde68a_100%)]'
          )}
        />

        {/* Sliding circle */}
        <motion.div
          className="relative w-9 h-9 -translate-y-1/2"
          initial={false}
          animate={{ x: isDark ? 'calc(100% + 30%)' : '0' }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          style={{ position: 'absolute', left: '5%', top: '50%' }}
        >
          <div
            className={cn(
              'absolute inset-0 rounded-full shadow-lg transition-colors duration-300',
              isDark
                ? 'bg-linear-to-br from-neutral-800 to-neutral-950'
                : 'bg-linear-to-br from-white to-amber-50'
            )}
          />

          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative w-6 h-6">
                  <div className="absolute inset-0 rounded-full bg-linear-to-br from-amber-200 to-amber-300 opacity-90" />
                  <div className="absolute inset-0 rounded-full bg-linear-to-br from-neutral-800 to-neutral-950 opacity-50 -translate-x-1" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative w-6 h-6">
                  <div className="absolute inset-0 rounded-full bg-linear-to-br from-amber-300 to-amber-500" />
                  <div className="absolute inset-[-25%] rounded-full bg-linear-to-br from-amber-200 to-amber-400 opacity-50 animate-pulse" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </button>
    </div>
  );
}
