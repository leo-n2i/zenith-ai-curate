import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme') as Theme | null;
      const prefersDark = typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;
      const initial = saved || (prefersDark ? 'dark' : 'light');
      setTheme(initial);
      applyTheme(initial);
    } catch (err) {
      // ignore
    } finally {
      setMounted(true);
    }
    // listen to system changes (optional)
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      // only apply if user hasn't explicitly set a preference
      const stored = localStorage.getItem('theme');
      if (!stored) {
        const sys = e.matches ? 'dark' : 'light';
        setTheme(sys);
        applyTheme(sys);
      }
    };
    if (mq?.addEventListener) mq.addEventListener('change', handler);
    else if (mq?.addListener) mq.addListener(handler);
    return () => {
      if (mq?.removeEventListener) mq.removeEventListener('change', handler);
      else if (mq?.removeListener) mq.removeListener(handler);
    };
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      try { (document.documentElement.style as any).colorScheme = 'dark'; } catch {}
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      try { (document.documentElement.style as any).colorScheme = 'light'; } catch {}
    }
    try { localStorage.setItem('theme', newTheme); } catch {}
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    applyTheme(next);    applyTheme(next);
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
